# Pertemuan 3 — Problem Solving: BFS & DFS

Catatan ini diringkas dari slide dosen **"Sesi 3 — BFS & DFS: Pencarian pada Ruang Keadaan"** (Session3.html) dan skrip praktik **`week03_bfs_dfs.py`** di course bank dosen.

## Problem Solving & Ruang Keadaan (State Space)

Dosen buka dengan definisi inti: **Problem Solving = mencari jalur dari state awal ke state tujuan melalui serangkaian aksi.**

### Tiga Elemen Kunci

- **📌 State (Keadaan)** — representasi situasi saat ini. Contoh: posisi di maze, konfigurasi puzzle 8.
- **⚡ Aksi (Actions)** — transisi antar state. Di maze: gerak ↑↓←→. Di puzzle: geser tile.
- **🏁 Tujuan (Goal)** — kondisi terminal. Pencarian berhenti saat goal ditemukan.

### Formalisasi: Tuple (S₀, A, T, G)

| Simbol | Arti |
|---|---|
| S₀ | State awal |
| A(s) | Aksi yang bisa dilakukan di state s |
| T(s,a) | State baru hasil aksi a |
| G | Himpunan tujuan (goal) |

> [!NOTE]
> Empat komponen `(S₀, A, T, G)` ini adalah cara formal mendefinisikan masalah pencarian. Kalau kamu bisa menyebut 4-tuple ini untuk satu masalah, kamu sudah memformulasikan state space-nya.

## BFS vs DFS — Perbedaan Utama

Tabel perbandingan dari slide:

| Aspek | 🌊 BFS | 🔍 DFS |
|---|---|---|
| Struktur Data | Queue — FIFO (`deque`) | Stack — LIFO (`list`) / Rekursi |
| Strategi | Melebar level per level | Mendalami satu jalur dulu |
| Complete? | ✅ Selalu menemukan solusi | ✅ Ya (jika graph terbatas) |
| Optimal? | ✅ Jalur terpendek (cost sama) | ❌ Tidak selalu |
| Memori | ❌ O(bᵈ) — boros lebar | ✅ O(b·m) — hemat |
| Kasus terbaik | Solusi dekat dari awal | Solusi di jalur pertama (kiri) |

> [!IMPORTANT]
> **BFS** pakai `deque` — `popleft()` ambil dari **depan** antrian. Semua node di kedalaman d dikunjungi sebelum d+1.
> **DFS** pakai stack/rekursi — `pop()` ambil dari **belakang**. Satu jalur dikejar sampai ujung sebelum backtrack.

## Praktik 1 — BFS pada Graf

`praktik1_bfs.py` (juga Bagian 1 di `week03_bfs_dfs.py`):

```python
from collections import deque

def bfs(graf, start, goal):
    """BFS — eksplorasi level per level.
    Mengembalikan (jalur, urutan_kunjungan)"""
    if start == goal:
        return [start], [start]

    antrian = deque([[start]])     # antrian JALUR
    dikunjungi = {start}
    urutan = []

    while antrian:
        jalur = antrian.popleft()  # FIFO ← depan
        node = jalur[-1]
        urutan.append(node)

        for nbr in graf.get(node, []):
            if nbr not in dikunjungi:
                dikunjungi.add(nbr)
                jalur_baru = jalur + [nbr]
                if nbr == goal:
                    return jalur_baru, urutan
                antrian.append(jalur_baru)

    return None, urutan            # tidak ditemukan
```

Graf contoh (adjacency list) yang dipakai:

```
A─B─C─D
│ │ │
E─F G
```

```python
graf = {
    'A':['B','E'], 'B':['A','C','F'],
    'C':['B','D'], 'D':['C','G'],
    'E':['A','F'], 'F':['B','E'],
    'G':['D']
}
jalur, kunjungan = bfs(graf, 'A', 'G')
```

> [!TIP]
> Perhatikan triknya: yang disimpan di antrian/stack adalah **jalur lengkap** (list node), bukan cuma satu node. Jadi begitu goal ketemu, jalur langsung tersedia tanpa perlu backtrack pointer.

## Praktik 2 — DFS Iteratif & Rekursif

`praktik2_dfs.py` menunjukkan **dua cara** DFS.

### DFS Iteratif (Stack)

```python
def dfs_iter(graf, start, goal):
    stack = [[start]]
    dikunjungi = {start}
    urutan = []
    while stack:
        jalur = stack.pop()        # LIFO ← belakang
        node = jalur[-1]
        urutan.append(node)
        if node == goal:
            return jalur, urutan
        for nbr in reversed(graf.get(node,[])):
            if nbr not in dikunjungi:
                dikunjungi.add(nbr)
                stack.append(jalur + [nbr])
    return None, urutan
```

### DFS Rekursif

```python
def dfs_rek(graf, node, goal, vis=None, path=None):
    if vis is None: vis = set()
    if path is None: path = []
    vis.add(node)
    path = path + [node]
    if node == goal: return path
    for nbr in graf.get(node, []):
        if nbr not in vis:
            hasil = dfs_rek(graf, nbr, goal, vis, path)
            if hasil: return hasil
    return None
```

> [!WARN]
> DFS rekursif lebih bersih kodenya, **tapi awas stack overflow** kalau graf-nya sangat dalam. Di komentar file dosen tertulis: *"lebih bersih, awas stack overflow pada graf dalam."*

## Praktik 3 — Pathfinding pada Maze 2D

`praktik3_maze.py` menerapkan BFS & DFS ke grid 5×5. Grid-nya:

```
[0,1,0,0,0]
[0,1,0,1,0]
[0,0,0,1,0]
[1,1,0,0,0]
[0,0,0,1,0]
```

- `0` = jalan, `1` = dinding
- `START, END = (0,0), (4,4)`
- `ARAH = [(-1,0),(1,0),(0,-1),(0,1)]` (atas, bawah, kiri, kanan)

```python
def bfs_maze(maze, start, end):
    R,C = len(maze),len(maze[0])
    q = deque([[start]])
    vis = {start}
    while q:
        path = q.popleft()
        r,c = path[-1]
        if (r,c)==end: return path
        for dr,dc in ARAH:
            nr,nc = r+dr,c+dc
            if 0 <= nr < R and 0 <= nc < C and maze[nr][nc] == 0 and (nr,nc) not in vis:
                vis.add((nr,nc))
                q.append(path + [(nr,nc)])
    return None
```

> [!NOTE]
> Di `week03_bfs_dfs.py`, `dfs_maze` mirip tapi pakai `stk.pop()` dan `reversed(ARAH)` supaya urutan eksplorasi arahnya konsisten. Fungsi `cetak_maze()` menampilkan maze dengan simbol `[S]` start, `[E]` end, `[█]` dinding, `[·]` jalur.

## Kompleksitas & Aplikasi Nyata

| Algo | Waktu | Memori | Optimal? | Gunakan saat… |
|---|---|---|---|---|
| BFS | O(V+E) | O(V) boros | ✅ Ya | Perlu jalur terpendek, solusi dekat |
| DFS | O(V+E) | O(h) efisien | ❌ Tidak | Eksplorasi semua jalur, memori terbatas |
| DFS Rek | O(V+E) | O(h) call stack | ❌ Tidak | Kode bersih, kedalaman aman |

### Aplikasi BFS 🌊

- Google Maps — jalur paling sedikit simpang
- LinkedIn — degree of connection
- Game NPC pathfinding (tile-based)
- Web crawler — level per level

### Aplikasi DFS 🔍

- Puzzle solver — Sudoku, N-Queens
- Topological sort (dependency graph)
- Deteksi siklus dalam graf
- Minimax tree (catur, tic-tac-toe)

## Bonus: IDDFS (Iterative Deepening DFS)

Di `week03_bfs_dfs.py` (Bagian 4), dosen menambahkan **IDDFS** — kombinasi memori DFS + completeness BFS. Caranya: jalankan **Depth-Limited Search (DLS)** dengan batas kedalaman 0, 1, 2, … sampai ketemu.

```python
def dls(graf, node, goal, limit, vis=None, path=None):
    """Depth-Limited Search — DFS dengan batas kedalaman."""
    ...
    if limit == 0:
        return None
    for nbr in graf.get(node, []):
        if nbr not in vis:
            hasil = dls(graf, nbr, goal, limit-1, vis.copy(), path)
            ...

def iddfs(graf, start, goal, max_depth=20):
    for depth in range(max_depth + 1):
        hasil = dls(graf, start, goal, depth)
        if hasil:
            return hasil
    return None
```

> [!TIP]
> **Tantangan bonus dari slide:** implementasi IDDFS sendiri, cari **semua** jalur dari S ke E dengan BFS, dan bikin animasi step-by-step BFS pakai `matplotlib.animation.FuncAnimation`.

## Tugas Sesi 3

- Buat maze 7×7 sendiri (dengan beberapa dead-end), cari jalur dengan BFS dan DFS.
- Hitung & bandingkan jumlah node yang dikunjungi BFS vs DFS pada maze yang sama.
- Visualisasikan kedua jalur dengan Matplotlib — warna berbeda untuk BFS dan DFS.

File praktik lengkap ada di: `week03_bfs_dfs.py`.

```quiz
Q: Formalisasi ruang keadaan (state space) memakai tuple apa menurut slide?
+ (S₀, A, T, G)
- (f, g, h, pq)
- (X, y, train, test)
> S₀ state awal, A(s) aksi, T(s,a) state baru, G himpunan tujuan.

Q: Struktur data yang dipakai BFS dan DFS berturut-turut?
+ Queue FIFO (deque) dan Stack LIFO (list)/rekursi
- Stack LIFO dan Queue FIFO
- Keduanya pakai priority queue
> BFS popleft() dari depan antrian; DFS pop() dari belakang stack.

Q: Kenapa DFS tidak dijamin optimal?
+ Karena DFS mendalami satu jalur dulu, jadi bisa menemukan jalur yang bukan terpendek
- Karena DFS selalu kehabisan memori
- Karena DFS tidak pernah menemukan solusi
> BFS optimal untuk cost sama karena melebar level per level; DFS bisa menemukan solusi jauh lebih panjang.

Q: Kompleksitas memori BFS dan DFS berturut-turut?
+ O(bᵈ) untuk BFS dan O(b·m) untuk DFS
- O(b·m) untuk BFS dan O(bᵈ) untuk DFS
- Keduanya O(V+E)
> BFS boros memori (melebar), DFS hemat (mendalam). Waktu keduanya O(V+E).

Q: BFS selalu optimal dalam kondisi apa?
+ Saat biaya tiap langkah sama (cost sama)
- Saat graf-nya punya bobot berbeda-beda
- Saat solusinya paling jauh dari start
> BFS optimal bila semua edge cost sama; kalau cost bervariasi, butuh UCS (P4).

Q: Apa bahaya DFS rekursif menurut komentar di file dosen?
+ Stack overflow pada graf yang sangat dalam
- Hasilnya selalu salah
- Tidak bisa menemukan solusi sama sekali
> Kode rekursif lebih bersih tapi memakai call stack, jadi kedalaman besar bisa bikin stack overflow.

Q: Aplikasi khas DFS (bukan BFS) adalah…
+ Topological sort dan deteksi siklus pada graf
- Mencari jalur paling sedikit simpang di Google Maps
- Web crawler level per level
> DFS cocok untuk puzzle solver, topological sort, deteksi siklus, dan minimax tree.

Q: Teknik apa yang dipakai BFS/DFS di praktik dosen untuk menyimpan jalur?
+ Menyimpan jalur lengkap (list node) langsung di antrian/stack
- Menyimpan parent pointer lalu backtrack
- Menyimpan semua rute di database
> Tiap entri antrian/stack adalah list jalur lengkap, jadi begitu goal ketemu jalurnya langsung ada.

Q: IDDFS menggabungkan keunggulan dua hal apa?
+ Memori hemat DFS + completeness BFS
- Akurasi tinggi ML + kecepatan GPU
- Kecepatan UCS + optimalitas Greedy
> IDDFS menjalankan Depth-Limited Search berulang dengan batas kedalaman 0,1,2,… sampai ketemu.

Q: Kenapa BFS disebut complete tetapi DFS hanya complete "jika graph terbatas"?
+ BFS menjelajah semua level, DFS bisa terjebak ke kedalaman tak berujung
- BFS memakai lebih sedikit memori
- DFS tidak bisa memakai rekursi
> Pada graf tak terbatas, DFS bisa menyusuri satu cabang tanpa ujung sehingga tidak pernah kembali menemukan solusi.
```
