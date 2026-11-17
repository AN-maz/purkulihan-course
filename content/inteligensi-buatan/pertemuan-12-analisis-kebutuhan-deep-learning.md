# Pertemuan 12 — Analisis Kebutuhan & Pemilihan Metode AI

> [!WARN]
> **Materi dosen untuk pertemuan ini (Deep Learning & Computer Vision) BELUM ADA
> di course bank.** Isi catatan ini disusun dari **RPS + referensi luar valid**
> (lihat `references.md`). Bagian yang bukan dari dosen ditandai eksplisit.
> Kalau dosen nanti ngasih materi, bagian ini wajib direvisi.

## 1. Dari RPS: apa yang dibahas pertemuan ini

Menurut rencana per pertemuan di course bank dosen (`README.md`), pertemuan 12
bahas dua hal:

| Bagian | Sumber | Isi |
|---|---|---|
| **Analisis kebutuhan & pemilihan metode** | RPS (materi dosen) | perumusan masalah, pemilihan metode, desain arsitektur solusi AI |
| **Deep Learning & Computer Vision** | *Tambahan modern* (belum ada file materi) | neural network, CNN, transfer learning |

## 2. Analisis kebutuhan & pemilihan metode *(dari RPS)*

Sebelum nulis kode model, langkah wajib dari dosen:

1. **Analisis kebutuhan** — masalah apa yang mau diselesaikan? apakah ini
   klasifikasi/regresi/clustering? (ingat peta alur P9: jenis masalah tentukan
   algoritma & metrik)
2. **Perumusan masalah** — ubah masalah bisnis jadi masalah ML yang terukur
   (misal: "prediksi siswa berisiko tidak lulus" → klasifikasi biner, target `status_kelulusan`)
3. **Pemilihan metode** — pilih family algoritma sesuai jenis data & masalah
4. **Desain arsitektur solusi** — alurnya: data → preprocessing → model → evaluasi → deploy
   (peta yang sama dengan bagian 1 di P9)

> [!TIP]
> Aturan praktisnya sederhana: **kategorik → klasifikasi**, **angka → regresi**,
> **tanpa label → clustering**. Metrik pilih SEBELUM melatih (P11).

## 3. Deep Learning & Neural Network *(bukan dari slide dosen — referensi luar)*

Sumber: dokumentasi resmi PyTorch (https://pytorch.org/tutorials/) dan Keras/TensorFlow.

- **Neural network**: kumpulan neuron tersusun lapis (layer) — input → hidden → output.
  Tiap koneksi punya **bobot** yang dilatih via **backpropagation** + gradient descent.
- **Deep learning** = NN dengan banyak lapis (deep = lapis dalam) — otomatis belajar
  fitur dari data mentah (beda dari ML klasik yang butuh **feature engineering manual**).
- **CNN (Convolutional Neural Network)**: arsitektur khusus **gambar** — lapisan
  convolution mengekstrak pola (tepi, tekstur, bentuk) → cocok buat Computer Vision.
- **Transfer learning**: pakai bobot model yang sudah dilatih di dataset besar
  (misal ImageNet), lalu di-fine-tune ke data sendiri → hemat data & komputasi.

> [!NOTE]
> Hubungan ke materi dosen: di P9–P11 semua model masih **scikit-learn** (KNN,
> Logistic, Random Forest, K-Means) yang butuh **fitur tangan**. Deep learning
> menghapus kebutuhan itu untuk data mentah (gambar/teks), tapi butuh **data jauh
> lebih banyak** dan komputasi lebih berat.

```quiz
Q: Menurut RPS, pertemuan 12 bahas dua hal utama apa?
+ Analisis kebutuhan/perumusan masalah/pemilihan metode + Deep Learning & Computer Vision
- Hanya Python dasar
- Hanya deployment API
- Hanya Streamlit
> Dua bagian itu yang tercatat di rencana per pertemuan course bank dosen.

Q: Kenapa analisis kebutuhan harus SEBELUM nulis kode model?
+ Karena jenis masalah (klasifikasi/regresi/clustering) menentukan algoritma & metrik — salah pilih arah, salah semua
- Supaya kodenya rapi
- Karena sklearn minta begitu
- Biar training cepat
> Masalah bisnis harus dulu diubah jadi masalah ML terukur.

Q: Beda deep learning dan machine learning klasik (scikit-learn) di cara dapat fitur?
+ DL belajar fitur otomatis dari data mentah; ML klasik butuh feature engineering manual
- DL gak butuh data
- ML klasik selalu lebih akurat
- Dua-duanya identik
> Ini alasan DL dominan di gambar/teks — fiturnya gak bisa dibuat manual.

Q: Apa fungsi CNN?
+ Arsitektur buat gambar — convolution ekstrak pola (tepi, tekstur, bentuk)
- Menghitung regresi harga
- Mengelompokkan data tanpa label
- Mengompres file
> CNN = Convolutional Neural Network, basis Computer Vision.

Q: Transfer learning itu apa?
+ Pakai bobot model yang sudah dilatih di dataset besar lalu di-fine-tune ke data sendiri
- Melatih dari nol pakai GPU mahal
- Menghapus data latih
- Mengubah klasifikasi jadi regresi
> Hemat data & komputasi — model ImageNet di-fine-tune ke foto sendiri.

Q: Kalau masalahnya "prediksi harga rumah", ini termasuk jenis apa?
+ Regresi (target angka kontinu)
- Klasifikasi biner
- Clustering
- Clustering + regresi
> Angka kontinu → regresi (metrik MAE/RMSE/R²). Kategori → klasifikasi; tanpa label → clustering.

Q: Kenapa deep learning butuh data jauh lebih banyak daripada scikit-learn?
+ Banyak bobot di banyak lapis yang harus dihitung — data sedikit = overfitting parah
- Karena DL ditulis dalam bahasa lain
- Karena DL gak bisa pakai CPU
- Karena DL selalu error
> Model makin besar, makin banyak contoh yang dibutuhkan biar bobotnya bermakna.

Q: Kenapa materi Deep Learning di catatan ini ditandai "bukan dari slide dosen"?
+ Karena file materi pertemuan 12 belum ada di course bank — isinya dari referensi luar
- Karena dosen melarang
- Karena topiknya rahasia
- Karena teksnya terlalu panjang
> Transparansi sumber: bagian luar materi dosen selalu ditandai biar gak ketuker.
```