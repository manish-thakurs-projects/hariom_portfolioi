const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');
const nav = document.querySelector('nav');
const mobileMenu = document.getElementById('mobile-menu');
const projectCards = document.querySelectorAll('.project-card');
const glassEffects = document.querySelectorAll('.glass-effect');

function applyDarkTheme() {
  body.classList.add('dark-theme');
  nav.classList.add('dark-theme');
  mobileMenu.classList.add('dark-theme');
  projectCards.forEach(card => card.classList.add('dark-theme'));
  glassEffects.forEach(effect => effect.classList.add('dark-theme'));
  themeIcon.classList.replace('fa-moon', 'fa-sun');
  localStorage.setItem('theme', 'dark');
}

function applyLightTheme() {
  body.classList.remove('dark-theme');
  nav.classList.remove('dark-theme');
  mobileMenu.classList.remove('dark-theme');
  projectCards.forEach(card => card.classList.remove('dark-theme'));
  glassEffects.forEach(effect => effect.classList.remove('dark-theme'));
  themeIcon.classList.replace('fa-sun', 'fa-moon');
  localStorage.setItem('theme', 'light');
}

if (localStorage.getItem('theme') === 'dark') {
  applyDarkTheme();
}

themeToggle.addEventListener('click', () => {
  if (body.classList.contains('dark-theme')) {
    applyLightTheme();
  } else {
    applyDarkTheme();
  }
});

const menuToggle = document.getElementById('menu-toggle');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
  mobileMenu.classList.toggle('active');
  menuToggle.classList.toggle('active');

  if (mobileMenu.classList.contains('active')) {
    const menuItems = [...mobileMenu.querySelectorAll('a')];
    menuItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 100}ms`;
      item.classList.add('menu-item-popup');
    });
  } else {
    [...mobileMenu.querySelectorAll('a')].forEach(link => {
      link.classList.remove('menu-item-popup');
    });
  }
});

const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
  threshold: 0,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const typewriterElement = document.querySelector('.typewriter');
const textToType = "Hi, I'm Hariom Sah";
let i = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
  const currentText = textToType.substring(0, i);
  typewriterElement.textContent = currentText;

  if (!isDeleting && i === textToType.length) {
    setTimeout(() => {
      typewriterElement.classList.add('complete');
    }, 1000);
    return;
  }

  if (!isDeleting) {
    i++;
    typingSpeed = 100 + Math.random() * 50;
  }

  setTimeout(typeWriter, typingSpeed);
}

setTimeout(typeWriter, 500);

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = sectionId;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (link.getAttribute('href').startsWith('#')) {
      e.preventDefault();

      if (link.classList.contains('home-link')) {
        link.classList.add('neon-click-blue');
      } else if (link.classList.contains('about-link')) {
        link.classList.add('neon-click-green');
      } else if (link.classList.contains('skills-link')) {
        link.classList.add('neon-click-yellow');
      } else if (link.classList.contains('projects-link')) {
        link.classList.add('neon-click-purple');
      } else if (link.classList.contains('contact-link')) {
        link.classList.add('neon-click-pink');
      }

      setTimeout(() => {
        link.classList.remove('neon-click-blue', 'neon-click-green', 'neon-click-yellow', 'neon-click-purple', 'neon-click-pink');
      }, 1000);

      const targetId = link.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log('Form submitted:', { name, email, subject, message });

    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const homeImageContainer = document.getElementById('homeImageContainer');
  const homeImage = document.getElementById('homeImage');

  homeImageContainer.addEventListener('click', () => {
    homeImage.classList.toggle('flipped');
  });
});

function toggleSkillCard(clickedCard) {
  const skillCards = document.querySelectorAll('.skill-card');
  skillCards.forEach(card => {
    if (card !== clickedCard && card.classList.contains('flipped')) {
      card.classList.remove('flipped');
    }
  });
  clickedCard.classList.toggle('flipped');
}

(function() {
  function closeAllCards() {
    document.querySelectorAll('.skill-card').forEach(card => {
      card.classList.remove('flipped');
    });
  }
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.skill-card')) {
      closeAllCards();
    }
  });
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(closeAllCards, 100);
  });
})();

const imageGallery = document.querySelector('.image-gallery');
const galleryItems = document.querySelectorAll('.image-gallery img');
const itemCount = galleryItems.length;
const itemWidth = 250;
const totalWidth = itemWidth * itemCount;

const firstHalf = Array.from(galleryItems).slice(0, Math.floor(itemCount / 2));
firstHalf.forEach(item => {
  const clone = item.cloneNode(true);
  imageGallery.appendChild(clone);
});

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

document.addEventListener('DOMContentLoaded', function () {
  const sections = [
    { id: 'about', lastAnimated: 0 },
    { id: 'skills', lastAnimated: 0 },
    { id: 'projects', lastAnimated: 0 },
    { id: 'contact', lastAnimated: 0 }
  ].map(item => ({
    ...item,
    element: document.getElementById(item.id),
    reset: function () { this.lastAnimated = 0; }
  })).filter(item => item.element);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const now = Date.now();
      const section = sections.find(s => s.element === entry.target);
      if (!section || (now - section.lastAnimated < 5000)) return;

      if (entry.isIntersecting) {
        entry.target.style.animation = 'none';
        void entry.target.offsetHeight;
        entry.target.style.animation = null;

        entry.target.classList.add('section-popup');
        section.lastAnimated = now;

        setTimeout(() => {
          entry.target.classList.remove('section-popup');
        }, 1500);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -150px 0px'
  });

  sections.forEach(section => observer.observe(section.element));

  document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').substring(1);
      const section = sections.find(s => s.id === targetId);
      if (!section) return;

      section.element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        section.element.style.animation = 'none';
        void section.element.offsetHeight;
        section.element.style.animation = null;
        section.element.classList.add('section-popup');

        setTimeout(() => {
          section.element.classList.remove('section-popup');
        }, 1500);
      }, 800);
    });
  });

  setInterval(() => sections.forEach(s => s.reset()), 5000);
});