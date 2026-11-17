# Pertemuan 4–5 — Search (UCS/A*) & Knowledge Representation

Catatan ini diringkas dari slide dosen **"Sesi 4 — UCS, Greedy & A*"** (Session4.html) dan skrip praktik **`week04_ucs_astar.py`** di course bank dosen.

## Mengapa BFS/DFS Tidak Cukup?

Slide langsung ke masalahnya:

- **Masalah BFS** — BFS optimal dalam **jumlah langkah**, tapi **tidak mempertimbangkan biaya tiap langkah**. Analogi dosen: jalan tol vs jalan kampung — BFS tidak peduli.
- **Solusi: Heuristik h(n)** — `h(n)` = estimasi biaya dari node n ke goal.

### Tiga Fungsi Evaluasi (inti sesi ini)

| Algoritma | Fungsi f(n) | Sifat |
|---|---|---|
| **UCS** | f(n) = g(n) | biaya aktual |
| **Greedy** | f(n) = h(n) | estimasi saja |
| **A*** | f(n) = g(n) + h(n) | optimal + efisien |

> [!IMPORTANT]
> Semua algoritma ini memakai **Priority Queue (`heapq`)** — selalu memproses node dengan `f(n)` terkecil.

## Heuristik h(n)

`h(n)` = estimasi biaya dari node n ke goal. Tiga jarak yang dipakai dosen (`week04_ucs_astar.py`):

| Heuristik | Rumus | Cocok untuk |
|---|---|---|
| Manhattan | \|x₁−x₂\| + \|y₁−y₂\| | grid 4 arah |
| Euclidean | √((x₁−x₂)²+(y₁−y₂)²) | gerak bebas arah |
| Chebyshev | max(\|x₁−x₂\|, \|y₁−y₂\|) | gerak 8 arah (diagonal) |

> [!IMPORTANT]
> **Syarat admissible: h(n) ≤ h\*(n)** — heuristik tidak boleh "lebay" (melebihi biaya sebenarnya). Kalau admissible, A* dijamin optimal. Kalau tidak, A* bisa menemukan jalur yang bukan optimal.

## Praktik 1 — Uniform Cost Search (UCS)

`praktik1_ucs.py` (juga Bagian 1 `week04_ucs_astar.py`):

```python
import heapq

def ucs(graf, start, goal):
    """UCS: proses node dengan g(n) terkecil. Priority Queue."""
    pq = [(0, [start])]          # (biaya_g, jalur)
    dikunjungi = {}

    while pq:
        biaya, jalur = heapq.heappop(pq)
        node = jalur[-1]
        if node in dikunjungi:
            continue
        dikunjungi[node] = biaya
        if node == goal:
            return jalur, biaya, len(dikunjungi)
        for nbr, bobot in graf.get(node, []):
            if nbr not in dikunjungi:
                heapq.heappush(pq, (biaya + bobot, jalur + [nbr]))
    return None, float('inf'), 0
```

Graf berbobot (kota dengan jarak km):

```python
graf_kota = {
    'A': [('B',4),('C',2)],
    'B': [('A',4),('D',3),('E',5)],
    'C': [('A',2),('E',4),('F',1)],
    'D': [('B',3),('GOAL',6)],
    'E': [('B',5),('C',4),('GOAL',2)],
    'F': [('C',1),('GOAL',3)],
    'GOAL': []
}
jalur, biaya, n_vis = ucs(graf_kota, 'A', 'GOAL')
print(f"Jalur: {' → '.join(jalur)} | Biaya: {biaya} km")
```

> [!NOTE]
> Bedanya dengan BFS: UCS memperhatikan **bobot/bobot edge** (`biaya + bobot`), bukan sekadar jumlah langkah. Jadi meski jalur A→C→F→GOAL punya 3 langkah dan A→C→E→GOAL juga 3 langkah, UCS pilih yang total biayanya paling kecil.

## Praktik 2 — A* pada Grid 2D

`praktik2_astar.py`:

```python
import heapq

def manhattan(a, b):
    return abs(a[0]-b[0]) + abs(a[1]-b[1])

def astar(grid, start, goal):
    """A*: f(n) = g(n) + h(n), h = Manhattan"""
    R, C = len(grid), len(grid[0])
    pq = [(manhattan(start,goal), 0, start, [start])]   # (f, g, pos, jalur)
    vis = {}

    while pq:
        f, g, pos, jalur = heapq.heappop(pq)
        if pos in vis: continue
        vis[pos] = g
        if pos == goal:
            return jalur, g, len(vis)
        r, c = pos
        for dr,dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r+dr, c+dc
            if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 0 and (nr,nc) not in vis:
                g2 = g + 1
                h2 = manhattan((nr, nc), goal)
                heapq.heappush(pq, (g2+h2, g2, (nr, nc), jalur + [(nr, nc)]))
    return None, float('inf'), len(vis)
```

> [!TIP]
> Perhatikan tuple di priority queue: `(f, g, pos, jalur)`. Python `heapq` mengurutkan dari elemen pertama → `f` terkecil keluar dulu. Kalau `f` seri, baru dibanding `g`, dst.

## Praktik 3 — Perbandingan Lengkap

`praktik3_perbandingan.py` membandingkan **BFS vs UCS vs Greedy vs A*** pada grid yang sama. Fungsi `greedy_bfs()` hanya pakai `h(n)` dan abaikan `g(n)`:

```python
def greedy_bfs(grid, start, goal):
    """Greedy: hanya pakai h(n), abaikan g(n)"""
    pq = [(manhattan(start,goal), start, [start])]
    vis = {start}
    while pq:
        _, pos, jalur = heapq.heappop(pq)
        if pos == goal:
            return jalur, len(jalur)-1, len(vis)
        ...
```

Di `week04_ucs_astar.py` (Bagian 4), dosen jalankan BFS, Greedy, dan A* pada grid yang sama lalu cetak tabel:

```
Algo        Panjang    Node vis    Optimal?
BFS         ...        ...         ✅ Ya
Greedy      ...        ...         ❌ Tidak
A*          ...        ...         ✅ Ya
→ A* optimal DAN lebih efisien dari BFS!
```

Bagian visualisasi juga menampilkan bar chart "Node Dikunjungi" untuk membandingkan efisiensi.

## Ringkasan Semua Algoritma Pencarian

Tabel gabungan dari slide:

| Algoritma | f(n) | Complete? | Optimal? | Memori | Aplikasi |
|---|---|---|---|---|---|
| BFS | — | ✅ | ✅ (cost sama) | O(bᵈ) | Shortest hop |
| DFS | — | ✅* | ❌ | O(bm) | Eksplorasi |
| UCS | g(n) | ✅ | ✅ | O(bᵈ) | Cost bervariasi |
| Greedy | h(n) | ❌* | ❌ | O(bᵐ) | Cepat, approx |
| A* | g+h | ✅ | ✅ (h admissible) | O(bᵈ) | Game, GPS, robot |

> [!WARN]
> **Greedy tidak complete** (bisa nyangkut di jalur yang salah) **dan tidak optimal** — dia cuma tergoda ke arah goal terdekat. Kecepatannya tinggi, tapi hasilnya bisa jauh dari optimal.

## A* dengan Gerak Diagonal (8 Arah)

`week04_ucs_astar.py` Bagian 5 menambahkan **A* 8 arah** dengan heuristik **Chebyshev**:

```python
ARAH_8 = [(-1,-1),(-1,0),(-1,1),(0,-1),(0,1),(1,-1),(1,0),(1,1)]

def astar_8dir(grid, start, goal):
    """A* dengan 8 arah gerak — heuristik Chebyshev."""
    ...
    for dr, dc in ARAH_8:
        cost_step = 1.414 if (dr != 0 and dc != 0) else 1.0
        g2 = g + cost_step
        h2 = chebyshev((nr, nc), goal)
```

> [!NOTE]
> Gerak diagonal lebih pendek: satu langkah diagonal "bernilai" **√2 ≈ 1.414**, sedangkan langkah lurus = 1.0. Karena sedikit langkah dihitung, jalur diagonal biasanya lebih pendek dari jalur 4 arah murni.

## Aplikasi Nyata

- **Game Dev** — A* adalah *standar de facto* pathfinding di hampir semua game (Warcraft, Starcraft, dll).
- **Google Maps** — varian A* dengan heuristik **Haversine** untuk jarak bola bumi antar koordinat GPS.
- **Robotika** — robot navigasi otonom pakai A* atau variannya (D*, ARA*) untuk perencanaan jalur.

## Tugas Sesi 4

- Implementasi A* pada maze 8×8 dengan obstacle acak (`np.random`).
- Bandingkan node yang dikunjungi: BFS vs Greedy vs A* — tampilkan sebagai bar chart.
- Visualisasikan tiga jalur pada maze yang sama dengan warna berbeda.

**Tantangan bonus:** A* dengan diagonal movement (8 arah) — heuristik Chebyshev; UCS pada graf kota Indonesia (10 kota, jarak nyata); animasi step-by-step A* dengan `FuncAnimation`.

File praktik lengkap: `week04_ucs_astar.py`.

```quiz
Q: Apa rumus fungsi evaluasi A*?
+ f(n) = g(n) + h(n)
- f(n) = g(n) saja
- f(n) = h(n) saja
> g(n) = biaya aktual dari start ke n; h(n) = estimasi biaya dari n ke goal.

Q: Apa rumus fungsi evaluasi Greedy Best-First Search?
+ f(n) = h(n) — hanya pakai estimasi
- f(n) = g(n) — hanya pakai biaya aktual
- f(n) = g(n) + h(n)
> Karena abaikan g(n), Greedy cepat tapi tidak optimal dan tidak complete.

Q: Apa perbedaan utama UCS dari BFS?
+ UCS memperhitungkan bobot/biaya tiap edge, BFS hanya jumlah langkah
- UCS memakai stack, BFS memakai queue
- UCS tidak butuh goal
> Analogi dosen: BFS tidak peduli jalan tol vs jalan kampung; UCS peduli.

Q: Syarat agar A* dijamin optimal adalah…
+ Heuristiknya admissible, yaitu h(n) ≤ h*(n)
- Heuristiknya selalu nol
- h(n) lebih besar dari biaya sebenarnya
> Admissible = tidak "lebay". Kalau h melebihi biaya sebenarnya, A* bisa salah pilih jalur.

Q: Struktur data apa yang dipakai UCS, Greedy, dan A*?
+ Priority Queue (heapq) yang selalu memproses f(n) terkecil
- Stack LIFO
- Queue FIFO
> Semua algoritma pencarian berbasis biaya/heuristik pakai priority queue.

Q: Heuristik Manhattan dipakai untuk kondisi gerak apa?
+ Grid 4 arah (atas, bawah, kiri, kanan)
- Gerak bebas arah di bidang
- Gerak diagonal 8 arah
> Euclidean untuk gerak bebas arah; Chebyshev untuk 8 arah diagonal.

Q: Kenapa Greedy Best-First bisa tidak optimal?
+ Karena hanya mengejar h(n) dan mengabaikan biaya yang sudah ditempuh g(n)
- Karena tidak punya fungsi heuristik
- Karena selalu menemukan jalur terpanjang
> Greedy langsung menuju ke arah goal, padahal jalur itu bisa sangat mahal.

Q: Berapa biaya satu langkah diagonal pada A* 8 arah di praktik dosen?
+ Sekitar √2 ≈ 1.414
- 1.0
- 2.0
> Langkah lurus = 1.0, diagonal = 1.414, makanya jalur diagonal lebih pendek.

Q: Algoritma pencarian mana yang jadi standar de facto pathfinding di game?
+ A*
- DFS rekursif
- BFS
> Slide menyebut Warcraft, Starcraft, dll. Google Maps pakai varian A* dengan heuristik Haversine.

Q: Pada perbandingan BFS vs Greedy vs A* di grid yang sama, kesimpulan yang dosen tulis adalah…
+ A* optimal DAN lebih efisien dari BFS
- Greedy selalu paling optimal
- BFS paling efisien memori
> A* membatasi eksplorasi pakai heuristik, jadi mengunjungi lebih sedikit node daripada BFS tapi tetap optimal.
```

---

## Bagian 2 — Pertemuan 5 — Knowledge Representation & Logika Proposisional


Catatan ini diringkas dari slide dosen **"Sesi 5 — Knowledge Representation & Logika Proposisional"** (Session5.html) dan skrip praktik **`week05_knowledge.py`** di course bank dosen.

## Representasi Pengetahuan

Definisi dosen: **cara sistem AI menyimpan & menggunakan pengetahuan untuk bernalar dan mengambil keputusan.**

Empat konsep besar yang dibahas sesi ini:

- **📚 Knowledge Base** — fakta & aturan
- **⊤⊥ Logika Proposisional** — AND OR NOT IF-THEN
- **🔗 Forward Chain** — inferensi maju
- **🗂️ Knowledge Graph** — entitas & relasi

### Logika Proposisional

Fakta dinyatakan sebagai **proposisi Benar/Salah**. Operator yang dipakai: **AND (∧), OR (∨), NOT (¬), IF-THEN (→)**.

### Knowledge Base (KB)

Struktur KB terdiri dari:

- **Fakta** — pernyataan yang diketahui benar
- **Aturan** — IF kondisi THEN kesimpulan
- **Inferensi** — menurunkan fakta baru dari KB

### Knowledge Graph

**Entitas (node) + Relasi (edge)** dalam bentuk graf. Ini dasar dari **Google Knowledge Graph** & **RAG** (Retrieval-Augmented Generation).

Contoh mini knowledge graph dari slide:

```
Tweety ─adalah→ Burung ─adalah→ Hewan
Rex    ─adalah→ Anjing ─adalah→ Mamalia ─adalah→ Hewan
Burung ─memiliki→ Sayap
```

Inferensi: **Tweety adalah Burung + Burung adalah Hewan → Tweety adalah Hewan** (relasi transitif).

> [!NOTE]
> Relasi "adalah" (is-a) bersifat **transitif**: kalau A is-a B dan B is-a C, maka A is-a C. Di knowledge graph AI/Python: `Transformer` dasar dari `ChatGPT`, `Deep Learning` menggunakan `Transformer`, dst.

## Praktik 1 — Knowledge Base & Forward Chaining

`praktik1_kb.py` (juga Bagian 1 `week05_knowledge.py`):

```python
class KnowledgeBase:
    """KB sederhana: fakta (set) + aturan (list)"""

    def __init__(self):
        self.fakta = set()       # {(s, rel, o)}
        self.aturan = []         # [(kondisi, hasil)]

    def tambah_fakta(self, s, r, o):
        self.fakta.add((s, r, o))

    def tambah_aturan(self, cond, result):
        self.aturan.append((cond, result))

    def tanya(self, s, r, o=None):
        return [f for f in self.fakta
                if f[0]==s and f[1]==r and (o is None or f[2]==o)]

    def forward_chain(self):
        """Terapkan aturan sampai tidak ada fakta baru."""
        baru, i = True, 0
        while baru:
            baru = False; i += 1
            for cond, hasil in self.aturan:
                if all(c in self.fakta for c in cond):
                    if hasil not in self.fakta:
                        self.fakta.add(hasil)
                        print(f" [iter{i}] ✅ {hasil}")
                        baru = True
```

> [!IMPORTANT]
> **Forward chaining = inferensi maju (data → kesimpulan).** Loop terus jalan selama masih ada fakta baru yang bisa diturunkan (`while baru`). Berhenti saat **fixed point** — nggak ada fakta baru lagi.

KB hewan yang dibangun (`week05_knowledge.py`):

```python
fakta_awal = [
    ("Tweety",  "adalah",  "Burung"),
    ("Burung",  "adalah",  "Hewan"),
    ("Tweety",  "memiliki","Sayap"),
    ("Rex",     "adalah",  "Anjing"),
    ("Anjing",  "adalah",  "Mamalia"),
    ("Mamalia", "adalah",  "Hewan"),
]
# aturan:
# [("Rex","adalah","Anjing"), ("Anjing","adalah","Mamalia")] → ("Rex","adalah","Mamalia")
# [("Rex","adalah","Mamalia"), ("Mamalia","adalah","Hewan")] → ("Rex","adalah","Hewan")
```

## Praktik 2 — Tabel Kebenaran & Sistem Pakar

### Operator Logika & Tabel Kebenaran

| Operator | Simbol | Python | T,T | T,F | F,T | F,F |
|---|---|---|---|---|---|---|
| Negasi | ¬P | `not P` | F | F | T | T |
| Konjungsi | P ∧ Q | `P and Q` | T | F | F | F |
| Disjungsi | P ∨ Q | `P or Q` | T | T | T | F |
| Implikasi | P → Q | `not P or Q` | T | F | T | T |
| Biimplikasi | P ↔ Q | `P == Q` | T | F | F | T |

> [!TIP]
> **Implikasi `P → Q` yang wajib hafal:** nilainya **FALSE hanya kalau P benar dan Q salah**. Semua kasus lain TRUE. Ini paling sering keluar di ujian. Di Python ditulis `not P or Q`.

### Hukum Inferensi

**Modus Ponens** — jika P benar DAN P→Q benar, maka Q benar.

```
P    = Hujan
P→Q  = Hujan→Basah
∴ Q  = Basah ✅
```

**Modus Tollens** — jika ¬Q benar DAN P→Q benar, maka ¬P benar.

```
¬Q   = Tidak basah
P→Q  = Hujan→Basah
∴ ¬P = Tidak hujan ✅
```

**De Morgan** — berguna menyederhanakan ekspresi logika kompleks:

```
¬(P∧Q) ≡ (¬P∨¬Q)
¬(P∨Q) ≡ (¬P∧¬Q)
```

### Praktik 2 — Tabel Kebenaran Otomatis

`praktik2_logika_pakar.py` memakai `itertools.product` untuk generate semua kombinasi nilai:

```python
import itertools

def tabel_kebenaran(vars, fn, nama="Ekspresi"):
    ...
    for vals in itertools.product([False,True], repeat=len(vars)):
        m = dict(zip(vars, vals))
        h = fn(m)
        ...
```

Di `week05_knowledge.py`, dosen juga menampilkan tabel untuk `(P∧Q)→R` dengan 3 variabel.

### Sistem Pakar Hewan (Rule-Based)

```python
class SistemPakarHewan:
    def __init__(self):
        self.aturan = [
            ({'berbulu', 'menyusui'},                    'Mamalia'),
            ({'bersayap', 'bertelur', 'terbang'},         'Burung'),
            ({'bersayap', 'bertelur', 'berenang'},        'Penguin'),
            ({'berbulu', 'menyusui', 'terbang'},          'Kelelawar'),
            ({'bersisik', 'berdarah_dingin'},              'Reptil'),
            ({'bersisik', 'berdarah_dingin', 'berenang'}, 'Ikan'),
        ]

    def diagnosa(self, ciri):
        c = {x.lower() for x in ciri}
        return [k for cond,k in self.aturan if cond.issubset(c)] or ["Tidak dikenali"]
```

> [!NOTE]
> `cond.issubset(c)` artinya **semua ciri di kondisi ada di input**. Ini contoh rule-based klasik: fakta (ciri) dicek terhadap daftar aturan IF-THEN.

## Praktik 3 — Knowledge Graph dengan NetworkX

`praktik3_knowledge_graph.py` membangun digraf ekosistem AI:

```python
import networkx as nx
import matplotlib.pyplot as plt

G = nx.DiGraph()

entitas = {
    'AI':'#FFD93D', 'Machine Learning':'#FFD93D', 'Deep Learning':'#FFD93D',
    'NLP':'#5B9DFF', 'Computer Vision':'#5B9DFF',
    'Python':'#5BD68A', 'NumPy':'#5BD68A', 'scikit-learn':'#5BD68A',
    'PyTorch':'#FF6FA5', 'Transformer':'#FF6FA5', 'ChatGPT':'#FF6FA5',
}
for e in entitas: G.add_node(e)

relasi = [
    ('AI','Machine Learning','mencakup'),
    ('Machine Learning','Deep Learning','mencakup'),
    ('Deep Learning','Transformer','menggunakan'),
    ('Transformer','ChatGPT','dasar_dari'),
    ('Python','PyTorch','ekosistem'),
    ...
]
for s,d,r in relasi: G.add_edge(s,d,label=r)
```

Di `week05_knowledge.py`, dosen juga menganalisis graf:

```python
print(f"Nodes: {G.number_of_nodes()}")
print(f"Edges: {G.number_of_edges()}")
print(f"Density: {nx.density(G):.3f}")
out_deg = sorted(G.out_degree(), key=lambda x: x[1], reverse=True)
```

> [!TIP]
> **Out-degree** = jumlah edge keluar dari sebuah node. Node dengan out-degree besar = konsep yang "mencakup" banyak hal lain (misal `AI` atau `Machine Learning`).

## Rule-Based vs Machine Learning

Tabel perbandingan dari slide:

| Aspek | Rule-Based (Sesi 5) | Machine Learning (Sesi 2) |
|---|---|---|
| Pengetahuan | Dari pakar manusia (manual) | Dari data (otomatis) |
| Transparansi | ✅ Mudah dijelaskan | ❌ Kotak hitam (NN) |
| Maintenance | ❌ Mahal jika domain luas | ✅ Lebih mudah update |
| Data | ✅ Tidak butuh data banyak | ❌ Butuh data berlabel |
| Akurasi | Terbatas pada aturan | ✅ Bisa sangat tinggi |
| Use Case | Domain sempit, butuh explainability | Domain luas, data tersedia |

> [!IMPORTANT]
> **Tren modern: Neuro-Symbolic AI** — menggabungkan kekuatan keduanya. Contoh: knowledge graph dipakai sebagai konteks dalam LLM (**Retrieval-Augmented Generation / RAG**).

## Tugas Sesi 5

- Buat KB domain penyakit tanaman (gejala → penyakit) — minimal 10 fakta, 5 aturan.
- Implementasi **backward chaining**: diberikan kesimpulan, cari kondisi yang diperlukan.
- Buat knowledge graph prasyarat mata kuliah di jurusanmu dengan NetworkX.

**Tantangan bonus:** bandingkan sistem pakar buatanmu vs Decision Tree sklearn; tambahkan certainty factor pada aturan (0–1); integrasi KB dengan query bahasa natural pakai keyword matching.

File praktik lengkap: `week05_knowledge.py` (butuh `pip install networkx matplotlib`).

```quiz
Q: Apa komponen yang menyusun sebuah Knowledge Base (KB)?
+ Fakta (yang diketahui benar), aturan IF-THEN, dan proses inferensi
- Hanya data latih dan label saja
- Hanya graf entitas tanpa aturan
> Inferensi menurunkan fakta baru dari fakta + aturan yang ada.

Q: Implikasi P → Q bernilai FALSE hanya pada kondisi apa?
+ Saat P benar dan Q salah
- Saat P dan Q dua-duanya salah
- Saat P salah dan Q benar
> Semua kasus lain TRUE. Di Python implikasi ditulis `not P or Q`.

Q: Apa itu forward chaining?
+ Inferensi maju: dari data/fakta menerapkan aturan sampai tidak ada fakta baru
- Inferensi mundur: dari tujuan mencari bukti
- Proses menghapus aturan yang tidak terpakai
> Loop berjalan selama masih ada fakta baru (while baru) hingga mencapai fixed point.

Q: Hukum De Morgan untuk ¬(P∧Q) adalah…
+ (¬P∨¬Q)
- (¬P∧¬Q)
- (P∨Q)
> De Morgan berguna menyederhanakan ekspresi logika kompleks: ¬(P∨Q) ≡ (¬P∧¬Q).

Q: Modus Tollens menyatakan…
+ Jika ¬Q benar dan P→Q benar, maka ¬P benar
- Jika P benar dan P→Q benar, maka Q benar
- Jika P salah maka Q pasti salah
> Yang terakhir (P benar + P→Q → Q) itu Modus Ponens, bukan Modus Tollens.

Q: Pada praktik knowledge graph, "out-degree" sebuah node berarti…
+ Jumlah edge yang keluar dari node itu
- Jumlah seluruh node dalam graf
- Nilai densitas graf
> Node dengan out-degree besar = konsep yang "mencakup" banyak hal lain, misal AI.

Q: Apa dasar dari Google Knowledge Graph dan RAG menurut slide?
+ Knowledge graph — entitas sebagai node, relasi sebagai edge
- Tabel kebenaran dua variabel
- Forward chaining sederhana
> Slide menyebut knowledge graph sebagai dasar Google Knowledge Graph & RAG.

Q: Kelebihan utama rule-based system dibanding ML untuk domain sempit adalah…
+ Transparansi/explainability — aturannya bisa dijelaskan
- Akurasi selalu lebih tinggi dari ML
- Tidak butuh tenaga pakar sama sekali
> Kelemahannya: maintenance mahal jika domain luas, akurasi terbatas pada aturan.

Q: Apa tren modern yang menggabungkan rule-based dan ML menurut slide?
+ Neuro-Symbolic AI — misalnya knowledge graph jadi konteks LLM (RAG)
- Menghapus semua aturan manual
- Memakai ML saja tanpa knowledge base
> RAG = Retrieval-Augmented Generation; LLM dipadukan dengan knowledge graph.

Q: Pada Sistem Pakar Hewan, kondisi `cond.issubset(c)` artinya apa?
+ Semua ciri di kondisi aturan ada di himpunan ciri input
- Setidaknya satu ciri cocok
- Jumlah ciri input sama dengan jumlah kondisi
> Ini mekanisme rule-based klasik: cek apakah fakta (ciri) memenuhi prasyarat aturan.
```
