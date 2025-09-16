// Animación de partículas de fondo (estrellas/luces)
const canvas = document.getElementById('particles-bg');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createParticles() {
  particles = [];
  const count = Math.floor(window.innerWidth / 8);
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.7,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.7 ? '#FFD700' : (Math.random() > 0.5 ? '#E10600' : '#fff'),
      glow: Math.random() > 0.5
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles);

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const p of particles) {
    ctx.save();
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.glow ? p.color : '#000';
    ctx.shadowBlur = p.glow ? 16 : 0;
    ctx.fill();
    ctx.restore();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Temporizador de oferta especial
function startCountdown(duration, display) {
  let timer = duration, minutes, seconds;
  function update() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    display.textContent = `Finaliza en: ${minutes}:${seconds}`;
    if (--timer < 0) {
      display.textContent = "¡Oferta finalizada!";
    } else {
      setTimeout(update, 1000);
    }
  }
  update();
}
window.addEventListener('DOMContentLoaded', () => {
  const countdown = document.getElementById('countdown');
  if (countdown) {
    startCountdown(60 * 15, countdown); // 15 minutos
  }
});

// Scroll suave a CTA
const ctaMain = document.getElementById('cta-main');
const ctaOffer = document.getElementById('cta-offer');
if (ctaMain && ctaOffer) {
  ctaMain.addEventListener('click', () => {
    ctaOffer.scrollIntoView({ behavior: 'smooth' });
  });
  ctaOffer.addEventListener('click', () => {
    window.open('https://wa.me/5491123456789', '_blank');
  });
}

// Newsletter (simulado)
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = this.querySelector('input[type="email"]');
  input.value = '';
  this.querySelector('button').textContent = '¡Listo!';
  setTimeout(() => {
    this.querySelector('button').textContent = 'Suscribirme';
  }, 2000);
});
