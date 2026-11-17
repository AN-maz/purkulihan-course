# Pertemuan 3 — Standar Pengamanan & Konteks Organisasi

Materi dosen berupa slide PDF *image-only* yang di-OCR, teks mentahnya ada di
`materi/iso-27001-security-blueprint.txt` (15 halaman). Karena hasil OCR-nya
campur aduk antar kolom — apalagi bagian diagram — kutipannya sempat "rusak"
itu **wajar**; di catatan ini aku susun ulang per halaman dan jelasin isi
utamanya biar kebaca jelas.

Inti pertemuan ini: **membongkar struktur ISO/IEC 27001:2022 dan fondasi
SMKI** (*Sistem Manajemen Keamanan Informasi* / ISMS), terutama Klausul 4
(Konteks Organisasi) yang disebut dosen sebagai "medan perang" yang harus
dipetakan sebelum ngomongin keamanan teknis.

> [!NOTE]
> Slide 1 & 2: judul kuliah `IF-103 Keamanan Informasi`, UTB — Fakultas
> Industri Kreatif, Teknik Informatika, dosen **Eka Hidayat**. Slide 2 penuh
> diagram yang OCR-nya acak, tapi isinya jelas: tiga **Target Capaian
> Pembelajaran (Sub-CPMK)** buat pertemuan ini.

## Target capaian pembelajaran (slide 2)

| Sub-CPMK | Target | Fokus |
|---|---|---|
| Mengurai struktur standar | Memahami anatomi Annex SL & komponen utama ISO/IEC 27001:2022 | Transisi dari **teori** ke kerangka kerja yang bisa diimplementasikan |
| Menjelaskan konteks organisasi | Memetakan isu internal, eksternal, dan ekspektasi pemangku kepentingan | Menghubungkan **realitas bisnis** dengan strategi penerapan SMKI |
| Membedakan standar keamanan | Menganalisis perbedaan dengan standar pendukung lainnya | Komparasi **esensi sistem manajemen** vs **kontrol teknis** |

## Apa itu ISO/IEC 27001:2022? (slide 3)

Standar internasional "emas" untuk SMKI. Dua poin kunci di slide ini:

**1. Fokus utama pengamanan = CIA Triad** (lanjutan dari P1):

| Pilar | Arti |
|---|---|
| **Confidentiality** (Konfidensialitas) | Informasi cuma bisa diakses oleh entitas yang berwenang |
| **Integrity** (Integritas) | Menjaga keakuratan & kelengkapan aset informasi dari modifikasi tak sah |
| **Availability** (Availabilitas) | Informasi & sistem tersedia saat dibutuhkan pihak yang berwenang |

**2. Adopsi SMKI itu keputusan strategis manajemen puncak** — cara
mengelola risiko secara berkelanjutan, **bukan sekadar instalasi teknologi**
(Ref: SNI ISO/IEC 27001:2022 Pendahuluan 0.1).

> [!IMPORTANT]
> Kalau ada yang bilang "udah pasang firewall + antivirus = ISO 27001" —
> salah. Slide-nya eksplisit: SMKI adalah keputusan **strategis dari
> manajemen puncak**, bukan proyek beli alat.

## Anatomi standar: struktur Annex SL (slide 4)

Annex SL = *High-Level Structure* yang bikin integrasi antar standar sistem
manajemen gampang. Isinya klausul 1–10, dengan **Klausul 1–3 = klausul
pendahuluan** dan **Klausul 4–10 = inti SMKI**:

| Klausul | Judul | Keterangan |
|---|---|---|
| 1 | Ruang Lingkup | Pendahuluan |
| 2 | Acuan Normatif | Pendahuluan |
| 3 | Istilah & Definisi | Pendahuluan |
| 4 | Konteks Organisasi | Inti SMKI — **fokus hari ini** |
| 5 | Kepemimpinan | Inti SMKI |
| 6 | Perencanaan (Risiko) | Inti SMKI |
| 7 | Dukungan (Sumber Daya) | Inti SMKI |
| 8 | Operasi (Asesmen & Penanganan Risiko) | Inti SMKI |
| 9 | Evaluasi Kinerja (Audit Internal & Reviu Manajemen) | Inti SMKI |
| 10 | Peningkatan (Tindakan Korektif & Peningkatan Berkelanjutan) | Inti SMKI |

> [!TIP]
> Cara inget urutannya: **4 konteks → 5 pimpinan → 6 rencana risiko →
> 7 dukungan → 8 operasi → 9 evaluasi → 10 perbaikan**. Atau versi gampangnya:
> *kenali medan, pimpin, rencanakan, siapkan sumber daya, jalanin, nilai,
> perbaiki*.

## Integrasi Annex SL ke siklus PDCA (slide 5)

Slide ini diagramnya paling "rusak" di OCR, tapi isinya jelas: SMKI **bukan
proyek sekali jalan**, melainkan proses peningkatan berkelanjutan — tiap
klausul masuk ke satu fase PDCA:

| Fase PDCA | Klausul yang masuk |
|---|---|
| **PLAN** (Perencanaan) | Klausul 4: Konteks Organisasi · Klausul 5: Kepemimpinan · Klausul 6: Perencanaan Risiko |
| **DO** (Pelaksanaan) | Klausul 7: Dukungan (Sumber Daya) |
| **CHECK** (Pemeriksaan) | Klausul 8: Operasi (Asesmen & Penanganan Risiko) — *di slide ini ditempatkan bersama evaluasi* · Klausul 9: Evaluasi Kinerja (Audit Internal & Reviu Manajemen) |
| **ACT** (Tindak Lanjut) | Klausul 10: Peningkatan (Tindakan Korektif & Peningkatan Berkelanjutan) |

> [!NOTE]
> Catatan jujur: pemetaan Klausul 8 di slide agak ambigu karena teks OCR-nya
> terpotong ("Klausul 8: Operasi (Asesmen & Penanganan Risiko)" muncul di
> area DO/CHECK). Secara logika PDCA, Operasi = pelaksanaan kontrol yang
> direncanakan (DO), sementara CHECK murni Klausul 9. Yang **pasti** dari
> slide: 4–6 = PLAN, 7 = DO, 9 = CHECK, 10 = ACT.

## Klausul 4: Konteks Organisasi — bedah total (slide 6)

> [!IMPORTANT]
> Kutipan dosen: Klausul 4 adalah **"langkah absolut pertama"** —
> mendefinisikan *"medan perang"* sebelum merancang keamanan teknis apa pun.

Empat sub-klausulnya:

| Sub-klausul | Judul | Inti pertanyaannya |
|---|---|---|
| **4.1** | Memahami Organisasi & Konteksnya | Mengidentifikasi isu **internal dan eksternal** yang memengaruhi pencapaian SMKI |
| **4.2** | Kebutuhan Pihak Berkepentingan | Menentukan **siapa yang peduli** terhadap keamanan informasi kita & apa ekspektasi legal/bisnis mereka |
| **4.3** | Menentukan Ruang Lingkup | Mendefinisikan **batasan fisik, logis, dan organisasional** dari penerapan SMKI |
| **4.4** | Sistem Manajemen Keamanan Informasi | Kewajiban untuk **menetapkan, memelihara, dan terus meningkatkan** penerapan SMKI |

## Klausul 4.1: pemetaan isu internal & eksternal (slide 7)

Dua kolom di slide — beda alat analisisnya:

| Isu **Internal** (kondisi di dalam) — analisis pakai **SWOT** | Isu **Eksternal** (kondisi di luar) — analisis pakai **PESTLE** |
|---|---|
| **Struktur & Budaya**: kebijakan Work From Anywhere (WFA), pembagian tugas yang belum jelas | **Legal/Regulasi**: kepatuhan UU Pelindungan Data Pribadi (PDP) No. 27 Tahun 2022 |
| **Kapasitas**: keterbatasan anggaran IT, kompetensi keamanan siber SDM internal | **Lingkungan & Sosial**: pandemi global, tren kerja kolaboratif pakai platform Cloud |
| **Teknologi**: penggunaan *software* legacy (usang), arsitektur jaringan internal | **Ekonomi & Siber**: tren serangan ransomware global, kerentanan pada rantai pasok (*supply chain*) |

> [!TIP]
> Gampangnya: **internal = SWOT** (apa yang kita *punya* / *kurang* di dalam),
> **eksternal = PESTLE** (Politik, Ekonomi, Sosial, Teknologi, Legal,
> Lingkungan — yang di luar kendali kita).

## Klausul 4.2: kebutuhan pihak berkepentingan (slide 8)

Kalimat pembuka slide: *"Keamanan informasi dibangun untuk melindungi dan
memenuhi ekspektasi mereka."* Diagramnya diputar di OCR, tapi daftar
stakeholdernya utuh:

| Pihak Berkepentingan | Ekspektasi terhadap SMKI |
|---|---|
| **Manajemen Puncak** | Kepatuhan hukum, minimalisasi risiko bisnis, efisiensi biaya |
| **Klien/Pelanggan** | Jaminan konfidensialitas atas Data Pribadi (DP) mereka |
| **Regulator (BSSN/Kominfo)** | Pelaporan insiden keamanan siber dan kepatuhan standar |
| **Karyawan & Pengguna** | Sistem yang aman **namun tidak mengganggu produktivitas** (*usable*) |
| **Vendor/Pihak Ketiga** | Batasan akses yang jelas dan SLA keamanan pada sistem yang terintegrasi |

> [!NOTE]
> Tiap ekspektasi ini bisa dikaitkan balik ke CIA Triad — misal klien →
> Confidentiality, regulator → Integrity + Availability (insiden harus
> dilaporkan & sistem harus jalan), karyawan → Availability tanpa ribet.

## Klausul 4.3 & 4.4: menentukan ruang lingkup (slide 9)

Ruang lingkup = **batas berlakunya penerapan SMKI** di organisasi.

**Dasar penentuan ruang lingkup (4.3):**

1. Berdasarkan hasil **isu internal & eksternal** (dari 4.1).
2. Berdasarkan **persyaratan pihak berkepentingan** (dari 4.2).
3. Mempertimbangkan **antarmuka (*interfaces*) dan dependensi operasional**
   dengan pihak eksternal — misal layanan Cloud.

Di slide ada gambar gedung/arsitektur (HQ, Branch Office, Database, Cloud
Provider, Antarmuka/Interfaces) yang ditandai **IN-SCOPE** vs
**OUT-SCOPE/Dikecualikan** — isinya diagram, jadi teks OCR cuma nyisain
label-labelnya. Pesan utamanya: ruang lingkup harus **eksplisit** mana yang
masuk dan mana yang dikeluarkan.

> [!IMPORTANT]
> Klausul 4.4: organisasi wajib **menetapkan, memelihara, dan meningkatkan
> SMKI secara berkelanjutan hanya di dalam batasan tersebut**. Jadi kalau
> Cloud Provider dinyatakan out-of-scope, tetap ada kewajiban ngatur
> *interface*-nya (dari butir 3) — bukan berarti bebas tanggung jawab.

## Komparasi: ISO/IEC 27001 vs ISO/IEC 27002 (slide 10)

*"Membedakan sistem tata kelola manajemen dari kerangka kerja kontrol
teknis."*

| Dimensi | **ISO/IEC 27001:2022** | **ISO/IEC 27002:2022** |
|---|---|---|
| **Sifat Dokumen** | **Persyaratan (Requirements)** — wajib dipenuhi, pakai kata *"harus"* | **Panduan (Guidelines)** — rekomendasi teknis, pakai kata *"sebaiknya"* |
| **Fokus Utama** | Kerangka kerja SMKI (Governance, Klausul 1–10) | Kumpulan **93 kontrol keamanan** (Manusia, Fisik, Teknologi, Organisasional) |
| **Fungsi Sertifikasi** | Organisasi **bisa disertifikasi** atas kepatuhannya | **Tidak bisa disertifikasi terpisah** — dipakai sebagai acuan lampiran (Annex A) bagi 27001 |

> [!WARN]
> Jangan ketuker: **27001 = "harus" (wajib, bisa disertifikasi)**,
> **27002 = "sebaiknya" (rekomendasi, gak bisa disertifikasi sendiri)**.
> Kontrol 93 itu ada di 27002 dan dilampirkan sebagai Annex A di 27001.

## Workshop kelompok (slide 11–15)

Lima studi kasus buat praktik klausul-klausul di atas:

| # | Workshop | Praktik | Sintesis kasus |
|---|---|---|---|
| 1 | Analisis Konteks Organisasi | Klausul 4.1 | PT FinTech Nusantara: kebijakan WFA permanen + anggaran IT dipangkas + tren ransomware sektor finansial memuncak → identifikasi ≥3 isu internal & 3 eksternal pakai PESTLE/SWOT |
| 2 | Kebutuhan Pihak Berkepentingan | Klausul 4.2 | SIAKAD UTB (data nilai, data pribadi mahasiswa, portofolio penelitian) → petakan ≥5 stakeholder + ≥1 ekspektasi spesifik tiap pihak, dikaitkan ke CIA Triad |
| 3 | Penentuan Ruang Lingkup | Klausul 4.3 | Ritel nasional: 1 HQ, 50 toko, 1 e-commerce di Cloud pihak ketiga, anggaran terbatas → rumuskan kalimat ruang lingkup fase awal + daftar in/out-of-scope + cara handle interface cloud |
| 4 | Pemetaan Struktur Annex | Klausul 4–10 | Audit internal: petakan 5 aktivitas (backup harian, kebijakan oleh Dirut, awareness training, asesmen risiko tahunan, Tinjauan Manajemen) ke klausul yang tepat + alasannya |
| 5 | Komparasi Sistem vs Kontrol | 27001 vs 27002 | Manajer IT bilang "cukup pasang firewall + enkripsi sesuai 27002 = 100% aman" → sanggah terstruktur: kenapa kontrol teknis gagal tanpa siklus Klausul 4–10 |

> [!TIP]
> Bonus kunci buat workshop 4 (karena sering muncul di ulangan): *backup
> harian* → Klausul 7 atau 8 (dukungan/operasi), *kebijakan oleh Direktur
> Utama* → Klausul 5 (Kepemimpinan), *awareness training* → Klausul 7
> (Dukungan), *asesmen risiko tahunan* → Klausul 6/8 (Perencanaan &
> Operasi), *Tinjauan Manajemen* → Klausul 9 (Evaluasi Kinerja).

```quiz
Q: Menurut slide, apa yang menyebut Klausul 4 sebagai "langkah absolut pertama" sebelum merancang keamanan teknis?
+ Karena Klausul 4 mendefinisikan "medan perang" — isu internal/eksternal, stakeholder, dan ruang lingkup — sebelum kontrol teknis dirancang
- Karena Klausul 4 berisi daftar 93 kontrol teknis yang wajib dipasang lebih dulu
- Karena Klausul 4 adalah bagian sertifikasi wajib yang paling mudah diaudit
> Klausul 4 (Konteks Organisasi) memetakan medan dulu: pahami organisasi & isunya, ekspektasi pemangku kepentingan, lalu batas ruang lingkup SMKI — baru setelah itu masuk perencanaan risiko dan kontrol.

Q: Pada Klausul 4.1, isu eksternal seperti kepatuhan UU PDP No. 27 Tahun 2022 atau tren ransomware global dianalisis dengan kerangka apa?
+ PESTLE — karena isu eksternal adalah kondisi di luar organisasi (Politik, Ekonomi, Sosial, Teknologi, Legal, Lingkungan)
- SWOT — karena seluruh isu apa pun selalu dianalisis dengan kekuatan dan kelemahan
- PDCA — karena isu eksternal wajib masuk ke fase Check siklus peningkatan
> Slide membedakan: isu internal (di dalam) pakai SWOT, isu eksternal (di luar) pakai PESTLE. UU PDP dan tren ransomware termasuk aspek Legal dan Ekonomi-Siber yang ada di luar kendali organisasi.

Q: Dalam dokumen ISO/IEC 27001:2022 dan ISO/IEC 27002:2022, bagaimana perbedaan sifat dokumennya?
+ 27001 berisi persyaratan wajib dengan kata "harus", 27002 berisi panduan/rekomendasi teknis dengan kata "sebaiknya"
- 27001 berisi rekomendasi dengan kata "sebaiknya", 27002 berisi kewajiban dengan kata "harus"
- Keduanya sama-sama persyaratan wajib sehingga isinya tidak berbeda
> Perbandingan di slide menegaskan dimensi "Sifat Dokumen": 27001 = Requirements ("harus"), 27002 = Guidelines ("sebaiknya"). Bedanya juga terlihat di fokus dan fungsi sertifikasi.

Q: Pernyataan manajer IT — "cukup ikuti panduan teknis ISO 27002, perusahaan sudah 100% aman" — kenapa salah menurut materi ini?
+ ISO 27002 cuma katalog 93 kontrol teknis tanpa siklus tata kelola Klausul 4–10, jadi kontrol bisa gagal, boros, dan tak terukur
- ISO 27002 salah karena isinya hanya 10 klausul dan tidak memuat kontrol sama sekali
- ISO 27002 salah karena standar ini dipakai untuk sistem manajemen kualitas, bukan keamanan
> Slide 10 menegaskan 27002 tidak dapat disertifikasi terpisah — dia acuan lampiran (Annex A) bagi 27001. Tanpa sistem manajemen (27001: konteks, kebijakan, evaluasi, perbaikan), kontrol teknis (27002) jalan tanpa arah dan gak bisa dibuktikan efektif.

Q: Pada pemetaan Annex SL ke siklus PDCA, klausul mana yang termasuk fase CHECK (Pemeriksaan)?
+ Klausul 9: Evaluasi Kinerja — Audit Internal & Tinjauan Manajemen
- Klausul 7: Dukungan — penyediaan sumber daya dan pelatihan
- Klausul 6: Perencanaan Risiko — penetapan proses dan kriteria risiko
> Fase CHECK menilai apakah sistem berjalan sesuai rencana: audit internal dan tinjauan manajemen ada di Klausul 9. Klausul 7 masuk DO (pelaksanaan), Klausul 6 masuk PLAN (perencanaan).

Q: Dasar penentuan ruang lingkup SMKI (Klausul 4.3) menurut slide adalah...
+ Hasil pemetaan isu internal & eksternal (4.1), persyaratan pihak berkepentingan (4.2), serta pertimbangan antarmuka dan dependensi dengan pihak eksternal
- Jumlah server yang dimiliki perusahaan dan anggaran pembelian firewall tahunan
- Daftar 93 kontrol pada ISO/IEC 27002 yang harus masuk semua ke ruang lingkup
> Ruang lingkup berdiri di atas 4.1 dan 4.2, plus interface operasional eksternal (misal Cloud Provider). Setelah batas ditetapkan, Klausul 4.4 mewajibkan memelihara dan meningkatkan SMKI hanya di dalam batasan itu.

Q: Manajemen puncak mengadopsi SMKI dengan tujuan kepatuhan hukum, minimalisasi risiko bisnis, dan efisiensi biaya. Menurut slide, adopsi SMKI adalah...
+ Keputusan strategis dari manajemen puncak untuk mengelola risiko secara berkelanjutan, bukan sekadar instalasi teknologi
- Proyek sekali jalan yang selesai begitu firewall dan antivirus terpasang
- Kewajiban teknis tim IT yang tidak melibatkan pimpinan organisasi
> Slide 3 mengutip SNI ISO/IEC 27001:2022 Pendahuluan 0.1: adopsi SMKI adalah keputusan strategis manajemen puncak, dan SMKI adalah proses peningkatan berkelanjutan (siklus PDCA), bukan proyek sekali jalan.

Q: Di antara daftar pihak berkepentingan Klausul 4.2, mana yang ekspektasinya paling terkait langsung dengan aspek Availability?
+ Karyawan & Pengguna — mereka butuh sistem yang aman namun tidak mengganggu produktivitas (usable)
- Klien/Pelanggan — mereka menuntut jaminan konfidensialitas atas data pribadi mereka
- Regulator (BSSN/Kominfo) — mereka mewajibkan pelaporan insiden keamanan siber
> Ekspektasi klien menuntut Confidentiality, regulator menuntut pelaporan insiden (terkait Integrity proses pelaporan), sedangkan karyawan & pengguna butuh sistem tetap tersedia dan lancar saat dipakai kerja — itu esensi Availability tanpa mengorbankan keamanan.
```