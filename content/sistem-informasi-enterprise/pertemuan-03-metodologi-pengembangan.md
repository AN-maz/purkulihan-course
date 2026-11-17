# Bab 3 — Metodologi Pengembangan Enterprise Information System

Catatan ini ditulis ulang dari slide dosen Dede Sulaeman, file `materi/bab-03-metodologi-pengembangan.pptx` (Sistem Informasi Enterprise, TIF RP 24 CNS E). Referensi tahun di slide (Sommerville, Choi, Dumas, dst.) aku pertahankan apa adanya sesuai slide.

> [!NOTE]
> Inti BAB 3: **gimana cara membangun EIS yang bener**, dan kenapa metodologi lama (berbasis fungsi/tugas) udah gak cukup — harus pindah ke **pendekatan berbasis proses**.

## Pendahuluan: Pentingnya Metodologi Pengembangan EIS

- **Pengembangan khusus bisnis:** EIS dibangun khusus untuk kepentingan bisnis organisasi; keberhasilannya bergantung pada metodologi yang tepat (Aveson & Fitzgerald, 2006).
- **Tahapan terstruktur:** metodologi mencakup analisis kebutuhan ➔ perancangan ➔ pengembangan ➔ uji coba ➔ implementasi (Rather & Bhatnagar, 2015).
- **Pertimbangan pemilihan metodologi:** ukuran & kompleksitas proyek, sumber daya yang tersedia, serta kebutuhan dan tujuan bisnis (Rather & Bhatnagar, 2015).
- **Tantangan lingkungan bisnis dinamis:** persaingan global, tekanan biaya, dan siklus hidup produk pendek menuntut perubahan dari organisasi fungsional menjadi organisasi berpusat pada proses (Han et al., 2009).

Hubungan proses pengembangan EIS:

```
Analisis Kebutuhan ➔ Perancangan Sistem ➔ Pengembangan ➔ Uji Coba ➔ Implementasi & Operasi
```

## Apa Itu Metodologi Pengembangan Perangkat Lunak?

- **Definisi metodologi EIS:** serangkaian proses dan pendekatan untuk merancang, mengembangkan, mengimplementasikan, dan mengelola sistem informasi dalam organisasi (Sommerville, 2005).
- **Pendekatan sistematis:** menyediakan proses, notasi, dan alat (tools) untuk pengembangan perangkat lunak secara konsisten dan terintegrasi.
- **Pergeseran paradigma:** dari pendekatan tradisional berbasis fungsi (menghasilkan redundansi data) ➔ pendekatan berbasis proses (integrasi alur kerja & kepuasan pelanggan).

Proses pengembangan konvensional (Gambar 3.1), menurut Choi (2014):

```
(1) Analisis Sistem ➔ (2) Desain Sistem ➔ (3) Implementasi dan Pengoperasian Sistem
```

## Peran Metodologi dalam Pengembangan EIS

- **Transformasi ke organisasi berpusat proses:** EIS harus diubah dari sistem *task-centered* menjadi *process-centered* (Dumas et al., 2018).
- **Mengatasi krisis perangkat lunak:** metodologi terintegrasi mengatasi krisis akibat kompleksitas struktur serta kenaikan biaya pengembangan dan operasional.
- **Otomatisasi alur kerja:** mengintegrasikan alur kerja di luar sekadar transaksi rutin untuk mendukung manajemen proses bisnis (BPM) menyeluruh.

Alur peran metodologi terstruktur dalam EIS:

```
Metodologi Pengembangan Tepat ➔ Proses Pengembangan Terstruktur ➔ Pengelolaan Aktivitas & Alur Kerja Terintegrasi ➔ Sistem EIS Berorientasi Proses & Efisien
```

## Metodologi Pengembangan Perangkat Lunak Populer (8)

| # | Metodologi | Label | Penjelasan & Sumber |
|---|---|---|---|
| 1 | Waterfall | Umum & Tertua | Pendekatan linear bertahap: analisis kebutuhan ➔ perancangan ➔ pengkodean ➔ pengujian ➔ implementasi (Sommerville, 2005). |
| 2 | DevOps | Dev + Ops | Kombinasi Development & Operations; menekankan otomatisasi, kolaborasi tim, dan feedback rilis cepat (Aveson & Fitzgerald, 2006). |
| 3 | Rapid Application Dev (RAD) | Pengembangan Cepat | Waktu pengembangan cepat dan prototipe iteratif untuk merancang & menguji aplikasi (Sommerville, 2011). |
| 4 | Prototyping | Umpan Balik Pengguna | Membuat prototipe secepat mungkin untuk mengumpulkan umpan balik & meminimalkan risiko gagal (Sommerville, 2005). |
| 5 | Spiral | Manajemen Risiko | Evaluasi risiko dalam 4 tahapan iteratif: perencanaan, analisis risiko, pembangunan, evaluasi (Sommerville, 2005). |
| 6 | Lean | Eliminasi Limbah (Waste) | Prinsip lean manufacturing untuk menghapus limbah proses, mempercepat rilis, menekan biaya (Rather & Bhatnagar, 2015). |
| 7 | Incremental | Bertahap / Parsial | Memecah proyek jadi bagian yang dikembangkan & diuji bertahap sebelum tahap lanjut (Sommerville, 2011). |
| 8 | Agile | Sprint & Kolaborasi | Fleksibilitas & kolaborasi dalam periode waktu (sprint), dengan interaksi terus-menerus dengan klien (Sommerville, 2011). |

> [!TIP]
> Biar gak ketuker: **Waterfall** = linear/urut. **Incremental** = bertahap per bagian. **Agile** = sprint + kolaborasi klien. **Spiral** = risiko. **Lean** = buang limbah/waste. **RAD** = cepat + prototipe. **Prototyping** = umpan balik pengguna. **DevOps** = dev + ops + rilis cepat.

## Keterbatasan Metodologi Pengembangan PL (BAB 3.2.1)

Keterbatasan utama metodologi konvensional:

- **Mengabaikan analisis proses bisnis:** pengembangan berorientasi objek sering mengabaikan analisis proses bisnis atau hanya menanganinya sedikit di fase desain sistem (Fase-2).
- **Terpisahnya pemodelan proses & sistem:** tugas pemodelan proses bisnis (oleh analis bisnis) dan pemodelan sistem perangkat lunak dilakukan terpisah dalam praktik biasa.
- **Keterbatasan UML:** UML kaya semantik & notasi grafis, tapi UML hanya alat pemodelan dan **TIDAK mendefinisikan proses pengembangan**.
- **Kesulitan penerapan Unified Process (UP):** meski UP berpusat pada use-case & berarsitektur evolusioner, ada kesulitan substansial menerapkannya di proyek nyata.
- **Ketidakadaan metode pemodelan umum:** tidak ada metode pemodelan yang dipahami seimbang oleh pengembang dan end-user.

### Dampak Keterbatasan Metodologi Konvensional

| Level | Isi |
|---|---|
| Keterbatasan Metodologi (Akar Permasalahan) | Metodologi tradisional berorientasi fungsi/tugas terisolasi; setiap fungsi mengelola datanya sendiri-sendiri; pemodelan bisnis & perangkat lunak terpisah. |
| Permasalahan Pengembangan (Kendala Operasional) | Redundansi data (data satu objek disimpan di banyak tempat); informasi tidak konsisten antar divisi; sulit mentransfer hasil pemodelan proses ke sistem. |
| Risiko terhadap EIS Enterprise (Dampak Organisasi) | Sistem gagal mendukung organisasi berpusat pada proses; krisis perangkat lunak & pembengkakan biaya; sistem tidak mampu merespons perubahan pasar cepat. |

> [!WARN]
> Pola sebab-akibat ini bagus buat essay: **berorientasi fungsi ➔ data sendiri-sendiri ➔ redundansi & inkonsistensi ➔ gagal mendukung organisasi proses + biaya membengkak.** Ujungnya adalah alasan kenapa muncul metodologi berbasis proses di sub-bab berikutnya.

## Metodologi PL Berbasis Proses (Process-Driven) — BAB 3.2.2

- **Pengertian:** pendekatan pengembangan di mana **proses bisnis jadi perhatian utama**, dan fungsionalitas alur kerja (workflow) diidentifikasi serta dirancang di seluruh siklus hidup pengembangan (Choi, 2014).
- **Latar belakang solusi:** dirancang untuk mengatasi fakta bahwa hasil pemodelan bisnis sulit ditransfer ke sistem, sekaligus memberi pedoman eksplisit penggunaan diagram UML di tiap fase.
- **Karakteristik utama:**
  - Menempatkan proses bisnis sebagai fokus utama (seperti pendekatan BPM).
  - Mengintegrasikan pemodelan berorientasi objek untuk desain perangkat lunak secara bersamaan.
  - Memperjelas proses pengembangan, alat pemodelan, dan kiriman (deliverables) secara eksplisit.
- **3 elemen kerangka kerja tiap fase:** (1) Proses pengembangan, (2) Alat pemodelan (UML), (3) Penyampaian/Kiriman (model).

## 6 Fase Metodologi Berbasis Proses (Choi, 2014)

Ini bagian paling penting di BAB 3 — tiap fase dipasangkan dengan diagram UML dan kiriman (deliverables) tertentu:

| # | Fase | Fokus | Diagram UML | Kiriman (Deliverables) |
|---|---|---|---|---|
| 1 | Analisis Proses Bisnis | Fokus inti tugas & mekanisme bisnis | Diagram Aktivitas | Model As-Is & To-Be |
| 2 | Analisis Kebutuhan Pengguna | Identifikasi kebutuhan aktor/pengguna | Diagram Use Case + Deskripsi Use Case | Model Fungsional |
| 3 | Desain Struktur | Merancang struktur kelas dasar | Diagram Kelas | Model Struktur |
| 4 | Desain Arsitektur | Merancang arsitektur & fisik sistem | Diagram Kelas + Diagram Penyebaran (Deployment) | Model Arsitektur |
| 5 | Desain Detail | Perilaku dinamis terperinci | Diagram Urutan, Komunikasi, State Program | Model Perilaku & Struktur Detail |
| 6 | Implementasi & Operasi | Pengkodean, pengujian, pengoperasian EIS di lingkungan bisnis nyata | Pengkodean & Lingkungan Sistem | Sistem Perangkat Lunak EIS Siap Pakai |

> [!IMPORTANT]
> Kalau cuma boleh hafal satu tabel di BAB 3, hafalin ini. Pola pasangan fase ➔ UML ➔ deliverable sering muncul di kuis. Fase 1 = Aktivitas (As-Is/To-Be), Fase 2 = Use Case (model fungsional), Fase 3 = Kelas (struktur), Fase 4 = Kelas+Deployment (arsitektur), Fase 5 = Urutan/Komunikasi/State (perilaku), Fase 6 = koding (EIS siap pakai).

### Contoh Ilustrasi Penerapan EIS (Perusahaan Distribusi)

Catatan slide: ini **contoh ilustrasi pembelajaran, bukan studi kasus langsung dari buku**.

- **Tahap 1 — Pemodelan As-Is & To-Be:** analis pakai Diagram Aktivitas UML untuk memetakan proses pemesanan barang saat ini (As-Is) dan merancang proses terintegrasi otomatis (To-Be).
- **Tahap 2 — Pengumpulan Kebutuhan Pengguna:** bikin Use Case Diagram antara Staf Gudang, Manajer Sales, dan Pelanggan.
- **Tahap 3 & 4 — Desain Arsitektur & Struktur:** Diagram Kelas untuk objek pesanan/inventaris + Deployment Diagram untuk server basis data terpusat.
- **Tahap 5 & 6 — Desain Detail & Implementasi:** Diagram Urutan untuk alur pembayaran real-time, lalu implementasi perangkat lunak EIS.

## Poin Penting & Mind Map BAB 3

- **Konsep Metodologi EIS:** pendekatan terstruktur dari analisis hingga implementasi untuk keberhasilan sistem organisasi.
- **Ragam Metodologi PL:** Waterfall, DevOps, RAD, Prototyping, Spiral, Lean, Incremental, Agile — masing-masing punya kelebihan & fokus.
- **Keterbatasan Konvensional:** metodologi tradisional sering mengabaikan analisis proses bisnis & memisahkan pemodelan sistem dari pemodelan bisnis.
- **Pendekatan Berbasis Proses:** menjadikan proses bisnis perhatian utama, memadukan workflow & pemodelan berorientasi objek (UML).
- **Integrasi 6 Fase:** metodologi Choi (2014) menghubungkan fase pengembangan, diagram UML spesifik, dan kiriman model terdefinisi.

```quiz
Q: Metodologi pengembangan EIS menurut Sommerville (2005) adalah...
+ Serangkaian proses dan pendekatan untuk merancang, mengembangkan, mengimplementasikan, dan mengelola sistem informasi dalam organisasi
- Bahasa pemrograman khusus untuk sistem enterprise
- Framework untuk mengelola risiko keuangan perusahaan
- Aplikasi bawaan untuk menghitung persediaan
> Slide memberi definisi Sommerville (2005) itu secara langsung sebagai metodologi EIS.

Q: Metodologi berbasis proses (process-driven) menurut Choi (2014) berarti...
+ Proses bisnis menjadi perhatian utama, dan fungsionalitas alur kerja diidentifikasi serta dirancang di seluruh siklus hidup pengembangan
- Hanya fase pengkodean yang diutamakan
- Proses bisnis dibuang karena menghambat kecepatan
- Pengembangan hanya dilakukan oleh satu programmer
> Slide BAB 3.2.2: metodologi berbasis proses menempatkan proses bisnis sebagai fokus utama di seluruh siklus hidup pengembangan.

Q: Diagram UML yang dipakai pada Fase (1) Analisis Proses Bisnis beserta kiriman As-Is & To-Be adalah...
+ Diagram Aktivitas
- Diagram Use Case
- Diagram Kelas
- Diagram Penyebaran (Deployment)
> Tabel 3.1: Fase 1 (analisis proses bisnis) memakai Diagram Aktivitas dan menghasilkan model proses As-Is serta To-Be.

Q: Kiriman (deliverable) dari Fase (2) Analisis Kebutuhan Pengguna adalah...
+ Model fungsional (didapat dari Diagram Use Case + Deskripsi Use Case)
- Model struktur
- Model arsitektur
- Model perilaku dinamik
> Fase 2 menghasilkan Model Fungsional berdasar Diagram Use Case dan deskripsi use case.

Q: Diagram UML apa saja yang dipakai pada Fase (4) Desain Arsitektur?
+ Diagram Kelas dan Diagram Penyebaran (Deployment)
- Hanya Diagram Use Case
- Diagram Aktivitas dan Diagram Urutan
- Diagram State Program saja
> Tabel 3.1: Fase 4 memakai Diagram Kelas + Diagram Penyebaran (Deployment) untuk menghasilkan Model Arsitektur.

Q: Fase (5) Desain Detail memakai diagram urutan, komunikasi, dan...
+ State program
- Use case
- Deployment
- Activity
> Slide: Fase 5 = perilaku dinamis terperinci memakai Diagram Urutan, Komunikasi, State Program.

Q: Manakah yang BUKAN keterbatasan metodologi konvensional menurut BAB 3.2.1?
+ Metodologi konvensional terlalu cepat menyelesaikan proyek
- Mengabaikan analisis proses bisnis
- Memisahkan pemodelan proses bisnis dari pemodelan sistem perangkat lunak
- UML tidak mendefinisikan proses pengembangan
> Keterbatasannya justru soal mengabaikan proses bisnis & pemodelan terpisah; kecepatan proyek bukan keterbatasan yang disebutkan.

Q: Menurut slide, mengapa UML tidak cukup sendirian sebagai metodologi pengembangan?
+ UML hanya alat pemodelan yang kaya semantik & notasi, tetapi TIDAK mendefinisikan proses pengembangan
- UML terlalu sulit dipelajari mahasiswa
- UML hanya dipakai untuk database
- UML tidak bisa menggambarkan kelas
> Slide menegaskan: UML = alat pemodelan, bukan definisi proses pengembangan.

Q: Perbedaan paradigma yang dituju BAB 3 adalah perpindahan dari...
+ Pendekatan berbasis fungsi (menghasilkan redundansi data) ke pendekatan berbasis proses (integrasi alur kerja & kepuasan pelanggan)
- Pendekatan berbasis proses ke berbasis fungsi
- Pengembangan daring ke pengembangan luring
- Metodologi Agile ke Waterfall
> Slide: pergeseran paradigma dari tradisional berbasis fungsi menuju berbasis proses.

Q: Urutan tahapan pengembangan konvensional menurut Choi (2014) dalam BAB 3 adalah...
+ Analisis Sistem ➔ Desain Sistem ➔ Implementasi dan Pengoperasian Sistem
- Desain ➔ Analisis ➔ Implementasi
- Implementasi ➔ Analisis ➔ Desain
- Analisis ➔ Uji Coba ➔ Desain
> Gambar 3.1 menyebut 3 tahap: Analisis Sistem, Desain Sistem, Implementasi dan Pengoperasian Sistem.

Q: Implikasi dari tingginya Average Lack of Cohesion (LCOM) pada sebuah aplikasi ISA adalah...
+ Aplikasi mengelola entitas informasi yang tidak saling terhubung sehingga perlu dipecah jadi dua atau lebih blok aplikasi
- Aplikasi sudah sangat efisien dan tidak perlu diubah
- Aplikasi terlalu banyak digunakan oleh pengguna
- Aplikasi kehilangan seluruh datanya
> Slide menyebut LCOM tinggi menunjukkan aplikasi perlu dipecah (contoh: Blok Penjualan/Stok & Blok Keuangan/SDM).

Q: Prinsip dari metodologi Spiral adalah...
+ Manajemen risiko melalui 4 tahapan iteratif: perencanaan, analisis risiko, pembangunan, dan evaluasi
- Eliminasi limbah proses secepat mungkin
- Urutan linear tanpa iterasi
- Kolaborasi klien dalam sprint
> Spiral = Manajemen Risiko (Sommerville, 2005) dengan 4 tahapan iteratif.

Q: Contoh ilustrasi penerapan EIS pada perusahaan distribusi menggunakan Diagram Use Case di tahap keberapa untuk menggambarkan interaksi Staf Gudang, Manajer Sales, dan Pelanggan?
+ Tahap 2 (Pengumpulan Kebutuhan Pengguna)
- Tahap 1 (Pemodelan As-Is & To-Be)
- Tahap 5 (Desain Detail)
- Tahap 6 (Implementasi)
> Slide BAB 3: Use Case untuk interaksi Staf Gudang, Manajer Sales, Pelanggan ada di Tahap 2 pengumpulan kebutuhan pengguna.
```