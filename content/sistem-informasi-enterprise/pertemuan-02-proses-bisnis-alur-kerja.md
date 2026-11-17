# Bab 2 — Proses Bisnis dan Alur Kerja Enterprise

Catatan ini di-rewrite dari slide dosen Dede Sulaeman, file `materi/bab-02-proses-bisnis-alur-kerja.pptx` (Sistem Informasi Enterprise, TIF RP 24 CNS E). Materi di sini sebisa mungkin ngikutin urutan dan istilah dari slide — tambahan dari luar ditandai kalau ada.

> [!NOTE]
> BAB 2 ini jembatan dari BAB 1. Kalau BAB 1 bilang "EIS itu menyatukan data", BAB 2 ngejelasin **apa yang disatukan** — yaitu proses bisnis dan alur kerja per divisi yang tadinya terpisah-pisah (silo).

## Pendahuluan: Proses Bisnis dan Enterprise

- **Pentingnya alur kerja efektif:** proses yang dirancang atau dijalankan dengan buruk menyebabkan penundaan, kesalahan, dan peningkatan biaya yang berdampak negatif pada kinerja organisasi.
- **Proses Bisnis vs. Alur Kerja:** proses bisnis = serangkaian aktivitas untuk mencapai tujuan organisasi; alur kerja (workflow) = urutan tugas spesifik yang diselesaikan.
- **Peran EIS:** menyediakan platform terpusat untuk pengumpulan, pemrosesan, dan penyebaran informasi.
- **Sistem pendukung utama:** ERP, Workflow Management Systems (WMS), dan Business Process Management (BPM) merampingkan proses dan meningkatkan kemampuan pengambilan keputusan.

Hubungan elemen enterprise:

```
Enterprise ➔ Proses Bisnis ➔ Aktivitas / Tugas ➔ Alur Kerja (Workflow) ➔ Informasi Terpusat
```

Definisi proses bisnis **dalam informatika**: rangkaian aktivitas terstruktur yang memanfaatkan sistem informasi untuk mengumpulkan, mengolah, dan mendistribusikan data guna mencapai tujuan organisasi secara efisien. Mencakup identifikasi alur kerja, pemodelan, evaluasi, serta perbaikan proses menggunakan metode seperti BPMN.

**Tujuan dan manfaat:**
- Meningkatkan efisiensi & produktivitas dengan mengidentifikasi langkah yang tidak efektif.
- Mengurangi kesalahan manusia, memperbaiki manajemen waktu, dan meningkatkan kepuasan pelanggan.
- Mendukung pengambilan keputusan melalui alur kerja yang terdokumentasi baik.

## Memahami Proses Bisnis Perusahaan

- **Definisi:** serangkaian aktivitas yang mengubah masukan (input) menjadi keluaran (output) dengan tujuan menciptakan nilai bagi organisasi.
- **4 elemen kunci:** Input (sumber daya/bahan/info) ➔ Aktivitas (langkah tugas) ➔ Output (produk/layanan) ➔ Umpan Balik (informasi evaluasi).
- **Tantangan pengelolaan:** memastikan proses dirancang efisien melalui teknik **pemetaan** (representasi visual) dan **pemodelan** (model terperinci/simulasi).

### Jenis Proses Bisnis

| Jenis Proses | Fokus | Contoh |
|---|---|---|
| Proses Operasional | Aktivitas sehari-hari yang langsung menjalankan bisnis. | Penjualan, pemasaran, produksi. |
| Proses Manajemen | Tata kelola & evaluasi. | Penganggaran, perencanaan, manajemen kinerja. |
| Proses Pendukung | Dukungan teknis/fasilitas. | Proses TI, SDM/HRD, pengadaan. |
| Proses Rantai Nilai | Menciptakan nilai langsung bagi pelanggan. | Desain produk, manufaktur, distribusi. |

## Alur Proses Bisnis Lintas Departemen

Contoh ilustrasi: alur pemrosesan pesanan pelanggan hingga pengiriman barang. Rangkaian aktivitas yang saling berhubungan dan melibatkan berbagai departemen:

| # | Tahap | Departemen | Aktivitas |
|---|---|---|---|
| 1 | Pesanan | Pelanggan | Penerimaan order/pesanan masuk dari pelanggan. |
| 2 | Verifikasi | Keuangan | Pemeriksaan kredit & persetujuan pembayaran. |
| 3 | Pemrosesan | Gudang / Pabrik | Pengecekan stok persediaan atau penjadwalan produksi. |
| 4 | Pengiriman | Logistik | Pengepakan dan pengiriman produk ke alamat tujuan. |
| 5 | Layanan | Pelanggan | Penerimaan barang dan umpan balik kepuasan pelanggan. |

> [!TIP]
> Perhatikan: satu pesanan saja bisa nyentuh 5 departemen. Ini contoh klasik **cross-functional business process** — proses yang melewati batas fungsi/departemen. Di sinilah silo data paling kelihatan masalahnya.

## Pemodelan Proses Bisnis (Business Process Modeling)

**Manfaat pemodelan:**
- Meningkatkan komunikasi & kolaborasi antar pemangku kepentingan.
- Meningkatkan visibilitas & transparansi ke dalam alur proses bisnis.
- Memudahkan identifikasi inefisiensi, hambatan (bottleneck), & area perbaikan.
- Menyediakan dasar untuk mengotomatiskan proses & mengintegrasikannya dengan sistem informasi lain.
- Mengurangi risiko kesalahan manusia lewat standardisasi langkah kerja.

**Konsep & notasi:**
- **Tujuan utama:** penjelasan visual yang jelas dan terperinci mengenai cara kerja proses untuk meningkatkan efisiensi, efektivitas, dan kualitas.
- **Notasi standar (BPMN):** Business Process Modeling Notation menyediakan notasi grafis standar seperti diagram alir, swimlane, dan diagram aktivitas.
- **Simbol grafis BPMN:** simbol khusus untuk tugas (task), peristiwa (event), pintu keputusan (gateway), dan alur urutan aktivitas.
- **Jenis model:** Model Deskriptif (proses saat ini / **as-is**) dan Model Preskriptif (usulan perbaikan / **to-be**).

> [!IMPORTANT]
> As-is vs To-be wajib kamu bedain. **As-is** = potret proses yang sekarang jalan (buat nemu masalah). **To-be** = rancangan proses yang diusulkan setelah diperbaiki. Di BAB 3 keduanya muncul lagi sebagai deliverable fase pertama.

## Pola Alur Kerja (Workflow Patterns)

Pola alur kerja = templat desain standar untuk memodelkan & mengimplementasikan alur kerja secara konsisten. Ada 3 kelompok:

| Kelompok | Fungsi | Contoh Pola |
|---|---|---|
| Pola Aliran Kontrol (Control Flow) | Pengurutan & eksekusi aktivitas | Urutan (Sequence), Pemisahan Paralel (Parallel Split), Sinkronisasi (Synchronization), Pilihan Eksklusif (Exclusive Choice) |
| Pola Aliran Data (Data Flow) | Pergerakan informasi & data | Perutean (Routing), Agregasi (Aggregation), Transformasi (Transformation) |
| Pola Sumber Daya (Resource) | Alokasi & pengelolaan sumber daya | Alokasi (Allocation), Reservasi (Reservation), Pelepasan (Release) |

Penjelasan singkat:
- **Sequence** — alur linier bertahap.
- **Parallel Split** — beberapa aktivitas berjalan serentak.
- **Synchronization** — menggabungkan kembali alur paralel.
- **Exclusive Choice** — percabangan bersyarat (keputusan).
- **Routing** — mengarahkan data ke aktivitas yang tepat.
- **Aggregation** — menggabungkan data dari berbagai sumber.
- **Transformation** — mengubah format data antar langkah.
- **Allocation** — menentukan staf/mesin untuk tugas tertentu.
- **Reservation** — memesan sumber daya untuk masa depan.
- **Release** — membebaskan sumber daya setelah selesai digunakan.

## Sistem Manajemen Alur Kerja (WMS)

**Definisi WMS:** aplikasi perangkat lunak yang memfasilitasi otomatisasi dan pengelolaan proses bisnis, mencakup koordinasi tugas, pemantauan kemajuan, dan perutean informasi antara pengguna dan sistem.

Komponen WMS:

| Komponen | Peran | Fungsi |
|---|---|---|
| Workflow Designer | Komponen Grafis Visual | Pengguna membuat, memetakan, dan memodifikasi alur kerja secara visual dan grafis. |
| Workflow Engine | Eksekutor & Pengatur Utama | Mengeksekusi alur kerja, mengatur alokasi tugas, dan mengontrol perutean informasi otomatis. |
| User Interface | Media Interaksi Karyawan | Pengguna/staf berinteraksi dengan sistem, menerima tugas, dan menyelesaikan pekerjaan. |

## Otomasi Proses Bisnis (BPA)

Perbandingan proses manual vs terotomasi:

| Proses Manual | Proses Terotomasi (BPA) |
|---|---|
| Input ➔ Pemeriksaan Manual ➔ Persetujuan Manual ➔ Proses ➔ Output | Input ➔ Sistem Perangkat Lunak ➔ Validasi Otomatis ➔ Proses ➔ Output |
| Kendala: rentan kesalahan entri, lambat, memakan biaya tinggi. | Keunggulan: akurasi tinggi, waktu penyelesaian cepat, biaya lebih hemat. |

Tiga pendekatan otomasi:

| Pendekatan | Konsep | Fungsi |
|---|---|---|
| Robotic Process Automation (RPA) | Robot Perangkat Lunak | Robot lunak untuk tugas berulang berbasis aturan (entri data, pemrosesan faktur, layanan pelanggan). |
| Business Process Management (BPM) | Pengelolaan Kompleks | Pemodelan & pengoptimalan alur kerja kompleks yang terintegrasi lintas sistem organisasi. |
| Platform Low-Code / No-Code | Antarmuka Visual | Bangun aplikasi & otomasi cepat dengan komponen drag-and-drop tanpa keahlian coding mendalam. |

## Sistem ERP

**Definisi (kutipan slide):** *"Sistem ERP adalah jenis perangkat lunak yang digunakan organisasi untuk mengelola dan mengintegrasikan proses dan fungsi bisnis inti mereka. ERP menyediakan database terpusat serta alat terstandar untuk meningkatkan efisiensi dan memfasilitasi berbagi data antar departemen."*

**Kaitan dengan proses bisnis enterprise:** ERP bertindak sebagai **tulang punggung (backbone)** yang mengarahkan & mengoordinasikan alur kerja lintas departemen secara terpusat.

Bentuk dukungan ERP:
- Memberikan pandangan terpusat dari seluruh operasi organisasi.
- Memudahkan pengelolaan sumber daya & mengeliminasi duplikasi usaha.
- Mengoptimalkan alur kerja operasional dan menyediakan basis data real-time.
- Skalabilitas & konfigurasi: ERP sangat scalable & customizable.

### Modul Utama ERP

| Modul | Area | Isi |
|---|---|---|
| Keuangan & SDM | Operasional Internal | Akuntansi, penganggaran, penggajian, manajemen kinerja karyawan. |
| Logistik & Rantai Pasok | Persediaan & Pengadaan | Manajemen inventaris, purchasing, manajemen pemasok. |
| Sales & Manufaktur | Produksi & Penjualan | Sales order, pemasaran, perencanaan & pengendalian produksi. |

### Komponen Sistem ERP (6)

1. **Basis Data Terpusat** — jantung sistem; menyimpan seluruh data operasi sebagai satu sumber kebenaran (single source of truth).
2. **Manajemen Proses Bisnis** — alat untuk mengotomatisasi & mengelola proses keuangan, SDM, manufaktur, dan CRM secara terstandar.
3. **Pelaporan dan Analitik** — dasbor & visualisasi data untuk insight real-time.
4. **Integrasi Sistem** — menghubungkan ERP dengan sistem eksternal seperti CRM, SCM, dan Business Intelligence secara seamless.
5. **Keamanan & Kontrol Akses** — melindungi data sensitif lewat otentikasi, kontrol berbasis peran (RBAC), dan enkripsi.
6. **Kustomisasi & Konfigurasi** — penyesuaian alur kerja, aturan bisnis, dan bidang khusus sesuai organisasi.

### Manfaat Sistem ERP (6)

1. **Proses Bisnis Terintegrasi** — merampingkan operasi & mengurangi duplikasi upaya.
2. **Visibilitas yang Ditingkatkan** — visibilitas real-time untuk keputusan cepat.
3. **Kolaborasi yang Ditingkatkan** — platform berbagi data antar departemen.
4. **Layanan Pelanggan Meningkat** — respons pesanan & keluhan lebih cepat.
5. **Peningkatan Akurasi Data** — mengurangi kesalahan entri manual.
6. **Manajemen Keuangan Lebih Baik** — penganggaran, peramalan, akuntansi terpusat.

Alur dampak manfaat ERP:

```
Implementasi ERP ➔ Integrasi Database Terpusat ➔ Efisiensi & Akurasi Proses ➔ Informasi Real-Time ➔ Dukungan Keputusan Strategis
```

## Studi Kasus: Perusahaan Manufaktur

- **Gambaran umum:** perusahaan manufaktur yang memproduksi & mendistribusikan mesin industri (mengubah bahan mentah menjadi produk jadi).
- **Identifikasi area masalah:** Manajemen Rantai Pasokan, Perencanaan & Pengendalian Produksi, serta Layanan Pelanggan.
- **Solusi strategis:** menerapkan ERP terintegrasi dengan modul Keuangan, Inventaris, Pengadaan, Penjualan, SDM, dan Produksi.
- **Pembentukan tim lintas fungsi:** tim dari setiap departemen untuk menilai kebutuhan spesifik, mengonfigurasi sistem, dan menyusun program pelatihan.
- **Fungsi yang saling terhubung:** Pengadaan (bahan baku) ➔ Manajemen Inventaris (stok) ➔ Perencanaan Produksi (kelancaran pabrik) ➔ Logistik & Layanan Pelanggan.

## Analisis Proses Bisnis Eksisting (6 Langkah)

1. **Menentukan Proses Utama** — pengadaan, inventaris, produksi, kontrol kualitas, logistik.
2. **Memetakan Proses** — memetakan alur kerja & interaksi untuk menemukan inefisiensi.
3. **Identifikasi Pain Points** — menemukan penyebab penundaan (entri manual/sistem lama).
4. **Analisis Data** — menganalisis tren data inventaris & barang bergerak lambat.
5. **Kumpulkan Umpan Balik** — masukan langsung dari karyawan operasional.
6. **Tolok Ukur (Benchmarking)** — membandingkan dengan standar & praktik terbaik industri.

Kondisi eksisting & kendala:
- **Proses saat ini:** banyak entri data manual & sistem antar departemen masih terpisah (silos).
- **Pain points:** penundaan jadwal produksi, ketidakcocokan stok inventaris, keterlambatan pengiriman.
- **Dampak organisasi:** biaya operasional membengkak, produktivitas turun, kepuasan pelanggan menurun.

## Mendesain Ulang Proses Bisnis (Process Redesign)

Langkah desain ulang:

```
1. Identifikasi Peluang ➔ 2. Prioritaskan Peluang ➔ 3. Rencana Desain Ulang ➔ 4. Terapkan Desain Ulang ➔ 5. Ukur Dampak ➔ 6. Perbaikan Berkelanjutan
```

| BEFORE (Sebelum) | REDESIGN (Perancangan) | AFTER (Sesudah) |
|---|---|---|
| ✖ Entri data manual berulang | ⚙ Integrasi modul ERP terpusat | ✔ Lead time berkurang |
| ✖ Data stok terisolasi per divisi | ⚙ Otomasi alur persediaan & pengadaan | ✔ Manajemen inventaris optimal |
| ✖ Jadwal produksi sering terlambat | ⚙ Visibilitas kapasitas produksi real-time | ✔ Jadwal produksi terkontrol real-time |
| ✖ Layanan pelanggan tidak akurat | ⚙ Pelatihan karyawan pada alur baru | ✔ Kepuasan pelanggan meningkat |

## Implementasi Alur Kerja Baru (6 Langkah)

1. **Rencana Terperinci** — uraikan langkah konkret, garis waktu, milestone, peran, & sumber daya.
2. **Komunikasi Rencana** — komunikasikan perubahan ke seluruh pemangku kepentingan & karyawan.
3. **Pelatihan Karyawan** — latih karyawan pakai sistem/alur baru + dokumentasi lengkap.
4. **Pengujian Alur Kerja** — uji di lingkungan terkontrol untuk identifikasi potensi masalah.
5. **Peluncuran Bertahap** — percontohan (pilot project) sebelum diperluas ke seluruh organisasi.
6. **Pemantauan & Evaluasi** — pantau berkelanjutan untuk memastikan efisiensi tercapai.

## Tabel Perbandingan Proses Bisnis (Lama vs Baru)

| Aspek | Proses Lama (Eksisting) | Proses Baru (Setelah Redesign & ERP) |
|---|---|---|
| Alur Kerja (Workflow) | Fragmentasi antar departemen; koordinasi manual. | Terintegrasi penuh dalam satu platform terpusat (WMS/ERP). |
| Aktivitas Operasional | Tinggi entri data manual; rentan kesalahan & pengulangan. | Tugas berbasis aturan diotomatisasi; aktivitas terstandarisasi. |
| Pengelolaan Informasi | Data terisolasi per divisi (silos); laporan lambat & tidak sinkron. | Single source of truth; data real-time. |
| Tingkat Otomasi | Sangat minim; mengandalkan dokumen fisik / spreadsheet. | Tinggi (BPA/RPA); perutean & validasi tugas otomatis. |
| Efisiensi & Respons | Lead time panjang; respon pelanggan lambat. | Biaya operasional berkurang; lead time cepat; layanan optimal. |

## Kesimpulan BAB 2

- **Proses Bisnis Enterprise:** kerangka kerja utama untuk menstandarkan & mengoptimalkan operasi perusahaan.
- **Pemodelan & Workflow:** BPMN dan WMS membantu memvisualisasikan, merampingkan, dan mengoordinasikan tugas serta perutean informasi.
- **Workflow Patterns & Otomasi:** templat standar + otomasi (BPA/RPA) mengurangi kesalahan & menghemat biaya.
- **Sistem ERP:** basis data terpusat & modul terintegrasi memberi visibilitas real-time bagi keputusan bisnis.
- **Redesign & Implementasi:** analisis eksisting, perancangan ulang, dan peluncuran alur kerja terstruktur menciptakan keunggulan kompetitif manufaktur.

> [!TIP]
> Pertanyaan reflektif akhir dari dosen: *"Bagaimana proses bisnis dan alur kerja yang terintegrasi dapat membantu meningkatkan efektivitas sebuah enterprise?"* Coba jawab pakai kombinasi: hilangnya silo ➔ data real-time ➔ keputusan cepat ➔ efisiensi biaya.

```quiz
Q: Apa perbedaan proses bisnis dan alur kerja (workflow) menurut slide BAB 2?
+ Proses bisnis = rangkaian aktivitas untuk mencapai tujuan organisasi; alur kerja = urutan tugas spesifik yang diselesaikan
- Proses bisnis hanya untuk manufaktur, alur kerja untuk jasa
- Keduanya persis sama, cuma beda istilah
- Proses bisnis dijalankan mesin, alur kerja dijalankan manusia
> Slide membedakan keduanya secara eksplisit: proses bisnis lebih luas (tujuan organisasi), alur kerja lebih teknis (urutan tugas).

Q: Empat elemen kunci komponen proses bisnis adalah...
+ Input ➔ Aktivitas ➔ Output ➔ Umpan Balik
- Planning ➔ Risk ➔ Build ➔ Evaluate
- Sequence ➔ Parallel Split ➔ Sync ➔ Choice
- People ➔ Technology ➔ Process ➔ Data
> Slide menyebut 4 elemen: Input (sumber daya/bahan/info), Aktivitas, Output (produk/layanan), dan Umpan Balik (evaluasi).

Q: Dalam contoh alur pemrosesan pesanan lintas departemen, tahap Verifikasi (pemeriksaan kredit & persetujuan pembayaran) dilakukan oleh departemen...
+ Keuangan
- Gudang/Pabrik
- Logistik
- Pelanggan
> Slide memetakan: Pesanan [Pelanggan] ➔ Verifikasi [Keuangan] ➔ Pemrosesan [Gudang/Pabrik] ➔ Pengiriman [Logistik] ➔ Layanan [Pelanggan].

Q: BPMN singkatan dari... dan digunakan untuk apa?
+ Business Process Modeling Notation — notasi grafis standar untuk memodelkan proses (diagram alir, swimlane, diagram aktivitas)
- Business Planning Management Network — jaringan manajemen perencanaan bisnis
- Basic Process Model Notation — bahasa pemrograman alur kerja
- Business Process Monitoring Node — alat pemantauan server
> Slide menjelaskan BPMN menyediakan notasi grafis standar seperti diagram alir, swimlane, dan diagram aktivitas.

Q: Model Deskriptif (as-is) dan Model Preskriptif (to-be) dalam pemodelan proses bisnis masing-masing menggambarkan...
+ As-is = proses saat ini; To-be = usulan perbaikan
- As-is = usulan perbaikan; To-be = proses saat ini
- Keduanya menggambarkan proses masa depan
- As-is = diagram, To-be = narasi
> Slide: Model Deskriptif = proses saat ini (as-is), Model Preskriptif = usulan perbaikan (to-be).

Q: Pola "Parallel Split" dan "Synchronization" termasuk kelompok pola alur kerja...
+ Pola Aliran Kontrol (Control Flow Patterns)
- Pola Aliran Data (Data Flow Patterns)
- Pola Sumber Daya (Resource Patterns)
- Pola Integrasi Database
> Parallel Split (aktivitas serentak) dan Synchronization (menggabungkan alur paralel) termasuk Control Flow Patterns.

Q: Komponen WMS yang berfungsi mengeksekusi alur kerja, mengatur alokasi tugas, dan mengontrol perutean informasi otomatis adalah...
+ Workflow Engine
- Workflow Designer
- User Interface
- RPA Robot
> Workflow Designer = bikin alur secara visual; Workflow Engine = eksekutor & pengatur utama; User Interface = media interaksi karyawan.

Q: Manakah urutan proses terotomasi (BPA) yang benar menurut slide?
+ Input ➔ Sistem Perangkat Lunak ➔ Validasi Otomatis ➔ Proses ➔ Output
- Input ➔ Pemeriksaan Manual ➔ Persetujuan Manual ➔ Proses ➔ Output
- Input ➔ Output ➔ Validasi ➔ Proses
- Validasi ➔ Input ➔ Proses ➔ Output
> Slide membandingkan proses manual (pemeriksaan & persetujuan manual) dengan BPA yang pakai sistem perangkat lunak + validasi otomatis.

Q: Menurut slide, ERP bertindak sebagai apa dalam proses bisnis enterprise?
+ Tulang punggung (backbone) yang mengarahkan & mengoordinasikan alur kerja lintas departemen secara terpusat
- Aplikasi akuntansi yang berdiri sendiri
- Pengganti total tenaga kerja manusia
- Hanya alat pelaporan pajak
> Slide menyebut ERP sebagai backbone yang mengoordinasikan alur kerja lintas departemen secara terpusat.

Q: Manakah yang BUKAN dari 6 langkah analisis proses bisnis eksisting?
+ Menghapus semua karyawan lama sebelum mengubah proses
- Memetakan proses & mengidentifikasi pain points
- Menganalisis data & mengumpulkan umpan balik
- Melakukan tolok ukur (benchmarking) dengan praktik terbaik industri
> 6 langkahnya: tentukan proses utama, petakan proses, identifikasi pain points, analisis data, kumpulkan umpan balik, benchmarking — bukan menghapus karyawan.

Q: Manfaat ERP "Peningkatan Akurasi Data" dalam slide diartikan sebagai...
+ Mengurangi risiko kesalahan entri data manual
- Menambah jumlah entri data per hari
- Menghapus kebutuhan backup
- Menggandakan laporan keuangan
> Slide menyebut salah satu manfaat ERP adalah mengurangi risiko kesalahan entri data manual.
```
