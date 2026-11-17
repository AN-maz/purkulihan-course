# Pertemuan 3 — Arsitektur Mikroprosesor & Komponen Utama CPU

Catatan recall dari slide `materi/pertemuan-03-arsitektur-mikroprosesor-cpu.pdf`.
Isinya "jeroan CPU": ALU, Control Unit, register, bus, dan siklus
fetch–decode–execute.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

## Evolusi mikroprosesor

Mikroprosesor = sirkuit terintegrasi (IC) tunggal yang menggabungkan fungsi
inti CPU. Sejak **Intel 4004 (1971)** — 2.300 transistor, 740 kHz, arsitektur
4-bit/8-bit awal — evolusinya eksponensial:

- **2000-an:** multi-core & many-core, kecepatan multi-GHz, eksekusi instruksi
  paralel.
- **Modern:** System on Chip (SoC) — integrasi GPU & NPU/AI, miliaran
  transistor skala nm, efisiensi daya tinggi.

Transformasi arsitektur: transisi 8-bit → 64-bit, inti tunggal →
multi/many-core, integrasi unit pemrosesan grafis (GPU) dan neural processing
unit (NPU) dalam satu chip. Dampaknya: eksekusi instruksi paralel, prediksi
percabangan kompleks, efisiensi daya tinggi — fondasi komputasi awan, AI, dan
perangkat seluler modern.

## Tiga pilar utama CPU

| Pilar | Peran |
|---|---|
| **ALU** (Arithmetic Logic Unit) | pusat komputasi utama; semua operasi matematika dasar hingga kompleks plus evaluasi logika boolean |
| **CU** (Control Unit) | konduktor orkestra; mengambil instruksi dari memori, mendekodenya, menghasilkan sinyal kontrol buat mengarahkan seluruh aliran data |
| **Registers** | memori internal berkapasitas sangat kecil tapi kecepatan akses tertinggi; menyimpan data & instruksi yang sedang diproses CPU |

Ketiganya dihubungkan oleh **bus internal**. Tanpa koordinasi presisi dari
ketiga elemen ini, CPU gak bisa menerjemahkan bahasa mesin jadi komputasi yang
bermakna.

## ALU

ALU adalah sirkuit digital fundamental CPU yang bertanggung jawab penuh atas
pelaksanaan operasi **aritmatika** (penjumlahan, pengurangan) dan logika
**bitwise** (`AND`, `OR`, `NOT`, `XOR`).

**Mekanisme input & opcode:** ALU menerima **dua operand dari register data**
dan sebuah **kode operasi (opcode) dari Control Unit**; hasil perhitungan
dikembalikan ke register data.

**Status / flag register** (indikator percabangan):

- **Zero Flag (Z)** — aktif jika hasil komputasi bernilai nol.
- **Sign Flag (S)** — menandai hasil bernilai negatif.
- **Carry Flag (C)** — menandai sisa pembawaan dari operasi aritmatika.
- **Overflow Flag (V)** — indikator kapasitas penyimpanan register terlampaui.

## Register: akses data instan di puncak hierarki

Register ditanam langsung di silikon CPU — di puncak absolut hierarki memori,
latensi akses terendah, **seringkali hanya butuh satu siklus clock** untuk
baca/tulis, jauh lebih cepat dari cache (L1/L2/L3) apalagi RAM utama.

Fungsi utama: menyimpan data, instruksi, atau alamat memori yang sedang aktif
digunakan/dieksekusi ALU pada detik itu.

- **Arsitektur sel SRAM:** dibangun dari sel flip-flop statis (SRAM) yang
  mahal dan makan banyak ruang die → jumlah & kapasitas register sangat
  terbatas.
- **Arsitektur modern 64-bit:** register umum berlebar 64 bit (8 byte).
  Ketersediaan register yang memadai sangat mempengaruhi performa buat
  meminimalkan bottleneck akses memori eksternal.

## Register khusus: alur instruksi & transaksi data

| Register | Fungsi |
|---|---|
| **PC** (Program Counter) | alamat instruksi berikutnya yang harus diambil; otomatis increment setiap fetch |
| **IR** (Instruction Register) | instruksi bahasa mesin yang sedang didekode & dieksekusi CPU |
| **MAR** (Memory Address Register) | alamat lokasi memori spesifik yang akan dibaca/ditulisi |
| **MDR** (Memory Data Register) | penampungan sementara dua arah: data baru diambil dari memori utama / data siap ditulis balik |
| **ACC** (Accumulator) | register sentral tempat ALU menyimpan hasil operasi matematika & logika sementara untuk siklus eksekusi berkelanjutan |

## Control Unit

CU = sistem saraf pusat mikroprosesor. CU **tidak memproses data secara
langsung** — ia mengatur aliran data di dalam CPU dan mengendalikan unit-unit
lain dengan menghasilkan **sinyal kontrol (control signals)** yang presisi.

Tugas utama CU:

1. pengambilan instruksi dari memori,
2. menerjemahkan (decoding) instruksi untuk memahami operasi yang diminta,
3. mengatur urutan sinyal yang diperlukan untuk mengeksekusinya.

CU memakai **sinyal pewaktuan (timing signals) dari clock** sistem supaya
setiap mikro-operasi berjalan dalam urutan tepat & tersinkronisasi. Sinyal
kontrol CU dikirim ke: **ALU** (menentukan jenis komputasi), **register**
(mengaktifkan jalur baca/tulis), dan **bus sistem eksternal**
(mengkoordinasikan transfer data dengan RAM & perangkat I/O).

## Desain control unit: hardwired vs microprogrammed

| Aspek | Hardwired Control | Microprogrammed Control |
|---|---|---|
| Implementasi | sirkuit logika perangkat keras murni (gerbang logika, flip-flop, decoder) | berbasis perangkat lunak di tingkat perangkat keras |
| Mekanisme | sinyal kontrol dihasilkan instan oleh hardware | instruksi mesin diterjemahkan jadi serangkaian **mikro-instruksi (microcode)** yang disimpan di memori **ROM internal** |
| Performa | sangat cepat | lebih lambat tapi fleksibel |
| Arsitektur | standar utama pada **RISC** | banyak dipakai pada **CISC** |
| Sifat desain | sangat kaku — ubah set instruksi = desain ulang silikon | fleksibilitas tinggi buat instruksi kompleks |

## Sistem bus

> "Sistem bus diibaratkan sebagai jalan raya utama bersama (shared highway)
> tempat data, alamat, dan sinyal kontrol melaju antar komponen, menggantikan
> jalur privat antar-perangkat yang tidak efisien."

**Shared bus system (arsitektur Von Neumann)** — tulang punggung komunikasi
fisik berupa kabel paralel buat transfer data, alamat, dan sinyal kontrol
antar CPU, memori utama, dan modul I/O:

- **Lebar bus (bus width)** — jumlah jalur paralel; menentukan seberapa banyak
  bit data ditransfer sekaligus.
- **Kecepatan clock** — mempengaruhi frekuensi siklus transfer dan kinerja
  keseluruhan sistem.

**Mekanisme arbitrase bus (bus arbitration):** karena bus dipakai bersama,
butuh arbitrase ketat —

- **Pencegahan tabrakan** — atur giliran saat beberapa perangkat kirim data
  bersamaan.
- **Integritas sinyal** — jamin kelancaran & keakuratan aliran informasi di
  seluruh motherboard.

## Tiga jalur bus

| Jalur | Arah | Fungsi |
|---|---|---|
| **Data Bus** | 2 arah (bidirectional) | bawa data aktual antara CPU, memori, periferal; lebar data = throughput sistem |
| **Address Bus** | 1 arah (unidirectional), CPU → memori/I/O | kirim alamat lokasi memori fisik data; lebar = kapasitas memori maks (32-bit = 4 GB) |
| **Control Bus** | sinyal & timing | komando dari CU ke seluruh sistem: Memory Read, Memory Write, Clock |

**Interaksi sistem bus:** ketiga jalur bekerja kohesif tiap transaksi — CPU
kirim **alamat** via Address Bus, **perintah** via Control Bus, dan **data
mengalir** via Data Bus.

## Siklus instruksi: fetch–decode–execute

Instruction Cycle = proses fundamental yang diulang jutaan–miliaran kali per
detik oleh CPU. Tiga fase:

1. **FETCH (pengambilan instruksi)**
   - CPU baca alamat instruksi dari **PC**.
   - Alamat ditempatkan di **MAR**.
   - Instruksi dipilih dari memori utama via **Data Bus** ke **IR**.
   - Nilai **PC ditingkatkan otomatis**.
2. **DECODE (penerjemahan kode)**
   - Control Unit membedah instruksi di **IR**.
   - Mengidentifikasi jenis operasi (**opcode**).
   - Menentukan dan menyiapkan operand yang terlibat.
3. **EXECUTE (eksekusi operasi)**
   - CU kirim sinyal kontrol ke target: **ALU, register, atau memori utama**.
   - Melakukan komputasi/pemrosesan yang diminta.
   - Setelah selesai, **segera kembali ke fase Fetch** (siklus berulang
     segera).

## Dekonstruksi mikro-operasi penjumlahan aritmatika

(Slide dekonstruksi langkah mikro-operasi ADD — polanya sama dengan yang
detailed di P2/P4: fetch alamat dari PC → MAR, instruksi dari memori ke
IR, operand dari memori ke MDR, ALU menjumlah AC + MDR, hasil balik ke AC.)

## Tiga metrik kunci kecepatan mikroprosesor

| Metrik | Penjelasan |
|---|---|
| **GHz** (clock rate) | seberapa cepat siklus internal CPU berdetak; **tinggi bukan satu-satunya penentu performa** |
| **IPC** (instruction pipelining) | instruksi berbeda diproses **tumpang tindih** di berbagai tahapan eksekusi; CPU mulai instruksi baru sebelum sebelumnya selesai → throughput per siklus naik drastis |
| **Bus width & cache** | lebar data bus = seberapa banyak data ditransfer ke CPU sekali waktu; kaitan dengan arsitektur memori cache |

Kombinasi clock speed tinggi + pipelining dalam + jalur bus lebar = prosesor
berkinerja tinggi.

## Orkestrasi komponen internal

| Komponen | Peran |
|---|---|
| **Control Unit** | otak manajerial — pusat kendali, arahkan lalu lintas data, terjemahkan tiap instruksi sistem |
| **ALU** | mesin komputasi — pemroses utama seluruh pekerjaan matematis & logika |
| **Register** | memori super cepat — penyimpanan sementara supaya ALU tetap tersuplai data instan |
| **Sistem Bus** | jalur komunikasi — pengikat keseluruhan sistem, komunikasi berkecepatan tinggi dengan memori utama |

Interaksi sinkron komponen lewat siklus Fetch-Decode-Execute penting banget
buat mahasiswa Informatika: fondasi esensial buat menulis kode perangkat
lunak yang lebih efisien dan mengoptimalkan kinerja sistem operasi.

```quiz
Q: Apa bedanya ALU dan Control Unit?
+ ALU benar-benar menghitung (aritmatika & logika boolean); CU tidak memproses data, hanya mengatur aliran data lewat sinyal kontrol
- ALU menyimpan data, CU menghapus data
- Keduanya sama-sama hanya menyimpan instruksi
- CU yang menghitung, ALU yang mengatur sinyal
> Tiga pilar CPU: ALU = pusat komputasi; CU = konduktor orkestra yang menghasilkan sinyal kontrol presisi.

Q: Ke mana ALU mengirim hasil operasinya?
+ Kembali ke register data (misal accumulator), karena ALU menerima dua operand dari register dan opcode dari CU
- Langsung ke memori utama tanpa lewat register
- Ke Control Unit untuk disimpan
- Ke IR agar dieksekusi ulang
> Mekanisme input & opcode: hasil perhitungan dikembalikan ke register data.

Q: Kenapa jumlah register di CPU sangat terbatas?
+ Karena dibangun dari sel flip-flop statis (SRAM) yang mahal dan memakan banyak ruang silikon
- Karena pabrikan tidak mau menambahnya
- Karena register harus berukuran 64 bit semua
- Karena register disimpan di RAM
> Slide "Register: Akses Data Instan": arsitektur sel SRAM mahal & boros ruang die → jumlah dan kapasitas register sangat terbatas.

Q: Apa itu hardwired control vs microprogrammed control?
+ Hardwired: sinyal kontrol dari gerbang logika hardware murni (cepat, kaku, standar RISC); microprogrammed: instruksi diubah jadi mikro-instruksi di ROM internal (fleksibel, dipakai CISC)
- Hardwired memakai software, microprogrammed memakai hardware
- Hardwired hanya buat prosesor Intel, microprogrammed hanya buat AMD
- Tidak ada bedanya, hanya nama berbeda
> Tabel desain CU: hardwired = kaku, performa tinggi, RISC; microprogrammed = microcode di ROM, fleksibel, CISC.

Q: Kenapa CPU bisa menghabiskan siklus clock dalam idle wait state?
+ Karena akses memori utama (DRAM) jauh lebih lambat dari CPU dan dihubungkan bus bandwidth terbatas (Von Neumann bottleneck)
- Karena clock-nya rusak
- Karena register-nya penuh
- Karena instruksi HLT dieksekusi terus-menerus
> CPU modern sering diam menunggu instruksi/data dari memori; mitigasi: bus lebih lebar, clock bus lebih cepat, cache lebih besar.

Q: Meski clock rate GHz tinggi, kenapa itu belum tentu cepat?
+ Performa = kombinasi GHz + IPC (pipelining) + lebar bus & cache; pipelining memproses instruksi tumpang tindih sehingga throughput naik tanpa menaikkan clock
- GHz hanya penting untuk prosesor lama
- Karena GHz tidak bisa diukur dengan benar
- Karena cache menggantikan fungsi clock
> Tiga metrik kunci: GHz, IPC (instruction pipelining), bus width. Kombinasi ketiganya menentukan kinerja.
```

## Sources

- emu8086 — 8086 assembler tutorial (dokumentasi resmi emu8086):
  https://surendrajat.github.io/emu8086/documentation/asm_tutorial_01.html
- emu8086 (situs resmi): https://emu8086.com/
- Intel® 64 and IA-32 Architectures Software Developer's Manuals (referensi
  resmi arsitektur CPU Intel):
  https://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html
- OSDev Wiki (dokumen open source arsitektur & mikro-operasi):
  https://wiki.osdev.org/Main_Page
- NASM documentation (open source): https://www.nasm.us/doc/