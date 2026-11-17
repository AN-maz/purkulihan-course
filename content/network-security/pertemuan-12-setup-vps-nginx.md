# Pertemuan 12 — Setup VPS & Konfigurasi Nginx

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan12.md` (judul asli: "Pertemuan 12: Setup VPS & Konfigurasi Nginx"), plus folder pendukung `SetupVPS/` (tutorial Sumopod & EasyPanel, contoh deploy, panduan Nginx lengkap) dan `Nginx/README.md` (step-by-step konfigurasi Nginx dengan proteksi bot).

## Pengantar VPS dan Web Server

### Apa itu VPS?

**VPS (Virtual Private Server)** adalah server virtual yang berjalan di atas hardware fisik bersama, tapi memberikan sumber daya terdedikasi (RAM, CPU, Storage). Lebih terjangkau dari dedicated server, lebih powerful dari shared hosting. Di atas hardware fisik ada **hypervisor (KVM/Xen)** yang membagi jadi banyak VPS milik user berbeda.

### Mengapa Nginx?

Nginx (dibaca "engine-x") adalah web server dan reverse proxy yang efisien:

- Handling concurrent connection tinggi (event-driven, non-blocking)
- Konsumsi memori rendah dibanding Apache
- Bisa jadi Load Balancer, SSL Terminator, dan WAF dasar
- Konfigurasi deklaratif yang mudah dibaca

## Hands-On 1: Setup VPS dengan Sumopod & EasyPanel

Alur lengkapnya (estimasi 15–20 menit dari `SetupVPS/README.md`):

1. **Daftar akun Sumopod** → isi form registrasi → verifikasi email.
2. **Top up saldo** di dashboard: **Billing → Add Credit**, minimal **Rp 60.000** untuk paket VPS paling dasar.
3. **Buat VPS**: pilih provider **Tencent Cloud**, lokasi **Singapore**, paket **2 vCPU, 2 GB RAM, 40 GB SSD** (Rp 60.000/bulan, egress 512 GB @ 20 Mbps). Konfigurasi: OS **Ubuntu 24.04 LTS**, hostname `netsec-lab`.
4. **Tunggu provisioning 5–15 menit** sampai status **Pending → Active**.
5. **Catat info VPS**: IP Address, username (`ubuntu`), password. Login SSH termudah via `https://ssheasy.com` (isi host/IP, username, password → Connect).
6. **Install Docker & EasyPanel** di VPS:

```bash
sudo su
apt-get update && apt-get install -y docker.io docker-compose
curl -sSL https://get.easypanel.io | sh
# tunggu sampai muncul: Easypanel installed successfully
```

7. **Akses dashboard** di `http://IP_VPS_ANDA:3000`, buat akun administrator pertama kali.

> [!NOTE]
> `SetupVPS/README.md` juga menyebut **Dokploy** sebagai alternatif EasyPanel. Keduanya pakai port **3000** default — jangan di-install di VPS yang sama kecuali salah satu port-nya diganti, biar nggak bentrok.

### Dua contoh project deploy (`SetupVPS/Contoh-Project-Deploy.md`)

| Fitur | Project 1 (Tanpa Proxy) | Project 2 (Dengan Proxy) |
|---|---|---|
| Keamanan | Rendah (backend terekspos) | Tinggi (backend terlindungi) |
| Port | 2 port (8000, 8080) | 1 port (80) |
| URL API | Domain terpisah | Path `/api` |
| SSL setup | Perlu per layanan | Cukup di proxy |
| Rate limiting / WAF | Tidak ada | Bisa ditambahkan |

Dua cara deploy ke EasyPanel: (1) upload file ke VPS lalu `docker-compose up -d --build`, (2) zip folder → **Create Project → Upload Files** di dashboard (EasyPanel otomatis deteksi `docker-compose.yml`).

## Pengantar Nginx sebagai Web Server & Reverse Proxy

### Mode operasi

Nginx bisa: menyajikan **static files** (`/var/www/html`), mem-**proxy** ke App Server (Node.js/PHP/Python), dan **load balance** ke beberapa backend.

### Arsitektur reverse proxy

| Komponen | Fungsi |
|---|---|
| **Nginx (port 80/443)** | Entry point publik, SSL termination |
| **App Server (port 3000/8000)** | Backend yang tidak terekspos langsung |
| **WAF rules** | Filter request berbahaya di level Nginx |

## Hands-On 2: Konfigurasi Nginx Lengkap

### Persiapan

```bash
sudo apt update && sudo apt install nginx -y
sudo systemctl status nginx && sudo systemctl enable nginx && sudo systemctl start nginx
sudo cp /etc/nginx/nginx.conf /etc/nginx/nginx.conf.backup   # backup default
```

### Struktur direktori

```bash
sudo mkdir -p /var/www/netsec-lab/html /var/www/netsec-lab/logs
sudo chown -R $USER:$USER /var/www/netsec-lab/html
sudo chmod -R 755 /var/www/netsec-lab
```

### File konfigurasi (`/etc/nginx/sites-available/netsec-lab`)

Inti-isinya (lengkap ada di materi — ringkasannya):

```nginx
# Rate limiting zone
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=login_limit:10m rate=5r/m;
limit_conn_zone $binary_remote_addr zone=conn_limit:10m;

# Block User-Agent berbahaya (curl|wget|nmap|nikto|burpsuite|sqlmap|...)
map $http_user_agent $blocked_ua { default 0; ~*(curl|wget|nmap|...) 1; }

server {
    listen 80;
    server_name localhost;
    root /var/www/netsec-lab/html;
    index index.html;
    access_log /var/www/netsec-lab/logs/access.log;
    error_log  /var/www/netsec-lab/logs/error.log;

    # Security headers
    add_header X-Frame-Options      "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection     "1; mode=block" always;
    server_tokens off;

    if ($blocked_ua) { return 403; }
    if ($http_user_agent = "") { return 403; }   # request tanpa UA = 403

    limit_req  zone=api_limit burst=20 nodelay;
    limit_conn conn_limit 10;

    # Block metode HTTP berbahaya selain GET/HEAD/POST/PUT/DELETE/PATCH → 405

    # Proteksi SQLi di query string (union.*select, select.*from, drop.*table) → 403
    # Proteksi path traversal (../) → 403

    location / { try_files $uri $uri/ =404; }
    location /login { limit_req zone=login_limit burst=2 nodelay; limit_req_status 429; }
    location ~ /\. { deny all; return 403; }                          # file tersembunyi
    location ~* \.(ini|conf|log|bak|sql|sh|env)$ { deny all; }        # file konfigurasi
    # static files: expires 30d, access_log off
    error_page 403 /403.html;
    error_page 404 /404.html;
}
```

### Aktivasi

```bash
sudo ln -s /etc/nginx/sites-available/netsec-lab /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default        # opsional
sudo nginx -t                                      # harus: "test is successful"
sudo systemctl reload nginx
```

> [!WARN]
> Selalu jalankan `nginx -t` sebelum reload. Kalau konfigurasi salah dan langsung reload, Nginx bisa gagal start dan situsmu mati.

## Proteksi Bot & Scanning — Hasil Testing

```bash
# UA curl → seharusnya 403; wget → 403; browser normal → 200
curl -A "curl/7.68.0" http://localhost/
curl -A "Mozilla/5.0 (Windows NT 10.0...)" http://localhost/

# SQLi di query string → 403; request normal → 200
curl "http://localhost/?id=1+UNION+SELECT+1,2,3"
curl "http://localhost/?page=1&category=security"

# Rate limit: loop 30 request → kena limit (429) setelah ~20 request
```

`Nginx/README.md` menambahkan troubleshooting:
- Rate limit kekecokan → naikkan `burst` atau `rate`.
- UA normal keblokir → tambah pengecualian bot baik (Googlebot, bingbot) di `map`.
- Situs tak bisa diakses → cek `nginx -t`, port 80/443, dan firewall (`ufw allow 80/tcp`).

## SSL Certificate dengan Certbot

```bash
# Domain asli
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot renew --dry-run     # cek auto-renewal

# Self-signed untuk lab lokal
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/nginx/ssl/lab.key -out /etc/nginx/ssl/lab.crt \
  -subj "/C=ID/ST=Jakarta/L=Jakarta/O=NetSec Lab/CN=localhost"
# lalu di konfigurasi: listen 443 ssl; + ssl_certificate & ssl_certificate_key
```

`Nginx/README.md` juga menunjukkan pola redirect HTTP→HTTPS: server `listen 80` cukup `return 301 https://$server_name$request_uri;`.

## Monitoring dan Logging

```bash
sudo tail -f /var/www/netsec-lab/logs/access.log
sudo tail -f ... | grep " 403 "                          # hanya yang diblokir
sudo tail -f ... | grep -E "(curl|wget|nmap|nikto)"       # bot terdeteksi
```

**Script monitoring bot** (`/usr/local/bin/monitor-bot.sh`): menghitung total request 403, top 10 IP yang diblokir, dan User-Agent tool scanning yang terdeteksi.

**Fail2ban (opsional):** filter `nginx-bot.conf` mencocokkan UA tool scanning dan request SQLi yang berakhir 403/400; jail `nginx-bot` dengan `maxretry = 3`, `bantime = 3600`, `findtime = 600`. Cek status dengan `fail2ban-client status nginx-bot`.

## Latihan Mandiri (dari materi)

- **Deploy aplikasi ke VPS:** push Docker image ke Hub → deploy via EasyPanel → konfigurasi Nginx sebagai reverse proxy → verifikasi via domain/IP.
- **Hardening Nginx:** blokir `/admin` dari IP non-lokal, custom error page 403, tambah header HSTS.
- **Analisis log:** jalankan Nikto ke Nginx, amati log real-time, hitung berapa persen request Nikto yang berhasil diblokir.

```quiz
Q: VPS berbeda dari shared hosting karena...
+ Memberikan sumber daya terdedikasi (RAM, CPU, storage) di atas hardware bersama
- Tidak pernah berbagi hardware fisik dengan siapa pun
- Selalu gratis untuk mahasiswa
> VPS tetap di atas hardware bersama, tapi di-*dedicate* per user lewat hypervisor (KVM/Xen).

Q: Keunggulan utama Nginx dibanding Apache menurut materi adalah...
+ Event-driven non-blocking sehingga handling koneksi concurrent tinggi dengan memori rendah
- Ditulis dalam bahasa PHP
- Tidak butuh konfigurasi sama sekali
> Nginx dipilih karena efisien di memori dan kuat menangani banyak koneksi bersamaan.

Q: Setelah membuat file di sites-available, konfigurasi Nginx diaktifkan dengan...
+ Membuat symbolic link ke sites-enabled lalu nginx -t dan systemctl reload
- Langsung menghapus folder sites-available
- Restart komputer server
> Nginx hanya membaca isi sites-enabled; symlink adalah jembatannya, lalu wajib test sebelum reload.

Q: Permintaan dengan User-Agent kosong pada konfigurasi materi diberi respon...
+ 403
- 200
- 405
> if ($http_user_agent = "") { return 403; } — bot tanpa User-Agent langsung diblokir.

Q: Rate limit khusus endpoint /login pada konfigurasi materi disetel...
+ 5 request per menit (burst 2, status 429)
- 10 request per detik
- 100 request per jam
> Zone login_limit rate=5r/m; beda dengan api_limit (10r/s) — login sengaja dibuat lebih ketat karena sasaran brute force.

Q: Pola query string seperti `union.*select` dan `drop.*table` di Nginx difungsikan untuk...
+ Memblokir percobaan SQL Injection sebelum sampai ke backend (return 403)
- Membuat index database
- Mengenkripsi query string
> Nginx jadi WAF dasar: request berbahaya sudah mati di lapisan proxy.

Q: Tool untuk mendapatkan SSL certificate gratis yang terintegrasi dengan Nginx adalah...
+ Certbot
- sqlmap
- Fail2ban
> certbot --nginx -d domain.com memproses penerbitan sekaligus penyuntingan konfigurasi Nginx.

Q: Fungsi Fail2ban pada setup Nginx di materi adalah...
+ Memblokir IP yang berulang kali melakukan request terlarang (maxretry 3, bantime 3600 detik)
- Mempercepat loading halaman
- Menerbitkan sertifikat SSL
> Fail2ban membaca access log, mencocokkan failregex (UA tool scanning / SQLi 403), lalu ban IP pelanggar.

Q: Mengapa materi menyarankan Project 2 (dengan Nginx proxy) untuk production?
+ Backend tidak terekspos langsung, satu entry point, dan rate limiting/WAF bisa dipasang di proxy
- Karena Docker tidak mendukung Project 1
- Karena port 3000 lebih aman dari port 80
> Project 1 mengekspos tiap layanan langsung ke publik; proxy menyatukan dan menyaring semua request.
```