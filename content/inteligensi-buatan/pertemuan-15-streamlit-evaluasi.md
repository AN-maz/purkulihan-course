# Pertemuan 15 — Aplikasi Web dengan Streamlit & Evaluasi

Catatan dari materi dosen `Machine_Learning_and_Evaluation_Metric.md` bagian 7
("Aplikasi web dengan Streamlit"). Pertemuan ini: **bungkus model jadi aplikasi
web interaktif** yang bisa dipakai orang lain.

## 1. Konsep inti: rerun

Streamlit menjalankan ulang **seluruh skrip dari atas** setiap kali pengguna
berinteraksi (ubah slider, klik tombol). Konsekuensinya:

- **Variabel biasa hilang** tiap rerun, kecuali disimpan di `st.session_state`.
- **Operasi berat** (memuat model, baca data) harus di-**cache**, biar gak diulang
  tiap rerun.

> [!IMPORTANT]
> Ini kesalahan pemula paling sering: model dimuat tanpa cache → tiap klik tombol
> model dilatih-ulang dari file. Solusinya `@st.cache_resource`.

## 2. Komponen dasar

| Komponen | Fungsi | Contoh |
|---|---|---|
| `st.title`, `st.subheader`, `st.write` | teks | `st.title("Demo ML")` |
| `st.number_input`, `st.slider`, `st.selectbox` | input | `st.slider("Kehadiran", 0, 100, 85)` |
| `st.columns`, `st.tabs` | tata letak | `tab1, tab2 = st.tabs([...])` |
| `st.button` | memicu aksi | `if st.button("Prediksi"):` |
| `st.success`, `st.error` | pesan status | `st.success("Lulus")` |
| `st.metric` | kartu angka | `st.metric("Probabilitas", "82%")` |
| `st.dataframe`, `st.bar_chart` | tabel & grafik | `st.dataframe(profil)` |
| `st.cache_resource` | cache objek berat (model) | buat `joblib.load` |
| `st.cache_data` | cache hasil data (DataFrame) | buat baca CSV |

## 3. Caching model (kunci performa)

```python
@st.cache_resource
def load_bundle(nama_file):
    path = MODEL_DIR / nama_file
    if not path.exists():
        return None
    return joblib.load(path)
```

`cache_resource` menyimpan objek **sekali** & membagikannya antar-rerun dan
antar-sesi → tepat buat **model**. Buat data yang butuh salinan → `cache_data`.

## 4. Aplikasi lengkap: `app.py`

Satu aplikasi, tiga tab (Klasifikasi, Regresi, Klastering), tiap tab muat
bundle dari P14:

```python
@st.cache_resource
def load_bundle(nama_file): ...

st.set_page_config(page_title="Demo Machine Learning", layout="wide")
tab_klas, tab_reg, tab_klaster = st.tabs(["Klasifikasi", "Regresi", "Klastering"])

with tab_klas:
    b = load_bundle("klasifikasi_siswa.joblib")
    usia = st.number_input("Usia", min_value=12, max_value=18, value=15)
    hadir = st.slider("Persentase kehadiran (%)", 0.0, 100.0, 85.0)
    ...
    if st.button("Prediksi kelulusan", type="primary"):
        baris = pd.DataFrame([{...}])[b["fitur"]]     # urut sesuai b["fitur"]
        proba = b["pipeline"].predict_proba(baris)[0, 1]
        label = "Lulus" if proba >= b["threshold"] else "Tidak Lulus"
        st.metric("Probabilitas lulus", f"{proba:.1%}")
```

## 5. Menjalankan aplikasi

```bash
pip install streamlit scikit-learn pandas joblib numpy
python latih_klasifikasi.py     # bikin bundle .joblib
python latih_regresi.py
python latih_klastering.py
streamlit run app.py            # buka http://localhost:8501
```

Setiap skrip latih **berdiri sendiri** (variabel gak tercampur antar skrip).

## 6. Pola repo Fraud Detection (contoh nyata)

- Model disimpan `joblib` dalam satu bundle: model, label encoder, median, daftar
  kolom, `optimal_threshold`.
- `load_bundle` pakai `@st.cache_resource` → model dimuat sekali.
- Input pengguna → satu baris DataFrame → kategori tak dikenal diganti kategori
  pertama → fitur dibentuk ulang sesuai `feature_columns`.
- Prediksi pakai `predict_proba` → banding threshold → label `Fraud`/`Legitimate`.

> [!WARN]
> Catatan versi dari materi: aplikasi contoh memakai `use_container_width=True`
> pada `st.button` — parameter itu **sudah usang** di Streamlit versi terbaru.
> Cek dokumentasi versi yang kamu pasang sebelum deploy.

## 7. Deploy ke internet

1. **Kunci versi** di `requirements.txt`:
   ```text
   streamlit==1.67.0
   scikit-learn==1.9.1
   pandas==3.0.5
   numpy==2.5.3
   joblib==1.6.0
   ```
   (versi materi = versi sandbox; sesuaikan dengan versi kamu saat training)
2. **Pastikan folder `models/` ikut ter-deploy** — atau dibuat ulang lewat skrip latih.
3. **Streamlit Community Cloud**: hubungkan repo GitHub → pilih branch & `app.py`
   → deploy. Platform ini baca `requirements.txt` otomatis.
4. **Kredensial** (API key, password DB) simpan lewat **Secrets**, jangan di-hardcode.
   Lokal: `.streamlit/secrets.toml` (jangan di-commit).

```quiz
Q: Apa itu "rerun" di Streamlit?
+ Seluruh skrip dijalankan ulang dari ATAS tiap kali pengguna berinteraksi widget/tombol
- Hanya bagian yang berubah yang dijalankan
- Aplikasi di-restart tiap menit
- Model dilatih ulang otomatis
> Konsekuensinya: variabel biasa hilang & operasi berat harus di-cache.

Q: Kenapa model harus dipakai @st.cache_resource?
+ Tanpa cache, tiap klik tombol model dimuat ulang dari file — lambat; cache_resource simpan sekali
- Supaya kodenya lebih pendek
- Karena joblib gak bisa dipakai
- Biar tampilannya bagus
> cache_resource = objek dibagikan antar-rerun & antar-sesi; tepat buat model.

Q: Beda st.cache_resource dan st.cache_data?
+ cache_resource buat objek BERAT (model); cache_data buat hasil DATA (DataFrame, baca CSV)
- Dua-duanya sama
- cache_resource buat teks
- cache_data buat model
> Resource = satu instance dibagikan; data = salinan per input.

Q: Untuk apa st.metric dipakai?
+ Menampilkan kartu angka besar seperti probabilitas prediksi
- Menghitung metrik evaluasi
- Mengubah tipe data
- Membuat chart
> Contoh: st.metric("Probabilitas lulus", "82%") — tampil angka menonjol.

Q: Kenapa baris DataFrame input harus diurut sesuai b["fitur"]?
+ Pipeline mengenali kolom lewat NAMA & urutan yang diharapkan — salah urutan bisa salah hasil
- Supaya kodenya rapi
- Karena pandas gak punya nama
- Biar lebih cepat
> Materi selalu pakai `[b["fitur"]]` biar urutan kolom persis seperti saat training.

Q: Parameter apa yang SUDAH USANG di Streamlit versi baru (dari materi)?
+ use_container_width=True pada st.button
- st.title
- st.slider
- st.tabs
> Materi eksplisit memperingatkan ini — cek dokumentasi versi kamu sebelum deploy.

Q: Di mana kredensial (API key, password) disimpan saat deploy?
+ Lewat Secrets (Streamlit Community Cloud) / .streamlit/secrets.toml — BUKAN di-hardcode
- Di dalam kode app.py
- Di requirements.txt
- Di nama file model
> Hardcode kredensial = kebocoran; secrets.toml lokal jangan di-commit.

Q: Kenapa folder models/ harus ikut ter-deploy?
+ Karena app.py butuh file .joblib buat load model — tanpa itu muncul error "model belum ada"
- Supaya repo-nya besar
- Karena Streamlit wajib punya folder models
- Biar lebih cepat dibuka
> Alternatifnya: buat ulang bundle lewat skrip latih di lingkungan deploy.

Q: Langkah pertama deploy yang paling penting?
+ Kunci versi library di requirements.txt supaya lingkungan deploy sama dengan saat training
- Membuat logo aplikasi
- Mengganti warna tema
- Menambah tab baru
> Versi beda bisa bikin model gagal dimuat atau hasil prediksi berbeda.

Q: Kenpa operasi berat harus di-cache?
+ Karena Streamlit jalankan ulang SELURUH skrip tiap interaksi — tanpa cache, model dimuat terus tiap klik
- Supaya hemat memori saja
- Karena cache wajib di Streamlit
- Biar kodenya lebih sedikit
> Ini inti performa Streamlit: cache_resource buat model, cache_data buat DataFrame.
```