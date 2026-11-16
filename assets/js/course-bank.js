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
class MkQuiz extends HTMLElement {
  connectedCallback() {
    this.questions = parseQuiz(this.dataset.body || "");
    if (!this.questions.length) return;
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
      this.state = this.state.map(() => null);
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
    if (!MK) return this.renderLanding();
    await this.renderCourse();
  }

  course() { return this.manifest.courses.find((c) => c.slug === MK); }

  async renderLanding() {
    const cards = this.manifest.courses.map((c) => {
      const total = c.pages.length;
      const done = Store.courseDone(c.slug);
      const pct = total ? Math.round((done / total) * 100) : 0;
      return `
        <a class="cb-card" href="mk/${c.slug}/${c.pages[0].slug}.html">
          <h3>${escapeHtml(c.name)}</h3>
          <div class="cb-meta">${escapeHtml(c.dosen || "dosen belum diisi")} · ${total} halaman</div>
          <div class="cb-pages">${c.pages.map((p) => escapeHtml(p.title)).join(" · ")}</div>
          <div class="cb-progress"><i style="width:${pct}%"></i></div>
          <div class="cb-progress-label">recall ${done}/${total} halaman lulus</div>
        </a>`;
    }).join("");

    this.innerHTML = `
      <div class="cb-topbar">
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
        <span class="cb-crumb">kumpulan materi + quiz recall buat 8 matkul</span>
      </div>
      <div class="cb-layout" style="padding-top:56px">
        <div class="cb-main">
          <div class="cb-hero">
            <h1>Semua materi jadi satu tempat</h1>
            <p>Materi dosen tetap di folder masing-masing — web ini lapisan recall: baca catatan, cek paham lewat quiz.</p>
          </div>
          <div class="cb-grid">${cards || "<p>Belum ada matkul ter-generate.</p>"}</div>
        </div>
      </div>`;
  }

  async renderCourse() {
    const c = this.course();
    if (!c) { this.innerHTML = `<p style="padding:2rem">Matkul ${MK} gak ada di manifest.</p>`; return; }

    const idx = Math.max(0, c.pages.findIndex((p) => p.slug === PAGE));
    const page = c.pages[idx];
    const md = await fetch(`${BASE}content/${c.slug}/${page.slug}.md`)
      .then((r) => r.text())
      .catch(() => `# Gagal load\nFile \`content/${c.slug}/${page.slug}.md\` gak ketemu.`);

    const { html, quizzes } = renderMarkdown(md);

    this.innerHTML = `
      <div class="cb-topbar">
        <button class="cb-toggle" type="button" aria-label="menu">☰</button>
        <a class="cb-brand" href="${BASE}index.html">Mes<span>Pur</span> · Course Bank</a>
        <span class="cb-crumb">${escapeHtml(c.name)} / ${escapeHtml(page.title)}</span>
      </div>
      <div class="cb-layout">
        <nav class="cb-sidebar">
          <div class="cb-side-label">${escapeHtml(c.name)}</div>
          ${c.pages.map((p) => {
            const done = Store.get(c.slug, p.slug)?.passed;
            return `<a class="cb-side-item ${p.slug === PAGE ? "active" : ""} ${done ? "done" : ""}"
              href="${p.slug}.html"><span class="cb-dot"></span>${escapeHtml(p.title)}</a>`;
          }).join("")}
          <div class="cb-side-label">matkul lain</div>
          ${this.manifest.courses.filter((x) => x.slug !== c.slug)
            .map((x) => `<a class="cb-side-item" href="${BASE}mk/${x.slug}/${x.pages[0].slug}.html">↩ ${escapeHtml(x.name)}</a>`).join("")}
        </nav>

        <main class="cb-main">
          <div class="cb-article-wrap">
            <div class="cb-content"><div class="cb-paper"><div class="md">${html}</div></div></div>
            <aside class="cb-toc"><div class="cb-toc-title">di halaman ini</div><div class="cb-toc-list"></div></aside>
          </div>
          <div class="cb-pager">
            ${idx > 0 ? `<a href="${c.pages[idx - 1].slug}.html">← ${escapeHtml(c.pages[idx - 1].title)}</a>` : "<span></span>"}
            ${idx < c.pages.length - 1 ? `<a href="${c.pages[idx + 1].slug}.html">${escapeHtml(c.pages[idx + 1].title)} →</a>` : "<span></span>"}
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