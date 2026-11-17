# Pertemuan 4 — Dasar Widgets (Flutter)

Catatan dari materi dosen `materi/pertemuan-04-dasar-widgets.pdf` (27 halaman,
Sutani S.T., M.T.). Ini lanjutan P2 — kalau P2 ngajarin **bahasa Dart**-nya,
P4 mulai **naikin UI** pakai widget.

## 0. Peta jalan materi

1. Kerangka halaman — StatelessWidget, MaterialApp, Scaffold, AppBar
2. Teks, gambar, dan ikon — Text, Text.rich, Image, Icon
3. Jarak, ukuran, dan posisi — Padding, Container, Row/Column, Expanded
4. Daftar item dan tombol — Card, ListTile, CircleAvatar, Button
5. Menggabungkan widget — komposisi + debugging layout
6. Tugas 1: UI dan State (diumumkan minggu 4, **dikumpulkan minggu 7**)

## 1. Kerangka halaman

```dart
class SalamWidget extends StatelessWidget {
  const SalamWidget({super.key, required this.nama});
  final String nama;

  @override
  Widget build(BuildContext context) {
    return Text('Selamat pagi, $nama');
  }
}
```

Empat poin penting dari slide:

1. Data datang dari constructor dan bersifat **`final`**
2. `build()` mengembalikan **widget tree**
3. Tambahkan `const` biar gak dibangun ulang
4. Butuh data yang **berubah**? → `StatefulWidget` (pertemuan 6, bukan sekarang)

```dart
return Scaffold(
  appBar: AppBar(
    title: const Text('KampusKu'),
    actions: [
      IconButton(
        icon: const Icon(Icons.notifications_outlined),
        tooltip: 'Pengumuman',
        onPressed: () {},
      ),
    ],
  ),
  body: const Center(child: Text('Jadwal hari ini')),
  floatingActionButton: FloatingActionButton(onPressed: () {}, child: const Icon(Icons.add)),
);
```

| Widget | Tugasnya |
|---|---|
| `MaterialApp` | Tema, navigasi, halaman awal |
| `Scaffold` | `appBar`, `body`, FAB, `drawer` — kerangka satu halaman |
| `AppBar.actions` | Tombol di kanan AppBar |
| `IconButton` | **Beri `tooltip`** |

> [!IMPORTANT]
> `StatelessWidget` = UI dari data yang dikasih, **gak berubah sendiri**.
> Begitu butuh data berubah (input user, hasil fetch) → `StatefulWidget`
> (dibahas pertemuan 6). Jangan campur aduk.

## 2. Teks, gambar, ikon

**Text + TextStyle**: `style` ngatur ukuran/tebal/warna. `maxLines` +
`overflow: TextOverflow.ellipsis` buat teks panjang. **Utamakan gaya dari tema**
(`Theme.of(context).textTheme.labelLarge`) biar konsisten.

**Beberapa gaya dalam satu teks** → `Text.rich` + `TextSpan`:

```dart
Text.rich(TextSpan(text: 'Tenggat: ', children: [
  TextSpan(text: 'Jumat, 23.59',
      style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red.shade700)),
  const TextSpan(text: ' lewat e-learning'),
]))
```

`TextSpan` bisa bertingkat; span anak **mewarisi gaya induk**. `Text.rich`
lebih disarankan daripada `RichText`. Ukuran huruf ikut pengaturan sistem.

**Gambar** — dua sumber:

```dart
Image.asset('assets/images/logo_utb.png', width: 96)   // wajib didaftarkan di pubspec.yaml
Image.network('https://.../600/300', height: 160, fit: BoxFit.cover,
              errorBuilder: (_, _, _) => const Icon(Icons.error))
```

> [!WARN]
> Asset **wajib didaftarkan** di `pubspec.yaml` di bawah `flutter: assets:`.
> Setelah nambah asset → **hot restart** (bukan hot reload). Kalau lupa: error
> "Unable to load asset".

`BoxFit.cover` = penuhi area, sebagian terpotong. `Image.network` sebaiknya
dilengkapi `loadingBuilder` + `errorBuilder`.

**Ikon**: `Icons.schedule` (Material bawaan, ada varian `_outlined`/`_rounded`/
`_sharp`), `CupertinoIcons` (gaya iOS dari package `cupertino_icons`, udah ada
di proyek baru). Nama ikon dicari di **fonts.google.com/icons**.

> [!TIP]
> Ikon yang punya makna → kasih **`semanticLabel`** biar kebaca TalkBack (Android)
> & VoiceOver (iOS). Sama kayak `tooltip` di IconButton.

## 3. Jarak, ukuran, posisi

**Padding vs margin:**

| | Padding | Margin |
|---|---|---|
| Letaknya | Ruang **di dalam** batas widget | Ruang **di luar** batas widget |
| Fungsinya | Antara tepi dan isi | Jarak ke widget lain |
| Cara | `Padding` atau `Container(padding:)` | `Container(margin:)` atau `Card(margin:)` |

Bentuk `EdgeInsets`: `.all(16)`, `.symmetric(horizontal: 16)`, `.only(...)`,
`.fromLTRB(...)`.

**Container + BoxDecoration** — warna, sudut, border, bayangan:

```dart
Container(
  margin: const EdgeInsets.all(16),
  padding: const EdgeInsets.all(16),
  decoration: BoxDecoration(
    color: Colors.indigo.shade50,
    borderRadius: BorderRadius.circular(16),
    border: Border.all(color: Colors.indigo),
    boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 8)],
  ),
  child: const Text('Kuis Dart minggu depan'),
)
```

> [!WARN]
> Jangan isi `color` **dan** `decoration` sekaligus di Container — tabrakan.
> Dan `withValues(alpha:)` **menggantikan** `withOpacity` yang sudah usang.
> Cuma butuh jarak? Pakai `Padding` atau `SizedBox`, gak usah Container.

**Pemosisian:**

| Widget | Fungsi |
|---|---|
| `Center` | Child di tengah ruang tersedia |
| `Align` | Child di posisi tertentu (`Alignment.topRight`) |
| `SizedBox` | Ukuran tetap atau jarak kosong |
| `Spacer` | Isi sisa ruang di Row/Column, dorong widget ke ujung |

**Row & Column — dua sumbu (sering ketuker!):**

| | Row | Column |
|---|---|---|
| **Main axis** | Horizontal | Vertikal |
| **Cross axis** | Vertikal | Horizontal |
| `mainAxisAlignment` | Posisi kiri-kanan | Posisi atas-bawah |
| `crossAxisAlignment` | Posisi atas-bawah | Posisi kiri-kanan |
| `spacing` (Flutter 3.27+) | Jarak antar-children | Jarak antar-children |

Nilai main axis: `start`, `center`, `end`, `spaceBetween`, `spaceAround`,
`spaceEvenly`.

**Expanded vs Flexible:**

```dart
Row(children: [
  const Icon(Icons.book_outlined), const SizedBox(width: 12),
  Expanded(child: Text(judulPanjang, maxLines: 1, overflow: TextOverflow.ellipsis)),
  const Text('3 SKS'),
])
```

- `Expanded` **memaksa** child mengisi sisa ruang seluruhnya
- `Flexible` boleh **lebih kecil** dari sisa ruang
- `flex:` ngatur perbandingan (`flex: 2` vs default 1)
- Ini **solusi utama overflow** di dalam Row

## 4. Daftar item & tombol

```dart
Card(child: ListTile(
  leading: const CircleAvatar(child: Text('MP')),
  title: const Text('Pemrograman Mobile II'),
  subtitle: const Text('Senin, 08.00 · Lab 3'),
  trailing: const Icon(Icons.chevron_right),
  onTap: () {},
))
```

`ListTile` punya slot: `leading`, `title`, `subtitle`, `trailing`, `onTap`.
Card M3: `Card()`, `.filled()`, `.outlined()`. `CircleAvatar` buat inisial/foto.

**Pilih tombol sesuai penekanan aksi:**

| Tombol | Penekanan | Contoh aksi |
|---|---|---|
| `FilledButton` | **Tertinggi** | Simpan, kumpulkan tugas |
| `FilledButton.tonal` | Tinggi | Simpan draf |
| `ElevatedButton` | Sedang | Di atas latar bermotif |
| `OutlinedButton` | Sedang | Batal, aksi sekunder |
| `TextButton` | Rendah | Lihat semua, aksi di dialog |
| `IconButton` | Bervariasi | Bagikan, notifikasi (**kasih tooltip**) |

> [!IMPORTANT]
> `onPressed: null` → tombol jadi **nonaktif**. Dan `RaisedButton`/`FlatButton`
> **sudah dihapus** dari Flutter — kalau ketemu tutorial lama yang pakai itu,
> artinya tutorialnya usang.

## 5. Menggabungkan widget & debugging layout

Kunci komposisi: **satu widget buatan sendiri dipakai berulang**. Data masuk
lewat constructor (`mk`, `onTap`), `InkWell` ngasih efek sentuh, `Expanded`
nahan bagian yang panjang.

**Cara nyusun halaman beranda (pola dari slide):**
1. Sapaan — `Text.rich` dengan nama ditebalkan
2. Banner — `Container` warna `tertiaryContainer`
3. Judul seksi — `Row` `spaceBetween`: judul + `TextButton` "Lihat semua"
4. Daftar — **collection for** manggil `KartuMataKuliah` per mata kuliah

Semuanya dibungkus **`ListView`** biar bisa di-scroll & gak overflow.

**Tabel debugging layout (hafalin, ini yang bikin pusing):**

| Gejala | Solusi |
|---|---|
| `RenderFlex overflowed` (garis kuning-hitam) | `Expanded`/`Flexible`, `maxLines` + ellipsis, atau scroll |
| Overflow vertikal di layar pendek | Ganti `Column` → `ListView` |
| `Viewport was given unbounded height` | Bungkus `ListView` dalam `Column` pakai `Expanded` |
| `Unable to load asset` | Cek path + `pubspec.yaml`, lalu **hot restart** |

> [!TIP]
> Flutter Inspector: **Select Widget Mode**, **Layout Explorer**, **Show
> Guidelines** (tombol `p`). Ini yang dipakai buat screenshot widget tree di Tugas 1.

## 6. Tugas 1: UI dan State

| Item | Detail |
|---|---|
| Timeline | Diumumkan minggu 4, **dikumpulkan minggu 7** |
| Inti | Halaman beranda & profil **KampusKu tanpa overflow** |
| Uji di | Mode potret, lanskap, **dan ukuran huruf besar** |
| Wajib | Satu widget buatan sendiri yang dipakai ulang **minimal 2 kali** |
| Bukti | Tangkapan layar **widget tree di Flutter Inspector** |
| Bonus | Mulai kerangka halaman untuk Tugas 1 |
| Pertemuan 5 | Tema, Warna, dan Font (**online**) — `ThemeData`, `ColorScheme`, font custom, mode gelap |

## Ringkasan 6 poin (dari slide penutup)

1. `StatelessWidget` nampilin UI dari data yang dikasih; halaman disusun dari `MaterialApp` + `Scaffold` + `AppBar`
2. `Text` digayain pakai `TextStyle` atau gaya dari tema; `Text.rich` buat beberapa gaya dalam satu paragraf
3. Asset gambar **wajib** didaftarkan di `pubspec.yaml`; `Image.network` sebaiknya pakai `loadingBuilder` + `errorBuilder`
4. `Padding` = ruang dalam, `margin` = ruang luar; `Container` + `BoxDecoration` buat warna/sudut/border/bayangan
5. `Row`/`Column` pakai main axis & cross axis; `Expanded`/`Flexible` bagi sisa ruang
6. `Card`, `ListTile`, `CircleAvatar` cara cepat bikin daftar item; pilih jenis tombol sesuai penekanan

```quiz
Q: Kapan pakai StatefulWidget, bukan StatelessWidget?
+ Kalau UI perlu berubah karena data berubah — StatelessWidget cuma nampilin data yang dikasih
- Selalu, karena lebih canggih
- Kalau halamannya panjang
- Kalau butuh gambar
> Slide bilang: "Butuh data berubah? StatefulWidget (pertemuan 6)". StatelessWidget: data dari constructor, sifatnya final.

Q: Beda padding dan margin?
+ Padding = ruang di dalam batas widget; margin = ruang di luar batas widget
- Padding di luar, margin di dalam
- Dua-duanya sama saja
- Padding vertikal, margin horizontal
> Padding antara tepi dan isi; margin jaraknya ke widget lain.

Q: Apa masalahnya kalau Container diberi color DAN decoration sekaligus?
+ Tabrakan — jangan diisi dua-duanya; pakai decoration
- Tidak apa-apa, warna decoration menang
- Error saat runtime
- Mempercepat render
> Slide memberi catatan eksplisit: "Jangan isi color dan decoration sekaligus".

Q: Di Row, mainAxis itu sumbu apa dan crossAxis sumbu apa?
+ Main axis = horizontal, cross axis = vertikal
- Main = vertikal, cross = horizontal
- Dua-duanya horizontal
- Tergantung tinggi layar
> Kebalikan di Column: main axis vertikal, cross axis horizontal.

Q: Widget apa yang MEMAKSA child mengisi seluruh sisa ruang di Row/Column?
+ Expanded
- Flexible
- SizedBox
- Spacer
> Flexible boleh lebih kecil dari sisa ruang; Expanded memaksa penuh. Keduanya solusi utama overflow.

Q: Gejala "RenderFlex overflowed" (garis kuning-hitam) solusinya apa?
+ Expanded/Flexible, maxLines + ellipsis, atau bikin bisa di-scroll
- Restart aplikasi
- Naikkan ukuran font
- Hapus halaman
> Overflow = isi melebihi ruang. Perlu bagi ruang (Expanded) atau batasi (maxLines+ellipsis) atau scroll.

Q: Error "Unable to load asset" paling sering karena apa?
+ Asset belum didaftarkan di pubspec.yaml atau path salah — perbaiki lalu HOT RESTART
- Kartunya rusak
- Flutter belum di-install
- Gambarnya terlalu besar
> Nambah asset butuh hot RESTART, bukan sekadar hot reload.

Q: Tombol mana yang penekanannya TERTINGGI (aksi utama)?
+ FilledButton
- TextButton
- OutlinedButton
- IconButton
> Urutan: FilledButton (tertinggi) > .tonal > ElevatedButton > OutlinedButton > TextButton (terendah).

Q: Apa fungsi SizedBox dalam layout?
+ Memberi ukuran tetap atau jarak kosong, atau mengisi space antar widget
- Menggambar kotak berwarna
- Membuat tombol
- Menggulung halaman
> Contoh: SizedBox(height: 12) sebagai jarak; SizedBox(width: 16) antar ikon dan teks.

Q: Kenapa gambar asset perlu didaftarkan di pubspec.yaml?
+ Karena Flutter tidak otomatis tahu file mana yang ikut dibundel ke aplikasi
- Supaya kompresinya lebih kecil
- Supaya bisa di-upload ke internet
- Tidak perlu, itu opsional
> Asset yang tidak terdaftar tidak ikut dibundel, sehingga Image.asset gagal dengan "Unable to load asset".

Q: Widget.rich vs RichText untuk beberapa gaya dalam satu teks?
+ Text.rich lebih disarankan daripada RichText
- RichText lebih disarankan
- Dua-duanya identik
- Keduanya sudah dihapus
> Slide bilang "Text.rich lebih disarankan daripada RichText", dan span anak mewarisi gaya induk.

Q: Kenapa ElevatedButton dan OutlinedButton dipakai untuk aksi sekunder, bukan utama?
+ Karena penekanannya sedang; aksi utama pakai FilledButton yang penekanannya tertinggi
- Karena lebih murah
- Karena tidak bisa ditekan
- Karena sudah usang
> Hierarki penekanan: FilledButton > .tonal > ElevatedButton ≈ OutlinedButton > TextButton. RaisedButton/FlatButton sudah dihapus.

Q: Gejala "Viewport was given unbounded height" solusinya?
+ Bungkus ListView dalam Column dengan Expanded
- Hapus ListView
- Ganti ke String
- Tambahkan margin
> ListView butuh batas tinggi; kalau ditaruh langsung di Column tanpa Expanded, tingginya tak terbatas.

Q: Widget Tree di Flutter Inspector dipakai untuk apa di Tugas 1?
+ Bukti/tangkapan layar struktur widget yang kita susun
- Menghapus widget
- Mengganti mudah
- Menambah plugin
> Slide Tugas 1 minta "tangkapan layar widget tree di Flutter Inspector".
```
