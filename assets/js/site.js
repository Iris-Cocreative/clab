/* ==========================================================================
   C.Lab — site behaviour
   Three things only: the mobile nav, the offerings filter, and the reveal.
   No dependencies.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var panel = document.querySelector('[data-nav-panel]');

  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      var open = panel.getAttribute('data-open') === 'true';
      panel.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
      toggle.textContent = !open ? 'Close' : 'Menu';
    });

    // Close the panel after following an in-page link.
    panel.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        panel.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.textContent = 'Menu';
      }
    });
  }

  /* ---------------------------------------------------------------
     Offerings filter
     Tabs carry data-filter; cards carry data-track (space separated).
     --------------------------------------------------------------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-filter]'));
  var cards = Array.prototype.slice.call(document.querySelectorAll('[data-track]'));

  if (tabs.length && cards.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var want = tab.getAttribute('data-filter');

        tabs.forEach(function (t) {
          t.setAttribute('aria-selected', String(t === tab));
        });

        cards.forEach(function (card) {
          var tracks = (card.getAttribute('data-track') || '').split(/\s+/);
          var show = want === 'all' || tracks.indexOf(want) !== -1;
          card.hidden = !show;
        });
      });
    });
  }

  /* ---------------------------------------------------------------
     Reveal on scroll
     Progressive enhancement: without IntersectionObserver, or with
     reduced motion requested, everything is simply visible.
     --------------------------------------------------------------- */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (!targets.length) return;

  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.06 });

  targets.forEach(function (el) { io.observe(el); });
})();
