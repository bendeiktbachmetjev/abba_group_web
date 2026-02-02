// Initialize simple interactive behavior for Abba Group MB landing

// Handle mobile navigation toggle
const nav = document.querySelector('.nav');
const navToggle = document.querySelector('.nav-toggle');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains('nav-link')) {
      nav.classList.remove('open');
    }
  });
}

// Smooth scroll for in-page navigation links (if any anchors exist on current page)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const target = event.currentTarget;
    if (!(target instanceof HTMLAnchorElement)) return;

    const href = target.getAttribute('href');
    if (!href || href === '#') return;

    const element = document.querySelector(href);
    if (!element) return;

    event.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Set current year in footer
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

