// Initialize simple interactive behavior for Abba Group MB landing

// Handle mobile navigation toggle
const nav = document.querySelector('.floating-nav');
const navToggle = document.querySelector('.floating-nav-wrapper .nav-toggle');

if (nav && navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav when clicking a link (mobile)
  nav.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.classList.contains('fnav-link')) {
      nav.classList.remove('open');
    }
  });

  // Highlight active link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.fnav-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
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

// Animated hero text
const animatedWord = document.getElementById('animated-word');
if (animatedWord) {
  const words = ["simplicity", "science", "precision", "clarity", "momentum"];
  let currentIndex = 0;
  
  animatedWord.innerText = words[currentIndex];

  setInterval(() => {
    currentIndex = (currentIndex + 1) % words.length;
    
    // Animate out
    animatedWord.style.transform = "translateY(-120%)";
    animatedWord.style.opacity = "0";
    
    setTimeout(() => {
      // Switch word while invisible
      animatedWord.innerText = words[currentIndex];
      
      // Move to bottom immediately (without transition)
      animatedWord.style.transition = "none";
      animatedWord.style.transform = "translateY(120%)";
      
      // Force reflow
      void animatedWord.offsetWidth;
      
      // Animate in
      animatedWord.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.5s ease";
      animatedWord.style.transform = "translateY(0)";
      animatedWord.style.opacity = "1";
    }, 500); // Wait for animate out to finish
  }, 2500);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Reveal blocks once they scroll into view (Products page)
const revealItems = document.querySelectorAll('[data-reveal]');
if (revealItems.length > 0) {
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
}

// Phone screens cycle while visible (Products page)
document.querySelectorAll('[data-slides]').forEach((show) => {
  const slides = show.querySelectorAll('img');
  if (slides.length < 2) return;

  let current = 0;
  let timer = null;

  const next = () => {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  };

  const start = () => {
    if (timer || reduceMotion.matches) return;
    timer = setInterval(next, 3400);
  };

  const stop = () => {
    clearInterval(timer);
    timer = null;
  };

  if ('IntersectionObserver' in window) {
    new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? start() : stop()));
    }, { threshold: 0.4 }).observe(show);
  } else {
    start();
  }
});

// Gentle depth while scrolling: the phone drifts a little faster than the window
const showcases = document.querySelectorAll('.showcase');
if (showcases.length > 0 && !reduceMotion.matches) {
  let ticking = false;

  const updateShift = () => {
    const viewport = window.innerHeight;
    showcases.forEach((showcase) => {
      const rect = showcase.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewport) return;
      const shift = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      showcase.style.setProperty('--shift', shift.toFixed(3));
    });
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateShift);
      ticking = true;
    }
  }, { passive: true });

  updateShift();
}
