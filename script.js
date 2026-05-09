<<<<<<< HEAD
// ══════════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════════
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
=======
/* ═══════════════════════════════════════════════
   INTERACTIVE JAVASCRIPT — BLACK + GLASS PORTFOLIO
   ═══════════════════════════════════════════════ */

// ══════════════════════════════
// 1. CUSTOM CURSOR
// ══════════════════════════════
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

<<<<<<< HEAD
function lerp(a, b, n) { return (1 - n) * a + n * b; }
(function animateCursor() {
=======
// Smooth follower with lerp
function lerp(a, b, n) { return (1 - n) * a + n * b; }
function animateCursor() {
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
  followerX = lerp(followerX, mouseX, 0.1);
  followerY = lerp(followerY, mouseY, 0.1);
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateCursor);
<<<<<<< HEAD
})();

document.querySelectorAll('a, button, .skill-glass, .project-glass, .cert-glass, .stat-glass, .info-glass, .contact-item, .soc-btn, .activity-glass, .interest-pill').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('hovered'); follower.classList.add('hovered'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('hovered'); follower.classList.remove('hovered'); });
=======
}
animateCursor();

// Grow cursor on hover
const hoverTargets = document.querySelectorAll('a, button, .skill-glass, .project-glass, .stat-glass, .info-glass, .contact-item, .soc-btn');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('hovered');
    follower.classList.add('hovered');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hovered');
    follower.classList.remove('hovered');
  });
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
});

// ══════════════════════════════
// 2. PARTICLE CANVAS
// ══════════════════════════════
const canvas = document.getElementById('particleCanvas');
<<<<<<< HEAD
const ctx    = canvas.getContext('2d');
let particles = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
=======
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
<<<<<<< HEAD
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
=======
    this.size = Math.random() * 1.2 + 0.2;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.4 + 0.05;
    this.opacityDir = (Math.random() - 0.5) * 0.004;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity += this.opacityDir;
    if (this.opacity < 0.02 || this.opacity > 0.5) this.opacityDir *= -1;
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
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

<<<<<<< HEAD
=======
// Draw connections between nearby particles
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
<<<<<<< HEAD
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${0.04*(1-d/120)})`;
=======
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 120)})`;
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

<<<<<<< HEAD
(function animateParticles() {
=======
function animateParticles() {
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
<<<<<<< HEAD
})();
=======
}
animateParticles();
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be

// ══════════════════════════════
// 3. NAVBAR SCROLL
// ══════════════════════════════
const navbar = document.getElementById('navbar');
<<<<<<< HEAD
window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60));

// ══════════════════════════════
// 4. HAMBURGER MENU
=======
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ══════════════════════════════
// 4. HAMBURGER MOBILE MENU
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
// ══════════════════════════════
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
<<<<<<< HEAD
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
=======
  navLinks.style.display    = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position   = 'absolute';
  navLinks.style.top        = '70px';
  navLinks.style.left       = '0';
  navLinks.style.right      = '0';
  navLinks.style.background = 'rgba(0,0,0,0.95)';
  navLinks.style.backdropFilter = 'blur(32px)';
  navLinks.style.padding    = '24px 32px';
  navLinks.style.gap        = '24px';
  navLinks.style.borderTop  = '1px solid rgba(255,255,255,0.08)';
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
});

// ══════════════════════════════
// 5. SMOOTH SCROLL
// ══════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(link => {
<<<<<<< HEAD
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.scrollIntoView({ behavior: 'smooth' }); navLinks.style.display = 'none'; }
=======
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks.style.display = 'none';
    }
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
  });
});

// ══════════════════════════════
// 6. SCROLL REVEAL
// ══════════════════════════════
<<<<<<< HEAD
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
=======
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ══════════════════════════════
// 7. ANIMATED COUNTERS
// ══════════════════════════════
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 1800;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = Math.floor(current);
    if (current >= target) clearInterval(timer);
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.metric-num, .stat-n').forEach(el => {
  counterObserver.observe(el);
});
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be

// ══════════════════════════════
// 8. SKILL BAR ANIMATION
// ══════════════════════════════
<<<<<<< HEAD
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target.querySelector('.skill-bar');
      if (bar) setTimeout(() => bar.style.width = bar.dataset.width + '%', 200);
      barObs.unobserve(e.target);
=======
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target.querySelector('.skill-bar');
      if (bar) {
        setTimeout(() => {
          bar.style.width = bar.dataset.width + '%';
        }, 200);
      }
      barObserver.unobserve(entry.target);
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
    }
  });
}, { threshold: 0.3 });

<<<<<<< HEAD
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
=======
document.querySelectorAll('.skill-glass').forEach(el => {
  barObserver.observe(el);
});

// ══════════════════════════════
// 9. TILT EFFECT ON PROJECT CARDS
// ══════════════════════════════
document.querySelectorAll('.project-glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
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
<<<<<<< HEAD
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width  / 2;
    const y = e.clientY - r.top  - r.height / 2;
=======
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
    btn.style.transition = 'transform 0.4s ease';
    setTimeout(() => btn.style.transition = '', 400);
  });
});

// ══════════════════════════════
<<<<<<< HEAD
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
=======
// 11. CONTACT FORM
// ══════════════════════════════
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
    e.preventDefault();
    const btn     = contactForm.querySelector('.btn-submit');
    const btnText = document.getElementById('btnText');
    const btnIcon = document.getElementById('btnIcon');
<<<<<<< HEAD
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
=======

    // Loading state
    btnText.textContent = 'Sending...';
    btnIcon.className   = 'fa-solid fa-circle-notch fa-spin';
    btn.disabled = true;

    setTimeout(() => {
      btnText.textContent = 'Message Sent!';
      btnIcon.className   = 'fa-solid fa-check';
      btn.style.background = 'rgba(74,222,128,0.1)';
      btn.style.borderColor = 'rgba(74,222,128,0.3)';
      contactForm.reset();

      setTimeout(() => {
        btnText.textContent = 'Send Message';
        btnIcon.className   = 'fa-solid fa-paper-plane';
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
      }, 3000);
    }, 1800);
  });
}

// ══════════════════════════════
<<<<<<< HEAD
// 13. PAGE LOAD FADE IN
=======
// 12. GLASS CARD SPOTLIGHT
// Tracks mouse and creates a glowing spotlight on each card
// ══════════════════════════════
document.querySelectorAll('.glass-card, .skill-glass, .project-glass, .info-glass, .stat-glass').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%,
        rgba(255,255,255,0.06) 0%,
        rgba(255,255,255,0.03) 40%,
        rgba(255,255,255,0.01) 100%)
    `;
  });
  card.addEventListener('mouseleave', () => {
    card.style.background = '';
  });
});

// ══════════════════════════════
// 13. PAGE LOAD — STAGGER HERO
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
// ══════════════════════════════
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease';
<<<<<<< HEAD
  setTimeout(() => document.body.style.opacity = '1', 50);
});
=======
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});
>>>>>>> 74482cb14c6b62527a3643f845d8e600aa60f9be
