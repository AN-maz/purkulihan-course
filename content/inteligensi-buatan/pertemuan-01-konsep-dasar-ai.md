# Pertemuan 1 — Konsep Dasar AI, Sejarah & Ruang Lingkup

Catatan ini diringkas dari slide dosen **"BAB I: Pengenalan Kecerdasan Buatan"** (Session1.html, penyusun: Muhammad Ikhwan Fathulloh). Materi slide-nya masih tipis (banyak poin-poin singkat), jadi di beberapa bagian aku tambahin penjelasan konsep standar — setiap tambahan ditandai eksplisit **"Tambahan (bukan dari slide dosen)"**.

## Capaian Pembelajaran Sesi Ini

Dosen menyebut 4 capaian utama:

1. **Konsep Dasar** — bisa jelasin konsep AI & bedanya dengan kecerdasan alami.
2. **Bidang & Sejarah** — bisa jelasin bidang ilmu dasar AI, sejarah, & aplikasinya.
3. **Agen Intelejen** — bisa jelasin peran agen di dalam AI.
4. **Bahasa Pemrograman** — bisa jelasin bahasa pemrograman AI & alasan pemilihannya.

## 1.1 Pengertian AI

Slide buka dengan pertanyaan besar: **"Bisakah mesin berpikir?"**

Definisi yang dipakai dosen: **AI = cabang ilmu komputer yang membuat mesin mampu menalar, belajar, memahami bahasa, & mengambil keputusan** (dikutip dari McCarthy dkk., 1955).

### Empat Pendekatan Definisi AI

Dosen pakai kerangka Russell & Norvig (2021): definisi AI dibagi 2 sumbu → **berpikir vs bertindak**, dan **seperti manusia vs rasional**.

| | Seperti Manusia | Rasional |
|---|---|---|
| **Berpikir** | Cognitive modeling — meniru cara pikir manusia | Laws of thought — bernalar logis formal |
| **Bertindak** | Turing Test — tak terbedakan dari manusia | Agen rasional — capai hasil terbaik |

> [!NOTE]
> Kunci ngerti tabel ini: 2 baris itu soal "berpikir" atau "bertindak", 2 kolom itu soal tolok ukurnya "seperti manusia" atau "ideal/rasional". Titik yang paling penting buat ujian adalah **agen rasional** (kanan-bawah) — ini yang jadi kerangka utama sepanjang mata kuliah.

### AI vs Kecerdasan Alami

Ini perbandingan manusia (alami) vs mesin (buatan) menurut slide:

| Aspek | Kecerdasan Alami | Kecerdasan Buatan |
|---|---|---|
| Sifat | Kreatif, berkembang alami | Konsisten, tetap |
| Kecepatan | Lambat hitung kompleks | Sangat cepat hitung & data |
| Transfer | Sulit dipindah utuh | Mudah disalin & digandakan |
| Biaya | Pendidikan bertahun-tahun | Mahal awal, murah replikasi |
| Adaptasi | Baik di konteks baru | Terbatas pada data latih |
| Common sense | Bawaan dan kaya | Tantangan riset |
| Energi | Sangat efisien (~20 watt) | Energi & perangkat besar |

## 1.2 Tingkatan & Jenis AI

Dosen bagi AI jadi 3 tingkatan:

- **Narrow AI** — satu tugas spesifik (filter spam, pengenal wajah). **Seluruh AI saat ini termasuk narrow AI.**
- **AGI (Artificial General Intelligence)** — bisa memahami tugas intelektual seperti manusia. Masih **hipotetis**, jadi tujuan riset.
- **ASI (Artificial Super Intelligence)** — melampaui kemampuan manusia di semua bidang. **Spekulatif.**

## 1.3 Hubungan AI > ML > DL

Slide menegaskan hubungan berlapis ini (AI payung terluas):

```
AI (KECERDASAN BUATAN)   → pencarian, logika, aturan, perencanaan
  └── ML (MACHINE LEARNING) → belajar pola dari data
        └── DL (DEEP LEARNING) → jaringan saraf berlapis
```

Paradigma ML: **Supervised, Unsupervised, Reinforcement**. (Detailnya di pertemuan 7.)

### Subbidang & Aplikasi AI

Delapan subbidang utama yang disebut dosen, plus contoh aplikasinya:

| Subbidang | Contoh Aplikasi |
|---|---|
| NLP | Penerjemah, Chatbot |
| Visi Komputer | Pengenal wajah, citra medis |
| Suara | Transkripsi, asisten suara |
| Robotika | Industri, drone |
| Sistem Pakar | Diagnosa berbasis aturan |
| Perencanaan | Logistik, penjadwalan |
| Rekomendasi | Film, produk |
| AI Generatif | Teks, gambar, kode |

## 1.4 Etika & Tanggung Jawab AI

Slide mengutip UNESCO (2021) dengan 5 isu:

- **Bias & keadilan** — AI mewarisi bias dari data latihnya.
- **Privasi** — di Indonesia diatur di UU No. 27/2022 tentang Data Pribadi.
- **Transparansi** — model kompleks sulit dijelaskan.
- **Akuntabilitas** — siapa yang salah kalau mesin salah?
- **Dampak** — otomasi & konsumsi energi pelatihan model.

## 1.5 Bidang Ilmu Dasar AI

AI itu multidisipliner. Delapan bidang ilmu yang mendasarinya (Russell & Norvig, 2021):

| Bidang | Kontribusi |
|---|---|
| Filsafat | Logika, hakikat pikir |
| Matematika | Probabilitas, aljabar |
| Ekonomi | Teori keputusan |
| Neurosains | Cara kerja otak |
| Psikologi | Kognitif, perilaku |
| Teknik Komputer | CPU, GPU, TPU |
| Teori Kendali | Sistem feedback |
| Linguistik | Sintaksis, semantik |

## 1.6 Sejarah AI

Dosen bagi sejarah jadi beberapa fase:

### Era Awal (1943–1974)

| Tahun | Peristiwa |
|---|---|
| 1943 | Model matematis neuron (McCulloch & Pitts) |
| 1950 | Alan Turing & Turing Test |
| 1956 | Lokakarya Dartmouth — istilah "AI" resmi dipakai |
| 1956–1974 | Era antusiasme awal: pemecah masalah, pembuktian teorema, bahasa LISP |

### Musim Dingin & Sistem Pakar

| Tahun | Peristiwa |
|---|---|
| 1974–1980 | **Musim Dingin AI I** — pendanaan turun, Laporan Lighthill |
| 1980–1987 | Kebangkitan sistem pakar komersial |
| 1986 | Popularisasi algoritma backpropagation |
| 1987–1993 | **Musim Dingin AI II** — sistem pakar mahal & kaku |

### Era ML, Deep Learning & Generatif

| Tahun | Peristiwa |
|---|---|
| 1997 | Deep Blue kalahkan juara catur |
| 2011 | IBM Watson menang kuis Jeopardy! |
| 2012 | AlexNet picu ledakan Deep Learning |
| 2017 | Arsitektur Transformer diperkenalkan |
| 2020-an | Era AI Generatif & LLM |

> [!IMPORTANT]
> Pelajaran dari sejarah (poin dosen): kemajuan AI berjalan dalam **siklus antusiasme & kekecewaan**. Tiga faktor pendorong kemajuan AI: **Data Besar, Daya Komputasi, Algoritma Baik**.

## 1.7 Agen & Lingkungannya (Preview)

Ini akan dibahas lengkap di pertemuan 2, tapi di P1 sudah diperkenalkan:

- **Lingkungan** — tempat agen beroperasi.
- **Agen** — dijalankan oleh **program agen**.
- **Sensor** → persepsi masuk; **Aktuator** → aksi keluar.

### Tabel PEAS & 4 Contoh Agen

PEAS = **P**erformance, **E**nvironment, **A**ctuators, **S**ensors.

| Agen | Performance | Environment | Actuators | Sensors |
|---|---|---|---|---|
| Mobil Otonom | Aman, cepat, nyaman | Jalan, pejalan kaki | Kemudi, gas, rem | Kamera, lidar, GPS |
| Diagnosis Medis | Tepat, biaya rendah | Pasien, rumah sakit | Tes, diagnosis | Gejala pasien |
| Robot Vacuum | Bersih, hemat baterai | Ruangan, lantai | Roda, sikat | Sensor tabrakan |
| Chatbot CS | Selesai, puas | Percakapan | Teks balasan | Teks masukan |

### Konsep Rasionalitas

- **Rasional** — memaksimalkan kinerja yang **diharapkan** berdasar bukti.
- **Omniscience (mahatahu)** — tahu hasil pasti sebuah aksi → **tidak realistis**.
- **Perfection (kesempurnaan)** — memaksimalkan kinerja **aktual**.

Rasionalitas bergantung pada: **ukuran kinerja, pengetahuan, aksi, persepsi**.

> [!TIP]
> Beda kunci: rasional = optimasi berdasar apa yang *diketahui*; omniscience = tahu segalanya (mustahil). Agen rasional bisa salah hasil, tapi tetap "rasional" karena keputusannya terbaik berdasar informasinya.

### Tujuh Dimensi Lingkungan Tugas

| Dimensi | Penjelasan | Contoh |
|---|---|---|
| Fully vs Partially | Kelengkapan akses sensor | Catur vs Poker |
| Single vs Multi | Sendiri vs bersama agen lain | Teka-teki vs Catur |
| Deterministic vs Stochastic | Pasti vs mengandung ketidakpastian | Puzzle vs Mengemudi |
| Episodic vs Sequential | Independen vs berurutan | Klasifikasi vs Catur |
| Static vs Dynamic | Berubah saat berpikir vs tetap | Teka-teki vs Taksi |
| Discrete vs Continuous | Terhingga vs kontinu | Catur vs Robot |
| Known vs Unknown | Aturan dikenal vs tidak | Kartu dikenal vs baru |

### Lima Struktur Agen

1. **Simple Reflex** — aturan if-then, tanpa riwayat. Contoh: termostat.
2. **Model-based** — punya model internal dunia. Contoh: robot vacuum.
3. **Goal-based** — pilih aksi menuju tujuan. Contoh: navigasi GPS.
4. **Utility-based** — maksimalkan utilitas. Contoh: sistem rekomendasi.
5. **Learning Agent** — belajar dari pengalaman; mengandung komponen **performance, learning, critic, problem generator**.

Struktur **Learning Agent** (diagram slide): **Critic** menilai kinerja → **Learning** perbaiki kinerja → **Performance** pilih aksi → **Problem Gen** eksplorasi, semuanya berinteraksi dengan **Lingkungan** lewat persepsi (sensor) & aksi (aktuator).

## 1.8 Bahasa Pemrograman AI

### Sejarah Bahasa

| Tahun | Bahasa & Catatan |
|---|---|
| 1958 | LISP (McCarthy) — simbolik, punya GC |
| 1972 | Prolog — logika, deklaratif |
| 1980-an | OPS5 (bahasa aturan) & CLIPS (tool pakar) |
| 1991 | Python (van Rossum) — serbaguna, ekosistem luas |
| 1993–2012 | R (1993), Java (1995), Julia (2012) |

### Python & Ekosistemnya

- **NumPy** — komputasi numerik
- **pandas** — data tabular
- **scikit-learn** — ML klasik
- **PyTorch/TensorFlow** — Deep Learning

Slide menyebut Python dipakai **58% responden** (Stack Overflow, 2025).

Contoh klasifikasi Python dari slide:

```python
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier

X, y = load_iris(return_X_y=True)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

model = DecisionTreeClassifier().fit(X_train, y_train)
print("Akurasi:", model.score(X_test, y_test))
```

Contoh LISP & Prolog (bahasa AI simbolik klasik):

```lisp
(defun faktorial (n)
  (if ...
```

```prolog
orang_tua(budi, ani).
orang_tua(ani, citra).
kakek_nenek(X, Z) :- orang_tua(X, Y), orang_tua(Y, Z).
```

### Perbandingan & Cara Memilih Bahasa

| Bahasa | Kekuatan | Keterbatasan | Cocok Untuk |
|---|---|---|---|
| Python | Ekosistem terbesar | Eksekusi murni lambat | ML, NLP, riset |
| LISP | Manipulasi simbol | Komunitas kecil | AI simbolik klasik |
| Prolog | Inferensi bawaan | Kurang numerik | Sistem pakar, logika |
| R | Statistik kuat | Kurang untuk produksi | Analisis data, riset |
| C/C++ | Kinerja tertinggi | Rumit dikembangkan | Robotika, inference |

> [!TIP]
> **Rule of thumb dari dosen:** mulai dari Python, tambah SQL, pelajari Prolog/LISP, dan pakai C++ kalau butuh kinerja tinggi.

## Rangkuman Sesi

- AI didefinisikan 4 cara (berpikir/bertindak × manusia/rasional); **agen rasional** jadi kerangka utama.
- AI payung ML & DL; **semua AI saat ini masih narrow AI**.
- AI multidisipliner: 8 bidang ilmu mendasarinya.
- Sejarah AI bersifat siklikal: Dartmouth → musim dingin → LLM.
- Agen = sensor–aktuator; ada 5 struktur agen intelejen.
- Bahasa AI: dari LISP/Prolog → Python/Julia/C++.

## Tambahan (bukan dari slide dosen)

Bagian ini **bukan** dari slide dosen — penjelasan konsep standar buat nambal bagian yang masih tipis. Jangan dipakai mengutip dosen.

- **Kenapa "Turing Test" masuk kolom "seperti manusia, bertindak"** — Turing Test (1950) menilai AI dari *output/perilaku* yang tak terbedakan dari manusia, bukan dari cara berpikir internalnya. Karena itu ia tolok "bertindak seperti manusia".
- **Artificial General Intelligence (AGI)** sering juga disebut *strong AI*; lawannya narrow AI disebut *weak AI*. Istilah ini standar di literatur (Russell & Norvig), tapi di slide dosen hanya pakai istilah "Narrow/AGI/ASI".
- **Alasan Python menang di AI modern** — tiga faktor yang dosen sebut (data besar, komputasi, algoritma) bertemu dengan ekosistem Python yang lengkap: NumPy/pandas untuk data, PyTorch/TensorFlow untuk komputasi GPU, dan scikit-learn untuk ML klasik yang bisa dipakai satu baris.
- **Contoh kesalahan klasik "agen yang kelihatan cerdas tapi tidak rasional"** — termostat (simple reflex) nyala/mati tanpa model dunia; ia "bekerja" tapi tidak punya konsep tujuan atau utilitas. Bandingkan dengan utility-based agent yang bisa memilih aksi paling menguntungkan saat tujuan bertabrakan.

```quiz
Q: Menurut slide, apa definisi AI yang dipakai dosen?
+ Cabang ilmu komputer yang membuat mesin mampu menalar, belajar, memahami bahasa, & mengambil keputusan
- Program komputer yang bisa menyimpan data dalam jumlah besar
- Kumpulan algoritma pengurutan dan pencarian data
> Definisi ini dikutip dari McCarthy dkk. (1955) di slide BAB I.

Q: Kerangka 4 pendekatan definisi AI dari Russell & Norvig membagi AI berdasarkan dua sumbu apa?
+ Berpikir vs bertindak, dan seperti manusia vs rasional
- Supervised vs unsupervised, dan klasifikasi vs regresi
- Online vs offline, dan simbolik vs numerik
> Titik paling penting untuk ujian: agen rasional (bertindak-rasional) jadi kerangka utama mata kuliah.

Q: Apa itu AGI (Artificial General Intelligence)?
+ AI yang mampu memahami tugas intelektual seperti manusia, masih hipotetis
- AI yang hanya bisa satu tugas spesifik seperti filter spam
- AI yang melampaui manusia di semua bidang
> Melampaui manusia di semua bidang itu ASI (spekulatif). AGI masih hipotetis dan jadi tujuan riset.

Q: Bagaimana hubungan AI, ML, dan DL menurut slide?
+ AI adalah payung terluas yang mencakup ML, dan ML mencakup DL
- ML payung terluas, AI dan DL di dalamnya
- DL payung terluas, AI dan ML di dalamnya
> AI > ML > DL. AI mencakup pencarian, logika, aturan, perencanaan; ML belajar pola dari data; DL jaringan saraf berlapis.

Q: Musim Dingin AI I (1974–1980) dikaitkan dengan peristiwa apa?
+ Pendanaan turun dan Laporan Lighthill
- Peluncuran istilah AI di Dartmouth
- Diperkenalkannya arsitektur Transformer
> Laporan Lighthill (1973) menilai AI tidak memenuhi janjinya, memicu pemotongan pendanaan.

Q: Tiga faktor pendorong kemajuan AI menurut slide adalah…
+ Data besar, daya komputasi, algoritma baik
- Kecepatan internet, jumlah programmer, harga GPU
- Dana riset, jumlah paper, jumlah universitas
> Poin ini muncul di bagian "Pelajaran dari Sejarah".

Q: Tabel PEAS dipakai untuk apa?
+ Mendeskripsikan agen lewat Performance, Environment, Actuators, Sensors
- Mengukur akurasi model ML
- Menghitung kompleksitas algoritma pencarian
> Contohnya: mobil otonom (aman/cepat, jalan, kemudi/gas/rem, kamera/lidar/GPS).

Q: Perbedaan rasionalitas dan omniscience menurut dosen?
+ Rasional = maksimalkan kinerja yang diharapkan berdasar bukti; omniscience = mahatahu (tidak realistis)
- Rasional = tahu masa depan; omniscience = belajar dari data
- Keduanya sama saja, cuma beda istilah
> Agen rasional bisa saja salah hasil, tapi keputusannya terbaik berdasar apa yang diketahuinya.

Q: Struktur agen mana yang mengandung komponen performance, learning, critic, dan problem generator?
+ Learning Agent
- Simple Reflex Agent
- Utility-based Agent
> Learning Agent belajar dari pengalaman; empat komponen itulah yang membedakannya dari struktur lain.

Q: Rule of thumb pemilihan bahasa pemrograman AI dari dosen adalah…
+ Mulai Python, tambah SQL, pelajari Prolog/LISP, pakai C++ bila butuh kinerja
- Selalu pakai Java untuk semua proyek AI
- Cukup satu bahasa untuk semua keperluan
> Python ekosistem terbesar tapi eksekusi murni lambat; C/C++ untuk kinerja tertinggi (robotika, inference).
```
