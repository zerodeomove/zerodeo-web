/* Zerodeo web, versi awal. Semua teks varian diambil dari KONTEN.md; jangan menambah klaim di sini. */
(function () {
  "use strict";

  var VARIAN = [
    {
      id: "crystal-glow", nama: "Crystal Glow", kemasan: "Glow & Shield", tipe: "rollon",
      format: "Roll on 40 ml · for Women", tint: "#F5D3E2",
      aroma: "Amethyst, feminin, segar",
      untuk: "Kerja kantor. Wanita kantoran dan fashion.",
      hook: "Ketiak cerah, tetap kering hingga 48 jam.",
      manfaat: "Alpha arbutin bantu cerahkan ketiak, perlindungan hingga 48 jam.",
      wangi: "Amethyst yang lembut. Aman di ruang meeting, nggak ganggu orang sebelah.",
      antibakteri: false
    },
    {
      id: "bright-aura", nama: "Bright Aura", kemasan: "Bright & Confidence", tipe: "spray",
      format: "Spray 60 ml · for Women", tint: "#EFCFE1",
      aroma: "Floral feminin, segar",
      untuk: "Kerja kantor. Wanita kantoran, fashion, ibu rumah tangga muda.",
      hook: "Dingin, wangi feminin, dan alpha arbutin untuk ketiak cerah.",
      manfaat: "Alpha arbutin bantu cerahkan ketiak gelap, plus 2 bahan antiperspirant.",
      wangi: "Floral feminin yang tipis, enak dari meeting pagi sampai lembur.",
      antibakteri: false
    },
    {
      id: "daily-active", nama: "Daily Active", kemasan: "Extra Shield", tipe: "rollon",
      format: "Roll on 40 ml", tint: "#F6E8A4",
      aroma: "Bunga moringa, floral",
      untuk: "Kerja lapangan. Sales, marketing, driver. Pria dan wanita.",
      hook: "Dual Active Shield, perlindungan hingga 48 jam di lapangan.",
      manfaat: "2 bahan antiperspirant tahan keringat dan bau hingga 48 jam, tanpa noda di baju.",
      wangi: "Moringa floral yang kalem. Seharian di jalan, nggak bikin enek.",
      antibakteri: false
    },
    {
      id: "max-fresh", nama: "Max Fresh", kemasan: "Extra Cooling", tipe: "rollon",
      format: "Roll on 40 ml", tint: "#D5E6F0",
      aroma: "Mint",
      untuk: "Olahraga: gym, lari, boxing, hiking. Juga pekerja lapangan.",
      hook: "Dinginnya kerasa dari olesan pertama.",
      manfaat: "Sensasi dingin tahan lama dan perlindungan antiperspirant hingga 48 jam.",
      wangi: "Mint tipis. Habis keringetan yang tersisa segar, bukan bau campur parfum.",
      antibakteri: false
    },
    {
      id: "vital-fresh", nama: "Vital Fresh", kemasan: "Max Fresh & Brightening", tipe: "spray",
      format: "Spray 60 ml", tint: "#CFE2F2",
      aroma: "Hideout, unisex",
      untuk: "Olahraga: lari, tenis, basket. Pria dan wanita.",
      hook: "Segar habis lari, ketiak tetap terawat.",
      manfaat: "Kesegaran tahan lama, alpha arbutin bantu cerahkan, plus zat antibakteri.",
      wangi: "Hideout yang tipis, nggak bentrok dengan parfum sehabis olahraga.",
      antibakteri: true
    },
    {
      id: "zen-protect", nama: "Zen Protect", kemasan: "Bright Confidence", tipe: "spray",
      format: "Spray 60 ml", tint: "#F1EBC4",
      aroma: "Parfum “lavish”, unisex",
      untuk: "Olahraga berat, indoor dan outdoor. Pria dan wanita.",
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

  var byId = {};
  VARIAN.forEach(function (v) { byId[v.id] = v; });

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "text") n.textContent = attrs[k];
      else if (k === "style") n.style.cssText = attrs[k];
      else n.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  /* Foto katalog: 1 dan 2 tutup terpasang, 3 tutup terbuka */
  function foto(v, w, n) { return "img/katalog/" + v.id + "-" + (n || 1) + "-" + (w || 700) + ".webp"; }
  function alt(v) { return "Zerodeo " + v.nama + " " + v.format.split(" · ")[0].toLowerCase() + ", kemasan " + v.kemasan; }

  /* ---------- Kartu varian ---------- */
  var grid = document.getElementById("varian-grid");
  VARIAN.forEach(function (v) {
    var card = el("button", { "class": "v-card", type: "button", "data-tipe": v.tipe, "data-id": v.id, style: "--tint:" + v.tint, "aria-haspopup": "dialog" }, [
      el("div", { "class": "v-photo" }, [
        el("img", { src: foto(v), width: "700", height: "933", alt: alt(v), loading: "lazy" })
      ]),
      el("div", { "class": "v-body" }, [
        el("span", { "class": "v-format", text: v.format }),
        el("h3", { text: v.nama }),
        el("span", { "class": "v-kemasan", text: v.kemasan }),
        el("span", { "class": "v-aroma", text: "Aroma: " + v.aroma }),
        el("span", { "class": "v-hook", text: "“" + v.hook + "”" }),
        el("span", { "class": "v-more", text: "Lihat detail" })
      ])
    ]);
    grid.appendChild(card);
  });

  /* Filter format */
  var chips = document.querySelectorAll("[data-filter]");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      var f = chip.getAttribute("data-filter");
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
      grid.querySelectorAll(".v-card").forEach(function (card) {
        card.hidden = !(f === "semua" || card.getAttribute("data-tipe") === f);
      });
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  });

  /* ---------- Detail varian ---------- */
  var dialog = document.getElementById("detail");
  var lastFocus = null;

  function openDetail(id) {
    var v = byId[id];
    if (!v) return;
    lastFocus = document.activeElement;
    dialog.style.setProperty("--tint", v.tint);
    var img = document.getElementById("detail-img");
    var thumbs = document.getElementById("detail-thumbs");
    function show(n) {
      img.src = foto(v, 1200, n);
      img.alt = alt(v) + (n === 3 ? ", tutup terbuka" : "");
      thumbs.querySelectorAll("button").forEach(function (b, i) { b.setAttribute("aria-pressed", String(i + 1 === n)); });
    }
    thumbs.textContent = "";
    [1, 2, 3].forEach(function (n) {
      var b = el("button", { type: "button", "aria-pressed": "false", "aria-label": "Foto " + n + " dari 3" }, [
        el("img", { src: foto(v, 700, n), alt: "", width: "64", height: "64" })
      ]);
      b.addEventListener("click", function () { show(n); });
      thumbs.appendChild(b);
    });
    show(1);
    document.getElementById("detail-format").textContent = v.format;
    document.getElementById("detail-title").textContent = v.nama;
    document.getElementById("detail-kemasan").textContent = v.kemasan;
    document.getElementById("detail-manfaat").textContent = v.manfaat;
    document.getElementById("detail-wangi").textContent = v.wangi;
    document.getElementById("detail-untuk").textContent = v.untuk;

    /* Aturan klaim: "48 jam · tidak bernoda" hanya roll on; antibakteri hanya Vital Fresh & Zen Protect */
    var badges = document.getElementById("detail-badges");
    badges.textContent = "";
    if (v.tipe === "rollon") badges.appendChild(el("li", { text: "48 jam · tidak bernoda" }));
    if (v.antibakteri) badges.appendChild(el("li", { text: "Mengandung zat antibakteri" }));
    badges.hidden = !badges.children.length;

    var kand = document.getElementById("detail-kandungan");
    kand.textContent = "";
    ["2 bahan antiperspirant (Dual Active Shield): aluminium sesquichlorohydrate dan zinc phenolsulfonate",
      "Alpha arbutin", "Menthol"].concat(v.antibakteri ? ["Zat antibakteri"] : [])
      .forEach(function (t) { kand.appendChild(el("li", { text: t })); });

    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
  }
  function closeDetail() {
    if (dialog.open) dialog.close();
  }
  dialog.addEventListener("close", function () { if (lastFocus) lastFocus.focus(); });
  dialog.querySelector(".detail-close").addEventListener("click", closeDetail);
  dialog.addEventListener("click", function (e) { if (e.target === dialog) closeDetail(); });
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-id]");
    if (t) openDetail(t.getAttribute("data-id"));
  });

  /* ---------- Varian di tiap momen ---------- */
  document.querySelectorAll(".momen-varian").forEach(function (ul) {
    ul.getAttribute("data-varian").split(",").forEach(function (id) {
      var v = byId[id];
      ul.appendChild(el("li", null, [
        el("button", { "class": "mini", type: "button", "data-id": v.id, "aria-haspopup": "dialog" }, [
          el("img", { src: foto(v, 200), alt: alt(v), width: "40", height: "40", loading: "lazy" }),
          el("span", null, [el("b", { text: v.nama }), el("small", { text: v.format.split(" · ")[0] })])
        ])
      ]));
    });
  });

  /* ---------- Cari yang cocok ---------- */
  var pChips = document.getElementById("persona-chips");
  var result = document.getElementById("cocok-result");
  function showPersona(i) {
    pChips.querySelectorAll(".chip").forEach(function (c, j) { c.setAttribute("aria-pressed", String(i === j)); });
    result.textContent = "";
    PERSONA[i].varian.forEach(function (id) {
      var v = byId[id];
      result.appendChild(el("button", { "class": "c-card", type: "button", "data-id": v.id, style: "--tint:" + v.tint, "aria-haspopup": "dialog" }, [
        el("img", { src: foto(v), alt: alt(v), width: "700", height: "933", loading: "lazy" }),
        el("span", null, [el("b", { text: v.nama }), el("small", { text: v.format })])
      ]));
    });
  }
  PERSONA.forEach(function (p, i) {
    var b = el("button", { "class": "chip", type: "button", "aria-pressed": "false", text: p.nama });
    b.addEventListener("click", function () { showPersona(i); });
    pChips.appendChild(b);
  });
  showPersona(0);

  /* ---------- Video ---------- */
  /* Video hanya diputar saat terlihat. Gerak dikurangi: tidak diputar otomatis, pengunjung bisa memutar sendiri. */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var videos = Array.prototype.slice.call(document.querySelectorAll("video[data-autoplay]"));
  var pinnedVideos = null; /* diisi saat momen dikunci: hanya video panel aktif yang jalan */

  function play(v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
  if (reduceMotion) {
    videos.forEach(function (v) { if (!v.hasAttribute("aria-hidden")) v.controls = true; });
  } else if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var v = en.target;
        if (pinnedVideos && pinnedVideos.indexOf(v) !== -1) return;
        if (en.isIntersecting) play(v); else v.pause();
      });
    }, { threshold: 0.2 });
    videos.forEach(function (v) { io.observe(v); });
  }

  /* ---------- Lampu menyala di hero ---------- */
  var root = document.documentElement;
  if (root.classList.contains("lights-off")) {
    var siluet = document.querySelector(".hero-siluet");
    var lightsOn = function () { setTimeout(function () { root.classList.remove("lights-off"); }, 900); };
    if (siluet.complete) lightsOn(); else siluet.addEventListener("load", lightsOn);
  }

  /* ---------- Gerak (GSAP) ---------- */
  function initMotion() {
    var gsap = window.gsap, ST = window.ScrollTrigger;
    if (!gsap || !ST) return;
    gsap.registerPlugin(ST);

    var body = document.body;
    function setBg(c, instant) {
      gsap.to(body, { backgroundColor: c, duration: instant ? 0 : 0.7, ease: "power2.out", overwrite: "auto" });
    }

    var mm = gsap.matchMedia();

    /* Latar ganti warna per bagian, berlaku juga saat gerak dikurangi (instan) */
    mm.add({ reduce: "(prefers-reduced-motion: reduce)", ok: "(prefers-reduced-motion: no-preference)" }, function (ctx) {
      var instant = ctx.conditions.reduce;
      document.querySelectorAll("[data-bg]").forEach(function (sec) {
        if (sec.classList.contains("momen-panel")) return;
        ST.create({
          trigger: sec, start: "top 55%", end: "bottom 55%",
          onToggle: function (self) { if (self.isActive) setBg(sec.getAttribute("data-bg"), instant); }
        });
      });
    });

    /* Semua ukuran, gerak normal */
    mm.add("(prefers-reduced-motion: no-preference)", function () {
      /* Hero: layered parallax, tiap foto masuk dari samping dengan kecepatan berbeda */
      var tl = gsap.timeline({
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom bottom", scrub: 0.6 }
      });
      gsap.utils.toArray(".hero .layer").forEach(function (layer) {
        var dir = Number(layer.getAttribute("data-dir"));
        var speed = Number(layer.getAttribute("data-speed"));
        tl.fromTo(layer,
          { x: function () { return dir * window.innerWidth * 0.55; }, opacity: 0 },
          { x: 0, opacity: 1, ease: "power2.out", duration: 1 / speed },
          0);
      });
      tl.to(".layer-main", { scale: 0.9, ease: "none", duration: 1.4 }, 0)
        .to(".hero-title", { yPercent: -18, ease: "none", duration: 1.4 }, 0);

      /* Reel: jendela lengkung membesar jadi video penuh layar */
      var wide = window.matchMedia("(min-width: 700px)").matches;
      var reel = gsap.timeline({
        scrollTrigger: { trigger: ".reel-stage", start: "top top", end: "+=130%", pin: true, scrub: 0.6, refreshPriority: 2 }
      });
      reel.fromTo(".reel-window",
        { clipPath: wide ? "inset(12% 37% 8% 37% round 400px 400px 28px 28px)" : "inset(14% 16% 10% 16% round 300px 300px 24px 24px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px 0px 0px 0px)", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(".reel-video", { scale: 1.25 }, { scale: 1, ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(".reel-text > *", { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.08, duration: 0.35, ease: "power2.out" }, 0.6);

      /* Formula: kartu muncul bergantian */
      gsap.from(".f-card", {
        y: 60, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.18,
        scrollTrigger: { trigger: ".formula-grid", start: "top 80%" }
      });

      /* Judul bagian naik pelan */
      gsap.utils.toArray(".section .h2").forEach(function (h) {
        gsap.from(h, { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: h, start: "top 85%" } });
      });

      gsap.from(".wangi-list li", {
        y: 30, opacity: 0, duration: 0.8, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: ".wangi-list", start: "top 80%" }
      });
      gsap.from(".penutup-title", {
        scale: 0.86, opacity: 0, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: ".penutup", start: "top 70%" }
      });
    });

    /* Laptop: momen dikunci di layar, scroll mengganti momen */
    mm.add("(min-width: 900px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)", function () {
      var stage = document.querySelector(".momen-stage");
      var panels = gsap.utils.toArray(".momen-panel");
      stage.classList.add("is-pinned");
      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });

      var current = -1;
      var vids = panels.map(function (p) { return p.querySelector("video"); });
      pinnedVideos = vids;
      function activate(i) {
        if (i === current) return;
        current = i;
        setBg(panels[i].getAttribute("data-bg"));
        vids.forEach(function (v, j) { if (j === i) play(v); else v.pause(); });
      }

      var tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: stage, start: "top top", end: "+=" + (panels.length * 100) + "%",
          pin: true, scrub: 0.5, anticipatePin: 1,
          refreshPriority: 1, /* hitung pin dulu supaya trigger warna di bawahnya ikut bergeser */
          onUpdate: function (self) {
            activate(Math.min(panels.length - 1, Math.floor(self.progress * panels.length)));
          },
          onEnter: function () { activate(0); },
          onEnterBack: function () { current = -1; },
          onLeave: function () { vids.forEach(function (v) { v.pause(); }); },
          onLeaveBack: function () { current = -1; vids.forEach(function (v) { v.pause(); }); setBg("#111111"); }
        }
      });
      tl.to(".momen-progress span", { scaleX: 1, ease: "none", duration: panels.length }, 0);
      panels.forEach(function (p, i) {
        if (i === 0) return;
        var prev = panels[i - 1];
        var at = i - 0.35;
        tl.to(prev, { autoAlpha: 0, y: -40, duration: 0.35 }, at)
          .fromTo(p.querySelector(".momen-media"), { xPercent: 12 }, { xPercent: 0, duration: 0.5 }, at)
          .fromTo(p, { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.1);
      });

      return function () {
        pinnedVideos = null;
        stage.classList.remove("is-pinned");
        gsap.set(panels, { clearProps: "all" });
      };
    });

    /* HP / layar pendek: momen ditumpuk, latar ikut panel yang sedang di tengah */
    mm.add("(max-width: 899px), (max-height: 619px)", function () {
      gsap.utils.toArray(".momen-panel").forEach(function (p) {
        ST.create({
          trigger: p, start: "top 55%", end: "bottom 55%",
          onToggle: function (self) { if (self.isActive) setBg(p.getAttribute("data-bg"), true); }
        });
      });
    });

    window.addEventListener("load", function () { ST.refresh(); });
  }

  /* Header dapat latar begitu halaman digulir, supaya teks tidak tabrakan dengan logo */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 24); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();


  if (window.gsap) initMotion();
  else window.addEventListener("DOMContentLoaded", initMotion);
})();
