/* ==========================================================================
   C.Lab — site behaviour
   Theme switch, navigation, the five movements, and the scroll reveal.
   No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ===================================================================
     THEME
     The pre-paint script in each page's <head> has already set
     data-theme, so there is never a flash of the wrong mode. This only
     wires the button and keeps the label honest.
     =================================================================== */
  function initTheme() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;

    function apply(theme, save) {
      document.documentElement.setAttribute('data-theme', theme);
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
      if (save) { try { localStorage.setItem('clab-theme', theme); } catch (e) {} }
    }

    apply(document.documentElement.getAttribute('data-theme') || 'light', false);

    btn.addEventListener('click', function () {
      var now = document.documentElement.getAttribute('data-theme');
      apply(now === 'dark' ? 'light' : 'dark', true);
    });

    // Follow the operating system until the visitor makes an explicit choice.
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      var onChange = function () {
        var saved = null;
        try { saved = localStorage.getItem('clab-theme'); } catch (e) {}
        if (!saved) apply(mq.matches ? 'dark' : 'light', false);
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ===================================================================
     NAVIGATION
     =================================================================== */
  function initNav() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 24); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===================================================================
     THE FIVE MOVEMENTS
     Copy verbatim from Forest's doc 7.7.26.
     =================================================================== */
  var MOVEMENTS = [
    {
      num: 1, name: 'Cosmos', color: 'var(--c1)',
      tagline: 'Waking up to wonder, awe and gratitude for the gift of Life',
      body: 'We live on a garden planet in an infinite ocean of space. What are the chances? Modern science confirms what wisdom traditions have known for millennia: the Cosmos, from the micro to the macro, is an interconnected whole, creative, intelligent and alive. We are not separate from this living universe. We come from it and are sustained by it, and so does everyone and everything around us. Movement 1 is waking up to the wonder, awe and gratitude for this gift of life and the mystery we are part of.'
    },
    {
      num: 2, name: 'Conditioning', color: 'var(--c2)',
      tagline: 'Disconnection from ourselves, each other & the living world',
      body: 'Modern life disconnects us from ourselves, each other and the living world. This experience of separation is the root cause of our increasing stress, dissatisfaction and the global challenges we face. We feel the division in our bodies, our families, our communities and the world around us. Movement 2 is clearly seeing the impact of disconnection everywhere as the first step to transforming it.'
    },
    {
      num: 3, name: 'Connection', color: 'var(--c3)',
      tagline: 'Reconnecting to ourselves, each other & the living world',
      body: 'Through teachings and practices we call primary satisfactions, you learn how to live with greater connection to yourself, others and the living world. This brings a depth of aliveness, fulfillment and transformation we cannot find alone. Movement 3 is learning to live from your Connected Self as gift you give to yourself and everyone around you. Welcome home.'
    },
    {
      num: 4, name: 'Creativity', color: 'var(--c4)',
      tagline: 'Dreaming into being a more fulfilling life & loving world',
      body: 'We can only create what we can first imagine. Everything around us started as an idea in someone’s mind. Our systems, institutions, and stories of disconnection can all be reimagined. When we are living from our Connected Self, our imagination comes alive and creativity flows. Movement 4 is where we dream into being a more fulfilling life and loving world.'
    },
    {
      num: 5, name: 'Contribution', color: 'var(--c5)',
      tagline: 'Taking action for the love of life',
      body: 'We come from and are sustained by Life Itself. The living universe that holds us all. And now we give back to it. Connected to ourselves, we know the gifts we are here to offer. Connected to each other, we have the courage to act. Connected to the beauty of this living world, we are called to protect and restore this garden planet. This is the Connected Self in action. Not from obligation. Not from fear. But for the love of life. So our children and all of life can thrive.'
    }
  ];

  var ROMAN = ['I', 'II', 'III', 'IV', 'V'];
  var NS = 'http://www.w3.org/2000/svg';
  var CX = 200, CY = 200, R = 176;
  var current = -1;

  function nodePoint(i) {
    var ang = (-90 + i * 72) * Math.PI / 180;  // start at the top, 72° apart
    return { x: CX + R * Math.cos(ang), y: CY + R * Math.sin(ang) };
  }

  function buildMandala() {
    var spokes = document.getElementById('spokes');
    var group = document.getElementById('spiralNodes');
    if (!spokes || !group) return;

    MOVEMENTS.forEach(function (m, i) {
      var p = nodePoint(i);

      var line = document.createElementNS(NS, 'line');
      line.setAttribute('x1', CX); line.setAttribute('y1', CY);
      line.setAttribute('x2', p.x.toFixed(1)); line.setAttribute('y2', p.y.toFixed(1));
      line.style.setProperty('--c', m.color);
      spokes.appendChild(line);

      var node = document.createElementNS(NS, 'g');
      node.setAttribute('class', 'node');
      node.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ',' + p.y.toFixed(1) + ')');
      node.setAttribute('tabindex', '0');
      node.setAttribute('role', 'tab');
      node.setAttribute('aria-label', 'Movement ' + m.num + ': ' + m.name);
      node.style.setProperty('--c', m.color);

      var hit = document.createElementNS(NS, 'circle');
      hit.setAttribute('class', 'hit'); hit.setAttribute('r', '26');
      var halo = document.createElementNS(NS, 'circle');
      halo.setAttribute('class', 'halo');
      var dot = document.createElementNS(NS, 'circle');
      dot.setAttribute('class', 'dot');
      var num = document.createElementNS(NS, 'text');
      num.setAttribute('class', 'num'); num.textContent = m.num;

      node.appendChild(hit); node.appendChild(halo); node.appendChild(dot); node.appendChild(num);

      node.addEventListener('click', function () { goToMovement(i); });
      node.addEventListener('mouseenter', function () { select(i); });
      node.addEventListener('focus', function () { select(i); });
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToMovement(i); }
        else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); select((i + 1) % MOVEMENTS.length, true); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); select((i - 1 + MOVEMENTS.length) % MOVEMENTS.length, true); }
      });

      group.appendChild(node);
    });
  }

  function buildRail() {
    var rail = document.getElementById('mvNav');
    if (!rail) return;
    MOVEMENTS.forEach(function (m, i) {
      var item = document.createElement('button');
      item.className = 'mv-item';
      item.type = 'button';
      item.setAttribute('role', 'tab');
      item.style.setProperty('--c', m.color);
      item.innerHTML =
        '<span class="mv-bar"><span class="mv-bar-fill"></span></span>' +
        '<span class="mv-num">' + m.num + '</span>' +
        '<span class="mv-name">' + m.name + '</span>';
      item.addEventListener('click', function () { goToMovement(i); });
      rail.appendChild(item);
    });
  }

  function setBars(idx, seg) {
    var fills = document.querySelectorAll('#mvNav .mv-bar-fill');
    Array.prototype.forEach.call(fills, function (b, i) {
      var h = i < idx ? 100 : (i === idx ? Math.max(0, Math.min(1, seg)) * 100 : 0);
      b.style.height = h.toFixed(1) + '%';
    });
  }

  function select(i, focusNode) {
    if (i === current) return;
    current = i;
    var m = MOVEMENTS[i];
    var detail = document.getElementById('mvDetail');
    if (!detail) return;

    detail.style.setProperty('--c', m.color);
    setText('mvGhost', ROMAN[i]);
    setText('mvEyebrow', 'Movement ' + m.num);
    setText('mvName', m.name);
    setText('mvTag', m.tagline);
    setText('mvBody', m.body);

    if (!reduce) {
      detail.classList.remove('is-in');
      void detail.offsetWidth;   // restart the animation
      detail.classList.add('is-in');
    }

    toggleAll('#spiralNodes .node', i, 'is-active', true);
    toggleAll('#mvNav .mv-item', i, 'is-active', true);
    toggleAll('#spokes line', i, 'is-on', false);

    var core = document.getElementById('mandalaCore');
    if (core) {
      core.style.setProperty('--c', m.color);
      core.style.transform = 'rotate(' + (i * -72) + 'deg)';
    }

    var nodes = document.querySelectorAll('#spiralNodes .node');
    if (focusNode && nodes[i]) nodes[i].focus();
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function toggleAll(selector, activeIndex, cls, aria) {
    var els = document.querySelectorAll(selector);
    Array.prototype.forEach.call(els, function (el, idx) {
      var on = idx === activeIndex;
      el.classList.toggle(cls, on);
      if (aria) el.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  function isStacked() { return window.matchMedia('(max-width: 56rem)').matches; }

  /* Scroll position inside .mv-scroll drives the active movement. */
  function initScrollTie() {
    var scrollEl = document.getElementById('mvScroll');
    if (!scrollEl) return;

    if (reduce || isStacked()) { select(0); setBars(0, 1); return; }

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        if (isStacked()) { ticking = false; return; }
        var r = scrollEl.getBoundingClientRect();
        var total = r.height - window.innerHeight;
        var p = total > 0 ? (-r.top) / total : 0;
        p = Math.max(0, Math.min(0.9999, p));
        var f = p * MOVEMENTS.length;
        var idx = Math.min(MOVEMENTS.length - 1, Math.floor(f));
        setBars(idx, f - idx);
        select(idx);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  function goToMovement(i) {
    var scrollEl = document.getElementById('mvScroll');
    if (!scrollEl || reduce || isStacked()) { select(i); setBars(i, 1); return; }
    var r = scrollEl.getBoundingClientRect();
    var top = r.top + window.scrollY;
    var total = r.height - window.innerHeight;
    var target = (i + 0.5) / MOVEMENTS.length;
    window.scrollTo({ top: top + target * total, behavior: 'smooth' });
  }

  function initMovements() {
    if (!document.getElementById('mvScroll')) return;
    buildMandala();
    buildRail();
    select(0);
    setBars(0, 0);
    initScrollTie();
  }

  /* ===================================================================
     REVEAL ON SCROLL
     =================================================================== */
  function initReveal() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    if (reduce || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(els, function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(els, function (el) { io.observe(el); });
  }

  /* ===================================================================
     INIT
     =================================================================== */
  function init() {
    initTheme();
    initNav();
    initMovements();
    initReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
