/* Zerodeo, prototipe scrollytelling. Semua teks varian diambil dari KONTEN.md; jangan menambah klaim di sini. */
(function () {
  "use strict";

  var VARIAN = [
    {
      id: "crystal-glow", nama: "Crystal Glow", kemasan: "Glow & Shield", tipe: "rollon",
      format: "Roll on 40 ml · for Women", tint: "#F5D3E2", aksen: "#B83E76",
      momen: "kantor", aroma: "Amethyst, feminin, segar", aromaUtama: "Amethyst.",
      untuk: "Kerja kantor. Wanita kantoran dan fashion.", gender: "Khusus wanita",
      hook: "Ketiak cerah, tetap kering hingga 48 jam.",
      manfaat: "Alpha arbutin bantu cerahkan ketiak, perlindungan hingga 48 jam.",
      wangi: "Amethyst yang lembut. Aman di ruang meeting, nggak ganggu orang sebelah.",
      antibakteri: false
    },
    {
      id: "bright-aura", nama: "Bright Aura", kemasan: "Bright & Confidence", tipe: "spray",
      format: "Spray 60 ml · for Women", tint: "#F3D3E5", aksen: "#A82C72",
      momen: "kantor", aroma: "Floral feminin, segar", aromaUtama: "Floral feminin.",
      untuk: "Kerja kantor. Wanita kantoran, fashion, ibu rumah tangga muda.", gender: "Khusus wanita",
      hook: "Dingin, wangi feminin, dan alpha arbutin untuk ketiak cerah.",
      manfaat: "Alpha arbutin bantu cerahkan ketiak gelap, plus 2 bahan antiperspirant.",
      wangi: "Floral feminin yang tipis, enak dari meeting pagi sampai lembur.",
      antibakteri: false
    },
    {
      id: "daily-active", nama: "Daily Active", kemasan: "Extra Shield", tipe: "rollon",
      format: "Roll on 40 ml", tint: "#F6E8A4", aksen: "#6F5C00",
      momen: "lapangan", aroma: "Bunga moringa, floral", aromaUtama: "Bunga moringa.",
      untuk: "Kerja lapangan. Sales, marketing, driver. Pria dan wanita.", gender: "Pria dan wanita",
      hook: "Dual Active Shield, perlindungan hingga 48 jam di lapangan.",
      manfaat: "2 bahan antiperspirant tahan keringat dan bau hingga 48 jam, tanpa noda di baju.",
      wangi: "Moringa floral yang kalem. Seharian di jalan, nggak bikin enek.",
      antibakteri: false
    },
    {
      id: "max-fresh", nama: "Max Fresh", kemasan: "Extra Cooling", tipe: "rollon",
      format: "Roll on 40 ml", tint: "#D5E6F0", aksen: "#1D6CA3",
      momen: "olahraga", aroma: "Mint", aromaUtama: "Mint.",
      untuk: "Olahraga: gym, lari, boxing, hiking. Juga pekerja lapangan.", gender: "",
      hook: "Dinginnya kerasa dari olesan pertama.",
      manfaat: "Sensasi dingin tahan lama dan perlindungan antiperspirant hingga 48 jam.",
      wangi: "Mint tipis. Habis keringetan yang tersisa segar, bukan bau campur parfum.",
      antibakteri: false
    },
    {
      id: "vital-fresh", nama: "Vital Fresh", kemasan: "Max Fresh & Brightening", tipe: "spray",
      format: "Spray 60 ml", tint: "#CFE2F2", aksen: "#195F9A",
      momen: "olahraga", aroma: "Hideout, unisex", aromaUtama: "Hideout.",
      untuk: "Olahraga: lari, tenis, basket. Pria dan wanita.", gender: "Pria dan wanita",
      hook: "Segar habis lari, ketiak tetap terawat.",
      manfaat: "Kesegaran tahan lama, alpha arbutin bantu cerahkan, plus zat antibakteri.",
      wangi: "Hideout yang tipis, nggak bentrok dengan parfum sehabis olahraga.",
      antibakteri: true
    },
    {
      id: "zen-protect", nama: "Zen Protect", kemasan: "Bright Confidence", tipe: "spray",
      format: "Spray 60 ml", tint: "#F1EBC4", aksen: "#675A00",
      momen: "olahraga", aroma: "Parfum “lavish”, unisex", aromaUtama: "Lavish, unisex.",
      untuk: "Olahraga berat, indoor dan outdoor. Pria dan wanita.", gender: "Pria dan wanita",
      hook: "Untuk yang geraknya nggak setengah-setengah.",
      manfaat: "Nyaman sepanjang hari: 2 antiperspirant, alpha arbutin, dan zat antibakteri.",
      wangi: "Lavish unisex yang lembut, pas dipakai pria maupun wanita.",
      antibakteri: true
    }
  ];

  var PERSONA = [
    { nama: "Pekerja kantoran", varian: ["daily-active", "crystal-glow", "vital-fresh", "bright-aura"] },
    { nama: "Pekerja lapangan", varian: ["daily-active", "max-fresh", "zen-protect"] },
    { nama: "Olahraga indoor", varian: ["max-fresh", "zen-protect"] },
    { nama: "Olahraga outdoor", varian: ["max-fresh", "zen-protect", "vital-fresh"] },
    { nama: "Olahraga berat", varian: ["max-fresh", "zen-protect"] },
    { nama: "Fashion", varian: ["crystal-glow", "bright-aura", "vital-fresh"] },
    { nama: "Ibu rumah tangga muda", varian: ["crystal-glow", "bright-aura", "zen-protect"] }
  ];

  var MOMEN = {
    kantor: { label: "Kerja kantor", video: "img/video/kantor.mp4", poster: "img/video/kantor-poster.webp" },
    lapangan: { label: "Kerja lapangan", video: "img/video/lapangan.mp4", poster: "img/video/lapangan-poster.webp" },
    olahraga: { label: "Olahraga", video: "img/video/olahraga.mp4", poster: "img/video/olahraga-poster.webp" }
  };
  /* Video pembuka: reel (kantor, gudang, tinju). HP pakai potongan tegak. */
  var REEL = {
    lebar: { video: "img/video/reel.mp4", poster: "img/video/reel-poster.webp" },
    tegak: { video: "img/video/reel-tegak.mp4", poster: "img/video/reel-tegak-poster.webp" }
  };

  var byId = {};
  VARIAN.forEach(function (v) { byId[v.id] = v; });

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  /* Tanpa GSAP atau dengan gerak dikurangi: halaman biasa, botol tampil di tiap bab */
  var diam = reduceMotion || !window.gsap || !window.ScrollTrigger;
  if (diam) root.classList.add("diam");

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function botol(v, keadaan, h) { return "img/botol/" + v.id + "-" + (keadaan || "tutup") + "-" + (h || 1000) + ".webp"; }
  function formatPendek(v) { return v.format.split(" · ")[0]; }
  function alt(v, keadaan) { return "Zerodeo " + v.nama + " " + formatPendek(v).toLowerCase() + (keadaan === "buka" ? ", tutup terbuka" : ""); }

  /* ---------- Teks per varian ---------- */
  function isi(v) {
    if (!v) return {
      pill: "Pilih varian", nama: "Zerodeo", beli: "Beli", kemasan: "", format: "",
      momenLabel: "Belum milih",
      hookKutip: "Pilih dulu, biar ceritanya nyala.",
      manfaat: "Manfaatnya beda-beda tiap varian. Pilih satu, lihat punyamu.",
      aromaUtama: "Wanginya beda-beda.",
      wangi: "Ada amethyst, floral, moringa, mint, hideout, sampai lavish. Semua tipis, nyaman seharian.",
      untuk: "", formatPendek: "Roll on & spray", formatPendekKecil: "roll on dan spray",
      pakaiJudul: "Oles atau semprot.",
      cocokJudul: "Kamu yang mana?"
    };
    var spray = v.tipe === "spray";
    return {
      pill: v.nama, beli: "Beli " + v.nama, nama: v.nama, kemasan: v.kemasan, format: v.format, manfaat: v.manfaat, wangi: v.wangi, untuk: v.untuk,
      aromaUtama: v.aromaUtama,
      hookKutip: "“" + v.hook + "”",
      momenLabel: MOMEN[v.momen].label,
      formatPendek: formatPendek(v),
      formatPendekKecil: formatPendek(v).toLowerCase(),
      pakaiJudul: spray ? "Kocok, lalu semprot." : "Oles, lalu tunggu kering.",
      cocokJudul: v.gender ? v.gender + ", buat yang geraknya begini:" : "Buat yang geraknya begini:"
    };
  }

  /* ---------- Pilihan di hero ---------- */
  var grid = document.getElementById("pilih-grid");
  VARIAN.forEach(function (v) {
    grid.appendChild(el("button", {
      "class": "tile", type: "button", role: "radio", "aria-checked": "false", "data-pilih": v.id,
      "data-momen": v.momen, style: "--tile-tint:" + v.tint
    }, [
      el("span", { "class": "tile-box" + (v.tipe === "rollon" ? " is-rollon" : "") }, [
        el("img", { src: botol(v, "tutup", 500), alt: alt(v), width: "250", height: "500" })
      ]),
      el("span", { "class": "tile-nama" }, [document.createTextNode(v.nama), el("small", { text: formatPendek(v) })])
    ]));
  });
  var tiles = Array.prototype.slice.call(grid.querySelectorAll(".tile"));

  /* Sorot varian per momen */
  var momenChips = document.querySelectorAll("[data-momen].chip");
  momenChips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var on = chip.getAttribute("aria-pressed") !== "true";
      var m = chip.getAttribute("data-momen");
      momenChips.forEach(function (c) { c.setAttribute("aria-pressed", String(on && c === chip)); });
      tiles.forEach(function (t) { t.classList.toggle("is-redup", on && t.getAttribute("data-momen") !== m); });
      putarLatar(on ? MOMEN[m] : null);
    });
  });

  /* Menu ganti varian di header */
  var ganti = document.querySelector(".ganti");
  var gantiBtn = ganti.querySelector(".ganti-btn");
  var gantiMenu = document.getElementById("ganti-menu");
  VARIAN.forEach(function (v) {
    gantiMenu.appendChild(el("button", { type: "button", role: "menuitemradio", "aria-checked": "false", "data-ganti": v.id }, [
      el("img", { src: botol(v, "tutup", 500), alt: "", width: "28", height: "44" }),
      el("span", null, [el("b", { text: v.nama }), el("small", { text: formatPendek(v) })])
    ]));
  });
  function tutupMenu() { gantiMenu.hidden = true; gantiBtn.setAttribute("aria-expanded", "false"); }
  gantiBtn.addEventListener("click", function () {
    var buka = gantiMenu.hidden;
    gantiMenu.hidden = !buka;
    gantiBtn.setAttribute("aria-expanded", String(buka));
  });
  document.addEventListener("click", function (e) { if (!ganti.contains(e.target)) tutupMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") tutupMenu(); });

  /* Ajakan memilih: 6 botol mini, dipakai di bab yang isinya khusus per varian */
  document.querySelectorAll(".ajak").forEach(function (box) {
    box.setAttribute("role", "group");
    box.setAttribute("aria-label", "Pilih varian");
    VARIAN.forEach(function (o) {
      box.appendChild(el("button", { type: "button", "data-ganti": o.id, "aria-label": "Pilih " + o.nama }, [
        el("img", { src: botol(o, "tutup", 500), alt: "", width: "26", height: "48" }),
        el("span", { text: o.nama })
      ]));
    });
  });

  /* ---------- Ganti varian ---------- */
  var current = null;
  var hitungUlang = null; /* diisi bagian gerak: hitung ulang pose botol */
  var nyalakan = false;
  var keadaan = "tutup"; /* tutup terbuka di bab cara pakai */
  var gerak = document.querySelector(".botol-gerak");
  var imgs = gerak.querySelectorAll(".botol-img");
  var video = document.querySelector(".latar-video");
  var latar = document.querySelector(".latar");

  function tukarBotol() {
    var v = byId[current];
    if (!v) return;
    var src = botol(v, keadaan);
    var on = gerak.querySelector(".botol-img.is-on");
    if (on && on.getAttribute("src") === src) return;
    var next = on === imgs[0] ? imgs[1] : imgs[0];
    next.onload = function () {
      next.onload = null;
      next.classList.add("is-on");
      if (on) on.classList.remove("is-on");
      if (nyalakan) {
        nyalakan = false;
        root.classList.remove("menyala");
        void gerak.offsetWidth;
        root.classList.add("menyala");
        setTimeout(function () { root.classList.remove("menyala"); }, 1200);
      }
    };
    next.src = src;
    if (next.complete && next.naturalWidth) next.onload();
  }

  function setVarian(id, opts) {
    var v = byId[id] || null;
    var id2 = v ? v.id : null;
    if (id2 === current && !(opts && opts.awal)) return;
    var dariSiluet = !current;
    current = id2;

    root.classList.toggle("belum", !v);
    root.style.setProperty("--tint", v ? v.tint : "#E8E6E0");
    root.style.setProperty("--aksen", v ? v.aksen : "#3F403D");
    if (v) {
      gerak.classList.toggle("is-rollon", v.tipe === "rollon");
      /* Dari siluet: botol menyala begitu gambarnya siap */
      nyalakan = dariSiluet && !(opts && opts.awal);
      tukarBotol();
    }

    var t = isi(v);
    document.querySelectorAll("[data-isi]").forEach(function (n) { n.textContent = t[n.getAttribute("data-isi")]; });
    if (v) document.querySelectorAll(".botol-inline").forEach(function (im) {
      var k = im.getAttribute("data-botol");
      im.src = botol(v, k, 500);
      im.alt = alt(v, k);
    });

    /* Aturan klaim: "48 jam · tidak bernoda" hanya roll on, spray "sepanjang hari"; antibakteri hanya Vital Fresh & Zen Protect */
    var badges = document.getElementById("badges");
    badges.textContent = "";
    (!v ? [] : v.tipe === "rollon" ? ["Hingga 48 jam", "Tidak bernoda di baju"] : ["Nyaman sepanjang hari"])
      .concat(v && v.antibakteri ? ["Mengandung zat antibakteri"] : [])
      .forEach(function (b) { badges.appendChild(el("li", { text: b })); });
    /* Belum memilih: kartu antibakteri tetap tampil, teksnya sudah menyebut variannya */
    document.querySelectorAll("[data-hanya='antibakteri']").forEach(function (n) { n.hidden = !!v && !v.antibakteri; });

    var langkah = document.getElementById("langkah");
    langkah.textContent = "";
    (!v ? ["Roll on: oles ke ketiak bersih dan kering, tunggu kering sebelum berpakaian.",
      "Spray: kocok, lalu semprot ke ketiak bersih dan kering. Jangan ke wajah."]
      : v.tipe === "spray"
      ? ["Kocok dulu.", "Semprot ke ketiak bersih dan kering.", "Jangan ke wajah."]
      : ["Pastikan ketiak bersih dan kering.", "Oleskan.", "Tunggu kering sebelum berpakaian."])
      .forEach(function (s) { langkah.appendChild(el("li", { text: s })); });

    var persona = document.getElementById("persona");
    persona.textContent = "";
    PERSONA.filter(function (p) { return !v || p.varian.indexOf(v.id) !== -1; })
      .forEach(function (p) { persona.appendChild(el("li", { text: p.nama })); });

    var lain = document.getElementById("lain");
    lain.textContent = "";
    VARIAN.forEach(function (o) {
      if (v && o.id === v.id) return;
      lain.appendChild(el("button", { type: "button", "data-ganti": o.id, "aria-label": "Ganti ke " + o.nama }, [
        el("img", { src: botol(o, "tutup", 500), alt: "", width: "26", height: "52" }),
        el("span", { text: o.nama })
      ]));
    });

    tiles.forEach(function (tile) {
      var on = !!v && tile.getAttribute("data-pilih") === v.id;
      tile.setAttribute("aria-checked", String(on));
      tile.classList.toggle("is-dibawa", on);
    });
    gantiMenu.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-checked", String(!!v && b.getAttribute("data-ganti") === v.id)); });

    if (v && !(opts && opts.awal)) {
      try {
        var url = new URL(window.location.href);
        url.searchParams.set("varian", v.id);
        history.replaceState(null, "", url);
      } catch (e) { /* abaikan */ }
    }

    if (hitungUlang) hitungUlang();
  }

  document.addEventListener("click", function (e) {
    var g = e.target.closest("[data-ganti]");
    if (g) { setVarian(g.getAttribute("data-ganti")); tutupMenu(); return; }
    var p = e.target.closest("[data-pilih]");
    if (p) {
      setVarian(p.getAttribute("data-pilih"));
      /* Botol terbang ke bab pertama: scroll halus, gerak botol mengikuti scroll */
      var hook = document.getElementById("hook");
      var top = hook.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top, behavior: diam ? "auto" : "smooth" });
    }
  });

  /* ---------- Video latar pembuka ---------- */
  /* Gerak dikurangi: tidak diputar, cukup posternya. Selain itu diputar hanya saat terlihat. */
  var videoTerlihat = true;
  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  function putarLatar(m) {
    var sumber = m || REEL[window.innerWidth <= 760 || window.innerHeight > window.innerWidth ? "tegak" : "lebar"];
    if (video.getAttribute("src") === sumber.video) return;
    latar.style.backgroundImage = "url(" + sumber.poster + ")";
    video.poster = sumber.poster;
    if (reduceMotion) return;
    video.src = sumber.video;
    if (videoTerlihat) play(video);
  }
  putarLatar(null);
  if (!reduceMotion && "IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      videoTerlihat = entries[0].isIntersecting;
      if (videoTerlihat) play(video); else video.pause();
    }, { threshold: 0.05 }).observe(latar);
  }

  /* Varian awal: dari ?varian=, kalau tidak ada Max Fresh. Link per varian langsung masuk ke ceritanya. */
  var awal = null;
  try { awal = new URL(window.location.href).searchParams.get("varian"); } catch (e) { /* abaikan */ }
  var langsung = !!byId[awal];
  setVarian(langsung ? awal : null, { awal: true });
  if (langsung) {
    window.addEventListener("load", function () {
      window.scrollTo(0, document.getElementById("hook").offsetTop);
    });
  }

  /* Pill ganti varian muncul setelah keluar dari hero */
  var pilih = document.getElementById("pilih");
  function onScroll() { ganti.classList.toggle("is-on", window.scrollY > pilih.offsetHeight * 0.5); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (diam) return;

  /* ---------- Gerak botol ---------- */
  var gsap = window.gsap, ST = window.ScrollTrigger;
  gsap.registerPlugin(ST);

  /* Pose botol per bab: titik tengah (fraksi layar), skala, putaran. HP: botol di sepertiga atas. */
  var POSE = {
    lebar: {
      hook: [0.70, 0.55, 1.05, 0], formula: [0.5, 0.60, 0.82, -6], manfaat: [0.27, 0.54, 1, 5],
      wangi: [0.70, 0.52, 1.05, -4], pakai: [0.28, 0.54, 1, 0], cocok: [0.25, 0.55, 0.85, 3]
    },
    hp: {
      hook: [0.5, 0, 0.82, 0], formula: [0.5, 0, 0.9, -6], manfaat: [0.5, 0, 1, 5],
      wangi: [0.5, 0, 1, -4], pakai: [0.5, 0, 1, 0], cocok: [0.5, 0, 0.9, 3]
    }
  };
  function hp() { return window.innerWidth <= 760; }
  function kotak() { return { w: gerak.offsetWidth, h: gerak.offsetHeight }; }

  function pose(nama) {
    return function () {
      var k = kotak(), W = window.innerWidth, H = window.innerHeight;
      if (nama === "hero") {
        /* Tepat di atas tile varian terpilih. Panggung hero menempel di layar, jadi posisinya dihitung dari
           offset di dalam panggung (tidak terpengaruh animasi pembuka yang sedang berjalan). */
        var tile = grid.querySelector(".tile.is-dibawa .tile-box");
        if (!tile) {
          /* Belum memilih: siluet muncul dari tengah panel grid */
          var pr = document.querySelector(".pilih-panel");
          var px = 0, py = 0, m = pr;
          while (m && m !== stage) { px += m.offsetLeft; py += m.offsetTop; m = m.offsetParent; }
          px += stage.getBoundingClientRect().left;
          return { x: px + pr.offsetWidth / 2 - k.w / 2, y: py + pr.offsetHeight / 2 - k.h / 2, scale: 0.5, rotation: 0, autoAlpha: 0 };
        }
        var ox = 0, oy = 0, n = tile;
        while (n && n !== stage) { ox += n.offsetLeft; oy += n.offsetTop; n = n.offsetParent; }
        ox += stage.getBoundingClientRect().left;
        var s = tile.offsetHeight / k.h;
        return { x: ox + tile.offsetWidth / 2 - k.w / 2, y: oy + tile.offsetHeight / 2 - k.h / 2, scale: s, rotation: 0, autoAlpha: 1 };
      }
      if (nama === "keluar") {
        var akhir = POSE[hp() ? "hp" : "lebar"].cocok;
        return { x: akhir[0] * W - k.w / 2, y: H * 1.05, scale: 0.6, rotation: 12, autoAlpha: 0 };
      }
      var p = POSE[hp() ? "hp" : "lebar"][nama];
      /* HP: botol di bawah header, isi kotak setinggi --bh */
      var cy = hp() ? document.querySelector(".site-header").offsetHeight + k.h / 2 + H * 0.01 : p[1] * H;
      return { x: p[0] * W - k.w / 2, y: cy - k.h / 2, scale: p[2], rotation: p[3], autoAlpha: 1 };
    };
  }
  var urutan = [["hero", null], ["hook", "hook"], ["formula", "formula"], ["manfaat", "manfaat"],
    ["wangi", "wangi"], ["pakai", "pakai"], ["cocok", "cocok"], ["keluar", "faq"]];
  var KUNCI = ["x", "y", "scale", "rotation", "autoAlpha"];
  var stage = document.querySelector(".pilih-stage");
  var seg = [], poseAwal = null, sekarang = null, introAkhir = 0;

  /* Tiap perpindahan terjadi saat bab berikutnya masuk layar: dari atas bab di bawah layar sampai atas bab di atas layar */
  function hitung() {
    var H = window.innerHeight;
    var poses = urutan.map(function (u) { return pose(u[0])(); });
    seg = urutan.slice(1).map(function (u, i) {
      var top = document.getElementById(u[1]).offsetTop;
      return { a: top - H, b: top, dari: poses[i], ke: poses[i + 1] };
    });
    poseAwal = poses[0];
    introAkhir = H * 0.8;
  }
  /* Ganti varian: botol meluncur ke pose baru. Ukuran layar berubah: langsung lompat. */
  hitungUlang = hitung;

  function halus(t) { return -(Math.cos(Math.PI * t) - 1) / 2; } /* sine in-out: mulai dan berhenti pelan */
  function poseDi(y) {
    if (y <= seg[0].a) return poseAwal;
    var redup = hp() ? 0.7 : 0; /* HP: botol meredup sebentar saat bab berganti, supaya tidak menimpa teks yang lewat */
    for (var i = 0; i < seg.length; i++) {
      var s = seg[i];
      if (y < s.a) return s.dari;
      if (y <= s.b) {
        var t = halus((y - s.a) / (s.b - s.a)), o = {};
        KUNCI.forEach(function (k) { o[k] = s.dari[k] + (s.ke[k] - s.dari[k]) * t; });
        if (i > 0 && i < seg.length - 1) o.autoAlpha *= 1 - redup * Math.sin(Math.PI * t);
        return o;
      }
    }
    return seg[seg.length - 1].ke;
  }

  hitung();
  gsap.set(gerak, { transformOrigin: "50% 50%", force3D: true });
  gerak.style.visibility = "visible";

  /* Botol mengejar pose targetnya tiap frame dengan sedikit jeda: terasa melayang, tidak patah-patah mengikuti roda mouse */
  gsap.ticker.add(function (time, dt) {
    var y = window.scrollY;
    var tgt = poseDi(y);
    /* Selama video pembuka, botol masih bagian dari grid; botol panggung baru muncul setelah grid tampil penuh */
    var lepas = y >= introAkhir;
    root.classList.toggle("botol-lepas", lepas);
    if (!sekarang || !lepas) sekarang = Object.assign({}, tgt);
    else {
      var f = 1 - Math.pow(1 - 0.085, dt / 16.67);
      KUNCI.forEach(function (k) { sekarang[k] += (tgt[k] - sekarang[k]) * f; });
    }
    gsap.set(gerak, Object.assign({}, sekarang, lepas ? null : { autoAlpha: 0 }));
  });
  ST.addEventListener("refresh", function () { hitung(); sekarang = null; });

  /* Pembuka: video penuh layar mengecil dan meredup jadi latar, judul pergi, botol naik satu per satu.
     Semua pakai fromTo dan tanpa invalidateOnRefresh, supaya nilai awal tidak terekam ulang saat refresh. */
  gsap.timeline({
    defaults: { ease: "power2.out" },
    scrollTrigger: { trigger: "#pilih", start: "top top", end: function () { return "+=" + introAkhir; }, scrub: 1 }
  })
    .fromTo(".latar", { clipPath: "inset(0% 0% 0% 0% round 0px)" }, { clipPath: "inset(3% 2% 3% 2% round 32px)", ease: "none", duration: 1 }, 0)
    .fromTo(".latar-redup", { opacity: 0.55 }, { opacity: 1, ease: "none", duration: 1 }, 0)
    .fromTo(".intro", { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -80, duration: 0.4 }, 0)
    .fromTo(".copy-in", { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.35)
    .fromTo(".pilih-panel", { autoAlpha: 0, y: 80 }, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.3)
    .fromTo(".tile", { autoAlpha: 0, y: 120 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.4);

  /* Botol terpilih berangkat: panel, judul, dan video memudar ke warna varian */
  gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: { trigger: "#hook", start: "top bottom", end: "top 35%", scrub: 0.6, invalidateOnRefresh: true }
  })
    .to(".pilih-copy, .pilih-kanan", { autoAlpha: 0, y: -40 }, 0)
    .to(".latar", { autoAlpha: 0, duration: 0.6 }, 0);

  /* Cara pakai: tutup terbuka selama bab ini di layar */
  ST.create({
    trigger: "#pakai", start: "top 45%", end: "bottom 55%",
    onToggle: function (self) { keadaan = self.isActive ? "buka" : "tutup"; tukarBotol(); }
  });

  /* Isi tiap bab muncul saat babnya menempel */
  gsap.utils.toArray(".bab").forEach(function (bab) {
    var anak = bab.querySelectorAll(".isi > *:not(.botol-inline), .bahan li");
    gsap.from(anak, {
      y: 36, autoAlpha: 0, duration: 0.7, ease: "power3.out", stagger: 0.08,
      scrollTrigger: { trigger: bab, start: "top 35%", toggleActions: "play none none reverse" }
    });
  });

  /* Kabut wangi melayang pelan mengikuti scroll */
  gsap.utils.toArray(".kabut").forEach(function (k, j) {
    gsap.fromTo(k, { y: 80 * (j + 1) }, {
      y: -60 * (j + 1), ease: "none",
      scrollTrigger: { trigger: "#wangi", start: "top bottom", end: "bottom top", scrub: true }
    });
  });

  window.addEventListener("load", function () { ST.refresh(); });
})();
