# Pertemuan 4 — Siklus Instruksi, Instruction Set & Addressing Mode

Catatan recall dari slide `materi/pertemuan-04-siklus-instruksi-addressing.pdf`.
Inti sesi: bagaimana CPU ngejar instruksi dari fetch sampai execute, dan
bagaimana ia nemuin operand tiap addressing mode.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

## Peta materi

CPMK: menganalisis tahapan siklus instruksi dan penggunaan addressing mode
dalam eksekusi program. Empat indikator:

1. Menjelaskan tahapan **fetch–decode–execute** serta peran register PC, MAR,
   MDR, IR, dan AC.
2. Mengidentifikasi elemen instruksi, klasifikasi instruction set, dan desain
   **CISC vs RISC**.
3. Menghitung **effective address (EA)** dan operand pada setiap addressing
   mode.
4. Menganalisis eksekusi program dengan memadukan siklus instruksi dan
   addressing mode.

Alur materi: 01 siklus instruksi (fetch, decode, execute, interrupt) → 02
instruction set (anatomi & CISC vs RISC) → 03 addressing mode (EA & 8 mode
utama) → studi kasus: 3 soal analisis + kunci jawaban.

## Apa itu siklus instruksi?

Siklus instruksi = urutan langkah tetap yang diulang CPU buat mengeksekusi
setiap instruksi program: **mengambil instruksi dari memori utama,
menerjemahkan maknanya, menjalankan operasinya, lalu memeriksa interupsi** —
berulang terus hingga instruksi **HLT** ditemui.

```
FETCH (01) -> DECODE (02) -> EXECUTE (03) -> INTERRUPT CHECK (04) -> balik ke FETCH
```

- **FETCH** — ambil instruksi dari memori pada alamat yang ditunjuk PC.
- **DECODE** — Control Unit menafsirkan opcode & mode pengalamatan.
- **EXECUTE** — ALU / unit terkait melaksanakan operasi.
- **INTERRUPT CHECK** — periksa permintaan interrupt sebelum fetch berikutnya.

**Register kunci CPU:**

| Register | Singkatan | Peran |
|---|---|---|
| Program Counter | PC | alamat instruksi berikutnya |
| Memory Address Register | MAR | alamat memori yang diakses |
| Memory Data Register | MDR | data yang dibaca/ditulis memori |
| Instruction Register | IR | instruksi yang sedang dieksekusi |
| Accumulator | AC | register kerja ALU untuk operand & hasil |

## Mikro-operasi per tahap (sinkron clock T0, T1, T2, …)

**FETCH:**

```asm
T0: MAR <- PC
T1: MDR <- M[MAR], PC <- PC + 1
T2: IR <- MDR
```

**DECODE:**

```asm
T3: Control Unit mendekode opcode di IR -> sinyal kendali
    identifikasi mode pengalamatan & lokasi operand
```

**EXECUTE** (contoh instruksi `ADD X`):

```asm
T4: MAR <- IR(address)
T5: MDR <- M[MAR]
T6: AC <- AC + MDR
```

**INTERRUPT:** jika flag interrupt aktif → simpan alamat kembali, muat alamat
ISR ke PC; kalau tidak → lanjut fetch instruksi berikutnya.

> [!NOTE]
> PC dinaikkan 1 (atau sebesar panjang instruksi) selama fetch — itulah
> sebabnya program berjalan **sekuensial**. Lompatan (`JMP`/`CALL`) dilakukan
> dengan **menimpa isi PC**.

## Tracing eksekusi program

Program contoh:

```asm
0100:   LDA 0050H   ; AC <- M[0050]
0101:   ADD 0051H   ; AC <- AC + M[0051]
0102:   STA 0052H   ; M[0052] <- AC
0103:   HLT
```

Isi memori awal: `M[0050H] = 24H` (36), `M[0051H] = 18H` (24).

| Instruksi | PC awal | IR setelah fetch | Perubahan register | AC setelah execute |
|---|---|---|---|---|
| LDA 0050H | 0100H | LDA 0050H | PC → 0101H; AC ← M[0050H] | 24H |
| ADD 0051H | 0101H | ADD 0051H | PC → 0102H; AC ← 24H + 18H | 3CH |
| STA 0052H | 0102H | STA 0052H | PC → 0103H; M[0052H] ← AC | 3CH |
| HLT | 0103H | HLT | CPU berhenti | — |

Hasil akhir **M[0052H] = 3CH (60 desimal)**. Pola yang selalu terjadi: selama
fetch PC bertambah 1, sehingga eksekusi mengalir 0100H → 0103H.

## Anatomi instruksi

```
OPCODE      ADDRESS FIELD
ADD         B7H
```

Contoh: `ADD` = opcode penjumlahan; field alamat `B7H` menunjuk lokasi data.
Empat referensi dalam satu instruksi:

1. **Operation code** — operasi yang dilakukan.
2. **Source operand reference** — sumber data.
3. **Result operand reference** — lokasi hasil disimpan.
4. **Next instruction reference** — alamat instruksi berikutnya (biasanya
   **implisit via PC**).

**Format & ukuran:**

- Panjang instruksi umumnya **8–64 bit**.
- Jumlah field alamat: **0-, 1-, 2-, atau 3-alamat**.
- Trade-off desain: instruksi lebih kuat vs instruksi lebih pendek.

**Klasifikasi instruction set:**

| Kelas | Contoh instruksi |
|---|---|
| Data Transfer | MOV, LDA, STA, PUSH, POP |
| Arithmetic | ADD, SUB, MUL, DIV, INC |
| Logical & Bit | AND, OR, XOR, NOT, SHL, SHR |
| Control Flow | JMP, JZ, CALL, RET |
| Input/Output | IN, OUT |
| System | HLT, NOP, INT |

## CISC vs RISC

| Aspek | CISC — x86 | RISC — ARM / RISC-V |
|---|---|---|
| Jumlah instruksi | sangat banyak, 1.000+ bentuk (dengan ekstensi SIMD) | relatif sedikit & sederhana |
| Panjang instruksi | **variabel, 1–15 byte** | tetap (ARM 4 byte; RISC-V 4 atau 2 byte) |
| Akses memori | hampir semua instruksi boleh menyentuh memori (mis. `MOV [mem], reg`) | **load/store**: hanya LOAD & STORE yang akses memori |
| Addressing mode | kompleks dan banyak | sederhana dan sedikit |
| Register GPR | 16 GPR (x86-64) | ARM64: 31 GPR; RISC-V: 32 GPR |
| Penggunaan nyata | Intel/AMD x86 — desktop & server | ARM — ponsel & embedded; RISC-V — riset & IoT |

Trade-off inti: **CISC unggul kepadatan kode, RISC unggul kecepatan pipeline
& kesederhanaan hardware.** CPU modern CISC bahkan menerjemahkan instruksi
x86 jadi mikro-operasi ala RISC di dalam prosesor.

## Effective Address (EA): kunci semua mode

Field alamat pada instruksi **TIDAK selalu sama** dengan lokasi data
sebenarnya. **Effective Address (EA)** = alamat sebenarnya tempat operand
berada:

```
EA = base + index + displacement
```

**Kenapa CPU butuh banyak mode?**

1. **Fleksibilitas struktur data** — mendukung pointer, array, rekaman lewat
   register indeks/pointer.
2. **Efisiensi memori** — field alamat instruksi bisa lebih pendek daripada
   alamat lengkap.
3. **Program relocatable** — mode relatif-PC memungkinkan program dipindah
   lokasi memori tanpa disusun ulang.

Kelompok **tanpa akses memori:** implied/stack, immediate, register.
Kelompok **melibatkan memori:** direct, indirect, register indirect,
indexed, based, PC-relative.

## 8 addressing mode utama

| Mode | Formula EA | Contoh | Cara operand diperoleh | Kegunaan |
|---|---|---|---|---|
| Implied / Stack | tanpa field alamat | CMA | operand implisit pada AC atau top of stack | operasi 1-operand, manipulasi stack |
| Immediate | operand tertanam | `MOV A, #25H` | data langsung dibaca dari instruksi | inisialisasi konstanta |
| Register | EA = register | `ADD R1, R2` | operand = isi register | operasi tercepat antar register |
| Register Indirect | EA = isi register | `MOV A, (R0)` | register menyimpan alamat operand | traversing pointer |
| Direct | EA = field alamat | `LDA 0050H` | alamat operand tertulis langsung di instruksi | akses variabel global |
| Indirect | EA = M[field] | `LDA (0050H)` | isi sel 0050H adalah alamat operand | pointer di memori |
| Indexed | EA = base + index | `LDA 30H(X), X=05H` | alamat dasar + isi register indeks | akses elemen array |
| PC-Relative | EA = PC + displacement | `JMP +08H` | offset bertanda relatif terhadap PC | branch, loop, kode relocatable |

> [!NOTE]
> EA = effective address (alamat sebenarnya operand), M[X] = isi memori pada
> alamat X. **Gunakan mode paling sederhana yang memenuhi kebutuhan** — mode
> sederhana cepat tapi kaku, mode kompleks fleksibel tapi nambah langkah
> siklus.

## Analisis terintegrasi: siklus instruksi + addressing mode

Skenario: instruksi `ADD 40H(X)` — mode **indexed**, X = 10H, M[0050H] =
07H, AC = 12H, PC = 0200H.

1. **FETCH** — `MAR <- PC; MDR <- M[0200H]; PC <- 0201H; IR <- ADD 40H(X)`
2. **DECODE** — opcode = ADD; mode = indexed; field alamat = 40H
3. **HITUNG EA** — `EA = 40H + X = 40H + 10H = 0050H` → `MAR <- 0050H`
4. **AMBIL OPERAND** — `MDR <- M[0050H] = 07H`
5. **EXECUTE** — `AC <- AC + MDR = 12H + 07H = 19H`

Mode addressing **menambah langkah perhitungan EA** di antara decode dan
execute. Semakin kompleks mode, semakin panjang siklus — inilah trade-off
yang membedakan filosofi CISC dan RISC.

## Soal studi kasus (kerjakan individu ±25 menit)

Tulis **mikro-operasi setiap tahap** — bukan hanya hasil akhirnya.

**01 Tracing siklus instruksi**

```asm
0200: LDA 0060H
0201: ADD 0061H
0202: STA 0062H
0203: HLT
; M[0060H] = 2AH, M[0061H] = 16H
```

(a) tulis mikro-operasi tahap fetch untuk instruksi pertama; (b) berikan nilai
PC, MAR, MDR, IR, AC setelah tiap instruksi selesai; (c) berapa isi
M[0062H] setelah program berhenti? → kunci: `2AH + 16H = 40H`.

**02 Menghitung effective address**

Instruksi `LDA` dengan field alamat 30H; register X = 08H; R1 = 30H; memori:
`M[0030H] = 0040H`, `M[0038H] = 0BH`, `M[0040H] = 2CH`. Hitung EA dan operand
yang diperoleh untuk mode: (a) immediate; (b) direct; (c) indirect; (d)
register indirect via R1; (e) indexed dengan base 30H.

**03 Analisis program & mode**

```asm
0100: LDA #0AH
0101: ADD 0040H
0102: ADD (0041H)
0103: STA 0060H
0104: HLT
; M[0040H] = 14H, M[0041H] = 0050H, M[0050H] = 09H
```

(a) identifikasi addressing mode tiap instruksi (immediate / direct /
indirect); (b) uraikan tahapan eksekusi `ADD (0041H)` dari fetch sampai
execute; (c) hitung nilai akhir AC dan isi M[0060H].

## Rangkuman

1. **Siklus instruksi** — fetch–decode–execute–interrupt diulang terus;
   register PC, MAR, MDR, IR, AC mengoordinasikan setiap langkah, dan PC
   selalu maju 1 saat fetch.
2. **Instruction set** — antarmuka hardware–software: klasifikasi instruksi
   (data transfer, arithmetic, logical, control, I/O, system) serta pilihan
   desain CISC vs RISC sebagai trade-off kepadatan kode vs kecepatan
   pipeline.
3. **Addressing mode** — menentukan cara CPU menemukan operand lewat EA;
   mode sederhana cepat tapi kaku, mode kompleks fleksibel tapi menambah
   langkah siklus.

Bacaan lanjutan slide: **Stallings — Computer Organization and Architecture
(11th ed., Pearson)** dan **Mano, M.M. — Computer System Architecture (3rd
ed., Pearson)**.

```quiz
Q: Kenapa PC bertambah 1 (atau sebesar panjang instruksi) di setiap fetch?
+ Karena instruksi berikutnya tersimpan berurutan di memori; PC maju otomatis membuat program berjalan sekuensial — lompatan JMP/CALL menimpa PC
- Supaya register AC tidak penuh
- Karena instruksi wajib berjarak 1 byte
- Itu aturan DOS yang tidak bisa diubah
> Catatan slide: "PC dinaikkan selama fetch — itulah sebabnya program berjalan sekuensial. Lompatan dilakukan dengan menimpa isi PC."

Q: Pada mikro-operasi fetch `T1: MDR <- M[MAR], PC <- PC + 1` — apa yang terjadi secara bersamaan?
+ Data instruksi diambil dari memori ke MDR DAN PC di-increment untuk menyiapkan instruksi berikutnya
- MDR dikosongkan lalu PC dikurangi
- IR langsung berisi instruksi tanpa lewat MDR
- MAR diisi alamat baru dari IR
> Fetch 3 langkah: T0 MAR<-PC, T1 MDR<-M[MAR] + PC+1, T2 IR<-MDR.

Q: Instruksi `MOV A, #25H` memakai addressing mode apa?
+ Immediate — operand tertanam langsung di instruksi, dibaca langsung dari instruksi tanpa akses memori
- Direct — alamat tertulis di instruksi
- Indirect — alamat diambil dari memori
- Indexed — alamat dasar ditambah register indeks
> Tabel 8 mode: immediate = data langsung dibaca dari instruksi; EA = operand itu sendiri (kelompok tanpa akses memori).

Q: Instruksi `LDA (0050H)` dengan M[0050H] = 0040H dan M[0040H] = 2CH — berapa isi AC?
+ 2CH — mode indirect: EA = M[0050H] = 0040H, lalu operand = M[0040H] = 2CH
- 0050H karena alamat langsung dipakai
- 0040H karena isi sel pertama langsung jadi operand
- 0050H + 2CH
> Indirect: EA = M[field] — isi sel 0050H adalah ALAMAT operandnya, jadi data yang diambil dari 0040H = 2CH.

Q: Instruksi `ADD 40H(X)` mode indexed dengan X = 10H — EA-nya berapa?
+ 0050H (EA = base + index = 40H + 10H)
- 0040H
- 0010H
- 0200H
> Skenario analisis terintegrasi di slide: EA = 40H + X = 40H + 10H = 0050H, lalu MAR <- 0050H dan MDR <- M[0050H].

Q: Perbedaan utama CISC dan RISC soal akses memori?
+ CISC hampir semua instruksi boleh menyentuh memori; RISC load/store — hanya LOAD & STORE yang mengakses memori, sisanya lewat register
- CISC tidak boleh akses memori sama sekali
- RISC semua instruksi wajib akses memori
- Keduanya identik, hanya beda nama
> Tabel CISC vs RISC: panjang instruksi CISC variabel 1–15 byte vs RISC tetap 4 byte; trade-off kepadatan kode vs kecepatan pipeline.

Q: Setelah program 0200 LDA/0201 ADD/0202 STA dengan M[0060H]=2AH, M[0061H]=16H, berapa isi M[0062H]?
+ 40H (2AH + 16H)
- 2AH
- 16H
- 3CH
> LDA tarik 2AH ke AC, ADD tambah 16H → AC = 40H, STA simpan ke M[0062H].
```

## Sources

- emu8086 — 8086 instruction set (dokumentasi resmi emu8086):
  https://surendrajat.github.io/emu8086/documentation/8086_instruction_set.html
- emu8086 — 8086 assembler tutorial:
  https://surendrajat.github.io/emu8086/documentation/asm_tutorial_01.html
- emu8086 (situs resmi): https://emu8086.com/
- Intel® 64 and IA-32 Architectures Software Developer's Manuals (referensi
  resmi format instruksi & addressing Intel):
  https://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html
- OSDev Wiki — x86 instruction encoding (open source):
  https://wiki.osdev.org/X86-64_Instruction_Encoding