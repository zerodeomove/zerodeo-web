# zerodeo-web

Website Zerodeo, versi awal untuk dilihat tim.

- `index.html`, `css/style.css`, `js/main.js`: situsnya. HTML, CSS, dan JS polos, tanpa build step. Animasi scroll pakai GSAP 3.12.5 + ScrollTrigger dari cdnjs.
- `img/`: semua media yang dipakai situs, dikompres dari `assets/`:
  - `hero/`: siluet dan foto terang Max Fresh untuk efek lampu menyala.
  - `katalog/`: foto katalog per varian (1–2 tutup terpasang, 3 tutup terbuka), untuk kartu, detail, dan cara pakai.
  - `scene/`: foto Hero Revisi, untuk lapisan parallax di hero.
  - `video/`: potongan video tanpa suara dan tanpa teks tertanam (reel dari Teaser 2, kantor, lapangan, olahraga) plus posternya.
  - `logo/`: logo SVG dari design system Zerodeo dan ikon dingin.
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
