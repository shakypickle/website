/* ============================================
   Elias Thorne Counseling — Scripts
   ============================================ */

(function () {
  'use strict';

  // --- Nav scroll effect ---
  const nav = document.getElementById('nav');

  function updateNav() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // --- Mobile menu toggle ---
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  toggle.addEventListener('click', function () {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  links.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Scroll-triggered fade-in ---
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var targets = document.querySelectorAll(
      '.specialty-card, .sidebar-card, .contact-form-wrap, ' +
      '.about-text, .about-photo, .approach-text, .faq-item'
    );

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Contact form handling (GitHub Pages fallback) ---
  var form = document.getElementById('contact-form');

  form.addEventListener('submit', function (e) {
    var action = form.getAttribute('action');

    // If Formspree isn't configured, prevent submission and show message
    if (!action || action.includes('your-form-id')) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.textContent = 'Please set up Formspree first';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 3000);
    }
  });

  // --- Active nav link highlighting ---
  var sections = document.querySelectorAll('.section, .hero');
  var navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

  function highlightNav() {
    var scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      var id = section.getAttribute('id');
      if (!id) return;

      var top = section.offsetTop;
      var height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          var isMatch = link.getAttribute('href') === '#' + id;
          link.style.color = isMatch ? 'var(--color-heading)' : '';
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
})();
