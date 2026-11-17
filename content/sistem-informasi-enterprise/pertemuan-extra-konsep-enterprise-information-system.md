# Bab 1 — Konsep Enterprise Information System (Materi Extra)

Catatan ini di-rewrite dari file `materi/materi-extra.pdf` (6 halaman, PowerPoint deck dosen Dede Sulaeman, mata kuliah Sistem Informasi Enterprise TIF RP 24 CNS E). PDF ini isinya **peta besar mata kuliah + konsep dasar EIS** — jadi ini semacam pengantar/silabus sekaligus materi BAB 1 versi ringkas. Semua isi di sini dari slide dosen; tambahan dari luar ditandai.

> [!NOTE]
> Deck ini penting karena dua hal: (1) dia nyebut **aturan penilaian & capaian pembelajaran (CLO)** mata kuliah, dan (2) dia ngasih definisi dasar EIS + jenis-jenisnya. Jadi ini tempat ngeliat "mata kuliah ini mau bawa kamu ke mana".

## Aturan Penilaian

| Komponen | Bobot |
|---|---|
| Presensi | 15% |
| Tugas | 15% |
| Quis | 20% |
| UTS | 25% |
| UAS | 25% |
| **Total Nilai** | **100%** |

> [!IMPORTANT]
> Quis + UTS + UAS = 70% dari nilai. Jadi kuis bukan formalitas — 20% itu setara komponen besar. Tugas+presensi 30%.

## Capaian Pembelajaran (11 poin)

1. Mampu menganalisis permasalahan komputasi kompleks secara logis dan sistematis.
2. Mampu memahami dan menerapkan konsep teoritis informatika (algoritma, struktur data, jaringan, basis data, sistem operasi).
3. Mampu mengidentifikasi kebutuhan pengguna dalam pengembangan aplikasi multi-platform.
4. Mampu menjelaskan prinsip dasar Enterprise Systems.
5. Mampu menjelaskan prinsip Business Process Integration.
6. Mahasiswa mampu memahami peran Corporate Information System dalam persaingan global dan tantangannya.
7. Mampu menganalisis fungsi dan keterkaitan modul-modul utama ERP (Financials, SCM, CRM, dan HCM) dalam mendukung operasional bisnis.
8. Mampu menganalisis dan memetakan proses bisnis lintas fungsi (cross-functional business processes) menggunakan notasi standar.
9. Mampu menerapkan kerangka kerja Arsitektur Enterprise (Enterprise Architecture Framework) untuk menyelaraskan strategi bisnis dan teknologi informasi.
10. Mampu berkomunikasi dan mengukur kesiapan organisasi untuk mengimplementasikan enterprise system dalam bentuk laporan formal.
11. Mampu mendemonstrasikan kemampuan bekerja secara individu maupun kelompok.

> [!TIP]
> CLO #7–#10 itu nyambung langsung ke struktur materi: modul ERP (Financial/SCM/CRM/HCM), proses bisnis lintas fungsi (BAB 2), arsitektur enterprise (BAB 4). Jadi CLO ini semacam "kisi-kisi" mata kuliah.

## Rencana Perkuliahan

1. Penyampaian materi
2. Diskusi
3. Tugas pribadi dan kelompok
4. Quis
5. UTS
6. Tugas besar
7. UAS

## Apa Itu Enterprise Information System?

Empat ciri inti EIS menurut deck:

| Ciri | Penjelasan |
|---|---|
| Tingkatan Enterprise | Sistem komputasi tingkat enterprise dengan kualitas layanan tinggi, menangani volume data besar, dan mendukung operasi organisasi besar. |
| Platform Terintegrasi | Menyediakan platform teknologi yang memungkinkan organisasi mengintegrasikan dan mengoordinasikan proses bisnis mereka. |
| Sistem Tunggal Terpusat | Pusat sistem tunggal yang memastikan informasi bisa dibagi di semua tingkat fungsional & hirarki manajemen. |
| Solusi Fragmentasi Data | Membentuk struktur data standar yang berguna menghilangkan masalah fragmentasi informasi. |

Alur konsep EIS:

```
Organisasi ➔ Proses Bisnis ➔ Data / Informasi ➔ Enterprise Information System (EIS)
```

## Konsep Utama Enterprise Information System

- **Penyatuan Informasi secara Logikal:** platform teknologi yang menyatukan semua informasi dari berbagai bagian jadi satu (single) informasi secara logikal sehingga mudah didapatkan.
- **Bukan Sekadar Jaringan Fisik:** tidak hanya penggunaan teknologi jaringan (LAN) agar antar divisi terhubung secara fisik, tetapi juga integrasi proses bisnis masing-masing divisi.
- **Penyatuan Database Logikal Multilevel:** dibutuhkan penyatuan database secara logikal untuk pengaksesan informasi di semua level organisasi (staf operasional, manajer, hingga direktur).

Level akses:

| Level | Siapa | Akses |
|---|---|---|
| Manajemen Eksekutif | Direktur & Manajer Senior | Laporan konsolidasi & informasi strategis real-time untuk pengambilan keputusan. |
| Departemen Operasional | Manajer Divisi & Staf | Proses bisnis harian terintegrasi tanpa hambatan batas antar divisi. |
| Database & Data Terpusat | — | Single Source of Truth — penyatuan database logikal terstandar untuk menghilangkan duplikasi data. |

## Jenis-Jenis Enterprise Information System

- **ERP (Enterprise Resource Planning)** — sistem yang memungkinkan konsolidasi seluruh sistem informasi mengenai berbagai proses bisnis di dalam batas perusahaan.
- **ERM (Enterprise Risk Management)** — proses terstruktur & sistematis untuk mengelola risiko-risiko perusahaan secara menyeluruh (*firm-wide basis*).
- **CRM (Customer Relationship Management)** — pendekatan sistematis memanfaatkan informasi & komunikasi untuk membangun hubungan berkesinambungan & saling menguntungkan dengan pelanggan.
- **SCM (Supply Chain Management)** — proses kompleks yang mengoordinasikan kegiatan pengiriman barang & jasa dari pemasok sampai ke pelanggan secara efisien & efektif.

### Contoh EIS dan Implementasinya dalam Perusahaan

| Modul / Area | Fungsi Utama | Bagian Terlibat | Peran Integrasi Informasi |
|---|---|---|---|
| Accounting | Neraca, pengeluaran, rekonsiliasi bank, buku besar, pajak, penganggaran. | Keuangan & Akuntansi | Konsolidasi laporan keuangan terpusat dari seluruh transaksi. |
| CRM | Optimalkan kinerja penjualan dengan layanan pelanggan lebih baik. | Penjualan & Customer Service | Hubungkan data interaksi pelanggan langsung ke unit penjualan. |
| HRM (Human Resource) | Informasi karyawan, penilaian kinerja, cuti, kehadiran. | HRD & Seluruh Karyawan | Sinkronkan data SDM dengan kebutuhan operasional. |
| Sales | Penawaran, pertanyaan penjualan, faktur, sales order. | Penjualan & Gudang | Terintegrasi dengan CRM mempercepat siklus penjualan. |
| Inventory | Pantau tingkat persediaan, forecasting, penjadwalan stok ulang. | Gudang & Logistik | Data stok real-time mencegah kekosongan barang. |
| Purchasing | Pengadaan, daftar pemasok, purchase order, pembaruan stok. | Pembelian & Pemasok | Hubungkan kebutuhan stok gudang dengan pesanan ke supplier. |
| Manufacturing | Perencanaan produk, pemantauan produksi harian, Bills of Materials. | Pabrik & Operasional | Pastikan ketersediaan bahan baku sesuai jadwal produksi. |

## Tujuan Enterprise Information System

1. Memudahkan perusahaan mendapatkan informasi secara cepat, akurat, dan terpadu.
2. Menyederhanakan alur kerja (workflow) melalui database terpusat.
3. Menyediakan pengawasan dan penelusuran di tingkat perusahaan yang efektif & tepat waktu.

```
Langkah 1: Database Terpusat → integrasi seluruh data divisi
Langkah 2: Informasi Terkoordinasi → menyederhanakan alur kerja
Langkah 3: Dukung Proses Bisnis → operasional lebih efisien
Langkah 4: Pengambilan Keputusan → keputusan cepat & tepat
```

## Karakteristik Enterprise Information System (5)

1. **Adanya Standar Transaksi yang Sama** — aturan, bentuk, standar transaksi diseragamkan di seluruh unit. *Contoh: format faktur & pencatatan kas seluruh cabang diseragamkan.*
2. **Adanya Kontrol Jika Ada Perubahan** — pengawasan & otorisasi ketat terhadap setiap perubahan data/sistem. *Contoh: perubahan data stok harus lewat persetujuan otoritas terpilih.*
3. **Adanya Manajemen Sistem** — dikelola terpusat dengan tata kelola, hak akses, tingkat keamanan terstruktur. *Contoh: pembatasan hak akses data keuangan berdasarkan hirarki jabatan.*
4. **Memiliki Data Heterogen** — mengolah, mengintegrasikan, menyatukan berbagai jenis data dari berbagai divisi. *Contoh: gabungkan data presensi karyawan, mesin produksi, dan penjualan.*
5. **Layanan Kualitas Tinggi & Volume Data Besar** — High Quality of Service untuk skala operasi enterprise. *Contoh: proses ribuan transaksi per detik tanpa penurunan performa.*

## Pembahasan Mendalam: ERP & ERM

### ERP (Enterprise Resource Planning)

ERP = sistem perangkat lunak terintegrasi untuk mengelola, mengotomatisasi, dan menyelaraskan proses bisnis utama dalam satu platform terpusat.

- **Evolusi:** EOQ ➔ MRP ➔ MRP II ➔ ERP.
- **Fokus utama:** menyeimbangkan persediaan & permintaan, menghubungkan pelanggan & supplier dalam satu kesatuan rantai ketersediaan.
- **Fungsi integrasi:** sales, marketing, manufacturing, logistics, purchasing, finance, & HR.
- **Kelebihan:** komunikasi & efisiensi tinggi, pelacakan pemesanan 3 arah, akuntansi terpusat.
- **Kekurangan:** biaya sangat mahal, kustomisasi terbatas, kompleksitas adaptasi tinggi.

### ERM (Enterprise Risk Management)

- **Pengertian:** pendekatan komprehensif mengelola risiko perusahaan menyeluruh (*firm-wide basis*) untuk meminimalisir ancaman & memaksimalkan peluang.
- **Evolusi dari TRM:** TRM mengelola risiko terpisah per divisi; ERM menyeluruh & terintegrasi.
- **8 komponen ERM (COSO):**

| # | Komponen | Penjelasan |
|---|---|---|
| 1 | Internal Environment | Filosofi manajemen terhadap risiko & lingkungan tempat organisasi beroperasi. |
| 2 | Objective Setting | Menentukan sasaran perusahaan sebelum mengidentifikasi kejadian penghambat. |
| 3 | Event Identification | Mengenali kejadian internal/eksternal yang membawa risiko atau peluang. |
| 4 | Risk Assessment | Menganalisis dampak & kemungkinan terjadinya risiko. |
| 5 | Risk Response | Tentukan tindakan (menghindari, menerima, mengurangi, atau membagi risiko). |
| 6 | Control Activities | Kebijakan & prosedur agar respons risiko berjalan efektif. |
| 7 | Information and Communication | Identifikasi & sebar informasi relevan pada waktu tepat. |
| 8 | Monitoring | Awasi seluruh proses manajemen risiko secara berkelanjutan. |

## Pembahasan Mendalam: CRM & SCM

### CRM

- **Pengertian:** proses memperoleh, mempertahankan, dan meningkatkan hubungan pelanggan yang menguntungkan demi kepuasan & loyalitas.
- **Komponen 1 — People:** SDM lini depan (berhadapan langsung) & lini belakang (penunjang); keramahan, keahlian, tanggung jawab.
- **Komponen 2 — Technology:** perangkat keras, lunak, & jaringan untuk mengumpulkan, menyimpan, menganalisis data pelanggan.
- **Komponen 3 — Process:** 4 tahapan: Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi layanan.

### SCM

- **Pengertian:** pengelolaan aliran produk, informasi, dan dana terintegrasi melibatkan supplier, perusahaan, hingga jasa logistik.
- **3 aliran SCM:** (1) aliran barang (hulu ke hilir), (2) aliran dana, (3) aliran informasi (dua arah).
- **6 area cakupan:** (1) Product Development, (2) Procurement/Purchasing, (3) Planning & Control, (4) Production, (5) Distribution, (6) Return.
- **Tantangan utama:** ketidakpastian permintaan & kompleksitas keterlibatan banyak pihak.

## MRP dan Hubungannya dengan ERP

**MRP (Material Requirements Planning)** = sistem informasi berbasis komputer untuk merencanakan, menjadwalkan, dan mengelola ketersediaan bahan baku & komponen dalam produksi manufaktur. Software manajemen rantai pasok paling awal & mendasar sebelum berkembang jadi ERP.

Tiga input data utama MRP → menghasilkan jadwal pengadaan otomatis:
- **Master Production Schedule (MPS):** jadwal induk kapan produk jadi harus selesai diproduksi.
- **Bill of Materials (BOM):** basis data berbentuk pohon (*product structure file*) berisi resep, komponen, & bahan baku.
- **Inventory Status File:** data real-time stok bahan baku yang tersedia di gudang.

Cara kerja: sistem menghitung mundur dari jadwal produk jadi, mencocokkan dengan stok gudang, lalu membuat **perintah pembelian otomatis** (automated purchase orders) ke supplier.

Perbedaan fase:

| Fase | Fokus |
|---|---|
| MRP I | Kalkulasi kebutuhan bahan baku secara komputerisasi (murni). |
| MRP II (Manufacturing Resource Planning) | Diperluas: kapasitas mesin, jam kerja karyawan, finansial produksi. |
| ERP | Evolusi modern — modul MRP diintegrasikan ke Software ERP bersama akuntansi, SDM, penjualan. |

## Integrasi dalam Enterprise: Fragmentasi vs Terintegrasi

- **Fragmentasi (informatika):** kondisi di mana file, data, atau memori terpecah jadi bagian kecil yang tidak disimpan berurutan atau tersebar di lokasi terpisah → sistem butuh waktu lebih lama membaca data, menurunkan kinerja.
- **Terintegrasi:** menghubungkan/menyatukan beberapa komponen, sistem, perangkat lunak, atau data berbeda agar bekerja sama harmonis sebagai satu kesatuan.

| TANPA EIS (Fragmentasi Informasi) | DENGAN EIS (Sistem Terintegrasi) |
|---|---|
| ✖ Departemen A, B, C pegang data sendiri (terisolasi) | ✔ Departemen A, B, & C terhubung satu sistem |
| ✖ Masalah redundansi data & duplikasi | ✔ Single Logical Database (terpusat) |
| ✖ Komunikasi lambat antar bagian organisasi | ✔ Alur informasi antar divisi mengalir otomatis |
| ✖ Informasi tidak sinkron untuk keputusan manajemen | ✔ Struktur data terstandarisasi di seluruh lini |
| — | ✔ Akses data real-time untuk seluruh hirarki |
| — | ✔ Pengambilan keputusan tepat dan efisien |

> [!WARN]
> Deck `materi-extra.pdf` ini banyak tumpang-tindih dengan `bab-01-integrasi-fragmentasi-eis.pptx`. Anggap deck PDF ini sebagai versi "peta besar mata kuliah + rangkuman konsep dasar"; deck PPTX BAB 1 sebagai versi yang lebih lengkap soal fragmentasi vs integrasi.

```quiz
Q: Bobot quisu dalam aturan penilaian mata kuliah ini adalah...
+ 20%
- 15%
- 25%
- 10%
> Slide Aturan Penilaian: Presensi 15%, Tugas 15%, Quis 20%, UTS 25%, UAS 25%.

Q: Manakah yang BUKAN ciri Enterprise Information System menurut materi extra?
+ Dijalankan tanpa database terpusat
- Mampu mendukung operasi organisasi besar dengan volume data besar
- Menyediakan platform terintegrasi untuk mengoordinasikan proses bisnis
- Membentuk struktur data standar untuk menghilangkan fragmentasi informasi
> Justru database terpusat adalah inti EIS; tanpa itu bukan EIS.

Q: Yang membedakan EIS dari sekadar jaringan fisik (LAN) menurut konsep utama EIS adalah...
+ EIS juga mengintegrasikan proses bisnis masing-masing divisi, bukan cuma menghubungkan secara fisik
- EIS hanya bisa dipakai di satu gedung
- EIS wajib tanpa jaringan
- EIS hanya untuk staf operasional
> Materi: "Bukan Sekadar Jaringan Fisik" — integrasi juga mencakup proses bisnis divisi, bukan hanya koneksi fisik.

Q: Sistem EIS yang berfokus pada pengelolaan risiko perusahaan secara menyeluruh (firm-wide basis) adalah...
+ ERM (Enterprise Risk Management)
- CRM
- SCM
- MRP
> ERM = proses terstruktur & sistematis mengelola risiko perusahaan menyeluruh; CRM fokus pelanggan, SCM fokus rantai pasok.

Q: Berapa komponen ERM (COSO) yang disebutkan materi, dan salah satunya adalah...
+ 8 komponen, termasuk Risk Assessment, Risk Response, dan Monitoring
- 3 komponen: Input, Proses, Output
- 6 komponen: Planning, Build, Test, Release, Deploy, Monitor
- 4 komponen: Goal, Process, Resource, Block
> Materi menyebut 8 komponen ERM COSO, di antaranya Internal Environment, Objective Setting, Event Identification, Risk Assessment, Risk Response, Control Activities, Information and Communication, Monitoring.

Q: Tiga input data utama sistem MRP adalah...
+ Master Production Schedule, Bill of Materials, dan Inventory Status File
- General Ledger, Accounts Payable, Accounts Receivable
- Goal, Process, Resource
- MPS, ERP, CRM
> MRP mengolah MPS (jadwal produk jadi), BOM (resep/komponen), dan Inventory Status File (stok real-time).

Q: Bill of Materials (BOM) dalam MRP digambarkan sebagai...
+ Basis data berbentuk pohon (product structure file) yang menjabarkan resep, komponen, dan bahan baku untuk membuat satu produk jadi
- Jadwal kapan produk jadi harus selesai diproduksi
- Data real-time stok bahan baku di gudang
- Daftar gaji karyawan pabrik
> MPS = jadwal produk jadi, BOM = resep/komponen (pohon), Inventory Status File = stok real-time.

Q: Empat tahapan komponen Process dalam CRM adalah...
+ Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi layanan
- Rekrutmen ➔ Payroll ➔ Kinerja ➔ Pelatihan
- Planning ➔ Risk ➔ Build ➔ Evaluate
- Input ➔ Aktivitas ➔ Output ➔ Umpan balik
> Komponen CRM ada 3: People, Technology, Process; tahapan Process = Identifikasi, Diferensiasi, Interaksi, Personalisasi.

Q: SCM melibatkan tiga aliran utama, yaitu...
+ Aliran barang, aliran dana, dan aliran informasi (dua arah)
- Aliran listrik, air, dan udara
- Aliran data, suara, dan gambar
- Aliran bahan baku, tenaga kerja, dan modal saja
> Materi: 3 aliran SCM = barang (hulu ke hilir), dana, dan informasi (dua arah).

Q: Fase "MRP II (Manufacturing Resource Planning)" memperluas MRP I dengan menghitung...
+ Kapasitas mesin, jam kerja karyawan, dan finansial produksi
- Hanya kebutuhan bahan baku
- Data pelanggan dan penjualan
- Arsitektur perangkat lunak
> MRP I = kalkulasi bahan baku; MRP II = ditambah kapasitas mesin, jam kerja, dan finansial produksi.

Q: Dalam perbandingan fragmentasi vs terintegrasi, ciri "Single Logical Database (Terpusat)" dan "struktur data terstandarisasi" termasuk pada kolom...
+ DENGAN EIS (Sistem Terintegrasi)
- TANPA EIS (Fragmentasi Informasi)
- Kedua kolom sama saja
- Tidak ada di materi
> Kolom DENGAN EIS memuat single logical database, alur otomatis, struktur data terstandar, akses real-time, dan keputusan efisien.
```
