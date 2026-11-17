# Pertemuan 2 — ISO 27001, Annex SL & Konteks Organisasi

Catatan dari video materi dosen `materi/pertemuan-02-iso-27001-annex-sl.mp4`
(transkrip lengkap: `catatan/transkrip-pertemuan-02.md`). PDF pendamping
(`pertemuan-02-iso-27001-annex-sl-konteks-organisasi.pdf`, 15 halaman) isinya
slide gambar — gak ada teks yang bisa diekstrak, jadi video ini sumber utamanya.

Materi ini lanjutan P1 — kalau P1 ngebahas **pilar** keamanan (CIA Triad),
P2 ngebahas **kerangka tata kelolanya**, alias "cetak biru arsitektur".

## 0. Peta jalan yang dosen sebut sendiri

1. Pengantar standar keamanan
2. Struktur Annex SL
3. Konteks organisasi
4. Perbandingan standar keamanan
5. Kontrol keamanan ISO 27002

## 1. Pengantar standar keamanan — kenapa butuh kerangka kerja?

Analoginya kastil (dosen pakai ini, jadi inget versinya):

> Bayangin bikin kastil raksasa pakai batu kualitas nomor satu, pintu kayu jati
> super kuat, dan parit paling dalam — **tapi tanpa cetak biru sama sekali**.
> Kalau semua ditaruh acak-acakan, musuh tinggal nyari celah dan masuk.

Sama kayak itu, beli firewall termahal + antivirus terbaik **tanpa panduan
standar** cuma menghasilkan keamanan yang:

| Masalah | Artinya |
|---|---|
| Reaktif | Baru gerak setelah kena serangan |
| Kacau | Gak ada pembagian tanggung jawab jelas |
| Gak terukur | Gak bisa dibuktikan berhasil atau nggak |

Standarnya = **ISO/IEC 27001**. Tanpa ini, usaha ngamanin aset organisasi
ujungnya cuma "permainan tembak-tembakan".

## 2. Struktur Annex SL — arsitektur universal

**Annex SL** = bahasa/kerangka arsitektur universal buat semua sistem manajemen
modern (bukan cuma keamanan informasi — ISO 9001, ISO 14001, dll pakai ini juga).

Kenapa penting: dia menyederhanakan hal rumit jadi **langkah berurutan yang
selalu sama**, jadi tiap sistem manajemen ikut alur logis identik:

```
Perencanaan awal (pahami kondisi lapangan)
        ↓
Penetapan kepemimpinan & kebijakan
        ↓
Perencanaan risiko
        ↓
Implementasi
        ↓
Evaluasi
```

Efeknya: upaya keamanan di berbagai divisi perusahaan jadi bisa **disatuin**
dalam satu sistem yang konsisten.

> [!IMPORTANT]
> Alur Annex SL ini bukan urutan acak — dia siklus. Evaluasi balik lagi nge-feed
> perencanaan berikutnya (konsep *continuous improvement*).

## 3. Konteks organisasi — "mengenali medan tempur"

Sebelum naruh batu pertama, wajib ngamatin medan tempurnya dulu.

Definisi kunci dari dosen:

> [!IMPORTANT]
> **ISMS** (*Information Security Management System*) **bukan** software atau
> hardware canggih. Itu **salah kaprah**. ISMS = sistem tata kelola menyeluruh
> yang mencakup **orang, kebijakan, proses, dan teknologi pendukung** — dikelola
> sistematis buat melindungi aset digital organisasi.

**Konsekuensinya: "one size fits all" gak berlaku.** Desain ISMS wajib beda
tergantung konteks organisasi:

| Aspek konteks | Contoh bedanya |
|---|---|
| Kultur perusahaan | Startup remote-serba-cepat vs korporat hierarkis |
| Syarat legal/regulasi | Bank multinasional diatur hukum super ketat |
| Ekspektasi klien | Kontrak enterprise butuh jaminan compliance |
| Ukuran & skala | 10 orang vs 10.000 orang |

Faktor internal & eksternal ini yang **nentuin arah keseluruhan strategi
keamanan** — bukan pilihan teknologi duluan.

## 4. Perbandingan standar keamanan — apa yang bikin ISO 27001 beda?

| | Standar/framework lain | ISO/IEC 27001 |
|---|---|---|
| **Sudut pandang** | Sempit & teknis | Makro & tata kelola |
| **Contoh isi** | "Tutup port ini", "pakai enkripsi X" | Cetak biru tata kelola menyeluruh |
| **Yang ditanya** | Teknologinya apa? | Gimana manajemen **mengelola, mengevaluasi, dan terus memperbaiki** teknologi itu? |
| **Sifat** | Checklist | Siklus perbaikan berkelanjutan |

Intinya: framework teknis ngasih **daftar tugas**; ISO 27001 ngasih **cara
mengurus daftar tugas itu dari atas ke bawah**.

## 5. Kontrol keamanan ISO 27002 — "bahan bangunan" teknisnya

Nah, kalau ISO 27001 itu cetak birunya, **ISO 27002** isinya katalog
kontrolnya (bahan bangunan aktualnya).

**Yang menarik: kontrol dipetakan pakai sistem tagar ke CIA Triad** (yang udah
kita pelajari di P1). Jadi tiap kontrol jelas apakah dia:

| Sifat kontrol | Fungsi | Nyambung ke pilar |
|---|---|---|
| **Preventif** | Proteksi dari awal | Confidentiality (jaga kerahasiaan sejak awal) |
| **Korektif** | Respons + pemulihan | Integrity / Availability (balikin sistem setelah insiden) |

> [!TIP]
> Cara ingetnya: **preventif = pintu & gembok**, **korektif = alarm & pemadam
> kebakaran**. Yang pertama nahan, yang kedua nanganin kalau udah jebol.

Contoh aplikasi nyata yang dosen sebut:
- Bikin kebijakan keamanan yang tegas
- Memisahkan tugas-tugas krusial (*separation of duties*)
- Aturan ketat untuk hubungan dengan pihak ketiga (vendor/supplier)
- Proses disiplin buat staf internal yang melanggar aturan

Kombinasi kebijakan teknis + non-teknis inilah yang — pinjam istilah dosen —
jadi "**pintu, kamera pengawas, dan tembok operasional**" kita.

Tujuannya: biar gampang disesuaikan sama risiko masing-masing organisasi.

## Refleksi / bahan diskusi

Dosen kasih pertanyaan penutup (yang nyambung ke praktikum minggu 4–5):

> Kalau hari ini kamu ditunjuk jadi **arsitek ISMS** buat startup teknologi yang
> baru banget dibangun — faktor internal & eksternal spesifik apa yang nentuin
> konteks organisasinya, **sebelum** kamu pasang satu pun kontrol ISO 27002?

Petunjuk: jawab dari 4 aspek konteks organisasi di bagian 3 (kultur, legal,
ekspektasi klien, skala).

```quiz
Q: Analogi dosen soal "kastil tanpa cetak biru" dipakai buat menjelaskan apa?
+ Bahwa punya alat keamanan terbaik tanpa standar/kerangka kerja itu percuma — celah tetap ketemu
- Bahwa kastil itu mahal
- Bahwa firewall adalah hal utama
- Bahwa keamanan itu soal fisik
> Batu bagus + parit dalam tetap bocor kalau ditaruh acak-acakan. Standarnya = ISO/IEC 27001.

Q: Apa itu Annex SL, sesuai penjelasan dosen?
+ Kerangka arsitektur universal untuk sistem manajemen modern — alur langkahnya selalu sama
- Fitur tambahan di ISO 27001
- Daftar kontrol teknis keamanan
- Nama lain dari CIA Triad
> Annex SL dipakai semua sistem manajemen (keamanan, mutu, lingkungan) supaya alur perencanaan → kepemimpinan → risiko → implementasi → evaluasi konsisten.

Q: Menurut dosen, ISMS itu apa?
+ Sistem tata kelola menyeluruh (orang, kebijakan, proses, teknologi) — BUKAN software/hardware
- Software manajemen keamanan
- Perangkat keras firewall
- Tim keamanan IT saja
> Dosen tegas bilang "ISMS itu bukan software/hardware, itu salah kaprah" — dia mencakup orang, kebijakan, proses, dan teknologi.

Q: Kenapa pendekatan "one size fits all" gak berlaku dalam merancang ISMS?
+ Karena desain ISMS harus menyesuaikan konteks organisasi (kultur, legal, klien, skala)
- Karena tiap organisasi punya firewall beda
- Karena ISO melarangnya
- Karena software beda-beda
> Bank multinasional yang diatur ketat ≠ startup kecil yang serba cepat. Faktor internal & eksternal nentuin arah strategi keamanan.

Q: Yang paling membedakan ISO 27001 dari framework teknis lain, menurut dosen?
+ Pendekatannya makro — cetak biru tata kelola, bukan checklist teknis sempit
- Lebih mahal
- Lebih banyak halamannya
- Hanya buat perusahaan besar
> Framework lain: "tutup port ini, pakai enkripsi itu". ISO 27001 nanya: gimana manajemen mengelola, evaluasi, dan terus memperbaiki teknologi itu.

Q: Kontrol preventif vs korektif di ISO 27002 — pemetaannya ke CIA Triad gimana?
+ Preventif dipetakan ke Confidentiality (proteksi dari awal), korektif ke respons/pemulihan (Integrity & Availability)
- Preventif ke Availability, korektif ke Confidentiality
- Dua-duanya cuma ke Integrity
- Gak ada hubungannya sama CIA Triad
> Dosen bilang kontrol preventif/korektif dipetakan pakai sistem tagar ke CIA Triad: cegah sejak awal vs pulihkan setelah insiden.

Q: Mana yang BUKAN contoh aplikasi kontrol yang dosen sebut?
+ Mengganti semua server tiap tahun
- Bikin kebijakan keamanan yang tegas
- Memisahkan tugas-tugas krusial (separation of duties)
- Aturan ketat untuk hubungan dengan pihak ketiga
> Yang disebut: kebijakan tegas, pemisahan tugas, aturan pihak ketiga, proses disiplin staf pelanggar. "Ganti server tiap tahun" gak ada di materi.
```
