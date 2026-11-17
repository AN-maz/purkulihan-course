# purkulihan-course

Course bank pribadi — web kumpulan materi + quiz recall buat semua matkul
kuliah. **Bukan mirror materi dosen** — dosen punya web/course bank sendiri;
ini lapisan recall: baca catatan → cek paham lewat quiz → skor disimpen di
browser (`localStorage`).

## Prinsip

- **Markdown = sumber kebenaran.** Konten diambil dari
  `~/Documents/perkuliahan/<mk>/catatan/*.md` — folder MK tetap rumah materi
  dosen + catatan, repo ini cuma penyaji.
- **Vanilla, siap GitHub Pages.** Gak ada framework, gak ada npm, gak ada CDN
  eksternal (marked.js di-vendor lokal di `assets/vendor/`).
- **Components reusable** via Web Components:
  - `<mk-app>` — shell (topbar, sidebar, router antar halaman, TOC auto, pager)
  - `<mk-quiz>` — render blok ```quiz jadi kuis interaktif + skor
  - store `localStorage` — halaman yang lulus quiz ditandai hijau di sidebar

## Struktur

```
purkulihan-course/
├── build.py           ← generate halaman + content/ + manifest.json ke ROOT repo
├── .nojekyll          ← matiin proses Jekyll di GitHub Pages (biar cepat & aman)
├── assets/
│   ├── css/course-bank.css
│   ├── js/course-bank.js      ← semua komponen ada di sini
│   └── vendor/marked.min.js
├── index.html         ← landing: CTA ke kumpulan matkul (OUTPUT, ikut commit)
├── silabus.html       ← daftar semua matkul (OUTPUT, ikut commit)
├── manifest.json      ← daftar matkul + halaman (dibaca JS, OUTPUT)
├── content/<mk>/<halaman>.md    ← OUTPUT (markdown buat di-fetch)
└── mk/<mk>/<halaman>.html       ← OUTPUT
```

Catatan: output build memang di-commit ke root repo karena sumber materi
(`~/Documents/perkuliahan`) ada di LUAR repo — GitHub gak bisa nge-build
sendiri tanpa folder itu.

## Sumber materi

Default: `~/Documents/perkuliahan`. Bisa diarahkan ke folder lain:

```bash
PURI_MATERI=/path/ke/perkuliahan python3 build.py
```

Satu mata kuliah muncul di web kalau punya `<mk>/catatan/*.md` (atau
`<mk>/recall/*.md`).

## Cara nulis materi baru

Bikin file `.md` baru di `<mk>/catatan/` (atau `<mk>/recall/`), selesai —
jalankan `python3 build.py`, halaman + navigasi muncul otomatis.

Format quiz (markdown valid, tetap kebaca kalau dibuka di editor lain):

    ```quiz
    Q: Pertanyaannya (boleh lanjut multi-baris)
    - opsi salah
    + opsi benar
    > penjelasan (muncul setelah dijawab)
    ```

Dapat juga: heading auto-jadi TOC, `> [!NOTE]` / `> [!TIP]` / `> [!WARN]`
jadi alert gaya GitHub, tabel, kode, GFM.

## Jalan lokal

```bash
python3 build.py            # generate
python3 build.py --serve    # generate + http://localhost:8080
```

## Deploy ke GitHub Pages

Sudah disetel buat deploy **tanpa Actions** (materi ada di luar repo, jadi
build harus jalan di lokal):

1. `python3 build.py` — hasil generate keluar di **root repo**
   (index.html, silabus.html, manifest.json, mk/, content/).
2. Commit + push semua itu ke `main`:
   ```bash
   git add -A
   git commit -m "build: generate ulang halaman + materi"
   git push origin main
   ```
3. Di GitHub repo: **Settings → Pages → Source: Deploy from a branch**,
   pilih branch `main`, folder `/ (root)`, save.
4. Selesai — situs live di `https://<username>.github.io/purkulihan-course/`.

`.nojekyll` udah ada di repo supaya GitHub gak memproses folder lewat Jekyll
(file/folder berawalan `_` bakal dilewatin Jekyll tanpa ini).

Workflow tiap ada materi baru: tulis catatan → `python3 build.py` →
`git add -A && git commit && git push`.

## Checklist 8 matkul semester ini

Folder MK yang belum punya `catatan/*.md` gak muncul di web. Tinggal bikin
catatan (atau bilang MesPur buat bikinin dari materi dosen), build ulang:

- [x] bahasa indonesia — 2 halaman (resume UTS + recall quiz)
- [x] mikroprosessor — 2 halaman (P5, P6 + quiz)
- [x] keamanan-informasi — 2 halaman (P1 CIA Triad + transkrip video)
- [x] pengembangan-diri — 1 halaman (orientasi & target SMART)
- [ ] network-security — materi + lab ada, catatan belum
- [ ] sistem-informasi-enterprise (sie)
- [ ] mobile programming 2
- [ ] inteligensi-buatan — course bank dosen lengkap P1–15
