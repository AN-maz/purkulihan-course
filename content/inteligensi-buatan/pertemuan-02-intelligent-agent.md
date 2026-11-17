# Pertemuan 2 — Intelligent Agent & Model ML Pertama

Catatan ini diringkas dari slide dosen **"Sesi 2 — Agen Cerdas & Model ML Pertama"** (Session2.html) dan skrip praktik **`week02_agen_ml.py`** di course bank dosen.

## Tiga Pilar Sesi Ini

Slide buka dengan 3 pilar praktik:

- **OOP Agent** — class, inheritance, polymorphism
- **Pandas Dasar** — DataFrame, filter, groupby
- **ML Pertama** — `fit` → `predict` → `score`

## Siklus Agen Cerdas

Inti agen adalah siklus: **Lingkungan → Persepsi → Keputusan → Aksi → Lingkungan** (putaran).

### Komponen Agen (versi OOP)

Dosen membangun agen sebagai class dengan komponen:

- `__init__` — state internal (nama, riwayat)
- `persepsi()` — membaca lingkungan
- `keputusan()` — aturan if-then / model ML
- `aksi()` — output ke lingkungan
- `jalankan()` — siklus persepsi → aksi

### Prinsip OOP yang Dipakai

- **Encapsulation** — data + fungsi dibungkus dalam class
- **Inheritance** — agen khusus *extends* agen dasar
- **Polymorphism** — setiap agen punya aksi berbeda
- **Abstraction** — sembunyikan detail implementasi

> [!TIP]
> Slide kasih petunjuk penting: **model ML nanti akan menjadi "otak" di dalam method `keputusan()`**. Jadi agen nggak selalu pakai aturan if-then manual — bisa diganti model ML (lihat praktik 5).

## Praktik 1 — Class Agen Dasar (Simple Reflex)

`praktik1_agen_dasar.py` di slide:

```python
class AgenDasar:
    """Agen sederhana: persepsi → keputusan → aksi"""
    def __init__(self, nama):
        self.nama = nama
        self.riwayat = []            # memori agen

    def persepsi(self, lingkungan):
        self.riwayat.append(lingkungan)
        return lingkungan

    def keputusan(self, kondisi):
        """Simple Reflex: aturan if-then"""
        if kondisi == "kotor":
            return "bersihkan"
        elif kondisi == "bersih":
            return "diam"
        else:
            return "eksplorasi"

    def aksi(self, keputusan):
        print(f"[{self.nama}] Aksi: {keputusan.upper()}")

    def jalankan(self, kondisi_list):
        for kondisi in kondisi_list:
            p = self.persepsi(kondisi)
            k = self.keputusan(p)
            self.aksi(k)

ruangan = ["kotor", "bersih", "kotor", "tidak dikenal"]
agen_vakum = AgenDasar("VacuumBot-01")
agen_vakum.jalankan(ruangan)
```

Versi di `week02_agen_ml.py` hampir sama, cuma daftar ruangannya lebih panjang: `["kotor", "bersih", "kotor", "tidak dikenal", "bersih"]`.

## Praktik 2 — Inheritance & Polymorphism

`praktik2_inheritance.py` di slide menunjukkan 3 agen turunan with `aksi()` yang di-override:

- **AgenVakum** — `"Membersihkan 🧹"` kalau kotor, `"Standby ⏸"` kalau tidak.
- **AgenKeamanan** — punya `zona_aman`; kalau area di luar zona → `"🚨 ALERT!"`.
- **AgenNavigasi** — punya `posisi = (0, 0)` dan peta arah `{utara, selatan, timur, barat}`; aksi memindahkan posisi.

Demo polimorfisme: satu list berisi 3 agen berbeda, dipanggil dengan `aksi()` yang sama tapi hasil beda-beda:

```python
agen_list = [
    AgenVakum("VacBot"),
    AgenKeamanan("GuardBot", ["lobby", "koridor", "A"]),
    AgenNavigasi("NavBot"),
]
inputs = ["kotor", "gudang", "utara"]
for agen, inp in zip(agen_list, inputs):
    hasil = agen.aksi(inp)
```

> [!NOTE]
> Poin polimorfisme: **satu method `aksi()`, banyak perilaku**. Pemanggil nggak perlu tahu agen itu vakum, keamanan, atau navigasi — cukup panggil `agen.aksi()`.

## Praktik 3 — Pandas Dasar

### Struktur Data Pandas

- **Series** — array 1D berlabel (satu kolom)
- **DataFrame** — tabel 2D (baris & kolom)
- **Index** — label baris (default 0, 1, 2, …)

### Operasi Penting

| Operasi | Fungsi |
|---|---|
| `df.head(n)` | n baris pertama |
| `df.info()` | tipe & missing value |
| `df.describe()` | statistik deskriptif |
| `df['kolom']` | pilih kolom (jadi Series) |
| `df[df['nilai']>=85]` | filter baris |
| `df.groupby('kota').mean()` | agregasi |
| `df['baru'] = …` | tambah kolom |

Contoh DataFrame di slide:

| # | nama | usia | kota | nilai |
|---|---|---|---|---|
| 0 | Andi | 21 | Jakarta | 85 |
| 1 | Budi | 22 | Bandung | 90 |
| 2 | Citra | 20 | Surabaya | 78 |
| 3 | Deni | 23 | Medan | 88 |
| 4 | Eni | 21 | Jakarta | 92 |

> [!TIP]
> Setiap kolom = Series. Gabungan kolom-kolom = DataFrame. Ini konsep dasar yang wajib nempel sebelum masuk ML.

`praktik3_pandas.py` melakukan: buat DataFrame → statistik `describe()` → filter `nilai >= 85` → **feature engineering** (`lulus` & normalisasi min-max `norm`) → `groupby('kota')`.

Contoh feature engineering dari slide:

```python
df['lulus'] = df['nilai'].apply(lambda x: '✅ Lulus' if x >= 80 else '❌ Tidak')
df['norm'] = ((df['nilai'] - df['nilai'].min()) /
              (df['nilai'].max() - df['nilai'].min())).round(2)
```

## Praktik 4 — Model ML Pertama (KNN)

### Alur ML Inti

```
📦 Data → ✂️ Split (70%/30%) → 🏋️ fit() latih → 🔮 predict() prediksi → 📈 score() akurasi
```

### Dataset Iris

- 150 bunga × 4 fitur: panjang/lebar **sepal** & **petal**
- 3 kelas: **setosa, versicolor, virginica**
- Dipakai sejak 1936 oleh Ronald Fisher — benchmark ML klasik.

### KNN — K-Nearest Neighbors

**Cara kerja:** hitung jarak Euclidean ke semua data latih → ambil **k tetangga terdekat** → **suara mayoritas** menentukan kelas.

Contoh: **k=3** → lihat 3 tetangga terdekat. KNN **tidak ada fase training eksplisit** → disebut **lazy learner**.

### train_test_split

Pisah data supaya evaluasi adil — model tidak melihat data uji saat latihan.

> [!IMPORTANT]
> `random_state=42` bikin hasil selalu **sama setiap run** (reproducible). Tanpa itu, pembagian data bisa beda tiap kali dijalankan.

`praktik4_knn.py` di slide:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import classification_report

iris = load_iris()
X, y = iris.data, iris.target

X_train,X_test,y_train,y_test = train_test_split(
    X, y, test_size=0.3, random_state=42, stratify=y)

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
akurasi = model.score(X_test, y_test)
print(classification_report(y_test, y_pred, target_names=iris.target_names))

baru = np.array([[5.1, 3.5, 1.4, 0.2]])
print(iris.target_names[model.predict(baru)[0]])
```

## Memahami Metrik Evaluasi

| Metrik | Rumus | Arti Singkat | Kapan Penting |
|---|---|---|---|
| Akurasi | Benar / Total | % prediksi tepat | Dataset seimbang |
| Precision | TP/(TP+FP) | Dari prediksi positif, berapa benar? | Hindari false alarm |
| Recall | TP/(TP+FN) | Dari positif nyata, berapa tertangkap? | Medis, penipuan |
| F1-Score | 2·P·R/(P+R) | Rata-rata harmonis P & R | Data tidak seimbang |

### Confusion Matrix

| | Pred + | Pred − |
|---|---|---|
| **Aktual +** | TP ✅ | FN ❌ |
| **Aktual −** | FP ❌ | TN ✅ |

### Memilih nilai k

> [!TIP]
> **k=1 → overfit. k besar → underfit.** Cari k optimal dengan cross-validation.

Slide menyarankan eksplorasi:

```python
for k in [1,3,5,7,9]:
    m = KNN(n_neighbors=k)
    # ...bandingkan score
```

Di `week02_agen_ml.py`, dosen sebenarnya mencoba lebih banyak nilai: `k_values = [1, 3, 5, 7, 9, 11, 15]` lalu ambil k dengan akurasi tertinggi. Bagian visualisasi juga menampilkan plot "Akurasi vs k", scatter fitur petal, dan confusion matrix.

## Praktik 5 — Agen + Model ML

`praktik5_agen_ml.py` menunjukkan konsep inti slide: **ML menggantikan aturan if-then**.

```python
class AgenKlasifikasiBunga(AgenDasar):
    """Agen dengan model ML sebagai otak keputusan"""
    def __init__(self, nama):
        super().__init__(nama)
        self.model = None
        self.label_map = None

    def latih(self, X_train, y_train, label_map):
        self.model = KNeighborsClassifier(n_neighbors=3)
        self.model.fit(X_train, y_train)
        self.label_map = label_map

    def keputusan(self, fitur):
        """ML menggantikan aturan if-then"""
        if self.model is None:
            return "ERROR: belum dilatih!"
        pred = self.model.predict([fitur])[0]
        return self.label_map[pred]

    def aksi(self, hasil):
        emoji = {"setosa":"🌸","versicolor":"🌼","virginica":"🌺"}
        print(f"[{self.nama}] {emoji.get(hasil,'🌿')} Identifikasi: {hasil.upper()}")

bot = AgenKlasifikasiBunga("FloraBot-v2")
bot.latih(X_train, y_train, dict(enumerate(iris.target_names)))
```

> [!NOTE]
> Inilah penggabungan sesi 1–2: **agen** (dari P1) yang otaknya bukan lagi aturan manual, tapi **model KNN**. Di `week02_agen_ml.py`, agen ini lalu diklasifikasi seluruh set uji dan dihitung skor akhirnya.

## Ringkasan & Tugas Sesi 2

Yang sudah dipelajari:

- OOP Python: class, `__init__`, inheritance, polymorphism
- Agen Simple Reflex berbasis aturan if-then
- Pandas: DataFrame, filter, groupby, feature engineering
- Siklus ML: load → split → fit → predict → score
- KNN classifier pada dataset Iris
- Agen cerdas dengan "otak" model ML

**Tugas mandiri dari slide:** buat `AgenCuaca`, eksplorasi dataset Titanic dari Seaborn dengan Pandas, ganti KNN dengan `DecisionTreeClassifier` lalu bandingkan akurasi, dan coba k = 1/3/5/7/9 pada KNN lalu plot dengan Matplotlib.

```quiz
Q: Apa urutan siklus agen cerdas menurut slide sesi 2?
+ Lingkungan → Persepsi → Keputusan → Aksi → Lingkungan
- Data → Split → Fit → Predict → Score
- State → Aksi → Tujuan → Biaya → Heuristik
> Siklus agen: persepsi baca lingkungan, keputusan tentukan aksi, aksi ubah lingkungan, lalu berulang.

Q: Prinsip OOP mana yang membuat setiap agen punya perilaku aksi berbeda meski method-nya sama?
+ Polymorphism
- Encapsulation
- Abstraction
> Polymorphism: satu method aksi(), banyak perilaku. Inheritance untuk agen khusus extends agen dasar.

Q: Apa peran model ML dalam kerangka agen sesi 2?
+ Menjadi "otak" di dalam method keputusan(), menggantikan aturan if-then manual
- Menggantikan fungsi sensor pada agen
- Menghitung kompleksitas algoritma pencarian
> Slide eksplisit: "Model ML nanti akan menjadi otak di dalam method keputusan()".

Q: Apa 3 kelas pada dataset Iris?
+ Setosa, versicolor, virginica
- Kotor, bersih, tidak dikenal
- Mamalia, burung, reptil
> Iris = 150 bunga × 4 fitur (panjang/lebar sepal & petal), dipakai sejak 1936 oleh Ronald Fisher.

Q: Kenapa KNN disebut "lazy learner"?
+ Karena tidak ada fase training eksplisit — baru menghitung saat prediksi
- Karena akurasinya selalu rendah
- Karena hanya bisa memakai sedikit data
> KNN menghitung jarak Euclidean ke semua data latih saat prediksi, lalu ambil k terdekat dan suara mayoritas.

Q: Apa fungsi random_state=42 pada train_test_split?
+ Agar hasil pembagian data selalu sama setiap run (reproducible)
- Agar akurasi model selalu 42%
- Agar data uji jadi 42% dari total data
> Tanpa random_state, pembagian data bisa berbeda tiap kali dijalankan.

Q: Nilai k=1 pada KNN cenderung menyebabkan apa?
+ Overfit
- Underfit
- Tidak berpengaruh apa-apa
> Slide: k=1 → overfit, k besar → underfit. Cari k optimal dengan cross-validation.

Q: Dalam confusion matrix, FN (False Negative) artinya?
+ Aktual positif tapi diprediksi negatif
- Aktual negatif dan diprediksi negatif
- Aktual positif dan diprediksi positif
> FN = kasus positif yang lolos/terlewat. Ini yang paling berbahaya di medis/penipuan, makanya recall penting.

Q: Metrik mana yang paling penting saat datanya tidak seimbang?
+ F1-Score
- Akurasi
- Rata-rata nilai k
> F1 = rata-rata harmonis precision & recall, cocok saat akurasi menyesatkan pada data tidak seimbang.

Q: Apa contoh feature engineering yang dilakukan di praktik3_pandas.py?
+ Membuat kolom 'lulus' dari nilai dan normalisasi min-max 'norm'
- Menghapus semua baris data
- Mengubah DataFrame jadi list
> Feature engineering = bikin kolom baru yang lebih informatif dari data yang ada.
```
