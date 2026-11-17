# Pertemuan 15 — IDS dengan Snort

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan15.md` (judul asli: "Pertemuan 15: IDS dengan Snort"). Hands-on-nya di container Ubuntu-target + Kali attacker.

## Apa itu IDS (Intrusion Detection System)?

IDS adalah sistem yang memantau trafik jaringan atau aktivitas sistem untuk mendeteksi aktivitas mencurigakan atau serangan yang sedang berlangsung.

| | IDS | IPS |
|---|---|---|
| Fungsi | **Detection** — mendeteksi dan memberi alert | **Prevention** — mendeteksi dan memblokir otomatis |
| Aksi | Cuma lapor | Ikut menindak |

## Arsitektur Snort

Snort adalah IDS/IPS open-source paling populer di dunia. Komponen utamanya:

| Komponen | Fungsi |
|---|---|
| **Packet Decoder** | Mengambil paket dari interface jaringan |
| **Preprocessor** | Merapikan paket sebelum dianalisis (misal: HTTP dynamic decoding) |
| **Detection Engine** | Mencocokkan paket dengan database rules (aturan) |
| **Logging & Alerting** | Mengeluarkan hasil deteksi ke file log atau dashboard |

> [!NOTE]
> Perhatikan urutannya: decode dulu → preprocess (bentrokkan/reassemble) → cocokkan ke rules → baru alert. Kalau urutan ini terbalik, payload yang terpecah di banyak paket nggak pernah ke-deteksi.

## Mode Operasi Snort

| Mode | Fungsi |
|---|---|
| **Sniffer** | Membaca paket dan menampilkan di layar (kayak tcpdump) |
| **Packet Logger** | Mencatat semua paket ke dalam folder log |
| **IDS** | Mencocokkan paket dengan aturan dan mengeluarkan alert |

## Anatomi Rules Snort

Struktur dasar rule:

```
[Action] [Protocol] [Src IP] [Src Port] -> [Dst IP] [Dst Port] (Options)
```

Contoh:

```
alert icmp any any -> any any (msg:"Ping Terdeteksi"; sid:1000001; rev:1;)
```

- `alert` = aksi, `icmp` = protokol, `any any -> any any` = semua sumber dan tujuan
- `msg` = teks pesan alert, `sid` = ID rule unik, `rev` = revisi rule

## Hands-On 1: Instalasi & Konfigurasi Dasar

Di container target (Ubuntu):

```bash
apt update && apt install -y snort
snort -V              # cek versi
snort -v -i eth0      # jalankan sniffer mode
```

## Hands-On 2: Menulis Custom Rules

Aturan sendiri ditulis di `/etc/snort/rules/local.rules`.

### Deteksi Nmap stealth scan

```bash
alert tcp any any -> $HOME_NET any (msg:"Nmap Stealth Scan Detected"; flags:S; sid:1000002;)
```

- `flags:S` = paket dengan flag SYN saja (ciri SYN scan / `-sS`)
- `$HOME_NET` = jaringan yang dilindungi

### Deteksi SSH brute force

```bash
alert tcp any any -> $HOME_NET 22 (msg:"SSH Brute Force Attempt"; detection_filter:track by_src, count 5, seconds 60; sid:1000003;)
```

- `detection_filter: track by_src, count 5, seconds 60` = **5 attempt dari IP yang sama dalam 60 detik** baru dianggap brute force

## Hands-On 3: Analisis Alert

```bash
# 1. Jalankan Snort dengan local.rules
snort -A console -q -c /etc/snort/snort.conf -i eth0

# 2. Dari Kali, lakukan serangan
nmap -sS 172.20.0.10

# 3. Alert muncul di console Snort:
# [**] [1:1000002:0] Nmap Stealth Scan Detected [**]
```

Format alert `[1:1000002:0]` = `[gid:sid:rev]` — gid generator, sid ID rule, rev revisi.

## Latihan Mandiri (dari materi)

- **Deteksi HTTP attack:** tulis rule Snort untuk mendeteksi SQL Injection sederhana yang mengandung kata kunci `UNION SELECT` di dalam request HTTP.
- **Snort sebagai IPS:** pelajari mode **DAQ (Data Acquisition)** yang memungkinkan Snort berjalan **inline** untuk memblokir paket (IPS), bukan cuma memberi alert.

```quiz
Q: Perbedaan utama IDS dan IPS adalah...
+ IDS hanya mendeteksi dan memberi alert; IPS mendeteksi sekaligus memblokir otomatis
- IDS bekerja offline, IPS bekerja online
- IDS untuk TCP saja, IPS untuk UDP saja
> Deteksi vs pencegahan: IPS menindak, IDS hanya melapor.

Q: Komponen Snort yang mencocokkan paket dengan database rules adalah...
+ Detection Engine
- Packet Decoder
- Preprocessor
> Decoder ambil paket, Preprocessor rapikan, Detection Engine cocokkan ke rules, lalu Logging & Alerting keluarkan hasil.

Q: Sniffer mode Snort berfungsi seperti...
+ tcpdump — membaca paket dan menampilkan ke layar
- Firewall yang memblokir paket
- Web server
> Mode sniffer hanya memantau dan menampilkan, tanpa pencocokan rules.

Q: Struktur dasar rule Snort adalah...
+ [Action] [Protocol] [Src IP] [Src Port] -> [Dst IP] [Dst Port] (Options)
- [URL] [Query] [Header] [Body]
- [Source] [Destination] [Key]
> Pola header rule: aksi, protokol, endpoint asal → tujuan, lalu opsi dalam kurung.

Q: Rule custom Snort ditulis di file...
+ /etc/snort/rules/local.rules
- /etc/hosts
- /etc/nginx/nginx.conf
> local.rules adalah tempat aturan buatan pengguna sebelum dicocokkan oleh detection engine.

Q: Bagian `flags:S` pada rule deteksi Nmap berarti...
+ Mencocokkan paket dengan flag SYN saja (ciri khas SYN/stealth scan)
- Paket dengan semua flag aktif
- Paket yang sudah di-ACK
> nmap -sS mengirim SYN tanpa handshake penuh; rule menangkap pola itu.

Q: Opsi `detection_filter:track by_src, count 5, seconds 60` mendefinisikan...
+ 5 percobaan dari IP sumber yang sama dalam 60 detik dianggap brute force
- 5 detik tunggu lalu blokir
- 60 percobaan per jam
> Threshold berbasis waktu dan sumber — inilah yang mengubah alert tunggal jadi deteksi pola brute force.

Q: Untuk menjalankan Snort dalam mode deteksi dengan alert ke console, perintahnya...
+ snort -A console -q -c /etc/snort/snort.conf -i eth0
- snort -v -i eth0
- snort --start
> -A console mengeluarkan alert ke terminal, -c menunjuk file konfigurasi tempat rules dibaca.

Q: Alert `[**] [1:1000002:0] Nmap Stealth Scan Detected [**]` muncul setelah...
+ Menjalankan nmap -sS dari container Kali ke target
- Menjalankan ping biasa
- Membuka port 80 di browser
> Snort mencocokkan paket SYN scan ke sid 1000002 di local.rules, lalu alert keluar di console.

Q: Menjadikan Snort berjalan inline untuk memblokir paket (IPS) membutuhkan...
+ Mode DAQ (Data Acquisition) yang mengizinkan Snort inline
- Menambah aturan iptables saja
- Mengganti Snort dengan Nginx
> Latihan materi: DAQ membuat Snort bisa memproses dan menahan paket secara inline, bukan sekadar menyimak.
```