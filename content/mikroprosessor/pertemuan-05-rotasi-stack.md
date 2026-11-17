# Pertemuan 5 — Rotasi Data, Aritmetika, Stack (x8086 / emu8086)

Catatan recall dari tugas `purwa-p5-t1/t2/t3.asm`. Buat UTS nanti ini
yang dibaca cepat.

**Dosen:** Ari Hadhiwibowo, S.T., M.Kom.

## Kerangka program emu8086

Setiap program mulai dengan hal yang sama — ini wajib hafal:

```asm
.MODEL SMALL
.STACK 100H
.DATA
    ; variabel di sini
.CODE
MAIN PROC
    MOV AX, @DATA    ; muat alamat segmen data
    MOV DS, AX       ; daftarkan ke DS (wajib sebelum baca variabel)
    ; ... isi program ...
    MOV AH, 4CH      ; fungsi exit DOS
    INT 21H
MAIN ENDP
END MAIN
```

> [!NOTE]
> `MOV DS, AX` itu wajib di emu8086. Tanpa ini, akses variabel `.DATA`
> bakal baca dari memori yang salah.

## Tugas 1 — Rotasi tiga variabel

Tujuannya: A → B, B → C, C → A (rotasi posisi). Kuncinya **register
perantara** — gak bisa langsung `MOV B, A` karena nilai lama B bakal
hilang duluan.

```asm
MOV AL, A     ; AL = nilai A lama (11H)
MOV BL, B     ; BL = nilai B lama (22H)
MOV B, AL     ; B = 11H
MOV AL, C     ; AL = 33H
MOV C, BL     ; C = 22H
MOV A, AL     ; A = 33H
```

Hasil akhir: `A=33H, B=11H, C=22H`.

## Tugas 2 — Hitung (A+B) − (C+D)

```asm
MOV AL, A     ; AL = 18H
ADD AL, B     ; AL = 18H + 24H = 3CH
MOV BL, C     ; BL = 10H
ADD BL, D     ; BL = 10H + 0CH = 1CH
SUB AL, BL    ; AL = 3CH − 1CH = 20H
MOV HASIL, AL ; HASIL = 20H
```

Pola umum: hasil operasi pertama di `AL`, hasil kedua di `BL`, lalu
`SUB AL, BL`.

## Tugas 3 — Tukar register pakai stack (LIFO)

```asm
MOV AX, 1234H
MOV CX, 5678H
PUSH AX    ; stack: [1234H]
PUSH CX    ; stack: [1234H, 5678H] (5678H di atas)
POP AX     ; AX = 5678H (ambil teratas)
POP CX     ; CX = 1234H
```

Stack itu **LIFO** (Last In First Out): yang masuk terakhir keluar
pertama. Jadi urutan `PUSH` dibalik waktu `POP` — tanpa register
perantara sama sekali.

> [!TIP]
> Pola ini yang dipakai tiap kali butuh "memori sementara" di prosesor:
> tukar isi 2 register, atau simpan konteks sebelum subroutine dipanggil.

## Ringkasan perintah

| Perintah | Fungsi | Contoh |
|---|---|---|
| `MOV` | salin/isi nilai | `MOV AL, A` |
| `ADD` | tambah, hasil di operand kiri | `ADD AL, B` |
| `SUB` | kurang | `SUB AL, BL` |
| `PUSH` | masukkan ke stack | `PUSH AX` |
| `POP` | ambil dari stack | `POP AX` |
| `CMP` | bandingkan (set flag, gak ubah nilai) | `CMP AL, B` |

```quiz
Q: Program kamu `MOV DS, AX` gak ditulis setelah `MOV AX, @DATA`. Apa yang terjadi?
- Variabel .DATA tetap terbaca normal
+ Akses variabel .DATA jadi baca dari segmen yang salah
- Program langsung error compile
- DOS otomatis isi DS sendiri
> DS gak keisi alamat segmen data, jadi referensi variabel nunjuk memori acak — bug klasik emu8086.

Q: Tujuan register perantara AL di rotasi tiga variabel (tugas 1)?
+ Menyimpan nilai lama sebelum ditimpa, biar nilainya gak hilang
- Mempercepat eksekusi program
- Wajib hukumnya tiap pakai variabel DB
- Agar hasil berupa hex
> Rotasi butuh "pegangan sementara": AL nampung nilai lama A, BL nampung nilai lama B.

Q: Setelah `PUSH AX` (1234H), `PUSH CX` (5678H), lalu `POP AX` — isi AX jadi?
+ 5678H
- 1234H
- 0000H
- tidak bisa POP langsung ke AX
> Stack LIFO: 5678H masuk terakhir, jadi keluar pertama. AX = 5678H, sisanya POP ke CX = 1234H.
```