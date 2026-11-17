# Pertemuan 2 — Dasar-Dasar Dart

Catatan dari materi dosen `materi/pertemuan-02-dasar-dart.pdf` (31 halaman,
Pemrograman Mobile II IF-024, Sutani S.T., M.T.). Materi ini **dasar Dart
sebelum masuk Flutter** — di P4 baru masuk widgets.

Tujuan P2 (kata slidenya): nulis program Dart, fungsi dengan ragam parameter,
class + constructor/getter/pewarisan/mixin, dan manipulasi List/Set/Map.

## 0. Peta jalan materi

1. Program Dart pertama — menjalankan, variabel, tipe data, operator
2. Alur kontrol & fungsi — switch, pattern, parameter
3. Class & object — constructor, getter/setter, pewarisan, mixin, record
4. Koleksi — List, Set, Map, operasi fungsional
5. Asinkron & exception — Future, async/await
6. Praktik & kisi-kisi kuis

## 1. Cara menjalankan Dart

| Cara | Detail |
|---|---|
| **DartPad** (browser) | dartpad.dev, tanpa instalasi — cocok buat nyoba potongan kode |
| **Dart SDK lokal** (terminal) | Sudah ikut terpasang bareng Flutter. `dart create kampusku_cli`, lalu `dart run` |

> [!IMPORTANT]
> **Dipakai saat Kuis Dart** = Dart SDK lokal (terminal), bukan DartPad.
> Dan setiap program Dart **mulai dari fungsi `main()`**.

## 2. Variabel: var, final, const, late

| Kata kunci | Bisa diubah? | Ditentukan kapan | Contoh |
|---|---|---|---|
| `var` | Ya | Runtime, tipe disimpulkan | `var semester = 3;` |
| `final` | Tidak, sekali isi | Runtime | `final nim = bacaNim();` |
| `const` | Tidak | Saat **compile** | `const sksMaks = 24;` |
| `late` | Tergantung final | Ditunda sampai dipakai | `late final String kode;` |

> [!TIP]
> Aturan gampangnya: nilai yang bisa ditentukan sebelum program jalan (angka
> tetap, teks tetap) → `const`. Nilai yang baru ada pas program jalan (hasil
> baca input, hasil API) → `final`. Butuh diubah-ubah → `var`.

## 3. Parameter fungsi — 5 bentuk

Ini penting karena **widget Flutter hampir selalu pakai named parameter**.

| Jenis | Sintaks | Dipanggil |
|---|---|---|
| Positional wajib | `f(int a, int b)` | `f(1, 2)` |
| Optional positional | `f(int a, [int b = 0])` | `f(1)` atau `f(1, 2)` |
| Named | `f({int? a, int b = 0})` | `f(b: 2)` |
| Named wajib | `f({required int a})` | `f(a: 1)` |
| Arrow | `int f(int x) => x * x;` | badan satu ekspresi |

```dart
String formatJadwal({
  required String matkul,
  required String hari,
  String ruang = 'Belum ditentukan',
  int? jamMulai,
}) {
  final jam = jamMulai != null ? ' $jamMulai.00' : '';
  return '$matkul, $hari$jam di $ruang';
}
```

Aturan: **parameter tanpa nilai default harus nullable** (`int? jamMulai`).
Urutan named argument bebas saat dipanggil.

## 4. Komentar & import

- `//` satu baris · `/* */` blok (jarang) · `///` dokumentasi — **muncul di tooltip IDE**
- `[nama]` dalam komentar `///` merujuk ke parameter/class (jadi link di dokumen)
- Import: `dart:math` (bawaan), `package:http/http.dart` (dari pub.dev), `'../utils/format.dart'` (path relatif)
- `show` / `hide` / `as` buat milih & kasih prefix
- **Nama berawalan `_` = privat terhadap file**

## 5. Class & object

```dart
class MataKuliah {
  final String kode;
  final String nama;
  final int sks;
  const MataKuliah({required this.kode, required this.nama, required this.sks});

  const MataKuliah.praktikum({required String kode, required String nama})
      : this(kode: kode, nama: nama, sks: 1);

  bool get isPraktikum => sks == 1;   // getter = properti yang dihitung
}
```

### Ragam constructor

| Bentuk | Contoh | Kegunaan |
|---|---|---|
| Generative | `MataKuliah({required this.kode})` | Constructor utama |
| Named | `MataKuliah.praktikum(...)` | Cara lain bikin objek |
| Initializer list | `: huruf = hitung(angka)` | Isi field `final`/assert sebelum badan |
| `const` | `const MataKuliah(...)` | Objek konstan saat compile — **umum di Flutter** |
| `factory` | `factory MataKuliah.fromMap(m)` | Bikin objek dari JSON/cache |

### Pewarisan & mixin

```dart
class Pengguna {
  final String nama;
  Pengguna(this.nama);
  String sapa() => 'Halo, $nama';
}

mixin BisaKirimPengumuman {
  void kirim(String isi) => print('[Info] $isi');
}

class Mahasiswa extends Pengguna {
  final String nim;
  Mahasiswa(super.nama, this.nim);
  @override
  String sapa() => '${super.sapa()} ($nim)';
}

class Dosen extends Pengguna with BisaKirimPengumuman {
  Dosen(super.nama);
}
```

- `extends` mewarisi field & method · `super.nama` nerusin ke constructor induk
- `@override` nimpa method induk · `with` nambahin kemampuan dari **mixin**
- Beda `extends` vs `with`: extends = "**adalah**" (Mahasiswa adalah Pengguna), mixin = "**bisa**" (Dosen bisa kirim pengumuman)

### Record — balikin beberapa nilai sekaligus

```dart
(int, double) ringkasan(List<int> sks, List<double> mutu) { ... }

final (totalSks, ipk) = ringkasan([3, 3, 2], [4.0, 3.0, 3.5]);
```

Ditulis dalam kurung `(int, double)`, bisa positional atau bernama
(`({String kode})`), dibongkar dengan pattern `final (a, b) = ...`. Cocok buat
nilai gabungan kecil tanpa bikin class.

## 6. Koleksi: List, Set, Map

| Koleksi | Sifat | Contoh |
|---|---|---|
| `List<T>` | Berurutan, boleh duplikat, akses pakai indeks dari 0 | `['Senin', 'Rabu']` |
| `Set<T>` | Duplikat dibuang otomatis | `{'Lab 3', 'R201'}` |
| `Map<K, V>` | Kunci unik, akses nilai | `nilai['IF024']` → **hasilnya nullable** |

> [!WARN]
> Akses `Map` dengan kunci yang belum tentu ada **selalu nullable** — jangan
> langsung dipakai tanpa null-check.

### Spread, collection if, collection for

```dart
final menu = [
  'Beranda',
  ...wajib,                        // ... menyisipkan isi koleksi lain
  ...?pilihan,                     // ...? aman kalau koleksinya null
  if (sudahLogin) 'Profil' else 'Masuk',
  for (var i = 1; i <= 2; i++) 'Tugas $i',
];
```

Pola yang **sama** dipakai buat `children` widget — jadi hafalin ini sebelum P4.

### map, where, fold

```dart
final nama       = jadwal.map((j) => j.matkul).toList();   // ubah tiap elemen
final senin      = jadwal.where((j) => j.hari == 'Senin'); // saring
final totalSks   = jadwal.fold<int>(0, (t, j) => t + j.sks); // akumulasi
final adaPraktikum = jadwal.any((j) => j.sks == 1);
```

> [!IMPORTANT]
> `map` dan `where` menghasilkan **Iterable yang lazy** — harus `.toList()`
> kalau mau dipakai sebagai list.

## 7. Asinkron & exception

Ada di agenda bagian 5 — `Future`, `async`/`await`, dan penanganan exception.
Detail lengkapnya di slide (bagian asinkron) — inti yang perlu diingat:
operasi yang butuh waktu (baca file, panggil API) mengembalikan `Future`, dan
`await` dipakai di dalam fungsi `async` buat "nunggu" hasilnya tanpa nge-blok.

## Kisi-kisi kuis (dari materi)

Slide terakhir P2 bilang ada **Kuis Dart** yang pakai Dart SDK lokal, dan
"praktik dan kisi-kisi kuis" jadi bagian tersendiri di agenda. Yang paling
sering keluar: beda `final`/`const`, bentuk parameter, `map`/`where`/`fold`,
arahan `extends` vs `with`.

```quiz
Q: Setiap program Dart dimulai dari apa?
+ Fungsi main()
- Class Utama
- Komentar pembuka
- Import dart:core
> Semua program Dart (CLI maupun Flutter, lewat engine) dieksekusi mulai dari main().

Q: Beda final dan const di Dart?
+ final ditentukan saat runtime (sekali isi); const ditentukan saat compile
- const bisa diubah, final tidak
- Dua-duanya sama persis
- final hanya untuk angka
> Nilai yang known saat compile → const. Nilai baru ada ketika program jalan (hasil baca input) → final.

Q: Bentuk parameter mana yang WAJIB dipakai widget Flutter?
+ Named parameter — f({required int a})
- Positional wajib saja
- Optional positional saja
- Tidak ada ketentuan
> Materi bilang eksplisit: "Widget Flutter hampir selalu memakai named parameter".

Q: Dalam f({int? a, int b = 0}), kalau parameter named tidak diberi nilai default, dia harus apa?
+ Nullable (pakai tanda ?)
- Otomatis 0
- Wajib required
- Tidak bisa dideklarasikan
> Parameter tanpa default harus nullable, contohnya int? jamMulai.

Q: Bedanya extends dan with di Dart?
+ extends mewarisi class induk ("adalah"), with menambahkan kemampuan dari mixin ("bisa")
- with mewarisi, extends menambahkan
- Dua-duanya sama fungsinya
- extends cuma untuk interface
> Mahasiswa extends Pengguna (adalah pengguna); Dosen with BisaKirimPengumuman (bisa kirim pengumuman).

Q: Map memiliki kunci 'IF024'. Apa hasil nilai['IF999'] (kunci tidak ada)?
+ null — akses Map dengan kunci menghasilkan nilai nullable
- Error compile
- String kosong
- 0
> Karena itu hasil akses Map harus di-null-check dulu.

Q: Apa fungsi fold pada koleksi Dart?
+ Mengakumulasi seluruh elemen jadi satu nilai (misal total SKS)
- Mengubah tiap elemen
- Menyaring elemen
- Mengurutkan koleksi
> map = ubah, where = saring, fold = akumulasi. Contoh: jadwal.fold<int>(0, (t, j) => t + j.sks).

Q: Hasil map() dan where() itu apa, dan kenapa perlu toList()?
+ Iterable yang lazy — perlu toList() kalau mau dipakai sebagai list
- List biasa, toList() cuma gaya
- Map, bukan list
- String
> Iterable-nya belum dieksekusi sampai diminta; toList() mewujudkannya jadi list.

Q: Record di Dart dipakai untuk apa?
+ Mengembalikan beberapa nilai sekaligus tanpa bikin class
- Menyimpan satu nilai saja
- Menggantikan List
- Membuat exception
> Contoh: (int, double) ringkasan(...) lalu dibongkar final (totalSks, ipk) = ....

Q: Import yang benar untuk library bawaan matematika Dart?
+ import 'dart:math';
- import 'math.dart';
- import 'package:math/math.dart';
- import 'math';
> dart:math = library bawaan. package:http/http.dart contoh dari pub.dev. '../utils/format.dart' contoh path relatif.

Q: Komentar jenis apa yang muncul di tooltip IDE?
+ /// dokumentasi
- // satu baris
- /* blok */
- # hash
> Komentar /// jadi dokumentasi; [nama] di dalamnya merujuk parameter/class.

Q: Kalau sebuah nama diberi awalan underscore (_) di Dart, artinya?
+ Privat terhadap file tempat dia dideklarasikan
- Publik dan bisa diakses semua file
- Konstanta
- Error sintaks
> _ = library-private (privat per file).
```
