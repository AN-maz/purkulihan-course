# Pertemuan 2 — Register, Memori, Bus & Transfer Data (Arsitektur Von Neumann)

Catatan recall dari slide `materi/pertemuan-02-register-memori-bus.pdf`. Teori
berat tapi intinya cuma tiga: register cepat, memori piramida, bus jalan
raya.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

## Register CPU & hierarki memori

Register = komponen penyimpanan internal CPU dengan kecepatan akses
tertinggi. Posisinya **puncak hierarki memori**, dibangun dari teknologi
**flip-flop** berkecepatan tinggi yang terintegrasi langsung di sirkuit
mikroprosesor — akses dalam skala **nanodetik (ns)**, sebanding dengan siklus
clock CPU. Jumlah & ukuran register (32-bit/64-bit) menentukan arsitektur dasar
dan kemampuan pemrosesan paralel prosesor.

**Peran utama & pencegahan bottleneck:**

- Register bukan buat penyimpanan massal, melainkan **memori kerja sementara
  yang sangat cepat** — menampung data, instruksi, dan alamat memori yang
  sedang diproses aktif oleh ALU dan Control Unit.
- Tanpa register, CPU bakal terus-menerus ngambil data dari RAM yang jauh
  lebih lambat → **bottleneck parah** dan kinerja anjlok.

Struktur internal CPU:

- Flip-Flop Array (Register Banks) terhubung langsung dengan ALU & Control
  Unit (CU).
- Jalur BUS internal meminimalkan latensi pemrosesan data & instruksi.

## 5 register utama mikroprosesor

| Register | Fungsi |
|---|---|
| **PC** (Program Counter) | menyimpan alamat instruksi berikutnya yang akan di-fetch; otomatis **increment** setiap fetch |
| **IR** (Instruction Register) | menampung instruksi mesin yang sedang didekode & dieksekusi CU |
| **MAR** (Memory Address Register) | menyimpan alamat lokasi memori yang akan dibaca/ditulisi; **terhubung langsung ke Address Bus** |
| **MBR/MDR** (Memory Buffer/Data Register) | buffer sementara data yang baru dibaca / siap ditulis; **terhubung langsung ke Data Bus** |
| **AC** (Accumulator) | register tujuan umum ALU; menyimpan operand awal dan hasil akhir operasi aritmatika/logika |

## Klasifikasi register dalam ISA

Diklasifikasi jadi dua kategori berdasarkan aksesibilitas pemrogram:

**User-Visible Register** — bisa direferensikan langsung oleh pemrogram
assembly/kompilator untuk meminimalkan akses ke memori utama yang lambat:

- register data (general purpose)
- register alamat (index register, stack pointer)
- register kode kondisi (flags) — menyimpan status hasil ALU (zero, carry,
  overflow)

**Control and Status Register** — beroperasi di belakang layar, umumnya gak
bisa dimanipulasi langsung program pengguna; dipakai Control Unit dan program
OS dengan hak istimewa (privileged). Contoh utama: **PC, IR, MAR, MBR, dan
PSW** (Program Status Word).

## Hierarki memori (piramida)

Tantangan fundamental: memori cepat sangat mahal & terbatas; memori murah
sangat lambat. Solusinya hierarki berbentuk piramida:

| Tingkat | Komponen | Karakter |
|---|---|---|
| Puncak | **Register CPU** | tercepat, kapasitas terkecil, biaya per bit tertinggi |
| L1/L2/L3 | **Memori Cache (SRAM)** | menjembatani kesenjangan CPU ↔ RAM |
| Tengah | **RAM (DRAM)** | kapasitas gigabyte, kecepatan menengah |
| Dasar | **Penyimpanan Sekunder (HDD/SSD)** | kapasitas terabyte, non-volatil, latensi tertinggi |

**Prinsip lokalitas (locality of reference):** spasial & temporal — data yang
paling sering digunakan otomatis dipindahkan ke tingkat hierarki yang lebih
tinggi dan lebih cepat.

**Karakteristik volatil vs non-volatil:**

| Tipe | Contoh | Sifat |
|---|---|---|
| Volatil | **Cache (SRAM)** | gak butuh refresh; sangat cepat tapi makan banyak ruang silikon |
| Volatil | **Memori Utama (DRAM)** | data di kapasitor, kehilangan muatan → butuh refresh konstan; lambat dari SRAM tapi padat |
| Non-volatil | **ROM** | data bertahan saat daya mati; varian EEPROM/Flash buat firmware; aplikasi: BIOS/UEFI saat booting |
| Non-volatil | **Memori sekunder** | HDD magnetik / SSD flash NAND; simpan OS, aplikasi, file pengguna |

## Sistem bus & arsitektur komunikasi

Dalam arsitektur Von Neumann, komponen **gak terhubung point-to-point** —
mereka berbagi media transmisi tunggal: **Bus Sistem** (kumpulan jalur
konduktif fisik di motherboard yang mentransmisikan sinyal listrik data
biner).

- **Medium bersama (shared medium):** sinyal dari satu perangkat diterima
  seluruh perangkat lain yang terhubung.
- **Pembatasan kritis:** hanya **satu perangkat boleh mentransmisikan** pada
  satu waktu — kalau dua perangkat kirim bersamaan, terjadi **collision**
  (tabrakan) dan data rusak → butuh **arbitrase bus** yang kompleks buat
  nentuin modul mana yang berhak mengendalikan bus di siklus clock tertentu.

Tiga jalur utama: **Data (kuning), Alamat (hijau), Kontrol (merah/biru)**
menghubungkan CPU, Memori, dan I/O.

## Tiga jalur bus sistem

**1. Data Bus — dua arah (bidirectional)**
Membawa informasi aktual antar modul sistem. Lebar bus data (32-bit, 64-bit,
128-bit) = faktor penentu utama kinerja: bus lebih lebar → lebih banyak bit
per siklus clock → fewer akses memori.

**2. Address Bus — satu arah (unidirectional), dari CPU**
Mengidentifikasi sumber/tujuan data. Lebar address bus **secara matematis
menentukan kapasitas maksimum memori**: bus alamat 32-bit → 2³² lokasi = **4
Gigabyte**.

**3. Control Bus — perintah & pewaktuan (timing)**
Mentransmisikan sinyal perintah dan timing buat mengkoordinasikan aktivitas
sistem. Sinyal umum: Memory Read, Memory Write, I/O Read, I/O Write,
Interrupt Request, dan Clock yang mensinkronkan semua operasi.

## Transfer data: mekanisme operasi READ

Protokol langkah sekuensial (Memori → CPU):

1. **Inisiasi alamat** — CPU memuat alamat lokasi ke MAR; alamat ditegaskan
   (asserted) ke Saluran Alamat.
2. **Sinyal kontrol** — setelah alamat stabil di bus, CPU kirim sinyal
   'Memory Read' via Saluran Kontrol.
3. **Respon memori** — modul memori mendeteksi alamat & sinyal baca, ambil
   data dari array internalnya, letakkan ke Saluran Data.
4. **Penyimpanan CPU** — CPU menangkap data dari Saluran Data dan simpan ke
   MBR.

**Mekanisme pewaktuan (timing):**

- **Sinkron** — setiap kejadian diatur osilator clock global.
- **Asinkron** — kejadian dipicu sinyal **handshaking** antar perangkat;
  komponen dengan kecepatan beda bisa komunikasi tanpa terikat clock pusat.

## Siklus instruksi mesin (fetch–decode–execute)

1. **Fetch Cycle** — alamat instruksi dipindah dari **PC ke MAR**; lewat bus
   sistem, memori diakses dan instruksi disalin ke MBR, lalu dipindah ke
   **IR**. Pada saat yang sama **PC di-increment** agar nunjuk instruksi
   berikutnya.
2. **Decode Cycle** — Control Unit memecah instruksi biner di IR untuk
   menentukan jenis operasi (**opcode**) dan mengidentifikasi lokasi operand.
3. **Execute Cycle** — CU menghasilkan urutan sinyal kontrol yang mengaktifkan
   ALU, memori, atau modul I/O: bisa aritmetika pada AC, pindah data antar
   register, atau tulis hasil ke memori utama. Siklus terus berulang hingga
   sistem dimatikan atau interupsi (halt).

## Von Neumann bottleneck & mitigasi

CPU (dan registernya) meningkat jauh lebih cepat daripada kecepatan akses
DRAM, dan keduanya dihubungkan bus ber-bandwidth terbatas → CPU modern sering
menghabiskan siklus clock dalam **idle wait state** menunggu instruksi/data
tiba dari memori.

Strategi mitigasi arsitektural:

- Meningkatkan **lebar bus data** untuk transfer simultan lebih besar.
- Meningkatkan **frekuensi clock bus** (FSB/QPI/HyperTransport).
- Yang paling krusial: memperbesar kapasitas & efisiensi **memori cache
  terintegrasi** — simpan data yang sering diakses sedekat mungkin dengan
  register eksekusi CPU.

## Studi kasus — eksekusi instruksi ADD [0x250]

Kondisi: memori `[0x100]=ADD`, `[0x250]=5`; register sebelum: `PC=0x100`,
`AC=10`; hasil akhir: `AC=15`.

1. **Fetch** — PC (0x100) → MAR → Address Bus; instruksi ADD kembali via
   Data Bus → MBR → IR.
   State: `PC=0x101`, `MAR=0x100`, `IR=ADD [0x250]`.
2. **Decode** — CU baca IR: operasi penambahan, operand dari memori 0x250.
   State: CU aktifkan sinyal kontrol baca operand di 0x250.
3. **Fetch operand** — bagian alamat (0x250) → MAR → Address Bus; sinyal
   Read via Control Bus; nilai data (5) kembali via Data Bus → MBR.
   State: `MAR=0x250`, `MBR=5`.
4 & 5. **Eksekusi ALU & simpan** — CU perintahkan ALU menjumlahkan isi AC
   (10) dengan MBR (5); output 15 ditimpa ke AC.
   State: `ALU = 10 + 5`, `AC = 15`.

Kesimpulan: seluruh proses butuh koordinasi mikrodetik yang sempurna dari bus
(Address, Data, Control) dan register (PC, MAR, MBR, IR, AC).

## Kesimpulan: organisasi komputer modern

1. **Register** — titik akhir eksekusi sangat cepat; CPU manipulasi data
   tanpa latensi.
2. **Hierarki memori (Cache, RAM, Storage)** — menyeimbangkan kapasitas
   penyimpanan masif dengan tuntutan kecepatan akses prosesor.
3. **Sistem bus (Data, Alamat, Kontrol)** — infrastruktur komunikasi standar
   buat transfer informasi terkoordinasi dan andal antar komponen.

Kompetensi esensial: menganalisis alur data lewat komponen-komponen ini,
identifikasi potensi bottleneck (bandwidth bus, cache miss rate), dan
memahami siklus Fetch-Decode-Execute.

```quiz
Q: Kenapa register disebut puncak hierarki memori?
+ Tercepat di antara semua level (skala nanodetik) karena dari flip-flop langsung di silikon CPU, tapi kapasitasnya paling kecil dan termahal per bit
- Karena kapasitasnya paling besar di antara semua memori
- Karena register bisa menyimpan data permanen saat komputer dimatikan
- Karena register berada di memori utama RAM
> Hierarki piramida: puncak = register CPU (tercepat, kapasitas terkecil, biaya per bit tertinggi), dasar = penyimpanan sekunder.

Q: Apa fungsi MAR dan MBR?
+ MAR menyimpan alamat lokasi memori yang diakses dan terhubung ke Address Bus; MBR menjadi buffer data yang terhubung ke Data Bus
- MAR menyimpan data, MBR menyimpan alamat
- Keduanya sama-sama menyimpan instruksi dari IR
- MAR hanya dipakai saat write, MBR hanya saat read
> Slide register utama: MAR → Address Bus, MBR/MDR → Data Bus.

Q: Bus alamat 32-bit menghasilkan kapasitas memori maksimum berapa?
+ 4 Gigabyte (2^32 lokasi)
- 2 Gigabyte
- 64 Gigabyte
- 4 Megabyte
> Lebar address bus menentukan kapasitas memori secara matematis: 32-bit = 2^32 = 4 GB.

Q: Kenapa data bus harus bidirectional sedangkan address bus unidirectional?
+ Data bus dipakai dua arah (baca dari memori & tulis ke memori); address bus hanya mengirim alamat dari CPU ke memori/I/O
- Karena address bus lebih panjang dari data bus
- Karena data bus hanya dipakai saat interrupt
- Sebenarnya keduanya bidirectional
> Kategori saluran bus: data = dua arah; alamat = satu arah dari CPU.

Q: Dalam operasi READ (memori → CPU), apa langkah SETELAH CPU mengirim sinyal 'Memory Read'?
+ Modul memori mendeteksi alamat, mengambil data dari array internalnya, dan meletakkannya ke Saluran Data
- CPU langsung menyimpan data ke MBR
- PC di-increment ke instruksi berikutnya
- MAR dibersihkan menjadi 0
> Protokol 4 langkah: inisiasi alamat (MAR) → sinyal kontrol → respon memori taruh data di data bus → CPU tangkap ke MBR.

Q: Apa itu Von Neumann bottleneck?
+ CPU & register berkembang jauh lebih cepat daripada akses memori utama (DRAM) lewat bus bandwidth terbatas, sehingga CPU sering idle menunggu data
- Memori utama terlalu cepat sehingga CPU tidak sanggup mengikutinya
- Data bus dan address bus saling tabrakan
- Register kehabisan daya karena terlalu banyak dipakai
> Dampaknya CPU modern menghabiskan siklus clock dalam idle wait state; mitigasi: bus lebih lebar, clock bus lebih cepat, cache lebih besar.
```

## Sources

- emu8086 — 8086 assembler tutorial (dokumentasi resmi emu8086):
  https://surendrajat.github.io/emu8086/documentation/asm_tutorial_01.html
- emu8086 (situs resmi): https://emu8086.com/
- Intel® 64 and IA-32 Architectures Software Developer's Manuals (arsitektur
  register & memori resmi Intel):
  https://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html
- OSDev Wiki — referensi open source arsitektur bus & Von Neumann:
  https://wiki.osdev.org/Main_Page
- NASM documentation (open source): https://www.nasm.us/doc/