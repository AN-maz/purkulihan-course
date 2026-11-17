# Pertemuan 7 — Kilas Balik SMKI & Briefing Proyek UTS

Catatan dari video materi dosen `materi/pertemuan-07.mp4` (transkrip lengkap:
`catatan/transkrip-pertemuan-07.md`).

Ini pertemuan **briefing UTS** — bukan materi baru, tapi rangkuman perjalanan
P1–P6 + aturan main proyek UTS. Wajib dibaca ulang sebelum ngerjain UTS.

## 0. Peta jalan yang dosen sebut sendiri

1. Kilas balik perjalanan SMKI
2. Merangkai kepingan puzzle keamanan
3. Misi proyek UTS
4. Tiga luaran utama
5. Rubrik penilaian

## 1. Kilas balik perjalanan SMKI

**SMKI** = Sistem Manajemen Keamanan Informasi (istilah Indonesia buat ISMS).

| Minggu | Yang dikerjakan | Status "perkakas" |
|---|---|---|
| 1 | Mulai dari nol: memetakan konteks organisasi + kenalan prinsip suci CIA Triad | ✅ peta medan |
| 4 | Turun lapangan: identifikasi aset + analisis risiko pakai **matriks 5×5** | ✅ analisis risiko |
| 6 | Nyusun kebijakan, SOP, dan milih "gembok keamanan" lewat dokumen **SOA** (*Statement of Applicability*) | ✅ kontrol terpilih |

## 2. Merangkai kepingan puzzle keamanan

Dosen nunjukin silabus buat ngeyakinin: **gak ada satu pun tugas selama 6 minggu
yang acak** — semuanya peta jalan yang dirancang biar dapet skill praktis ala
industri.

Siklus yang terbentuk dari blok-blok yang udah dikuasai:

```
CIA Triad  →  buat MENILAI aset (seberapa kritis?)
    ↓
ISO 27001:2022  →  standar/kerangka yang dipakai
    ↓
Analisis risiko  →  mana yang paling bahaya?
    ↓
Kontrol keamanan  →  apa yang paling tepat diterapkan?
```

Analoginya: "**kotak perkakas** kalian sekarang udah lengkap banget" — tinggal
dipakai buat UTS.

> [!NOTE]
> Perhatikan urutannya: nilai aset → ukur risiko → **baru** pilih kontrol. Bukan
> loncat langsung ke "pasang tools X". Ini urutan yang dinilai di UTS.

## 3. Misi proyek UTS

**Format: proyek kelompok, bukan pilihan ganda atau hafalan.**

| Item | Detail |
|---|---|
| Bentuk | Proyek kelompok, **5 kelompok tetap** yang udah dibagi |
| Sifat | Menyelesaikan **kasus terapan** (bukan soal teori) |
| CPMK 091 | Mampu merancang **kerangka kerja keamanan digital** |
| CPMK 093 | Mampu mengembangkan **sistem perlindungan yang terintegrasi** |

Kunci sukses menurut dosen: kerja sama tim yang solid, "minim drama".

## 4. Tiga luaran utama UTS (berurutan)

| # | Luaran | Sifatnya |
|---|---|---|
| 1 | **Laporan Blueprint SMKI** (komprehensif) | Dokumen inti — "puncak dari semua keringat" |
| 2 | **Slide executive** (ringkasan to-the-point) | Dari laporan tebal → presentasi padat, gak bertele-tele |
| 3 | **Video paparan** | Presentasi ide ke level manajemen |

Kenapa tiga-tiganya diminta: biar lulusan gak cuma jago teknis, **tapi juga
mahir ngomong dan "jual" ide ke manajemen perusahaan**.

### Isi Blueprint SMKI (yang wajib ada)

Blueprint = *master plan* ngamanin aset organisasi pakai ISO 27001. Harus
memadukan:
1. **Konteks organisasi** (faktor internal & eksternal)
2. **Penilaian risiko** yang akurat
3. **Kebijakan** yang *makes sense*
4. **SOA** (Statement of Applicability)

> [!IMPORTANT]
> Blueprint ini "tameng pelindung aset digital" yang diturunkan langsung dari
> kerangka ISO — bukan dokumen karangan bebas.

## 5. Rubrik penilaian & bedanya nilai standar vs excellent

**Tugas/proyek = 46% bobot nilai.** Dosen tekankan angka ini buat nunjukin
matkul ini komit ke pembelajaran praktis (hands-on), bukan teori ngawang.

| Level | Kriteria |
|---|---|
| **Standar (cukup)** | Cuma berhenti di tahap **nemuin ancaman & kerentanan** → CPMK 062 minimal |
| **Excellent (memuaskan)** | Berhasil **meracik & mengimplementasikan solusi perlindungan terintegrasi yang nyata** |

Kalimat kunci dari dosen:

> "Jangan cuma jago jadi **pengamat masalah**, tapi jadilah **perancang solusi**."

## Refleksi / pertanyaan penutup

> Apakah rancangan benteng SMKI yang lagi kamu bangun **benar-benar cukup tangguh**
> buat bertahan dari gempuran serangan siber di dunia nyata?

Ini yang harus dijawab sama tim sebelum ngerjain.

```quiz
Q: Apa itu SMKI dalam konteks matkul ini?
+ Sistem Manajemen Keamanan Informasi — istilah Indonesia untuk ISMS
- Sistem Monitoring Keamanan Internal
- Standar Manajemen Kualitas Industri
- Sistem Manajemen Kinerja Individu
> SMKI = ISMS (Information Security Management System). Di P2 dosen tegas bilang ISMS itu tata kelola menyeluruh, bukan software/hardware.

Q: Matriks apa yang dipakai di minggu 4 untuk analisis risiko?
+ Matriks 5×5
- Matriks SWOT 2×2
- Matriks Eisenhower
- Matriks CIA 3×3
> Dosen sebut "analisis risiko pakai matriks 5x5" untuk identifikasi aset dan risikonya.

Q: Dokumen apa yang dipakai di minggu 6 buat memilih "gembok keamanan" (kontrol)?
+ SOA — Statement of Applicability
- SOP saja
- Audit checklist
- Risk register 5x5
> SOA = Statement of Applicability = dokumen yang nyatet kontrol mana yang dipilih/diterapkan dan kenapa.

Q: Urutan logika yang benar dalam merangkai kepingan keamanan (siklus P1-6)?
+ CIA Triad → ISO 27001 → analisis risiko → kontrol keamanan
- Kontrol keamanan → analisis risiko → ISO 27001 → CIA Triad
- ISO 27001 → kontrol → CIA Triad → risiko
- Analisis risiko → CIA Triad → kontrol → ISO 27001
> Nilai aset dulu (CIA), pakai standar (ISO 27001), ukur risiko, baru pilih kontrol. Bukan loncat ke tools duluan.

Q: Berapa bobot tugas/proyek dalam penilaian matkul ini?
+ 46%
- 25%
- 60%
- 10%
> Dosen tekankan 46% sebagai bukti matkul ini menilai implementasi hands-on, bukan hafalan teori.

Q: Apa yang membedakan laporan nilai "standar" vs "excellent" menurut dosen?
+ Standar = cuma nemuin ancaman & kerentanan; excellent = meracik & mengimplementasikan solusi terintegrasi yang nyata
- Standar = pakai ISO 27001; excellent = pakai framework lain
- Standar = laporan panjang; excellent = laporan pendek
- Standar = individu; excellent = kelompok
> CPMK 062 dicapai kalau cuma sampai identifikasi. CPMK 091 & 093 butuh solusi perlindungan terintegrasi yang nyata.

Q: Tiga luaran utama UTS, berurutan, adalah?
+ Laporan Blueprint SMKI → slide executive → video paparan
- Video → laporan → slide
- Slide → video → laporan
- Kuis → laporan → presentasi
> Urutannya dikerjakan berurutan: laporan tebal dulu, dirangkum jadi slide padat, lalu dipaparkan lewat video.

Q: Empat komponen yang wajib dipadukan dalam Blueprint SMKI?
+ Konteks organisasi, penilaian risiko, kebijakan, dan SOA
- Firewall, antivirus, enkripsi, backup
- Visi, misi, target, KPI
- Judul, abstrak, isi, daftar pustaka
> Blueprint harus menurunkan semuanya dari kerangka ISO: konteks → risiko → kebijakan → kontrol (SOA).

Q: Berapa kelompok tetap yang dibagi untuk proyek UTS?
+ 5 kelompok
- 3 kelompok
- 8 kelompok
- Bebas, gak dibagi
> Dosen sebut "5 kelompok tetap yang udah dibagi" — jadi kerja samanya harus solid.
```
