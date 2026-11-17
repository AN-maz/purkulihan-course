# Pertemuan 11 — Klastering & Evaluasi Model

Catatan dari materi dosen `Machine_Learning_and_Evaluation_Metric.md` bagian 5
(klastering) + bagian 8 (metrik evaluasi lengkap). Pertemuan ini nutup dua topik:
**klastering tanpa label** dan **cara menilai semua jenis model**.

## 1. Klastering — konsep

**Klastering** mengelompokkan data **tanpa label**. Model cari kelompok yang
anggotanya mirip satu sama lain & beda dari kelompok lain.

**K-Means** (algoritma paling umum):

```
Pilih k → taruh k centroid acak → tiap titik masuk ke centroid terdekat
→ hitung ulang centroid (rata-rata anggota) → ulang sampai centroid berhenti pindah
```

> [!WARN]
> K-Means pakai **jarak** → **scaling wajib**. Juga: `k` harus ditentukan di
> awal, jadi butuh metode buat milih `k`.

## 2. Dataset contoh: UCI Wholesale Customers

440 pelanggan grosir (hotel/restoran/kafe & toko ritel) di Portugal, pengeluaran
tahunan per kategori produk.

| Kolom | Keterangan |
|---|---|
| `Channel` | 1 = Horeca, 2 = Retail |
| `Region` | 1 = Lisbon, 2 = Oporto, 3 = Lainnya |
| `Fresh`, `Milk`, `Grocery`, `Frozen`, `Detergents_Paper`, `Delicassen` | pengeluaran tahunan per kategori |

> [!NOTE]
> `Channel` & `Region` **bukan perilaku belanja** → gak dipakai buat bentuk klaster.
> Dipakai belakangan buat cek apakah klaster berkaitan dgn jenis pelanggan.

## 3. Feature engineering buat klastering

Pengeluaran biasanya **sangat miring** (sedikit pelanggan besar dominan). Log
transform + scaling bikin tiap kategori produk kontribusi **adil** ke jarak.

```python
prep = Pipeline([("log", FunctionTransformer(np.log1p)),
                 ("skala", StandardScaler())])
Xt = prep.fit_transform(X)
```

## 4. Memilih jumlah klaster `k`

| Metode | Cara baca |
|---|---|
| **Elbow (inertia)** | jumlah jarak kuadrat ke centroid; turun terus saat k naik → pilih di titik "siku" saat penurunan mulai melandai |
| **Silhouette** | rentang −1..1, makin tinggi makin baik; seberapa rapat tiap titik ke klasternya vs klaster lain |

```python
for k in range(2, 9):
    km = KMeans(n_clusters=k, n_init=10, random_state=42).fit(Xt)
    sil = silhouette_score(Xt, km.labels_)
    print(f"k={k}  inertia={km.inertia_:8.1f}  silhouette={sil:.3f}")
```

> [!IMPORTANT]
> Hasil **terbaik statistik belum tentu paling bermakna bisnis** — periksa juga
> profil tiap klaster.

## 5. Profil klaster & interpretasi

```python
model = Pipeline([("prep", prep), ("kmeans", KMeans(n_clusters=3, n_init=10, random_state=42))])
label = model.fit_predict(X)
profil = hasil.groupby("cluster")[FITUR].mean().round(0)
```

Tiap klaster dikasih nama berdasar pola pengeluaran (misal "belanja besar Fresh"
atau "pembeli kebutuhan rumah tangga"). Nama itu yang bikin hasil klastering
**bisa dipakai tim bisnis**: strategi promosi/harga/stok beda per klaster.

---

## 6. Metrik evaluasi — prinsip umum

- **Hitung di data yang belum pernah dipakai melatih** — skor di train hampir
  selalu terlalu optimistis.
- Pakai **cross-validation** (cv=5) buat banding model stabil, lalu evaluasi
  **sekali** di test.
- **Pilih metrik SEBELUM melatih**, berdasarkan biaya kesalahan. Misal deteksi
  penyakit: melewatkan pasien sakit (FN) lebih mahal → **recall lebih penting**.
- **Satu angka gak cukup** — laporkan beberapa metrik + gambaran kesalahan
  (confusion matrix / residual / profil klaster).

## 7. Confusion matrix — sumber semua metrik klasifikasi

| | Prediksi Lulus (1) | Prediksi Tidak Lulus (0) |
|---|---|---|
| **Aktual Lulus (1)** | **TP** | **FN** (miss) |
| **Aktual Tidak Lulus (0)** | **FP** (false alarm) | **TN** |

| Metrik | Rumus | Kapan dipakai |
|---|---|---|
| Accuracy | (TP+TN)/Total | kelas seimbang, semua kesalahan sama mahal |
| Precision | TP/(TP+FP) | false alarm mahal (blokir transaksi sah) |
| Recall | TP/(TP+FN) | melewatkan positif mahal (penyakit, fraud) |
| Specificity | TN/(TN+FP) | kebalikan recall, sering di bidang medis |
| F1 | 2·P·R/(P+R) | kelas gak seimbang, butuh satu angka |
| F-beta | (1+β²)·P·R/(β²·P+R) | β>1 tekankan recall, β<1 tekankan precision |
| ROC-AUC | luas bawah kurva ROC | banding model umum |
| PR-AUC | luas bawah kurva P-R | kelas positif sangat langka (fraud 0,5%) |

**Contoh hitungan** (TP=80, FN=20, FP=30, TN=70, total 200):
- Accuracy = (80+70)/200 = **0,75**
- Precision = 80/110 = **0,727**
- Recall = 80/100 = **0,80**
- F1 = **0,762**

> [!WARN]
> **Jebakan sering:**
> - **Accuracy paradox** — data 99% negatif, model selalu nebak negatif = 99% akurat tapi gak berguna.
> - **ROC-AUC terlihat bagus di data timpang** — kelas positif langka, ROC tinggi tapi precision rendah → pakai PR-AUC.
> - **Metrik dihitung di data train** → selalu optimistis.
> - **Threshold dipilih dari data test** → bikin skor test terlalu bagus.

## 8. Metrik regresi

| Metrik | Satuan | Kelebihan | Kekurangan |
|---|---|---|---|
| MAE | sama target | gampang dijelaskan, gak terlalu terpengaruh outlier | gak menghukum error besar |
| MSE | kuadrat target | turunannya mulus, sering jadi loss | satuan sulit baca, sensitif outlier |
| RMSE | sama target | satuan jelas, hukum error besar | tetap sensitif outlier |
| R² | tanpa satuan | mudah banding antar-dataset | bisa negatif, gak nunjukin besar error |
| MAPE | persen | gampang dipahami ("meleset 8%") | tak terdefinisi kalau y=0, asimetris |

**Contoh** (asli `[3,5,2.5,7]`, pred `[2.5,5,4,8]`): MAE = 0,75 (meleset 75.000 USD),
RMSE ≈ 0,935. **RMSE > MAE** karena error 1,5 dihitung lebih berat.

> [!TIP]
> Cek **residual** (`y − ŷ`) — idealnya tersebar acak di sekitar nol. Kalau
> membentuk pola, model melewatkan sebagian pola data.

## 9. Metrik klastering

**Internal (tanpa label):**

| Metrik | Arah | Arti |
|---|---|---|
| Inertia (WCSS) | makin kecil makin rapat | selalu turun saat k naik → dipakai **elbow**, bukan banding k langsung |
| Silhouette | makin besar makin baik | (b−a)/max(a,b); mendekati 1 = jauh dari klaster lain; negatif = kemungkinan salah klaster |
| Davies-Bouldin | makin kecil makin baik | rasio sebaran tiap klaster vs jarak antar-klaster |
| Calinski-Harabasz | makin besar makin baik | rasio sebaran antar vs dalam klaster |

**Eksternal (dengan label asli):** **ARI** (−1..1, 1 sempurna, 0 seperti acak),
**NMI** (0..1). Label **gak dipakai buat melatih** K-Means, cuma evaluasi.

> [!IMPORTANT]
> **Jebakan klastering:** inertia gak bisa banding k langsung; silhouette &
> Calinski-Harabasz suka klaster **berbentuk bola** (klaster memanjang/melengkung
> bisa salah pilih k → cek visualisasi PCA 2D); skor bagus belum tentu bermakna;
> **scaling mengubah hasil**.

## 10. Ringkasan: metrik apa untuk apa

| Jenis | Metrik utama | Pendamping | Hindari jika |
|---|---|---|---|
| Klasifikasi seimbang | Accuracy, F1 | ROC-AUC, confusion matrix | cuma accuracy buat kelas timpang |
| Klasifikasi gak seimbang | F1, recall, PR-AUC | Precision, balanced accuracy | accuracy doang |
| Regresi | MAE, RMSE | R², MAPE, residual | MAPE kalau target bisa nol |
| Klastering tanpa label | Silhouette, Davies-Bouldin | Inertia (elbow), Calinski-Harabasz | inertia buat banding jumlah k |
| Klastering dgn label | ARI, NMI | Silhouette | andalkan label saat melatih |

```quiz
Q: Kenapa K-Means butuh scaling?
+ K-Means pakai JARAK antar titik — fitur skala besar bakal dominan jaraknya
- K-Means butuh label
- K-Means gak bisa handle angka
- Supaya kodenya lebih rapi
> Sama kayak KNN: jarak gak adil kalau skala fitur beda-beda.

Q: Dua metode buat milih jumlah klaster k?
+ Elbow (inertia) dan silhouette score
- Accuracy dan F1
- MAE dan RMSE
- Precision dan recall
> Elbow cari titik "siku"; silhouette makin tinggi makin baik (rentang -1..1).

Q: Kenapa inertia gak bisa dipakai langsung buat banding jumlah klaster?
+ Inertia SELALU turun saat k naik — makanya dipakai metode elbow, bukan dibandingkan langsung
- Karena inertia cuma buat data kecil
- Karena inertia butuh label
- Inertia gak ada hubungannya dgn k
> Kalau makin k makin kecil terus, k= banyak selalu "terbaik" — gak make sense.

Q: Silhouette score mendekati -1 artinya apa?
+ Titik kemungkinan salah masuk klaster (lebih dekat ke klaster lain)
- Klaster sangat rapat
- Model sempurna
- Data sudah normal
> -1 = salah klaster, 0 = di perbatasan, 1 = jauh dari klaster lain.

Q: Metrik klastering yang dipakai kalau data PUNYA label asli?
+ ARI dan NMI (metrik eksternal)
- Inertia dan silhouette
- MAE dan RMSE
- Accuracy dan recall
> Label dipakai buat EVALUASI doang, bukan buat melatih K-Means.

Q: Kenapa accuracy paradox berbahaya?
+ Data 99% negatif → model selalu nebak negatif = 99% akurat tapi gak berguna
- Karena accuracy gak bisa dihitung
- Karena model overfitting
- Karena data terlalu bersih
> Solusinya: pakai recall, PR-AUC, atau balanced accuracy.

Q: Kapan PR-AUC lebih informatif daripada ROC-AUC?
+ Saat kelas positif sangat langka (misal fraud 0,5%) — ROC tinggi tapi precision bisa rendah
- Saat data sudah seimbang
- Saat model sudah sempurna
- Gak pernah, ROC selalu lebih baik
> Di data timpang ekstrem, PR-AUC nunjukin kenyataan yang ROC sembunyikan.

Q: Rumus F1?
+ 2 × Precision × Recall / (Precision + Recall)
- (Precision + Recall) / 2
- Precision × Recall
- TP + TN / Total
> F1 = rata-rata harmonik P & R, jadi butuh DUA-duanya tinggi buat tinggi.

Q: RMSE lebih besar dari MAE menandakan apa?
+ Ada error besar yang perlu diperiksa (RMSE hukum error besar lebih berat)
- Model sudah bagus
- Data sudah bersih
- Tidak ada hubungan
> RMSE kuadratin selisih → outlier besar dorong naik; selisih RMSE-MAE besar = ada error besar.

Q: Kenapa MAPE gak bisa dipakai kalau target bernilai nol?
+ MAPE bagi selisih dengan nilai asli — kalau nilai = 0 hasilnya tak terdefinisi
- Karena MAPE cuma buat klasifikasi
- Karena target selalu nol
- MAPE gak butuh prediksi
> Alternatifnya: pakai MAE atau RMSE buat target yang bisa nol.

Q: Metrik INTERNAL klastering yang rentangnya -1 sampai 1?
+ Silhouette
- Inertia
- Davies-Bouldin
- Calinski-Harabasz
> Inertia >=0 (makin kecil makin rapat), DB >=0, CH >=0; silhouette satu-satunya yang bisa negatif.

Q: Kenapa metrik harus dipilih SEBELUM melatih model?
+ Karena pilih metrik berdasarkan biaya kesalahan — salah pilih bikin optimasi arah yang salah
- Supaya hemat waktu
- Karena sklearn minta begitu
- Karena metrik butuh data train
> Contoh: penyakit → FN mahal → recall; deteksi spam → FP mahal → precision.
```