# Pertemuan 1 — Dasar Bahasa Assembly: Assembler, Register & Transfer Data

Catatan recall dari slide `materi/pertemuan-01-dasar-assembly.pdf`. Buat baca cepat
sebelum praktikum emu8086.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

## Apa itu bahasa assembly?

Bahasa assembly = bahasa tingkat rendah yang mewakili instruksi bahasa mesin
pakai mnemonic yang gampang dibaca manusia. Satu instruksi Assembly **berpadanan
satu instruksi bahasa mesin** (hampir satu-ke-satu):

```asm
MOV AL, 25H   ->  B0 25
ADD AL, 41H   ->  04 41
INT 21H       ->  CD 21
```

Kolom kanan itu kode mesin heksadesimal yang beneran dieksekusi CPU. Alur
penerjemahannya:

```
Bahasa Tingkat Tinggi (C, Pascal)
    -> Bahasa Assembly (mnemonic)
    -> Bahasa Mesin (biner)   ; diterjemahkan oleh ASSEMBLER
```

**Plus minusnya:**

- Tingkat rendah & spesifik mesin — program 8086 gak langsung jalan di
  arsitektur lain (mis. ARM).
- Kendali penuh atas hardware — register, memori, port I/O diakses langsung;
  program kecil dan cepat.
- Lebih mudah dibaca daripada biner — mnemonic, label, komentar menggantikan
  deretan bit.

## Assembler: mnemonic -> kode objek -> eksekusi

Assembler adalah program yang menerjemahkan kode sumber Assembly (`.asm`)
menjadi kode objek (`.obj`) berisi bahasa mesin. **Linker** kemudian merangkai
kode objek menjadi berkas eksekusi (`.exe` / `.com`) yang siap dijalankan.

```
1. Kode Sumber (.asm)  ->  2. Assembler  ->  3. Linker  ->  4. Eksekusi
   ditulis di editor       mnemonic jadi      objek dirangkai   jalan di DOS /
   teks                    kode objek (.obj)  jadi .exe         emulator
                                                                 (emu8086)
```

**Perkakas assembler 8086:**

| Nama | Keterangan |
|---|---|
| MASM | Microsoft Macro Assembler; acuan sintaks Intel dari Microsoft |
| TASM | Turbo Assembler dari Borland; populer di era DOS, kompatibel MASM |
| emu8086 | Simulator lengkap: editor, assembler, debugger visual; ideal buat praktikum |
| NASM | Netwide Assembler; open source, sintaks mirip Intel |

> [!NOTE]
> Contoh di materi ini pakai **sintaks Intel** dan bisa diuji langsung di
> emu8086. Sintaks Intel: urutan operand `tujuan, sumber` (`MOV AL, 25H`
> berarti AL ← 25H).

## Kerangka program & format instruksi

Kerangka program 8086 (sintaks Intel):

```asm
.MODEL SMALL       ; model memori program
.STACK 100H        ; alokasi stack 256 byte
.DATA              ; ---- segmen data
NILAI1    DB 25H   ; variabel 1 byte
NILAI2    DB 41H
HASIL     DB ?     ; belum diisi
.CODE              ; ---- segmen kode
MAIN     PROC
    MOV AX, @DATA
    MOV DS, AX     ; wajib: isi DS
    ...            ; instruksi Anda
    MOV AH, 4CH
    INT 21H        ; kembali ke DOS
MAIN     ENDP
END MAIN
```

Format satu instruksi:

```asm
[Label:] Mnemonic Operand1, Operand2 [;Komentar]
```

- **Label** — penanda alamat untuk lompatan (opsional).
- **Mnemonic** — nama operasi: `MOV`, `ADD`, `SUB`, `INT`.
- **Operand** — tujuan ditulis dulu, sumber di belakang.
- **Komentar** — setelah tanda `;`, tidak dieksekusi.
- **Directive** (`DB`, `PROC`, `END`, `.MODEL`) = petunjuk bagi **assembler**,
  bukan instruksi mesin. `DB` = define byte, `DW` = define word.

## Register 8086

Register = sel penyimpanan kecil di dalam CPU dengan akses tercepat. 8086
punya **8 register 16-bit**; empat di antaranya serbaguna dan bisa dipecah
jadi dua register 8-bit:

| Register | Nama | Peran |
|---|---|---|
| AX | Akumulator | operand utama aritmetika/logika; dipakai `MUL`, `DIV`, `IN/OUT` |
| BX | Base | alamat dasar data; pengalamatan tidak langsung, mis. `MOV AX, [BX]` |
| CX | Counter | penghitung otomatis `LOOP`; jumlah pergeseran bit disimpan di CL |
| DX | Data | berpasangan AX di `MUL`/`DIV` (DX:AX); alamat port `IN`/`OUT` |

**Register lainnya:**

- **Segmen** `CS·DS·SS·ES` — blok memori 64 KB untuk kode (CS), data (DS),
  stack (SS), segmen ekstra (ES).
- **Pointer** `SP·BP` — SP menunjuk puncak stack; BP menunjuk dasar data di
  stack.
- **Index** `SI·DI` — SI (source) dan DI (destination) nunjuk alamat data
  buat operasi string / perpindahan beruntun.
- **Kontrol** `IP·FLAGS` — IP menyimpan alamat instruksi berikutnya; FLAGS
  menyimpan status hasil operasi.

Flag yang sering dibaca: `ZF` (hasil = nol), `CF` (ada carry/borrow), `SF`
(hasil negatif, bit tertinggi = 1), `OF` (overflow bilangan bertanda).

> [!NOTE]
> **Alamat fisik 20-bit = Segmen × 10H + Offset.** Contoh: DS = 1000H,
> offset = 0020H → alamat fisik **10020H**.

## Instruksi MOV — menyalin data

Sintaks: `MOV tujuan, sumber`. Menyalin isi sumber ke tujuan; **isi sumber
tidak berubah; tidak mempengaruhi flag.**

| Instruksi | Mode pengalamatan |
|---|---|
| `MOV AL, 25H` | konstanta ke register (immediate) |
| `MOV BX, AX` | register ke register |
| `MOV AL, NILAI1` | memori ke register (direct) |
| `MOV HASIL, AL` | register ke memori |
| `MOV AX, [BX]` | isi alamat [BX] ke register (tidak langsung) |

**Larangan MOV:**

- `MOV NILAI2, NILAI1` — **memori ke memori dilarang**; salin lewat register
  dulu.
- `MOV DS, ES` — register segmen ke segmen dilarang.
- `MOV DS, 1234H` — konstanta ke register segmen dilarang.
- Ukuran operand harus sama (byte–byte, word–word); **CS tidak boleh jadi
  tujuan.**

Cara bener buat nyalin ke segmen:

```asm
MOV AX, 1234H
MOV DS, AX
```

## XCHG, LEA, PUSH, POP

```asm
MOV AL, 25H
MOV BL, 41H
XCHG AL, BL     ; AL=41H, BL=25H  — menukar isi dua operand

LEA BX, NILAI1  ; BX = offset NILAI1 — alamat efektif, BUKAN isinya

PUSH AX         ; SP berkurang 2
POP BX          ; SP bertambah 2
```

- **XCHG** — menukar isi dua operand. Gak berlaku untuk register segmen; gak
  bisa memori↔memori.
- **LEA** — memuat alamat efektif (offset). Yang diambil ALAMAT variabelnya,
  bukan isinya; register tujuan 16-bit.
- **PUSH/POP** — simpan & ambil dari stack. Bekerja pada data **word**;
  prinsip **LIFO** — terakhir masuk, pertama keluar.

> [!TIP]
> Kombinasi ketiganya jadi alat dasar buat mindahin data **tanpa melanggar
> larangan MOV** (memori↔memori, segmen↔segmen).

## Operasi aritmetika sederhana & flag

| Instruksi | Efek |
|---|---|
| `ADD` | tujuan = tujuan + sumber |
| `SUB` | tujuan = tujuan − sumber |
| `INC` | tujuan = tujuan + 1 |
| `DEC` | tujuan = tujuan − 1 |

Jejak eksekusi & pengaruh ke flag:

```asm
01 MOV AL, 25H      ; AL = 25H
02 ADD AL, 41H      ; AL = 66H (25H+41H)
03 DEC AL           ; AL = 65H
04 MOV HASIL, AL    ; HASIL = 65H
```

| Instruksi | CF | ZF / SF / OF |
|---|---|---|
| MOV | tidak mengubah flag | — |
| ADD / SUB | **berubah** | berubah |
| INC / DEC | **TIDAK berubah** | berubah |

Cara baca flag: `ZF=1` bila hasil nol; `CF=1` bila ada carry/borrow; `SF` =
bit tanda hasil; `OF=1` bila overflow bilangan bertanda.

> [!NOTE]
> Setelah `ADD AL, 41H` di studi kasus 1: ZF=0 (hasil tidak nol), CF=0
> (tidak ada carry).

## Studi kasus 1 — jumlahkan dua variabel

Target: `HASIL = NILAI1 + NILAI2` dengan NILAI1 = 25H (37), NILAI2 = 41H (65),
target HASIL = 66H (102).

```asm
.MODEL SMALL
.STACK 100H
.DATA
NILAI1    DB     25H
NILAI2    DB     41H
HASIL      DB    ?
.CODE
MAIN       PROC
    MOV     AX, @DATA      ; 1) isi DS
    MOV     DS, AX
    MOV     AL, NILAI1     ; 2) AL = 25H      (memori -> register)
    ADD     AL, NILAI2     ; 3) AL = AL + 41H = 66H
    MOV     HASIL, AL      ; 4) simpan hasil  (register -> memori)
    MOV     AH, 4CH        ; 5) selesai
    INT     21H
MAIN       ENDP
END MAIN
```

Poin analisis: `MOV` dipakai dua kali karena MOV dilarang memori→memori;
`ADD AL, NILAI2` sah — register boleh dijumlahkan dengan operand memori.

## Studi kasus 2 — tukar isi dua variabel & dua register

Tantangan: MOV maupun XCHG dilarang langsung memori↔memori — data harus
melewati register atau stack.

**Solusi A — XCHG via register:**

```asm
MOV AL, NILAI1     ; AL = 25H
MOV BL, NILAI2     ; BL = 41H
XCHG AL, BL        ; AL=41H, BL=25H
MOV NILAI1, AL     ; NILAI1 = 41H
MOV NILAI2, BL     ; NILAI2 = 25H
```

**Solusi B — PUSH/POP antar register:**

```asm
MOV AX, 2541H
MOV BX, 6C3DH
PUSH AX            ; AX masuk stack
PUSH BX            ; BX di puncak
POP AX             ; AX = 6C3DH
POP BX             ; BX = 2541H
```

LIFO: data yang masuk terakhir (BX) keluar pertama — isi AX dan BX tertukar.
Kunci: **XCHG paling ringkas untuk register; PUSH/POP berguna menyelamatkan
isi register sebelum register dipakai ulang.**

## Tugas mandiri & rangkuman

- **T1** — rotasi tiga variabel: A → B, B → C, C → A pakai register +
  XCHG. Data uji A=11H, B=22H, C=33H; hasil akhir A=33H, B=11H, C=22H.
- **T2** — `HASIL = (A + B) − (C + D)`, byte: A=18H, B=24H, C=10H, D=0CH.
  Hasil yang diharapkan **20H**; register perantara wajib karena gak boleh
  memori↔memori.
- **T3** — tukar isi AX dan CX hanya dengan PUSH/POP (tanpa XCHG), tulis
  urutan LIFO dan isi register sebelum–sesudah.

Rangkuman: (1) assembly mewakili bahasa mesin dengan mnemonic; assembler
menerjemahkan jadi kode objek. (2) register 8086: AX–DX serbaguna,
CS/DS/SS/ES segmen, SP/BP/SI/DI penunjuk, IP & FLAGS kontrol. (3)
MOV/XCHG/LEA/PUSH/POP memindahkan data — ingat larangan memori↔memori dan
segmen↔segmen. (4) ADD/SUB/INC/DEC operasi sederhana; hasilnya bisa dicek
lewat flag ZF, CF, SF, OF.

Aturan praktikum: sintaks Intel 8086, komentar tiap baris wajib, kumpulkan
file `.asm` + screenshot register.

## Ringkasan perintah

| Perintah | Fungsi | Contoh |
|---|---|---|
| `MOV` | salin/isi nilai | `MOV AL, 25H` |
| `XCHG` | tukar isi dua operand | `XCHG AL, BL` |
| `LEA` | muat alamat efektif | `LEA BX, NILAI1` |
| `PUSH` | masukkan ke stack (SP−2) | `PUSH AX` |
| `POP` | ambil dari stack (SP+2) | `POP BX` |
| `ADD`/`SUB` | tambah/kurang + update flag | `ADD AL, 41H` |
| `INC`/`DEC` | ±1 (CF tidak berubah) | `DEC AL` |

```quiz
Q: Perbedaan mendasar bahasa assembly dengan bahasa tingkat tinggi seperti C?
+ Satu instruksi assembly hampir berpadanan satu instruksi bahasa mesin, hasil terjemahan langsung dieksekusi CPU
- Assembly tidak butuh diterjemahkan, langsung dieksekusi mentah-mentah
- C tidak bisa mengakses register sama sekali
- Assembly selalu berjalan di semua arsitektur (ARM, RISC-V, x86)
> Slide: padanan satu-ke-satu, mis. MOV AL,25H -> B0 25. Kode assembly tetap diterjemahkan assembler dulu jadi .obj lalu linker jadi .exe.

Q: Kenapa `MOV NILAI2, NILAI1` (memori ke memori) dilarang di 8086?
+ Instruksi 8086 hanya boleh satu operand memori, sisanya harus register/immediate; salin dulu lewat register
- Karena NILAI1 dan NILAI2 tipe datanya beda
- Larangan itu hanya berlaku di TASM, di emu8086 boleh
- Karena memori tidak bisa dibaca sama sekali
> Larangan MOV: memori ke memori dilarang — pola aman: MOV AL, NILAI1; MOV NILAI2, AL.

Q: Setelah `MOV AL,25H` / `ADD AL,41H` / `DEC AL`, isi AL dan HASIL akhirnya?
+ AL = 65H, HASIL = 65H
- AL = 66H, HASIL = 66H
- AL = 67H, HASIL = 67H
- AL = 25H karena DEC mengembalikan nilai awal
> 25H + 41H = 66H, lalu DEC -1 = 65H. INC/DEC tidak mengubah CF tapi mengubah ZF/SF/OF.

Q: `LEA BX, NILAI1` — apa yang masuk ke BX?
+ Offset (alamat efektif) variabel NILAI1, bukan isinya
- Isi variabel NILAI1 (25H)
- Seluruh segmen data
- Nilai 0 karena LEA cuma buat label
> LEA = Load Effective Address: yang diambil alamatnya; register tujuan 16-bit.

Q: Urutan PUSH AX, PUSH BX, POP AX, POP BX (AX=2541H, BX=6C3DH) menghasilkan...
+ AX = 6C3DH dan BX = 2541H (isi tertukar)
- AX = 2541H dan BX = 6C3DH (tidak berubah)
- AX = BX = 6C3DH
- Program error karena POP urutannya salah
> LIFO: BX masuk terakhir → keluar pertama ke AX. Ini solusi B tukar data di slide studi kasus 2.

Q: Mengapa baris `MOV DS, AX` setelah `MOV AX, @DATA` wajib di program .DATA?
+ Agar DS menunjuk segmen data; tanpa itu akses variabel .DATA baca dari segmen yang salah
- Supaya program compile tanpa error
- Wajib buat mengaktifkan interrupt DOS
- Biar register AX tidak terbuang percuma
> Kerangka program 8086 di slide: "MOV DS, AX ; wajib: isi DS".
```

## Sources

- emu8086 — 8086 assembler tutorial (dokumen resmi hasil mirror dokumentasi
  emu8086): https://surendrajat.github.io/emu8086/documentation/asm_tutorial_01.html
- emu8086 (situs resmi): https://emu8086.com/
- emu8086 — 8086 instruction set (referensi instruksi resmi):
  https://surendrajat.github.io/emu8086/documentation/8086_instruction_set.html
- Intel® 64 and IA-32 Architectures Software Developer's Manuals:
  https://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html
- NASM documentation (open source assembler):
  https://www.nasm.us/doc/