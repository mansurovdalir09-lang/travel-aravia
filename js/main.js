// Travel Aravia — main

const header = document.getElementById('header');
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

function toggleSound() {
  const video = document.querySelector('.hero__video');
  const btn = document.getElementById('soundBtn');
  const text = document.getElementById('soundText');
  if (video.muted) {
    video.muted = false;
    text.textContent = 'Выключить звук';
    btn.style.borderColor = 'var(--color-accent)';
  } else {
    video.muted = true;
    text.textContent = 'Включить звук';
    btn.style.borderColor = 'rgba(255,255,255,0.15)';
  }
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});
