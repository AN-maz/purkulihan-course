# Pertemuan 9 — Preprocessing & Cleaning Data

Catatan dari materi dosen `Machine_Learning_and_Evaluation_Metric.md` bagian 2
(feature engineering) + `Hands-On-Session3.md` (praktik Pandas). Inti pertemuan
ini: **sebelum model apa pun dijalankan, data mentah wajib dibersihkan dan diubah
jadi fitur yang bermakna**.

## 0. Peta alur kerja

Setiap proyek ML mengikuti alur yang sama — yang beda cuma algoritma & metrik:

```
Data mentah → Audit kualitas → Feature engineering → Jenis masalah? → Evaluasi → Simpan pipeline → Aplikasi
```

| Jenis | Target (y) | Contoh | Metrik utama |
|---|---|---|---|
| Klasifikasi | Kategori | Apakah siswa lulus? | Precision, recall, F1 |
| Regresi | Angka kontinu | Berapa harga rumah? | MAE, RMSE, R² |
| Klastering | Tidak ada | Pelanggan mana yang mirip? | Inertia, silhouette |

- **Supervised** = ada target `y` (klasifikasi & regresi).
- **Unsupervised** = tanpa target, model cari pola sendiri (klastering).

> [!IMPORTANT]
> **Feature engineering sering memakan waktu terbesar** di proyek nyata. Model
> cuma sebaik data yang dikasih ke dia.

## 1. Audit data (urutan dari notebook)

Urutan: **duplikat → missing value → outlier → tipe data → fitur turunan**.

| Langkah | Pertanyaan | Contoh notebook |
|---|---|---|
| Duplikat | Satu entitas muncul >1×? | 0 duplikat, dicek via `student_id` |
| Missing value | Berapa sel kosong & di kolom mana? | 511 sel (3,36%) di 17 kolom |
| Nilai gak masuk akal | Nilai mustahil secara domain? | 5 nilai mapel <10 (0,1,1,1,6) di skala 0–100 |
| Outlier | Ekstrem itu sah atau galat input? | Cek pagar IQR per grup |
| Tipe data | Angka tersimpan sebagai teks? | `usia` → integer nullable |
| Fitur turunan | Ada kolom hasil hitungan kolom lain? | `nilai_rata_rata` = rata-rata 5 mapel |

```python
print("Duplikat baris penuh :", df.duplicated().sum())
print("Duplikat per ID      :", df.duplicated(subset=["student_id"]).sum())
miss = df.isnull().sum()
print(miss[miss > 0].sort_values(ascending=False))
```

## 2. Missing value — 4 cara

- **Buang baris** — aman cuma kalau jumlahnya sangat kecil.
- **Isi statistik** — `median` numerik (tahan outlier), `modus` kategorik.
- **Kategori tersendiri** (`"Tidak diketahui"`) — kalau ketiadaan data justru informatif.
- **Model-based** (`IterativeImputer`) — kasus kompleks.

> [!WARN]
> **Aturan emas: nilai pengisi harus dihitung dari DATA TRAIN SAJA.** Ini
> nyambung ke data leakage di bawah — pelanggaran paling sering terjadi di sini.

## 3. Data leakage — jebakan paling sering

Data leakage = info data uji "bocor" ke proses pelatihan. Akibatnya skor
kelihatan bagus, tapi **gagal di data baru**.

```python
# SALAH: median dihitung dari SELURUH data, baru split
df["nilai_ipa"] = df["nilai_ipa"].fillna(df["nilai_ipa"].median())
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# BENAR: split DULU, lalu pipeline (fit) hanya dari data train
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
pipeline.fit(X_train, y_train)   # imputer/scaler/encoder dihitung dari train saja
pipeline.predict(X_test)         # data test cuma ditransformasi
```

## 4. Fitur redundan & kolinearitas

Kalau satu kolom hasil hitungan dari kolom lain, masukin keduanya **gak nambah
informasi** & bisa bikin model gak stabil. Di notebook, `nilai_rata_rata` selisihnya
~0,0 dengan rata-rata 5 mapel → **dikeluarkan dari fitur** (tetap disimpan di data bersih).

```python
selisih = (df[mapel].mean(axis=1) - df["nilai_rata_rata"]).abs()
print("Selisih maksimum:", selisih.max())   # kalau ~0, kolom ini turunan
```

## 5. Encoding — kategori jadi angka

| Jenis kategori | Contoh | Teknik | Catatan |
|---|---|---|---|
| Nominal (gak ada urutan) | `jenis_sekolah`: Negeri/Swasta | `OneHotEncoder(drop="first")` | `drop="first"` hindari jebakan dummy di model linear |
| Ordinal (ada urutan) | `pendidikan_orang_tua`: SD<SMP<SMA<S1<S2 | `OrdinalEncoder(categories=[urutan])` | Urutan harus **eksplisit**, jangan diserahkan ke alfabet |

> [!NOTE]
> Notebook awal memasukkan `pendidikan_orang_tua` sebagai one-hot. Itu gak salah,
> tapi **kehilangan info bahwa S2 "lebih tinggi" dari SD**. Materi ini pakai ordinal.

## 6. Scaling — menyamakan skala fitur

Model yang hitung **jarak** (KNN, K-Means, SVM) atau dioptimasi **gradien**
(Logistic Regression, Linear Regression, NN) **sensitif skala**. Fitur rentang
besar (pendapatan jutaan) bakal mendominasi fitur kecil (usia).

| Scaler | Hasil | Cocok |
|---|---|---|
| `StandardScaler` | rata-rata 0, SD 1 | sebagian besar kasus |
| `MinMaxScaler` | rentang 0–1 | distribusi gak mendekati normal |

> [!TIP]
> **Random Forest & pohon keputusan GAK butuh scaling**, karena pembagian pohon
> cuma membandingkan urutan nilai (bukan jarak absolut).

## 7. Transformasi & binning

- **`np.log1p`** buat data sangat miring (pengeluaran, jumlah penduduk).
- **`pd.cut` (binning)** kelompokin angka jadi kategori. Notebook pakai buat jam
  belajar: `<10`, `10–20`, `20–30`, `>30` jam. Binning **membuang detail** —
  pakai cuma kalau ada alasan bisnis yang jelas.

```python
df["log_jam_belajar"] = np.log1p(df["jam_belajar_per_minggu"])
df["kelompok_jam"] = pd.cut(df["jam_belajar_per_minggu"],
    bins=[0, 10, 20, 30, np.inf],
    labels=["<10 jam", "10-20 jam", "20-30 jam", ">30 jam"])
```

## 8. Analisis cepat sebelum modeling

Pakai `groupby`, `pivot_table`, `crosstab` dulu biar tahu fitur mana yang relevan.
Temuan dari notebook:

- Belajar **<10 jam/minggu** cuma **3,4%** lulus; **>30 jam** mencapai **99,6%**.
  Korelasi jam belajar ↔ kelulusan = **0,776**.
- Kehadiran <60% cuma 46,4% lulus; ≥90% = 77,5%. Tapi korelasinya cuma **0,217**.
- Tanpa internet & tanpa les privat: 51,5% lulus. Dengan keduanya: 68,2%.

```python
df["lulus"] = (df["status_kelulusan"] == "Lulus").astype(int)
print(df.groupby("kelompok_jam", observed=True)["lulus"].mean().mul(100).round(1))
```

## 9. Menggabungkan semuanya: ColumnTransformer

Daripada ngolah tiap kolom manual, semua langkah dibungkus satu objek yang bisa
di-`fit` & `transform` dengan aman:

```python
from sklearn.compose import ColumnTransformer

preprocess = ColumnTransformer([
    ("num", Pipeline([("imputer", SimpleImputer(strategy="median")),
                      ("scaler", StandardScaler())]), FITUR_NUM),
    ("ord", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")),
                      ("enc", OrdinalEncoder(categories=[URUTAN_PENDIDIKAN],
                          handle_unknown="use_encoded_value", unknown_value=-1))]), FITUR_ORD),
    ("nom", Pipeline([("imputer", SimpleImputer(strategy="most_frequent")),
                      ("ohe", OneHotEncoder(drop="first", handle_unknown="ignore",
                          sparse_output=False))]), FITUR_NOM),
])
```

Alurnya: kolom numerik → imputasi median → StandardScaler; pendidikan ortu →
imputasi modus → OrdinalEncoder; kolom nominal → imputasi modus → OneHotEncoder →
digabung jadi satu matriks fitur siap model.

```quiz
Q: Urutan audit data yang benar menurut materi dosen?
+ duplikat → missing value → outlier → tipe data → fitur turunan
- missing value → duplikat → tipe data → outlier → fitur turunan
- fitur turunan → duplikat → outlier → missing value → tipe data
- Tergantung dataset, urutannya bebas
> Materi pakai urutan notebook: duplikat → missing → outlier → tipe data → fitur turunan.

Q: Kenapa imputasi median harus dihitung dari data train saja?
+ Kalau dari seluruh data, info data uji bocor ke pelatihan (data leakage) — skor bagus tapi gagal di data baru
- Supaya lebih cepat
- Karena median gak bisa dihitung dari data test
- Supaya hasilnya presisi
> Ini inti data leakage. Yang benar: split dulu, baru pipeline fit hanya dari train.

Q: Apa itu data leakage?
+ Informasi dari data uji "bocor" ke proses pelatihan → skor terlihat bagus tapi gagal di data baru
- Data hilang saat pengiriman
- Kolom terhapus
- Model kekurangan memori
> Akibatnya overoptimisme: kelihatan bagus di lab, anjlok di data nyata.

Q: Fitur mana yang sebaiknya DIKELUARKAN dari model?
+ nilai_rata_rata (turunan dari 5 kolom nilai lain, selisih ~0)
- nilai_matematika
- jam_belajar_per_minggu
- persentase_kehadiran
> Kolom turunan redundant bikin model gak stabil & gak nambah informasi.

Q: Beda OneHotEncoder dan OrdinalEncoder?
+ OneHot buat kategori tanpa urutan; Ordinal buat kategori yang ADA urutannya
- OneHot buat angka, Ordinal buat teks
- Dua-duanya sama
- Ordinal buat nomor telepon
> OneHot(drop="first") hindari dummy trap; Ordinal butuh urutan EKSPLISIT (SD<SMP<SMA<S1<S2).

Q: Scaling TIDAK perlu untuk model mana?
+ Random Forest / pohon keputusan
- KNN
- K-Means
- Logistic Regression
> Pohon cuma membandingkan urutan nilai, bukan jarak absolut — jadi gak sensitif skala.

Q: Kapan np.log1p (transformasi log) dipakai?
+ Saat data sangat miring (skewed) seperti pengeluaran atau jumlah penduduk
- Saat data sudah normal
- Untuk mengubah kategori jadi angka
- Untuk menghapus missing value
> Log meratakan ekor panjang distribusi; model jarak/gradien jadi gak didominasi outlier.

Q: Kenapa ColumnTransformer lebih baik daripada olah kolom manual?
+ Semua langkah di dalam satu objek yang bisa fit/transform aman & anti-leakage
- Karena lebih sedikit baris kode
- Karena menghapus missing value otomatis
- Karena membuat model lebih akurat otomatis
> Satu pipeline = imputer/scaler/encoder terikat ke data train, gampang disimpan & dipakai ulang.

Q: Korelasi mana yang LEBIH KUAT dengan kelulusan di notebook?
+ jam belajar (0,776)
- kehadiran (0,217)
- akses internet
- les privat
> Temuan dosen: jam belajar mendominasi; kehadiran cuma 0,217 — cocok jadi alarm dini, bukan faktor utama.

Q: Metode buat data numerik sangat miring selain log?
+ binning (pd.cut) untuk mengelompokkan jadi kategori
- menghapus kolomnya
- mengubahnya ke string
- mengacak datanya
> Binning kelompokin jadi segmen (<10, 10-20, ...) — membuang detail, jadi pakai ada alasan bisnis.
```