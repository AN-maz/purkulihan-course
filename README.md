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
├── build.py           ← generate site/ dari catatan/*.md + bikin manifest.json
├── assets/
│   ├── css/course-bank.css
│   ├── js/course-bank.js      ← semua komponen ada di sini
│   └── vendor/marked.min.js
└── site/              ← OUTPUT (gitignored, hasil generate)
    ├── index.html     ← landing: kartu tiap matkul + progress recall
    ├── manifest.json  ← daftar matkul + halaman (dibaca JS)
    ├── content/<mk>/<halaman>.md
    └── mk/<mk>/<halaman>.html
```

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

Opsi paling bersih pakai GitHub Action supaya hasil generate gak perlu
di-commit. Buat `.github/workflows/pages.yml`:

```yaml
name: Deploy Course Bank
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # materi kuliah ada di repo lain / folder lokal -> sesuaikan:
      #   clone repo materi ke PURI_MATERI, atau commit catatan/ ke repo ini
      - uses: actions/setup-python@v5
        with: { python-version: '3.x' }
      - run: python3 build.py
      - uses: actions/upload-pages-artifact@v3
        with: { path: site }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

**Catatan penting:** Action di atas jalan di runner GitHub, jadi folder
`~/Documents/perkuliahan` (lokal) gak ada di sana. Pilih salah satu:

1. Commit isi `catatan/` tiap matkul ke repo ini (paling simpel, mandiri).
2. Simpan materi di repo terpisah, lalu `git clone` repo itu ke `PURI_MATERI`
   sebelum `build.py` jalan.

Alternatif tanpa Actions: push isi `site/` ke branch `gh-pages` manual
(`git subtree push --prefix site origin gh-pages`), lalu aktifkan Pages.

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
