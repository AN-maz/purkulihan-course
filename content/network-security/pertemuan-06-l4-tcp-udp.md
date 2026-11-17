# Pertemuan 6 — L4 Security: TCP/UDP Attacks

Catatan ini disusun dari materi dosen di `Network-Security-Course-Bank/Pertemuan6.md` (judul asli: "Pertemuan 6: L4 Security - TCP/UDP Attacks"), ditambah konteks hasil praktikum nyata MasPur di `materi/laporan-p6.docx` (laporan praktikum L4, lab `docker-compose-p6.yml`). Bagian temuan praktikum ditandai jelas supaya ketahuan mana materi dosen, mana hasil lab.

## Pengantar Layer 4 Security

Layer 4 (Transport Layer) punya dua protokol utama:

- **TCP** — connection oriented.
- **UDP** — connectionless.

Fungsi utama Layer 4 (dari materi):

1. **Port addressing** — memastikan data sampai ke aplikasi yang benar (mis. port 80 untuk HTTP).
2. **Segmentation** — membagi data besar jadi segmen kecil.
3. **Session management** — membangun dan memutus koneksi (TCP).

Fitur: port addressing, segmentation, flow control, dan **error recovery (TCP saja)**.

## TCP Three-Way Handshake Deep Dive

```
Client              Server
  |  ---- SYN (Seq=X) --->   |
  |  <-- SYN-ACK (Seq=Y,     |
  |       Ack=X+1) --        |
  |  ---- ACK (Ack=Y+1) -->  |
  |      [Established]       |
```

**Kelemahan handshake:** proses ini memakan resource di server (state table). Server harus menyimpan info koneksi yang "setengah terbuka" (*half-open connection*) pada status `SYN_RECV`.

Inilah dasar **SYN Flood**: attacker mengirim ribuan SYN tanpa pernah membalas SYN-ACK → antrean koneksi server penuh → client sah ditolak (Denial of Service).

## TCP Flags & Kerentanannya

| Flag | Deskripsi | Potensi Abuse |
|---|---|---|
| **SYN** | Sinkronisasi nomor urut | SYN Flood (DoS) |
| **ACK** | Konfirmasi penerimaan paket | Blind ACK Injection |
| **FIN** | Mengakhiri koneksi normal | FIN Scan (Stealth) |
| **RST** | Memutuskan koneksi paksa | Connection Reset Attack |
| **PSH** | Push data langsung ke aplikasi | Buffer pressure |
| **URG** | Data mendesak | Segment evasion |

## Docker Hands-On: Setup Lab L4 Attacks

Keuntungan Docker buat lab L4 (dari materi): fast setup (~30 detik), service isolation (web server, DNS, UDP service di container terpisah), real network tools (`tcpdump`, `tshark`, `netstat` jalan normal), easy targeting (subnet `192.168.60.x`), dan persistent logs (PCAP bisa disalin ke host).

Topologi — network `192.168.60.0/24`:

| Container | IP (dokumentasi) | Peran |
|---|---|---|
| `attacker-l4` | 192.168.60.2 | Kali (hping3, scapy) |
| `target-webserver` | 192.168.60.3:80 | Nginx — target SYN flood |
| `target-udp` | 192.168.60.4:5353/UDP | DNS service — target amplification |
| `monitor-l4` | 192.168.60.5 | tcpdump — pemantau trafik |

```bash
mkdir -p l4-lab && cd l4-lab
docker-compose -f docker-compose-p6.yml up -d
docker-compose -f docker-compose-p6.yml ps
docker-compose exec attacker-l4 ping 192.168.60.3
```

### Temuan praktikum MasPur (bukan dari materi dosen)

Ini bagian yang cuma kebukti kalau kamu benar-benar jalanin lab-nya:

- **File compose bernama `docker-compose-p6.yml`.** Semua perintah *wajib* pakai `-f docker-compose-p6.yml`, kalau nggak muncul error `no configuration file provided: not found` (karena docker-compose default nyari `docker-compose.yml`).
- **IP container dinamis.** Berubah antar restart. Contoh nyata: `attacker-l4` 192.168.60.4 (sesi 1) → 192.168.60.3 (sesi 2–3); `target-webserver-l4` tetap 192.168.60.2. Jadi selalu cek ulang pakai `hostname -I` sebelum menyerang, dan buat uji konektivitas lebih aman pakai **nama service** (Docker DNS me-resolve otomatis).
- **Tool nggak persisten** — hilang tiap container restart karena cuma di-install saat startup. Kalau `ping`/`curl`/`nmap`/`tcpdump` bilang *executable file not found*, install ulang dulu.
- **`netstat` nggak ada di container `ubuntu:22.04`** → pakai `ss` (mis. `ss -ltn`, `ss -ltn state syn-recv`).
- **`monitor-l4` nggak ada di jalur trafik** Docker bridge → file pcap-nya kosong (94 byte). Perekaman harus dilakukan **di container target**.
- **`target-udp-service` gagal start** (`Unable to locate package dnsmasq` → container `Exited (127)`); harus dinaikkan manual. Setelah dinaikkan, dnsmasq merespons di **port 53**, bukan di 5353 seperti tertulis di materi.
- **`iptables` nggak terpasang** di image `ubuntu:22.04` → `apt-get install -y iptables` dulu.

> [!IMPORTANT]
> Pelajaran paling berguna dari lab nyata: **jangan percaya IP statis dari dokumentasi**. Docker assign IP secara dinamis, dan nama service lebih reliable daripada IP. Kalau MasPur bikin ulang lab ini, cek `hostname -I` dulu selalu.

## Hands-On: SYN Flood Attack dengan hping3

```bash
# Terminal 1 - Monitor state koneksi di target
docker-compose -f docker-compose-p6.yml exec target-webserver bash
watch -n 1 "ss -ltn state syn-recv | wc -l"

# Terminal 2 - Rekam paket SYN di target
tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0' -w /tmp/synflood.pcap

# Terminal 3 - Serangan di attacker
docker-compose -f docker-compose-p6.yml exec attacker-l4 bash
hping3 -S --flood --rand-source -p 80 <IP-aktual-target>
```

Parameter:

| Parameter | Fungsi |
|---|---|
| `-S` | Set flag SYN |
| `--flood` | Kirim secepat mungkin (ribuan/detik) |
| `--rand-source` | Source IP diacak (spoofing) supaya sulit diblokir |
| `-p 80` | Port target (web server) |

Observasi di tcpdump:

```
IP <ip-palsu>.2627 > target.80: Flags [S], seq 1098043730, win 512
IP target.80 > <ip-palsu>.2627: Flags [S.], ack 1098043731, win 64240
... (ribuan dalam waktu singkat)
```

### Hasil nyata dari lab MasPur

- Serangan 5 detik → **154.890 paket SYN terkirim** (±31.000 paket/detik), `100% packet loss` (0 balasan diterima, karena source IP palsu → SYN-ACK dikirim ke IP yang nggak ada).
- Di sisi target terekam **195.907 paket SYN tanpa ACK** — bukti kuantitatif flood berhasil. Paket SYN datang dari banyak source IP palsu (`219.22.185.80`, `94.249.241.9`, `227.1.21.208`, dst).
- Koneksi menumpuk pada status `SYN_RECV` di state table server.
- File pcap hasil capture ±27 MB (65,2 MB di salinan lain) lalu disalin ke host via `docker cp`.

### Mitigasi SYN Flood

**a) SYN Cookies** — server nggak menyimpan state koneksi di memori, melainkan menyimpannya dalam cookie yang dikirim balik ke client.

```bash
sysctl -w net.ipv4.tcp_syncookies=1
sysctl net.ipv4.tcp_syncookies     # cek status
```

Di lab nyata: pada **Ubuntu 22.04 fitur ini aktif secara default** (nilainya sudah `1`).

**b) Rate limiting dengan iptables**

```bash
apt-get install -y iptables
iptables -A INPUT -p tcp --syn -m limit --limit 10/s --limit-burst 20 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP
iptables -L INPUT -n --line-numbers
```

Di lab nyata: rule berhasil terpasang (terlihat dua baris: ACCEPT ber-limit + DROP). Setelah rule dihapus, `curl` ke server kembali normal (`HTTP 200`) — bukti rule bekerja sesuai tujuan.

> [!TIP]
> Cara paling cepat ngecek apakah SYN flood benar-benar "masuk" adalah lihat counter `ss -ltn state syn-recv`. Kalau angka naik terus dan nggak turun setelah waktu normal retry, itu tanda state table-nya kebanjiran.

## Hands-On: TCP Session Hijacking Concepts

**Session Hijacking** terjadi ketika penyerang mengambil alih sesi aktif antara client dan server dengan memprediksi **Next Sequence Number**.

```
Client  -> Server : Data (Seq=100, Ack=500)
Server  -> Client : ACK (Seq=500, Ack=101)

[Attacker mengamati SEQ/ACK]

Attacker -> Server: Spoofed Data (Seq=101, Ack=500)
  -> Server menerima karena SEQ/ACK cocok!
Server   -> Client: ACK (Seq=500, Ack=200)
  -> Client bingung, Ack mismatch (Desynchronization)
```

**Teknik prediksi SEQ:** dulu Sequence Number bersifat linear, tapi OS modern pakai **ISN (Initial Sequence Number)** yang acak. Namun, kalau penyerang ada di jalur jaringan (MITM/sniffing), nilai ISN tetap bisa dilihat dari trafik — karena itu enkripsi (TLS) jadi mitigasi utamanya.

## UDP Security & Amplification

> [!NOTE]
> Di materi asli, poin nomor **6 muncul dua kali** (TCP Session Hijacking dan UDP Security). Laporan praktikum MasPur juga mencatat ini secara eksplisit sebagai sesuai header materi `Pertemuan6.md`.

UDP nggak punya handshake (connectionless), jadi sumbernya mudah dipalsukan (*spoofing*).

**UDP Amplification Attack** — memanfaatkan service UDP (DNS, NTP, SNMP) buat mengirim response besar ke korban dari request kecil yang dipalsukan:

```
Attacker --[request kecil, source: IP korban]--> DNS Server
DNS Server --[response besar]--> Korban (dibanjiri)
```

Simulasi di lab: query DNS sebagai contoh request amplification.

```bash
docker-compose -f docker-compose-p6.yml exec attacker-l4 nslookup test.local 192.168.60.5
# → Name: test.local   Address: 10.0.0.1
```

Di lab nyata, container `target-udp-service` harus dinaikkan manual, dan pengujian DNS berhasil **di port 53** (port 5353 sesuai materi nggak ngasih balasan).

## Deteksi dan Pencegahan

### TCP SYN Cookies

Teknik menangani SYN Flood tanpa menghabiskan memory state table.

```bash
sysctl net.ipv4.tcp_syncookies        # cek
sysctl -w net.ipv4.tcp_syncookies=1   # aktifkan bila masih 0
```

### Rate Limiting

```bash
iptables -A INPUT -p tcp --syn -m limit --limit 1/s --limit-burst 10 -j ACCEPT
iptables -A INPUT -p tcp --syn -j DROP
iptables -L INPUT -n --line-numbers
```

### Mengurangi attack surface (Latihan 2 di lab nyata)

```bash
nmap -sS -p 22,80,443 <IP-target>
iptables -A INPUT -p tcp --dport 22 -j DROP
```

Hasil scan nyata: `22/tcp closed`, `80/tcp open (http)`, `443/tcp closed`. Prinsipnya: tutup port yang nggak dipakai supaya cuma service yang dibutuhkan yang menerima trafik Layer 4.

## Ringkasan Perintah Penting

| Fungsi | Perintah |
|---|---|
| SYN flood | `hping3 -S --flood --rand-source -p 80 <target>` |
| Monitor state SYN | `ss -ltn state syn-recv` |
| Capture SYN | `tcpdump -i eth0 'tcp[tcpflags] & tcp-syn != 0' -w /tmp/synflood.pcap` |
| Hitung SYN tanpa ACK | `tcpdump -r synflood.pcap 'tcp[tcpflags] & tcp-syn != 0 and tcp[tcpflags] & tcp-ack == 0'` |
| SYN cookies | `sysctl -w net.ipv4.tcp_syncookies=1` |
| Rate limit SYN | `iptables -A INPUT -p tcp --syn -m limit --limit 10/s --limit-burst 20 -j ACCEPT` |
| Scan port | `nmap -sS -p 22,80,443 <target>` |
| Tutup port | `iptables -A INPUT -p tcp --dport 22 -j DROP` |

```quiz
Q: SYN flood menyerang kelemahan pada...
+ Proses TCP three-way handshake (koneksi half-open menumpuk di state table)
- Enkripsi AES pada TCP
- Tabel ARP di layer 2
> Server menyimpan state koneksi setengah terbuka (SYN_RECV); ribuan SYN tanpa ACK bikin state table penuh.

Q: Arti parameter hping3 `--rand-source` adalah...
+ Mengacak source IP (spoofing) agar sulit diblokir
- Mengirim paket dengan nomor urut acak
- Menargetkan port secara acak
> Source IP palsu bikin respons SYN-ACK dikirim ke alamat yang tidak ada.

Q: Status koneksi yang menandakan adanya serangan SYN flood pada server adalah...
+ SYN_RECV yang menumpuk banyak
- ESTABLISHED yang banyak
- LISTEN kosong
> Koneksi SYN_RECV = setengah terbuka; jumlahnya melonjak saat flood.

Q: Mitigasi SYN flood yang menyimpan informasi handshake dalam cookie kriptografis disebut...
+ SYN cookies
- DNSSEC
- ARP static
> SYN cookies menghindari penyimpanan state di memori.

Q: Di lab nyata MasPur, status SYN cookies pada Ubuntu 22.04 adalah...
+ Sudah aktif default (nilai 1)
- Harus diinstall manual dari paket tambahan
- Selalu 0 dan tidak bisa diubah
> Ubuntu 22.04 mengaktifkan net.ipv4.tcp_syncookies=1 secara default.

Q: Kenapa hasil perekaman di `monitor-l4` kosong pada praktikum nyata?
+ Karena monitor-l4 tidak berada di jalur trafik container pada Docker bridge network
- Karena tcpdump belum diinstall di monitor
- Karena port 80 ditutup di target
> Paket antar container tidak melewati monitor, jadi capture harus dilakukan di container target.

Q: TCP Session Hijacking modern sulit karena...
+ OS memakai ISN (Initial Sequence Number) yang acak
- TCP tidak lagi memakai sequence number
- Semua sesi TCP sudah dienkripsi dengan AES oleh TCP itu sendiri
> ISN acak menyulitkan prediksi; penyerang yang ada di jalur (MITM) tetap bisa lihat nilai ini dari trafik.

Q: Dasar serangan UDP amplification adalah...
+ UDP connectionless sehingga source IP mudah dipalsukan
- UDP punya handshake yang bocor
- UDP menyimpan state koneksi di server
> Tanpa handshake/verifikasi sumber, penyerang bisa memakai IP korban sebagai source.

Q: Contoh service yang dieksploitasi untuk UDP amplification menurut materi adalah...
+ DNS, NTP, SNMP
- SSH, HTTPS, SCP
- ARP, DHCP
> Service UDP dengan response jauh lebih besar dari request memberikan rasio amplifikasi.

Q: Pada praktikum nyata, kesalahan yang muncul bila lupa menambahkan `-f docker-compose-p6.yml` adalah...
+ no configuration file provided: not found
- permission denied
- connection refused
> Docker Compose default mencari docker-compose.yml; nama file lab ini khusus sehingga harus diarahkan dengan -f.

Q: Tujuan menutup port yang tidak dipakai (mis. `iptables -A INPUT -p tcp --dport 22 -j DROP`) adalah...
+ Mengurangi attack surface Layer 4
- Mempercepat handshake TCP
- Mengaktifkan SYN cookies
> Hanya service yang dibutuhkan yang menerima trafik, sehingga peluang dieksploitasi mengecil.
```