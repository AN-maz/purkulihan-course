# Pertemuan 6 — Statement of Applicability & Arena Kompromi

Catatan dari materi dosen berupa slide PDF *image-only* yang di-OCR — teks
mentahnya ada di `materi/iso-27001-soa-governance.txt` (18 halaman). Fokus
materi: **menerjemahkan risiko jadi keputusan tata kelola berdasar ISO/IEC
27001:2022** — SoA, risk treatment, dan keputusan tata kelola.

Cover-nya (hal. 1): judul slide "Statement of Applicability & Arena Kompromi",
IF-103 Keamanan Informasi Pertemuan Ke-6, Fakultas Industri Kreatif — Universitas
Teknologi Bandung.

## Halaman 2 — Risiko udah dipetakan, sekarang pilih pertempurannya

Ini lanjutan dari P5 (Analisis Risiko, ISO/IEC 27005). Dosen ngebagi jadi dua
minggu:

| Minggu | Fokus | Intinya |
|---|---|---|
| Minggu ke-5 | Analisis Risiko (ISO/IEC 27005) | Kita tahu nilai aset, ancaman, dan kerentanan |
| Minggu ke-6 | Perlakuan Risiko (*risk treatment*) | Sumber daya kita terbatas — gak bisa benerin semuanya |

> [!IMPORTANT]
> "Keamanan adalah sebuah pilihan sadar." **Keputusan strategis** buat
> *Mitigate*, *Assume*, *Transfer*, atau *Eliminate* risiko itulah yang
> melahirkan cetak biru tata kelola keamanan kita.

## Halaman 3 — Deklarasi Strategi: Statement of Applicability (SoA)

SoA bukan sekadar dokumen pelengkap — ini "**pakta integritas**" yang
menghubungkan penilaian risiko dengan realitas implementasi. Sesuai **Klausul
6.1.3 d)**, SoA wajib memuat 4 pilar utama:

| Pilar SoA | Isinya |
|---|---|
| **Kontrol yang Diperlukan** | Daftar spesifik dari ISO/IEC 27002 (Annex A) |
| **Justifikasi Inklusi** | Mengapa kontrol ini wajib? (Misal: menekan risiko ke tingkat yang dapat diterima) |
| **Justifikasi Eksklusi** | Alasan legal atau operasional mengapa kontrol bisa diabaikan |
| **Status Implementasi** | *Implemented*, *Partially Implemented*, atau *Not Implemented* |

> [!TIP]
> OCR-nya nangkep catatan kaki "2 Klausul 6.1.3 d" — jadi emang klausul 6.1.3
> butir d) yang mewajibkan SoA. (Cross-check web, bukan dari slide: klausul
> 6.1.3 d) menyebut empat isi persis seperti tabel di atas — kontrol yang
> diperlukan, justifikasi inklusi, status implementasi, dan justifikasi
> eksklusi kontrol Annex A.)

## Halaman 4 — Membedah persenjataan: ISO/IEC 27002:2022

Target perlindungannya = **CIAT Triad** (Confidentiality, Integrity,
Availability, plus Accountability). Kontrolnya dipecah jadi 3 kelompok:

| Jenis kontrol | Konsep | Contoh (nomor kontrol ISO 27002) |
|---|---|---|
| **Preventive** (mencegah insiden) | Identify, Protect | Kebijakan Keamanan (5.1), Autentikasi Kuat (8.5) |
| **Detective** (mengidentifikasi anomali) | Detect | Evaluasi Kejadian Keamanan (5.25) |
| **Corrective** (pemulihan sistem) | Respond, Recover | Respons Insiden (5.26), Pembelajaran Insiden (5.27) |

Cara ingetnya: *preventive* = pintu & gembok, *detective* = kamera & alarm,
*corrective* = pemadam & perbaikan.

## Halaman 5 — Matriks keputusan: Inklusi vs Eksklusi

Alur keputusan buat tiap kontrol (ini inti "keputusan tata kelola"):

```
Syarat Hukum / Kepatuhan Regulasi?
   ├── YA  → INKLUSI MUTLAK (gak bisa ditawar)
   └── TIDAK → Risiko melampaui batas Toleransi/Risk Appetite?
                  ├── YA (MITIGATE)  → INKLUSI. Kontrol diperlukan
                  │                    untuk menurunkan likelihood/consequence
                  └── TIDAK (ASSUME/ACCEPT) → Evaluasi Lanjut:
                         Apakah aset relevan dengan lingkungan organisasi?
                            ├── TIDAK RELEVAN → EKSKLUSI DENGAN JUSTIFIKASI
                            │   (contoh: sistem 100% on-premises,
                            │    kontrol cloud 5.23 dikecualikan)
                            └── (relevan) → tetap dievaluasi lanjut
```

> [!WARNING]
> Eksklusi itu **gak pernah "tulis N/A beres"**. Slide-nya aja nyebut
> "EKSKLUSI **DENGAN JUSTIFIKASI**" — tiap kontrol yang dibuang dari Annex A
> wajib punya alasan yang bisa dipertanggungjawabkan.

## Halaman 6 — Triangle InfoSec: ilusi keamanan sempurna

| Sudut triangle | Isinya |
|---|---|
| **Keamanan (Security)** | Penerapan kontrol ketat berlapis (MFA, Zero Trust, Enkripsi) |
| **Kenyamanan (Usability)** | Akses tanpa hambatan, agilitas bisnis, kepuasan pengguna |
| **Sumber Daya (Cost)** | Anggaran IT, tenaga ahli, dan waktu pemeliharaan |

> [!IMPORTANT]
> "Tidak ada sistem yang 100% aman, murah, dan sangat mudah digunakan
> sekaligus. **Trade-off adalah realitas tata kelola.**"

## Halaman 7 — Arena Kompromi

Teori di atas kertas rapi, tapi di sini kamu bukan lagi sekadar mahasiswa —
kamu adalah **arsitek keamanan, manajer bisnis, dan auditor independen**.
Bersiaplah mempertahankan SoA-mu.

## Halaman 8 — Arsitektur arena: head-to-head 5 kelompok

| Aturan | Detail |
|---|---|
| Pembagian | Kelas dibagi 5 kelompok (Group 1–5) |
| Rotasi | Tiap kelompok bergiliran masuk "Arena" buat berdebat di mosi yang beda |
| Dinamika | Kamu **gak bisa milih posisi** — peran PRO, KONTRA, AUDITOR diundi sebelum match |
| Keluaran akhir | Hasil tiap debat mendikte isi kolom *Justifikasi* dokumen SoA final kelas |

## Halaman 9 — The Holy Trinity of Roles (Trinitas Peran)

| Tim | Julukan | Fokus |
|---|---|---|
| **TIM PRO** | The Defenders | Melindungi standar. Fokus kepatuhan ISO 27001, mitigasi risiko ekstrem, penguatan CIA. "Keamanan di atas segalanya." |
| **TIM KONTRA** | The Agilists | Sayap bisnis. Fokus Availability, kemudahan penggunaan, agilitas operasional, efisiensi biaya. "Bisnis harus tetap berjalan." |
| **TIM AUDITOR** | The Judges | Pihak netral penentu keputusan. Evaluasi argumen berdasar standar ISO/IEC 27002 dan realitas implementasi SoA. "Tunjukkan buktinya." |

## Halaman 10 — Kronologi pertempuran (3 putaran)

| Putaran | Nama | Durasi | Isi |
|---|---|---|---|
| 1 | **Opening Statements** | 3 menit | Pemaparan argumen utama Tim PRO, dilanjut Tim KONTRA. Tanpa interupsi. Membangun landasan teori. |
| 2 | **Crossfire & Rebuttals** | 3 menit | Serangan langsung, saling bantah, adu data. Menyoroti kelemahan trade-off lawan. High tension. |
| 3 | **Closing & Verdict** | 3 menit | Pernyataan penutup masing-masing tim (1 menit). Diakhiri putusan mutlak Tim Auditor + finalisasi SoA. |

## Halaman 11–15 — Lima mosi debat

| # | Mosi | PRO | KONTRA |
|---|---|---|---|
| 1 | **The Access Dilemma** | Mandat MFA (ISO 27002 kontrol 8.5 *Secure Authentication*) — kewajiban MFA seluruh lapisan akses karyawan demi mencegah pembobolan kredensial | Kenyamanan & friksi operasional — MFA menghambat alur kerja, menambah beban helpdesk, memicu *security fatigue* pada pengguna non-teknis |
| 2 | **The Infrastructure War** | On-premises data center — kepemilikan penuh & kontrol fisik aset (kontrol 7.14 *Secure Disposal* & *Area Physical Security*), mencegah data sensitif di tangan pihak ketiga | Cloud & skalabilitas (*shared risk*) — lebih hemat biaya, *availability* lebih tinggi, transfer sebagian risiko fisik ke penyedia layanan (skema *Shared Responsibility*) |
| 3 | **The Big Brother Protocol** | Pemantauan Zero Trust ketat — perekaman & log aktivitas terus-menerus di perangkat titik akhir (kontrol 8.1 *User endpoint devices*), prinsip Identify & Detect tanpa celah | Hak privasi & etika karyawan — pengawasan berlebihan melanggar privasi personal, menciptakan budaya kerja beracun (*toxic*), berpotensi melanggar UU perlindungan data |
| 4 | **The Supply Chain Gamble** | Vendor outsourcing eksklusif (spesialisasi) — organisasi gak punya sumber daya internal memadai; vendor eksternal kasih akses keahlian khusus lebih cepat dengan biaya operasional lebih rendah | In-house development — jaga *Confidentiality* kode sumber (kontrol 8.4 *Access to source code*) dan cegah kerentanan pihak ketiga yang gak bisa diawasi sepenuhnya |
| 5 | **The Human Firewall** | Edukasi & kesadaran berkelanjutan — kesalahan manusia gak bisa dihindari; investasi diarahkan ke *Security Awareness Training* & budaya *Blameless Culture* | Sanksi kedisiplinan tegas (punitive) — kebijakan cuma efektif kalau ada hukuman nyata (pemutusan hubungan kerja, denda) bagi pelanggar protokol; governance tanpa ketakutan gak jalan |

## Halaman 16 — Sintesis akhir: menyusun dokumen SoA

Kolom-kolom dokumen SoA final kelas:

| Kolom | Isi |
|---|---|
| Control Code | Kode kontrol (ISO/IEC 27002) |
| Control Name | Nama kontrol |
| Control Description | Deskripsi kontrol |
| Applicable (Y/N) | Ya / Tidak |
| Justification (Applicability/Exclusion) | **Disinilah letak argumentasi kamu** |
| Debate Winner | Pemenang debat mosi terkait |

> [!IMPORTANT]
> Auditor menilai apakah **argumen tim pemenang cukup kuat** untuk dijadikan
> dasar hukum organisasi di SoA. Jadi debatnya bukan seremonial — hasilnya
> beneran masuk dokumen tata kelola.

## Halaman 17 — Rubrik penilaian tim auditor

| Kriteria | Relevansi Standar | Solusi Trade-Off |
|---|---|---|
| Isi | Penggunaan klausul ISO 27001 & kontrol ISO 27002 secara akurat dan tepat sasaran | Menawarkan kompromi cerdas (*workaround*) jika opsi ekstrem gak dapat diterima |
| Kriteria | **Argumen Logis** — kemampuan menghubungkan risiko dengan realitas operasional organisasi (Iron Triangle) | **Teknik Rebuttal** — kualitas bantahan saat Crossfire (mampu menyerang kelemahan lawan berdasar fakta) |

(Rubriknya digambar sebagai kompas: West Axis, East Axis, South Axis — masing-
masing nyambung ke kriteria di tabel.)

## Halaman 18 — Minggu depan: Arena Terbuka

1. Pelajari **Annex A ISO/IEC 27001:2022** dan **ISO/IEC 27002:2022**.
2. Bentuk kelompok & siapkan draf argumen untuk kelima mosi (sebagai PRO dan KONTRA).

> [!WARNING]
> "Di dunia nyata, peretas tidak peduli dengan kebijakan Anda. Hanya kontrol
> yang dapat dieksekusi, dipertahankan, dan dijustifikasi dalam SoA yang akan
> menyelamatkan aset Anda. **Persiapkan kasus Anda. Sidang akan segera
> dimulai.**"

*Catatan tambahan (di luar slide, cross-check web): Annex A ISO/IEC 27001:2022
memuat 93 kontrol dalam 4 tema — organisasi (A.5, 37 kontrol), orang (A.6, 8),
fisik (A.7, 14), teknologi (A.8, 34) — dan tiap kontrol wajib di-*address* di
SoA, baik sebagai applicable maupun excluded dengan justifikasi substantif.*

```quiz
Q: Menurut slide, 4 pilar wajib Statement of Applicability (SoA) di Klausul 6.1.3 d) adalah apa?
+ Kontrol yang diperlukan, justifikasi inklusi, status implementasi, dan justifikasi eksklusi
- Visi misi organisasi, daftar aset, anggaran keamanan, dan laporan insiden
- Sertifikat ISO, daftar pelatihan, jadwal backup, dan log akses
> Klausul 6.1.3 d) mewajibkan SoA memuat: kontrol yang diperlukan, mengapa kontrol itu disertakan, apakah sudah diimplementasi, dan mengapa kontrol Annex A lain diecualikan.

Q: Apa fungsi SoA menurut slide "Deklarasi Strategi"?
+ Pakta integritas yang menghubungkan penilaian risiko dengan realitas implementasi
- Dokumen pelengkap sertifikasi yang boleh dilewati
- Daftar kata sandi seluruh karyawan
> Dosen tegas: SoA bukan "sekadar dokumen pelengkap" — dia jembatan antara hasil analisis risiko dan apa yang beneran dipasang di lapangan.

Q: Dalam matriks keputusan inklusi vs eksklusi, kapan sebuah kontrol masuk kategori "INKLUSI MUTLAK"?
+ Ketika syarat hukum / kepatuhan regulasi mensyaratkannya
- Ketika anggarannya tersedia
- Ketika semua kontrol lain sudah diimplementasi
> Jalur pertama di matriks: syarat hukum/regulasi = YA → inklusi mutlak, gak bisa ditawar lagi, apapun hasil evaluasi risikonya.

Q: Contoh "EKSKLUSI DENGAN JUSTIFIKASI" dari slide adalah...
+ Sistem 100% on-premises sehingga kontrol cloud 5.23 dikecualikan
- Kontrol 8.5 autentikasi kuat karena terlalu merepotkan
- MFA dihapus karena pengguna mengeluh
> Eksklusi butuh justifikasi: kalau aset gak relevan dengan lingkungan (mis. gak ada aset di cloud), kontrol cloud 5.23 boleh dibuang — tapi alasannya wajib ditulis.

Q: Berdasarkan Iron Triangle, apa yang bener kalau organisasi minta sistem yang aman, murah, dan mudah digunakan sekaligus?
+ Gak ada sistem yang 100% aman, murah, dan mudah digunakan sekaligus — trade-off adalah realitas tata kelola
- Bisa, asal beli firewall termahal
- Bisa, asal semua pindah ke cloud
> Ketiga sudut triangle (Security, Usability, Cost) saling tarik-menarik; keputusan tata kelola = milih trade-off yang sadar, bukan mengejar ilusi keamanan sempurna.

Q: Peran "The Judges" dalam Arena Kompromi dipegang oleh...
+ Tim Auditor — pihak netral penentu keputusan berdasar standar ISO/IEC 27002 dan realitas implementasi SoA
- Tim PRO — The Defenders yang mengutamakan keamanan di atas segalanya
- Tim KONTRA — The Agilists yang mewakili sayap bisnis
> Trinitas peran: PRO (defenders), KONTRA (agilists), AUDITOR (judges). Auditor-lah yang menilai bukti dan menutup sidang dengan putusan.

Q: Urutan 3 putaran debat di Arena Kompromi adalah...
+ Opening Statements → Crossfire & Rebuttals → Closing & Verdict
- Crossfire → Opening → Verdict
- Closing → Crossfire → Opening
> Tiap putaran 3 menit: buka argumen tanpa interupsi, adu data saat crossfire, lalu penutup 1 menit per tim diakhiri putusan mutlak auditor.

Q: Hasil tiap debat di arena berdampak ke mana?
+ Mengisi kolom Justifikasi pada dokumen SoA final kelas — argumen pemenang jadi dasar hukum organisasi
- Menentukan nilai akhir ujian tengah semester
- Menghapus salah satu kelompok dari kelas
> Slide "Sintesis Akhir" bilang: hasil debat mendikte isi kolom Justifikasi; auditor menilai apakah argumen pemenang cukup kuat untuk jadi dasar hukum di SoA.
```