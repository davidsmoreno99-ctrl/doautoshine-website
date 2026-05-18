// DoAutoShine – main.js

// Nav: scroll behaviour + mobile toggle
(function () {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
    nav.classList.toggle('menu-open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
      nav.classList.remove('menu-open');
      document.body.style.overflow = '';
    });
  });
})();

// Smooth active nav link highlight
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav__links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
})();

// Entrance animations on scroll
(function () {
  const els = document.querySelectorAll(
    '.service-card, .addon-item, .gallery-item, .strip__item, .contact-card, .stat'
  );

  const style = document.createElement('style');
  style.textContent = `
    .fade-up { opacity: 0; transform: translateY(28px); transition: opacity 0.55s ease, transform 0.55s ease; }
    .fade-up.visible { opacity: 1; transform: translateY(0); }
  `;
  document.head.appendChild(style);

  els.forEach(el => el.classList.add('fade-up'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => io.observe(el));
})();

// Contact form – opens WhatsApp with details pre-filled
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.querySelector('#name').value.trim();
    const phone   = form.querySelector('#phone').value.trim();
    const service = form.querySelector('#service').value;
    const vehicle = form.querySelector('#vehicle').value.trim();
    const notes   = form.querySelector('#message').value.trim();

    const lines = [
      'Hi DoAutoShine! I\'d like to make a booking.',
      '',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      vehicle ? `Vehicle: ${vehicle}` : null,
      notes   ? `Notes: ${notes}`   : null,
    ].filter(l => l !== null).join('\n');

    const url = `https://wa.me/353892339457?text=${encodeURIComponent(lines)}`;
    window.open(url, '_blank');
  });
})();
