# Pertemuan 6 — Predicate Logic, Inference & Rule-Based System

Catatan ini diringkas dari slide dosen **"Sesi 6 — Logika Predikat, Inferensi & Rule-Based System"** (Session6.html) dan skrip praktik **`week06_predicate_rules.py`** di course bank dosen.

Empat pilar sesi ini (dari slide):

- **∀∃ Predikat** — kuantor universal & eksistensial
- **→ Forward Chain** — data → kesimpulan
- **← Backward Chain** — tujuan → bukti
- **🤖 Rule-Based vs ML** — perbandingan

## Logika Predikat — Lebih Ekspresif dari Logika Proposisional

Dosen membandingkan langsung dengan sesi 5:

### Logika Proposisional (Sesi 5)

- Fakta = pernyataan Benar/Salah tunggal.
- Contoh: `"Tweety adalah burung"` → P = True.
- ❌ **Tidak bisa** menyatakan "semua burung bisa terbang" secara umum.

### Logika Predikat (Sesi 6)

- Menggunakan **variabel, fungsi, dan kuantor**.
- ✅ **Bisa** menyatakan aturan umum dan pengecualian.

Contoh dari slide:

```
∀x Burung(x) → BisaTerbang(x)            # semua burung bisa terbang
∃x Burung(x) ∧ TidakBisaTerbang(x)       # ada burung yang tidak bisa terbang
```

> [!IMPORTANT]
> Inilah beda fundamental: **proposisional = statis & tunggal**, **predikat = bisa generalisasi pakai variabel & kuantor**. Karena itu predikat jauh lebih ekspresif.

## Komponen Logika Predikat

| Komponen | Contoh |
|---|---|
| Konstanta | Tweety, Rex, Jakarta |
| Variabel | x, y, z (dapat diikat) |
| Predikat | Burung(x), SukaMakan(x,y) |
| ∀ (Universal) | "untuk semua x berlaku…" |
| ∃ (Eksistensial) | "ada setidaknya satu x…" |

## Unifikasi (Unification)

**Proses mencocokkan ekspresi logika dengan mengganti variabel** — ini dasar dari inferensi predikat.

```
Burung(Tweety) unify Burung(x) → {x = Tweety} ✅
BisaTerbang(x) dengan x=Tweety → BisaTerbang(Tweety) ✅
```

> [!TIP]
> Unifikasi intinya: **cari substitusi variabel** supaya dua ekspresi jadi identik. Aturan `∀x Burung(x) → BisaTerbang(x)` akan memakai unifikasi agar bisa di-**proses** pada `Tweety`.

## Praktik 1 — Forward Chaining Lengkap

`praktik1_forward_chain.py` (juga Bagian 1 `week06_predicate_rules.py`) memakai class `InferenceEngine` yang punya **kedua** metode:

```python
class InferenceEngine:
    """Mesin inferensi dengan forward & backward chaining."""
    def __init__(self):
        self.fakta = set()
        self.aturan = []     # [(kondisi_list, hasil, nama)]
        self.log = []

    def assert_fact(self, *fakta):
        for f in fakta:
            self.fakta.add(f)

    def add_rule(self, kondisi, hasil, nama=""):
        self.aturan.append((kondisi, hasil, nama))

    # ── Forward Chaining ──
    def forward(self):
        """Terus terapkan aturan hingga tidak ada fakta baru."""
        changed = True
        while changed:
            changed = False
            for cond, hasil, nama in self.aturan:
                if all(k in self.fakta for k in cond):
                    if hasil not in self.fakta:
                        self.fakta.add(hasil)
                        self.log.append(f"FIRE '{nama}': {cond} → {hasil}")
                        changed = True
        return self.log
```

### Demo Diagnosis Medis

```python
kb = InferenceEngine()
kb.assert_fact("demam","batuk","pilek","badan_pegal")
kb.add_rule(["demam","batuk"],      "infeksi",  "R1")
kb.add_rule(["infeksi","pilek"],    "flu",      "R2")
kb.add_rule(["flu","badan_pegal"],  "flu_berat","R3")
kb.add_rule(["demam","nyeri_dada"], "pneumonia","R4")
```

Jalannya forward chaining (dari `week06_predicate_rules.py`, ada tambahan R5):

- Fakta awal: `demam`, `batuk`, `pilek`, `badan_pegal`
- **R1** fires → `infeksi` (butuh `demam`+`batuk`)
- **R2** fires → `flu` (butuh `infeksi`+`pilek`)
- **R3** fires → `flu_berat` (butuh `flu`+`badan_pegal`)
- **R4** tidak fires (butuh `nyeri_dada` yang tidak ada)
- **R5** fires → `kelelahan` (butuh `infeksi`+`badan_pegal`) — di `week06` saja

> [!TIP]
> Perhatikan **rantai**: `infeksi` yang baru diturunkan dipakai lagi oleh aturan berikutnya. Ini kenapa forward chaining butuh loop sampai nggak ada fakta baru.

## Praktik 2 — Backward Chaining & Certainty Factor

### Backward Chaining (goal → bukti)

```python
def backward(self, goal, depth=0, visited=None):
    """Buktikan goal dari fakta yang ada."""
    if goal in self.fakta:
        self.log.append(f"✅ FACT: {goal}")
        return True
    if goal in visited:
        return False            # hindari loop
    visited.add(goal)
    for cond, hasil, nama in self.aturan:
        if hasil == goal:
            if all(self.backward(k, depth+1, visited) for k in cond):
                self.fakta.add(goal)
                self.log.append(f"✅ PROVED: {goal}")
                return True
        self.log.append(f"❌ FAIL: {goal}")
    return False
```

> [!IMPORTANT]
> Beda utama: **forward = dari data → kesimpulan** (bottom-up), **backward = dari tujuan → cari bukti** (top-down). Set `visited` dipakai untuk **mencegah infinite loop** pada aturan sirkular.

### Certainty Factor (CF)

Sistem pakar memakai **CF 0.0–1.0** sebagai tingkat kepercayaan:

```
CF_gabungan = CF_rule × CF_fakta_terkecil
```

Di `week06_predicate_rules.py` (class `SistemPakarCF`):

```python
def forward_cf(self, verbose=True):
    changed = True
    while changed:
        changed = False
        for cond, hasil, cf_rule, nama in self.aturan:
            cf_cond = min(self.get_cf(c) for c in cond)
            if cf_cond > 0:
                cf_new = round(cf_rule * cf_cond, 4)
                if cf_new > self.fakta.get(hasil, 0):
                    self.fakta[hasil] = cf_new
                    changed = True
    return log
```

Demo diagnosis dengan CF:

```python
sp.assert_fact("demam",       cf=0.90)
sp.assert_fact("batuk",       cf=0.80)
sp.assert_fact("pilek",       cf=0.70)
sp.assert_fact("badan_pegal", cf=0.60)

sp.add_rule(["demam","batuk"],               "infeksi",   0.80, "R1")
sp.add_rule(["infeksi","pilek"],             "flu",        0.90, "R2")
sp.add_rule(["flu","badan_pegal"],           "flu_berat",  0.70, "R3")
sp.add_rule(["demam","batuk","badan_pegal"], "kelelahan",  0.60, "R4")
```

Tingkat keyakinan hasil (dari slide & kode): **TINGGI** jika CF > 0.7, **SEDANG** jika CF > 0.4, selain itu **RENDAH**.

> [!TIP]
> Rumus CF-nya penting: `min(CF kondisi) × CF aturan`. Karena pakai **min**, satu fakta yang lemah akan menurunkan keyakinan hasil akhir — "rantai hanya sekuat tautan terlemahnya".

## Praktik 3 — Sistem Pakar Kerusakan Smartphone

`week06_predicate_rules.py` Bagian 3 membangun `PakarSmartphone` (turunan `SistemPakarCF`) dengan **10 aturan IF-THEN + CF**:

| Aturan | Kondisi | Hasil | CF |
|---|---|---|---|
| R1 | layar_tidak_nyala, baterai_cepat_habis | masalah_daya | 0.85 |
| R2 | masalah_daya, tidak_bisa_charge | baterai_rusak | 0.90 |
| R3 | masalah_daya, hp_panas | overheat | 0.80 |
| R4 | suara_tidak_ada | speaker_rusak | 0.75 |
| R5 | kamera_buram | lensa_kotor | 0.60 |
| R6 | sinyal_hilang, wifi_tidak_konek | antena_rusak | 0.85 |
| R7 | sinyal_hilang | coba_restart | 0.50 |
| R8 | storage_penuh, restart_sendiri | storage_issue | 0.80 |
| R9 | touch_tidak_respon, layar_tidak_nyala | lcd_rusak | 0.90 |
| R10 | hp_panas, baterai_cepat_habis, restart_sendiri | cpu_overheat | 0.75 |

Input gejala (`layar_tidak_nyala`, `baterai_cepat_habis`, `tidak_bisa_charge`, `hp_panas`) → forward_cf → keluar daftar diagnosis dengan CF ≥ 0.4 (gejala input dikecualikan dari hasil).

> [!NOTE]
> Di `week06`, dosen juga **ekspor aturan ke JSON** (`week06_aturan.json`) supaya bisa diperbarui tanpa mengubah kode — ini praktik yang bagus buat memisahkan pengetahuan dari programnya.

## Praktik 4 — Rule-Based vs Machine Learning

`week06_predicate_rules.py` Bagian 4 membandingkan dua pendekatan klasifikasi Iris **di dataset yang sama**:

```python
class RuleBasedIris:
    """Klasifikasi Iris dengan aturan IF-THEN manual dari pakar."""
    RULES = [
        (2.5, 99.0, "setosa"),     # (petal_len_max, petal_wid_max, kelas)
        (5.0, 1.8,  "versicolor"),
        (99.0, 99.0, "virginica"),
    ]
    def predict_one(self, petal_len, petal_wid):
        for pl_max, pw_max, kelas in self.RULES:
            if petal_len <= pl_max and petal_wid <= pw_max:
                return kelas
        return "virginica"
```

Lalu dibandingkan dengan Decision Tree sklearn:

```python
dt = DecisionTreeClassifier(max_depth=4, random_state=42)
dt.fit(X_tr, y_tr)

print(f"Rule-Based        : {acc_rb:.2%}   (3 aturan IF-THEN manual)")
print(f"Decision Tree ML  : {acc_ml:.2%}   (belajar dari 105 sampel)")
```

Output di slide menunjukkan **Decision Tree lebih akurat** (ML belajar dari data), sedangkan rule-based cuma 3 aturan.

### Rule-Based System vs Machine Learning (tabel slide)

| Aspek | 🔧 Rule-Based (Sesi 5-6) | 🤖 Machine Learning (Sesi 2) | 🏆 Pilih kapan |
|---|---|---|---|
| Pengetahuan | Manual dari pakar | Otomatis dari data | RB: pengetahuan ada, data sedikit |
| Explainability | ✅ Sangat jelas (IF-THEN) | ❌ Kotak hitam (NN) | RB: perlu audit/regulasi |
| Akurasi | Terbatas oleh aturan | ✅ Bisa sangat tinggi | ML: data berlabel banyak |
| Update | Edit aturan manual | ✅ Retrain otomatis | ML: domain berubah cepat |
| Biaya awal | ✅ Murah (tidak butuh GPU) | Mahal (data + komputasi) | RB: startup/POC cepat |

### Kapan pakai mana?

**Kapan Rule-Based?**

- Hukum/regulasi (pajak, kredit)
- Keamanan kritis (medis, aerospace)
- Domain sempit, aturan stabil

**Kapan ML?**

- Data berlimpah, pola kompleks
- Gambar, suara, teks bebas
- Akurasi melebihi pakar manusia

> [!IMPORTANT]
> **Tren: Neuro-Symbolic** — LLM + Knowledge Graph = RAG; ML untuk persepsi → RB untuk keputusan; terbaik dari keduanya.

## Tugas Sesi 6

- Buat sistem pakar diagnosis kerusakan smartphone — minimal 8 aturan IF-THEN dengan CF.
- Implementasikan **backward chaining** untuk membuktikan apakah suatu diagnosis dapat ditarik dari gejala yang diberikan.
- Bandingkan sistem pakar buatanmu vs Decision Tree sklearn pada dataset yang sama — mana lebih akurat? mana lebih mudah dijelaskan?

**Tantangan bonus:** tambahkan confidence threshold (tampilkan diagnosis hanya jika CF ≥ 0.5); buat UI sederhana dengan `input()`; ekspor aturan ke JSON.

File praktik lengkap: `week06_predicate_rules.py` (butuh `pip install scikit-learn matplotlib`).

```quiz
Q: Apa keunggulan logika predikat dibanding logika proposisional?
+ Bisa menyatakan aturan umum dan pengecualian memakai variabel dan kuantor
- Lebih cepat dijalankan karena hanya bool
- Tidak butuh knowledge base sama sekali
> Contoh: ∀x Burung(x) → BisaTerbang(x). Logika proposisional hanya bisa Benar/Salah tunggal.

Q: Kuantor apa yang artinya "untuk semua x berlaku"?
+ ∀ (universal)
- ∃ (eksistensial)
- ¬ (negasi)
> ∃ = "ada setidaknya satu x". Dua-duanya khas logika predikat.

Q: Apa itu Unification dalam logika predikat?
+ Proses mencocokkan ekspresi dengan mengganti variabel, dasar dari inferensi predikat
- Proses menghapus variabel yang tidak terpakai
- Menghitung tabel kebenaran
> Contoh: Burung(Tweety) unify Burung(x) → {x = Tweety}, lalu aturan bisa diproses.

Q: Perbedaan utama forward chaining dan backward chaining?
+ Forward: data → kesimpulan (bottom-up); backward: tujuan → bukti (top-down)
- Forward pakai stack, backward pakai queue
- Keduanya identik beda nama saja
> Forward menerapkan aturan selama ada fakta baru; backward mencoba membuktikan goal.

Q: Pada backward chaining, apa fungsi set visited?
+ Mencegah infinite loop pada aturan yang bersirkular
- Menyimpan semua fakta baru
- Menghitung jumlah iterasi
> Tanpa visited, aturan yang saling mengutip bisa bikin rekursi tak berujung.

Q: Bagaimana rumus Certainty Factor (CF) gabungan yang dipakai dosen?
+ CF_rule × CF_fakta terkecil
- CF_rule + CF_fakta
- CF_rule ÷ jumlah fakta
> Karena pakai min, satu fakta yang lemah menurunkan keyakinan hasil akhir.

Q: Demo smartphone: gejala [layar_tidak_nyala, baterai_cepat_habis] memicu aturan apa dulu?
+ R1 → masalah_daya (CF 0.85)
- R4 → speaker_rusak
- R5 → lensa_kotor
> R1 butuh dua gejala itu sebagai kondisi; hasilnya jadi input untuk R2/R3.

Q: Dalam praktik RuleBasedIris vs Decision Tree, apa kesimpulan yang muncul?
+ Decision Tree lebih akurat karena belajar dari data, rule-based terbatas pada aturannya
- Rule-based selalu lebih akurat
- Keduanya akurasi persis sama
> Rule-based cuma memakai 3 aturan manual; ML belajar dari 105 sampel data latih.

Q: Kapan rule-based system paling tepat dipilih menurut slide?
+ Domain sempit dengan aturan stabil dan perlu explainability/audit
- Saat data berlimpah dan pola kompleks
- Untuk klasifikasi gambar dan suara bebas
> ML dipilih saat data berlabel banyak; rule-based dipilih saat hukum/regulasi & keamanan kritis.

Q: Apa arti "Neuro-Symbolic" yang disebut sebagai tren modern?
+ Menggabungkan kekuatan ML (persepsi) dan aturan simbolik (keputusan), contohnya RAG
- Menghapus seluruh aturan manual
- Membuat model saraf tiruan dari nol
> ML untuk persepsi → RB untuk keputusan; LLM + Knowledge Graph = Retrieval-Augmented Generation.
```