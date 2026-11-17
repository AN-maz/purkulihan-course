# Pertemuan 1 — Pengantar Keamanan Informasi & CIA Triad

Halo! Ini catatan rapi dari sesi penjelasan video dosen pertama, di-OCR dari
`materi/pertemuan-01-cia-triad-pengantar.mp4`. Materi ini adalah *bootcamp
digital intensif* buat mata kuliah **EF103 Keamanan Informasi** di Universitas
Teknologi Bandung, Fakultas Industri Kreatif, Program Studi Teknik Informatika,
dan langsung ngejawab target pencapaian **sub-CPMK 062.1 dan 062.2** buat minggu
pertama dan kedua perkuliahan. Jujur ya, ini fondasi krusial yang bakal kamu
pakai sepanjang semester — jadi simak baik-baik.

## Sambutan dosen & mengapa sesi ini penting

Dosen menyambut kita dengan antusias dan bilang sesi ini dirancang khusus buat
ngebangun **fondasi kesadaran keamanan yang super kuat**, selangkah demi
selangkah. Pesan kuncinya: keamanan informasi bukan sekadar materi minggu
pertama yang lalu dilewatin — ini fondasi yang terus dipakai sepanjang semester.

## Petajalan sesi hari ini

| # | Bagian | Intinya |
|---|---|---|
| 1 | Pengantar keamanan informasi (EF103) | Melihat nilai dari aset digital |
| 2 | 3 pilar: CIA Triad | Dimensi inti dari keamanan informasi |
| 3 | Identifikasi ancaman keamanan dasar | Mengenali bahaya |
| 4 | Kategori & contoh ancaman | Katalog ancaman ISO 27005 |
| 5 | Studi kasus organisasi fiktif | Menguji analisis kamu |

## Bagian 1 — Pengantar: nilai dari aset digital

Bayangin informasi yang dipunyai sebuah organisasi — data pelanggan, kode
sumber, atau strategi bisnis rahasia. Semua itu aset mereka yang **paling
berharga**, sama kayak uang miliaran di dalam berangkas bank. Aset digital ini
butuh pertahanan yang terstruktur.

> [!IMPORTANT]
> Keamanan nggak bisa cuma modal insting belakang. Aset digital butuh *taming*
> (pengendalian) yang didefinisikan secara tegas oleh standar praktik terbaik
> internasional — contohnya **ISO 27002**.

Menurut standar itu, *property* keamanan informasi adalah atribut inti buat
melihat kontrol dari perspektif karakteristik informasi spesifik apa sih yang
harus dijaga ketat sama organisasi. Ini krusial demi memastikan kesuksesan
operasional yang berkelanjutan.

## Bagian 2 — 3 Pilar: CIA Triad

Ketiga *taming* tadi di dunia IT dikenal banget dengan sebutan **CIA Triad**:

| Pilar | Arti | Fungsinya |
|---|---|---|
| **Confidentiality** (Kerahasiaan) | Informasi cuma bisa diakses oleh orang yang punya autoritas | Menjaga akses hanya untuk yang berwenang |
| **Integrity** (Integritas) | Menjaga keakuratan dan kelengkapan informasi | Data nggak bisa diubah sembarangan secara tidak sah |
| **Availability** (Ketersediaan) | Informasi dan sistem selalu siap diakses | Tetap bisa dipakai saat dibutuhkan oleh pengguna yang sah |

> [!NOTE]
> Penting banget buat diingat: kalau **salah satu aja** dari pilar ini runtuh,
> yaudah, runtuh juga keamanan informasi di organisasi tersebut. Tiga pilar ini
> harus berdiri bareng-bareng.

## Bagian 3 — Identifikasi ancaman keamanan dasar

Sebelum dikasih jawaban teksbooknya, dosen bikin kita mikir sejenak: apa sih
sebenernya yang ngancem pilar-pilar confidentiality, integrity, dan availability
tadi? Apa bener selalu hacker bertopeng yang duduk di ruangan gelap? Atau
jangan-jangan bahayanya jauh lebih deket sama keseharian kita?

Buat ngejawab itu dengan landasan akademis yang solid, materi merujuk ke
standar **ISO 27005**.

> [!TIP]
> Definisi formal **ancaman (*threat*)** menurut ISO 27005: *penyebab
> potensial dari sebuah insiden yang tidak diinginkan, yang ujung-ujungnya bisa
> ngasih bahaya atau kerugian buat sistem atau organisasi.* Garisbawahi kata
> **potensial** — ancaman itu ibarat bahaya yang lagi duduk manis nunggu
> kesempatan atau nunggu kerentanan sistem buat dieksploitasi.

Yang bikin ini super menarik: **nggak semua ancaman lahir dari niat jahat**.
Berdasarkan standarnya, kita harus membandingkan dua jenis ancaman:

| Jenis ancaman | Contoh |
|---|---|
| **Disebutkaan / sengaja** (*deliberate*) | Sabotase, pencurian identitas, spionase |
| **Tidak sengaja / faktor lingkungan** (*accidental & environmental*) | Kesalahan manusia yang murni ketidaksengajaan, kegagalan penyedia layanan internet, bencana alam ekstrim (banjir, gempa bumi yang tiba-tiba ngahancurin ruang server) |

## Bagian 4 — Kategori dan contoh ancaman

Merujuk pada **katalog ancaman ISO 27005**, tabel ini ngegambarin dengan jelas
betapa beragamnya *landscape* ancaman di dunia nyata:

| Kode | Contoh ancaman | Bisa sengaja? | Bisa nggak sengaja? |
|---|---|---|---|
| **TH-07** | Pencurian peralatan | ✅ Murni ancaman sengaja | — |
| **TH-13** | Perusakan perangkat lunak | ✅ Bisa | ✅ Bisa — gara-gara user salah klik |
| **TH-25** | Pengiriman malware | ✅ Ada niat jahat dari luar | ✅ Kecerdobohan user, atau celah di lingkungan eksternal |

Selain kode-kode di atas, dokumen standar ini juga nyorotin beberapa ancaman
krusial lain yang sering banget kejadian sekarang:

- **Rekayasa sosial** (manipulasi psikologis)
- **Pencurian dokumen** fisik maupun digital
- **Penggunaan perangkat lunak bajakan** — ini nih yang sering banget dispelein

> [!IMPORTANT]
> Semuanya adalah penyebab potensial jebolnya keamanan informasi yang
> jelas-jelas bisa ngahancurin **CIA Triad** sebuah organisasi.

## Bagian 5 — Studi kasus organisasi fiktif

Mari kita tarik teori tadi ke dunia nyata. Bayangin ada sebuah organisasi
fiktif yang mengelola beberapa elemen super kritis — pakai terminologi ISO
27002:

| Elemen yang dikelola | Kondisi asetnya saat ini |
|---|---|
| **Fasilitas pemrosesan informasi** (server lokal) | Isinya data bisnis yang benar-benar kritis — kacau banget kalau data ini sampai hilang |
| **Infrastruktur jaringan** yang langsung terekspos ke publik | Posisinya lagi rentan banget sama gangguan dari luar |
| **Ruang arsip fisik** (rekaman/dokumen) | Ditaruh di area terbuka — siapa aja bisa nyalonong masuk |

Ini anatomi standar dari kebanyakan perusahaan modern sekarang. Tapi kondisi
asetnya? Wah, ibarat ngasih *carpet merah* buat incident keamanan.

> [!NOTE]
> **Bahan diskusi minggu 1–2:** berdasarkan kondisi di atas, ancaman spesifik
> apa aja sih yang kira-kira bisa ngeruntuhin pilar **konfidensialitas,
> integritas, dan availabilitas** mereka? Misalnya: kalau ada dokumen fisik
> yang dicuri orang, pilar mana nih yang hancur duluan? (Jawabannya bukan cuma
> satu — bedah dalam-dalam ya.)

Penutup dari dosen: keamanan informasi bukan sekadar soal hafal standar ISO
di luar kepala, tapi soal **seberapa cepat kamu bisa ngeliat potensi bencana
sebelum bencana itu benar-benar terjadi**. Selamat berdiskusi!

```quiz
Q: Menurut ISO 27005, apa definisi formal dari "ancaman" (threat)?
+ Penyebab potensial dari sebuah insiden yang tidak diinginkan, yang bisa ngasih bahaya atau kerugian buat sistem atau organisasi
- Serangan hacker profesional yang selalu dilakukan dengan niat jahat di ruangan gelap
- Kerentanan teknis pada sistem yang langsung dieksploitasi tanpa perlu penyebab lain
> Dosen menggarisbawahi kata "potensial": ancaman itu bahaya yang menunggu kesempatan atau kerentanan untuk dieksploitasi — dan menurut standarnya, nggak semua ancaman lahir dari niat jahat.

Q: Pilar CIA Triad mana yang berfungsi menjaga keakuratan dan kelengkapan informasi supaya datanya nggak bisa diubah sembarangan secara tidak sah?
+ Integrity (Integritas)
- Confidentiality (Kerahasiaan)
- Availability (Ketersediaan)
> Integrity ngejaga keakuratan dan kelengkapan informasi. Confidentiality soal akses hanya untuk yang berwenang, Availability soal sistem selalu siap saat dibutuhkan pengguna sah.

Q: Dalam katalog ancaman ISO 27005, kode TH-07 (pencurian peralatan) disebut dosen sebagai...
+ Murni ancaman yang sengaja (deliberate)
- Ancaman yang selalu terjadi karena faktor lingkungan
- Ancaman yang hanya muncul akibat kesalahan manusia yang tidak disengaja
> TH-07 pencurian peralatan murni sengaja. Contoh yang bisa dua arah adalah TH-13 (perusakan perangkat lunak — bisa karena user salah klik) dan TH-25 (pengiriman malware).

Q: Berikut ini yang BUKAN termasuk contoh ancaman tidak sengaja / faktor lingkungan menurut materi ini adalah...
+ Spionase — karena spionase termasuk ancaman yang sengaja
- Kegagalan penyedia layanan internet
- Bencana alam ekstrim kayak banjir dan gempa bumi
> Dosen membandingkan ancaman sengaja (sabotase, pencurian identitas, spionase) dengan ancaman tidak sengaja/faktor lingkungan (kesalahan manusia murni, kegagalan ISP, bencana alam).

Q: Di organisasi studi kasus, arsip dokumen fisik ditaruh di area terbuka. Menurut analisis materi, pilar CIA yang paling langsung hancur kalau dokumen ini dicuri adalah...
+ Confidentiality — karena isi dokumen jadi bisa diakses orang yang nggak berwenang
- Availability — karena dokumen fisik nggak bisa dipakai lagi
- Integrity — karena angka di dokumen berubah sendiri tanpa disadari
> Dokumen dicuri = informasi bocor ke pihak tak berwenang, itu pelanggaran Confidentiality langsung. (Kalau isinya kemudian dimanipulasi, barulah Integrity ikut terganggu.)

Q: Kalau salah satu dari tiga pilar CIA Triad runtuh, maka...
+ Runtuh juga keamanan informasi di organisasi tersebut
- Keamanan organisasi tetap aman selama dua pilar lainnya masih ada
- Organisasi tinggal mengganti pilar yang runtuh dengan firewall baru
> Pesan dosen eksplisit: salah satu pilar aja runtuh, yaudah runtuh juga keamanan informasinya. Ketiganya saling melengkapi.

Q: Selain hafal standar ISO, "tantangan sesungguhnya" menurut penutup materi pertemuan ini adalah...
+ Seberapa cepat kamu bisa ngeliat potensi bencana sebelum bencana itu benar-benar terjadi
- Seberapa banyak vendor keamanan yang bisa kamu sebutkan di depan kelas
- Seberapa mahal firewall yang bisa dipasang organisasi kamu
> Penutup dosen: keamanan informasi bukan soal hafal standar ISO di luar kepala, tapi soal kecepatan mengenali potensi bencana sebelum terjadi.
```

## Sources

- ISO/IEC 27001:2022 — Information security management systems: Requirements (halaman resmi ISO): https://www.iso.org/standard/27001
- ISO/IEC 27001:2022 preview (ANSI Webstore) — memuat struktur klausul & kompatibilitas Annex SL: https://webstore.ansi.org/preview-pages/ISO/preview_ISO+IEC+27001-2022.pdf
- ISO/IEC 27005:2022 — Guidance on managing information security risks (halaman resmi ISO): https://www.iso.org/standard/80585.html
- ISO/IEC 27002:2022 — Information security controls (dokumen standar): https://www.educacao.pr.gov.br/sites/default/arquivos_restritos/files/documento/2025-08/sd_iso_27002_controles_seguranca_informacao.pdf
- CIA Triad (Confidentiality, Integrity, Availability) — NICCS/CISA: https://niccs.cisa.gov/training/catalog/cmdctrl/meeting-confidentiality-integrity-and-availability-requirements