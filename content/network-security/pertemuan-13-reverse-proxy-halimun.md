# Pertemuan 13 — Hands-On Reverse Proxy: NginxProxy & HalimunProxy

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan13.md` (judul asli: "Pertemuan 13: Hands-On Reverse Proxy — NginxProxy & HalimunProxy") yang isinya dua lab hands-on dari folder `HandsOnServerProxy/`.

## Konsep Reverse Proxy sebagai Lapisan Keamanan

### Forward vs Reverse Proxy

| Aspek | Forward Proxy | Reverse Proxy |
|---|---|---|
| Melindungi | **Client** | **Server** |
| Posisi | Di depan client | Di depan server |
| Contoh | VPN, Tor | Nginx, HAProxy, Cloudflare |
| Fungsi | Menyembunyikan identitas user | Menyembunyikan & melindungi backend |

Intinya: kalau backend terekspos langsung ke internet, semua kerentanannya (API keys, konfigurasi DB, SQLi) ikut terlihat penyerang. Reverse proxy jadi penyaring: **yang lolos ke backend cuma request yang bersih**.

## Lab A: NginxProxy — WAF Dasar

### Arsitektur & komponen

| Komponen | Port | Keterangan |
|---|---|---|
| Dashboard Lab | `http://localhost:8080` | Entry point via Nginx Proxy |
| Protected API | `http://localhost:8080/api/` | API dilindungi WAF |
| Direct Backend | `http://localhost:5000` | Backend langsung — **RENTAN** |

Container lab: `nginx-gateway`, `php-backend-exposed`, `php-backend-protected`, `js-frontend`.

### Fitur keamanan yang diuji

- **Path restriction:** blokir akses ke `/config`, `/sensitive`, `.git`
- **WAF rules:** blokir SQLi (`union`, `select`, `drop`) dan XSS (`<script>`)
- **Rate limiting:** maksimal 10 req/detik (burst 20)
- **Security headers:** sembunyikan `X-Powered-By` dan `Server`

### Menjalankan lab

```bash
cd HandsOnServerProxy/NginxProxy
docker-compose up -d --build
docker ps   # pastikan 4 container up: nginx-gateway, php-backend-exposed, php-backend-protected, js-frontend
```

### Hasil serangan: direct vs via proxy

| Aksi | Direct Backend (port 5000) | Via Nginx Proxy (port 8080) |
|---|---|---|
| Get Users | Data terekspos | Data bisa diakses |
| Get Config | **API keys & DB password BOCOR** | **403 Forbidden** |
| Get sensitive file | File sensitif terekspos | **403 Forbidden** |
| SQL Injection | Injeksi berhasil | **400 Bad Request** |

Test via terminal:

```bash
# Proteksi path
curl http://localhost:5000/api.php/config     # langsung: data sensitif tampil
curl -I http://localhost:8080/api/config       # via proxy: 403 Forbidden

# Proteksi SQLi
curl -I "http://localhost:8080/api/users?id=1+UNION+SELECT+1,2,3"   # via proxy: 400 Bad Request

# Header comparison — perhatikan Server & X-Powered-By disembunyikan oleh proxy
curl -I http://localhost:5000/api.php/users
curl -I http://localhost:8080/api/users
```

### Simulasi penetrasi dari Kali

```bash
docker run --rm -it --network nginxproxy_public-net kalilinux/kali-rolling /bin/bash
apt update && apt install -y nmap sqlmap curl

nmap -F nginx-gateway
nmap -F php-backend-exposed

# Backend langsung → BERHASIL; via Nginx → GAGAL (400/403)
sqlmap -u "http://php-backend-exposed/api.php/users?id=1" --batch --banner
sqlmap -u "http://nginx-gateway/api/users?id=1" --batch --banner
```

Monitor log: `docker logs -f nginx-gateway`.

## Lab B: HalimunProxy — Encrypted Reverse Proxy

HalimunProxy adalah reverse proxy berbasis **Rust** dengan lapisan keamanan jauh lebih ketat:

| Fitur | NginxProxy | HalimunProxy |
|---|---|---|
| Enkripsi payload | Tidak ada | **AES-256-CBC wajib** |
| Replay protection | Tidak ada | **Nonce + Timestamp** |
| URL camouflage | URL asli terlihat | **URL di-obfuscate** |
| SSRF protection | Tidak ada | **Blokir IP internal** |
| Basic Auth | Tidak ada | **Username/Password** |

### Komponen lab

| Komponen | URL/Port | Keterangan |
|---|---|---|
| Dashboard Lab | `http://localhost:8080` | Via Nginx (Basic Auth `admin/admin`) |
| Halimun Proxy | `http://localhost:8080/proxy/` | Jalur terenkripsi |
| Direct Backend | `http://localhost:5000` | Akses langsung — **RENTAN** |
| Admin Dashboard | `http://localhost:8080/dashboard/` | Statistik traffic real-time |

Arsitektur: Nginx gateway (Basic Auth + Rate Limit, port 8080) → Halimun Proxy Rust (port 7878, internal) → Backend protected. Port 7878 **tidak terlihat** dari jaringan publik.

### Menjalankan lab

```bash
cd HandsOnServerProxy/HalimunProxy
docker-compose up -d --build
# Catatan: proses build pertama kali makan waktu 1-3 menit karena HalimunProxy pakai Rust
```

### Skenario serangan & defense

**Basic Auth** — request tanpa auth ditolak:

```bash
curl -I http://localhost:8080/proxy/1/users              # → 401 Unauthorized
curl -u admin:admin -I http://localhost:8080/proxy/1/users
```

**Enkripsi wajib** — payload plaintext ke jalur proxy ditolak (400/403):

```bash
curl -u admin:admin -X POST http://localhost:8080/proxy/1/users \
  -H "Content-Type: application/json" -d '{"test": "plain text, bukan enkripsi"}'
```

**Replay protection** — klik request yang sama dua kali dari dashboard: request pertama → `200 OK`, request kedua → **ditolak karena nonce sudah dipakai**.

**sqlmap vs HalimunProxy — GAGAL TOTAL:**

```bash
# Direct backend tetap berhasil
sqlmap -u "http://php-backend-exposed/api.php/users?id=1" --batch --banner

# Via HalimunProxy → gagal
sqlmap -u "http://nginx-gateway/proxy/1/ANY" \
  --headers="Authorization: Basic ***" --method=POST --data="x=test" --batch
```

Analisis materi: sqlmap gagal karena Halimun-Proxy menolak semua payload yang nggak terenkripsi AES-256-CBC. Scanner otomatis nggak bisa fuzzing karena setiap request dianggap "sampah" oleh proxy.

## Perbandingan Akhir: Tanpa Proxy vs NginxProxy vs HalimunProxy

| Vektor serangan | Tanpa proxy | NginxProxy | HalimunProxy |
|---|---|---|---|
| Akses file config | BERHASIL | 403 Blocked | 403 Blocked |
| SQL Injection (sqlmap) | BERHASIL | 400 Blocked | **GAGAL TOTAL** |
| Brute force API | Bebas | Rate limited | Rate limit + Auth |
| Header info leak | Terlihat | Sebagian | Tersembunyi penuh |
| Replay attack | BERHASIL | BERHASIL | **Ditolak (nonce)** |
| SSRF attack | BERHASIL | Parsial | Blokir IP internal |
| Nikto scan | Banyak temuan | Sebagian diblokir | Semua diblokir |

> [!IMPORTANT]
> Pelajaran besar pertemuan ini: **Nginx biasa sudah menutup vektor dasar (path, SQLi pattern, rate limit), tapi tetap kalah di vektor yang butuh kripto** — replay, payload yang harus diacak/terenkripsi, dan SSRF. Itu pekerjaan HalimunProxy.

## Latihan Mandiri (dari materi)

- **Rate limit analysis:** bombardir `/api/users` dengan loop 50 request, amati kapan muncul `429 Too Many Requests` dan kapan normal lagi.
- **WAF custom rule:** buka `HandsOnServerProxy/NginxProxy/nginx-proxy/default.conf`, tambah rule blokir keyword `xss` di query string, restart nginx-proxy, uji.
- **Replay attack:** capture parameter request via DevTools, kirim ulang payload sama via curl, jelaskan kenapa ditolak.
- **Header analysis:** tabel perbandingan header response direct vs NginxProxy vs HalimunProxy — informasi apa yang berhasil disembunyikan tiap layer.

```quiz
Q: Reverse proxy berbeda dari forward proxy karena...
+ Reverse proxy melindungi server (didepan backend), forward proxy melindungi client
- Reverse proxy hanya untuk VPN
- Keduanya posisinya sama persis
> Contoh forward: VPN/Tor (sembunyikan identitas user); contoh reverse: Nginx/HAProxy (sembunyikan & lindungi backend).

Q: Pada lab NginxProxy, akses `http://localhost:5000/api.php/config` secara langsung menghasilkan...
+ Data sensitif (API keys & DB password) terekspos
- 403 Forbidden
- 400 Bad Request
> Port 5000 adalah backend exposed yang tanpa filter; lewat proxy 8080 path ini diblokir 403.

Q: Saat sqlmap diarahkan ke NginxProxy (port 8080), hasilnya...
+ Gagal — diblokir 400/403 oleh WAF rules proxy
- Berhasil seperti ke backend langsung
- Membuat container nginx crash
> WAF rules Nginx mendeteksi pola SQLi (union/select/drop) sebelum request sampai ke backend.

Q: Fitur HalimunProxy yang tidak dimiliki NginxProxy adalah...
+ Enkripsi payload AES-256-CBC wajib, replay protection nonce, URL camouflage, dan SSRF guard
- Rate limiting
- Menyembunyikan header Server
> Empat tambahan Halimun: enkripsi wajib, nonce+timestamp, obfuskasi URL, blokir IP internal.

Q: Replay protection pada HalimunProxy bekerja dengan...
+ Nonce dan timestamp — request kedua dengan nonce yang sama ditolak meski payload identik
- Memblokir IP yang sama selamanya
- Mengganti password tiap request
> Nonce dipakai sekali; pengiriman ulang request yang sama langsung ditolak.

Q: Port internal Halimun Proxy (7878) dari jaringan publik...
+ Tidak terlihat saat nmap scan
- Terbuka untuk semua orang
- Menampilkan banner Rust
> Nmap dari Kali hanya melihat gateway & backend; port 7878 tersembunyi di jaringan internal.

Q: Kenapa sqlmap gagal total terhadap HalimunProxy meski backend PHP-nya sama?
+ Proxy menolak semua payload yang tidak terenkripsi AES-256-CBC sehingga scanner tidak bisa fuzzing
- Backend-nya dimatikan
- sqlmap tidak bisa dipakai di Docker
> Sama-sama PHP backend, tapi lapisan enkripsi wajib membuat setiap request plaintext dianggap sampah oleh proxy.

Q: Header information leakage pada perbandingan akhir paling tersembunyi penuh di...
+ HalimunProxy
- Tanpa proxy
- NginxProxy
> Tanpa proxy info server terlihat, NginxProxy menyembunyikan sebagian, HalimunProxy tersembunyi penuh.

Q: Serangan SSRF pada tabel perbandingan ditangani HalimunProxy dengan...
+ Memblokir akses ke IP internal
- Rate limit 10 req/detik
- Mengubah User-Agent
> SSRF adalah permintaan server ke resource internal; Halimun menolak IP internal, NginxProxy hanya parsial.
```