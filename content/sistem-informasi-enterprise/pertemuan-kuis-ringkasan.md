# Ringkasan Kuis SIE (TIF 24 CNS E)

Rangkuman soal + pembahasan dari kuis dosen Dede Sulaeman, file `kuis/kuis-sie-tif24cns-e.docx`. Ini bukan salinan soal mentah — tiap poin dijelaskan ulang biar bisa dipakai belajar. Kuisnya berisi **7 pokok bahasan** (essay-style), jadi di bawah tiap pokok ada "inti jawaban" + pembahasan, lalu ditutup blok quiz recall buat ngetes sendiri.

> [!NOTE]
> Kuis ini bukan pilihan ganda, tapi wawancara/esay — tiap nomor minta kamu **njelasin**. Jadi cara belajarnya: pahami struktur jawabannya (definisi ➔ rincian ➔ contoh), jangan hafal mentah.

## 1. Fungsi dan Keterkaitan Modul ERP: CRM dan HCM

**Inti jawaban:**
- **ERP** = sistem terintegrasi yang menghubungkan berbagai fungsi bisnis dalam satu sistem terpusat untuk efisiensi operasional, konsistensi data, dan koordinasi antarbagian.
- **CRM (Customer Relationship Management):** mengelola seluruh siklus hubungan & interaksi perusahaan dengan pelanggan — mulai pengelolaan prospek (leads), otomatisasi aktivitas penjualan (*sales force automation*), pengelolaan layanan pelanggan, penanganan keluhan, sampai analisis perilaku & kebutuhan konsumen. Tujuannya: kepuasan, loyalitas, dan hubungan jangka panjang.
- **HCM (Human Capital Management):** mengelola seluruh siklus SDM — rekrutmen, data kepegawaian, penggajian (payroll), manajemen kinerja, administrasi kehadiran, sampai pelatihan & pengembangan kompetensi karyawan.
- **Keterkaitan dua arah:**
  - **CRM ➔ HCM:** data aktivitas & pencapaian penjualan di CRM (mis. pencapaian target tenaga penjualan) dipakai HCM sebagai bahan evaluasi kinerja & dasar perhitungan bonus, insentif, komisi.
  - **HCM ➔ CRM:** data karyawan, kompetensi, struktur organisasi, & pembagian tugas dari HCM mendukung CRM menentukan penugasan tenaga penjualan yang sesuai serta mengatur alur persetujuan (approval) berdasarkan hierarki organisasi.

**Pembahasan:** Kuncinya di **dua arah**. CRM nyimpen "penjualan siapa berhasil", HCM yang ngitung "jadi berapa bonusnya". Sebaliknya HCM yang tahu "siapa karyawan kompeten di wilayah mana", CRM yang pakai buat nugas. Integrasi keduanya bikin pelayanan pelanggan lebih efektif.

## 2. Komponen Utama BPMN dan Indikator Kualitas Sistem Informasi

**Inti jawaban:**
- **BPMN (Business Process Model and Notation)** = standar notasi grafis untuk menggambarkan, menganalisis, dan mendokumentasikan alur proses bisnis supaya mudah dipahami pihak teknis maupun nonteknis.
- **Flow Objects (objek aliran)** — elemen utama yang menggambarkan perilaku & alur proses, terdiri dari 3 jenis:
  - **Events (kejadian):** peristiwa selama proses berlangsung — Start Event (awal), Intermediate Event (tengah), End Event (akhir).
  - **Activities (aktivitas):** pekerjaan/kegiatan oleh manusia atau sistem — Task dan Sub-process.
  - **Gateways (gerbang keputusan):** mengatur percabangan/penggabungan alur berdasar kondisi — Exclusive Gateway, Inclusive Gateway, Parallel Gateway.
- **Connecting Objects (objek penghubung)** — menghubungkan elemen untuk menunjukkan urutan & pertukaran informasi:
  - **Sequence Flow:** urutan pelaksanaan aktivitas — garis penuh berpanah.
  - **Message Flow:** pertukaran pesan antarpartisipan berbeda (antar-pool/organisasi) — garis putus-putus berpanah.
  - **Association:** menghubungkan elemen tambahan (Data Object, Text Annotation, Artifact) ke elemen BPMN lain.
- **3 indikator kualitas sistem informasi:**
  - **Aksesibilitas:** kemampuan sistem menyediakan akses data & proses bisnis mudah, cepat, dan aman bagi pengguna sesuai hak akses peran & tanggung jawabnya.
  - **Transparansi:** kondisi ketika alur kerja, status pemrosesan informasi, & pembagian tanggung jawab bisa diketahui & dipantau pihak berkepentingan → tingkatkan akuntabilitas, permudah pengawasan, identifikasi bottleneck.
  - **Ketepatan Waktu (Timeliness):** kemampuan sistem menyediakan informasi akurat & relevan pada waktu dibutuhkan → respons perubahan, selesaikan operasional, ambil keputusan lebih cepat.

**Pembahasan:** BPMN = bahasa visual proses. Ingat pola garisnya: **sequence = penuh (urutan dalam satu alur), message = putus-putus (antar-pool/organisasi), association = penghubung artifact**. Untuk indikator kualitas, kaitkan: aksesibilitas = *bisa diakses siapa yang berhak*, transparansi = *bisa dipantau alurnya*, timeliness = *sampai tepat waktu*.

## 3. Tantangan Implementasi Sistem Informasi Korporat dalam Persaingan Global

**Inti jawaban — 6 tantangan:**
1. **Kompleksitas integrasi data & sistem warisan (legacy systems):** beda sistem per departemen/cabang; menyatukan sistem lama dengan teknologi baru + format data beragam butuh proses teknis kompleks, waktu, dan biaya besar.
2. **Resistensi perubahan & budaya organisasi (change management):** karyawan sulit adaptasi ke teknologi/prosedur baru; penolakan, kurang pemahaman, keterbatasan kemampuan menghambat implementasi.
3. **Kepatuhan regulasi & perbedaan antarnegara (compliance & multi-country):** sesuaikan sistem dengan peraturan tiap negara — perbedaan perpajakan, mata uang, bahasa, standar akuntansi, dan regulasi perlindungan data pribadi seperti **GDPR di Uni Eropa**.
4. **Biaya implementasi & risiko keterlambatan:** investasi besar (software, infrastruktur, konsultasi, pemeliharaan, pelatihan); kurang perencanaan → *over-budget* dan *over-time*.
5. **Keamanan siber & privasi data (cybersecurity & data privacy):** sistem terintegrasi jadi target serangan (pencurian data, ransomware, akses tak sah); butuh pengamanan, hak akses, enkripsi, kebijakan perlindungan data.
6. **Keterbatasan infrastruktur & sumber daya ahli:** perbedaan kualitas infrastruktur antarnegara & keterbatasan tenaga ahli TI menghambat implementasi, pemeliharaan, & pengembangan berkelanjutan.

**Pembahasan:** 6 ini bisa dihafal pakai akronim: **L-R-G-B-K-I** (Legacy, Resistensi, Geopolitik/regulasi, Biaya, Keamanan, Infrastruktur). Pola kategorinya: *teknis* (legacy, keamanan, infrastruktur) + *manusia* (resistensi, SDM ahli) + *bisnis/eksternal* (biaya, regulasi).

## 4. Prinsip Utama Business Process Integration (BPI)

**Inti jawaban:**
- **BPI** = pendekatan menghubungkan berbagai proses bisnis & fungsi organisasi agar bekerja terkoordinasi, saling bertukar informasi, dan mendukung pencapaian tujuan perusahaan menyeluruh.
- **A. Granularitas Aliran Informasi** — tingkat kedetailan/rincian informasi yang dipertukarkan antarproses. Perusahaan harus menentukan tingkat granularitas sesuai kebutuhan (data transaksi terperinci ATAU informasi rangkuman). *Contoh: bagian penjualan kirim data tiap transaksi ke bagian persediaan untuk update stok; bagian manajemen pakai laporan total penjualan harian.*
- **B. Kepemilikan Lintas Fungsi (Cross-Functional Ownership)** — suatu proses bisnis bukan tanggung jawab satu departemen, tapi dikelola terkoordinasi oleh berbagai fungsi. Setiap departemen punya tanggung jawab sesuai tugasnya dalam menjaga kualitas informasi & keberhasilan proses *end-to-end*. *Contoh: pemenuhan pesanan pelanggan melibatkan penjualan, persediaan, pergudangan, pengiriman, dan keuangan.*
- **C. Standarisasi dan Penghapusan Redundansi** — menyelaraskan format data, definisi informasi, prosedur, dan aturan kerja di seluruh organisasi agar konsisten, sekaligus menghilangkan redundansi data & aktivitas tak perlu. *Contoh: data pelanggan cukup dimasukkan satu kali, dipakai banyak departemen yang berhak → kurangi duplikasi & risiko ketidaksesuaian.*

**Pembahasan:** 3 prinsip BPI = **Granularitas** (seberapa detail infonya), **Cross-functional ownership** (siapa yang pegang prosesnya — bukan satu divisi), **Standarisasi + hapus redundansi** (biar seragam & gak dobel). Ini nyambung ke BAB 1 (fragmentasi vs integrasi).

## 5. Fungsi dan Keterkaitan Modul ERP: Financial dan SCM

**Inti jawaban:**
- **Modul Financial (Keuangan):** mengelola seluruh pencatatan & pengelolaan keuangan — Buku Besar (General Ledger), utang (Accounts Payable), piutang (Accounts Receivable), aset tetap (Fixed Assets), penganggaran (Budgeting), dan penyusunan laporan keuangan. Membantu memantau kondisi keuangan & mengendalikan penggunaan sumber daya.
- **Modul SCM (Supply Chain Management):** mengelola aliran barang, informasi, dan aktivitas rantai pasok dari pemasok sampai pelanggan akhir — procurement (pengadaan), perencanaan kebutuhan bahan baku, inventory management, warehouse management, produksi, serta logistik & distribusi.
- **Keterkaitan dua arah:**
  - **SCM ➔ Financial:** tiap aktivitas rantai pasok menghasilkan transaksi keuangan yang tercatat otomatis di Financial. *Contoh: penerimaan bahan baku dari pemasok → nilai persediaan & pencatatan utang usaha; pengiriman produk ke pelanggan → pencatatan pendapatan & Harga Pokok Penjualan (HPP/COGS) sesuai kebijakan pengakuan akuntansi.*
  - **Financial ➔ SCM:** Financial menyediakan informasi anggaran, kondisi keuangan, batas kredit pelanggan, dan kewajiban pembayaran ke pemasok → dipakai SCM merencanakan pengadaan & mengendalikan rantai pasok sesuai kemampuan & kebijakan keuangan.

**Pembahasan:** SCM = **pergerakan barang fisik**, Financial = **pencatatan uangnya**. Otomatisnya: barang masuk → utang tercatat; barang keluar → pendapatan & HPP tercatat. Kebalikannya: budget & batas kredit dari Financial membatasi seberapa agresif SCM boleh beli. Intinya: **aktivitas fisik harus selaras dengan pencatatan keuangan**.

## 6. Prinsip Dasar Enterprise System

**Inti jawaban — 5 prinsip:**
1. **Sumber Data Tunggal (Single Source of Truth):** sumber data terintegrasi & konsisten sebagai acuan seluruh departemen → kurangi perbedaan informasi antarbagian, pastikan standar & definisi data sama.
2. **Integrasi Proses Bisnis (End-to-End Integration):** hubungkan fungsi keuangan, penjualan, SDM, produksi, persediaan jadi satu rangkaian proses yang saling terkoordinasi → aktivitas satu departemen terhubung ke lainnya tanpa terhambat batasan fungsi.
3. **Integrasi & Pembaruan Informasi Secara Real-Time:** informasi yang dimasukkan satu bagian diperbarui & tersedia bagi modul lain langsung (atau sesuai mekanisme integrasi) → kurangi keterlambatan pertukaran info & dukung pengambilan keputusan.
4. **Modularitas Sistem (Modularity):** terdiri dari modul dengan fungsi & tanggung jawab berbeda tapi saling terhubung (keuangan, SDM, penjualan, persediaan) → kelola tiap fungsi lebih terstruktur.
5. **Standarisasi Proses dan Praktik Terbaik (Best Practices):** terapkan standar data, prosedur, & praktik bisnis konsisten di seluruh unit → tingkatkan efisiensi, kurangi kesalahan operasional, permudah pengawasan.

**Pembahasan:** 5 prinsip ini logikanya berurutan: **(1) datanya satu sumber ➔ (2) prosesnya nyambung ujung-ke-ujung ➔ (3) datanya real-time ➔ (4) sistemnya modular ➔ (5) caranya standar/best practice**. Poin 1 dan 5 paling sering disalahartikan — 1 soal *data*, 5 soal *cara kerja*.

## 7. Peran Corporate Information System dalam Persaingan Global

**Inti jawaban — 4 peran:**
1. **Mendukung pengambilan keputusan strategis berbasis data (data-driven decision making):** menyediakan informasi, laporan analitis, dan dashboard Business Intelligence (BI) untuk memahami kondisi perusahaan, menganalisis tren pasar, mengidentifikasi peluang, dan memutuskan lebih cepat & tepat.
2. **Meningkatkan efisiensi operasional & skalabilitas bisnis:** mengintegrasikan & mengotomatiskan aktivitas (keuangan, persediaan, produksi, distribusi) → kurangi pekerjaan manual, minimalkan kesalahan, tekan biaya operasional, dan mudahkan ekspansi ke pasar internasional.
3. **Memfasilitasi kolaborasi & koordinasi lintas wilayah:** menghubungkan departemen, kantor cabang, & mitra bisnis di lokasi geografis berbeda lewat pertukaran informasi & koordinasi terintegrasi → aktivitas tetap konsisten meski beda negara.
4. **Meningkatkan keunggulan kompetitif & responsivitas bisnis:** merespons perubahan kebutuhan pelanggan, perkembangan teknologi, dan dinamika persaingan; mendukung identifikasi peluang & inovasi agar tetap bersaing di pasar global.

**Pembahasan:** 4 peran ini urutan skalanya: dari **dalam** (keputusan/BI) ➔ **operasional** (efisiensi & skalabilitas) ➔ **antarwilayah** (kolaborasi lintas negara) ➔ **pasar** (keunggulan kompetitif). Ini jawaban buat CLO #6 dan #10 di materi-extra.

> [!TIP]
> Strategi belajar kuis: hafalin **struktur** tiap jawaban = *definisi ➔ 4–6 poin rincian ➔ contoh konkret*. Dosen lebih nilai kamu paham alurnya daripada ngulang kalimat. Nomor 1 & 5 (modul ERP dua arah) dan nomor 6 (prinsip dasar) paling mungkin muncul ulang karena nyambung ke CLO modul ERP.

```quiz
Q: Pasangan keterkaitan yang tepat antara CRM dan HCM adalah...
+ Data pencapaian penjualan dari CRM dipakai HCM untuk evaluasi kinerja & bonus; data karyawan/kompetensi dari HCM dipakai CRM untuk penugasan & approval
- CRM hanya menghitung gaji, HCM hanya mengelola faktur
- CRM dan HCM tidak saling terhubung sama sekali
- HCM mengirim data pelanggan ke CRM
> Keterkaitannya dua arah: CRM ➔ HCM (basis hitung insentif) dan HCM ➔ CRM (basis penugasan & alur approval sesuai hierarki).

Q: Dalam BPMN, garis putus-putus berpanah menunjukkan...
+ Message Flow (pertukaran pesan antarpartisipan/pool yang berbeda)
- Sequence Flow (urutan aktivitas)
- Association (penghubung artifact)
- Gateway (percabangan)
> Sequence flow = garis penuh; message flow = garis putus-putus (antar-pool/organisasi); association = penghubung data object/annotation.

Q: Gateway dalam BPMN berfungsi untuk...
+ Mengatur percabangan maupun penggabungan alur proses berdasarkan kondisi tertentu
- Menyimpan data proses
- Menggambarkan akhir proses
- Mewakili sumber daya manusia
> Flow objects BPMN ada 3: Events, Activities, dan Gateways (percabangan/penggabungan seperti Exclusive, Inclusive, Parallel).

Q: Indikator kualitas sistem informasi yang berarti informasi akurat & relevan tersedia pada waktu dibutuhkan adalah...
+ Ketepatan Waktu (Timeliness)
- Aksesibilitas
- Transparansi
- Redundansi
> Timeliness = informasi sampai tepat waktu agar keputusan bisa diambil cepat; aksesibilitas = bisa diakses yang berhak; transparansi = alur bisa dipantau.

Q: Kecenderungan karyawan menolak teknologi atau prosedur kerja baru saat implementasi SI korporat termasuk tantangan bernama...
+ Resistensi perubahan dan budaya organisasi (change management)
- Kompleksitas integrasi data legacy
- Kepatuhan regulasi antarnegara
- Keamanan siber
> Ini tantangan #2 (change management): penolakan, kurang pemahaman, dan keterbatasan kemampuan penggunaan teknologi.

Q: Perbedaan sistem perpajakan, mata uang, bahasa, standar akuntansi, serta regulasi seperti GDPR Uni Eropa termasuk tantangan...
+ Kepatuhan regulasi & perbedaan antarnegara (compliance & multi-country challenges)
- Biaya implementasi & risiko keterlambatan
- Keterbatasan infrastruktur & sumber daya ahli
- Resistensi perubahan budaya organisasi
> Tantangan #3: perusahaan global harus menyesuaikan sistem dengan peraturan tiap negara, termasuk GDPR.

Q: Prinsip BPI yang mengatur seberapa detail/rincian informasi yang dipertukarkan antarproses disebut...
+ Granularitas Aliran Informasi
- Kepemilikan Lintas Fungsi
- Standarisasi dan Penghapusan Redundansi
- Real-Time Integration
> Granularitas = tingkat kedetailan informasi (transaksi detail vs laporan rangkuman) sesuai kebutuhan tiap bagian.

Q: Contoh "data pelanggan cukup dimasukkan satu kali lalu dipakai banyak departemen" mengilustrasikan prinsip BPI...
+ Standarisasi dan Penghapusan Redundansi
- Granularitas Aliran Informasi
- Kepemilikan Lintas Fungsi
- Otomasi Proses Bisnis
> Prinsip C: menyelaraskan format/definisi & menghilangkan duplikasi pencatatan agar risiko ketidaksesuaian informasi berkurang.

Q: Keterkaitan SCM ➔ Financial yang tepat adalah...
+ Aktivitas rantai pasok menghasilkan transaksi keuangan yang tercatat otomatis di modul Financial (mis. penerimaan bahan baku → utang usaha, pengiriman → pendapatan & HPP)
- Financial mengirim bahan baku ke pemasok
- SCM menangani penggajian karyawan
- Financial tidak memiliki hubungan dengan SCM
> Contoh slide: penerimaan bahan baku memengaruhi persediaan & utang usaha; pengiriman produk memengaruhi pendapatan & HPP/COGS.

Q: Financial ➔ SCM memberi informasi berupa...
+ Anggaran, kondisi keuangan, batas kredit pelanggan, dan kewajiban pembayaran ke pemasok untuk merencanakan pengadaan
- Data penjualan harian per produk
- Jadwal produksi pabrik
- Kompetensi karyawan
> Modul Financial menyediakan batas & kebijakan keuangan yang dipakai SCM merencanakan pengadaan.

Q: Manakah yang BUKAN prinsip dasar Enterprise System?
+ Kemandirian data tiap departemen (setiap divisi menyimpan datanya sendiri)
- Sumber Data Tunggal (Single Source of Truth)
- Integrasi Proses Bisnis (End-to-End Integration)
- Standarisasi Proses dan Praktik Terbaik
> Justru sebaliknya: prinsipnya adalah data terpadu & proses nyambung; menyimpan data sendiri-sendiri itu fragmentasi.

Q: Urutan 5 prinsip dasar Enterprise System yang logis adalah...
+ Single Source of Truth ➔ End-to-End Integration ➔ Real-Time ➔ Modularity ➔ Best Practices
- Modularity ➔ Real-Time ➔ Single Source of Truth ➔ Best Practices ➔ End-to-End
- Best Practices ➔ Modularity ➔ End-to-End ➔ Real-Time ➔ Single Source of Truth
- Real-Time ➔ Best Practices ➔ Modularity ➔ Single Source of Truth ➔ End-to-End
> Prinsipnya: satu sumber data, proses nyambung, pembaruan real-time, sistem modular, cara kerja berstandar.

Q: Peran Corporate Information System yang menyediakan dashboard Business Intelligence untuk menganalisis tren pasar & mengambil keputusan adalah...
+ Mendukung pengambilan keputusan strategis berbasis data (data-driven decision making)
- Meningkatkan efisiensi operasional & skalabilitas
- Memfasilitasi kolaborasi lintas wilayah
- Meningkatkan keunggulan kompetitif & responsivitas
> Peran #1 berfokus pada informasi, laporan analitis, dan dashboard BI untuk keputusan cepat & tepat.
```