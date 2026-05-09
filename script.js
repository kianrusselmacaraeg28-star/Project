// ── Cursor ──
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursor.style.left = mx + 'px';
  cursor.style.top  = my + 'px';
});

// Smooth ring follow
(function followRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(followRing);
})();

// Scale on hoverable elements
document.querySelectorAll('a, button, .chip, .project-row').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(2)';
    ring.style.width  = '48px';
    ring.style.height = '48px';
    ring.style.opacity = '0.25';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%,-50%) scale(1)';
    ring.style.width  = '32px';
    ring.style.height = '32px';
    ring.style.opacity = '0.5';
  });
});

// ── Nav scroll ──
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// ── Project rows — click to reveal links ──
document.querySelectorAll('.project-row').forEach(row => {
  row.addEventListener('click', () => {
    const links = row.querySelector('.proj-links');
    const isOpen = links.style.display !== 'none';
    // close all
    document.querySelectorAll('.project-row .proj-links').forEach(l => l.style.display = 'none');
    document.querySelectorAll('.project-row').forEach(r => r.classList.remove('open'));
    if (!isOpen) {
      links.style.display = 'flex';
      row.classList.add('open');
    }
  });
});
