# Materi Pendalam Kuis SIE — 7 Pokok Bahasan

Lapisan **pendalaman** di atas `pertemuan-kuis-ringkasan.md`. Kalau di ringkasan kamu cuma dapet "inti jawaban" pendek, di sini aku bongkar tiap pokok: definisi, sub-poin rinci, tabel perbandingan, contoh konkret, sama diagram alur (bentuk tabel markdown). Soal quiz di tiap bagian sengaja **beda** dari 12 soal di ringkasan, jadi aman buat ngetes ulang.

> [!NOTE]
> Kode sumber: **dari slide bab-N** / **dari materi-extra** = ada di bahan slide dosen, aman buat dikutip apa adanya. Bagian yang **gak ada di slide** ditandai jelas sebagai referensi eksternal — jangan campur aduk pas nulis jawaban kuis, karena dosen biasanya nilai sesuai kerangka dia.

---

## 1. Fungsi dan Keterkaitan Modul ERP: CRM dan HCM

### Konsep dasar
- **ERP** (dari slide bab-01 & bab-02): sistem perangkat lunak terintegrasi yang mengelola, mengotomatisasi, dan menyelaraskan proses bisnis utama dalam **satu platform terpusat** dengan *single database*. Slide bab-02 nyebut ERP sebagai "tulang punggung (backbone)" yang mengarahkan alur kerja lintas departemen.
- **CRM** (dari slide bab-01): pendekatan sistematis memanfaatkan informasi & komunikasi untuk membangun hubungan **berkesinambungan dan saling menguntungkan** dengan pelanggan.
- **HCM** (dari slide bab-01, tabel modul HRM): mengelola informasi karyawan, penilaian kinerja, cuti, kehadiran — "menyinkronkan data SDM dengan kebutuhan operasional perusahaan".
- Kuis nomor 1 minta kamu jelasin **fungsi dua modul + keterkaitannya**, jadi struktur jawabannya: definisi CRM ➔ definisi HCM ➔ interaksi dua arah.

### Rincian poin
**Fungsi CRM — 3 komponen (dari slide bab-01):**

| Komponen | Isi | Fokus |
|---|---|---|
| **People** | SDM lini depan (berhadapan langsung dengan pelanggan) & lini belakang (penunjang); keramahan, keahlian, tanggung jawab | Manusia |
| **Technology** | Perangkat keras, lunak, & jaringan untuk mengumpulkan, menyimpan, menganalisis data pelanggan | Alat |
| **Process** | 4 tahapan: Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi layanan | Alur kerja |

**Fungsi HCM — siklus SDM** (diringkas dari modul HRM slide bab-01 + materi kuis): rekrutmen, data kepegawaian, payroll (penggajian), manajemen kinerja, kehadiran/cuti, pelatihan & pengembangan kompetensi.

**Keterkaitan dua arah (inti jawaban kuis):**

```text
CRM ──(pencapaian penjualan, aktivitas sales)──▶ HCM
        dipakai sebagai dasar evaluasi kinerja,
        hitung bonus / insentif / komisi

HCM ──(data karyawan, kompetensi, struktur org.)──▶ CRM
        dipakai untuk penugasan tenaga penjualan
        & alur persetujuan (approval) sesuai hierarki
```

### Contoh
Katakan tim penjualan wilayah Timur bulan ini meledakkan target. Angka pencapaian itu **otomatis tersimpan di CRM**. Tiap akhir bulan, HCM narik data itu buat evaluasi kinerja dan ngitung komisi tiap sales — gak ada lagi rekap manual di Excel. Sebaliknya, saat ada lead baru dari pelanggan besar, CRM perlu tahu "sales mana yang kompeten di wilayah ini" → data kompetensi & penugasan datang dari HCM. Plus, kalau nilai pesanan melewati ambang tertentu, alur approval-nya dilempar ke manajer sesuai struktur hierarki yang dipegang HCM.

> [!TIP]
> Kunci nilai kuis ini di kata **"dua arah"**. Kalau kamu cuma nyebut satu arah, jawaban dianggap setengah. Hafal pola: *CRM nyimpan "penjualan siapa berhasil", HCM ngitung "jadi berapa bonusnya" — sebaliknya HCM tahu "siapa kompeten", CRM yang nugas.*

```quiz
Q: Menurut slide bab-01, tiga komponen CRM adalah...
+ People, Technology, dan Process
- Financial, Supply Chain, dan Human Capital
- General Ledger, Accounts Payable, dan Accounts Receivable
- Start Event, Task, dan Gateway
> CRM punya 3 komponen: People (SDM lini depan & belakang), Technology (hw/sw/jaringan buat data pelanggan), Process (Identifikasi ➔ Diferensiasi ➔ Interaksi ➔ Personalisasi).
```

---

## 2. Komponen Utama BPMN dan Indikator Kualitas Sistem Informasi

### Konsep dasar
- **BPMN (Business Process Model and Notation)**: standar notasi grafis untuk menggambarkan alur proses bisnis secara visual dan terstandar (dari slide bab-02). Slide bab-02 menyebut BPMN cuma di tingkat pengenalan — simbolnya disebut "tugas (task), peristiwa (event), pintu keputusan (gateway), dan alur urutan aktivitas" tanpa rincian.
- **Indikator kualitas SI**: kuis minta 3 indikator — aksesibilitas, transparansi, ketepatan waktu.

> [!NOTE]
> Bagian ini dari referensi eksternal (bukan slide dosen): **rincian komponen BPMN** (kategori flow objects & connecting objects) dan **3 indikator kualitas SI** sama sekali gak ada di slide bab-01 s/d bab-04 maupun materi-extra. Slide cuma nyebut nama "BPMN" doang. Rincian di bawah bersumber dari spesifikasi OMG dan literatur akademis — tandai sebagai referensi luar kalau ditanya "dari mana".

### Rincian poin
**A. Flow Objects (objek alur)** — elemen yang menggambarkan perilaku proses:

| Jenis | Sub-jenis | Fungsi |
|---|---|---|
| **Events** (kejadian) | Start Event, Intermediate Event, End Event | Peristiwa: awal, tengah, akhir proses |
| **Activities** (aktivitas) | Task, Sub-process | Pekerjaan oleh manusia atau sistem |
| **Gateways** (gerbang) | Exclusive, Inclusive, Parallel Gateway | Percabangan & penggabungan alur berdasarkan kondisi |

**B. Connecting Objects (objek penghubung)** — menghubungkan elemen:

| Jenis | Tampilan | Fungsi |
|---|---|---|
| **Sequence Flow** | garis penuh berpanah | Urutan pelaksanaan aktivitas *dalam satu alur/pool* |
| **Message Flow** | garis putus-putus berpanah | Pertukaran pesan *antar partisipan/pool berbeda* (antar organisasi) |
| **Association** | garis putus-putus *tanpa* panah | Menghubungkan artifact (Data Object, Text Annotation) ke elemen proses |

Selain dua kategori itu, BPMN juga punya **Swimlane** (Pool/Lane) buat membagi tanggung jawab per departemen dan **Artifacts** (Data Object, Annotation, Group) — tapi kuis hanya minta dua kategori besar di atas.

**C. 3 indikator kualitas sistem informasi:**

| Indikator | Definisi | Test cepat |
|---|---|---|
| **Aksesibilitas** | Sistem menyediakan akses data & proses mudah, cepat, aman bagi pengguna **sesuai hak akses peran** | "*Bisa diakses siapa yang berhak?*" |
| **Transparansi** | Alur kerja, status pemrosesan, & pembagian tanggung jawab bisa diketahui & dipantau pihak berkepentingan → akuntabilitas naik, bottleneck gampang ketahuan | "*Bisa dipantau alurnya?*" |
| **Ketepatan Waktu (Timeliness)** | Informasi akurat & relevan tersedia **pada waktu dibutuhkan** → keputusan lebih cepat | "*Sampai tepat waktu?*" |

### Contoh
Proses pemrosesan pesanan pelanggan (dari slide bab-02): Pesanan [Pelanggan] ➔ Verifikasi [Keuangan] ➔ Pemrosesan [Gudang/Pabrik] ➔ Pengiriman [Logistik] ➔ Layanan [Pelanggan]. Di diagram BPMN-nya: tiap kotak = **Task** (activity), titik awal = **Start Event**, titik akhir = **End Event**, verifikasi kredit yang punya jalur "lolos/tolak" = **Exclusive Gateway**. Garis antartahap dalam satu pool = **sequence flow**; kalau pelanggan di pool terpisah kirim order ke perusahaan = **message flow**.

Kaitan ke indikator: staf gudang cuma boleh lihat stok bukan angka keuangan = **akuntabilitas aksesibilitas**; status pesanan "diverifikasi ➔ sedang dikemas" bisa dilihat semua pihak = **transparansi**; laporan stok yang muncul real-time saat dibutuhkan pengambil keputusan = **ketepatan waktu**.

> [!IMPORTANT]
> Pola garis BPMN paling sering disalahjawab: **sequence = penuh (dalam satu alur), message = putus-putus berpanah (antar-pool), association = penghubung artifact**. Jangan kebalik.

```quiz
Q: Dalam BPMN, elemen yang menghubungkan Data Object atau Text Annotation ke elemen proses lain disebut...
+ Association (penghubung Data Object / Text Annotation)
- Sequence Flow
- Message Flow
- Exclusive Gateway
- End Event
> Association adalah connecting object penghubung artifact (Data Object/Text Annotation) ke elemen BPMN lain — garis putus-putus tanpa panah. (Referensi eksternal: spesifikasi OMG BPMN 2.0.)
```

---

## 3. Tantangan Implementasi Sistem Informasi Korporat dalam Persaingan Global

### Konsep dasar
Implementasi SI korporat (ERP/EIS) lintas negara itu gak cuma soal teknologi — tantangannya nembus 3 lapis sekaligus: **teknis**, **manusia**, dan **bisnis/eksternal**. Kuis minta **6 tantangan**, jadi tulis definisi + contoh per poin.

> [!NOTE]
> Bagian ini dari referensi eksternal (bukan slide dosen) untuk pengembangan konteks global: daftar 6 tantangan berasal dari **jawaban kuis** (ringkasan), sementara slide yang relevan cuma menyumbang sebagian — bab-01 (fragmentasi & redundansi data), bab-02 (entri manual, silos, pain points redesign), bab-04 (lingkungan bisnis dinamis & mismatch bisnis-TI), materi-extra (CLO #6: "peran Corporate IS dalam persaingan global **dan tantangannya**" — tapi slide gak merinci tantangannya). Pengayaan literatur global ERP di bawah dari paper konferensi eksternal.

### Rincian poin

| # | Tantangan | Inti masalah | Lapisan |
|---|---|---|---|
| 1 | **Kompleksitas integrasi data & sistem warisan (legacy)** | Beda sistem per departemen/cabang; menyatukan sistem lama + teknologi baru dengan format data beragam butuh waktu & biaya besar | Teknis |
| 2 | **Resistensi perubahan & budaya organisasi (change management)** | Karyawan menolak/kurang paham teknologi & prosedur baru; keterbatasan kemampuan menghambat adopsi | Manusia |
| 3 | **Kepatuhan regulasi & perbedaan antarnegara** | Perpajakan, mata uang, bahasa, standar akuntansi beda tiap negara + regulasi data pribadi seperti **GDPR Uni Eropa** | Eksternal |
| 4 | **Biaya implementasi & risiko keterlambatan** | Investasi besar (software, infrastruktur, konsultasi, pemeliharaan, pelatihan); perencanaan buruk → over-budget & over-time | Bisnis |
| 5 | **Keamanan siber & privasi data** | Sistem terintegrasi = target besar: pencurian data, ransomware, akses tak sah; butuh hak akses, enkripsi, kebijakan privasi | Teknis |
| 6 | **Keterbatasan infrastruktur & sumber daya ahli** | Kualitas infrastruktur beda antarnegara + tenaga ahli TI terbatas → implementasi & pemeliharaan berkelanjutan tersendat | Manusia + Teknis |

**Pengayaan dari literatur eksternal** (Hawking, Stein & Foster, ICEIS 2007 — paper "The Challenges Facing Global ERP Systems Implementations"): perusahaan global menghadapi tantangan **teknologi maupun budaya**, dengan isu utama adalah **keseimbangan antara sentralisasi dan lokalisasi** — standarisasi proses global vs kebutuhan lokal. Isu lokal yang mereka identifikasi: **bahasa, budaya, dan mata uang**. Paper literatur yang mereka rangkum juga menyebut: kegagalan redesain proses bisnis, kurangnya integrasi & standardisasi data, aplikasi legacy yang sulit dijembatani ("building bridges to legacy applications"), kurangnya strategi change management, dan bottleneck teknologi.

### Contoh
- **#1 Legacy:** pabrik induk pakai SAP, cabang Manila masih pakap sistem akuntansi warisan tahun 2005 + spreadsheet. Menyatukan format datanya = proyek migrasi berminggu-minggu.
- **#3 Regulasi:** produk yang dijual ke 10 negara wajib punya 10 konfigurasi pajak & mata uang, plus penyimpanan data pelanggan UE harus nurut GDPR.
- **#4 Biaya:** ERP raksasa bisa makan budget konsultasi + pelatihan yang bahkan gak kebayar di awal; kalau rollout mundur 3 bulan, biaya tim proyek membengkak.
- **#5 Keamanan:** satu database terpusat = satu pintu masuk buat attacker — sekali jebol, semua data departemen bocor sekaligus.
- Konteks slide: **bab-01** (fragmentasi ➔ redundansi & informasi gak sinkron), **bab-02** (pain points: entri manual, silos, jadwal produksi terlambat), **bab-04** (mismatch bisnis-TI menekan daya saing).

> [!TIP]
> Hafal pakai akronim **L-R-G-B-K-I** (Legacy, Resistensi, Geopolitik/regulasi, Biaya, Keamanan, Infrastruktur), lalu kelompokin: teknis (#1, #5, #6), manusia (#2, #6), eksternal/bisnis (#3, #4). Pola mikir ini yang bikin jawaban kelihatan terstruktur.

```quiz
Q: Investasi besar untuk software, infrastruktur, konsultasi, pelatihan, serta risiko proyek meleset dari jadwal dan anggaran termasuk tantangan...
+ Biaya implementasi & risiko keterlambatan
- Resistensi perubahan dan budaya organisasi
- Keterbatasan infrastruktur & sumber daya ahli
- Keamanan siber & privasi data
> Tantangan #4: kurang perencanaan membuat implementasi over-budget dan over-time. Beda dengan resistensi (manusia) dan infrastruktur/SDM (keteknisian).
```

---

## 4. Prinsip Utama Business Process Integration (BPI)

### Konsep dasar
- **BPI (Business Process Integration)**: pendekatan menghubungkan berbagai proses bisnis & fungsi organisasi agar bekerja terkoordinasi, saling bertukar informasi, dan mendukung tujuan perusahaan menyeluruh.
- Kuis minta **3 prinsip utama**: (A) Granularitas Aliran Informasi, (B) Kepemilikan Lintas Fungsi, (C) Standarisasi dan Penghapusan Redundansi.

> [!NOTE]
> Bagian ini dari referensi eksternal (bukan slide dosen): **3 prinsip BPI sama sekali gak ada di slide** bab-01 s/d bab-04 maupun materi-extra (materi-extra cuma menyebut CLO #5 "mampu menjelaskan prinsip Business Process Integration" tanpa materinya). Isi 3 prinsip di bawah dari **jawaban kuis** (ringkasan). Referensi akademis terdekat yang aku verifikasi: Berente, Vandenbosch & Aubert (2009), *"Information flows and business process integration"*, Business Process Management Journal 15(1) — mereka menurunkan **empat** prinsip integrasi proses dari aliran informasi: *accessibility, timeliness, transparency, granularity*. Catatan jujur: prinsip **granularity**-nya nyambung langsung, tapi "cross-functional ownership" dan "standarisasi" persis kayak 3 prinsip kuis **bukan** daftar dari paper itu — jadi jangan mengaku paper itu sebagai sumber literal 3 prinsip kuis.

### Rincian poin

| Prinsip | Pertanyaan kuncinya | Apa yang diatur |
|---|---|---|
| **A. Granularitas Aliran Informasi** | "*Seberapa detail infonya?*" | Tingkat kedetailan informasi yang dipertukarkan antarproses — transaksi terperinci ATAU rangkuman, disesuaikan kebutuhan |
| **B. Kepemilikan Lintas Fungsi (Cross-Functional Ownership)** | "*Siapa yang pegang prosesnya?*" | Proses bisnis bukan milik satu departemen — dikelola terkoordinasi oleh berbagai fungsi, tiap departemen bertanggung jawab atas kualitas informasi & keberhasilan proses *end-to-end* |
| **C. Standarisasi dan Penghapusan Redundansi** | "*Seragam & gak dobel?*" | Selaraskan format data, definisi informasi, prosedur, & aturan kerja se-organisasi; hilangkan duplikasi data & aktivitas tak perlu |

**Diagram alur pemahaman BPI:**

```text
[Tujuan perusahaan]
        ▲
   proses end-to-end dikordinasikan ──▶ (B) siapa yang punya?
        ▲
   informasi mengalir antarproses ──▶ (A) seberapa detail?
        ▲
   format & definisi seragam, gak dobel ──▶ (C) standar & tanpa redundansi
```

### Contoh
- **(A) Granularitas:** bagian penjualan kirim **data tiap transaksi** ke bagian persediaan biar stok ke-update real-time; manajemen cukup nerima **laporan total penjualan harian**. Dua level detail berbeda untuk dua kebutuhan berbeda — itu granularitas.
- **(B) Kepemilikan lintas fungsi:** pemenuhan pesanan pelanggan gak bisa jalan kalau cuma dipegang sales. Butuh penjualan (order) ➔ persediaan (cek stok) ➔ pergudangan (pick & pack) ➔ pengiriman (kirim) ➔ keuangan (faktur & pembayaran). Semua fungsi punya bagiannya masing-masing dalam satu proses *end-to-end*.
- **(C) Standarisasi:** data pelanggan cukup **dimasukkan satu kali** di sistem terpusat, lalu dipakai semua departemen yang berhak → gak ada lagi 5 versi file kontak pelanggan yang saling beda.

> [!IMPORTANT]
> 3 prinsip BPI = **Granularitas** (seberapa detail), **Cross-functional ownership** (siapa yang pegang), **Standarisasi + hapus redundansi** (seragam & gak dobel). Ini nyambung langsung ke konsep fragmentasi vs integrasi di bab-01 — fragmentasi itu kebalikan dari ketiganya.

```quiz
Q: Pemenuhan pesanan pelanggan yang melibatkan penjualan, persediaan, pergudangan, pengiriman, dan keuangan mengilustrasikan prinsip BPI...
+ Kepemilikan Lintas Fungsi (Cross-Functional Ownership)
- Granularitas Aliran Informasi
- Standarisasi dan Penghapusan Redundansi
- Ketepatan Waktu (Timeliness)
> Prinsip B: satu proses bisnis bukan tanggung jawab satu departemen, tapi dikelola terkoordinasi oleh berbagai fungsi secara end-to-end.
```

---

## 5. Fungsi dan Keterkaitan Modul ERP: Financial dan SCM

### Konsep dasar
- **Modul Financial** (dari slide bab-01, tabel Accounting): menangani neraca, pengeluaran, rekonsiliasi bank, buku besar, pajak, penganggaran — perannya "konsolidasi laporan keuangan terpusat dari seluruh transaksi".
- **Modul SCM** (dari slide bab-01): pengelolaan aliran **produk, informasi, dan dana** terintegrasi yang melibatkan supplier, perusahaan, hingga jasa logistik. Slide bab-01 juga nyebut 6 area cakupan SCM: Product Development, Procurement/Purchasing, Planning & Control, Production, Distribution, Return.
- Kuis nomor 5 = definisi dua modul + keterkaitan **dua arah**.

### Rincian poin

**Modul Financial — sub-fungsi (dari kuis + slide bab-01):**

| Sub-fungsi | Bahasa Inggris | Peran |
|---|---|---|
| Buku Besar | General Ledger | Pusat seluruh pencatatan akuntansi |
| Utang | Accounts Payable | Kewajiban bayar ke pemasok |
| Piutang | Accounts Receivable | Hak tagih dari pelanggan |
| Aset Tetap | Fixed Assets | Pencataan & penyusutan aset |
| Penganggaran | Budgeting | Perencanaan & pengendalian dana |
| Laporan Keuangan | Financial Reporting | Neraca, laba rugi, dll. |

**Modul SCM — rantai aktivitas (dari kuis + slide bab-01):**

```text
Procurement ──▶ Perencanaan kebutuhan bahan baku ──▶ Inventory Mgmt
      ──▶ Warehouse Mgmt ──▶ Produksi ──▶ Logistik & Distribusi ──▶ Pelanggan
```

**Keterkaitan dua arah (inti jawaban kuis):**

```text
SCM ──(aktivitas fisik jadi transaksi)──▶ Financial
        penerimaan bahan baku ➔ persediaan naik + utang usaha tercatat
        pengiriman ke pelanggan ➔ pendapatan + HPP/COGS tercatat

Financial ──(batas & kebijakan uang)──▶ SCM
        anggaran, kondisi keuangan, batas kredit pelanggan,
        kewajiban pembayaran ke pemasok ➔ dasar rencana pengadaan
```

### Contoh
Pabrik terima 1 ton bahan baku dari pemasok pagi ini. Di sistem, SCM catat penerimaan barang, dan **otomatis** Financial mencatat: stok persediaan bertambah + utang usaha ke pemasok terbentuk. Begitu produk jadi dikirim ke pelanggan, Financial mencatat pendapatan dan HPP sesuai kebijakan pengakuan akuntansi. Kebalikannya: saat SCM mau tender pengadaan besar, dia cek dulu anggaran & batas kredit di Financial — gak bisa beli semaunya kalau cash flow lagi tipis.

> [!TIP]
> Analogi super gampang: **SCM = pergerakan barang fisik, Financial = pencatatan uangnya.** Barang masuk → utang tercatat; barang keluar → pendapatan & HPP tercatat. Budget & batas kredit dari Financial = rem buat SCM. Intinya: **aktivitas fisik harus selaras dengan pencatatan keuangan** — itu esensi integrasi ERP.

> [!NOTE]
> Detail sub-fungsi (GL/AP/AR/budgeting) berasal dari jawaban kuis; daftar modul ERP generik (finance, procurement, inventory, warehouse, SCM, CRM, HCM) yang mirip dengan ini juga bisa kamu cek di referensi eksternal terverifikasi (NetSuite — lihat bagian Sources), tapi **kerangka jawaban tetap ikut slide & kuis**, bukan artikel vendor.

```quiz
Q: Penggajian karyawan (payroll) bukan bagian dari modul Financial karena payroll termasuk fungsi modul...
+ HCM (Human Capital Management) / HRM
- SCM (Supply Chain Management)
- CRM (Customer Relationship Management)
- General Ledger
> Financial mengurus buku besar, utang, piutang, aset tetap, anggaran & laporan. Payroll & data karyawan itu siklus SDM = HCM (dari slide bab-01: modul HRM mengelola informasi karyawan, penilaian kinerja, cuti, kehadiran).
```

---

## 6. Prinsip Dasar Enterprise System

### Konsep dasar
**Enterprise System / EIS** (dari materi-extra): sistem komputasi tingkat enterprise yang menyediakan platform terintegrasi untuk mengoordinasikan proses bisnis, pusat sistem tunggal yang memastikan informasi terbagi di semua tingkat hirarki manajemen, serta struktur data standar yang **menghilangkan fragmentasi informasi**. Bab-01 menegaskan: EIS **bukan sekadar jaringan fisik (LAN)** — yang disatukan itu integrasi proses bisnis dan database secara logikal multilevel (staf ➔ manajer ➔ direktur).

Kuis nomor 6 minta **5 prinsip dasar**. Slide gak memakai kata "prinsip" persis, tapi konsepnya nyambung langsung ke materi-extra (penyatuan informasi logikal, single source of truth) dan bab-01 (karakteristik & tujuan EIS).

### Rincian poin

| # | Prinsip | Definisi | Dukungan slide |
|---|---|---|---|
| 1 | **Sumber Data Tunggal (Single Source of Truth)** | Satu sumber data terintegrasi & konsisten sebagai acuan seluruh departemen → standar & definisi data sama | materi-extra: "Single Source of Truth", "penyatuan database logikal"; bab-01: single logical database |
| 2 | **Integrasi Proses Bisnis (End-to-End)** | Keuangan, penjualan, SDM, produksi, persediaan jadi satu rangkaian proses saling terkoordinasi, tanpa terhambat batasan fungsi | bab-01: "DENGAN EIS ➔ alur informasi antar divisi mengalir otomatis"; materi-extra: "bukan sekadar jaringan fisik" |
| 3 | **Integrasi & Pembaruan Informasi Real-Time** | Info yang dimasukkan satu bagian langsung tersedia bagi modul lain → kurangi keterlambatan & dukung keputusan | bab-01: "akses data real-time untuk seluruh hirarki"; bab-02: "menyediakan basis data real-time" |
| 4 | **Modularitas Sistem (Modularity)** | Terdiri dari modul beda fungsi (keuangan, SDM, penjualan, persediaan) yang saling terhubung | bab-01: tabel modul EIS (Accounting, CRM, HRM, Sales, Inventory, Purchasing, Manufacturing); bab-02: modul ERP |
| 5 | **Standarisasi Proses & Best Practices** | Terapkan standar data, prosedur, & praktik bisnis konsisten di seluruh unit → efisiensi naik, kesalahan turun | bab-01 karakteristik #1: "Adanya Standar Transaksi yang Sama" (format faktur & pencatatan kas diseragamkan) |

**Diagram logika 5 prinsip (urutan berpikir):**

```text
(1) Data satu sumber ──▶ (2) Proses nyambung ujung-ke-ujung
        ──▶ (3) Pembaruan real-time ──▶ (4) Sistem modular
        ──▶ (5) Cara kerja standar / best practice
```

**Karakteristik EIS (dari slide bab-01)** yang jadi bukti penerapan prinsip di atas:

| Karakteristik | Contoh ilustrasi slide |
|---|---|
| Standar transaksi yang sama | Format faktur & pencatatan kas diseragamkan di seluruh cabang |
| Kontrol jika ada perubahan | Perubahan data stok harus lewat persetujuan otoritas |
| Manajemen sistem | Hak akses data keuangan dibatasi berdasarkan hirarki jabatan |
| Data heterogen | Menggabungkan data presensi, mesin produksi, & penjualan |
| Layanan kualitas tinggi & volume besar | Ribuan transaksi per detik tanpa penurunan performa |

### Contoh
Perusahaan manufaktur (studi kasus slide bab-02): sebelum ERP, tiap divisi nyimpan data sendiri (fragmentasi, redundansi, laporan gak sinkron). Sesudah redesign + ERP: **(1)** satu database terpusat jadi acuan semua pihak; **(2)** pengadaan ➔ inventaris ➔ produksi ➔ logistik ➔ pelanggan jadi rantai proses nyambung; **(3)** stok berubah di gudang → langsung kelihatan di laporan keuangan & produksi; **(4)** tiap fungsi dikelola modulnya sendiri (Finance, Inventory, Purchasing, Sales, HR, Production); **(5)** entri data manual diganti aturan baku & otomasi → lead time berkurang.

> [!IMPORTANT]
> Poin 1 dan 5 paling sering ketuker: **1 soal *data* (satu sumber kebenaran), 5 soal *cara kerja* (standar prosedur & best practice)**. Dan ingat: menyimpan data sendiri-sendiri per divisi itu justru **fragmentasi** — kebalikan prinsip #1.

```quiz
Q: Prinsip dasar Enterprise System yang berarti informasi yang dimasukkan oleh satu bagian langsung diperbarui dan tersedia bagi modul lain adalah...
+ Integrasi & Pembaruan Informasi Secara Real-Time
- Sumber Data Tunggal (Single Source of Truth)
- Modularitas Sistem
- Standarisasi Proses dan Praktik Terbaik
> Prinsip #3: pembaruan real-time mengurangi keterlambatan pertukaran informasi dan mendukung pengambilan keputusan cepat. (Dukungan slide: "akses data real-time" di bab-01, "basis data real-time" di bab-02.)
```

---

## 7. Peran Corporate Information System dalam Persaingan Global

### Konsep dasar
**Corporate Information System** = sistem informasi korporat tingkat perusahaan yang menyediakan platform terpusat untuk pengumpulan, pemrosesan, dan penyebaran informasi lintas unit (dari slide bab-02: "Peran EIS..."), ditopang oleh ERP, Workflow Management Systems (WMS), dan Business Process Management (BPM). Kuis nomor 7 minta **4 peran** dalam persaingan global.

> [!NOTE]
> Catatan jujur: **materi-extra hanya menyebut CLO #6** ("memahami Peran Corporate Information system dalam Persaingan Global dan tantangannya") tanpa merinci isinya, dan slide bab-01 s/d bab-04 gak punya daftar "4 peran" eksplisit. Kerangka 4 peran di bawah dari **jawaban kuis** (ringkasan), diperkuat konteksnya oleh slide bab-01 (tujuan EIS: informasi cepat/akurat/terpadu, pengawasan tepat waktu), bab-02 (manfaat ERP: visibilitas real-time, kolaborasi lintas departemen), dan bab-04 (peran arsitektur: business-IT alignment, fleksibilitas & adaptabilitas menghadapi pasar dinamis).

### Rincian poin

| # | Peran | Skala | Bentuk nyata |
|---|---|---|---|
| 1 | **Dukung keputusan strategis berbasis data (data-driven decision making)** | Dalam: ruang manajemen | Informasi, laporan analitis, dashboard **BI** → analisis tren pasar, peluang, keputusan cepat & tepat |
| 2 | **Efisiensi operasional & skalabilitas bisnis** | Operasional | Integrasi & otomasi (keuangan, persediaan, produksi, distribusi) → kurangi kerja manual & kesalahan, tekan biaya, mudah ekspansi internasional |
| 3 | **Kolaborasi & koordinasi lintas wilayah** | Antarwilayah | Menghubungkan departemen, cabang, & mitra di lokasi beda lewat pertukaran informasi terintegrasi → aktivitas konsisten meski beda negara |
| 4 | **Keunggulan kompetitif & responsivitas bisnis** | Pasar | Respons kebutuhan pelanggan & dinamika persaingan; identifikasi peluang & inovasi |

**Diagram skalanya (dari dalam ➔ ke pasar):**

```text
(1) Keputusan/BI di dalam perusahaan
   ──▶ (2) Efisiensi & skalabilitas operasional
      ──▶ (3) Kolaborasi lintas kantor & negara
         ──▶ (4) Keunggulan kompetitif di pasar global
```

### Contoh
- **#1:** direktur buka dashboard BI tiap pagi: penjualan regional mana yang anjlok, margin produk apa yang menyusut — keputusan promosi diambil bukan dari feeling, tapi dari data.
- **#2:** sebelum ERP, 3 orang khusus rekap faktur manual tiap minggu; sesudah otomasi, kerjaan itu hilang dan tim fokus ke analisis. Waktu buka cabang di negara baru, modul yang sama tinggal dikloning — skalabilitas.
- **#3:** kantor Jakarta, pabrik Shenzhen, distributor Rotterdam pakai satu sistem → status order yang sama, gak ada "versi cerita" berbeda tiap kantor.
- **#4:** saat kompetitor rilis fitur baru, perusahaan bisa baca tren dari data pelanggan dan menyesuaikan produk lebih cepat = responsivitas.

Konteks slide: **bab-01** tujuan EIS (info cepat/akurat/terpadu, pengawasan tepat waktu) ➔ mendukung peran #1; **bab-02** manfaat ERP (visibilitas real-time, kolaborasi antar departemen, layanan pelanggan lebih cepat) ➔ peran #2 & #3; **bab-04** (fleksibilitas & adaptabilitas terhadap pasar dinamis, business-IT alignment) ➔ peran #4.

> [!TIP]
> Hafal urutan skalanya: **dalam (keputusan) ➔ operasional (efisiensi) ➔ antarwilayah (kolaborasi) ➔ pasar (keunggulan kompetitif)**. Jawaban yang nunjukkin urutan ini kelihatan lebih matang daripada sekadar nulis 4 poin acak.

```quiz
Q: Peran Corporate Information System yang menghubungkan departemen, kantor cabang, dan mitra bisnis di lokasi geografis berbeda agar aktivitas tetap konsisten meski beda negara adalah...
+ Memfasilitasi kolaborasi & koordinasi lintas wilayah
- Mendukung pengambilan keputusan strategis berbasis data
- Meningkatkan efisiensi operasional & skalabilitas bisnis
- Meningkatkan keunggulan kompetitif & responsivitas bisnis
> Peran #3: skala antarwilayah — pertukaran informasi & koordinasi terintegrasi antar lokasi geografis. (Dukungan slide bab-02: platform terpusat untuk pengumpulan, pemrosesan, dan penyebaran informasi.)
```

---

## Sources

Semua URL di bawah sudah aku **verifikasi dengan ekstraksi langsung** (dicek betul ada halamannya & isinya sesuai), bukan URL karangan:

**BPMN — spesifikasi & dokumentasi (untuk pokok 2):**
- [About the Business Process Model And Notation Specification Version 2.0 — OMG](https://www.omg.org/spec/BPMN/2.0/About-BPMN) — halaman resmi spesifikasi BPMN 2.0 (status: formal, terbit Desember 2010), dijalankan oleh Object Management Group.
- [BPMN v2.0 — bpmn.org (dokumen spesifikasi)](https://www.bpmn.org/documents) — situs dokumen spesifikasi resmi BPMN 2.0 (spec PDF, XSD, CMOF).
- [Modeling with BPMN — Camunda 8 Docs](https://docs.camunda.io/docs/components/modeler/bpmn/) — dokumentasi pemodelan BPMN 2.0 dari Camunda (events, tasks, gateways, dll.).

**Indikator kualitas SI & BPI — literatur akademis (untuk pokok 2 & 4):**
- [Berente, N., Vandenbosch, B., Aubert, B. (2009). "Information flows and business process integration". Business Process Management Journal, 15(1), 119–141. DOI 10.1108/14637150910931505](https://doi.org/10.1108/14637150910931505) — makalah Emerald; abstraknya terverifikasi: menurunkan **empat prinsip integrasi proses: accessibility, timeliness, transparency, dan granularity of information flows**. Ini referensi akademis terdekat buat indikator kualitas SI & prinsip BPI (catat lagi: paper ini punya 4 prinsip, bukan 3 prinsip kuis — jangan dikutip sebagai sumber literal 3 prinsip).
- [dblp: "Information flows and business process integration"](https://dblp.org/rec/journals/bpmj/BerenteVA09.html) — katalog bibliografi yang memverifikasi publikasi jurnalnya (BPMJ 15(1): 119–141, 2009).
- [Lee, Y.W., Strong, D.M., Kahn, B.K., Wang, R.Y. (2002). "AIMQ: a methodology for information quality assessment". Information & Management](https://web.mit.edu/tdqm/www/winter/AIMQ.pdf) — PDF terverifikasi; model kualitas informasi (IQ) yang memuat dimensi **accessibility** dan **timeliness** (mengutip kerangka Wang & Strong).

**Modul ERP (untuk pokok 1 & 5):**
- [ERP Modules: Types, Features & Functions — NetSuite](https://www.netsuite.com/portal/resource/articles/erp/erp-modules.shtml) — artikel referensi terverifikasi yang mendeskripsikan modul ERP umum: Finance (general ledger, AP/AR), Procurement, Manufacturing, Inventory, Order Management, Warehouse, Supply Chain, CRM, HCM/HRM.

**Tantangan implementasi global (untuk pokok 3):**
- [Hawking, P., Stein, A., Foster, S. (2007). "The Challenges Facing Global ERP Systems Implementations". ICEIS 2007, pp. 415–422. DOI 10.5220/0002359604150422](https://www.scitepress.org/Papers/2007/23596/) — halaman paper terverifikasi: review literatur tantangan ERP global (tantangan teknologi & budaya; isu utama keseimbangan sentralisasi vs lokalisasi; isu bahasa, budaya, mata uang).

**Sumber tanpa URL (bahan slide dosen — jangan dikarang URL-nya):**
- Slide **bab-01** (integrasi/fragmentasi EIS, tabel modul EIS, jenis EIS, CRM & SCM mendalam, karakteristik & tujuan EIS).
- Slide **bab-02** (proses bisnis, pengenalan BPMN, contoh alur pesanan, komponen/manfaat ERP, studi kasus manufaktur).
- Slide **bab-04** (tantangan & peran arsitektur SI, mismatch bisnis-TI).
- **materi-extra** (konsep utama EIS, single source of truth, CLO #4–#7).
- `kuis/kuis-sie-tif24cns-e.docx` via `pertemuan-kuis-ringkasan.md` (kerangka jawaban 7 pokok).

> [!WARNING]
> Kalau ada bagian yang kamu gak yakin sumbernya, jangan dilanjutkan ngarang — cek dulu ke file ringkasan atau slide aslinya. Bagian yang aku tandai sebagai referensi eksternal memang **bukan** materi dosen, jadi pakai untuk pendalaman/pemahaman, bukan untuk mengklaim "dari slide".