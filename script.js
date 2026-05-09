// ══════════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════════
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function lerp(a, b, n) { return (1 - n) * a + n * b; }
(function animateCursor() {
  followerX = lerp(followerX, mouseX, 0.1);
  followerY = lerp(followerY, mouseY, 0.1);
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .skill-glass, .project-glass, .cert-glass, .stat-glass, .info-glass, .contact-item, .soc-btn, .activity-glass, .interest-pill').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
});

// ══════════════════════════════
// 2. PARTICLE CANVAS
// ══════════════════════════════
const canvas = document.getElementById('particleCanvas');
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size    = Math.random() * 1.2 + 0.2;
    this.speedX  = (Math.random() - 0.5) * 0.3;
    this.speedY  = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.opDir   = (Math.random() - 0.5) * 0.004;
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    this.opacity += this.opDir;
    if (this.opacity < 0.02 || this.opacity > 0.5) this.opDir *= -1;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${0.04*(1-d/120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

(function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
})();

// ══════════════════════════════
// 3. NAVBAR SCROLL
// ══════════════════════════════
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// ══════════════════════════════
// 4. HAMBURGER MENU
// ══════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  Object.assign(navLinks.style, {
    display:        open ? 'none' : 'flex',
    flexDirection:  'column',
    position:       'absolute',
    top:            '70px',
    left:           '0',
    right:          '0',
    background:     'rgba(0,0,0,0.96)',
    backdropFilter: 'blur(32px)',
    padding:        '24px 32px',
    gap:            '24px',
    borderTop:      '1px solid rgba(255,255,255,0.08)',
  });
});

// ══════════════════════════════
// 5. SMOOTH SCROLL
// ══════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.scrollIntoView({ behavior: 'smooth' }); navLinks.style.display = 'none'; }
  });
});

// ══════════════════════════════
// 6. SCROLL REVEAL
// ══════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => revealObs.observe(el));

// ══════════════════════════════
// 7. COUNTER ANIMATION
// ══════════════════════════════
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const step   = target / (1800 / 16);
  let current  = 0;
  const t = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(t);
  }, 16);
}

const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-num, .stat-n').forEach(el => counterObs.observe(el));

// ══════════════════════════════
// 8. SKILL BAR ANIMATION
// ══════════════════════════════
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target.querySelector('.skill-bar');
      if (bar) setTimeout(() => bar.style.width = bar.dataset.width + '%', 200);
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.skill-glass').forEach(el => barObs.observe(el));

// ══════════════════════════════
// 9. PROJECT CARD TILT
// ══════════════════════════════
document.querySelectorAll('.project-glass').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top)  / r.height - 0.5) * -10;
    const ry = ((e.clientX - r.left) / r.width  - 0.5) *  10;
    card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
    setTimeout(() => card.style.transition = '', 500);
  });
});

// ══════════════════════════════
// 10. MAGNETIC BUTTONS
// ══════════════════════════════
document.querySelectorAll('.btn-glass, .btn-ghost-pure, .soc-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s ease';
    setTimeout(() => btn.style.transition = '', 400);
  });
});

// ══════════════════════════════
// 11. GLASS SPOTLIGHT
// ══════════════════════════════
document.querySelectorAll('.glass-card, .skill-glass, .project-glass, .cert-glass, .info-glass, .stat-glass').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width)  * 100;
    const y = ((e.clientY - r.top)  / r.height) * 100;
    card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.03) 40%, rgba(255,255,255,0.01) 100%)`;
  });
  card.addEventListener('mouseleave', () => card.style.background = '');
});

// ══════════════════════════════
// 12. CONTACT FORM
// ══════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn     = contactForm.querySelector('.btn-submit');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
    btnText.textContent = 'Sending...';
    btnIcon.className   = 'fa-solid fa-circle-notch fa-spin';
    btn.disabled = true;
    setTimeout(() => {
      btnText.textContent  = 'Message Sent!';
      btnIcon.className    = 'fa-solid fa-check';
      btn.style.background = 'rgba(74,222,128,0.1)';
      btn.style.borderColor = 'rgba(74,222,128,0.3)';
      contactForm.reset();
      setTimeout(() => {
        btnText.textContent  = 'Send Message';
        btnIcon.className    = 'fa-solid fa-paper-plane';
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1800);
  });
}

// ══════════════════════════════
// 13. PAGE LOAD FADE IN
// ══════════════════════════════
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => document.body.style.opacity = '1', 50);
});
