# Pertemuan 2 — Cryptography 101: Dasar-Dasar Kriptografi untuk Keamanan Jaringan

Catatan ini disusun dari materi dosen di `Network-Security-Course-Bank/Pertemuan2.md` (judul asli: "Pertemuan 2: Cryptography 101"). Fokusnya: pilar kriptografi (hashing, enkripsi simetris, asimetris) plus praktik langsung pakai OpenSSL — mulai dari hashing file, enkripsi AES, RSA, sampai sertifikat SSL/TLS.

## Apa Itu Kriptografi?

**Kriptografi** adalah teknik mengubah pesan yang bisa dibaca jadi kode rahasia, lalu mengembalikannya jadi pesan asli. Tujuannya: cuma pihak berhak yang bisa membaca pesannya.

Analogi dari materi: bayangkan kamu kirim surat cinta.
- **Tanpa kriptografi** → surat dikirim terbuka, semua orang bisa baca.
- **Dengan kriptografi** → surat dimasukkan ke brankas terkunci, hanya penerima yang punya kunci bisa membuka.

Peran di keamanan jaringan: tanpa kripto, penyerang yang menyadap (`eavesdropping`) bisa langsung baca password kamu. Dengan kripto, penyerang cuma dapat data acak yang nggak berguna.

## Tiga Pilar Kriptografi

### 2.1 Hashing

Hashing mengubah data jadi **"sidik jari digital" dengan panjang tetap**.

Ciri-ciri hashing (dari materi):
- **Satu arah** — nggak bisa dikembalikan ke data asli.
- **Input sama → output selalu sama** (deterministik).
- **Perubahan sedikit → output sangat berbeda** (avalanche effect).

```
Input: "Password123"  → Hash: a4f5d2e8...
Input: "Password124"  → Hash: 8b3e7c1... (sangat berbeda)
```

Kegunaan: menyimpan password, verifikasi file nggak berubah, tanda tangan digital.

### 2.2 Enkripsi Simetris

**Satu kunci** dipakai buat ngunci DAN membuka.

```
Pesan: "Halo" → [🔐 Kunci: rahasia] → "XyZ@123" → [🔑 Kunci: rahasia] → "Halo"
```

Analogi: lemari dengan satu kunci. Yang punya kunci bisa ngunci dan membuka. Algoritma populer: **AES (Advanced Encryption Standard)**.

### 2.3 Enkripsi Asimetris

**Dua kunci berbeda**: satu buat ngunci (publik), satu buat membuka (privat).

Analogi: kotak surat dengan celah untuk memasukkan surat (kunci publik), tapi cuma pemilik yang punya kunci buat membuka (kunci privat). Algoritma populer: **RSA**.

> [!NOTE]
> Ringkasnya: **hash = sidik jari** (nggak bisa balik), **simetris = 1 kunci** (cepat, tapi kunci harus dibagi aman), **asimetris = 2 kunci** (nggak perlu bagi kunci rahasia, tapi lebih lambat & terbatas ukurannya).

## Setup Lab untuk Pertemuan 2

```bash
cd ~/netsec-lab
docker-compose exec kali-attacker bash

apt update
apt install -y openssl coreutils

mkdir -p /root/crypto-lab
cd /root/crypto-lab
echo "Ini adalah pesan rahasia" > pesan.txt
echo "Password: admin123" > password.txt
```

## Hands-On: Hashing dengan md5sum & sha256sum

```bash
cd /root/crypto-lab
echo "Halo Dunia" > file.txt

md5sum file.txt
# 5f4dcc3b5aa765d61d8327deb882cf99  file.txt   (16 karakter)

sha256sum file.txt
# 7f83b1657ff1fc53b92dc18148a1d65d...  file.txt  (64 karakter - lebih aman)
```

**SHA-256 lebih panjang dan lebih aman dari MD5.**

### Membuktikan avalanche effect

```bash
echo "Halo Dunia" > file1.txt
echo "Halo dunia" > file2.txt   # huruf 'd' kecil
sha256sum file1.txt
sha256sum file2.txt
# Hash sangat berbeda meski cuma beda kapitalisasi!
```

### Verifikasi file nggak berubah

```bash
echo "Data Ujian: 90" > nilai.txt
sha256sum nilai.txt > nilai.txt.sha256
sha256sum -c nilai.txt.sha256     # → nilai.txt: OK

echo "Data Ujian: 100" > nilai.txt   # ubah file
sha256sum -c nilai.txt.sha256     # → nilai.txt: FAILED
```

### Menyimpan password dengan hash

```bash
# JANGAN PERNAH simpan password asli; simpan hash-nya
echo -n "alice123" | sha256sum > alice.hash

# Saat login, hash input lalu bandingkan dengan hash di database
input_hash=$(echo -n "alice123" | sha256sum)
stored_hash=$(cat alice.hash)
[ "$input_hash" = "$stored_hash" ] && echo "BERHASIL" || echo "GAGAL"
```

> [!IMPORTANT]
> Ini dasar kenapa database password selalu disimpan sebagai hash. Tapi catatan tambahan (bukan dari materi dosen): di dunia nyata hash polos kayak gini masih rawan *rainbow table*, jadi password biasanya di-*salt* dan pakai fungsi KDF (mis. bcrypt/argon2). Materi Cuma memperkenalkan konsep hash-nya.

## Hands-On: Enkripsi Simetris (AES)

```bash
# Enkripsi dengan AES-256-CBC + salt
openssl enc -aes-256-cbc -salt -in surat-cinta.txt -out surat-cinta.enc
# Diminta masukkan password 2x

# Dekripsi
openssl enc -aes-256-cbc -d -in surat-cinta.enc -out surat-cinta-dekripsi.txt

# Versi base64 (biar bisa dikirim via email sebagai teks)
openssl enc -aes-256-cbc -salt -in surat-cinta.txt -out surat-cinta.b64 -base64
```

Eksperimen password salah:

```bash
openssl enc -aes-256-cbc -d -in surat-cinta.enc -out coba.txt -pass <password-salah>
# Akan muncul error: bad decrypt → file kosong/rusak
```

## Hands-On: Enkripsi Asimetris (RSA)

### Bikin pasangan kunci

```bash
openssl genrsa -out private.pem 2048          # kunci privat (RAHASIA!)
openssl rsa -in private.pem -pubout -out public.pem   # kunci publik (boleh disebar)
```

### Enkripsi pakai kunci publik → dekripsi pakai kunci privat

```bash
echo "Transfer Rp 10.000.000 ke rekening 123-456-789" > perintah.txt

openssl rsautl -encrypt -inkey public.pem -pubin -in perintah.txt -out perintah.enc
openssl rsautl -decrypt -inkey private.pem -in perintah.enc -out perintah-dekripsi.txt
```

### Keterbatasan RSA

```bash
# RSA hanya bisa enkripsi data kecil (< 256 byte)
openssl rsautl -encrypt -inkey public.pem -pubin -in data-besar.txt -out out.enc
# ERROR: data too large for key size
```

**Solusi:** pakai **hybrid encryption** — RSA buat mengamankan kunci simetris, AES buat datanya.

> [!TIP]
> Hybrid encryption inilah cara TLS/HTTPS kerja: asimetris buat bertukar kunci, simetris buat enkripsi data sesi. Ingat pola ini karena bakal muncul lagi di sertifikat & handshake WPA2.

## Hands-On: Sertifikat SSL/TLS

### Bikin sertifikat self-signed

```bash
openssl genrsa -out server.key 2048
openssl req -new -x509 -days 365 -key server.key -out server.crt \
  -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Lab Security/CN=localhost"
```

### Baca isi sertifikat

```bash
openssl x509 -in server.crt -text -noout          # detail lengkap
openssl x509 -in server.crt -noout -subject       # pemilik (CN=localhost)
openssl x509 -in server.crt -noout -dates         # masa berlaku
openssl x509 -in server.crt -noout -fingerprint -sha256
```

- **Subject** = pemilik sertifikat
- **Issuer** = penerbit; karena self-signed, sama dengan Subject
- **Validity** = masa berlaku
- **Public Key** = kunci publik server

### Analisis sertifikat website asli

```bash
echo -n | openssl s_client -connect google.com:443 2>/dev/null | \
    sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > google.crt

openssl x509 -in google.crt -noout -issuer
openssl x509 -in google.crt -noout -subject
openssl x509 -in google.crt -noout -dates
```

> [!IMPORTANT]
> Self-signed cert nggak dipercaya browser karena Issuer = Subject (nggak ada CA pihak ketiga yang menjamin). Ini alasan muncul peringatan "sertifikat nggak valid" saat kamu buka situs dengan cert self-signed.

## Latihan Mandiri (dari materi)

1. **Verifikasi file penting** — bikin `passwords.txt`, hash pakai `sha256sum`, simpan file hash, cek nanti pakai `sha256sum -c`.
2. **Kirim pesan rahasia ke teman** — enkripsi AES `-base64`, kirim isinya, teman dekripsi pakai password sama.
3. **Bikin sertifikat website palsu** — `openssl req -new -x509 -days 30 -newkey rsa:2048 ... -subj "/CN=belajar-keamanan.local"`.
4. **Script enkripsi sederhana** — menu enkripsi/dekripsi pakai `openssl enc`.
5. **Verifikasi tanda tangan digital** — `openssl dgst -sha256 -sign private.pem -out kontrak.sig kontrak.txt`, lalu verifikasi pakai kunci publik. Kalau dokumen diubah → `Verification Failure`.

## Ringkasan Perintah Penting

| Fungsi | Perintah |
|---|---|
| Hash MD5 | `md5sum file.txt` |
| Hash SHA-256 | `sha256sum file.txt` |
| Enkripsi AES | `openssl enc -aes-256-cbc -in file.txt -out file.enc` |
| Dekripsi AES | `openssl enc -aes-256-cbc -d -in file.enc -out file.txt` |
| Bikin kunci RSA | `openssl genrsa -out private.pem 2048` |
| Ekstrak kunci publik | `openssl rsa -in private.pem -pubout -out public.pem` |
| Enkripsi RSA | `openssl rsautl -encrypt -inkey public.pem -pubin -in file.txt -out file.enc` |
| Dekripsi RSA | `openssl rsautl -decrypt -inkey private.pem -in file.enc -out file.txt` |
| Bikin sertifikat | `openssl req -new -x509 -days 365 -key server.key -out server.crt` |
| Lihat sertifikat | `openssl x509 -in server.crt -text -noout` |

```quiz
Q: Ciri khas fungsi hash yang benar adalah...
+ Satu arah, deterministik, dan perubahan kecil mengubah hash drastis
- Bisa dibalik jadi data asli dengan kunci
- Input berbeda selalu menghasilkan hash sama
> Hashing itu one-way dan deterministik; avalanche effect bikin perubahan kecil = hash sangat berbeda.

Q: Enkripsi simetris berarti...
+ Satu kunci yang sama dipakai untuk mengunci dan membuka
- Kunci publik untuk mengunci, kunci privat untuk membuka
- Tidak memakai kunci sama sekali
> Simetris = satu kunci shared (contoh AES); asimetris = pasangan kunci publik/privat (contoh RSA).

Q: Algoritma yang DIBANGUN di atas prinsip "dua kunci" adalah...
+ RSA
- AES
- MD5
> RSA asimetris (2 kunci); AES simetris; MD5 itu fungsi hash, bukan enkripsi.

Q: Hash SHA-256 menghasilkan output sepanjang...
+ 64 karakter heksadesimal
- 16 karakter heksadesimal
- 128 karakter heksadesimal
> SHA-256 = 256 bit = 64 karakter heks; MD5 = 128 bit = 32 karakter (16 byte).

Q: Perintah untuk memverifikasi file tidak berubah memakai file hash yang sudah dibuat adalah...
+ sha256sum -c file.txt.sha256
- sha256sum file.txt > file.txt.sha256
- openssl enc -aes-256-cbc -d -in file.txt
> `-c` (check) membandingkan file dengan hash tersimpan; kalau beda, hasilnya FAILED.

Q: Kenapa RSA tidak bisa mengenkripsi file besar?
+ Data yang bisa dienkripsi terbatas oleh ukuran kunci (mis. < 256 byte untuk 2048-bit)
- RSA hanya bisa mengenkripsi teks berbahasa Inggris
- RSA menghapus file besar secara otomatis
> Ukuran blok RSA dibatasi ukuran kunci. Solusinya hybrid encryption: RSA untuk kunci, AES untuk data.

Q: Pada sertifikat self-signed, Issuer-nya...
+ Sama dengan Subject-nya sendiri
- Selalu "Let's Encrypt"
- Dikosongkan
> Karena nggak ditandatangani CA, penerbitnya ya dirinya sendiri; itu sebabnya nggak dipercaya browser.

Q: Kegagalan `openssl enc -aes-256-cbc -d` dengan password salah akan menampilkan error...
+ bad decrypt
- data too large for key size
- Verification Failure
> Password salah bikin AES-CBC nggak bisa dekripsi → "bad decrypt". "Verification Failure" khusus verifikasi tanda tangan digital.

Q: Perintah untuk mendekripsi file dengan kunci privat adalah...
+ openssl rsautl -decrypt -inkey private.pem -in file.enc -out file.txt
- openssl rsautl -encrypt -pubin -inkey public.pem -in file.txt
- openssl genrsa -out private.pem 2048
> `-decrypt` + `-inkey private.pem` = membuka dengan kunci privat; enkripsi pakai kunci publik.

Q: Konsep di balik tanda tangan digital pada latihan materi adalah...
+ Hash dokumen lalu enkripsi hash-nya dengan kunci privat
- Enkripsi seluruh dokumen dengan kunci publik
- Menyimpan dokumen di server terpusat
> Tanda tangan = hash + kunci privat; verifikasi pakai kunci publik. Ubah dokumen → verifikasi gagal.
```