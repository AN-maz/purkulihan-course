# Pertemuan 10 — Klasifikasi & Model

Catatan dari materi dosen `Machine_Learning_and_Evaluation_Metric.md` bagian 3
(klasifikasi) + 4 (regresi). Pertemuan ini masuk ke **model prediksi** pertama:
klasifikasi (label kategori) dan regresi (angka kontinu).

## 1. Klasifikasi — konsep

**Klasifikasi** memprediksi **label kategori** dari fitur.

- **Binary classification**: dua kelas (Lulus / Tidak Lulus).
- **Multiclass**: >2 kelas (Tidak lulus / Lulus / Lulus nilai terbaik).

Alur kerja klasifikasi:
1. Siapkan `X` (fitur) dan `y` (label)
2. Split jadi train & test (`stratify=y` kalau kelas gak seimbang)
3. `fit` pipeline di data train
4. `predict` di data test
5. Evaluasi pakai metrik yang sesuai

## 2. Tiga algoritma dari notebook

| Algoritma | Cara kerja | Catatan |
|---|---|---|
| **KNN** | mayoritas `k` tetangga terdekat | gak ada "pelatihan" parameter, model cuma nyimpan data → **scaling sangat penting** |
| **Logistic Regression** | model probabilitas via **fungsi sigmoid** | meski namanya "regresi", ini **klasifikasi** |
| **Naive Bayes** | probabilitas tiap kelas dgn asumsi fitur **independen** | `CategoricalNB` (kategorik bulat), `GaussianNB` (kontinu) |

```python
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import CategoricalNB

knn = KNeighborsClassifier(n_neighbors=3).fit(X, y)
clf = LogisticRegression(random_state=0).fit(X, y)
cnb = CategoricalNB().fit(X, y)
```

## 3. Regresi — konsep

**Regresi** memprediksi **angka kontinu** (harga, suhu, jumlah penjualan).

| Metrik | Arti | Satuan |
|---|---|---|
| MAE | rata-rata selisih absolut prediksi vs asli | sama dengan target |
| RMSE | akar rata-rata selisih kuadrat; **lebih sensitif error besar** | sama dengan target |
| R² | seberapa besar variasi target dijelaskan model (maks 1) | tanpa satuan |

- **Linear Regression**: hubungan linear `y = b0 + b1·x1 + ...`
- **Random Forest**: banyak pohon keputusan dirata-ratakan → tangkap hubungan **non-linear**

Dataset contoh: **California Housing** — 20.640 blok wilayah (sensus AS 1990),
target `MedHouseVal` dalam satuan **100.000 USD**.

```python
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression

for nama, reg in {"Linear Regression": LinearRegression(),
                  "Random Forest": RandomForestRegressor(n_estimators=200, random_state=42)}.items():
    pipe = Pipeline([("prep", buat_prep()), ("reg", reg)])
    pipe.fit(X_train, y_train)
    pred = pipe.predict(X_test)
    print(nama, mean_absolute_error(y_test, pred), r2_score(y_test, pred))
```

> [!IMPORTANT]
> Selalu **bandingkan dengan baseline sederhana** (Linear Regression) biar tahu
> apakah model yang lebih rumit (Random Forest) benar-benar layak dipakai.

## 4. Threshold — mengatur batas keputusan

Default `predict` pakai threshold **0,5** pada probabilitas. Kalau data gak
seimbang atau salah satu jenis kesalahan lebih mahal, threshold bisa diatur ulang:

```python
proba = model.predict_proba(X_test)[:, 1]
kandidat_t = np.arange(0.2, 0.81, 0.01)
skor_f1 = [f1_score(y_test, proba >= t) for t in kandidat_t]
threshold_terbaik = kandidat_t[int(np.argmax(skor_f1))]
```

## 5. Pemilihan model: cross-validation di data TRAIN

Kunci anti-leakage: **CV di data train** (bukan test), evaluasi **sekali** di test.

```python
kandidat = {
    "KNN (k=5)": KNeighborsClassifier(n_neighbors=5),
    "Logistic Regression": LogisticRegression(max_iter=2000, class_weight="balanced"),
}
for nama, clf in kandidat.items():
    pipe = Pipeline([("prep", preprocess), ("clf", clf)])
    skor = cross_val_score(pipe, X_train, y_train, cv=5, scoring="f1")
    print(f"{nama:22} F1 CV = {skor.mean():.3f} (± {skor.std():.3f})")
```

## 6. Interpretasi hasil (contoh notebook)

- **Jam belajar** = faktor paling menentukan. Ambang <20 jam/minggu bisa jadi
  dasar program pendampingan.
- **Akses internet & les privat** efeknya **menumpuk** → prioritas buat siswa
  yang gak punya keduanya.
- **Kehadiran rendah** cocok jadi **alarm dini** (cepat terdeteksi), tapi
  kehadiran sendirian gak cukup buat naikkan kelulusan.

## 7. Metrik evaluasi — kenapa accuracy doang gak cukup

Di data gak seimbang (61,6% Lulus vs 38,4% Tidak Lulus), **accuracy menyesatkan** —
model yang selalu nebak "Lulus" udah dapat 61,6% accuracy **tanpa belajar apa-apa**.

| Metrik | Rumus | Pertanyaan |
|---|---|---|
| Accuracy | (TP+TN)/Total | dari semua prediksi, berapa yang benar? |
| Precision | TP/(TP+FP) | dari yang diprediksi Lulus, berapa beneran Lulus? |
| Recall | TP/(TP+FN) | dari yang beneran Lulus, berapa ketangkep? |
| F1 | 2·P·R/(P+R) | keseimbangan precision & recall |

Keterangan: TP = benar positif, TN = benar negatif, FP = salah positif, FN = salah negatif.

```python
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred, target_names=["Tidak Lulus", "Lulus"]))
```

```quiz
Q: Apa beda binary classification dan multiclass?
+ Binary = 2 kelas (Lulus/Tidak Lulus); multiclass = lebih dari 2 kelas
- Binary = 2 model; multiclass = 1 model
- Binary pakai KNN, multiclass pakai Logistic
- Dua-duanya sama saja
> Contoh multiclass dosen: Tidak lulus / Lulus / Lulus nilai terbaik.

Q: Kenapa KNN sangat sensitif terhadap scaling?
+ KNN memprediksi berdasarkan JARAK ke tetangga — fitur skala besar mendominasi jarak
- KNN butuh banyak memori
- KNN gak bisa handle kategorik
- KNN selalu overfitting
> Makanya scaler wajib sebelum KNN.

Q: Logistic Regression disebut "regresi" tapi hasilnya apa?
+ Klasifikasi (label kategori) — namanya dari pemodelan probabilitas via sigmoid
- Regresi angka kontinu
- Klastering
- Kedua-duanya
> Jangan tertipu namanya: output Logistic = kelas, dipakai sigmoid buat probabilitas.

Q: Kenapa accuracy menyesatkan di data gak seimbang?
+ Model yang selalu nebak kelas mayoritas udah tinggi accuracy tanpa belajar
- Karena accuracy gak bisa dihitung
- Karena data terlalu banyak
- Karena accuracy butuh GPU
> Contoh: 61,6% Lulus → nebak "Lulus" selamanya = 61,6% accuracy, model berguna nol.

Q: Random Forest beda dari Linear Regression soal apa?
+ Random Forest tangkap hubungan NON-LINEAR (banyak pohon dirata-ratakan); Linear asumsikan linear
- Random Forest lebih cepat
- Linear Regression gak butuh data
- Dua-duanya identik
> Materi: RF biasanya R² lebih tinggi karena hubungan fitur gak sepenuhnya linear.

Q: Di mana cross-validation sebaiknya dijalankan?
+ Di data TRAIN, lalu evaluasi sekali di data test
- Di seluruh data
- Di data test
- Di data validasi yang udah di-tuning
> CV di train buat pemilihan model; test dipakai evaluasi akhir SEKALI biar gak bocor.

Q: Fungsi apa buat ubah threshold optimal?
+ Cari threshold yang memaksimalkan F1 di rentang 0.2-0.8
- Pakai default 0.5 selalu
- Pilih threshold acak
- Threshold gak bisa diubah
> Default 0,5 belum tentu optimal di data timpang; cari yang F1-nya tertinggi.

Q: Kenapa harus bandingkan dengan baseline Linear Regression?
+ Biar tahu apakah model rumit (Random Forest) benar-benar layak dipakai
- Supaya kodenya lebih banyak
- Karena RF selalu salah
- Biar training lama
> Kalau model kompleks gak ngalahin baseline sederhana, gak ada alasan pakai yang rumit.

Q: class_weight="balanced" pada Logistic Regression buat apa?
+ Mengimbangi kelas mayoritas supaya model gak bias ke satu kelas
- Membuat model lebih cepat
- Menghapus missing value
- Menambah jumlah fitur
> Data 61.6/38.4 → balanced bikin model belajar dari kelas minoritas juga.

Q: Metrik buat mengukur "dari yang diprediksi positif, berapa yang benar"?
+ Precision
- Recall
- Accuracy
- Specificity
> Precision = TP/(TP+FP). Recall kebalikannya: dari yang beneran positif, berapa ketangkep.
```