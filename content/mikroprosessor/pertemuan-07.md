# Pertemuan 7 — Percabangan, Perulangan, Subroutine & Interrupt (P07)

Catatan recall dari slide `materi/pertemuan-07.pdf`. Buat UTS nanti ini yang
dibaca cepat — empat konsep kontrol alur jadi satu.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

> [!WARNING]
> **File `pertemuan-07.pdf` IDENTIK byte-per-byte dengan
> `pertemuan-06-percabangan-perulangan-subroutine.pdf`** (md5 sama:
> `d9b33cf8fc4585ab7b3e2bd9fe591858`). Jadi P07.pdf adalah kembaran P06, bukan
> materi baru — sudah diverifikasi dengan perbandingan hash. `pertemuan-07.docx`
> juga bukan materi: isinya cuma cover (Sistem Mikroprosessor, Andrian Maulana
> Dzikwan, TIF RP 24 CNS E). Karena itu catatan ini fokus ke **isi unik
> materinya** secara utuh — 4 konsep kontrol alur, 6 latihan soal + kunci,
> dan 2 studi kasus terintegrasi — supaya P07 tetap punya catatan sendiri
> yang beda sudut dari `pertemuan-06-aritmetika-cabang.md` (yang fokus ke
> tugas aritmetika/masking).

## Peta materi (12 slide, 6 bagian)

CPMK: mahasiswa mampu membuat program menggunakan percabangan, perulangan,
subroutine, dan interrupt sederhana.

| # | Bagian | Isi |
|---|---|---|
| 01 | Percabangan | CMP, flag register, JMP & jump bersyarat |
| 02 | Perulangan | LOOP & CX, jebakan CX=0, JCXZ |
| 03 | Subroutine | CALL/RET, stack, PROC/ENDP |
| 04 | Interrupt | tabel vektor, INT 21h DOS, IRET |
| 05 | Latihan Soal | 6 soal + pembahasan langsung |
| 06 | Studi Kasus | 2 kasus terintegrasi 4 konsep |

Prasyarat: register serbaguna 8086 (AX, BX, CX, DX), notasi heksadesimal,
dasar MOV dan INT 21h. Alat: emulator emu8086 atau TASM/MASM.

## 01 · Percabangan: memilih jalur dengan flag

Percabangan mengarahkan CPU ke salah satu dari beberapa jalur berdasar
kondisi. Di 8086 polanya **selalu berpasangan**: instruksi pembanding
mengubah flag, lalu instruksi lompat **membaca flag itu**.

```asm
CMP a, b   ; menghitung a-b untuk memperbarui flag; hasil DIBUANG, operand tidak berubah
TEST a, b  ; AND logika hanya untuk flag; kedua operand tetap
```

**Flag kunci yang dibaca jump:**

- `ZF` — zero: hasil nol
- `CF` — carry: simpanan/pinjaman
- `SF` — sign: bit tertinggi = 1
- `OF` — overflow: keluar rentang signed

**Tabel jump bersyarat umum (Intel 8086):**

| Mnemonic | Arti | Syarat | Setara |
|---|---|---|---|
| `JE` / `JZ` | sama dengan | ZF=1 | == |
| `JNE` / `JNZ` | tidak sama | ZF=0 | != |
| `JG` / `JNLE` | lebih besar (signed) | ZF=0 dan SF=OF | > |
| `JL` / `JNGE` | lebih kecil (signed) | SF ≠ OF | < |
| `JA` / `JNBE` | di atas (unsigned) | CF=0 dan ZF=0 | > |
| `JB` / `JNAE` | di bawah (unsigned) | CF=1 | < |

> [!NOTE]
> `JMP` = lompat tanpa syarat (selalu lompat). Pada 8086 **semua jump
> bersyarat hanya berjarak SHORT: −128 s.d. +127 byte**; untuk jarak jauh,
> jembatani dengan `JMP near`.

### Contoh: uji tanda bilangan (positif / nol / negatif)

```asm
MOV AL, 0FBh    ; 0FBh = -5 (8-bit dua-komplemen)
CMP AL, 0       ; hitung AL-0, hanya untuk flag
JG  POSITIF     ; jika lebih besar (signed) -> positif
JL  NEGATIF     ; jika lebih kecil (signed) -> negatif
MOV DL, 'Z'     ; bukan >0 dan bukan <0 -> nol
JMP CETAK
POSITIF:
MOV DL, 'P'
JMP CETAK
NEGATIF:
MOV DL, 'N'
CETAK:
MOV AH, 02h     ; fungsi DOS: tampilkan karakter DL
INT 21h
MOV AH, 4Ch     ; akhiri program
INT 21h
```

Cara kerja dengan AL=0FBh (negatif): `CMP AL,0` → SF=1, OF=0 → `JG` gagal
(bukan positif), `JL` berhasil (SF ≠ OF) → DL='N', INT 21h mencetaknya.

Pemetaan ke bahasa tingkat tinggi:

- `if-then` → `CMP` + `Jcond`
- `if-else` → `CMP` + `Jcond` + `JMP`
- `if-else-if` beruntun → rangkaian `CMP`/`Jx`

## 02 · Perulangan: LOOP, CX, dan jebakannya

Instruksi `LOOP` memakai **CX sebagai pencacah** dan flag **TIDAK diubah**.

**Mekanisme `LOOP label`:**

1. `CX <- CX - 1`
2. jika CX ≠ 0 → lompat ke label; jika CX = 0 → lanjut instruksi berikutnya

**Variasi:**

- `LOOPZ` / `LOOPE` — ulang selama CX tidak 0 **DAN** ZF=1
- `LOOPNZ` / `LOOPNE` — ulang selama CX tidak 0 **DAN** ZF=0 (mencari data)
- `DEC CX` + `JNZ` — alternatif manual; pencacah boleh register lain

> [!NOTE]
> **Jebakan klasik: CX = 0.** Kalau CX sudah 0 saat LOOP dijalankan, CX
> berputar ke **FFFFh** sehingga badan loop berjalan **65.536 kali — bukan 0
> kali.** Ini perilaku arsitektur 8086 yang asli.

Pengaman:

```asm
MOV CX, 0       ; maksudnya 0 kali?
JCXZ SELESAI    ; pengaman: lompat jika CX = 0
ULANG:
NOP
LOOP ULANG
SELESAI:
...
```

Pemetaan ke bahasa tingkat tinggi:

- `for i := 1..N` → `MOV CX,N` lalu `LOOP`
- `while (kondisi)` → `CMP` + `Jcond` di awal badan (uji dulu)
- `repeat-until` → uji kondisi di akhir badan

### Contoh: cetak A sampai Z

```asm
MOV CX, 26      ; 26 huruf alfabet
MOV DL, 'A'     ; karakter awal
ULANG:
MOV AH, 02h     ; tampilkan karakter di DL
INT 21h
INC DL          ; geser ke karakter berikutnya
LOOP ULANG      ; CX=CX-1, ulang selama CX tidak 0
MOV AH, 4Ch     ; akhiri program
INT 21h
```

Trace: iterasi 1 `CX 26 → 25` cetak A; iterasi 2 `25 → 24` cetak B; …
iterasi 26 `1 → 0` cetak Z lalu LOOP berhenti. `INC DL` menggeser kode ASCII:
`A=41h → B=42h → … → Z=5Ah`. Output: `ABCDEFGHIJKLMNOPQRSTUVWXYZ`.

**Varian delay loop** (badan sengaja kosong buat nahan program sejenak,
lazim buat menunggu perangkat keras):

```asm
MOV CX, 0FFFFh  ; 65.535 iterasi kosong
TUNGGU:
NOP
LOOP TUNGGU
```

## 03 · Subroutine: CALL, RET, dan stack

Subroutine (subrutin/prosedur) = blok kode berdiri sendiri yang bisa dipanggil
dari banyak titik program — mencegah duplikasi dan memudahkan perawatan.

**Struktur di assembler TASM/MASM:**

```asm
label PROC      ; awal subroutine
    ...         ; isi prosedur
label ENDP
; dipanggil dengan CALL label, diakhiri RET
```

**Mekanisme CALL near (2 langkah):**

1. `PUSH` IP instruksi setelah CALL ke stack
2. `IP <- alamat subroutine`

**RET (1 langkah):** `POP IP` → eksekusi lanjut tepat setelah CALL.

`CALL far`: push CS lalu IP (lintas segmen); `RETF`: pop IP lalu CS.

**Stack & aturan main:**

- Stack = tumpukan **LIFO** pada `SS:SP`.
- `PUSH` menurunkan SP **2 byte**, `POP` menaikkan **2 byte**.
- **Jumlah PUSH harus sama dengan POP** — kalau enggak, `RET` kembali ke
  alamat yang salah.
- **Subroutine wajib menyelamatkan register yang dipakainya**: PUSH di awal,
  POP di akhir.

**Parameter & hasil:** cara paling sederhana di 8086 lewat **register** —
contoh: `DL` = karakter yang akan dicetak; hasil kembali di AL/AX. Cara lain:
variabel memori atau stack.

### Contoh: satu subroutine, dua pemanggilan

```asm
MOV DL, 'A'     ; parameter lewat register DL
CALL CETAK       ; panggil subroutine -> cetak A
MOV DL, 'B'
CALL CETAK       ; panggil lagi -> cetak B
MOV AH, 4Ch
INT 21h

CETAK PROC       ; awal subroutine
    PUSH AX      ; selamatkan register yang dipakai
    MOV AH, 02h
    INT 21h      ; tampilkan karakter DL
    POP AX       ; pulihkan register
    RET          ; kembali ke pemanggil
CETAK ENDP
```

Alur eksekusi: `MOV DL,A` siapkan parameter → `CALL CETAK` (IP alamat
instruksi `MOV AH,4Ch` didorong ke stack) → badan CETAK mencetak A, `POP AX`
→ `RET` ambil IP dari stack, lanjut setelah CALL → `MOV DL,B` dan CALL kedua
jalan sama. Output: `AB`.

> [!TIP]
> Karena AH diubah di dalam subroutine, AX diselamatkan dengan PUSH/POP —
> **praktik wajib** supaya program pemanggil gak rusak.

## 04 · Interrupt: menghentikan program untuk dilayani

Interrupt = kejadian yang membuat CPU menghentikan program utama, menjalankan
rutin layanan (**ISR — Interrupt Service Routine**), lalu melanjutkan program
utama **tepat dari titik semula**.

**Tiga sumber:**

- **Perangkat keras:** `NMI` (non-maskable, gak bisa dimatikan, tipe 2);
  `INTR` (maskable, dikendalikan flag IF, di PC lewat pengendali **8259 PIC**
  — IRQ0-IRQ7 dipetakan ke 0Fh).
- **Perangkat lunak:** `INT n` dengan n = 00h–FFh, dipanggil langsung dari
  program — inilah pintu layanan DOS/BIOS (mis. INT 21h).
- **Kondisi internal:** Tipe 0 = pembagian nol (DIV/IDIV); Tipe 1 =
  single-step saat TF=1; Tipe 4 = INTO saat OF=1.

**Tabel Vektor Interrupt (IVT):** alamat `00000h–003FFh` (1 KB pertama
memori) berisi **256 vektor × 4 byte**; tiap vektor menyimpan **IP lalu CS**
dari ISR-nya. Vektor berada di alamat **n × 4**.

**Mekanisme `INT n`:**

1. Selesaikan instruksi yang sedang berjalan.
2. Push **FLAGS**, lalu **CS**, lalu **IP** ke stack; IF dan TF dinolkan.
3. Ambil CS:IP dari vektor tipe n → jalankan ISR.
4. ISR diakhiri **IRET**: pop IP, CS, lalu FLAGS — program utama lanjut.

`STI` = set IF (izinkan interrupt maskable); `CLI` = clear IF (larang).

> [!NOTE]
> Interrupt harus diakhiri **IRET, bukan RET**, karena FLAGS juga harus
> dipulihkan.

### Layanan siap pakai: INT 21h dan INT 10h

| Interupsi | Fungsi (AH) | Tugas | I/O |
|---|---|---|---|
| INT 21h | 01h | baca 1 karakter dari keyboard (dengan echo) | → AL |
| INT 21h | 02h | tampilkan 1 karakter | DL → layar |
| INT 21h | 09h | tampilkan string di DS:DX sampai tanda `$` | → layar |
| INT 21h | 4Ch | akhiri program | kode keluar di AL |
| INT 10h | 0Eh | tulis karakter teletype (BIOS video) | AL → layar |

Polanya selalu sama: **isi AH dengan nomor fungsi, siapkan parameter register,
panggil INT.**

Contoh baca–cetak:

```asm
MOV AH, 01h     ; baca 1 karakter dari keyboard
INT 21h         ; karakter tersimpan di AL
PUSH AX         ; simpan (AX akan terpakai lagi)
MOV DX, OFFSET PSN
MOV AH, 09h     ; cetak string sampai tanda $
INT 21h
POP DX          ; pulihkan karakter yang diketik
MOV AH, 02h     ; cetak karakter di DL
INT 21h
MOV AH, 4Ch     ; akhiri program
INT 21h
PSN DB 'Anda mengetik: $'
```

Output: `Anda mengetik: X` (X = karakter yang ditekan user).

## Rangkuman — 4 konsep dalam satu tabel

| Konsep | Instruksi kunci | Register/Flag terlibat | Kegunaan khas |
|---|---|---|---|
| Percabangan | CMP, TEST, JMP, JE/JNE/JG/JL/JA/JB | Flag ZF, CF, SF, OF | memilih alur: if-else, case |
| Perulangan | LOOP, LOOPZ/LOOPNZ, JCXZ | CX sebagai pencacah | mengulang blok N kali, delay |
| Subroutine | CALL, RET, PUSH, POP, PROC/ENDP | Stack (SS:SP), register parameter | kode dipakai ulang, program modular |
| Interrupt | INT n, IRET, STI/CLI, INTO | Tabel vektor (IVT), flag IF | layanan DOS/BIOS, respons perangkat keras |

**Pesan kunci:** dalam satu program nyata keempatnya bekerja bersama —
interrupt menyediakan I/O, percabangan memilih aksi, perulangan mengulang
proses, dan subroutine merapikan kode.

## Latihan soal 1–3 (konsep & analisis)

1. **Bedanya JMP dan JE?** `JMP` lompat tanpa syarat; `JE` hanya lompat jika
   ZF=1. `JE` harus didahului instruksi pen-set flag, umumnya `CMP` —
   contoh: `CMP AL, 5` lalu `JE SAMA` berarti lompat bila AL = 5.
2. **`MOV CX, 0` diikuti `L1: LOOP L1` — berapa kali badan loop jalan?**
   LOOP kurangi CX lebih dulu baru uji: `0000h - 1 = FFFFh` → badan loop
   berjalan **65.536 kali, bukan 0 kali**. Pakai `JCXZ` sebelum loop sebagai
   pengaman.
3. **Trace:** `MOV AX,4` / `CMP AX,4` / `JE LANJUT` / `MOV DL,'T'` /
   `JMP CETAK` / `LANJUT: MOV DL,'F'` / `CETAK: MOV AH,02h` / `INT 21h` —
   karakter apa yang tampil? `CMP AX,4` hasilnya 0 → ZF=1 → `JE` melompat ke
   LANJUT sehingga DL='F'. Huruf T tidak pernah terisi. **Output: F.**

## Latihan soal 4–6 (pembuatan program & perbandingan)

4. **Cetak angka 1–5 memakai LOOP:**

```asm
MOV CX, 5
MOV DL, '1'
ULANG:
MOV AH, 02h
INT 21h
INC DL
LOOP ULANG
MOV AH, 4Ch
INT 21h
```

`INC DL` menggeser karakter 1 → 5; LOOP mengulang tepat 5 kali. Output:
`12345`.

5. **Perbedaan mekanisme kembali CALL/RET vs INT n/IRET:** `CALL near` hanya
   mendorong **IP**; `RET` mengambilnya kembali. `INT n` mendorong **FLAGS,
   lalu CS, lalu IP**, dan alamat ISR diambil dari tabel vektor; `IRET`
   memulihkan **CS, sekaligus FLAGS**. Interrupt harus diakhiri IRET, bukan
   RET.
6. **Subroutine CEK — AL=1 bila BL genap, AL=0 bila BL ganjil:**

```asm
CEK PROC
    MOV AL, 0     ; asumsi ganjil
    TEST BL, 01h  ; uji bit ke-0
    JZ  GENAP     ; bit-0 = 0 -> genap
    JMP SELESAI
GENAP:
    MOV AL, 1
SELESAI:
    RET
CEK ENDP
```

`TEST` melakukan AND hanya untuk flag; bit ke-0 = 0 berarti genap.

## Studi kasus 1 — hitung bilangan genap & ganjil (1–10)

```asm
MOV CX, 10      ; ulangi 10 bilangan
MOV BX, 0       ; BH = penghitung genap, BL = ganjil
MOV DL, 1       ; bilangan yang sedang diuji
CEK:
    TEST DL, 01h    ; uji bit ke-0 dari DL
    JZ  GENAP       ; 0 -> genap
    INC BL          ; ganjil -> naikkan BL
    JMP LANJUT
GENAP:
    INC BH          ; genap -> naikkan BH
LANJUT:
    INC DL          ; bilangan berikutnya
    LOOP CEK        ; hasil: BH = 05h (genap), BL = 05h (ganjil)
```

Trace 2 iterasi pertama: DL=01h → bit-0 = 1 → `JZ` gagal → INC BL (ganjil);
DL=02h → bit-0 = 0 → `JZ` lompat → INC BH (genap).

Hasil terverifikasi di emu8086: **BH = 05h** (genap: 2,4,6,8,10), **BL =
05h** (ganjil: 1,3,5,7,9).

Poin belajar: (1) `LOOP CX=10` menjamin tepat 10 iterasi; (2) `TEST` + `JZ`
menguji bit tanpa mengubah isi DL; (3) setara pseudocode
`for n=1..10 { if n mod 2 = 0 then ... }`.

Pengembangan: ubah penghitung ke ASCII dengan `ADD BH, '0'` lalu tampilkan
via `AH=02h` — latihan mandiri.

## Studi kasus 2 — program menu interaktif (integrasi 4 konsep)

Skenario: program menampilkan menu, membaca pilihan dari keyboard,
menjalankan aksi sesuai pilihan, lalu kembali ke menu sampai pengguna memilih
keluar.

- **Interrupt** — INT 21h (09h tampil menu, 01h baca pilihan, 02h cetak)
- **Percabangan** — CMP + JE memilih opsi
- **Perulangan** — LOOP di dalam CETAK_ABC, `JMP AWAL` sebagai loop luar
- **Subroutine** — CETAK_HALO dan CETAK_ABC

Kerangka program:

```asm
AWAL:
    MOV DX, OFFSET MENU
    MOV AH, 09h     ; tampilkan menu
    INT 21h
    MOV AH, 01h     ; baca pilihan -> AL
    INT 21h
    CMP AL, '1'     ; ---- percabangan ----
    JE  OPSI1
    CMP AL, '2'
    JE  OPSI2
    CMP AL, '3'
    JE  KELUAR
    JMP AWAL        ; input salah -> ulang menu
OPSI1:
    CALL CETAK_HALO ; ---- subroutine ----
    JMP AWAL        ; ---- loop luar ----
OPSI2:
    CALL CETAK_ABC  ; di dalamnya ada LOOP A..Z
    JMP AWAL
KELUAR:
    MOV AH, 4Ch     ; ---- interrupt ----
    INT 21h
```

Data menu (segmen data):

```asm
MENU DB 0Dh, 0Ah, '=== MENU ===', 0Dh, 0Ah
     DB '1. Cetak HALO', 0Dh, 0Ah
     DB '2. Cetak A-Z', 0Dh, 0Ah
     DB '3. Keluar$'
; 0Dh, 0Ah = pindah baris (CR, LF)
```

Catatan: `CETAK_ABC` = listing slide Perulangan yang dipindahkan ke dalam
PROC; `CETAK_HALO` sama polanya untuk satu string. **Tantangan:** tambahkan
opsi 4 yang menampilkan hasil Studi Kasus 1.

## Rangkuman & tugas

1. **Percabangan** — CMP men-set flag, Jcc memilih jalur; jump bersyarat 8086
   berjarak **short**.
2. **Perulangan** — LOOP dengan CX; CX dikurangi dulu baru diuji; JCXZ
   sebagai pengaman.
3. **Subroutine** — CALL/RET bertumpu pada stack; selamatkan register dengan
   PUSH/POP.
4. **Interrupt** — INT n menuju ISR lewat tabel vektor; kembali dengan IRET;
   INT 21h adalah pintu I/O DOS.

**Tugas praktikum:** ketik ulang contoh slide Perulangan, Layanan DOS, dan
kedua Studi Kasus di emulator emu8086. Jalankan, tangkap layar hasilnya,
kumpulkan sebagai laporan praktikum.

Referensi slide: Abel, P. (2001) *IBM PC Assembly Language and Programming*
5th ed. • Brey, B.B. (2009) *The Intel Microprocessors* 8th ed. • Mazidi et
al. (2009) *The x86 PC* 5th ed. • Brown, R. — Ralf Brown's Interrupt List.

```quiz
Q: Setelah `MOV CX, 0` lalu `LOOP label` — berapa kali badan loop dijalankan?
+ 65.536 kali, karena CX dikurangi dulu (0000h-1 = FFFFh) baru diuji
- 0 kali karena CX memang 0
- 1 kali saja
- Program langsung error
> Jebakan klasik slide P07: CX melompat ke FFFFh sehingga loop jalan 65.536 kali. Pengamannya pakai JCXZ sebelum LOOP.

Q: Kenapa interrupt harus diakhiri IRET dan bukan RET?
+ INT n mendorong FLAGS, lalu CS, lalu IP; IRET memulihkan FLAGS juga, sedangkan RET hanya mengembalikan IP
- Karena RET hanya dipakai untuk subroutine
- Karena IRET lebih cepat dari RET
- Karena ISR tidak boleh memakai stack
> Mekanisme INT n: push FLAGS → CS → IP; IRET: pop IP, CS, FLAGS. Kalau pakai RET, flag program utama (ZF/CF dll.) gak balik.

Q: `TEST BL, 01h` + `JZ GENAP` — kenapa cocok buat ngecek bilangan genap?
+ TEST = AND logika hanya untuk flag; bit ke-0 bernilai 0 berarti bilangan genap, JZ lompat bila ZF=1
- TEST menambah BL dengan 1 lalu mengecek hasilnya
- Karena 01h adalah angka ajaib pembagi genap
- TEST selalu membuat AL = 1
> Studi kasus 1: bit-0 = 0 → genap (JZ lompat ke INC BH); bit-0 = 1 → ganjil (INC BL).

Q: Kenapa subroutine CETAK harus PUSH AX di awal dan POP AX di akhir?
+ Karena di dalamnya MOV AH,02h mengubah isi AX; diselamatkan supaya program pemanggil tidak rusak
- Karena format emu8086 mewajibkan PUSH setiap PROC
- Supaya RET bisa menemukan alamat kembali
- Biar subroutine jalan lebih cepat
> Aturan main slide: jumlah PUSH harus sama dengan POP; subroutine wajib menyelamatkan register yang dipakainya.

Q: Apa isi IVT (Interrupt Vector Table) di memori?
+ Alamat 00000h–003FFh (1 KB pertama memori) berisi 256 vektor × 4 byte; tiap vektor menyimpan IP lalu CS ISR, vektor tipe n di alamat n×4
- 256 byte pertama memori
- Seluruh memori RAM
- Kumpulan instruksi INT 21h di segmen kode
> 256 × 4 = 1024 byte = 1 KB. Alamat vektor = n × 4.

Q: Trace: `MOV AX,4 / CMP AX,4 / JE LANJUT / MOV DL,'T' / JMP CETAK / LANJUT: MOV DL,'F' / CETAK: MOV AH,02h / INT 21h` — output apa?
+ F, karena CMP AX,4 hasilnya 0 sehingga ZF=1 dan JE langsung melompat, jadi DL='F' dan 'T' tidak pernah terisi
- T
- TF
- Program error karena label CETAK dipakai dua kali
> Soal 3 latihan: ZF=1 → JE berhasil → DL='F', output huruf F.

Q: Beda `JMP` dengan `JE` soal syarat?
+ JMP selalu lompat tanpa syarat; JE hanya lompat jika ZF=1 dan harus didahului instruksi pen-set flag seperti CMP
- JMP butuh CMP, JE tidak butuh apa-apa
- Keduanya sama persis
- JE lompat jika CF=1
> Soal 1 latihan: pola wajib CMP dulu baru JE — contoh CMP AL,5 / JE SAMA lompat bila AL=5.
```

## Sources

- emu8086 — 8086 BIOS and DOS interrupts (dokumentasi resmi emu8086):
  https://surendrajat.github.io/emu8086/documentation/8086_bios_and_dos_interrupts.html
- emu8086 — 8086 assembler tutorial part 4 (interrupts):
  https://surendrajat.github.io/emu8086/documentation/asm_tutorial_04.html
- emu8086 (situs resmi): https://emu8086.com/
- Ralf Brown's Interrupt List — HTML version (referensi lengkap layanan
  interrupt): https://www.ctyme.com/rbrown.htm
- Ralf Brown's Interrupt List — index by interrupt number:
  https://www.delorie.com/djgpp/doc/rbinter/
- Intel® 64 and IA-32 Architectures Software Developer's Manuals (referensi
  resmi flag & interrupt Intel):
  https://www.intel.com/content/www/us/en/processors/architectures-software-developer-manuals.html