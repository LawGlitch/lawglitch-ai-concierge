/**
 * LawGlitch Main JavaScript
 * Vanilla ES6+ - No frameworks
 */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initHeroSearch();
  initSmoothScroll();
});

/**
 * Header scroll effects
 */
function initHeader() {
  const header = document.getElementById('header');
  let lastScroll = 0;

  function handleScroll() {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileNav = document.getElementById('nav-mobile');
  const menuIcon = toggleBtn.querySelector('i');

  toggleBtn.addEventListener('click', function() {
    const isOpen = mobileNav.classList.toggle('active');
    menuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close menu when clicking a link
  mobileNav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      menuIcon.className = 'fas fa-bars';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      mobileNav.classList.remove('active');
      menuIcon.className = 'fas fa-bars';
    }
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    animatedElements.forEach(el => el.classList.add('visible'));
  }
}

/**
 * Hero search bar functionality
 */
function initHeroSearch() {
  const searchForm = document.getElementById('hero-search');
  const searchInput = document.getElementById('search-input');
  
  const placeholders = [
    "Ask anything about automation...",
    "How much can I save with AI?",
    "Can AI replace my support team?",
    "What channels do you support?",
    "How fast is implementation?"
  ];
  
  let placeholderIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typePlaceholder() {
    const currentPlaceholder = placeholders[placeholderIndex];
    
    if (isDeleting) {
      searchInput.placeholder = currentPlaceholder.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      searchInput.placeholder = currentPlaceholder.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPlaceholder.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      placeholderIndex = (placeholderIndex + 1) % placeholders.length;
      typingSpeed = 500; // Pause before next
    }

    setTimeout(typePlaceholder, typingSpeed);
  }

  typePlaceholder();

  // Handle form submit
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    openChatWidget();
    
    // If user typed something, add it as a message
    const query = searchInput.value.trim();
    if (query) {
      // Add user message (handled by chatbot.js)
      if (typeof addUserMessage === 'function') {
        addUserMessage(query);
      }
      searchInput.value = '';
    }
  });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = document.getElementById('header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Animate number counter
 */
function animateNumber(element, target, duration = 1000, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
    const current = Math.round(start + (target - start) * eased);
    
    element.textContent = prefix + formatNumber(current) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}
