# Pertemuan 2 — Standar Keamanan, Struktur Annex SL & Konteks Organisasi

Lanjutan dari Pertemuan 1 yang kemarin ngobrolin konsep dasar dan kesadaran
keamanan, hari ini kita masuk jauh lebih dalam: ngebedah **cetak biru
arsitektur dari benteng pertahanan digital kita**. Materi di-OCR dari
`materi/pertemuan-02-iso-27001-annex-sl.mp4`, buat mata kuliah IF-103 Keamanan
Informasi (UTB, Teknik Informatika).

Fokus pertemuan dua ini ada di tiga hal spesifik: **standar pengamanan**,
**struktur Annex SL**, dan **pemetaannya ke konteks organisasi** dari sebuah
Sistem Manajemen Keamanan Informasi (SMKI/ISMS). Tujuannya simpel: setelah sesi
ini kamu diharapkan mampu mengurayakan struktur standar, paham apa itu konteks
organisasi, dan bisa membedakan komponen utamanya dari standar lain yang
betebaran di luar sana.

## Agenda pembahasan

| # | Bagian | Intinya |
|---|---|---|
| 1 | Pengantar standar keamanan | Fondasi dari segalanya |
| 2 | Struktur Annex SL | Arsitektur universal |
| 3 | Konteks organisasi | Mengenali medan tempur |
| 4 | Perbandingan standar keamanan | ISO 27001 vs standar lain |
| 5 | Kontrol keamanan ISO 27002 | Bahan bangunan teknis |

Coba bayangin: kampus UTB bukan cuma tempat belajar, tapi representasi dari
sebuah organisasi real yang aset digitalnya butuh perlindungan — sama persis
kayak perusahaan multinasional, lembaga pemerintah, atau mungkin tempat kamu
kerja nanti. Semua perlindungan itu harus dimulai dari satu standar yang
terstruktur dengan jelas.

## Bagian 1 — Pengantar standar keamanan

Kamu mungkin mikir: ngapain sih kita repot-repot butuh kerangka kerja segala?
Kenapa nggak langsung aja beli firewall paling mahal, pasang antivirus terbaik,
terus udah beres?

> [!NOTE]
> Analogi dosen: kamu lagi membangun **kastil raksasa tapi nggak pakai cetak
> biru sama sekali**. Punya batu bata kualitas nomor satu, pintu jati super
> kuat, parit paling dalam — tapi kalau semua itu diletakkan secara acak,
> musuh pasti gampang nemuin celah buat masuk. Persis kayak menjalankan
> keamanan TI tanpa panduan standar yang komprehensif, seperti
> **ISO/IEC 27001**.

Tanpa standar ini, usaha mengamankan aset organisasi ujung-ujungnya cuma jadi
**permainan tembak-tembakan yang reaktif, kacau, dan nggak terukur** sama
sekali.

## Bagian 2 — Struktur Annex SL: arsitektur universal

Apa sih Annex SL ini? Sederhananya, ini **bahasa arsitektur universal untuk
sistem manajemen modern apapun**. Struktur ini dipilih karena menyederhanakan
hal-hal yang rumit jadi proses yang punya langkah-langkah jelas dan
berurutan — memastikan setiap sistem manajemen, termasuk di bidang keamanan
informasi, selalu mengikuti alur logis yang sama persis:

| Urutan alur logis | Tahapan |
|---|---|
| 1 | Perencanaan awal yang memahami kondisi di lapangan |
| 2 | Penetapan kepemimpinan (pernyataan komitmen) |
| 3 | Perencanaan risiko |
| 4 | Implementasi |
| 5 | Evaluasi |

> [!TIP]
> Pendekatan selangkah demi selangkah inilah yang nantinya **menyatukan semua
> upaya keamanan di berbagai divisi** di perusahaan kamu.

## Bagian 3 — Konteks organisasi: mengenali medan tempur

Sebelum mulai meletakkan batu batu pertama, kita wajib banget mengamati medan
tempurnya. Poin yang sangat krusial di sini:

> [!IMPORTANT]
> **ISMS (Information Security Management System) bukan sekadar software atau
> perangkat keras canggih** — itu salah kaprah. ISMS adalah sebuah **sistem
> tata kelola secara keseluruhan**: mencakup orang-orang di dalamnya, kebijakan
> dan proses yang dijalankan, plus teknologi pendukungnya. Semua dikombinasikan
> dan dikelola sistematis cuma buat satu tujuan: melindungi aset digital
> spesifik milik organisasi tersebut.

Definisi ini sekaligus mengilustrasikan kenapa **pendekatan satu ukuran untuk
semua (*one-size-fits-all*) sama sekali gak berlaku** dalam merancang
keamanan:

| Konteks organisasi | Konsekuensi desain ISMS |
|---|---|
| **Bank multinasional** — diatur hukum yang super ketat | Desain ISMS bakal beda banget: kepatuhan legal ketat, kontrol ketat |
| **Startup teknologi kecil** — kerja serba cepat dan jarak jauh | Desain ISMS lebih fleksibel, nyesuaiin ritme kerja yang cepat |

Memahami konteks ini — kultur perusahaannya, syarat legalnya, sampai
ekspektasi dari klien — adalah faktor utama yang menentukan **arah keseluruhan
strategi keamanan** kamu.

## Bagian 4 — Perbandingan standar keamanan

Di industri IT ada banyak sekali kerangka kerja yang berseliweran. Yang bikin
**ISO/IEC 27001** sangat menonjol adalah pendekatannya yang **makro**:

| Tipe standar | Ciri | Contoh isinya |
|---|---|---|
| **Standar lain** (pendekatan mikro/sempit) | Cuma ngasih checklist sempit soal perbaikan jaringan teknis | "Pastikan port ini ditutup", "Gunakan enkripsi yang ini" |
| **ISO/IEC 27001** (pendekatan makro) | Bertindak sebagai **cetak biru tata kelola secara menyeluruh** | Nggak cuma nanya teknologinya apa, tapi: gimana manajemen memastikan teknologi ini dikelola, dievaluasi, dan terus menerus diperbaiki |

## Bagian 5 — Kontrol keamanan ISO 27002

Waktunya kita bongkar bahan bangunan teknisnya. Setelah struktur makronya
jelas, yuk lihat bahan bangunan aktualnya. Yang menarik dari standar terbaru
ini: mereka secara cermat menggunakan **sistem tagar** buat memetakan setiap
jenis kontrolnya.

| Cara pemetaan kontrol | Manfaatnya |
|---|---|
| Kontrol bertipe **preventif / korektif** dipetakan langsung ke **CIA Triad** (Confidentiality, Integrity, Availability) | Arsitek keamanan langsung paham: apakah kontrol ini fungsinya **memproteksi kerahasiaan data sejak awal** (preventif), atau **merespons & memulihkan sistem** kalau insiden sudah terlanjur terjadi (korektif) |

Ingat kan, CIA Triad ini yang sudah kita pelajari mati-matian di pertemuan
pertama. Aplikasi kontrol-kontrol ini beneran kelihatan bentuk nyatanya:

- Bikin **kebijakan keamanan** yang tegas
- **Memisahkan tugas-tugas** yang krusial (*segregation of duties*)
- Aturan ketat buat **hubungan dengan pihak ketiga**
- Menentukan proses **disiplin buat staf internal** yang melanggar aturan

> [!TIP]
> Inilah yang dosen maksud sebagai **pintu, kamera pengawas, dan tembok
> operasional** kita. Kombinasi yang pas antara kebijakan teknis dan non-teknis
> inilah yang secara fisik dan logis bakal ngejaga aset digital kita dari
> berbagai serbuan ancaman cyber. Semuanya sudah dikategorikan dengan rapi biar
> gampang disesuaikan sama risiko di organisasi kamu masing-masing.

## Penutup: refleksi diri

Sebagai penutup materi pertemuan 2, dosen minta kamu melakukan sedikit
refleksi:

> [!NOTE]
> Kalau hari ini kamu ditunjuk jadi **arsitek ISMS buat sebuah startup
> teknologi yang baru dibangun**, faktor internal dan eksternal spesifik apa
> sih yang bakal menentuin konteks organisasi kamu — bahkan sebelum kamu
> mulai memasang satu pun kontrol ISO 27002?

Kalau kamu mulai memikirkan hal ini dari sekarang, itu bakal sempurna
mempersiapkan kamu buat **lokakarya penilaian risiko praktis di pertemuan 4
dan 5 nanti**. Teruslah berpikir kritis layaknya seorang arsitek keamanan
sejati.

```quiz
Q: Menurut materi, kenapa menjalankan keamanan TI tanpa panduan standar seperti ISO/IEC 27001 itu ibarat bangun kastil tanpa cetak biru?
+ Karena tanpa standar, upaya keamanan jadi reaktif, kacau, dan nggak terukur — material bagus diletakkan acak-acakan jadi gampang dicari celahnya
- Karena tanpa standar, firewall yang dibeli otomatis tidak akan berfungsi sama sekali
- Karena standar hanya dibutuhkan oleh perusahaan besar, bukan organisasi kecil
> Analogi dosen: batu bata & pintu jati kualitas nomor satu tetap kalah kalau diletakkan acak tanpa cetak biru. Tanpa ISO 27001, keamanan jadi permainan tembak-tembakan yang reaktif, kacau, dan nggak terukur.

Q: Apa itu Annex SL menurut materi pertemuan ini?
+ Bahasa arsitektur universal untuk sistem manajemen modern apapun, yang menyederhanakan hal rumit jadi langkah-langkah jelas dan berurutan
- Kumpulan 93 kontrol teknis yang harus dipasang pada setiap server organisasi
- Standar khusus yang hanya berlaku untuk sistem manajemen keamanan informasi
> Annex SL menyatukan alur logis yang sama untuk semua sistem manajemen: perencanaan awal memahami kondisi lapangan → penetapan kepemimpinan → perencanaan risiko → implementasi → evaluasi.

Q: Salah kaprah umum tentang ISMS yang dibantah keras oleh dosen adalah...
+ "ISMS itu cuma software atau perangkat keras canggih"
- "ISMS mencakup orang, kebijakan, proses, dan teknologi secara sistematis"
- "ISMS harus disesuaikan dengan konteks organisasinya"
- "ISMS bertujuan melindungi aset digital spesifik milik organisasi"
> Dosen eksplisit: "Itu salah kaprah." ISMS adalah sistem tata kelola keseluruhan — orang, kebijakan & proses, plus teknologi pendukung — dikelola sistematis untuk satu tujuan: melindungi aset digital organisasi.

Q: Kenapa pendekatan "satu ukuran untuk semua" (one-size-fits-all) gak berlaku dalam merancang ISMS?
+ Konteks organisasi beda → desain ISMS beda: bank multinasional diatur hukum super ketat, startup kerjanya serba cepat dan jarak jauh
- Karena setiap organisasi wajib membeli firewall dari vendor yang berbeda-beda
- Karena standar ISO 27001 melarang semua organisasi memakai kontrol yang sama
> Kultur perusahaan, syarat legal, sampai ekspektasi klien menentukan arah strategi keamanan. Itulah kenapa konteks organisasi wajib dipetakan dulu.

Q: Apa yang membedakan ISO/IEC 27001 dari banyak standar lain di industri IT menurut materi ini?
+ Pendekatannya yang makro — bertindak sebagai cetak biru tata kelola menyeluruh, bukan cuma checklist teknis sempit
- ISO 27001 berisi checklist teknis paling lengkap di antara semua standar
- ISO 27001 hanya mengatur enkripsi data, tanpa membahas aspek manajemen
> Standar lain mungkin cuma ngasih checklist sempit ("tutup port ini, pakai enkripsi ini"), tapi ISO 27001 nanya lebih jauh: gimana manajemen memastikan teknologi dikelola, dievaluasi, dan terus diperbaiki.

Q: Dalam ISO 27002, kontrol yang bertipe preventif dipetakan ke CIA Triad agar arsitek keamanan bisa langsung paham bahwa kontrol itu...
+ Fungsinya memproteksi kerahasiaan data sejak awal sebelum insiden terjadi
- Fungsinya merespons dan memulihkan sistem setelah insiden terlanjur terjadi
- Fungsinya menggantikan seluruh siklus manajemen risiko organisasi
> Pemetaan tagar membedakan kontrol yang melindungi sejak awal (preventif) dengan yang merespons/pemulih setelah insiden (korektif) — keduanya dipetakan langsung ke Confidentiality, Integrity, dan Availability.

Q: Berikut ini yang termasuk bentuk nyata aplikasi kontrol ISO 27002 menurut materi adalah...
+ Bikin kebijakan keamanan tegas, memisahkan tugas krusial, aturan hubungan pihak ketiga, dan proses disiplin staf yang melanggar
- Hanya memasang firewall mahal dan membiarkan tim IT bekerja tanpa kebijakan
- Membeli antivirus terbaik lalu berhenti melakukan evaluasi sama sekali
> Dosen menyebutnya "pintu, kombinasi kebijakan teknis dan non-teknis yang menjaga aset digital dari serbuan ancaman": kebijakan tegas, pemisahan tugas, aturan pihak ketiga, dan disiplin staf — dikategorikan rapi biar gampang disesuaikan sama risiko organisasi.
```

## Sources

- ISO/IEC 27001:2022 — Information security management systems: Requirements (halaman resmi ISO): https://www.iso.org/standard/27001
- ISO/IEC 27001:2022 preview (ANSI Webstore) — konfirmasi penggunaan high-level structure Annex SL & daftar klausul 1–10: https://webstore.ansi.org/preview-pages/ISO/preview_ISO+IEC+27001-2022.pdf
- ISO/IEC 27002:2022 — Information security controls (dokumen standar: themes organisational/people/physical/technological, atribut preventif/detektif/korektif): https://www.educacao.pr.gov.br/sites/default/arquivos_restritos/files/documento/2025-08/sd_iso_27002_controles_seguranca_informacao.pdf
- Annex SL Appendix 2 (ISO) — harmonized structure untuk management system standards: https://www.iso.org/cms/render/live/en/sites/isoorg/home.isoDocumentsDownload.do?t=2EVmNRpfMEK8NcTL_uoAJceDlxYmmqpQWNk3r1MeLNWCXk6i10vZ-R5FEjIK-UOe
- ISO/IEC 27005:2022 — Guidance on managing information security risks (halaman resmi ISO): https://www.iso.org/standard/80585.html