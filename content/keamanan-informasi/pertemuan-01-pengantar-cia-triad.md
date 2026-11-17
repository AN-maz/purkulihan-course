# Pertemuan 1 — Pengantar Keamanan Informasi, CIA Triad & Ancaman

Catatan dari video materi dosen `materi/pertemuan-01-cia-triad-pengantar.mp4`
(transkrip lengkap lihat `catatan/transkrip-pertemuan-01.md`).

Materi ini ngejawab **sub-CPMK 062.1 & 062.2** untuk minggu 1–2. Rujukan standar:
ISO 27002 (kontrol keamanan), ISO 27005 (manajemen risiko).

## Aset digital = berharga seperti uang di berangkas

Informasi milik organisasi — data pelanggan, kode sumber, strategi bisnis —
itu **aset paling berharga**, setara uang miliaran di berangkas bank. Karena itu
butuh pertahanan **terstruktur**, bukan modal insting. Standarnya: **ISO 27002**,
yang mendefinisikan *property* keamanan informasi sebagai atribut inti untuk
melihat kontrol dari perspektif karakteristik informasi yang harus dijaga.

## CIA Triad — tiga pilar keamanan informasi

| Pilar | Arti | Dijaga dari |
|---|---|---|
| **Confidentiality** (kerahasiaan) | Informasi cuma bisa diakses orang yang berwenang | Kebocoran, akses tak sah |
| **Integrity** (integritas) | Keakuratan & kelengkapan informasi terjaga | Perubahan tak sah |
| **Availability** (ketersediaan) | Informasi & sistem siap diakses pengguna sah saat dibutuhkan | Downtime, serangan DoS |

> [!IMPORTANT]
> Kalau **salah satu** pilar runtuh, runtuh juga keamanan informasi organisasi
> secara keseluruhan. Ketiganya saling terkait, gak bisa milih salah satu saja.

## Definisi ancaman (ISO 27005)

**Threat** = penyebab potensial dari insiden yang tidak diinginkan, yang bisa
menimbulkan kerugian bagi sistem atau organisasi.

Garis bawahi kata **potensial** — ancaman itu ibarat bahaya yang duduk manis
nunggu kesempatan, atau nunggu kerentanan sistem buat dieksploitasi.

Yang penting: **gak semua ancaman lahir dari niat jahat.**

| Jenis | Contoh |
|---|---|
| **Disengaja** | Sabotase, pencurian identitas, spionase |
| **Tidak disengaja / lingkungan** | Kesalahan manusia, kegagalan ISP, banjir, gempa bumi |

## Kategori ancaman (katalog ISO 27005)

| Kode | Ancaman | Sifat |
|---|---|---|
| TH-07 | Pencurian peralatan | Disengaja |
| TH-13 | Perusakan perangkat lunak | Bisa disengaja / tidak (salah klik user) |
| TH-25 | Pengiriman malware | Kompleks — kecerobohan user, niat jahat luar, atau celah lingkungan |

Ancaman krusial lain: **rekayasa sosial** (manipulasi psikologis), pencurian
dokumen fisik maupun digital, dan **penggunaan perangkat lunak bajakan**.

## Studi kasus — organisasi fiktif (bahan diskusi minggu 1–2)

Skenario: organisasi dengan tiga elemen kritis (terminologi ISO 27002):

1. **Fasilitas pemrosesan informasi (server lokal)** — isinya data bisnis kritis
2. **Infrastruktur jaringan** — terekspos langsung ke publik, rentan gangguan luar
3. **Ruang arsip fisik** — dokumen ditaruh di **area terbuka**, siapa pun bisa masuk

Pertanyaan diskusi:
- Ancaman spesifik apa yang bisa meruntuhkan confidentiality, integrity, availability mereka?
- Kalau dokumen fisik dicuri, pilar mana yang hancur duluan?

Pesan penutup dari dosen: keamanan informasi bukan soal hafal standar ISO di luar
kepala, tapi **seberapa cepat kamu melihat potensi bencana sebelum terjadi**.

```quiz
Q: Menurut CIA Triad, pilar yang menjamin informasi cuma bisa diakses orang berwenang adalah?
+ Confidentiality
- Integrity
- Availability
- Authentication
> Confidentiality = kerahasiaan. Integrity soal keakuratan data, availability soal ketersediaan akses.

Q: Definisi formal "threat" menurut ISO 27005 menekankan kata kunci apa?
+ Potensial — penyebab POTENSIAL dari insiden yang tidak diinginkan
- Pasti — ancaman yang sudah pasti terjadi
- Sengaja — ancaman selalu dari niat jahat
- Fisik — ancaman selalu berbentuk perangkat
> Ancaman = bahaya potensial yang nunggu kesempatan/kerentanan. Kata "potensial" ini yang sering kelewat.

Q: Menurut ISO 27005, apakah semua ancaman berasal dari niat jahat?
+ Tidak — ada ancaman tidak disengaja: kesalahan manusia, kegagalan ISP, banjir, gempa
- Ya — semua ancaman dari hacker
- Ya — ancaman selalu disengaja
- Tidak, tapi yang tidak disengaja bukan ancaman
> Dua kategori: disengaja (sabotase, spionase) dan tidak disengaja/lingkungan (human error, bencana alam).

Q: Kode TH-25 (pengiriman malware) dalam katalog ISO 27005 tergolong ancaman seperti apa?
+ Kompleks — bisa dipicu kecerobohan user, niat jahat luar, atau celah lingkungan eksternal
- Murni ancaman yang disengaja
- Murni kesalahan tidak sengaja
- Bukan ancaman, tapi kerentanan
> TH-25 contoh ancaman multi-penyebab, beda dari TH-07 (pencurian peralatan) yang murni disengaja.

Q: Kalau arsip dokumen fisik organisasi dicuri, pilar CIA mana yang jatuh duluan?
+ Confidentiality — isi dokumen jadi bisa dibaca pihak tak berwenang
- Availability saja
- Integrity saja
- Tidak ada pilar yang jatuh
> Pencurian dokumen = kebocoran informasi (confidentiality). Integrity bisa menyusul kalau dokumennya diubah.

Q: Standar ISO yang mendefinisikan "property keamanan informasi" sebagai atribut inti kontrol?
+ ISO 27002
- ISO 9001
- ISO 14001
- ISO 27005
> ISO 27002 = kontrol keamanan informasi. ISO 27005 khusus manajemen risiko ancaman.
```