/* C.Lab — interactions. Minimal, respectful of reduced motion. */
(function () {
  'use strict';

  const nav = document.getElementById('site-nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Nav scroll state ----
  let ticking = false;
  function updateNavState() {
    if (!nav) return;
    const scrolled = window.scrollY > 24;
    nav.classList.toggle('nav--scrolled', scrolled);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNavState);
      ticking = true;
    }
  }, { passive: true });
  updateNavState();

  // ---- Mobile menu ----
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Reveal on scroll ----
  const revealables = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealables.forEach(function (el) { io.observe(el); });
  }

  // ---- Mark active nav link ----
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === path || (path === 'index.html' && href === '/')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  // ---- Logo pull effect — hole follows the pointer, pupil a little more ----
  if (!reduceMotion && window.matchMedia('(pointer: fine)').matches) {
    const marks = document.querySelectorAll('.nav__mark');
    if (marks.length) {
      const RADIUS = 260;   // distance from mark where the pull begins
      const MAX_PULL = 5;   // max px of "pull" at zero distance
      let rafId = null;
      let lastX = 0, lastY = 0;

      function update() {
        marks.forEach(function (mark) {
          const rect = mark.getBoundingClientRect();
          // skip offscreen marks
          if (rect.bottom < 0 || rect.top > window.innerHeight) return;
          const cx = rect.left + rect.width / 2;
          const cy = rect.top + rect.height / 2;
          const dx = lastX - cx;
          const dy = lastY - cy;
          const dist = Math.hypot(dx, dy);
          if (dist > RADIUS) {
            mark.style.setProperty('--mx', '0px');
            mark.style.setProperty('--my', '0px');
            return;
          }
          const factor = (1 - dist / RADIUS) * MAX_PULL;
          const ux = dist ? dx / dist : 0;
          const uy = dist ? dy / dist : 0;
          mark.style.setProperty('--mx', (ux * factor).toFixed(2) + 'px');
          mark.style.setProperty('--my', (uy * factor).toFixed(2) + 'px');
        });
        rafId = null;
      }

      window.addEventListener('pointermove', function (e) {
        lastX = e.clientX;
        lastY = e.clientY;
        if (rafId == null) rafId = window.requestAnimationFrame(update);
      }, { passive: true });

      document.addEventListener('pointerleave', function () {
        marks.forEach(function (mark) {
          mark.style.setProperty('--mx', '0px');
          mark.style.setProperty('--my', '0px');
        });
      });
    }
  }
})();
