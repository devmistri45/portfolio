// ═══════════════════════════════════════
//  script.js — Dev Mistri Portfolio
// ═══════════════════════════════════════

// 1. CUSTOM CURSOR
const cursor   = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
let mX=0,mY=0,fX=0,fY=0;
document.addEventListener('mousemove',e=>{mX=e.clientX;mY=e.clientY;cursor.style.left=mX+'px';cursor.style.top=mY+'px';});
function lerp(a,b,n){return(1-n)*a+n*b;}
(function anim(){fX=lerp(fX,mX,0.1);fY=lerp(fY,mY,0.1);follower.style.left=fX+'px';follower.style.top=fY+'px';requestAnimationFrame(anim);})();
document.querySelectorAll('a,button,.skill-glass,.project-glass,.cert-glass,.stat-glass,.info-glass,.activity-glass,.interest-pill,.soc-btn,.float-badge,.metric-link,.tag').forEach(el=>{
  el.addEventListener('mouseenter',()=>{cursor.classList.add('hovered');follower.classList.add('hovered');});
  el.addEventListener('mouseleave',()=>{cursor.classList.remove('hovered');follower.classList.remove('hovered');});
});

// 2. PARTICLE CANVAS
const canvas=document.getElementById('particleCanvas');
const ctx=canvas.getContext('2d');
let particles=[];
function resizeCanvas(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
resizeCanvas();
window.addEventListener('resize',()=>{resizeCanvas();initParticles();});
class Particle{
  constructor(){this.reset();}
  reset(){this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;this.size=Math.random()*1.2+0.2;this.speedX=(Math.random()-0.5)*0.3;this.speedY=(Math.random()-0.5)*0.3;this.opacity=Math.random()*0.4+0.05;this.opDir=(Math.random()-0.5)*0.004;}
  update(){this.x+=this.speedX;this.y+=this.speedY;this.opacity+=this.opDir;if(this.opacity<0.02||this.opacity>0.5)this.opDir*=-1;if(this.x<0||this.x>canvas.width||this.y<0||this.y>canvas.height)this.reset();}
  draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.size,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${this.opacity})`;ctx.fill();}
}
function initParticles(){particles=[];const c=Math.floor((canvas.width*canvas.height)/12000);for(let i=0;i<c;i++)particles.push(new Particle());}
initParticles();
function drawConnections(){for(let i=0;i<particles.length;i++){for(let j=i+1;j<particles.length;j++){const dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(255,255,255,${0.04*(1-d/120)})`;ctx.lineWidth=0.5;ctx.stroke();}}}}
(function animP(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});drawConnections();requestAnimationFrame(animP);})();

// 3. NAVBAR
const navbar=document.getElementById('navbar');
window.addEventListener('scroll',()=>navbar.classList.toggle('scrolled',window.scrollY>60));

// 4. HAMBURGER
const hamburger=document.getElementById('hamburger');
const navLinks=document.getElementById('navLinks');
hamburger.addEventListener('click',()=>{
  const open=navLinks.style.display==='flex';
  Object.assign(navLinks.style,{display:open?'none':'flex',flexDirection:'column',position:'absolute',top:'70px',left:'0',right:'0',background:'rgba(0,0,0,0.97)',backdropFilter:'blur(32px)',padding:'24px 32px',gap:'24px',borderTop:'1px solid rgba(255,255,255,0.08)',zIndex:'99'});
});

// 5. SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click',e=>{
    const href=link.getAttribute('href');
    if(href==='#')return;
    e.preventDefault();
    const t=document.querySelector(href);
    if(t){t.scrollIntoView({behavior:'smooth'});navLinks.style.display='none';}
  });
});

// 6. SCROLL REVEAL
const revObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('revealed');});},{threshold:0.1});
document.querySelectorAll('.reveal-up,.reveal-left,.reveal-right').forEach(el=>revObs.observe(el));

// 7. COUNTER ANIMATION
function animCounter(el){
  const target=parseInt(el.dataset.target);if(!target)return;
  const step=target/(1800/16);let cur=0;
  const t=setInterval(()=>{cur=Math.min(cur+step,target);el.textContent=Math.floor(cur);if(cur>=target)clearInterval(t);},16);
}
const cntObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){animCounter(e.target);cntObs.unobserve(e.target);}});},{threshold:0.5});
document.querySelectorAll('.metric-num,.stat-n').forEach(el=>cntObs.observe(el));

// 8. SKILL BARS
const barObs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){const b=e.target.querySelector('.skill-bar');if(b)setTimeout(()=>b.style.width=b.dataset.width+'%',200);barObs.unobserve(e.target);}});},{threshold:0.3});
document.querySelectorAll('.skill-glass').forEach(el=>barObs.observe(el));

// 9. PROJECT TILT
document.querySelectorAll('.project-glass').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const rx=((e.clientY-r.top)/r.height-0.5)*-10;const ry=((e.clientX-r.left)/r.width-0.5)*10;card.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;});
  card.addEventListener('mouseleave',()=>{card.style.transform='';card.style.transition='transform 0.5s ease';setTimeout(()=>card.style.transition='',500);});
});

// 10. MAGNETIC BUTTONS
document.querySelectorAll('.btn-glass,.btn-ghost-pure,.soc-btn,.footer-soc').forEach(btn=>{
  btn.addEventListener('mousemove',e=>{const r=btn.getBoundingClientRect();const x=e.clientX-r.left-r.width/2;const y=e.clientY-r.top-r.height/2;btn.style.transform=`translate(${x*0.18}px,${y*0.18}px)`;});
  btn.addEventListener('mouseleave',()=>{btn.style.transform='';btn.style.transition='transform 0.4s ease';setTimeout(()=>btn.style.transition='',400);});
});

// 11. GLASS SPOTLIGHT
document.querySelectorAll('.glass-card,.skill-glass,.project-glass,.cert-glass,.info-glass,.stat-glass,.activity-glass').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();const x=((e.clientX-r.left)/r.width)*100;const y=((e.clientY-r.top)/r.height)*100;card.style.background=`radial-gradient(circle at ${x}% ${y}%,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.03) 40%,rgba(255,255,255,0.01) 100%)`;});
  card.addEventListener('mouseleave',()=>card.style.background='');
});

// 12. CONTACT FORM
const contactForm=document.getElementById('contactForm');
const formStatus=document.getElementById('formStatus');
function showStatus(type,msg){if(!formStatus)return;formStatus.textContent=msg;formStatus.className=`form-status ${type}`;formStatus.style.display='block';setTimeout(()=>formStatus.style.display='none',7000);}
if(contactForm){
  contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    const hp=document.getElementById('website_url');
    if(hp&&hp.value.trim()!==''){showStatus('success','✅ Message sent!');contactForm.reset();return;}
    const name=document.getElementById('fname').value.trim();
    const email=document.getElementById('femail').value.trim();
    const subject=document.getElementById('fsubject').value.trim();
    const message=document.getElementById('fmsg').value.trim();
    const btn=document.getElementById('submitBtn');
    const btnText=document.getElementById('btnText');
    const btnIcon=document.getElementById('btnIcon');
    if(!name){showStatus('error','⚠️ Please enter your name.');return;}
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){showStatus('error','📧 Please enter a valid email.');return;}
    if(!message||message.length<5){showStatus('error','⚠️ Please enter a message.');return;}
    btnText.textContent='Opening Gmail...';btnIcon.className='fa-solid fa-circle-notch fa-spin';btn.disabled=true;
    const link=`https://mail.google.com/mail/?view=cm&to=devmistri777@gmail.com,dekkworkbase@gmail.com&su=${encodeURIComponent((subject||'Portfolio Inquiry')+' — from '+name)}&body=${encodeURIComponent('From: '+name+'\nReply to: '+email+'\n\n'+message)}`;
    window.open(link,'_blank');
    setTimeout(()=>{btnText.textContent='Gmail Opened! ✓';btnIcon.className='fa-solid fa-check';btn.style.background='rgba(74,222,128,0.1)';btn.style.borderColor='rgba(74,222,128,0.3)';showStatus('success',`✅ Gmail opened! I'll reply to ${email} soon.`);contactForm.reset();setTimeout(()=>{btnText.textContent='Send Message';btnIcon.className='fa-solid fa-paper-plane';btn.style.background='';btn.style.borderColor='';btn.disabled=false;},3500);},800);
  });
}

// 13. PAGE LOAD
window.addEventListener('load',()=>{document.body.style.opacity='0';document.body.style.transition='opacity 0.6s ease';setTimeout(()=>document.body.style.opacity='1',50);});
