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
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Cookie consent banner
(function() {
  if (localStorage.getItem('ta_cookie_ok')) return;
  const banner = document.createElement('div');
  banner.id = 'cookieBanner';
  banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(26,15,10,0.97);border-top:1px solid rgba(196,135,90,0.35);padding:18px 24px;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;backdrop-filter:blur(10px);';
  banner.innerHTML = `
    <p style="font-size:13px;color:rgba(232,213,183,0.85);line-height:1.6;max-width:700px;margin:0;">
      На нашем сайте используются cookie-файлы, в том числе сервис веб-аналитики Яндекс.Метрика. Используя сайт, вы соглашаетесь на обработку персональных данных при помощи cookie-файлов. Подробнее —
      <a href="${window.location.pathname.includes('/destinations/') ? '../' : ''}legal.html#privacy" style="color:#C4875A;text-decoration:underline;">Политика обработки персональных данных</a>.
      Если вы не согласны — измените настройки браузера или покиньте сайт.
    </p>
    <button id="cookieAccept" style="background:linear-gradient(135deg,#5C2D1A,#C4875A);color:#fff;border:none;border-radius:10px;padding:11px 28px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;flex-shrink:0;">Принять и продолжить</button>
  `;
  document.body.appendChild(banner);
  document.getElementById('cookieAccept').addEventListener('click', function() {
    localStorage.setItem('ta_cookie_ok', '1');
    banner.remove();
  });
})();

// Skip presenter intro on all jeddah.mp4 usages (first 3s show female presenter)
document.querySelectorAll('video').forEach(vid => {
  const src = vid.querySelector('source[src*="jeddah"]');
  if (src) {
    vid.addEventListener('loadedmetadata', function () {
      if (this.currentTime < 3) this.currentTime = 3;
    });
  }
});

let sliderIndex = {};
function slidePhoto(trackId, dir) {
  const track = document.getElementById(trackId);
  if (!track) return;
  const slides = track.querySelectorAll('img');
  if (sliderIndex[trackId] === undefined) sliderIndex[trackId] = 0;
  sliderIndex[trackId] = (sliderIndex[trackId] + dir + slides.length) % slides.length;
  track.style.transform = 'translateX(-' + (sliderIndex[trackId] * 100) + '%)';
  const dots = track.parentElement.querySelectorAll('.slider-dot');
  dots.forEach(function(d, i) { d.classList.toggle('active', i === sliderIndex[trackId]); });
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.photo-slider').forEach(function(slider) {
    const track = slider.querySelector('.photo-slider__track');
    const dotsContainer = slider.querySelector('.slider-dots');
    if (!track || !dotsContainer) return;
    const slides = track.querySelectorAll('img');
    slides.forEach(function(_, i) {
      const dot = document.createElement('button');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', function() {
        const cur = sliderIndex[track.id] || 0;
        slidePhoto(track.id, i - cur);
      });
      dotsContainer.appendChild(dot);
    });
  });
});

if (window.innerWidth < 768) {
  document.querySelectorAll('.hero__video, .destinations__video').forEach(function(v) {
    v.removeAttribute('autoplay');
    v.setAttribute('preload', 'none');
    v.pause();
  });
}
