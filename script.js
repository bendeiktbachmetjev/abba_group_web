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

// Animated hero text
const animatedWord = document.getElementById('animated-word');
if (animatedWord) {
  const words = ["smart", "seamless", "innovative", "precise", "secure"];
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
