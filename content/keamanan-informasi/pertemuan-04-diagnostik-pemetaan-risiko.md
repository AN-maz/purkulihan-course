# Pertemuan 4 — Diagnostik & Pemetaan Risiko

Catatan dari slide dosen `materi/diagnostik-risiko-keamanan-informasi.pdf` — PDF-nya
image-only, jadi teksnya aku ambil dari hasil OCR di
`materi/diagnostik-risiko-keamanan-informasi.txt` (15 halaman).

Kalau P1 bahas pilar (CIA Triad) dan P2 bahas cetak biru tata kelola (Annex SL), P4
ini masuk ke fase **diagnostik**: ngumpulin bukti, menganalisis, dan memetakan risiko
sebelum nentuin "obatnya". Alurnya dari teori ISO 27001:2022 klausul 6.1.2 menuju
aplikasi praktis lewat studi kasus **Metalmecanica S.A.**

## Halaman 1 — Sampul: Diagnostik & Pemetaan Matriks Risiko

Judul materi: **Manajemen Risiko — Diagnostik & Pemetaan Matriks Risiko** untuk
mata kuliah Keamanan Informasi (IF-103), Pertemuan Ke-4, Teknik Informatika,
Universitas Teknologi Bandung. Framing utamanya: *"Dari Teori ISO 27001:2022 menuju
Aplikasi Praktis (Studi Kasus Metalmecanica S.A.)"* — jadi teori standar langsung
dipraktikin ke kasus nyata di sesi workshop.

## Halaman 2 — Target Diagnostik Hari Ini (CPMK 063)

Tiga sub-CPMK yang jadi capaian pembelajaran hari ini:

| Sub-CPMK | Kemampuan | Output |
|---|---|---|
| 063.1 | Mengidentifikasi aset informasi kritis yang dimiliki organisasi | Inventarisasi Aset |
| 063.2 | Mengklasifikasikan aset berdasarkan tingkat kepentingannya (CIA Triad) | Valuasi Aset |
| 063.3 | Menyusun analisis risiko memakai metode penilaian risiko | Matriks Risiko |

Jadi tiga output ini berurutan: dulu *apa aja* asetnya, terus *seberapa penting*
tiap aset, baru *seberapa bahaya* skenario risikonya.

## Halaman 3 — Mandat Standar Global: ISO/IEC 27001:2022 (Klausul 6.1.2)

Klausul 6.1.2 nyuruh organisasi lewat **empat langkah berurutan**:

| Langkah | Inti kerjanya |
|---|---|
| **Menetapkan Kriteria** | Tentukan kriteria pelaksanaan asesmen (sebelum mulai nilai apa pun) |
| **Mengidentifikasi Risiko** | Temukan potensi hilangnya Konfidensialitas, Integritas, dan Availability pada aset dalam ruang lingkup |
| **Menganalisis Risiko** | Ases konsekuensi (Dampak) dan kemungkinan realistis terjadinya (Likelihood) untuk menentukan level risiko |
| **Mengevaluasi Risiko** | Komparasi hasil asesmen dengan kriteria akseptasi risiko untuk memprioritaskan penanganan risiko; penetapan tingkat akseptasi oleh pemilik risiko |

> [!IMPORTANT]
> Kuncinya di langkah 4: hasil analisis **dibandingkan sama kriteria akseptasi**,
> bukan cuma "kelihatan berbahaya nggak". Di situlah risiko jadi bisa
> diprioritaskan, dan pemilik risiko (*risk owner*) yang mutusin mau nerima atau nggak.

## Halaman 4 — Anatomi Risiko: Model Konsekuensial

Formula dasarnya:

```
Risiko = Aset × Ancaman × Kerentanan
```

| Elemen | Definisi dari slide | Faktor |
|---|---|---|
| **Aset Informasi** | Segala sesuatu yang memiliki nilai bagi organisasi (Data, Hardware, Software, Pengetahuan) | — |
| **Ancaman (Threat)** | Insiden potensial yang dapat mengeksploitasi kerentanan untuk merusak aset | Eksternal / Internal |
| **Kerentanan (Vulnerability)** | Kelemahan bawaan pada aset atau kontrol yang dapat dieksploitasi | Internal |

> [!IMPORTANT]
> Slide negasikan yang umum salah kaprah: **Risiko BUKAN sekadar ketidakpastian.**
> Risiko adalah skenario di mana Ancaman berhasil mengeksploitasi Kerentanan pada
> sebuah Aset. Tanpa salah satu elemen, skenarionya belum jadi risiko.

## Halaman 5 — Langkah 1: Inventarisasi & Kategorisasi Aset

Taksonomi aset yang dipakai (kode-kode ini yang dipakai terus di halaman berikutnya):

| Kode | Kategori | Cakupan |
|---|---|---|
| PI | Physical Info | Infrastruktur fisikal / dokumental |
| S | Software | Perangkat lunak |
| N | Network | Infrastruktur jaringan |
| LS | Local Server | Server lokal |
| CE | Equipment | Perangkat keras komputer / peralatan |
| ST | Storage | Media penyimpanan |
| BN | Business Knowledge | Pengetahuan non-tangibel & Sumber Daya Manusia |

## Halaman 6 — Langkah 2: Valuasi Aset (CIA Triad)

> Nilai sebuah aset ditentukan oleh **tingkat kerugian jika prinsip keamanannya
> dilanggar** — bukan harga beli asetnya.

Tiap pilar diberi skala High / Medium / Low:

| Pilar | Pertanyaan dampaknya |
|---|---|
| **Kerahasiaan (Confidentiality)** | Dampak jika informasi diakses oleh pihak yang tidak sah |
| **Keutuhan (Integrity)** | Dampak jika informasi diubah secara tidak sah atau tidak akurat |
| **Ketersediaan (Availability)** | Dampak jika informasi/sistem tidak dapat diakses saat dibutuhkan |

Jadi aset yang "murah" secara harga bisa aja valuasi CIA-nya High kalau kerugiannya
ngehantam salah satu pilar berat.

## Halaman 7 — Langkah 3: Pemetaan — Profil Ancaman (Threat Profiling)

> Ancaman bertujuan mengeksploitasi kerentanan untuk **meminimalkan prinsip CIA**
> dari aset.

| Disengaja / Manusia | Tidak Disengaja / Alam |
|---|---|
| Sabotase internal | Bencana alam (Banjir, Gempa) |
| Peretasan (Hacking) | Kegagalan listrik / Hardware |
| Pencurian | Kesalahan konfigurasi oleh admin |
| Rekayasa sosial (Phishing) | Kehilangan media penyimpanan |

> [!TIP]
> Cara ingetnya: kolom kiri = **ada niat jahat** (manusia lawan manusia), kolom
> kanan = **gak ada yang berniat** (kegagalan & alam). Tapi dua-duanya tetap
> masuk hitungan risiko selama bisa ngorbanin CIA aset.

## Halaman 8 — Langkah 4: Analisis Kerentanan (Vulnerability)

Kerentanan dipetakan langsung ke kategori aset yang kena imbasnya:

| Kerentanan | Mempengaruhi aset |
|---|---|
| Kurangnya pemisahan tugas (*lack of role segregation*) | BN (Sistem / Proses Bisnis) |
| Konfigurasi informasi yang salah (*incorrect configuration*) | S1/S2 (Software), LS (Server) |
| Sistem operasi tidak diperbarui (*unpatched OS*) | CE (Equipment), N1 (Network) |
| Kelemahan kontrol akses fisik (*weak physical access*) | PI1 (Fisik), ST (Storage) |

Perhatikan polanya: kerentanan **manusia/proses** (pemisahan tugas) mendarat di aset
takberwujud (BN), kerentanan **teknis** mendarat di aset bersifat fisik/teknis.

## Halaman 9 — Merangkai Titik: Skenario Risiko

Semua elemen digabung jadi satu kalimat risiko utuh:

| Elemen | Isinya |
|---|---|
| **Aset (N1 Jaringan)** | Router Utama Perusahaan (Nilai CIA Tinggi) |
| **Kerentanan** | Firmware router tidak di-patch sejak 2021 |
| **Ancaman** | Serangan ransomware eksternal |
| **Skenario Risiko** | Ransomware berhasil menembus jaringan melalui router yang rentan → sistem manajemen utama mati (Hilangnya Availability & Integrity) |

Ini contoh pamungkas rumus Halaman 4: aset (router) × ancaman (ransomware) ×
kerentanan (firmware basi) = risiko nyata dengan dampak CIA yang jelas.

## Halaman 10 — Sintesis: Membangun Matriks Risiko (Risk Matrix)

Dua sumbu dan satu rumus:

- **Kemungkinan (Likelihood):** seberapa sering skenario ancaman ini diperkirakan terjadi? (skor 1–5)
- **Dampak (Impact / Consequence):** seberapa parah kerusakan pada aset (CIA) jika terjadi? (skor 1–5)

```
Level Risiko = Kemungkinan × Dampak
```

Matriks 5×5 ini yang matriks tugas kelompokmu nanti (Halaman 14):

> [!IMPORTANT]
> Matriks memprioritaskan risiko mana yang butuh **penanganan (Treatment) segera
> (Area Merah)** dan mana yang bisa **diakseptasi (Area Hijau)** — persis kriteria
> akseptasi yang disebut di klausul 6.1.2 (Halaman 3).

## Halaman 11 — Briefing Workshop: Studi Kasus Klien

Profil **METALMECANICA S.A.** — bahan mentah buat diskusi kelompok:

| Aspek | Kondisi di lapangan |
|---|---|
| Basic info | Berdiri 2010, 150 karyawan |
| Peta proses bisnis | Belum sepenuhnya terdefinisi (baru dibuat Maret 2021); mayoritas proses masih manual |
| Infrastruktur & Tim IT | Perangkat keras/komputer sama sejak awal berdiri (2010) |
| Aplikasi | Beberapa aplikasi tidak sepenuhnya menutupi aktivitas bisnis (baru dibuat 2021) |
| SDM TI | Cuma **2 staf IT tingkat menengah** yang nanganin seluruh operasi teknis |

> [!TIP]
> Tiga "penyakit" ini (hardware lawas, proses manual, tim IT minim) itu petunjuk
> buat Task 2 nanti — mereka langsung jadi bahan kerentanan nyata.

## Halaman 12 — Diskusi Kelompok Task 1: Klasifikasi & Valuasi Aset

**Instruksi:** berdasarkan profil Metalmecanica S.A., identifikasi **5–10 aset
informasi kritis** yang kemungkinan besar mereka miliki.

Langkah kerja:
1. Tentukan jenis aset pakai taksonomi: PI, S, N, LS, CE, ST, BN (Halaman 5)
2. Tuliskan deskripsi spesifik aset tersebut
3. Tentukan valuasi/tingkat kepentingan berdasarkan pilar Confidentiality, Integrity, dan Availability (Halaman 6)

Alur: Input = Profil Metalmecanica S.A. → Proses Kerja = 3 langkah di atas →
**Output Expected: Tabel Inventarisasi Aset Dasar.**

## Halaman 13 — Diskusi Kelompok Task 2: Pemetaan Ancaman & Kerentanan

**Instruksi:** untuk tiap aset dari Task 1, buat **minimal satu skenario risiko**
yang relevan sama kondisi Metalmecanica S.A.

| Langkah | Isinya |
|---|---|
| 1. Identifikasi | Kerentanan yang nyata (internal maupun eksternal) — *Hint: 2 staf IT, hardware lama sejak 2010, proses manual* |
| 2. Petakan | Ancaman yang relevan yang dapat mengeksploitasi kelemahan tersebut |

**Output Expected:** Daftar Skenario Risiko yang detail — persis pola
Aset × Kerentanan × Ancaman dari Halaman 9.

## Halaman 14 — Diskusi Kelompok Task 3: Penyusunan Matriks Risiko

**Instruksi:** kuantifikasi skenario risiko dari Task 2 dan petakan ke Matriks
Risiko 5×5.

Langkah kerja:
1. Diskusikan dan berikan skor **Likelihood (1–5)** dan **Impact (1–5)** untuk tiap skenario
2. Hitung Level Risiko total (Kemungkinan × Dampak)
3. Plot tiap aset ke kuadran matriks: **Rendah, Sedang, Tinggi, Kritis**

**Output Expected:** Matriks Risiko visual yang menyoroti **3 risiko paling kritis**
bagi Metalmecanica S.A.

## Halaman 15 — Penutup & Langkah Selanjutnya

| | |
|---|---|
| **Hari ini** | Tenggat: dokumen hasil diskusi kelompok dikumpulkan minggu depan |
| **Bobot** | Kualitas analisis matriks = komponen Tugas/Proyek (**46%** nilai MK) |
| **Pertemuan 5** | Penanganan Risiko (Risk Treatment) & penyusunan Statement of Applicability (SoA) sesuai ISO 27001 |

Analogi penutup dosen:

> Jika minggu ini kita mendiagnosis **"Penyakit" (Risiko)**, minggu depan kita
> akan merumuskan **"Obatnya"**.

Dan penutup slide: *"The diagnostic phase is complete. Proceed to workshop."*

```quiz
Q: Menurut klausul 6.1.2 ISO 27001:2022, urutan langkah manajemen risiko yang benar adalah?
+ Menetapkan kriteria → Mengidentifikasi risiko → Menganalisis risiko → Mengevaluasi risiko
- Mengidentifikasi risiko → Menetapkan kriteria → Mengevaluasi risiko → Menganalisis risiko
- Menganalisis risiko → Mengevaluasi risiko → Menetapkan kriteria → Mengidentifikasi risiko
> Kriteria harus ditetapkan dulu sebelum mulai nyari risiko, karena kriteria itu acuan penilaian. Evaluasi terakhir = bandingkan hasil asesmen dengan kriteria akseptasi buat prioritasin penanganan.

Q: Apa rumus anatomi risiko persis seperti di slide?
+ Risiko = Aset × Ancaman × Kerentanan
- Risiko = Aset × Kemungkinan × Dampak
- Risiko = Ancaman + Kerentanan
> "Aset × Kemungkinan × Dampak" itu rumus LEVEL risiko di matriks (Halaman 10). Anatomi konseptualnya tetap tiga elemen: aset yang diserang, ancaman yang menyerang, dan kerentanan yang dimanfaatin.

Q: Kalau elemen "Kemungkinan × Dampak" dipakai, yang sedang dihitung adalah...
+ Level risiko untuk dipetakan ke Matriks Risiko 5×5
- Nilai valuasi aset berdasarkan CIA Triad
- Jumlah aset kritis dalam inventarisasi
> Level Risiko = Kemungkinan × Dampak (Halaman 10). Valuasi aset (Halaman 6) malah dinilai per pilar C/I/A pakai skala High/Medium/Low, bukan perkalian.

Q: Dalam profil ancaman (Threat Profiling), mana yang termasuk kategori "Tidak Disengaja / Alam"?
+ Kegagalan listrik / hardware
- Rekayasa sosial (Phishing)
- Sabotase internal
> Dua-duanya itu ancaman "Disengaja / Manusia". Kolom tidak disengaja/alam berisi bencana alam, kegagalan listrik/hardware, kesalahan konfigurasi oleh admin, dan kehilangan media penyimpanan.

Q: Kerentanan "kurangnya pemisahan tugas (lack of role segregation)" mempengaruhi kategori aset apa?
+ BN — Sistem / Proses Bisnis
- CE — Equipment (perangkat keras)
- ST — Storage (media penyimpanan)
> Pemisahan tugas itu masalah proses & manusia, jadi mendarat di aset pengetahuan non-tangibel & SDM (BN). CE kena imbas unpatched OS, ST kena imbas kelemahan kontrol akses fisik.

Q: Dalam skenario studi kasus Metalmecanica S.A., mengapa router utama bisa jadi risiko kritis?
+ Karena firmware router nggak di-patch sejak 2021 padahal nilainya CIA tinggi, ancaman ransomware bisa manfaatinnya
- Karena router itu aset paling mahal di kantor
- Karena hanya 2 staf IT yang memegang router
> Rumusnya jalan: aset N1 (router, CIA tinggi) × kerentanan (firmware basi) × ancaman (ransomware eksternal) = sistem manajemen utama mati, hilang Availability & Integrity.

Q: Di matriks risiko 5×5, area merah dan area hijau artinya apa?
+ Merah = risiko yang butuh penanganan (Treatment) segera, hijau = risiko yang bisa diakseptasi
- Merah = aset sudah hilang, hijau = aset aman
- Merah = semua aset High, hijau = semua aset Low
> Matriks ini alat prioritas: hasil komparasi dengan kriteria akseptasi risiko (klausul 6.1.2) nentuin mana yang harus ditangani segera dan mana yang diterima risikonya oleh pemilik risiko.

Q: Tiga output yang jadi capaian CPMK 063 hari ini secara berurutan adalah?
+ Inventarisasi Aset → Valuasi Aset → Matriks Risiko
- Matriks Risiko → Inventarisasi Aset → Valuasi Aset
- Valuasi Aset → Matriks Risiko → Inventarisasi Aset
> Sub-CPMK 063.1 identifikasi aset (Inventarisasi), 063.2 klasifikasi kepentingan berdasarkan CIA (Valuasi), 063.3 analisis risiko (Matriks Risiko) — urut dari "apa asetnya" sampai "seberapa bahaya".
```