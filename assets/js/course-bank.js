/* Course Bank — MesPur
 * Vanilla JS + Web Components. Reusable components:
 *   <mk-app>      shell: topbar, sidebar, routing, TOC, pager
 *   <mk-quiz>     quiz recall dari blok ```quiz di markdown
 *   <mk-progress> skor recall tersimpan di localStorage
 * Gak ada framework, gak ada build step selain build.py.
 */

const BASE = document.querySelector("mk-app")?.dataset.base ?? "";
const MK = document.querySelector("mk-app")?.dataset.mk ?? "";
const PAGE = document.querySelector("mk-app")?.dataset.page ?? "";

/* ============ store (localStorage) ============ */
const Store = {
  key: "course-bank-progress",
  all() {
    try { return JSON.parse(localStorage.getItem(this.key)) || {}; }
    catch { return {}; }
  },
  get(mk, page) { return this.all()[mk]?.[page] ?? null; },
  set(mk, page, val) {
    const a = this.all();
    (a[mk] ??= {})[page] = val;
    localStorage.setItem(this.key, JSON.stringify(a));
  },
  courseDone(mk) {
    const a = this.all()[mk] ?? {};
    return Object.values(a).filter((v) => v?.passed).length;
  },
};

/* ============ page kinds ============ */
// manifest memisahkan halaman jadi 2 jenis:
//   kind "materi" -> pertemuan-*/transkrip-pertemuan-* : tampil di tab Materi + sidebar
//   kind "kuiz"   -> recall-*, strategi-*, dst : sumber quiz. Halamannya tetap
//                    dibangun (bisa dibuka via URL) & quiz-nya tetap ikut pool
//                    Kuiz, tapi gak ikut daftar Materi biar gak tercampur.
function materiPages(c) {
  return c.pages.filter((p) => p.kind !== "kuiz");
}

/* ============ markdown pipeline ============ */
function extractQuizzes(md) {
  const quizzes = [];
  const cleaned = md.replace(/```quiz\n([\s\S]*?)```/g, (_, body) => {
    quizzes.push(body);
    return `\n<div class="quiz-slot" data-quiz="${quizzes.length - 1}"></div>\n`;
  });
  return { cleaned, quizzes };
}

function parseQuiz(body) {
  const questions = [];
  let cur = null;
  for (const raw of body.split("\n")) {
    const line = raw.trimEnd();
    if (line.startsWith("Q:")) {
      if (cur) questions.push(cur);
      cur = { q: line.slice(2).trim(), options: [], answer: -1, why: "" };
    } else if (cur && /^[-*] /.test(line)) {
      cur.options.push(line.slice(2).trim());
    } else if (cur && /^\+ /.test(line)) {
      cur.options.push(line.slice(2).trim());
      cur.answer = cur.options.length - 1;
    } else if (cur && /^> /.test(line)) {
      cur.why = line.slice(2).trim();
    } else if (cur && line.trim()) {
      cur.q += " " + line.trim(); // Q: lanjut multi-line
    }
  }
  if (cur) questions.push(cur);
  return questions.filter((x) => x.q && x.options.length >= 2 && x.answer >= 0);
}

function gfmAlerts(html) {
  // > [!NOTE] -> styled div (GitHub-style alerts)
  return html.replace(/<blockquote>\s*<p>\[!(\w+)\]\s*([\s\S]*?)<\/p>\s*<\/blockquote>/gi,
    (_, kind, inner) => {
      const k = { NOTE: "note", TIP: "tip", IMPORTANT: "important", WARNING: "warn", CAUTION: "caution" }[kind.toUpperCase()] ?? "note";
      return `<div class="md-alert ${k}"><p>${inner}</p></div>`;
    });
}

function renderMarkdown(md) {
  const { cleaned, quizzes } = extractQuizzes(md);
  const html = window.marked
    ? marked.parse(cleaned, { mangle: false, headerIds: true, gfm: true, breaks: false })
    : `<pre>${cleaned.replace(/</g, "&lt;")}</pre>`;
  return { html: gfmAlerts(html), quizzes };
}

/* ============ <mk-quiz> component ============ */
function shuffleArr(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function shuffleOptions(q) {
  // urutkan ulang opsi + remap index jawaban biar konsisten
  const idx = shuffleArr(q.options.map((_, i) => i));
  return { ...q, options: idx.map((i) => q.options[i]), answer: idx.indexOf(q.answer) };
}

class MkQuiz extends HTMLElement {
  connectedCallback() {
    this.questions = parseQuiz(this.dataset.body || "");
    if (!this.questions.length) return;
    if (this.dataset.shuffle !== undefined) {
      this.questions = shuffleArr(this.questions);                 // acak urutan soal
      const limit = parseInt(this.dataset.limit, 10);
      if (limit > 0) this.questions = this.questions.slice(0, limit); // ambil 20
      this.questions = this.questions.map(shuffleOptions);           // acak posisi opsi
      this.shuffled = true;
    }
    this.state = this.questions.map(() => null); // null | idx
    this.render();
  }

  render() {
    const done = this.state.filter((s) => s !== null).length;
    const right = this.state.filter((s, i) => s === this.questions[i].answer).length;
    this.innerHTML = `
      <div class="q-score">
        <span>Recall: <b>${right}/${this.questions.length}</b> benar · ${done} terjawab</span>
        <button type="button" data-reset>Ulangi</button>
      </div>
      ${this.questions.map((q, i) => this.qHtml(q, i)).join("")}`;

    this.querySelectorAll(".q-opt").forEach((btn) =>
      btn.addEventListener("click", () => this.answer(+btn.dataset.q, +btn.dataset.o))
    );
    this.querySelector("[data-reset]").addEventListener("click", () => {
      // acak ulang tiap diulang — biar gak ada pola urutan yang bisa dihafal
      if (this.shuffled) this.questions = shuffleArr(this.questions).map(shuffleOptions);
      this.state = this.questions.map(() => null);
      this.render();
      this.persist();
    });
  }

  qHtml(q, i) {
    const chosen = this.state[i];
    const opts = q.options.map((o, j) => {
      let cls = "q-opt";
      if (chosen !== null) {
        if (j === q.answer) cls += " correct";
        else if (j === chosen) cls += " wrong";
      }
      return `<button type="button" class="${cls}" data-q="${i}" data-o="${j}" ${chosen !== null ? "disabled" : ""}>${escapeHtml(o)}</button>`;
    }).join("");

    let badge = "";
    if (chosen !== null) {
      badge = chosen === q.answer
        ? '<span class="q-badge ok">bener</span>'
        : '<span class="q-badge bad">salah</span>';
    }
    return `
      <div class="q">
        <div class="q-q">${i + 1}. ${escapeHtml(q.q)}${badge}</div>
        <div class="q-opts">${opts}</div>
        ${q.why ? `<div class="q-why ${chosen !== null ? "show" : ""}">${escapeHtml(q.why)}</div>` : ""}
      </div>`;
  }

  answer(qi, oi) {
    if (this.state[qi] !== null) return;
    this.state[qi] = oi;
    this.render();
    this.persist();
  }

  persist() {
    const done = this.state.every((s) => s !== null);
    const right = this.state.filter((s, i) => s === this.questions[i].answer).length;
    if (done) Store.set(MK, PAGE, { passed: right === this.questions.length, right, total: this.questions.length });
    document.dispatchEvent(new CustomEvent("mk-progress"));
  }
}
customElements.define("mk-quiz", MkQuiz);

/* ============ <mk-app> shell ============ */
class MkApp extends HTMLElement {
  async connectedCallback() {
    this.manifest = await fetch(`${BASE}manifest.json`).then((r) => r.json()).catch(() => ({ courses: [] }));
    if (!MK) return PAGE === "silabus" ? this.renderSilabus() : this.renderLanding();
    const c = this.course();
    if (!c) { this.innerHTML = `<p style="padding:2rem">Matkul ${MK} gak ada di manifest.</p>`; return; }
    if (!PAGE) return this.renderCourseIndex(c);   // halaman matkul: tab materi/kuiz
    await this.renderCourse();
  }

  course() { return this.manifest.courses.find((c) => c.slug === MK); }

  /* ---------- landing: hero + CTA (daftar matkul pindah ke /silabus.html) ---------- */
  async renderLanding() {
    this.innerHTML = `
      <div class="cb-topbar">
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
      </div>
      <div class="cb-layout">
        <div class="cb-main">
          <div class="cb-hero">
            <h1>Tingkatkan Paham-mu Secara Terstruktur</h1>
            <p>Kumpulan catatan + quiz recall buat semua mata kuliah — baca materi, langsung uji paham di tempat.</p>
            <a class="cb-cta" href="${BASE}silabus.html">
              Masuk ke Ruang Belajar
              <span class="cta-arrow">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h9M8.5 4.5 12 8l-3.5 3.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>`;
  }

  /* ---------- halaman kumpulan matkul: grid kartu nama doang ---------- */
  async renderSilabus() {
    const cards = this.manifest.courses.map((c) => `
      <a class="cb-card cb-card--simple" href="${BASE}mk/${c.slug}/index.html">
        <h3>${escapeHtml(c.name)}</h3>
      </a>`).join("");

    this.innerHTML = `
      <div class="cb-topbar">
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
      </div>
      <div class="cb-layout">
        <div class="cb-main">
          <header class="cb-page-head">
            <h1>Mata Kuliah</h1>
            <p>${this.manifest.courses.length} mata kuliah · pilih satu buat mulai baca materi.</p>
          </header>
          <div class="cb-grid cb-grid--silabus">${cards || "<p>Belum ada matkul ter-generate.</p>"}</div>
        </div>
      </div>`;
  }

  /* ---------- halaman matkul: menu tab Materi / Kuiz ---------- */
  renderCourseIndex(c) {
    const materi = materiPages(c);
    const total = materi.length;
    const done = Store.courseDone(c.slug);
    this.innerHTML = `
      <div class="cb-topbar">
        <button class="cb-toggle" type="button" aria-label="menu">☰</button>
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
        <span class="cb-crumb">${escapeHtml(c.name)}</span>
      </div>
      <div class="cb-layout">
        ${this.sidebarHtml(c, "")}
        <main class="cb-main">
          <header class="cb-course-head">
            <h1>${escapeHtml(c.name)}</h1>
            ${c.dosen ? `<div class="cb-meta">${escapeHtml(c.dosen)}</div>` : ""}
            <nav class="cb-tabs" role="tablist">
              <button class="cb-tab active" data-tab="materi" type="button">Materi <span>${total}</span></button>
              <button class="cb-tab" data-tab="kuiz" type="button">Kuiz <span>${c.quizCount ?? ""}</span></button>
            </nav>
          </header>
          <div class="cb-tabpane" data-pane="materi">
            <div class="cb-grid">
              ${materi.map((p, i) => {
                const st = Store.get(c.slug, p.slug);
                return `<a class="cb-card cb-card--page ${st?.passed ? "passed" : ""}" href="${p.slug}.html">
                  <span class="cb-page-no">${i + 1}</span>
                  <span class="cb-page-title">${escapeHtml(p.title)}</span>
                  ${st?.passed ? '<span class="cb-page-flag">✓ lulus</span>' : ""}
                </a>`;
              }).join("")}
            </div>
          </div>
          <div class="cb-tabpane" data-pane="kuiz" hidden></div>
        </main>
      </div>`;

    // tab switching
    this.querySelectorAll(".cb-tab").forEach((btn) =>
      btn.addEventListener("click", () => {
        this.querySelectorAll(".cb-tab").forEach((b) => b.classList.toggle("active", b === btn));
        this.querySelectorAll(".cb-tabpane").forEach((p) => (p.hidden = p.dataset.pane !== btn.dataset.tab));
        if (btn.dataset.tab === "kuiz") this.loadKuiz(c);
      })
    );
    this.querySelector(".cb-toggle")?.addEventListener("click", () => {
      this.dataset.open = this.dataset.open === "true" ? "false" : "true";
    });
    this.querySelector(".cb-side-label")?.addEventListener("click", () => (this.dataset.open = "false"));
  }

  /* ---------- gabungin semua ```quiz dari tiap materi jadi 1 kuiz ---------- */
  async loadKuiz(c) {
    const pane = this.querySelector('.cb-tabpane[data-pane="kuiz"]');
    if (!pane || pane.dataset.loaded) return;
    pane.dataset.loaded = "1";
    pane.innerHTML = "";
    const bodies = await Promise.all(
      c.pages.map((p) =>
        fetch(`${BASE}content/${c.slug}/${p.slug}.md`)
          .then((r) => r.text())
          .then((t) => extractQuizzes(t).quizzes.join("\n"))
          .catch(() => "")
      )
    );
    const all = bodies.join("\n").trim();
    if (!all) { pane.innerHTML += "<p>Belum ada quiz di materi matkul ini.</p>"; return; }
    const pool = (all.match(/^Q: /gm) || []).length;
    pane.innerHTML += `<p class="cb-quiz-intro">${pool} soal dari semua pertemuan digabung jadi satu — urutan soal & posisi opsi diacak tiap kali halaman dibuka.</p>`;
    const q = document.createElement("mk-quiz");
    q.dataset.body = all;
    q.dataset.shuffle = "1";   // acak urutan soal + posisi opsi (semua soal, tanpa limit)
    pane.appendChild(q);
  }

  /* ---------- sidebar (dipakai halaman matkul + halaman materi) ---------- */
  sidebarHtml(c, currentSlug) {
    // daftar sidebar = halaman materi aja, biar konsisten sama tab Materi.
    // pengecualian: halaman non-materi (kind "kuiz") yang sedang dibuka tetap
    // ikut nongol biar item active-nya keliatan & bisa navigasi.
    const list = materiPages(c);
    const current = c.pages.find((p) => p.slug === currentSlug);
    const pages = current && current.kind === "kuiz" ? [current, ...list] : list;
    let n = 0;   // penghitung nomor khusus halaman materi
    return `
      <nav class="cb-sidebar">
        <a class="cb-side-label cb-side-home" href="index.html">← ${escapeHtml(c.name)}</a>
        ${pages.map((p) => {
          const done = Store.get(c.slug, p.slug)?.passed;
          // penomoran cuma buat halaman materi — halaman non-materi yang lagi
          // dibuka ditandai tanpa nomor biar urutan Materi tetap 1..n
          const no = p.kind === "kuiz" ? "" : `<span class="cb-side-no">${++n}.</span>`;
          return `<a class="cb-side-item ${p.slug === currentSlug ? "active" : ""} ${done ? "done" : ""}"
            href="${p.slug}.html"><span class="cb-dot"></span>${no} ${escapeHtml(p.title)}</a>`;
        }).join("")}
        <div class="cb-side-label">matkul lain</div>
        ${this.manifest.courses.filter((x) => x.slug !== c.slug)
          .map((x) => `<a class="cb-side-item" href="${BASE}mk/${x.slug}/index.html">${escapeHtml(x.name)}</a>`).join("")}
      </nav>`;
  }

  async renderCourse() {
    const c = this.course();
    if (!c) { this.innerHTML = `<p style="padding:2rem">Matkul ${MK} gak ada di manifest.</p>`; return; }

    const page = c.pages.find((p) => p.slug === PAGE) ?? c.pages[0];

    // pager cuma muter di halaman materi — halaman non-materi (sumber quiz)
    // gak ikut arus biar "sebelumnya/berikutnya" gak nyasar ke halaman kuiz.
    const list = materiPages(c);
    const pos = list.findIndex((p) => p.slug === PAGE);
    const prev = pos > 0 ? list[pos - 1] : null;
    const next = pos >= 0 && pos < list.length - 1 ? list[pos + 1] : null;
    const md = await fetch(`${BASE}content/${c.slug}/${page.slug}.md`)
      .then((r) => r.text())
      .catch(() => `# Gagal load\nFile \`content/${c.slug}/${page.slug}.md\` gak ketemu.`);

    const { html, quizzes } = renderMarkdown(md);

    this.innerHTML = `
      <div class="cb-topbar">
        <button class="cb-toggle" type="button" aria-label="menu">☰</button>
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
        <span class="cb-crumb"><a href="index.html" class="cb-crumb-link">${escapeHtml(c.name)}</a> / ${escapeHtml(page.title)}</span>
      </div>
      <div class="cb-layout">
        ${this.sidebarHtml(c, PAGE)}

        <main class="cb-main">
          <div class="cb-article-wrap">
            <div class="cb-content"><div class="cb-paper"><div class="md">${html}</div></div></div>
            <aside class="cb-toc"><div class="cb-toc-title">di halaman ini</div><div class="cb-toc-list"></div></aside>
          </div>
          <div class="cb-pager">
            ${prev ? `<a href="${prev.slug}.html">← ${escapeHtml(prev.title)}</a>` : "<span></span>"}
            ${next ? `<a href="${next.slug}.html">${escapeHtml(next.title)} →</a>` : "<span></span>"}
          </div>
        </main>
      </div>`;

    // hydrate quiz slots
    this.querySelectorAll(".quiz-slot").forEach((slot) => {
      const q = document.createElement("mk-quiz");
      q.dataset.body = quizzes[+slot.dataset.quiz] ?? "";
      slot.replaceWith(q);
    });

    // TOC
    const toc = this.querySelector(".cb-toc-list");
    this.querySelectorAll(".cb-content .md h2, .cb-content .md h3").forEach((h, i) => {
      h.id ||= `h-${i}`;
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.textContent;
      if (h.tagName === "H3") a.className = "lv3";
      toc.appendChild(a);
    });

    // sidebar toggle (mobile)
    this.querySelector(".cb-toggle")?.addEventListener("click", () => {
      this.dataset.open = this.dataset.open === "true" ? "false" : "true";
    });
  }
}
customElements.define("mk-app", MkApp);

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}