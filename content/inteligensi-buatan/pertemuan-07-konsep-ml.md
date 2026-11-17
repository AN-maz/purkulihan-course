# Pertemuan 7 — Konsep ML, Dataset, Feature & Label

Catatan ini diringkas dari slide dosen **"Sesi 7 — Konsep ML, Dataset, Pipeline & Feature Engineering"** (Session7.html) dan skrip praktik **`week07_ml_pipeline.py`** di course bank dosen.

Empat pilar sesi ini (dari slide):

- **📦 Dataset** — struktur & kualitas
- **🔧 Preprocessing** — cleaning & encoding
- **⚙️ Pipeline** — sklearn Pipeline
- **🌲 K-Means** — intro unsupervised

## Peta Lengkap Konsep Machine Learning

Pipeline end-to-end menurut dosen:

```
📦 Data Mentah → 🔧 Preprocessing → ✂️ Train/Test Split
   → 🏋️ Training → 📈 Evaluasi → 🚀 Deploy
```

## Supervised vs Unsupervised Learning

### Supervised Learning

Data **berlabel**: setiap X punya y. Model belajar memetakan **X → y**.

- **Klasifikasi** — y = kategori (spam/bukan)
- **Regresi** — y = angka (harga rumah)

### Unsupervised Learning

Data **tidak berlabel**: temukan pola/struktur tersembunyi.

- **Clustering** — K-Means, DBSCAN
- **Dim. Reduction** — PCA, t-SNE

> [!IMPORTANT]
> **Data Leakage ⚠️** — informasi dari data test "bocor" ke proses training → **akurasi palsu tinggi**.
> **Solusi: selalu split data SEBELUM preprocessing.**

## Posisi Sesi 2 vs Sesi 7 (konteks kurikulum)

Dosen menekankan perbedaan pendekatan antar sesi:

| Sesi | Pendekatan |
|---|---|
| Sesi 2 | "Jalankan model dulu!" — langsung `fit()` `predict()` `score()` tanpa preprocessing |
| Sesi 7 | "Bedah pipeline lengkap" — pahami setiap langkah, kenapa preprocessing penting |
| Sesi 10 | "Bandingkan banyak model" — Random Forest, XGBoost, feature importance |

> [!NOTE]
> Jadi Sesi 7 adalah pembungkusan konsep yang di Sesi 2 cuma di-*run* mentah-mentah. Kalau MasPur bingung kenapa di P2 kelihatannya gampang tapi di P7 banyak langkah — itu karena P2 memang sengaja praktik langsung tanpa teori pipeline.

## Praktik 1 — Preprocessing & sklearn Pipeline

### Struktur data sintetis mahasiswa (Bagian 1 `week07_ml_pipeline.py`)

150 sampel dengan fitur:

- `ipk` (float 1.5–4.0), `absensi` (0–24), `tugas` (40–99)
- `kota` (Jakarta/Bandung/Surabaya/Medan), `angkatan` (2020–2023)
- **Label `lulus`** = 1 kalau `ipk ≥ 2.75` DAN `absensi ≤ 12` DAN `tugas ≥ 60`, selain itu 0
- 8 missing value ditambahkan buatan (4 di ipk, 4 di absensi)

### Preprocessing manual step-by-step (Bagian 2)

Dosen menunjukkan langkah satu per satu dulu sebelum dibungkus pipeline:

1. **Imputasi** — `df['ipk'].fillna(df['ipk'].median())` (isi missing value dengan median)
2. **Feature engineering**:
   - `ipk_kat` = `pd.cut` → Buruk/Cukup/Baik/Sangat Baik (binning)
   - `kehadiran` = 100 − (absensi/14 × 100)
   - `skor_total` = ipk×25 + tugas×0.5 + kehadiran×0.25
3. **Encoding** — `LabelEncoder` & `pd.get_dummies` (one-hot) untuk `kota`
4. **Standarisasi** — `StandardScaler` → mean ≈ 0, std ≈ 1 (z-score)

### Pipeline sklearn (Bagian 3 — "anti data leakage")

```python
# BENAR: split SEBELUM preprocessing!
X_tr, X_te, y_tr, y_te = train_test_split(
    X_raw, y_raw, test_size=0.25, random_state=42, stratify=y_raw)

num_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler()),
])
cat_pipe = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('ohe',     OneHotEncoder(handle_unknown='ignore')),
])
preprocessor = ColumnTransformer([
    ('num', num_pipe, num_feats),
    ('cat', cat_pipe, cat_feats),
])
pipe_knn = Pipeline([
    ('prep',  preprocessor),
    ('model', KNeighborsClassifier(n_neighbors=5)),
])

pipe_knn.fit(X_tr, y_tr)
acc_knn = pipe_knn.score(X_te, y_te)
cv_knn  = cross_val_score(pipe_knn, X_raw, y_raw, cv=5).mean()
```

> [!TIP]
> **Struktur ColumnTransformer**: kolom numerik lewat `imputer median → scaler`, kolom kategorik lewat `imputer most_frequent → one-hot`. Semua digabung satu Pipeline bersama modelnya, jadi `fit()` di data latih otomatis menjalankan preprocessing + model sekaligus — **dan tidak pernah "belajar" dari data uji**.

Prediksi mahasiswa baru (kode slide): input `ipk=3.2, absensi=5, tugas=78, kota=Bandung` → keluar `Lulus` / `Tidak`.

## Feature Engineering

**Definisi dosen:** proses membuat, mengubah, atau memilih fitur yang lebih informatif untuk meningkatkan performa model.

> [!NOTE]
> "Garbage in, garbage out" — model terbaik pun gagal jika fiturnya buruk.

### Teknik Umum

| Teknik | Contoh |
|---|---|
| Normalisasi/Standarisasi | skala 0–1 atau z-score |
| One-Hot Encoding | kategorik → biner |
| Binning | angka → kategori (usia → kelompok) |
| Polynomial features | x → x², x³, x₁·x₂ |
| Log transform | distribusi miring → normal |
| Interaction features | kombinasi dua fitur |

### Demo dari slide

| Sebelum | Sesudah |
|---|---|
| gaji=5000000, usia=25, kota=BDG | gaji_log=15.42, gaji_norm=0.45, gp_rasio=200000, kota_BDG=1, kelompok_usia='muda' |

### Missing Value Strategies

- **Mean/Median** — isi dengan rata-rata (numerik)
- **Mode** — isi dengan nilai terbanyak (kategorik)
- **KNN Imputer** — isi dari tetangga terdekat
- **Drop** — hapus baris/kolom (**hati-hati bias!**)

## Praktik 2 — K-Means Clustering (Unsupervised)

Bagian 4 `week07_ml_pipeline.py`: segmentasi 250 pelanggan e-commerce dari 3 profil:

| Profil | Usia | Pengeluaran | Frekuensi |
|---|---|---|---|
| muda, hemat, sering beli | 25 | 300 | 15 |
| dewasa, boros, sesekali | 40 | 650 | 8 |
| senior, moderat, jarang | 58 | 420 | 4 |

### Menentukan k optimal — Elbow & Silhouette

```python
X_cust = StandardScaler().fit_transform(df_cust)

for k in range(2, 9):
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_cust)
    inertia_list.append(km.inertia_)
    sil_list.append(silhouette_score(X_cust, km.labels_))
```

- **Elbow method** — plot inertia vs k; titik "tekukan" = k optimal (di sini k=3).
- **Silhouette score** — skor [-1, 1]; makin tinggi, makin jelas klasternya.

Label segmen yang dipakai dosen: `High Spender Dewasa`, `Frequent Buyer Muda`, `Senior Low Frequency` — masing-masing diberi **rekomendasi bisnis** (promo premium / loyalty points / reminder email).

> [!NOTE]
> Data di-**standarisasi dulu** sebelum K-Means (`StandardScaler`), karena K-Means menghitung jarak Euclidean — kalau skala fitur beda jauh, fitur berskala besar akan mendominasi.

## Supervised vs Unsupervised — Kapan Pakai Mana?

| Aspek | 🏷️ Supervised | 🔍 Unsupervised |
|---|---|---|
| Label Data | Perlu label y untuk setiap X | Tidak perlu label sama sekali |
| Tujuan | Prediksi/klasifikasi target baru | Temukan pola/struktur tersembunyi |
| Evaluasi | Akurasi, F1, MSE (ada ground truth) | Silhouette, Elbow (tidak ada ground truth) |
| Algoritma | KNN, Decision Tree, SVM, Neural Net | K-Means, DBSCAN, PCA, Autoencoders |
| Contoh | Deteksi spam, prediksi harga, diagnosis | Segmentasi pelanggan, anomaly detection |

**Gunakan Supervised jika:** punya data berlabel cukup; tujuan jelas (prediksi/klasifikasi); butuh akurasi terukur.

**Gunakan Unsupervised jika:** tidak punya label / labeling mahal; eksplorasi data baru; segmentasi / anomaly detection.

### Semi-Supervised / Self-Supervised

- Label sedikit, data banyak
- Dasar pre-training LLM (GPT, BERT)
- Label propagation

## Praktik 3 — Full ML Pipeline: Titanic Dataset

Bagian 5 `week07_ml_pipeline.py` (end-to-end):

### 1. Feature Engineering

```python
df_titanic['family_size'] = df_titanic['sibsp'] + df_titanic['parch'] + 1
df_titanic['alone']       = (df_titanic['family_size'] == 1).astype(int)
df_titanic['fare_log']    = np.log1p(df_titanic['fare'])
```

Fitur: numerik `age, fare_log, family_size, pclass`; kategorik `sex, embarked, alone`; target `survived`.

### 2. Split → Pipeline → Training

`train_test_split(test_size=0.2, random_state=42, stratify=y)` lalu ColumnTransformer (numerik: median imputer + scaler; kategorik: most_frequent imputer + one-hot).

### 3. Evaluasi: 4 model dibandingkan

| Model | Param utama |
|---|---|
| KNN(k=5) | n_neighbors=5 |
| DecisionTree | max_depth=5 |
| RandomForest | n_estimators=100 |
| SVM | kernel='rbf', C=1.0 |

Dilaporkan **Test Acc, CV-5 Acc, dan CV Std** — lalu model terbaik dipilih berdasarkan CV. Juga ada **Feature Importance** dari Random Forest (top 8 fitur, misalnya `sex_male`, `age`, `fare_log`).

### 4. Hyperparameter Tuning — GridSearchCV (Bagian 6)

```python
param_grid = {
    'model__n_neighbors': [3, 5, 7, 9, 11, 15],
    'model__weights':     ['uniform', 'distance'],
    'model__metric':      ['euclidean', 'manhattan'],
}
gs = GridSearchCV(pipe_cv, param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X_tr_t, y_tr_t)
```

> [!TIP]
> Awalan `model__` = cara sklearn menunjuk step di dalam Pipeline. GridSearchCV otomatis cari kombinasi hyperparameter terbaik dengan cross-validation.

## Tugas Sesi 7

- Gunakan dataset **tips** dari Seaborn. Buat pipeline lengkap: imputasi → encoding → scaler → KNN. Hitung akurasi dengan cross-validation 5-fold.
- Terapkan K-Means pada dataset mahasiswa buatanmu (IPK, absensi, nilai tugas) — bagi jadi 3 klaster, beri nama tiap klaster.
- Identifikasi dan perbaiki **data leakage** pada pipeline yang salah ini: `scaler.fit(X_all)` → split → train model.

**Tantangan bonus:** bandingkan 4 algoritma (KNN, DT, RF, SVM) pada Titanic sebagai bar chart; coba `PolynomialFeatures`; `GridSearchCV` untuk tuning `n_neighbors`.

File praktik lengkap: `week07_ml_pipeline.py` (butuh `pip install scikit-learn pandas seaborn matplotlib`).

```quiz
Q: Apa urutan pipeline ML end-to-end menurut slide sesi 7?
+ Data mentah → preprocessing → train/test split → training → evaluasi → deploy
- Data mentah → training → preprocessing → deploy → evaluasi
- Train/test split → data mentah → training → evaluasi
> Urutan ini penting; langkah preprocessing dan split yang salah urutnya bisa memicu data leakage.

Q: Dalam supervised learning, apa itu "label"?
+ y yang menjelaskan jawaban benar untuk setiap input X
- Fitur input ke model
- Jumlah baris dalam dataset
> Supervised = setiap X punya y. Klasifikasi (y kategori) vs regresi (y angka).

Q: Apa itu data leakage?
+ Informasi dari data test bocor ke proses training sehingga akurasi palsu tinggi
- Data yang hilang dari dataset
- Kolom yang tidak relevan
> Solusi dosen: selalu split data SEBELUM preprocessing.

Q: Kenapa split data harus dilakukan sebelum preprocessing?
+ Agar estimator/scaler hanya "belajar" statistik dari data latih, bukan data uji
- Agar kode berjalan lebih cepat
- Agar tidak perlu cross-validation
> Kalau scaler.fit() dijalankan di seluruh data, info data uji bocor ke training → evaluasi tidak adil.

Q: Kapan kamu memilih unsupervised learning?
+ Saat tidak punya label / labeling mahal dan mau eksplorasi pola
- Saat butuh akurasi terukur dengan ground truth
- Saat tujuan jelas prediksi kelas tertentu
> Evaluasi unsupervised pakai Silhouette/Elbow karena tidak ada ground truth.

Q: Apa fungsi Elbow Method pada K-Means?
+ Menentukan jumlah klaster (k) optimal dari titik tekukan inertia
- Mengukur akurasi klasifikasi
- Menghapus outlier dari data
> inertia = total jarak dalam klaster; makin besar k makin kecil, dan titik "tekukan" menandai k optimal.

Q: Kenapa fitur harus di-standarisasi sebelum K-Means?
+ Karena K-Means pakai jarak Euclidean, fitur berskala besar akan mendominasi
- Agar K-Means berjalan tanpa GPU
- Agar jumlah klaster jadi 3
> StandardScaler membuat mean=0 dan std=1 sehingga semua fitur berkontribusi seimbang.

Q: Apa itu feature engineering menurut dosen?
+ Membuat, mengubah, atau memilih fitur yang lebih informatif untuk model
- Menghapus sebagian besar data agar cepat
- Menambah layer neural network
> "Garbage in, garbage out" — model terbaik pun gagal kalau fiturnya buruk.

Q: Apa keunggulan menggabungkan preprocessing + model dalam satu sklearn Pipeline?
+ Anti data leakage — fit di data latih otomatis menjalankan semua langkah, dan mudah dipakai ulang di data baru
- Membuat model lebih cepat training
- Menghapus kebutuhan train_test_split
> Pipeline juga bikin prediksi data baru aman: semua transformasi yang sama ikut diterapkan.

Q: Apa fungsi GridSearchCV pada praktik akhir sesi 7?
+ Mencari kombinasi hyperparameter terbaik lewat cross-validation (mis. n_neighbors KNN)
- Menghapus fitur yang tidak penting
- Mengubah klasifikasi jadi clustering
> Contoh grid: n_neighbors [3,5,7,9,11,15], weights [uniform,distance], metric [euclidean,manhattan].
```