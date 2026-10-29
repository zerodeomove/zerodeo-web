# Prompt: website Zerodeo (versi awal)

Tempel teks di bawah garis ini ke sesi Claude Code yang baru, di repo ini.

---

Buatkan landing page produk untuk **Zerodeo**, deodoran untuk orang yang banyak bergerak (kerja kantor, kerja lapangan, olahraga). Ini versi awal untuk dilihat tim, belum untuk jualan.

**Bahan yang sudah ada di repo ini, baca dulu semuanya:**
- `KONTEN.md`: semua teks, data 6 varian, momen pakai, persona, USP, cara pakai, FAQ, dan **aturan klaim yang wajib diikuti**. Jangan menulis klaim di luar file ini.
- `assets/produk/`: satu foto per varian (latar warna sesuai varian, bukan potongan transparan).
- `assets/momen/`: tiga foto lebar untuk kantor, lapangan, olahraga.
- `assets/alternatif/`: foto cadangan.
- `assets/logo/`: logo Zerodeo dan ikon dingin.
- Design system Zerodeo ada di https://claude.ai/artifact/LyB7SowZNftY4gtPE6Zcie. Baca README dan token-nya kalau bisa diakses; kalau tidak, pakai warna dari foto dan logo (logo #79b6d8, pink #d3739b, kuning #cba907, biru #86adc1).

**Teknis:**
- Situs statis biasa: `index.html`, CSS, dan JS polos. Tanpa build step dan tanpa framework.
- Animasi scroll pakai GSAP + ScrollTrigger dari cdnjs, versi dipatok (misalnya 3.12.5).
- Deploy nanti ke Cloudflare Workers static assets seperti app lain: sertakan `wrangler.jsonc` berisi `name: "zerodeo-web"` dan `assets.directory: "./"`, plus `.assetsignore` untuk file yang tidak perlu ikut (md, folder alternatif kalau tidak dipakai).
- Foto dikompres ke WebP, lebar maksimum 1600px, dengan `loading="lazy"` di luar layar pertama. Total halaman pertama di bawah 1,5 MB.
- Bahasa Indonesia, nada santai dan lugas seperti di `KONTEN.md`.

**Gaya:** scrollytelling yang lembut, seperti referensi website susu kelapa "Cocuket". Gerak dipicu scroll, bersih, banyak ruang kosong, tidak ramai. Tiap varian membawa warnanya sendiri (pink, magenta, kuning, biru) dan latar halaman ikut berganti warna saat varian berganti.

**Susunan halaman:**
1. **Hero "Gerak Tanpa Ragu".** Logo kecil di header. Foto produk besar di tengah. Saat di-scroll, foto produk lain bergeser masuk dari samping dengan kecepatan berbeda (layered parallax). Satu kalimat: "Deodoran untuk orang yang banyak bergerak." Tombol "Lihat varian".
2. **Formula: tiga hal.** Dual Active Shield (2 antiperspirant), alpha arbutin (bantu cerahkan), menthol (sensasi dingin, pakai ikon dingin). Tiga kartu yang muncul bergantian saat di-scroll.
3. **Tiga momen gerak (bagian utama, pinned).** Bagian ini dikunci di layar sementara scroll mengganti momen: Kantor, Lapangan, Olahraga. Tiap momen: foto momen, varian yang cocok, dan satu kalimat wangi dari `KONTEN.md`. Latar berganti warna mengikuti varian. Ada indikator 1/3, 2/3, 3/3.
4. **Enam varian.** Kartu per varian dengan foto, nama varian, nama di kemasan, format, aroma, dan hook. Filter: Semua, Roll on, Spray. Klik kartu membuka detail: manfaat, wangi, kandungan, dan tanda "48 jam · tidak bernoda" HANYA untuk roll on, "mengandung zat antibakteri" HANYA untuk Vital Fresh dan Zen Protect.
5. **Cari yang cocok.** Pilih persona (pekerja kantoran, pekerja lapangan, olahraga indoor, dan seterusnya), tampil varian yang direkomendasikan sesuai tabel persona.
6. **Wangi tipis itu sengaja.** Penjelasan singkat plus tiga kalimat per momen.
7. **Cara pakai.** Roll on dan spray berdampingan, plus catatan hasil cerah bertahap.
8. **FAQ.** Daftar yang bisa dibuka-tutup, hanya pertanyaan yang ada di `KONTEN.md`.
9. **Penutup.** "Gerak Tanpa Ragu" besar, tombol "Beli di Shopee" dan "Beli di TikTok Shop" dengan tautan `#` dulu (nanti diisi), logo di kaki halaman.

**Aturan yang tidak boleh dilanggar:**
- Ikuti "Aturan klaim" di `KONTEN.md` kata per kata. "48 jam" dan "tidak bernoda" hanya untuk roll on. Untuk cerah selalu pakai "bantu" atau "tampak". Tidak ada angka persen atau "x lebih cerah". Tidak menampilkan nomor BPOM.
- Harus enak di HP (lebar 390px): bagian pinned di HP boleh jadi tumpukan biasa kalau terlalu sempit.
- Hormati `prefers-reduced-motion`: tanpa parallax dan pin, semua konten tetap terbaca.
- Gambar wajib punya `alt` yang menyebut nama varian.

**Setelah selesai:** jalankan di lokal, ambil screenshot laptop (1440px) dan HP (390px) untuk tiap bagian, cek tidak ada galat di konsol, lalu commit dan push ke branch kerja. Jangan merge ke `main` sebelum saya lihat.
