/* Lógica del portfolio: idioma, tema, menú, animaciones y pintado de secciones.
   Normalmente no hace falta tocar este archivo: el contenido está en content.js */
(function () {
  "use strict";

  var C = window.CONTENT;
  var root = document.documentElement;
  var LANGS = ["ca", "es", "en"];
  var lang = LANGS.indexOf(root.getAttribute("lang")) > -1 ? root.getAttribute("lang") : "ca";
  var PHOTO = (C.profile && C.profile.photo) || "assets/img/miquel.svg";
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var PAGE = document.body.getAttribute("data-page") || "home"; // "home" o "project"
  var HOME = PAGE === "home" ? "" : "index.html"; // prefijo de los enlaces a secciones

  /* ---------- utilidades ---------- */
  function t(v) {
    if (v == null) return "";
    if (typeof v === "object" && ("ca" in v || "es" in v || "en" in v)) return v[lang] != null ? v[lang] : (v.ca || v.es || v.en || "");
    return String(v);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function tx(v) { return esc(t(v)); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function $(id) { return document.getElementById(id); }

  var MONTHS = {
    ca: ["gen.", "febr.", "març", "abr.", "maig", "juny", "jul.", "ag.", "set.", "oct.", "nov.", "des."],
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  };
  function fmtDate(ym) {
    if (!ym) return tx(C.ui.present);
    var p = String(ym).split("-");
    if (p.length === 1) return esc(p[0]);
    var m = MONTHS[lang][Number(p[1]) - 1] || "";
    return esc(m.charAt(0).toUpperCase() + m.slice(1) + " " + p[0]);
  }

  /* ---------- logos de tecnologías ----------
     Los que existen en devicon se cargan de su CDN; el resto son iconos propios con el mismo trazo.
     Si un logo remoto falla, se cambia solo por una insignia con la inicial (ver más abajo). */
  var DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";
  var LOGOS = {
    "linux": "linux/linux-original", "kubernetes": "kubernetes/kubernetes-original",
    "postgresql": "postgresql/postgresql-original", "git": "git/git-original", "jira": "jira/jira-original", "docker": "docker/docker-original",
  };
  var TICKET = '<path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2.5a2.5 2.5 0 0 0 0 5V17a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2.5a2.5 2.5 0 0 0 0-5z"/><path d="m9.5 12 2 2 3.5-3.5"/>';
  var TECH_ICONS = {
    "aws": '<path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8.6 4.7 4.7 0 0 1 17.5 18z"/>',
    "cisco": '<rect x="3" y="12" width="18" height="7" rx="2"/><path d="M7 15.5h.01M11 15.5h.01M7 12V8M12 12V5M17 12V8"/>',
    "windows": '<path d="M3 5.6 10.8 4.5v7H3zM12.8 4.2 21 3v8.5h-8.2zM3 13h7.8v7.5L3 19.4zM12.8 13H21v8l-8.2-1.2z"/>',
    "zoho": TICKET,
    "windows server": '<rect x="4" y="3" width="16" height="7" rx="2"/><rect x="4" y="14" width="16" height="7" rx="2"/><path d="M8 6.5h.01M8 17.5h.01M12 10v4"/>',
    "virtualbox": '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    "autocad": '<path d="M4 20h16M6 20V9l6-5 6 5v11"/><path d="M10 20v-5h4v5"/>',
    "fusion": '<path d="M12 3 4 7.5v9L12 21l8-4.5v-9z"/><path d="M12 8.5 8 11v4l4 2.5 4-2.5v-4z"/>',
  };
  function logo(name) {
    var key = String(name).toLowerCase().replace(/\s+\d+$/, "");
    var v = LOGOS[key];
    if (!v && TECH_ICONS[key]) return '<span class="logo-ph is-icon" aria-hidden="true"><svg viewBox="0 0 24 24">' + TECH_ICONS[key] + "</svg></span>";
    if (!v) return '<span class="logo-ph" aria-hidden="true">' + esc(String(name).charAt(0)) + "</span>";
    var parts = v.split("|");
    return '<img class="logo' + (parts[1] ? " is-mono" : "") + '" src="' + DEVICON + parts[0] + '.svg" alt="" data-n="' + esc(String(name).charAt(0)) + '" width="24" height="24" loading="lazy" />';
  }
  // Recambio si un logo remoto no carga (sin conexión, CDN caído...)
  document.addEventListener("error", function (e) {
    var el = e.target;
    if (el && el.tagName === "IMG" && el.classList.contains("logo")) {
      var ph = document.createElement("span");
      ph.className = "logo-ph"; ph.setAttribute("aria-hidden", "true"); ph.textContent = el.getAttribute("data-n") || "";
      el.replaceWith(ph);
    }
  }, true);

  /* ---------- iconos ---------- */
  var ICON = {
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-6.5M12 13.5c0-2 1.2-3 2.6-3s2.4 1 2.4 3V17"/></svg>',
    github: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0 4.5-4.5M12 15l-4.5-4.5M5 20h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m0 0-5-5m5 5-5 5"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m0 0-6 6m6-6 6 6"/></svg>',
    external: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h9"/></svg>',
    lock: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    server: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.5h.01M7 16.5h.01"/></svg>',
    flow: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="6" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.5 6h9M6.5 8.2l4.2 7.6M17.5 8.2l-4.2 7.6"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
    award: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="m8.5 14 -1.5 7 5-3 5 3-1.5-7"/></svg>',
    cap: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m2 9 10-5 10 5-10 5z"/><path d="M6 11v5c3 2.5 9 2.5 12 0v-5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>',
    back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5m0 0 5-5m-5 5 5 5"/></svg>',
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    zoom: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5M11 8v6M8 11h6"/></svg>',
    tick: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/></svg>',
  };

  function tags(list) {
    return '<ul class="tags">' + (list || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>";
  }
  function head(id) {
    var s = C.ui.sections[id];
    return '<header class="section-head reveal"><p class="kicker">' + tx(s.kicker) + '</p><h2 id="' + id + '-title">' + tx(s.title) + "</h2></header>";
  }
  function cvLink() {
    var cv = C.profile.cv || {};
    var href = cv[lang] || cv[lang === "es" ? "en" : "es"];
    if (!href) return null;
    return { href: href, other: !cv[lang] };
  }

  var NAV = ["home", "about", "experience", "projects", "stack", "education", "contact"];

  /* ---------- navbar ---------- */
  function renderNav() {
    var li = function (id) { return '<li><a href="' + HOME + "#" + id + '" data-nav="' + id + '">' + tx(C.ui.nav[id]) + "</a></li>"; };
    $("nav-list").innerHTML = NAV.slice(1).map(li).join("");
    $("mobile-list").innerHTML = NAV.map(li).join("");
    var cv = cvLink(), b = $("nav-cv");
    if (cv) { b.href = cv.href; b.innerHTML = ICON.download + "<span>CV</span>"; b.setAttribute("aria-label", t(C.ui.ctaCv)); b.hidden = false; }
    else b.hidden = true;
  }

  /* ---------- portada ---------- */
  function renderHero() {
    var p = C.profile, h = C.hero, cv = cvLink();
    var belt = (h.mainStack || []).map(function (s) { return "<li>" + logo(s) + "<span>" + esc(s) + "</span></li>"; }).join("");
    $("home").innerHTML =
      '<div class="container hero-inner">' +
        '<div class="hero-copy">' +
          '<p class="badge reveal"><span class="dot" aria-hidden="true"></span>' + tx(h.status) + "</p>" +
          '<h1 class="hero-name reveal" style="--d:1">' + esc(h.firstName || p.name.split(" ")[0]) +
            '<span class="l2">' + esc(h.lastName || p.name.split(" ").slice(1).join(" ")) + "</span></h1>" +
          '<p class="typed reveal" style="--d:2" aria-label="' + esc((h.roles || []).map(t).join(", ")) + '"><span class="prompt" aria-hidden="true">&gt;</span><span id="typed" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span></p>' +
          '<p class="lead reveal" style="--d:3">' + tx(h.tagline) + "</p>" +
          '<div class="hero-ctas reveal" style="--d:4">' +
            '<a class="btn btn-primary" href="#projects">' + tx(C.ui.ctaProjects) + ICON.arrow + "</a>" +
            (cv ? '<a class="btn btn-outline" href="' + esc(cv.href) + '" download>' + ICON.download + tx(C.ui.ctaCv) + "</a>" : "") +
          "</div>" +
          '<ul class="hero-social reveal" style="--d:5">' +
            '<li><a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + ICON.github + "</a></li>" +
            '<li><a href="' + esc(p.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICON.linkedin + "</a></li>" +
            '<li><a href="mailto:' + esc(p.email) + '" aria-label="Email">' + ICON.mail + "</a></li>" +
          "</ul>" +
        "</div>" +
        '<div class="hero-visual reveal" style="--d:2">' +
          '<div class="photo-back" aria-hidden="true"></div>' +
          '<img class="photo" src="' + esc(PHOTO) + '" alt="' + esc(p.name) + '" width="543" height="726" />' +
          (h.years ? '<p class="sticker s2"><b>' + tx(h.years.value) + "</b><span>" + tx(h.years.text) + "</span></p>" : "") +
        "</div>" +
      "</div>" +
      (belt ? '<div class="belt" role="region" aria-label="' + tx(C.ui.stackTitle) + '"><div class="belt-track"><ul class="belt-set">' + belt + "</ul></div></div>" : "");
  }

  /* ---------- sobre mí ---------- */
  function renderAbout() {
    var a = C.about;
    $("about").innerHTML = '<div class="container">' + head("about") +
      '<div class="about-grid">' +
        '<div class="about-text reveal">' + a.paragraphs.concat(a.extra ? [a.extra] : []).map(function (x) { return "<p>" + tx(x) + "</p>"; }).join("") +
          '<ul class="about-facts">' + (a.facts || []).map(function (f) { return "<li>" + (ICON[f.icon] || "") + "<span>" + tx(f.text) + "</span></li>"; }).join("") + "</ul>" +
          '<dl class="stats about-stats reveal">' + (C.hero.stats || []).map(function (st) {
            return '<div><dt>' + tx(st.label) + '</dt><dd><span class="count" data-to="' + st.value + '">' + (REDUCED ? st.value : 0) + "</span>" + esc(st.suffix || "") + "</dd></div>";
          }).join("") + "</dl>" +
        "</div>" +
        '<ol class="journey">' + (a.journey || []).map(function (j, i) {
          return '<li class="reveal' + (j.now ? " is-now" : "") + '" style="--d:' + i + '">' +
            '<span class="j-dot" aria-hidden="true"></span>' +
            '<span class="j-years">' + tx(j.years) + "</span>" +
            "<div><h3>" + tx(j.title) + "</h3><p>" + tx(j.text) + "</p></div></li>";
        }).join("") + "</ol>" +
      "</div></div>";
  }

  /* ---------- experiencia ---------- */
  function renderExperience() {
    var list = C.experience || [];
    function yr(ym) { return String(ym).split("-")[0]; }
    var tabs = list.map(function (e, i) {
      var span = yr(e.start) + (e.end ? (yr(e.end) !== yr(e.start) ? " – " + yr(e.end) : "") : " – " + tx(C.ui.now));
      return '<button class="xp-tab" type="button" role="tab" id="xp-tab-' + i + '" aria-controls="xp-panel-' + i + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
        tx(e.company) + "<small>" + span + "</small></button>";
    }).join("");
    var panels = list.map(function (e, i) {
      return '<div class="xp-panel" role="tabpanel" id="xp-panel-' + i + '" aria-labelledby="xp-tab-' + i + '"' + (i === 0 ? "" : " hidden") + ">" +
        "<h3>" + tx(e.role) + ' <span class="xp-at">@ ' + tx(e.company) + "</span></h3>" +
        '<p class="xp-meta"><span>' + fmtDate(e.start) + " – " + (e.end ? fmtDate(e.end) : tx(C.ui.present)) + "</span>" +
          (e.client ? "<span>" + tx(C.ui.client) + ": " + tx(e.client) + "</span>" : "") +
          (e.end ? "" : '<span class="now-pill">' + tx(C.ui.current) + "</span>") + "</p>" +
        '<ul class="xp-points">' + (e.points || []).map(function (pt, k) { return '<li style="--i:' + k + '">' + tx(pt) + "</li>"; }).join("") + "</ul>" +
        (e.tech && e.tech.length ? '<ul class="xp-stack" aria-label="' + tx(C.ui.stackLabel) + '">' + e.tech.map(function (x, k) {
          return '<li style="--i:' + k + '">' + logo(x) + "<span>" + esc(x) + "</span></li>";
        }).join("") + "</ul>" : "") +
      "</div>";
    }).join("");
    $("experience").innerHTML = '<div class="container">' + head("experience") +
      '<div class="xp reveal"><div class="xp-tabs" role="tablist" aria-label="' + tx(C.ui.nav.experience) + '"><span class="xp-ind" aria-hidden="true"></span>' + tabs + "</div>" +
      '<div class="xp-panels">' + panels + "</div></div></div>";

    var btns = [].slice.call(document.querySelectorAll("#experience .xp-tab"));
    var ind = document.querySelector("#experience .xp-ind"), cur = 0;
    function moveInd() { // la "píldora" de fondo se desliza hasta la pestaña elegida
      var b = btns[cur];
      if (!b || !b.offsetWidth) return;
      ind.style.transform = "translate(" + b.offsetLeft + "px," + b.offsetTop + "px)";
      ind.style.width = b.offsetWidth + "px"; ind.style.height = b.offsetHeight + "px";
    }
    function select(i, focus) {
      cur = i;
      btns.forEach(function (b, j) {
        b.setAttribute("aria-selected", j === i); b.tabIndex = j === i ? 0 : -1;
        $("xp-panel-" + j).hidden = j !== i;
      });
      moveInd();
      if (focus) btns[i].focus();
    }
    moveInd();
    window.onresize = moveInd;
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveInd);
    btns.forEach(function (b, i) {
      b.addEventListener("click", function () { select(i); });
      b.addEventListener("keydown", function (ev) {
        var k = ev.key, n = btns.length;
        if (k === "ArrowDown" || k === "ArrowRight") { ev.preventDefault(); select((i + 1) % n, true); }
        else if (k === "ArrowUp" || k === "ArrowLeft") { ev.preventDefault(); select((i - 1 + n) % n, true); }
        else if (k === "Home") { ev.preventDefault(); select(0, true); }
        else if (k === "End") { ev.preventDefault(); select(n - 1, true); }
      });
    });
  }

  /* ---------- proyectos ---------- */
  function projUrl(p) { return "proyecto.html?p=" + encodeURIComponent(p.slug); }
  function projImg(src) { return /^(https?:)?\/\//.test(src) ? src : (C.projectImages || "assets/img/projects/") + src; }
  // Esquema dibujado con las tecnologías del proyecto (para proyectos sin capturas)
  function flowArt(p) {
    var techs = (p.tech || []).slice(0, 4);
    var node = function (name, k) { return '<div class="fl-node" style="--k:' + k + '">' + logo(name) + "<span>" + esc(name) + "</span></div>"; };
    var arrow = '<span class="fl-arrow" aria-hidden="true"><i></i></span>';
    return '<div class="flow-art" aria-hidden="true">' + techs.map(function (x, i) { return (i ? arrow : "") + node(x, i); }).join("") + "</div>";
  }
  function shot(p, eager) {
    if (p.cover === "flow" || !p.cover) return '<div class="shot is-flow">' + flowArt(p) + "</div>";
    return '<div class="shot"><div class="shot-bar" aria-hidden="true"><i></i><i></i><i></i><b></b></div>' +
      '<img src="' + esc(projImg(p.cover)) + '" alt="" width="1305" height="616"' + (eager ? "" : ' loading="lazy"') + ' decoding="async" /></div>';
  }
  function stackChips(list, cls) {
    return '<ul class="chips' + (cls ? " " + cls : "") + '">' + (list || []).map(function (x) { return "<li>" + logo(x) + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>";
  }
  function renderProjects() {
    $("projects").innerHTML = '<div class="container">' + head("projects") +
      '<div class="pj-list">' + C.projects.map(function (p, i) {
        return '<article class="pj-row reveal" style="--d:' + (i % 2) + '">' +
          '<div class="pj-media">' + shot(p) + "</div>" +
          '<div class="pj-text">' +
            '<p class="pj-type">' + tx(p.type) + "</p>" +
            '<h3 class="pj-name"><a href="' + projUrl(p) + '">' + tx(p.title) + "</a></h3>" +
            '<p class="pj-desc">' + tx(p.description) + "</p>" +
            stackChips(p.tech) +
            '<span class="pj-more" aria-hidden="true">' + tx(C.ui.project.view) + ICON.arrow + "</span>" +
          "</div>" +
        "</article>";
      }).join("") + "</div></div>";
  }

  /* ---------- página de un proyecto (proyecto.html?p=slug) ---------- */
  var current = null;
  function findProject() {
    var slug = new URLSearchParams(location.search).get("p");
    for (var i = 0; i < C.projects.length; i++) if (C.projects[i].slug === slug) return C.projects[i];
    return null;
  }
  function renderProjectPage() {
    var p = current, u = C.ui.project, info = p.info || {};
    var list = function (items, cls) { return '<ul class="' + cls + '">' + items.map(function (x, k) { return '<li style="--i:' + k + '">' + (cls === "pj-checks" ? ICON.tick : "") + "<span>" + tx(x) + "</span></li>"; }).join("") + "</ul>"; };
    var block = function (title, body) { return '<section class="pj-block reveal"><h2>' + tx(title) + "</h2>" + body + "</section>"; };
    var facts = ["kind", "year", "duration", "team", "status"].filter(function (k) { return info[k]; }).map(function (k) {
      return "<div><dt>" + tx(u[k]) + "</dt><dd>" + (k === "status" ? '<span class="status' + "" + '">' + tx(info[k]) + "</span>" : tx(info[k])) + "</dd></div>";
    }).join("");
    var action = p.repo ? '<a class="btn btn-primary" href="' + esc(p.repo) + '" target="_blank" rel="noopener">' + ICON.github + tx(u.repo) + "</a>"
      : (p.note ? '<p class="pj-private">' + ICON.lock + tx(p.note) + "</p>" : "");
    if (p.demo) action += '<a class="btn btn-outline" href="' + esc(p.demo) + '" target="_blank" rel="noopener">' + ICON.external + "Demo</a>";
    var gal = (p.gallery || []).map(function (g, k) {
      return '<li><button class="gal-item" type="button" data-k="' + k + '" aria-label="' + tx(u.open) + ": " + tx(g.caption) + '">' +
        '<img src="' + esc(projImg(g.src)) + '" alt="" loading="lazy" decoding="async" /><span>' + tx(g.caption) + "</span></button></li>";
    }).join("");
    var others = C.projects.filter(function (o) { return o !== p; }).map(function (o) {
      return '<article class="pj-card reveal"><div class="pj-media">' + shot(o) + '</div><div class="pj-card-body"><p class="pj-type">' + tx(o.type) + '</p><h3 class="pj-name"><a href="' + projUrl(o) + '">' + tx(o.title) + "</a></h3>" +
        '<span class="pj-more" aria-hidden="true">' + tx(u.view) + ICON.arrow + "</span></div></article>";
    }).join("");

    $("main").innerHTML =
      '<section class="pj-hero"><div class="container">' +
        '<a class="pj-back reveal" href="' + HOME + '#projects">' + ICON.back + tx(u.back) + "</a>" +
        '<div class="pj-head">' +
          '<div class="pj-head-text reveal" style="--d:1"><p class="pj-type">' + tx(p.type) + '</p><h1 class="pj-title">' + tx(p.title) + "</h1>" +
            (p.subtitle ? '<p class="pj-sub">' + tx(p.subtitle) + "</p>" : "") + "</div>" +
          (action ? '<div class="pj-actions reveal" style="--d:2">' + action + "</div>" : "") +
        "</div>" +
        '<div class="pj-cover reveal" style="--d:2">' + shot(p, true) + "" + "</div>" +
      "</div></section>" +
      '<section class="section pj-body"><div class="container pj-grid">' +
        '<div class="pj-main">' +
          block(u.overview, (p.intro && p.intro.length ? p.intro : [p.description]).map(function (x) { return "<p>" + tx(x) + "</p>"; }).join("")) +
          (p.features && p.features.length ? block(p.featuresTitle ? u[p.featuresTitle] : u.features, list(p.features, "pj-checks")) : "") +
          (p.results && p.results.length ? block(u.results, list(p.results, "pj-points")) : "") +
          (p.challenges && p.challenges.length ? block(u.challenges, list(p.challenges, "pj-points is-alt")) : "") +
        "</div>" +
        '<aside class="pj-aside reveal"><div class="pj-facts">' +
          "<h2>" + tx(u.details) + '</h2><dl>' + facts + "</dl>" +
          "<h2>" + tx(C.ui.stackLabel) + "</h2>" + stackChips(p.tech, "is-stack") +
        "</div></aside>" +
      "</div></section>" +
      (gal ? '<section class="section alt pj-gallery" aria-labelledby="gal-title"><div class="container"><h2 class="pj-h reveal" id="gal-title">' + tx(u.gallery) +
        ' <small>' + p.gallery.length + "</small></h2>" + '<ul class="gal-grid reveal">' + gal + "</ul></div></section>" : "") +
      '<section class="section pj-others"><div class="container"><h2 class="pj-h reveal">' + tx(u.more) + '</h2><div class="pj-cards">' + others + "</div>" +
        '<div class="pj-cta reveal"><div><h2>' + tx(u.cta) + "</h2><p>" + tx(u.ctaText) + '</p></div><a class="btn btn-primary" href="' + HOME + '#contact">' + tx(C.ui.ctaContact) + ICON.arrow + "</a></div>" +
      "</div></section>" +
      '<dialog class="lightbox" id="lightbox" aria-label="' + tx(u.gallery) + '">' +
        '<figure><img id="lb-img" src="' + (p.gallery && p.gallery.length ? esc(projImg(p.gallery[0].src)) : esc(PHOTO)) + '" alt="" /><figcaption><span id="lb-cap"></span><span id="lb-count"></span></figcaption></figure>' +
        '<button class="lb-btn lb-close" type="button" id="lb-close" aria-label="' + tx(u.close) + '">' + ICON.close + "</button>" +
        '<button class="lb-btn lb-prev" type="button" id="lb-prev" aria-label="' + tx(u.prev) + '">' + ICON.prev + "</button>" +
        '<button class="lb-btn lb-next" type="button" id="lb-next" aria-label="' + tx(u.next) + '">' + ICON.next + "</button>" +
      "</dialog>";
    setupLightbox();
  }
  function setupLightbox() {
    var box = $("lightbox"), items = current.gallery || [], k = 0;
    if (!box || !items.length) return;
    function show(i) {
      k = (i + items.length) % items.length;
      $("lb-img").src = projImg(items[k].src);
      $("lb-img").alt = t(items[k].caption);
      $("lb-cap").textContent = t(items[k].caption);
      $("lb-count").textContent = (k + 1) + " / " + items.length;
    }
    document.querySelectorAll(".gal-item").forEach(function (b) {
      b.addEventListener("click", function () {
        show(Number(b.dataset.k));
        if (box.showModal) box.showModal(); else box.setAttribute("open", "");
      });
    });
    $("lb-close").addEventListener("click", function () { box.close(); });
    $("lb-prev").addEventListener("click", function () { show(k - 1); });
    $("lb-next").addEventListener("click", function () { show(k + 1); });
    box.addEventListener("click", function (e) { if (e.target === box) box.close(); }); // clic fuera de la imagen
    box.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") show(k - 1);
      else if (e.key === "ArrowRight") show(k + 1);
    });
    var sx = null; // deslizar con el dedo
    box.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    box.addEventListener("touchend", function (e) {
      if (sx == null) return;
      var dx = e.changedTouches[0].clientX - sx; sx = null;
      if (Math.abs(dx) > 50) show(k + (dx < 0 ? 1 : -1));
    });
  }

  /* ---------- habilidades ---------- */
  function renderStack() {
    var n = C.stack.length;
    $("stack").innerHTML = '<div class="container">' + head("stack") +
      '<ol class="layers">' + C.stack.map(function (g, i) {
        return '<li class="layer reveal" style="--d:' + i + '">' +
          '<h3 class="layer-name"><span class="layer-code" aria-hidden="true">' + esc(g.code || "") + "</span>" + tx(g.group) + "</h3>" +
          '<ul class="layer-items">' + g.items.map(function (x, k) { return '<li style="--i:' + k + '">' + logo(x) + "<span>" + esc(x) + "</span></li>"; }).join("") + "</ul>" +
          (i < n - 1 ? '<span class="layer-link" aria-hidden="true"><i></i></span>' : "") +
        "</li>";
      }).join("") + "</ol>" +
      '<p class="layers-note reveal">' + tx(C.ui.stackNote) + "</p></div>";
  }

  /* ---------- formación ---------- */
  function renderEducation() {
    function card(o, i) {
      return '<article class="edu-card reveal' + (o.cert ? " is-cert" : "") + '" style="--d:' + i + '">' +
        '<span class="edu-icon" aria-hidden="true">' + o.icon + "</span>" +
        '<div class="edu-body"><p class="edu-meta"><span class="edu-date">' + o.meta + '</span><span class="edu-tag">' + o.tag + "</span></p>" +
        "<h3>" + o.title + "</h3>" + (o.place ? "<p>" + o.place + "</p>" : "") + "</div>" +
        '<span class="edu-line" aria-hidden="true"></span></article>';
    }
    var edu = (C.education || []).map(function (e, i) {
      return card({ icon: ICON.cap, meta: fmtDate(e.start) + " – " + fmtDate(e.end), tag: e.end ? (ICON.tick + tx(C.ui.eduDone)) : tx(C.ui.present), title: tx(e.title), place: tx(e.place) }, i);
    });
    var certs = (C.certifications || []).map(function (c, i) {
      var title = t(c.title), pre = c.issuer + " ";
      if (title.indexOf(pre) === 0) title = title.slice(pre.length); // el emisor ya aparece arriba
      return card({ icon: ICON.check, meta: esc(c.issuer), tag: tx(C.ui.certLabel), title: esc(title), cert: true }, i + 2);
    });
    $("education").innerHTML = '<div class="container">' + head("education") + '<div class="edu-grid">' + edu.concat(certs).join("") + "</div></div>";
  }

  /* ---------- contacto ---------- */
  function renderContact() {
    var p = C.profile, cv = cvLink();
    var row = function (i, icon, label, href, ext) {
      return '<li style="--i:' + i + '">' + (href ? '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" : "<span>") +
        '<span class="cc-ic">' + icon + "</span><span>" + label + "</span>" + (ext ? '<span class="cc-go" aria-hidden="true">' + ICON.external + "</span>" : "") +
        (href ? "</a>" : "</span>") + "</li>";
    };
    $("contact").innerHTML = '<div class="container"><div class="contact-wrap">' +
      '<div class="contact-info reveal">' +
        '<p class="kicker">' + tx(C.ui.sections.contact.kicker) + '</p><h2 id="contact-title">' + tx(C.ui.sections.contact.title) + "</h2>" +
        '<p class="contact-text">' + tx(C.ui.contactText) + "</p>" +
        '<div class="contact-ctas">' +
          '<a class="btn btn-primary" href="mailto:' + esc(p.email) + '">' + ICON.mail + tx(C.ui.ctaEmail) + "</a>" +
          (cv ? '<a class="btn btn-outline" href="' + esc(cv.href) + '" download>' + ICON.download + tx(C.ui.ctaCv) + "</a>" : "") +
        "</div>" +
      "</div>" +
      '<div class="contact-card reveal" style="--d:2">' +
        '<div class="cc-who"><img src="' + esc(PHOTO) + '" alt="" width="543" height="726" loading="lazy" /><div><p class="cc-name">' + esc(p.name) + '</p><p class="cc-role">' + tx(C.ui.cardRole) + "</p></div></div>" +
        '<ul class="cc-rows">' +
          '<li style="--i:0" class="cc-mail"><a href="mailto:' + esc(p.email) + '"><span class="cc-ic">' + ICON.mail + "</span><span>" + esc(p.email) + "</span></a>" +
            '<button class="copy" id="copy-email" type="button" aria-label="' + tx(C.ui.copy) + '" title="' + tx(C.ui.copy) + '">' + ICON.copy + ICON.tick + "</button></li>" +
          row(1, ICON.linkedin, esc(p.linkedinLabel || p.linkedin.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")), p.linkedin, true) +
          row(2, ICON.github, esc(p.github.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")), p.github, true) +
          row(3, ICON.pin, esc(p.location) + ", " + ({ ca: "Espanya", es: "España", en: "Spain" }[lang])) +
        "</ul>" +
      "</div>" +
    "</div></div>";

    $("copy-email").addEventListener("click", function () {
      var b = this;
      if (navigator.clipboard) navigator.clipboard.writeText(p.email).then(function () {
        b.classList.add("is-done"); b.title = t(C.ui.copied);
        setTimeout(function () { b.classList.remove("is-done"); b.title = t(C.ui.copy); }, 1600);
      }, function () {});
    });
  }

  /* ---------- footer ---------- */
  function renderFooter() {
    var p = C.profile, F = C.ui.footerCols, ids = NAV.slice(1);
    var col = function (title, items) {
      return '<div class="footer-col"><h2>' + tx(title) + "</h2><ul>" + items.map(function (x) { return '<li><a href="' + x[0] + '">' + x[1] + "</a></li>"; }).join("") + "</ul></div>";
    };
    var sec = function (id) { return [HOME + "#" + id, tx(C.ui.nav[id])]; };
    $("footer").innerHTML = '<div class="container">' +
      '<div class="footer-top">' +
        '<div class="footer-brand"><a class="logo" href="' + HOME + '#home"><span class="logo-mark" aria-hidden="true">MM</span><span class="logo-text">' + esc(p.name) + "</span></a><p>" + tx(C.ui.footerTag) + "</p>" +
          '<ul class="footer-social">' +
            '<li><a href="' + esc(p.github) + '" target="_blank" rel="noopener" aria-label="GitHub">' + ICON.github + "</a></li>" +
            '<li><a href="' + esc(p.linkedin) + '" target="_blank" rel="noopener" aria-label="LinkedIn">' + ICON.linkedin + "</a></li>" +
            '<li><a href="mailto:' + esc(p.email) + '" aria-label="Email">' + ICON.mail + "</a></li>" +
          "</ul></div>" +
        '<nav class="footer-cols" aria-label="Footer">' +
          col(F.sections, ids.slice(0, 3).map(sec)) +
          col(F.more, ids.slice(3).map(sec)) +
          col(F.projects, C.projects.map(function (pr) { return [projUrl(pr), tx(pr.short || pr.title)]; })) +
        "</nav>" +
      "</div>" +
      '<div class="footer-bottom"><p>© ' + new Date().getFullYear() + " " + esc(p.name) + ". " + tx(C.ui.rights) + "</p>" +
        '<a class="back-top" href="' + (PAGE === "home" ? "#home" : "#main") + '">' + tx(C.ui.backTop) + ICON.up + "</a></div>" +
    "</div>";
  }

  /* ---------- animaciones ---------- */
  var revealIO, navIO, typedTimer, beltRAF;
  function setupReveal() {
    var els = document.querySelectorAll(".reveal");
    if (REDUCED || !("IntersectionObserver" in window)) { els.forEach(function (el) { el.classList.add("in"); }); runCounters(); return; }
    if (revealIO) revealIO.disconnect();
    revealIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        if (en.target.classList.contains("stats")) runCounters();
        revealIO.unobserve(en.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { revealIO.observe(el); });
    // Red de seguridad: si el navegador no avisa (pestaña en segundo plano, etc.), mostrar todo igualmente
    setTimeout(function () {
      var pending = document.querySelectorAll(".reveal:not(.in)");
      if (!pending.length) return;
      pending.forEach(function (el) { el.classList.add("in"); });
      runCounters();
    }, 2500);
  }
  function runCounters() {
    document.querySelectorAll(".count").forEach(function (el) {
      var to = Number(el.dataset.to), start = null;
      if (REDUCED) { el.textContent = to; return; }
      function step(ts) {
        if (!start) start = ts;
        var k = Math.min((ts - start) / 1100, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
        if (k < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      setTimeout(function () { el.textContent = to; }, 1300); // garantiza el valor final
    });
  }
  function setupTyped() {
    clearTimeout(typedTimer);
    var el = $("typed"), roles = (C.hero.roles || []).map(t);
    if (!el || !roles.length) return;
    if (REDUCED) { el.textContent = roles[0]; return; }
    var r = 0, i = 0, del = false;
    (function tick() {
      var word = roles[r];
      i += del ? -1 : 1;
      el.textContent = word.slice(0, i);
      var wait = del ? 35 : 70;
      if (!del && i === word.length) { del = true; wait = 1800; }
      else if (del && i === 0) { del = false; r = (r + 1) % roles.length; wait = 300; }
      typedTimer = setTimeout(tick, wait);
    })();
  }
  /* Cinta de tecnologías: avanza sola, sin huecos, y se puede arrastrar con el ratón o el dedo */
  function setupBelt() {
    cancelAnimationFrame(beltRAF);
    var belt = document.querySelector(".belt");
    if (!belt) return;
    var track = belt.querySelector(".belt-track"), first = track.firstElementChild;
    var x = 0, last = 0, drag = null, hover = false, SPEED = REDUCED ? 0 : 38; // px por segundo
    function fill(w) { // repite la lista hasta cubrir el ancho + una copia extra
      var need = Math.ceil(belt.offsetWidth / w) + 1;
      while (track.children.length < need) {
        var c = first.cloneNode(true); c.setAttribute("aria-hidden", "true"); track.appendChild(c);
      }
    }
    function frame(ts) {
      var w = first.offsetWidth, dt = last ? Math.min((ts - last) / 1000, .1) : 0;
      last = ts;
      if (w) {
        fill(w);
        if (!drag && !hover) x += SPEED * dt;
        x = ((x % w) + w) % w;
        track.style.transform = "translate3d(" + (-x) + "px,0,0)";
      }
      beltRAF = requestAnimationFrame(frame);
    }
    belt.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") hover = true; });
    belt.addEventListener("pointerleave", function () { hover = false; });
    belt.addEventListener("pointerdown", function (e) {
      drag = { start: e.clientX, from: x };
      belt.setPointerCapture(e.pointerId); belt.classList.add("is-dragging");
    });
    belt.addEventListener("pointermove", function (e) { if (drag) x = drag.from - (e.clientX - drag.start); });
    function end() { drag = null; belt.classList.remove("is-dragging"); }
    belt.addEventListener("pointerup", end);
    belt.addEventListener("pointercancel", end);
    belt.addEventListener("dragstart", function (e) { e.preventDefault(); });
    beltRAF = requestAnimationFrame(frame);
  }
  /* Brillo suave que sigue al ratón dentro de las tarjetas */
  var GLOW = ".xp-panels, .layer, .edu-card, .pj-facts, .pj-card";
  function setupGlow() {
    document.querySelectorAll(GLOW).forEach(function (el) { el.classList.add("glow"); });
  }
  /* Efectos con el ratón (solo con ratón y sin "reducir movimiento"):
     - luz suave de fondo que sigue al cursor con un poco de retraso
     - la foto de la portada se mueve en capas (paralaje)
     - las capturas de proyectos se inclinan levemente hacia el cursor
     - los botones principales se acercan un poco al cursor (efecto imán) */
  var FX = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !REDUCED;
  if (window.matchMedia("(hover: hover)").matches) {
    var spot = $("spotlight"), pos = { x: -999, y: -999 }, cur = { x: -999, y: -999 }, fxRAF = 0, hero = { x: 0, y: 0, tx: 0, ty: 0 };
    var MAG = ".btn-primary, .btn-outline, .hero-social a, .footer-social a";
    function fxFrame() {
      cur.x += (pos.x - cur.x) * .12; cur.y += (pos.y - cur.y) * .12;
      hero.x += (hero.tx - hero.x) * .08; hero.y += (hero.ty - hero.y) * .08;
      if (spot) spot.style.transform = "translate3d(" + cur.x + "px," + cur.y + "px,0)";
      var h = $("home");
      if (h) { h.style.setProperty("--hx", hero.x.toFixed(3)); h.style.setProperty("--hy", hero.y.toFixed(3)); }
      var still = Math.abs(pos.x - cur.x) < .3 && Math.abs(pos.y - cur.y) < .3 && Math.abs(hero.tx - hero.x) < .002 && Math.abs(hero.ty - hero.y) < .002;
      fxRAF = still ? 0 : requestAnimationFrame(fxFrame);
    }
    function kick() { if (!fxRAF) fxRAF = requestAnimationFrame(fxFrame); }
    var magEl = null;
    function releaseMag() { if (magEl) { magEl.style.removeProperty("--tx"); magEl.style.removeProperty("--ty"); magEl = null; } }
    var tiltEl = null;
    function releaseTilt() { if (tiltEl) { tiltEl.style.removeProperty("--rx"); tiltEl.style.removeProperty("--ry"); tiltEl = null; } }
    document.addEventListener("pointermove", function (e) {
      var t = e.target.closest ? e.target : null;
      // brillo dentro de las tarjetas
      var el = t && t.closest(".glow");
      if (el) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      }
      if (!FX || e.pointerType !== "mouse") return;
      // luz de fondo
      if (spot && !spot.classList.contains("on")) { cur.x = e.clientX; cur.y = e.clientY; spot.classList.add("on"); }
      pos.x = e.clientX; pos.y = e.clientY;
      // paralaje de la portada
      var h = $("home");
      if (h) {
        var hr = h.getBoundingClientRect();
        if (e.clientY < hr.bottom) {
          hero.tx = Math.max(-1, Math.min(1, (e.clientX - hr.left) / hr.width * 2 - 1));
          hero.ty = Math.max(-1, Math.min(1, (e.clientY - hr.top) / hr.height * 2 - 1));
        } else { hero.tx = 0; hero.ty = 0; }
      }
      // inclinación de capturas
      var sh = t && t.closest(".pj-row, .pj-card, .pj-cover");
      sh = sh && sh.querySelector(".shot");
      if (sh !== tiltEl) releaseTilt();
      if (sh) {
        var sr = sh.getBoundingClientRect(), px = (e.clientX - sr.left) / sr.width - .5, py = (e.clientY - sr.top) / sr.height - .5;
        sh.style.setProperty("--ry", (Math.max(-.5, Math.min(.5, px)) * 7).toFixed(2) + "deg");
        sh.style.setProperty("--rx", (Math.max(-.5, Math.min(.5, py)) * -7).toFixed(2) + "deg");
        tiltEl = sh;
      }
      // efecto imán en botones
      var m = t && t.closest(MAG);
      if (m !== magEl) releaseMag();
      if (m) {
        var mr = m.getBoundingClientRect();
        var dx = (e.clientX - mr.left) / mr.width - .5, dy = (e.clientY - mr.top) / mr.height - .5; // de -0,5 a 0,5
        m.style.setProperty("--tx", (dx * 10).toFixed(1) + "px"); // como mucho 5 px
        m.style.setProperty("--ty", (dy * 8).toFixed(1) + "px");  // como mucho 4 px
        magEl = m;
      }
      kick();
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", function () {
      if (spot) spot.classList.remove("on");
      hero.tx = 0; hero.ty = 0; releaseMag(); releaseTilt(); kick();
    });
  }
  function setupActiveNav() {
    if (!("IntersectionObserver" in window)) return;
    if (navIO) navIO.disconnect();
    navIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        document.querySelectorAll("[data-nav]").forEach(function (a) {
          var on = a.getAttribute("data-nav") === en.target.id;
          a.classList.toggle("is-active", on);
          if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach(function (id) { navIO.observe($(id)); });
  }

  /* ---------- idioma y tema ---------- */
  function applyMeta() {
    document.title = current ? t(current.title) + " · " + C.profile.name : t(C.ui.meta.title);
    var d = document.querySelector('meta[name="description"]');
    if (d) d.setAttribute("content", current ? t(current.description) : t(C.ui.meta.description));
    document.querySelectorAll("[data-t]").forEach(function (el) {
      var v = el.getAttribute("data-t").split(".").reduce(function (o, k) { return o && o[k]; }, C);
      el.textContent = t(v);
    });
    var lb = $("lang-toggle");
    lb.setAttribute("aria-label", t(C.ui.langSwitch)); lb.setAttribute("title", t(C.ui.langSwitch));
    lb.querySelectorAll("[data-lang]").forEach(function (s) { s.classList.toggle("is-active", s.getAttribute("data-lang") === lang); });
    $("menu-toggle").setAttribute("aria-label", t(C.ui.menu));
    updateThemeLabel();
  }
  function updateThemeLabel() {
    var dark = root.getAttribute("data-theme") === "dark";
    var label = t(dark ? C.ui.themeToLight : C.ui.themeToDark), b = $("theme-toggle");
    b.setAttribute("aria-label", label); b.setAttribute("title", label);
  }
  // Clic en un idioma concreto lo elige; clic en el resto del botón (o con teclado) pasa al siguiente
  $("lang-toggle").addEventListener("click", function (e) {
    var pick = e.target.closest ? e.target.closest("[data-lang]") : null;
    lang = pick ? pick.getAttribute("data-lang") : LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length];
    root.setAttribute("lang", lang); store("lang", lang);
    var url = new URL(location.href);
    if (url.searchParams.has("lang")) { url.searchParams.set("lang", lang); history.replaceState(null, "", url); }
    renderAll();
  });
  $("theme-toggle").addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); store("theme", next); updateThemeLabel();
  });
  var mq = window.matchMedia("(prefers-color-scheme: dark)");
  if (mq.addEventListener) mq.addEventListener("change", function (e) {
    var saved = null; try { saved = localStorage.getItem("theme"); } catch (err) {}
    if (!saved) { root.setAttribute("data-theme", e.matches ? "dark" : "light"); updateThemeLabel(); }
  });

  /* ---------- menú móvil y barra al hacer scroll ---------- */
  var nav = $("navbar"), menuBtn = $("menu-toggle");
  function setMenu(open) { nav.classList.toggle("menu-open", open); menuBtn.setAttribute("aria-expanded", String(open)); }
  menuBtn.addEventListener("click", function () { setMenu(!nav.classList.contains("menu-open")); });
  $("mobile-menu").addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 10); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function renderAll() {
    renderNav();
    if (PAGE === "project") {
      renderProjectPage(); renderFooter();
      applyMeta(); setupReveal(); setupGlow();
      return;
    }
    renderHero(); renderAbout(); renderExperience(); renderProjects();
    renderStack(); renderEducation(); renderContact(); renderFooter();
    applyMeta(); setupReveal(); setupTyped(); setupBelt(); setupGlow(); setupActiveNav();
  }
  if (PAGE === "project") {
    current = findProject();
    if (!current) { location.replace("index.html#projects"); return; }
  }
  renderAll();
})();
