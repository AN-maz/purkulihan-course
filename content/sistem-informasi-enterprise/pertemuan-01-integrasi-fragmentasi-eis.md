# Bab 1 — Integrasi dalam Enterprise: Fragmentasi vs Terintegrasi

Catatan ini ditulis ulang dari slide dosen Dede Sulaeman, file `materi/bab-01-integrasi-fragmentasi-eis.pptx` (mata kuliah Sistem Informasi Enterprise, TIF RP 24 CNS E). Semua isi di sini merujuk ke slide itu — kalau ada tambahan dari luar, aku tandai eksplisit di bagiannya.

> [!NOTE]
> BAB 1 ini pondasi banget. Intinya satu pertanyaan: **kenapa perusahaan butuh Enterprise Information System (EIS), dan apa yang kacau kalau gak ada?** Jawabannya ada di perbandingan fragmentasi vs terintegrasi di bagian akhir.

## Apa Itu Enterprise Information System?

EIS punya 4 ciri inti menurut slide:

| Ciri | Penjelasan |
|---|---|
| Tingkatan Enterprise | Sistem komputasi tingkat enterprise yang menawarkan kualitas layanan tinggi, menangani volume data besar, dan mampu mendukung operasi organisasi besar. |
| Platform Terintegrasi | Menyediakan platform teknologi yang memungkinkan organisasi mengintegrasikan dan mengoordinasikan proses bisnis mereka. |
| Sistem Tunggal Terpusat | Pusat sistem tunggal yang memastikan informasi bisa dibagi ke semua tingkat fungsional dan hirarki manajemen. |
| Solusi Fragmentasi Data | Membentuk struktur data standar yang berguna menghilangkan masalah fragmentasi informasi. |

Alur konsepnya sederhana:

```
Organisasi ➔ Proses Bisnis ➔ Data / Informasi ➔ Enterprise Information System (EIS)
```

> [!TIP]
> Cara ngingetin: organisasi punya proses bisnis, proses bisnis menghasilkan data, dan EIS itu yang menyatukan data itu jadi informasi berguna. EIS bukan tujuan akhir — dia jembatan dari data mentah ke keputusan.

## Konsep Utama EIS

- **Penyatuan Informasi secara Logikal** — platform teknologi yang menyatukan semua informasi dari berbagai bagian jadi satu (single) informasi secara logikal, jadi mudah didapatkan.
- **Bukan Sekadar Jaringan Fisik** — bukan cuma pakai jaringan (LAN) biar antar divisi terhubung secara fisik, tapi juga integrasi proses bisnis masing-masing divisi.
- **Penyatuan Database Logikal Multilevel** — butuh penyatuan database secara logikal untuk pengaksesan informasi di semua level organisasi (staf operasional, manajer, sampai direktur).

> [!IMPORTANT]
> Kunci bedanya di kata **"logikal"**. Dua divisi bisa saja terhubung kabel LAN secara fisik, tapi kalau data mereka masih terpisah, itu belum integrasi. Integrasi yang benar = proses bisnis dan database yang menyatu secara logikal, bukan cuma kabel yang nyambung.

Tiga level akses dalam slide:

| Level | Siapa | Akses |
|---|---|---|
| Manajemen Eksekutif | Direktur & Manajer Senior | Laporan konsolidasi & informasi strategis real-time untuk pengambilan keputusan. |
| Departemen Operasional | Manajer Divisi & Staf | Jalankan proses bisnis harian terintegrasi tanpa hambatan batas antar divisi. |
| Database & Data Terpusat | — | Single Source of Truth: penyatuan database logikal terstandar untuk menghilangkan duplikasi data. |

## Jenis-Jenis Enterprise Information System

- **ERP (Enterprise Resource Planning)** — konsolidasi seluruh sistem informasi mengenai berbagai proses bisnis di dalam batas perusahaan.
- **ERM (Enterprise Risk Management)** — proses terstruktur dan sistematis untuk mengelola risiko perusahaan secara menyeluruh (*firm-wide basis*).
- **CRM (Customer Relationship Management)** — pendekatan sistematis memanfaatkan informasi & komunikasi untuk membangun hubungan berkesinambungan dan saling menguntungkan dengan pelanggan.
- **SCM (Supply Chain Management)** — proses kompleks yang mengoordinasikan pengiriman barang & jasa dari pemasok sampai ke pelanggan secara efisien dan efektif.

### Perbandingan Jenis EIS

| Sistem | Fokus Utama | Pengguna / Area Utama | Tujuan Utama |
|---|---|---|---|
| ERP | Konsolidasi seluruh proses bisnis & sumber daya internal perusahaan. | Internal semua departemen (Akuntansi, HR, Manufaktur, Sales). | Single database terpusat & efisiensi operasional real-time. |
| ERM | Pengelolaan & pemetaan risiko perusahaan menyeluruh (firm-wide). | Manajemen Eksekutif & Risk Controller. | Meminimalisir ancaman ketidakpastian & memaksimalkan peluang. |
| CRM | Membangun & mengelola hubungan berkesinambungan dengan pelanggan. | Staf lini depan & belakang (Sales, Marketing, Customer Service). | Pertahankan pelanggan menguntungkan & tingkatkan nilai pelanggan. |
| SCM | Koordinasi aliran barang, dana, dan informasi dari hulu ke hilir. | Supplier, Pabrik, Distributor, Retailer, Logistik. | Pengiriman produk/jasa efektif, efisien, & menekan biaya rantai pasok. |

## Contoh EIS dan Implementasinya di Perusahaan

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

Tiga tujuan utama:
1. **Memudahkan perusahaan mendapatkan informasi** secara cepat, akurat, dan terpadu.
2. **Menyederhanakan alur kerja (workflow)** melalui database terpusat.
3. **Menyediakan pengawasan dan penelusuran** di tingkat perusahaan yang efektif dan tepat waktu.

Alurnya 4 langkah:

```
Langkah 1: Database Terpusat → integrasi seluruh data divisi
Langkah 2: Informasi Terkoordinasi → menyederhanakan alur kerja
Langkah 3: Dukung Proses Bisnis → operasional lebih efisien
Langkah 4: Pengambilan Keputusan → keputusan cepat & tepat
```

## Karakteristik Enterprise Information System

Slide membaginya jadi 5 poin (urutan penomorannya di slide tidak berurutan, tapi semua ini satu set):

1. **Adanya Standar Transaksi yang Sama** — setiap transaksi di seluruh unit punya aturan, bentuk, dan standar yang diseragamkan. *Contoh: format faktur dan pencatatan kas di seluruh cabang diseragamkan.*
2. **Adanya Kontrol Jika Ada Perubahan** — ada mekanisme pengawasan dan otorisasi ketat terhadap setiap perubahan data/sistem. *Contoh: perubahan data stok harus lewat persetujuan otoritas terpilih.*
3. **Adanya Manajemen Sistem** — sistem dikelola terpusat dengan tata kelola, hak akses, dan tingkat keamanan terstruktur. *Contoh: pembatasan hak akses data keuangan berdasarkan hirarki jabatan.*
4. **Memiliki Data Heterogen** — mampu mengolah, mengintegrasikan, dan menyatukan berbagai jenis data dari berbagai divisi. *Contoh: gabungkan data presensi karyawan, mesin produksi, dan penjualan.*
5. **Layanan Kualitas Tinggi & Volume Data Besar** — High Quality of Service untuk menangani skala operasi enterprise besar. *Contoh: proses ribuan transaksi per detik tanpa penurunan performa.*

## Pembahasan Mendalam: ERP & ERM

### ERP (Enterprise Resource Planning)

ERP adalah sistem perangkat lunak terintegrasi yang dipakai organisasi untuk mengelola, mengotomatisasi, dan menyelaraskan proses bisnis utama dalam satu platform terpusat.

- **Evolusi sistem:** EOQ ➔ MRP ➔ MRP II ➔ ERP (perkembangan dari kebutuhan manufaktur & akuntansi).
- **Fokus utama:** menyeimbangkan persediaan & permintaan, menghubungkan pelanggan & supplier dalam satu kesatuan rantai ketersediaan.
- **Fungsi integrasi:** integrasikan sales, marketing, manufacturing, logistics, purchasing, finance, & HR.
- **Kelebihan:** komunikasi & efisiensi tinggi, pelacakan pemesanan 3 arah, akuntansi terpusat.
- **Kekurangan:** biaya sangat mahal, kustomisasi terbatas, kompleksitas adaptasi tinggi.

**Fungsi utama ERP:**
- **Sentralisasi Data** — menyatukan data dari semua divisi ke satu sistem agar informasi konsisten.
- **Otomatisasi Proses Bisnis** — misal tim penjualan catat pesanan baru → sistem otomatis kurangi stok gudang, perbarui laporan keuangan, dan kabari bagian produksi.
- **Visibilitas Real-Time** — akses data & laporan kondisi perusahaan langsung kapan saja.
- **Menghilangkan Silo Fungsional** — departemen berkolaborasi tanpa hambatan komunikasi data.
- **Manajemen Sumber Daya & Keuangan** — optimalkan aset, anggaran, rantai pasok, pengadaan, dan penggajian.

### ERM (Enterprise Risk Management)

- **Pengertian:** pendekatan komprehensif mengelola risiko perusahaan menyeluruh (*firm-wide basis*) untuk meminimalisir ancaman & memaksimalkan peluang.
- **Evolusi dari TRM:** TRM (Traditional Risk Management) mengelola risiko terpisah per divisi; ERM mengelola risiko menyeluruh & terintegrasi.
- **8 Komponen ERM (COSO):**

| # | Komponen | Penjelasan |
|---|---|---|
| 1 | Internal Environment | Filosofi manajemen terhadap risiko & lingkungan tempat organisasi beroperasi. |
| 2 | Objective Setting | Menentukan sasaran perusahaan sebelum mengidentifikasi kejadian penghambat. |
| 3 | Event Identification | Mengenali kejadian internal/eksternal yang membawa risiko atau peluang. |
| 4 | Risk Assessment | Menganalisis dampak & kemungkinan terjadinya risiko. |
| 5 | Risk Response | Menentukan tindakan (menghindari, menerima, mengurangi, atau membagi risiko). |
| 6 | Control Activities | Kebijakan & prosedur memastikan respons risiko berjalan efektif. |
| 7 | Information and Communication | Identifikasi & sebar informasi relevan pada waktu yang tepat. |
| 8 | Monitoring | Awasi seluruh proses manajemen risiko secara berkelanjutan. |

## Pembahasan Mendalam: CRM & SCM

### CRM

**Pengertian:** proses memperoleh, mempertahankan, dan meningkatkan hubungan pelanggan yang menguntungkan demi menciptakan kepuasan & loyalitas.

Tiga komponen:
1. **People** — SDM lini depan (berhadapan langsung) & lini belakang (penunjang). Keramahan, keahlian, tanggung jawab.
2. **Technology** — perangkat keras, lunak, & jaringan untuk mengumpulkan, menyimpan, dan menganalisis data pelanggan.
3. **Process** — 4 tahapan: Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi layanan.

### SCM

**Pengertian:** pengelolaan aliran produk, informasi, dan dana secara terintegrasi yang melibatkan supplier, perusahaan, hingga jasa logistik.

- **3 aliran SCM:** (1) aliran barang (hulu ke hilir), (2) aliran dana, (3) aliran informasi (dua arah).
- **6 area cakupan utama:** (1) Product Development, (2) Procurement/Purchasing, (3) Planning & Control, (4) Production, (5) Distribution, (6) Return (pengembalian).
- **Tantangan utama:** mengatasi ketidakpastian permintaan & kompleksitas keterlibatan banyak pihak.

## MRP, MRP II, dan Hubungannya dengan ERP

**MRP (Material Requirements Planning)** adalah sistem informasi berbasis komputer untuk merencanakan, menjadwalkan, dan mengelola ketersediaan bahan baku & komponen dalam produksi manufaktur. Di dunia IT, MRP dikategorikan sebagai software manajemen rantai pasok (supply chain) paling awal dan mendasar sebelum berkembang jadi ERP.

**MRP bekerja secara komputerisasi** — menghubungkan **tiga input data utama** untuk menghasilkan jadwal pengadaan otomatis:
- **Master Production Schedule (MPS):** jadwal induk kapan produk jadi harus selesai diproduksi.
- **Bill of Materials (BOM):** basis data berbentuk pohon (*product structure file*) yang menjabarkan resep, komponen, dan bahan baku untuk membuat satu produk jadi.
- **Inventory Status File:** data real-time stok bahan baku yang tersedia di gudang.

Cara kerja: sistem menghitung mundur dari jadwal produk jadi, mencocokkan dengan stok gudang, lalu membuat **perintah pembelian otomatis** (automated purchase orders) ke supplier agar bahan baku datang tepat waktu.

**Perbedaan fase sistem (penting buat profesional IT):**

| Fase | Fokus |
|---|---|
| MRP I | Kalkulasi kebutuhan bahan baku secara komputerisasi (murni). |
| MRP II (Manufacturing Resource Planning) | Diperluas: menghitung kapasitas mesin, jam kerja karyawan, dan finansial produksi. |
| ERP | Evolusi modern — modul MRP diintegrasikan ke Software ERP bersama modul akuntansi, SDM, dan penjualan. |

## Integrasi dalam Enterprise: Fragmentasi vs Terintegrasi

- **Fragmentasi** (dalam informatika): kondisi di mana file, data, atau memori terpecah jadi bagian-bagian kecil yang tidak disimpan berurutan atau tersebar di lokasi terpisah. Akibatnya sistem butuh waktu lebih lama membaca data → menurunkan kinerja komputer/jaringan.
- **Terintegrasi:** proses menghubungkan/menyatukan beberapa komponen, sistem, perangkat lunak, atau data berbeda agar bekerja sama harmonis sebagai satu kesatuan.

| TANPA EIS (Fragmentasi Informasi) | DENGAN EIS (Sistem Terintegrasi) |
|---|---|
| ✖ Departemen A, B, C pegang data sendiri (terisolasi) | ✔ Departemen A, B, & C terhubung satu sistem |
| ✖ Masalah redundansi data & duplikasi | ✔ Single Logical Database (terpusat) |
| ✖ Komunikasi lambat antar bagian organisasi | ✔ Alur informasi antar divisi mengalir otomatis |
| ✖ Informasi tidak sinkron untuk keputusan manajemen | ✔ Struktur data terstandarisasi di seluruh lini |
| — | ✔ Akses data real-time untuk seluruh hirarki |
| — | ✔ Pengambilan keputusan tepat dan efisien |

> [!WARN]
> Ini bagian yang paling sering keluar di kuis. Hafalkan pola "fragmentasi = silo + duplikasi + lambat + gak sinkron" versus "terintegrasi = single logical database + otomatis + standardisasi + real-time".

```quiz
Q: Apa alur konsep Enterprise Information System menurut slide BAB 1?
+ Organisasi ➔ Proses Bisnis ➔ Data/Informasi ➔ Enterprise Information System (EIS)
- Organisasi ➔ Database ➔ Internet ➔ Enterprise Information System
- Data ➔ Organisasi ➔ Proses Bisnis ➔ Software ERP
> Slide BAB 1 menggambarkan EIS sebagai muara dari organisasi yang punya proses bisnis dan menghasilkan data/informasi.

Q: Yang membedakan integrasi EIS yang benar dari sekadar koneksi jaringan fisik adalah...
+ Integrasi proses bisnis dan penyatuan database secara logikal, bukan cuma kabel LAN yang menyambung divisi
- Semua divisi wajib berada dalam satu gedung yang sama
- Setiap divisi tetap memakai database sendiri tapi saling kirim email
- Cukup memasang LAN di seluruh kantor tanpa mengubah proses bisnis
> Slide menegaskan "Bukan Sekadar Jaringan Fisik" — EIS juga mengintegrasikan proses bisnis, bukan hanya menghubungkan secara fisik.

Q: Sistem yang memungkinkan konsolidasi seluruh sistem informasi mengenai proses bisnis DI DALAM batas perusahaan disebut...
+ ERP (Enterprise Resource Planning)
- SCM (Supply Chain Management)
- CRM (Customer Relationship Management)
- ERM (Enterprise Risk Management)
> ERP = konsolidasi proses bisnis internal perusahaan; SCM justru lintas pihak (supplier s/d pelanggan), CRM fokus pelanggan, ERM fokus risiko.

Q: Perbedaan TRM dan ERM menurut slide BAB 1 adalah...
+ TRM mengelola risiko secara terpisah per divisi, sedangkan ERM mengelola risiko menyeluruh & terintegrasi (firm-wide basis)
- TRM untuk perusahaan besar, ERM untuk UMKM
- TRM lebih modern daripada ERM
- ERM hanya menangani risiko keuangan, TRM semua risiko
> Slide menyebut ERM adalah evolusi dari TRM: dari penanganan per divisi menjadi menyeluruh dan terintegrasi.

Q: Tiga input data utama sistem MRP adalah...
+ Master Production Schedule (MPS), Bill of Materials (BOM), dan Inventory Status File
- General Ledger, Payroll, dan Fixed Assets
- CRM, SCM, dan HCM
- Leads, Sales Order, dan Invoice
> MRP mengolah MPS (jadwal produk jadi), BOM (resep/komponen), dan Inventory Status File (stok real-time) untuk menghasilkan purchase order otomatis.

Q: Apa perbedaan fase yang tepat antara MRP II dan ERP?
+ MRP II memperluas MRP I dengan kapasitas mesin, jam kerja karyawan, dan finansial produksi; ERP mengintegrasikan modul MRP bersama akuntansi, SDM, dan penjualan
- MRP II adalah nama lain ERP
- ERP lebih tua daripada MRP I
- MRP II hanya untuk perusahaan jasa
> Evolusi: MRP I (bahan baku) ➔ MRP II (kapasitas + finansial produksi) ➔ ERP (seluruh aspek perusahaan).

Q: Tiga komponen CRM menurut slide adalah People, Technology, dan Process. Tahapan pada komponen Process adalah...
+ Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi layanan
- Input ➔ Proses ➔ Output ➔ Umpan balik
- Planning ➔ Risk Analysis ➔ Building ➔ Evaluation
- Rekrutmen ➔ Payroll ➔ Kinerja ➔ Pelatihan
> Slide menyebut 4 tahapan komponen Process CRM: Identifikasi, Diferensiasi, Interaksi, lalu Personalisasi layanan.

Q: SCM dalam BAB 1 didefinisikan sebagai proses kompleks yang...
+ mengoordinasikan pengiriman barang & jasa dari pemasok sampai ke pelanggan secara efisien dan efektif
- menangani neraca, pajak, dan penganggaran perusahaan
- membangun hubungan berkesinambungan dengan pelanggan
- mengelola risiko perusahaan secara firm-wide
> SCM = koordinasi aliran dari hulu (pemasok) sampai hilir (pelanggan). Opsi lain itu Accounting, CRM, dan ERM.

Q: Manakah yang BUKAN karakteristik EIS menurut slide BAB 1?
+ Setiap departemen menyimpan datanya sendiri tanpa struktur standar
- Adanya standar transaksi yang sama di seluruh unit organisasi
- Adanya kontrol/otorisasi jika ada perubahan data
- Memiliki data heterogen dari berbagai divisi
> Justru sebaliknya: EIS menuntut struktur data terstandar untuk menghilangkan fragmentasi; menyimpan data sendiri-sendiri adalah ciri fragmentasi.

Q: Dampak fragmentasi informasi tanpa EIS yang disebutkan slide adalah...
+ Redundansi & duplikasi data, komunikasi lambat antar bagian, dan informasi tidak sinkron untuk keputusan manajemen
- Biaya lisensi ERP yang terlalu mahal
- Data stok selalu real-time dan akurat
- Semua divisi memakai satu single logical database
> Slide membandingkan "TANPA EIS (Fragmentasi)" dengan tiga masalah itu; tiga opsi lain justru ciri sistem terintegrasi (DENGAN EIS).
```
