/* =============================================
   SOPHROLOGUE VERNON – main.js
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky header ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Burger menu ── */
  const burger = document.querySelector('.burger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });
    // Fermer sur lien
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }

  /* ── Active nav link ── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── FAQ accordion ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.classList.contains('open');
      // ferme tous
      document.querySelectorAll('.faq-q').forEach(b => {
        b.classList.remove('open');
        const a = b.nextElementSibling;
        if (a) a.classList.remove('open');
      });
      // ouvre si était fermé
      if (!isOpen) {
        btn.classList.add('open');
        const answer = btn.nextElementSibling;
        if (answer) answer.classList.add('open');
      }
    });
  });

  /* ── Smooth reveal on scroll ── */
  const revealEls = document.querySelectorAll('.pain-card, .service-card, .benefit-item, .testimonial-card, .blog-card, .atelier-card, .tarif-card');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = `opacity .5s ease ${i * 0.06}s, transform .5s ease ${i * 0.06}s`;
      io.observe(el);
    });
  }

  /* ── Contact form submit (prevent default / placeholder) ── */
  const form = document.querySelector('.contact-form form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Message envoyé ✓';
        btn.disabled = true;
        btn.style.background = '#2E5E4E';
      }
    });
  }

});
