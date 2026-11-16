#!/usr/bin/env python3
"""
build.py — Course Bank generator (MesPur).

Sumber kebenaran = folder mata kuliah di ~/Documents/perkuliahan/<mk>/catatan/*.md
Output = site/ yang siap di-push ke GitHub Pages (pure static, vanilla).

Cara pakai:
    python3 build.py          # generate site/
    python3 build.py --serve  # generate + preview di http://localhost:8080

Format quiz (diparse jadi <mk-quiz> di browser, tetap markdown valid):

    ```quiz
    Q: Pertanyaan (boleh multi-line sampai baris opsi)
    - opsi salah
    + opsi benar
    > penjelasan (opsional, muncul setelah dijawab)
    ```
"""

import json
import os
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent          # purkulihan-course/
# Sumber materi: override lewat env PURI_MATERI, default ~/Documents/perkuliahan
PARENT = Path(os.environ.get("PURI_MATERI", Path.home() / "Documents" / "perkuliahan")).resolve()
SITE = ROOT / "site"
SKIP_DIRS = {"course-bank", "_template", "site", ".git"}
ASSETS = ROOT / "assets"                        # css/js/vendor -> ikut ke site/assets


def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-")
    return s


def read_title(md_text: str, fallback: str) -> str:
    for line in md_text.splitlines():
        m = re.match(r"^#\s+(.+)$", line.strip())
        if m:
            return m.group(1).strip()
    return fallback


def read_dosen(readme_text: str) -> str:
    m = re.search(r"\*\*Dosen[^*]*:?\*\*\s*:?\s*(.+)", readme_text)
    if m and m.group(1).strip() and m.group(1).strip() != "(isi nanti)":
        return m.group(1).strip()
    return ""


PAGE_TEMPLATE = """<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} · {mk_name}</title>
<link rel="stylesheet" href="{base}assets/css/course-bank.css">
</head>
<body>
<mk-app data-base="{base}" data-mk="{mk_slug}" data-page="{page_slug}"></mk-app>
<script src="{base}assets/vendor/marked.min.js"></script>
<script src="{base}assets/js/course-bank.js"></script>
</body>
</html>
"""

INDEX_TEMPLATE = PAGE_TEMPLATE  # sama persis, data-mk kosong


def collect_courses():
    courses = []
    for mk_dir in sorted(PARENT.iterdir()):
        if not mk_dir.is_dir() or mk_dir.name in SKIP_DIRS or mk_dir.name.startswith("_"):
            continue

        mk_slug = slugify(mk_dir.name)
        readme = mk_dir / "README.md"
        dosen = read_dosen(readme.read_text(encoding="utf8")) if readme.exists() else ""

        pages = []
        # catatan/ = penjelasan MesPur + recall quiz (sumber utama web)
        for sub in ("catatan", "recall"):
            folder = mk_dir / sub
            if not folder.is_dir():
                continue
            for md in sorted(folder.glob("*.md")):
                text = md.read_text(encoding="utf8")
                pages.append({
                    "slug": slugify(md.stem),
                    "title": read_title(text, md.stem.replace("-", " ").title()),
                    "src": md,
                    "text": text,
                })

        if not pages:
            continue

        courses.append({
            "slug": mk_slug,
            "name": mk_dir.name,
            "dosen": dosen,
            "pages": pages,
        })
    return courses


def build():
    if SITE.exists():
        shutil.rmtree(SITE)
    (SITE / "content").mkdir(parents=True)

    # assets (css/js/vendor + quiz schema doc) -> site/assets
    shutil.copytree(ASSETS, SITE / "assets")

    courses = collect_courses()
    manifest = {"courses": []}

    for course in courses:
        out_dir = SITE / "mk" / course["slug"]
        out_dir.mkdir(parents=True, exist_ok=True)

        manifest["courses"].append({
            "slug": course["slug"],
            "name": course["name"],
            "dosen": course["dosen"],
            "pages": [{"slug": p["slug"], "title": p["title"]} for p in course["pages"]],
        })

        for page in course["pages"]:
            # markdown ikut ke site/ biar di-fetch browser
            content_md = SITE / "content" / course["slug"] / f"{page['slug']}.md"
            content_md.parent.mkdir(parents=True, exist_ok=True)
            content_md.write_text(page["text"], encoding="utf8")

            html = PAGE_TEMPLATE.format(
                title=page["title"],
                mk_name=course["name"],
                mk_slug=course["slug"],
                page_slug=page["slug"],
                base="../../",
            )
            (out_dir / f"{page['slug']}.html").write_text(html, encoding="utf8")

    # landing page
    (SITE / "index.html").write_text(
        INDEX_TEMPLATE.format(
            title="Course Bank", mk_name="Perkuliahan", mk_slug="", page_slug="", base=""
        ),
        encoding="utf8",
    )
    (SITE / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2), encoding="utf8"
    )

    n_pages = sum(len(c["pages"]) for c in manifest["courses"])
    print(f"OK: {len(manifest['courses'])} matkul, {n_pages} halaman -> {SITE}")


def serve():
    import http.server
    import functools

    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(SITE))
    print(f"Serving {SITE} di http://localhost:8080 (Ctrl+C buat stop)")
    http.server.ThreadingHTTPServer(("127.0.0.1", 8080), handler).serve_forever()


if __name__ == "__main__":
    build()
    if "--serve" in sys.argv:
        serve()