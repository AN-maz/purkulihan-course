# Pertemuan 1 — Pengantar Keamanan Jaringan & Setup Lab Docker

Catatan ini aku bikin dari materi dosen di `Network-Security-Course-Bank/Pertemuan1.md` (judul aslinya: "Pertemuan 1: Pengantar Keamanan Jaringan & Setup Lab Persisten"). Isinya: landasan teori CIA Triad, arsitektur lab Docker, sampai praktik hands-on setup lab + eksperimen persistensi volume.

## Landasan Teori: CIA Triad

Sebelum masuk ke teknik penetrasi, kamu harus paham dulu **apa yang dilindungi**. Model **CIA Triad** adalah standar industri buat mengevaluasi keamanan data.

| Pilar | Definisi | Contoh Implementasi | Serangan Umum |
|---|---|---|---|
| **Confidentiality** (Kerahasiaan) | Data hanya bisa diakses pihak yang berwenang | Enkripsi data, kontrol akses | Eavesdropping, Man-in-the-Middle (MITM), packet sniffing |
| **Integrity** (Integritas) | Data tetap akurat, tidak dimodifikasi saat dikirim/disimpan | Hashing (SHA-256), checksum, tanda tangan digital | Data tampering, SQL Injection, MITM (modifikasi data) |
| **Availability** (Ketersediaan) | Sistem, aplikasi, dan data selalu siap dipakai saat dibutuhkan | Redundansi server, backup, load balancing | DoS/DDoS, SYN Flood, Ransomware |

> [!NOTE]
> CIA Triad ini jadi kerangka buat semua pertemuan berikutnya. Contoh: ARP spoofing di Pertemuan 3 nyerang **confidentiality** (isi traffic dibaca penyerang), SYN flood di Pertemuan 6 nyerang **availability**.

## Mengenal Arsitektur Lab Docker

Docker pakai **containerization**: isolasi aplikasi tanpa beban berat kayak VM tradisional.

### VM vs Container

| Aspek | Virtual Machine | Docker Container |
|---|---|---|
| Waktu boot | Menit | Detik |
| Ukuran | GB | MB |
| Resource | Heavy (butuh OS sendiri) | Lightweight (share kernel host) |
| Isolasi | Level hardware | Level proses |

### Topologi Lab

Di materi, jaringan lab dibuat sebagai **Docker bridge network `172.20.0.0/24`** berisi tiga peran:

| Peran | Contoh IP | Container | Fungsi |
|---|---|---|---|
| Attacker | 172.20.0.5 | `kali-attacker` (kalilinux/kali-rolling) | Penyerang |
| Target | 172.20.0.10 | `target-web` (vulnerables/web-dvwa) | Korban / web server |
| Gateway | 172.20.0.1 | — | Koneksi ke internet |

Plus satu folder lokal host (`~/netsec-lab/kali-home/`) yang disinkronkan ke `/root` di container Kali.

> [!TIP]
> Catat pola ini: satu `docker-compose.yml` = blueprint lab. Semua pertemuan berikutnya (ARP, L3, L4, DNS) pakai pola yang sama — beda isi compose-nya aja.

## Hands-On: Setup Lab Step-by-Step

### 1. Persiapan ruang kerja di host

```bash
mkdir -p ~/netsec-lab/kali-home
cd ~/netsec-lab
ls -la
```

### 2. Bikin blueprint lab (`docker-compose.yml`)

Isi penting file-nya:

```yaml
version: '3.8'
services:
  kali-attacker:
    image: kalilinux/kali-rolling
    container_name: kali-attacker
    tty: true
    stdin_open: true
    privileged: true            # akses network tingkat rendah
    volumes:
      - ./kali-home:/root       # sinkronisasi host : container
    networks:
      lab_network:
        ipv4_address: 172.20.0.5

  victim-server:
    image: vulnerables/web-dvwa
    container_name: target-web
    networks:
      lab_network:
        ipv4_address: 172.20.0.10

networks:
  lab_network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/24
```

### 3. Jalankan infrastruktur

```bash
docker-compose up -d     # -d = detached (jalan di background)
docker ps                # verifikasi status
```

Kalau ada error, cek log:

```bash
docker logs kali-attacker
docker logs target-web
```

> [!IMPORTANT]
> `privileged: true` di container Kali itu yang bikin tools jaringan mentah (arp, packet crafting) bisa jalan. Tanpa itu, banyak praktik di pertemuan berikutnya bakal gagal.

## Hands-On: Konfigurasi & Eksperimen Jaringan

### Tahap A — pasang tools di Kali

```bash
docker exec -it kali-attacker bash
apt update
apt install -y nmap iputils-ping net-tools curl
nmap --version
```

| Tool | Fungsi |
|---|---|
| `nmap` | Network scanner: nemuin host & layanan |
| `iputils-ping` | Uji konektivitas |
| `net-tools` | Isi `ifconfig`, `netstat`, dll |
| `curl` | Transfer data dari/ke server |

### Tahap B — verifikasi koneksi + analisis CIA

```bash
ping -c 4 172.20.0.10    # ke target
ping -c 2 google.com     # ke internet
exit                      # keluar dari container tanpa stop
```

Kalau target merespon ping → **Availability terpenuhi** (target tersedia). Kalau ping gagal → masalah jaringan atau target down.

### Tahap C — reconnaissance

```bash
docker exec -it kali-attacker bash
nmap -sV 172.20.0.10 > /root/hasil-scan.txt
cat /root/hasil-scan.txt
ls -la /root/
```

- `-sV` → deteksi versi layanan yang jalan
- `> /root/hasil-scan.txt` → simpan hasil ke file

Contoh output yang diharapkan buat DVWA: port `80/tcp http Apache` dan `3306/tcp mysql` terbuka.

## Hands-On: Eksperimen Persistensi Volume

Alur sinkronisasi yang dibuktikan di materi:

1. **Container jalan** → file yang dibuat di `/root` otomatis tersimpan ke folder host `kali-home/`.
2. **Container di-`down`** → file tetap ada di host (nggak hilang).
3. **Container baru di-`up`** → `/root` diisi lagi dari host, data lama tersedia kembali.

Prosedurnya:

```bash
# Dari host: cari hasil-scan.txt di ~/netsec-lab/kali-home/
# Edit filenya dari host (tambah baris baru), simpan
# Lalu dari container:
docker exec -it kali-attacker bash
cat /root/hasil-scan.txt        # teks tambahan muncul = sinkronisasi dua arah

# Uji persistensi:
cd ~/netsec-lab
docker-compose down
ls -la ~/netsec-lab/kali-home/ # file HARUS masih ada
docker-compose up -d
docker exec -it kali-attacker bash -c "cat /root/hasil-scan.txt"  # data selamat
```

> [!IMPORTANT]
> Ini poin paling penting di Pertemuan 1: **data lab nggak boleh hilang tiap kali container dihapus**. Volume bind-mount (`./kali-home:/root`) adalah alasannya. Tanpa volume, semua hasil scan praktikum MasPur lenyap tiap `docker-compose down`.

> [!WARN]
> Selalu jalankan praktik di lab Docker terisolasi kayak gini. Jangan pernah coba teknik penetrasi di jaringan yang bukan milikmu sendiri.

## Sumber Belajar & Referensi (dari materi)

- Docker Documentation: Networking Overview — `https://docs.docker.com/network/`
- Kali Linux Official Docker Images — `https://www.kali.org/docs/containers/official-kalilinux-docker-images/`
- DVWA Official Documentation — `https://github.com/digininja/DVWA`
- NIST SP 800-115: Technical Guide to Information Security Testing
- Bacaan lanjutan: *Network Security Essentials* (William Stallings), *The Web Application Hacker's Handbook*

```quiz
Q: Tiga pilar CIA Triad yang benar adalah...
+ Confidentiality, Integrity, Availability
- Confidentiality, Integration, Availability
- Control, Integrity, Authentication
> CIA Triad = kerahasiaan, integritas, ketersediaan. "Integration" dan "Control" bukan istilah resminya.

Q: Serangan DoS/DDoS dan ransomware paling langsung melanggar pilar apa?
+ Availability
- Confidentiality
- Integrity
> DoS bikin sistem nggak bisa dipakai saat dibutuhkan = pelanggaran ketersediaan.

Q: Perbedaan mendasar container Docker dibanding VM menurut materi?
+ Container share kernel host dan boot dalam hitungan detik
- Container punya OS sendiri dan boot dalam hitungan menit
- Container terisolasi di level hardware, VM di level proses
> VM butuh OS sendiri (berat, boot menit), container ringan karena share kernel host (boot detik, isolasi level proses).

Q: Di lab Pertemuan 1, IP container Kali attacker adalah...
+ 172.20.0.5
- 172.20.0.10
- 172.20.0.1
> 172.20.0.5 = Kali attacker, .10 = target DVWA, .1 = gateway.

Q: Kenapa container Kali perlu flag privileged: true?
+ Supaya bisa akses fitur jaringan/hardware tingkat rendah
- Supaya boot-nya lebih cepat
- Supaya ukuran image jadi lebih kecil
> privileged mengizinkan akses network tingkat rendah yang dibutuhkan tools sniffing/injection; bukan soal kecepatan atau ukuran.

Q: Perintah untuk masuk ke shell container Kali yang sudah berjalan adalah...
+ docker exec -it kali-attacker bash
- docker-compose up -d
- docker logs kali-attacker
> docker exec -it <container> bash membuka shell interaktif; up -d menyalakan lab, logs melihat log.

Q: File hasil-scan.txt tetap ada setelah docker-compose down karena...
+ Folder host ./kali-home di-bind mount ke /root container
- Karena hasil scan otomatis diunggah ke cloud
- Karena container tidak pernah benar-benar dihapus
> Bind mount bikin folder host dan folder container jadi satu; isi host tetap tersimpan walau container dihapus.

Q: Saat target merespon ping dari container attacker, itu bukti pilar apa yang terpenuhi?
+ Availability
- Confidentiality
- Integrity
> Respons ping artinya target hidup dan bisa diakses = ketersediaan terpenuhi.
```