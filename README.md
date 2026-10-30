# zerodeo-web

Website Zerodeo, versi awal untuk dilihat tim.

- `index.html`, `css/style.css`, `js/main.js`: situsnya. HTML, CSS, dan JS polos, tanpa build step. Animasi scroll pakai GSAP 3.12.5 + ScrollTrigger dari cdnjs.
- `img/`: semua media yang dipakai situs, dikompres dari `assets/`:
  - `hero/`: siluet dan foto terang Max Fresh untuk efek lampu menyala.
  - `katalog/`: foto katalog per varian (1–2 tutup terpasang, 3 tutup terbuka), untuk kartu, detail, dan cara pakai.
  - `scene/`: foto Hero Revisi, untuk lapisan parallax di hero.
  - `video/`: potongan video tanpa suara dan tanpa teks tertanam (reel dari Teaser 2, kantor, lapangan, olahraga) plus posternya. `reel-tegak` adalah potongan tegak reel untuk HP.
  - `logo/`: logo SVG dari design system Zerodeo dan ikon dingin.
- `cerita.html`, `css/cerita.css`, `js/cerita.js`: prototipe scrollytelling. Dibuka video reel penuh layar; saat di-scroll video mengecil jadi latar dan 6 botol naik. Tombol momen mengganti video latar. Pilih varian, botolnya ikut turun dan cerita tiap bab berganti sesuai varian. Terbit di `/cerita`, `noindex`, tidak ditautkan dari `index.html`. Link per varian (`/cerita?varian=vital-fresh`) melewati pembuka dan langsung ke ceritanya. Tanpa default: halaman berhenti di grid sampai pengunjung memilih (bab cerita disembunyikan); kalau terus mencoba scroll, muncul pesan dan botol bergoyang.
- `img/botol/`: botol tanpa latar (dipotong otomatis dari foto katalog, sementara sampai ada file transparan asli): `tutup` dan `buka`, tinggi 1000 dan 500 px.
- `PROMPT.md`: prompt yang dipakai untuk membangun situs ini.
- `KONTEN.md`: semua teks dan aturan klaim, diambil dari "Zerodeo Product Knowledge". Teks varian di `js/main.js` disalin dari sini.
- `assets/`: foto asli produk, momen, cadangan, dan logo. Tidak ikut terbit.
- `screenshots/`: tangkapan layar laptop (1440px) dan HP (390px) tiap bagian, plus versi gerak-dikurangi.

## Jalankan di lokal

```bash
python -m http.server 5173
```

Lalu buka http://localhost:5173.

## Terbitkan

Cloudflare Workers static assets, sama seperti app lain. `wrangler.jsonc` sudah ada; file yang tidak ikut terbit diatur di `.assetsignore`.

```bash
npx wrangler deploy
```

Tautan "Beli di Shopee" dan "Beli di TikTok Shop" masih `#`, nanti diisi.
