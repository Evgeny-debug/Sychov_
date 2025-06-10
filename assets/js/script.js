function closeIntro() {
  document.getElementById('introOverlay').style.display = 'none';
}

function toggleMenu() {
  const nav = document.getElementById('navMenu');
  nav.classList.toggle('show');
}

// Магнитный эффект при наведении
const magneticHover = (selector) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
};

magneticHover('.btn');
magneticHover('.logo');

// Виброотклик вместо звука клика
const addHapticFeedback = (selector) => {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('click', () => {
      if (navigator.vibrate) {
        navigator.vibrate(30); // лёгкая вибрация
      }
    });
  });
};

addHapticFeedback('.btn');
addHapticFeedback('nav a');

addClickSound('.btn');
addClickSound('nav a');

// Печатающийся текст: только "BlackTrace", иконка отдельно
const typingEffect = (el, text, speed = 60) => {
  let i = 0;
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.textContent = '|';
  el.textContent = '';
  el.appendChild(cursor);

  const type = () => {
    if (i < text.length) {
      cursor.insertAdjacentText('beforebegin', text.charAt(i));
      i++;
      setTimeout(type, speed);
    } else {
      cursor.remove();
    }
  };
  type();
};

document.addEventListener('DOMContentLoaded', () => {
  // Создание адаптивной кнопки Telegram
  const telegramBtn = document.createElement('a');
  telegramBtn.href = 't.me/vanek_nikolaev';
  telegramBtn.className = 'floating-telegram-btn';
  telegramBtn.innerHTML = '📨 Заказать в Telegram';
  document.body.appendChild(telegramBtn);
  const title = document.querySelector('.title');
  const icon = document.createElement('span');
  icon.textContent = '👁‍🗨';
  icon.style.marginRight = '8px';

  const textContainer = document.createElement('span');
  title.textContent = '';
  title.appendChild(icon);
  title.appendChild(textContainer);

  typingEffect(textContainer, 'BlackTrace');

  // Анимированные частицы фона
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let particles = [];
  const mouse = { x: null, y: null };

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      dx: (Math.random() - 0.5) * 1,
      dy: (Math.random() - 0.5) * 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    for (let p of particles) {
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= dx * 0.01;
        p.y -= dy * 0.01;
      }
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  draw();

  // Анимация логотипа
  const logo = document.querySelector('.logo');
  logo.classList.add('animated-logo');
});
