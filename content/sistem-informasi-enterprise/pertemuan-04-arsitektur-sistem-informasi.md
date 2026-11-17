# Bab 4 — Arsitektur Sistem Informasi

Catatan ini ditulis ulang dari slide dosen Dede Sulaeman, file `materi/bab-04-arsitektur-sistem-informasi.pptx` (Sistem Informasi Enterprise, TIF RP 24 CNS E). Mengikuti referensi yang dikutip slide (Tissot & Crump, Vernadat, Garlan, Spewak & Hill, Pedro Sousa, dll.).

> [!NOTE]
> BAB 4 naik level: kalau BAB 2-3 ngomongin proses & cara ngembangin, BAB 4 nanya **"arsitektur sistemnya kaya apa dan gimana ngukur kualitasnya?"**. Inti di sini: 3 tingkatan arsitektur (EA/ISA/SWA), 3 sub-arsitektur ISA, kerangka CEO, dan 8 metrik evaluasi ISA.

## Pendahuluan: Tantangan & Peran Arsitektur SI

- **Lingkungan bisnis dinamis:** didorong globalisasi pasar, tuntutan inovasi produk/layanan, dan pengurangan siklus hidup produk (Pedro Sousa, 2023).
- **Paradigma teknologi baru:** pemanfaatan modul sistem perusahaan off-the-shelf, komponen off-the-shelf, dan jaringan telekomunikasi cepat memicu reorganisasi strategi bisnis.
- **Masalah ketidakselarasan (mismatch):** sistem informasi sering tidak merespons tuntutan bisnis secara efisien → ketidakselarasan bisnis–TI yang menekan daya saing.
- **Peran strategis arsitektur:** menyediakan otomatisasi, meningkatkan efisiensi proses bisnis, dan menyelaraskan infrastruktur teknologi dengan arah strategis organisasi.

Hubungan integrasi enterprise:

```
Strategi Bisnis Enterprise ➔ Proses Bisnis Terintegrasi ➔ Arsitektur Sistem Informasi ➔ Teknologi Informasi Teralign
```

## Tujuan Pembelajaran BAB 4

Setelah mempelajari BAB 4, mahasiswa diharapkan mampu:
1. **Memahami konsep arsitektur SI** — menjelaskan peran arsitektur menjembatani strategi bisnis dan TI.
2. **Memahami tujuan arsitektur sistem** — menganalisis alasan pengembangan arsitektur untuk mengatasi kompleksitas sistem terintegrasi & pemahaman parsial.
3. **Mengenali hirarki arsitektur** — membedakan EA, ISA, dan Software Architecture.
4. **Menguasai 3 sub-arsitektur ISA** — Informational/Data, Application, dan Technological Architecture.
5. **Memahami profil meta-model kerangka CEO** — Goal, Process, Resource, dan Block.
6. **Menerapkan metrik evaluasi ISA** — mengukur kualitas arsitektur dengan 8 metrik ISA berbasis metrik perangkat lunak.

## Konsep Arsitektur Sistem Informasi

- **Pergeseran daya saing:** dari kemampuan produksi massal menuju kemampuan mereorganisasi dan menggambar ulang proses & strategi bisnis secara berkelanjutan.
- **Ruang lingkup sistem perusahaan:** mencakup manajemen bisnis, pengembangan produk, organisasi produksi, dan operasi pasar yang terintegrasi (Qing Li & Yu-Liu, 2009).
- **Manajemen berbasis model:** menggunakan disiplin TI dan model arsitektur perusahaan untuk mendukung keputusan sistem TI yang memadai.

Faktor pendorong kebutuhan arsitektur:

| Aspek | Isi |
|---|---|
| Tingkat Kompleksitas Tinggi | Sistem perusahaan besar terdiri dari banyak unit aplikasi (CAD, CAM, PDM, ERP) yang saling terhubung. |
| Sudut Pandang | Setiap stakeholder punya pandangan berbeda sehingga berisiko tidak memahami keseluruhan sistem. |
| Dukungan Keputusan TI | Butuh kerangka kerja formal (EA/ISA) agar keputusan TI selaras dengan tujuan bisnis. |

## Tujuan Arsitektur Sistem

Slide memberi 2 tujuan utama lewat dua analogi:

1. **Mengatasi 'Pemahaman Parsial' (Gambar 4.1) — Analogi Orang Buta & Gajah:** Prof. T.J. Williams (Purdue University) mengilustrasikan bahwa tanpa arsitektur, tiap pemangku kepentingan hanya memahami sebagian sistem. Kebutuhan analisis multiperspektif: sistem harus dianalisis dari berbagai aspek & fase siklus hidup agar gambaran target sistem dipahami benar.
2. **Menghindari 'Bangunan Mustahil' (Gambar 4.2) — Analogi Bangunan Escher:** aplikasi canggih individual (CAD, CAM, PDM, ERP) tidak otomatis membentuk sistem terpadu tanpa perancangan arsitektur yang tepat. Arsitektur memberi panduan metodologis agar berbagai metode pemodelan & alat CASE digunakan secara logis, terbaca, dan terkoordinasi.

> [!TIP]
> Analogi "Orang Buta & Gajah": masing-masing pegang bagian berbeda (belalai, kaki, telinga) dan nyimpulin hal beda — padahal gajahnya satu. Analogi "Bangunan Escher": tiap bagian kelihatan oke sendiri-sendiri, tapi begitu digabung hasilnya mustahil/gak nyambung. Dua-duanya nunjukin kenapa butuh **arsitektur menyeluruh**, bukan cuma aplikasi bagus yang ditumpuk.

## Hirarki Arsitektur Organisasi (3 Tingkatan)

| Tingkatan | Perspektif | Penjelasan |
|---|---|---|
| Enterprise Architecture (EA) | Perspektif Perusahaan | Sekumpulan model untuk mendapatkan gambaran perusahaan yang koheren & dapat dipahami (Tissot & Crump, 1998). Mencakup diagram aktivitas, proses bisnis, organisasi, informasi, dan perilaku (Vernadat, 1996). |
| Information System Architecture (ISA) | Perspektif Sistem Informasi | Representasi struktur komponen SI, hubungan, prinsip, dan arahannya untuk mendukung bisnis (Garlan et al., 1995). Menjembatani arsitektur perusahaan dan arsitektur perangkat lunak. |
| Software Architecture (SWA) | Perspektif Perangkat Lunak | Fokus pada bagaimana program/komponen aplikasi dibangun secara internal. Mempertimbangkan objek & kelas untuk implementasi perangkat lunak (bidang stabil & matang). |

> [!IMPORTANT]
> Urutannya: **EA (perusahaan) ➔ ISA (sistem informasi) ➔ SWA (perangkat lunak)**. ISA posisinya di tengah — dia jembatan dari gambaran besar perusahaan ke detail teknis software.

## Peran Arsitektur dalam Enterprise

- **Penyelarasan Bisnis dan TI (Business-IT Alignment):** definisi ISA yang tepat berkontribusi menjembatani strategi bisnis dengan kapabilitas TI.
- **Strategi TI yang Memadai:** memastikan pemilihan infrastruktur & aplikasi terarah sesuai visi jangka panjang perusahaan.
- **Kekuatan & Kemandirian TI (Robust & IT-Independent):** sistem yang dibangun kokoh serta tidak tergantung kaku pada satu vendor tertentu.
- **Fleksibilitas & Adaptabilitas:** sistem bisa beradaptasi cepat terhadap perubahan kebutuhan bisnis & kondisi pasar.
- **Pengurangan Kompleksitas:** mengabstraksikan elemen perusahaan melalui model terstruktur sehingga kompleksitas besar dapat dikelola efisien.

## Komponen & 3 Sub-Arsitektur ISA

Tiga sub-arsitektur dalam ISA (Spewak & Hill, 1992):

1. **Informational Architecture (Data Architecture)** — mewakili tipe data utama & entitas informasi yang diperlukan untuk mendukung bisnis organisasi.
2. **Application Architecture** — mendefinisikan aplikasi & layanan SI (**IS Blocks/Services**) yang diperlukan untuk mengelola data dan mendukung proses bisnis.
3. **Technological Architecture** — mewakili teknologi utama (perangkat keras, jaringan, platform) yang digunakan dalam implementasi aplikasi & infrastruktur penyebaran SI.

## Hubungan Antar Komponen: Profil Meta-Model CEO Framework

Kerangka CEO (Chief Executive Officer Framework) = profil meta-model UML (Gambar 4.3). Ada 4 elemen utama:

| Elemen | Bidang Pemodelan | Peran / Hubungan |
|---|---|---|
| «Goal» (Tujuan) | Pemodelan Strategi | Tujuan strategis bisnis yang ingin dicapai («achieve») oleh proses bisnis. |
| «Process» (Proses) | Pemodelan Proses Bisnis | Mengontrol, mengeksekusi, menghasilkan, mengonsumsi, dan menggunakan «Resource». Didukung oleh «Block». |
| «Resource» (Sumber Daya) | Pemodelan Sumber Daya Bisnis | Sumber daya bisnis yang digunakan/dihasilkan proses serta dikirim/diterima oleh «Block». |
| «Block» (Blok Sistem Informasi) | Pemodelan Sistem Informasi | Mendukung («supports») proses bisnis dan mengirim/menerima («sends/receives») data dengan sumber daya. |

Cara ngingat hubungannya:
- **Goal** dicapai oleh **Process**.
- **Process** pakai/hasilkan **Resource** dan didukung oleh **Block**.
- **Block** (sistem informasi) mendukung **Process** dan tukar data dengan **Resource**.

## Evaluasi Arsitektur Sistem Informasi

- **Tujuan evaluasi ISA:** menilai sejauh mana arsitektur sistem informasi memenuhi kualitas bisnis & teknis yang diharapkan.
- **Adaptasi dari metrik perangkat lunak (SA):** metrik ISA dikembangkan dari kumpulan metrik Software Architecture yang paling banyak digunakan & diterima luas.
- **Relevansi atribut kualitas:** atribut kualitas SA (kinerja, keandalan, ketersediaan, modifiabilitas, portabilitas, keamanan) umumnya berlaku untuk evaluasi ISA.
- **Keterbatasan metrik SA langsung:** metrik SA murni **TIDAK bisa langsung** diterapkan pada ISA karena berhubungan dengan rincian perangkat lunak (kelas/objek) yang tidak punya arti langsung dalam konteks ISA.
- **Solusi metrik ISA khusus:** memetakan metrik SA (LOC, LCOM, CBO, RFC, MTBF) ke level komponen sistem enterprise (**IS Blocks, IS Services, dan Entitas Informasi**).

## Metrik Evaluasi ISA (Tabel 4.1)

| Metrik SA | Metrik ISA | Deskripsi Metrik ISA | Sub-Arsitektur | Kualitas ISA |
|---|---|---|---|---|
| Lines of Code (LOC) | Number of Applications | Jumlah aplikasi dalam suatu arsitektur ISA. | App. Arch. | Cost, Time-to-market |
| Total Var. Instances | Number of Inf. Entities | Jumlah entitas informasi dalam suatu arsitektur informasi. | Inf. Arch. | Adaptability, Modificability |
| Lack of Cohesion (LCOM) | Average Lack of Cohesion | Rata-rata himpunan entitas informasi yang tidak terhubung dalam blok aplikasi. | Inf. Arch. | Modificability |
| Average Methods per Class | Average Operations / Block | Rata-rata jumlah operasi per blok aplikasi («IS Blocks»). | App. Arch. | Cost, Adaptability, Modificability |
| Cyclomatic Complexity | Service Cyclomatic Comp. | Jumlah jalur yang diperlukan untuk mendukung suatu layanan bisnis. | App. Arch. | Cost, Adaptability, Modificability |
| Coupling Between Object (CBO) | Average Coupling Between | Rata-rata jumlah layanan SI yang terhubung dengan aplikasi lain. | App. Arch. | Modificability, Adaptability |
| Response For Class (RFC) | Average Response For Service | Rata-rata jumlah aplikasi yang digunakan saat layanan menerima permintaan. | App. Arch. | Testability, Modificability, Security |
| Medium Time Between Failures | Service Weight MTBF | Rata-rata waktu antar kegagalan beruntun berdasarkan bobot pentingnya layanan. | App. & Tech. | Reliability, Availability |

## Penerapan Metrik untuk Evaluasi ISA

- **Metrik Keterikatan (Average Coupling Between):** mengukur berapa banyak dependensi antar blok aplikasi («IS Blocks»). Semakin tinggi coupling ➔ semakin rendah modifiabilitas & adaptabilitas arsitektur.
- **Metrik Kohesi (Average Lack of Cohesion):** memeriksa apakah sebuah aplikasi mengelola entitas informasi yang saling tidak berhubungan. Nilai LCOM tinggi ➔ aplikasi perlu dipecah jadi dua atau lebih blok aplikasi.
- **Metrik Kompleksitas (Service Cyclomatic Complexity):** menghitung jumlah jalur logika yang dibutuhkan untuk menjalankan layanan bisnis. Mengidentifikasi layanan berisiko tinggi terhadap biaya & kesalahan.
- **Metrik Keandalan (Service Weight MTBF):** menghitung rata-rata waktu antar kegagalan berturut-turut dengan mempertimbangkan bobot pentingnya layanan bisnis terhadap operasi perusahaan.

> [!WARN]
> Coupling & Cohesion sering ketuker. Ingat: **Coupling tinggi = JELEK** (blok saling ketergantungan → susah diubah). **LCOM/Lack of Cohesion tinggi = JELEK juga** (isinya gak nyambung → perlu dipecah). Yang ideal: coupling rendah, kohesi internal kuat (LCOM rendah).

### Contoh Ilustrasi Evaluasi Arsitektur SI

Kasus: **Evaluasi Blok Aplikasi Penjualan & Persediaan**
- **Kondisi awal:** satu Blok Aplikasi mengelola data Pelanggan, Faktur, Stok Gudang, dan Penggajian Karyawan sekaligus.
- **Hasil ukur LCOM:** tinggi, karena entitas Penggajian dan Stok Gudang adalah himpunan entitas terpisah (*disjoint sets*).
- **Rekomendasi:** aplikasi dipecah jadi 2 Blok Aplikasi terpisah (Blok Penjualan/Stok & Blok Keuangan/SDM) untuk meningkatkan Modifiability.
- **Hasil ukur Coupling:** Average Coupling diukur untuk memastikan antarmuka layanan («IS Services») antar blok terdefinisi dengan bersih.

## Ringkasan & Kesimpulan BAB 4

- **Konsep Arsitektur SI:** sarana metodologis untuk mengelola kompleksitas sistem terintegrasi & menyelaraskan TI dengan strategi bisnis.
- **Tujuan Arsitektur:** mengatasi pemahaman parsial (analogi gajah) & mencegah integrasi komponen yang tidak tepat (analogi bangunan Escher).
- **Ikhtisar Arsitektur:** membedakan 3 tingkatan: EA, ISA, dan SWA.
- **3 Sub-Arsitektur ISA:** Informational/Data, Application, dan Technological Architecture.
- **Kerangka CEO:** profil meta-model UML yang menghubungkan «Goal», «Process», «Resource», dan «Block».
- **Evaluasi & Metrik ISA:** metrik ISA diadaptasi dari metrik perangkat lunak (LOC, LCOM, CBO, RFC, MTBF) untuk mengukur kualitas Cost, Modificability, Adaptability, & Reliability.

> [!TIP]
> Pertanyaan reflektif akhir dari dosen: *"Bagaimana arsitektur sistem informasi yang terstruktur dan terukur dapat menjadi keunggulan kompetitif utama bagi perusahaan enterprise?"* Jawaban bisa pakai rantai: arsitektur selaras dengan bisnis ➔ sistem modular & mudah diubah ➔ cepat adaptasi perubahan pasar ➔ keunggulan kompetitif.

```quiz
Q: Tiga tingkatan hirarki arsitektur organisasi menurut BAB 4 adalah...
+ Enterprise Architecture (EA), Information System Architecture (ISA), dan Software Architecture (SWA)
- Data Architecture, Network Architecture, dan Security Architecture
- Goal, Process, dan Resource
- Waterfall, Agile, dan Spiral
> Slide membedakan 3 tingkatan: EA (perspektif perusahaan), ISA (perspektif SI), dan SWA (perspektif perangkat lunak).

Q: Yang menjembatani arsitektur perusahaan dan arsitektur perangkat lunak adalah...
+ Information System Architecture (ISA)
- Software Architecture (SWA)
- Enterprise Architecture (EA)
- Technological Architecture
> Slide menyebut ISA "menjembatani arsitektur perusahaan dan arsitektur perangkat lunak".

Q: Analogi "Orang Buta dan Gajah" di BAB 4 menggambarkan...
+ Risiko pemahaman parsial — tanpa arsitektur, tiap pemangku kepentingan hanya memahami sebagian sistem
- Bahwa proyek TI selalu butuh gajah sebagai maskot
- Bahwa aplikasi harus dibangun satu per satu
- Bahwa arsitektur hanya untuk perusahaan besar
> Slide: analogi ini (Prof. T.J. Williams, Purdue University) menggambarkan kebutuhan analisis multiperspektif (Gambar 4.1).

Q: Analogi "Bangunan Mustahil (Escher)" di BAB 4 menggambarkan...
+ Aplikasi canggih individual (CAD, CAM, PDM, ERP) tidak otomatis membentuk sistem terpadu tanpa perancangan arsitektur yang tepat
- Bahwa bangunan data center harus unik
- Bahwa ERP tidak bisa diintegrasikan dengan sistem lain
- Bahwa arsitektur itu tidak penting untuk sistem kecil
> Slide: analogi bangunan Escher (Gambar 4.2) menekankan butuhnya panduan metodologis agar komponen terintegrasi logis & terkoordinasi.

Q: Menurut Spewak & Hill (1992), tiga sub-arsitektur dalam ISA adalah...
+ Informational Architecture (Data), Application Architecture, dan Technological Architecture
- EA, ISA, dan SWA
- Goal, Process, Block
- Input, Process, Output
> Slide menyebut 3 sub-arsitektur ISA: Informational/Data, Application, dan Technological Architecture.

Q: Elemen «Block» dalam kerangka CEO Framework diartikan sebagai...
+ Blok Sistem Informasi yang mendukung («supports») proses bisnis dan mengirim/menerima data dengan sumber daya
- Tujuan strategis bisnis yang ingin dicapai
- Sumber daya bisnis yang digunakan proses
- Proses bisnis yang mengontrol sumber daya
> Kerangka CEO: «Goal» = tujuan, «Process» = proses bisnis, «Resource» = sumber daya, «Block» = blok sistem informasi.

Q: Mengapa metrik SA (software architecture) tidak bisa langsung dipakai untuk mengevaluasi ISA?
+ Karena metrik SA berhubungan dengan rincian perangkat lunak (kelas/objek) yang tidak memiliki arti langsung dalam konteks ISA, sehingga harus dipetakan ke level komponen enterprise
- Karena metrik SA hanya untuk bahasa pemrograman Java
- Karena ISA tidak butuh pengukuran sama sekali
- Karena metrik SA rahasia perusahaan
> Slide: metrik SA murni tidak bisa langsung diterapkan pada ISA; solusinya memetakannya ke IS Blocks, IS Services, dan Entitas Informasi.

Q: Metrik ISA "Number of Applications" (adaptasi dari Lines of Code) mengukur... dan berdampak pada kualitas...
+ Jumlah aplikasi dalam suatu arsitektur ISA — kualitas Cost & Time-to-market (App. Arch.)
- Jumlah entitas informasi — kualitas Modificability
- Jumlah jalur layanan bisnis — kualitas Security
- Waktu antar kegagalan — kualitas Reliability
> Tabel 4.1: LOC ➔ Number of Applications (jumlah aplikasi), sub-arsitektur App. Arch., kualitas Cost & Time-to-market.

Q: Nilai "Average Lack of Cohesion" yang tinggi pada sebuah blok aplikasi menunjukkan...
+ Aplikasi mengelola entitas informasi yang tidak saling berhubungan (disjoint sets) sehingga sebaiknya dipecah jadi 2 blok atau lebih
- Aplikasi sudah sangat kohesif dan optimal
- Aplikasi tidak boleh diubah sama sekali
- Aplikasi kehilangan koneksi ke database
> Slide: LCOM tinggi = himpunan entitas tidak terhubung; contohnya Penggajian & Stok Gudang dalam satu blok perlu dipecah.

Q: Semakin TINGGI tingkat coupling (Average Coupling Between) antar blok aplikasi, maka...
+ Semakin RENDAH modifiabilitas & adaptabilitas arsitektur
- Semakin tinggi keamanan sistem
- Semakin cepat waktu antar kegagalan
- Tidak ada pengaruh apa pun
> Slide: coupling tinggi = dependensi banyak antar blok → modifiabilitas & adaptabilitas turun.

Q: Metrik "Service Weight MTBF" mengukur apa dan kualitas apa yang dipetakan padanya?
+ Rata-rata waktu antar kegagalan beruntun berdasarkan bobot pentingnya layanan — reliability & availability (App. & Tech.)
- Jumlah aplikasi dalam arsitektur — cost
- Rata-rata operasi per blok — adaptability
- Jumlah entitas informasi — modificability
> Tabel 4.1: Medium Time Between Failures ➔ Service Weight MTBF, sub-arsitektur App. & Tech., kualitas Reliability & Availability.

Q: Peran arsitektur "Robust & IT-Independent" dalam enterprise berarti...
+ Sistem informasi yang dibangun kokoh serta tidak tergantung secara kaku pada satu vendor teknologi tertentu
- Sistem hanya bisa jalan di satu merek server
- Sistem menolak semua pembaruan teknologi
- Sistem tidak punya backup data
> Slide: arsitektur harus memastikan sistem kokoh & tidak kaku bergantung pada satu vendor.
```
