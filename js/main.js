(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  var cfg = window.SITE_CONFIG || {};
  var SVG_NS = "http://www.w3.org/2000/svg";
  var reduzirMovimento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilitários ---------- */
  function ler(caminho) {
    return caminho.split(".").reduce(function (o, k) { return o && o[k]; }, cfg);
  }
  function vazio(v) { return !v || !String(v).trim(); }
  function aConfirmar(v) { return typeof v === "string" && v.trim().charAt(0) === "["; }
  function confirmado(v) { return !vazio(v) && !aConfirmar(v); }

  function marcador(texto) {
    var s = document.createElement("span");
    s.className = "marcador";
    s.textContent = texto || "[DADO A CONFIRMAR]";
    return s;
  }

  function icone(nome) {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "icone");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#i-" + nome);
    svg.appendChild(use);
    return svg;
  }

  function salvar(chave, valor) {
    try { localStorage.setItem(chave, valor); } catch (e) { /* navegação privada: segue sem salvar */ }
  }

  /* ---------- 1. Dados do config.js ---------- */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var v = ler(el.getAttribute("data-config"));
    el.textContent = "";
    if (confirmado(v)) el.textContent = v;
    else el.appendChild(marcador(v));
  });

  // Telefones só viram link de ligação depois de confirmados
  document.querySelectorAll("[data-config-tel]").forEach(function (el) {
    var v = ler(el.getAttribute("data-config-tel"));
    el.textContent = "";
    if (!confirmado(v)) { el.appendChild(marcador(v)); return; }
    var a = document.createElement("a");
    a.className = "botao botao--primario botao--telefone";
    a.href = "tel:" + String(v).replace(/[^\d+]/g, "");
    a.appendChild(icone("telefone"));
    a.appendChild(document.createTextNode("Ligar: " + v));
    el.appendChild(a);
  });

  document.querySelectorAll("[data-esconder-se-vazio]").forEach(function (el) {
    if (vazio(ler(el.getAttribute("data-esconder-se-vazio")))) el.hidden = true;
  });

  document.querySelectorAll("[data-config-link]").forEach(function (el) {
    var v = ler(el.getAttribute("data-config-link"));
    var rotulo = el.textContent.trim();
    el.textContent = "";
    if (!confirmado(v)) { el.appendChild(marcador(v)); return; }
    var a = document.createElement("a");
    a.className = el.getAttribute("data-classe") || "";
    a.href = v;
    a.rel = "noopener";
    a.appendChild(document.createTextNode(rotulo + " "));
    a.appendChild(icone("externo"));
    var aviso = document.createElement("span");
    aviso.className = "visualmente-oculto";
    aviso.textContent = "(abre o site da Prefeitura)";
    a.appendChild(aviso);
    el.appendChild(a);
  });

  // Link "Abrir no mapa": só aparece quando o endereço estiver confirmado
  document.querySelectorAll("[data-config-mapa]").forEach(function (el) {
    var v = ler(el.getAttribute("data-config-mapa"));
    if (!confirmado(v)) { el.hidden = true; return; }
    var a = document.createElement("a");
    a.className = "link-mapa";
    a.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v + ", Belo Horizonte - MG");
    a.rel = "noopener";
    a.appendChild(icone("local"));
    a.appendChild(document.createTextNode("Abrir no mapa"));
    var aviso = document.createElement("span");
    aviso.className = "visualmente-oculto";
    aviso.textContent = " (abre o aplicativo ou site de mapas)";
    a.appendChild(aviso);
    el.appendChild(a);
  });

  /* ---------- 2. Cabeçalho ganha sombra ao rolar ---------- */
  var cabecalho = document.getElementById("cabecalho");
  function aoRolar() { cabecalho.classList.toggle("rolado", window.scrollY > 4); }
  window.addEventListener("scroll", aoRolar, { passive: true });
  aoRolar();

  /* ---------- 3. Menu (hambúrguer no celular) ---------- */
  var botaoMenu = document.querySelector(".botao-menu");
  var menu = document.getElementById("menu-principal");

  function definirMenu(aberto) {
    menu.classList.toggle("aberta", aberto);
    botaoMenu.setAttribute("aria-expanded", String(aberto));
  }
  botaoMenu.addEventListener("click", function () {
    definirMenu(botaoMenu.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) definirMenu(false);
  });
  document.addEventListener("click", function (e) {
    if (menu.classList.contains("aberta") && !e.target.closest("#menu-principal, .botao-menu")) definirMenu(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("aberta")) {
      definirMenu(false);
      botaoMenu.focus();
    }
  });
  var telaGrande = window.matchMedia("(min-width: 75rem)");
  function aoMudarTela() { if (telaGrande.matches) definirMenu(false); }
  if (telaGrande.addEventListener) telaGrande.addEventListener("change", aoMudarTela);
  else if (telaGrande.addListener) telaGrande.addListener(aoMudarTela);

  /* ---------- 4. Tamanho do texto (salvo no navegador, sem cookies) ---------- */
  var passos = [90, 100, 115, 130, 150];
  function fonteAtual() {
    var p = parseInt(doc.style.fontSize, 10);
    return passos.indexOf(p) >= 0 ? p : 100;
  }
  document.querySelectorAll("[data-fonte]").forEach(function (b) {
    b.addEventListener("click", function () {
      var direcao = parseInt(b.getAttribute("data-fonte"), 10);
      var i = passos.indexOf(fonteAtual());
      var novo = direcao === 0 ? 100 : passos[Math.min(passos.length - 1, Math.max(0, i + direcao))];
      doc.style.fontSize = novo + "%";
      salvar("ct-fonte", novo);
    });
  });

  /* ---------- 5. Alto contraste ---------- */
  var botaoContraste = document.getElementById("botao-contraste");
  var corTema = document.querySelector('meta[name="theme-color"]');
  function aplicarContraste(alto) {
    if (alto) doc.setAttribute("data-contraste", "alto");
    else doc.removeAttribute("data-contraste");
    botaoContraste.setAttribute("aria-checked", String(alto));
    if (corTema) corTema.setAttribute("content", alto ? "#000000" : "#0b4f8a");
  }
  aplicarContraste(doc.getAttribute("data-contraste") === "alto");
  botaoContraste.addEventListener("click", function () {
    var alto = botaoContraste.getAttribute("aria-checked") !== "true";
    aplicarContraste(alto);
    salvar("ct-contraste", alto ? "alto" : "normal");
  });

  /* ---------- 6. Perguntas frequentes (padrão WAI-ARIA Accordion) ---------- */
  document.querySelectorAll(".sanfona__botao").forEach(function (b) {
    var painel = document.getElementById(b.getAttribute("aria-controls"));
    var item = b.closest(".sanfona__item");
    painel.hidden = true;
    b.addEventListener("click", function () {
      var abrir = b.getAttribute("aria-expanded") !== "true";
      b.setAttribute("aria-expanded", String(abrir));
      painel.hidden = !abrir;
      item.classList.toggle("aberto", abrir);
    });
  });

  if (!("IntersectionObserver" in window)) return;

  /* ---------- 7. Destaca no menu a seção que está na tela ---------- */
  var linksMenu = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var visiveis = {};
  var espiao = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) { visiveis[en.target.id] = en.isIntersecting; });
    var atual = null;
    linksMenu.forEach(function (a) {
      var id = a.getAttribute("href").slice(1);
      if (!atual && visiveis[id]) atual = id;
    });
    linksMenu.forEach(function (a) {
      if (a.getAttribute("href").slice(1) === atual) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  linksMenu.forEach(function (a) {
    var secao = document.getElementById(a.getAttribute("href").slice(1));
    if (secao) espiao.observe(secao);
  });

  /* ---------- 8. Botão fixo "Como acionar" (some quando não é necessário) ---------- */
  var ctaFixo = document.getElementById("cta-fixo");
  var estado = { hero: true, acionar: false, rodape: false };
  var alvos = {
    hero: document.getElementById("cta-hero"),
    acionar: document.getElementById("como-acionar"),
    rodape: document.querySelector(".rodape")
  };
  var observadorCta = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (en) { estado[en.target.getAttribute("data-alvo")] = en.isIntersecting; });
    ctaFixo.hidden = estado.hero || estado.acionar || estado.rodape;
  });
  Object.keys(alvos).forEach(function (chave) {
    if (!alvos[chave]) return;
    alvos[chave].setAttribute("data-alvo", chave);
    observadorCta.observe(alvos[chave]);
  });

  /* ---------- 9. Entrada suave dos cartões (desligada com movimento reduzido) ----------
     Os cartões nunca ficam escondidos: os que já estão na tela ao abrir não animam,
     e os de baixo animam um pouco antes de entrar na tela. */
  if (reduzirMovimento) return;
  var jaVistos = new WeakSet();
  var observadorRevelar = new IntersectionObserver(function (entradas, obs) {
    entradas.forEach(function (en) {
      var primeiraLeitura = !jaVistos.has(en.target);
      jaVistos.add(en.target);
      if (!en.isIntersecting) return;
      if (!primeiraLeitura) en.target.classList.add("visivel");
      obs.unobserve(en.target);
    });
  }, { rootMargin: "0px 0px 12% 0px" });
  document.querySelectorAll(".grade-revelar").forEach(function (grade) {
    Array.prototype.forEach.call(grade.children, function (el, i) {
      el.classList.add("revelar");
      el.style.animationDelay = (i % 3) * 70 + "ms";
      observadorRevelar.observe(el);
    });
  });
})();
