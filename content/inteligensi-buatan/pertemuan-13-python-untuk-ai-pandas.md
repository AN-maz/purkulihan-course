# Pertemuan 13 — Python untuk AI: Pandas & Scikit-Learn

Catatan dari materi dosen `Hands-On-Session3.md` ("Praktik Pandas: Manipulasi
Data dan Feature Engineering", 14 langkah + latihan mandiri). Ini praktik inti
pertemuan: **manipulasi data pakai Pandas** yang jadi bekal semua proyek ML.

## 0. Peta 14 langkah (dari materi dosen)

| # | Langkah | Fungsi utama |
|---|---|---|
| 0 | Persiapan | install `pandas numpy matplotlib seaborn` |
| 1 | Membuat dataset | `pd.DataFrame` + tabel diskon buat latihan merge |
| 2 | Inspeksi data | `df.head()`, `df.info()`, `df.describe()` |
| 3 | Seleksi data | `loc`/`iloc`, boolean filtering |
| 4 | Manipulasi kolom | tambah kolom, `sort_values`, `apply` |
| 5 | Groupby & agregasi | `groupby`, statistik per kategori/user |
| 6 | Merge & pivot | `merge`, `pivot_table` |
| 7 | Transformasi string | bersihkan teks, ekstraksi regex |
| 8 | Transformasi datetime | `to_datetime`, ekstrak komponen (hari, bulan) |
| 9 | Binning | `pd.cut` → segmen |
| 10 | Encoding | ordinal/nominal → angka |
| 11 | Scaling | `StandardScaler`/`MinMaxScaler` |
| 12 | Feature extraction | bikin fitur baru |
| 13 | Seleksi fitur | korelasi → buang fitur lemah |
| 14 | Pipeline end-to-end | gabung semua jadi satu pipeline |

## 1. Seleksi data — `loc` vs `iloc`

```python
df.loc[0:4, "harga"]              # label-based (butuh nama indeks/kolom)
df.iloc[0:4, 2]                   # position-based (angka urutan)
df[df["harga"] > 1_000_000]       # boolean filtering
df[(df["status"] == "Selesai") | (df["status"] == "Dikirim")]
```

> [!IMPORTANT]
> `loc` = berdasarkan **label**, `iloc` = berdasarkan **posisi angka**. Ini dua
> hal yang sering ketuker dan bikin bug sulit ditemukan.

## 2. Groupby, merge & pivot

```python
# Statistik per kategori
df.groupby("kategori").agg(rata_harga=("harga", "mean"),
                           total=("harga", "sum"))

# Merge dengan tabel diskon
df.merge(tabel_diskon, on="kategori", how="left")

# Pivot: baris = kategori, kolom = kota
pd.pivot_table(df, values="harga", index="kategori",
               columns="kota", aggfunc="mean")
```

## 3. String, datetime, binning

```python
# String: bersihkan + ekstraksi
df["kota_bersih"] = df["kota"].str.strip().str.title()
df["kode"] = df["kode"].str.extract(r"(\d+)")

# Datetime
df["tanggal"] = pd.to_datetime(df["tanggal"])
df["hari"]  = df["tanggal"].dt.day_name()
df["bulan"] = df["tanggal"].dt.month

# Binning
df["segmen_harga"] = pd.cut(df["harga"],
    bins=[0, 100_000, 500_000, np.inf],
    labels=["murah", "sedang", "mahal"])
```

## 4. Encoding & scaling (sambungan ke P9)

```python
# Ordinal: ada urutan
df["status_enc"] = df["status"].map({"Pending":0, "Dikirim":1, "Selesai":2})

# Nominal: one-hot
pd.get_dummies(df, columns=["kota"], drop_first=True)

# Scaling
from sklearn.preprocessing import StandardScaler
X_scaled = StandardScaler().fit_transform(X)   # rata-rata 0, SD 1
```

## 5. Seleksi fitur dengan korelasi

Lihat korelasi antarfitur & terhadap target; buang yang lemah atau **redundan**
(kolinearitas — ingat `nilai_rata_rata` di P9).

```python
print(df.corr(numeric_only=True)["target"].sort_values(ascending=False))
```

## 6. Pipeline end-to-end (Langkah 14)

Semua langkah di atas digabung jadi satu `Pipeline` sklearn — **satu objek**
`fit`/`predict`, anti data leakage:

```python
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

pre = ColumnTransformer([
    ("num", Pipeline([("imp", SimpleImputer(strategy="median")),
                      ("scl", StandardScaler())]), ["ipk","absensi"]),
    ("cat", Pipeline([("ohe", OneHotEncoder(handle_unknown="ignore"))]), ["kota"]),
])
pipe = Pipeline([("prep", pre), ("model", KNeighborsClassifier(n_neighbors=5))])
pipe.fit(X_train, y_train)
```

## 7. Latihan mandiri (dari materi)

4 soal wajib: seleksi & filtering, groupby & agregasi, string & datetime,
feature engineering + tantangan analisis korelasi fitur.

> [!TIP]
> Praktik ini **langsung nyambung ke UTS**: soal UTS `UTS/soal_klasifikasi_10_kasus.md`
> minta kamu pakai Pandas buat bersihkan + preprocess 10 dataset berbeda.

```quiz
Q: Beda .loc dan .iloc?
+ loc = berdasarkan LABEL (nama indeks/kolom); iloc = berdasarkan POSISI angka
- loc = posisi, iloc = label
- Dua-duanya label
- Dua-duanya posisi
> Ini sumber bug paling sering di Pandas — salah salah satu, indeksnya geser.

Q: Apa fungsi pivot_table?
+ Merapikan data: baris = satu kategori, kolom = lain, isi = hasil agregasi (mean/sum)
- Menghapus duplikat
- Membuat chart
- Mengubah tipe data
> Contoh materi: baris = jenis sekolah, kolom = pendidikan ortu, isi = persentase lulus.

Q: pd.cut dipakai untuk apa?
+ Binning — mengelompokkan angka jadi kategori (misal harga → murah/sedang/mahal)
- Menghapus missing value
- Mengurutkan data
- Mengganti nama kolom
> Binning membuang detail angka, jadi pakai kalau ada alasan bisnis.

Q: Kenapa langkah 14 (pipeline) penting?
+ Semua preprocessing jadi SATU objek yang fit hanya dari train — anti data leakage & gampang deploy
- Supaya kodenya sedikit
- Karena Pandas gak bisa tanpa pipeline
- Biar model lebih akurat otomatis
> Pipeline = imputer/scaler/encoder terikat ke data train, persis pola P9.

Q: get_dummies(df, drop_first=True) — kenapa drop_first?
+ Menghindari jebakan dummy (multikolinearitas) pada model linear
- Supaya kolomnya lebih sedikit aja
- Karena pandas versi lama
- Supaya data lebih cepat dibaca
> Tanpa drop_first, kolom dummy saling berkorelasi sempurna → koefisien linear gak stabil.

Q: Yang termasuk transformasi string di langkah 7?
+ .str.strip(), .str.title(), ekstraksi regex
- pd.cut
- StandardScaler
- groupby
> Bersihin spasi, kapitalisasi, ekstrak pola (regex) dari kolom teks.

Q: Bagaimana cara korelasi dipakai buat seleksi fitur?
+ Lihat korelasi fitur terhadap target — buang yang lemah atau redundan
- Buang semua fitur yang korelasinya > 0.9
- Pilih fitur secara acak
- Korelasi cuma buat visualisasi
> Korelasi rendah = info minim ke target; dua fitur korelasi tinggi = redundan (kolinearitas).

Q: Dataset UTS memakai teknik Pandas yang mana?
+ Semua: cleaning, seleksi, groupby, encoding, scaling — 10 dataset beda kasus
- Hanya plotting
- Hanya membaca CSV
- Hanya menghapus kolom
> UTS praktik langsung: 10 kasus klasifikasi, dari data mentah sampai model.
```