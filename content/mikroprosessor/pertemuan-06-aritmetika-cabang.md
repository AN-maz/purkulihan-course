# Pertemuan 6 — Aritmetika, Masking, Pencabangan, Loop (x8086)

Catatan recall dari tugas `purwa-p56-t1`, `purwa-p6-t2/t3/t4.asm`.

## Tugas 1 — Penjumlahan dua bilangan

Yang penting bukan `ADD`-nya, tapi **overflow**:

```asm
MOV AL, BIL1    ; AL = 150
ADD AL, BIL2    ; AL = 150 + 45 = 195 = C3h
MOV HASIL, AL
```

195 masih muat di 8 bit (maks 255), jadi aman. Kalau hasilnya > 255,
bit-nya **overflow** ke CF dan hasilnya wrap-around — perlu `ADC`
(Add with Carry) kalau mau akurasi 16-bit.

## Tugas 2 — Cek habis dibagi 8 (bit masking)

```asm
MOV AL, X        ; AL = 40
AND AL, 07h      ; mask 00000111b — ambil 3 bit terakhir
MOV STATUS, AL   ; 0 berarti X habis dibagi 8
```

Konsepnya: habis dibagi 8 ⇔ **3 bit terbitsinya nol**. `AND` sama `07h`
buang semua bit kecuali 3 bit terakhir. 40 = `00101000b → 000b` → STATUS
= 0 → habis dibagi 8.

> [!TIP]
> Masking = pola `AND` buat "nyaring" bit tertentu. Buat habis dibagi
> 4 pakai `AND AL, 03h` (2 bit), habis dibagi 2 pakai `AND AL, 01h`
> (1 bit).

## Tugas 3 — Nilai terkecil dari tiga bilangan

```asm
MOV AL, A         ; kandidat sementara = A
CMP AL, B
JL  CEK_C         ; AL < B → kandidat udah lebih kecil, lompat cek C
MOV AL, B         ; B lebih kecil → ganti kandidat
CEK_C:
CMP AL, C
JL  SIMPAN        ; AL < C → kandidat final
MOV AL, C
SIMPAN:
MOV TERKECIL, AL
```

`CMP` **gak mengubah** operand — cuma set flag CPU, lalu `JL` (Jump if
Less, signed) baca flag itu. Pola: kandidat → `CMP` → cabang → update
kandidat → ulang.

## Tugas 4 — Hitung vokal dalam string

```asm
MOV BH, 0             ; counter vokal = 0
LEA SI, TEKS          ; SI nunjuk awal string
ULANG:
    MOV AL, [SI]      ; ambil 1 karakter
    CMP AL, '$'       ; penanda akhir string (DOS)
    JE  SELESAI
    CMP AL, 'a'  /  'i'  /  'u'  /  'e'  /  'o'
    JE  TAMBAH_VOKAL
    JMP LANJUT
TAMBAH_VOKAL:
    INC BH            ; counter ++
LANJUT:
    INC SI            ; geser ke karakter berikutnya
    JMP ULANG         ; balik ke awal loop
SELESAI:
```

Ini template **loop traversal string** yang dipakai terus: pointer (`SI`)
jalan satu langkah per iterasi, `'$'` sebagai sentinel akhir, register
`BH` jadi accumulator.

## Ringkasan perintah baru

| Perintah | Fungsi |
|---|---|
| `AND` | bitwise AND — masking bit |
| `CMP` | bandingkan, set flag doang |
| `JL` | lompat kalau kurang (signed) |
| `JE` | lompat kalau sama |
| `JMP` | lompat tanpa syarat |
| `INC` | tambah 1 |
| `LEA` | muat alamat variabel ke register |

```quiz
Q: `AND AL, 07h` pada X habis dipakai buat ngecek apa?
+ Habis dibagi 8 — 3 bit terakhir nol berarti ya
- Habis dibagi 7
- Nilai X negatif atau tidak
- Apakah X bilangan prima
> 07h = 00000111b, mask ini nyaring 3 bit terakhir. Nol semua ⇔ kelipatan 8.

Q: Beda `CMP AL, B` sama `SUB AL, B`?
+ CMP cuma set flag CPU, nilai AL gak berubah; SUB benar-benar ngurangin AL
- CMP lebih lambat dari SUB
- Tidak ada bedanya, nama doang
- CMP langsung simpan hasil ke memori
> CMP buat dipakai bareng JL/JE. SUB mengubah operandnya.

Q: String diakhiri karakter '$' di tugas 4. Fungsinya?
+ Penanda akhir string (sentinel) biar loop tau kapan berhenti
- Merubah string jadi hex
- Biar string gak kebaca program lain
- Wajib format emu8086 buat semua string
> Loop berhenti via `CMP AL, '$'` + `JE SELESAI` — sentinel klasik DOS.

Q: Pas `X = 40`, hasil `AND AL, 07h` = 0, dan STATUS = 0. Kesimpulan?
+ 40 habis dibagi 8 (40 = 5 × 8)
- 40 habis dibagi 7
- X tidak valid
- STATUS 0 berarti error
> 40 = 00101000b, 3 bit terakhir = 000b → mask hasilnya 0 → kelipatan 8.
```