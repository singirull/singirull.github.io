let lastX = 0;
let lastY = 0;
let lastTime = 0;
let initialized = false;

function handleMove(x, y) {
  const now = Date.now();

  if (!initialized) {
    lastX = x;
    lastY = y;
    lastTime = now;
    initialized = true;
    return;
  }

  const dx = x - lastX;
  const dy = y - lastY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > 5 && now - lastTime > 50) {
    createHeart(x, y);
    lastX = x;
    lastY = y;
    lastTime = now;
  }
}

document.addEventListener('mousemove', (e) => {
  handleMove(e.clientX, e.clientY);
});

document.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  if (touch) {
    handleMove(touch.clientX, touch.clientY);
  }
}, { passive: true });

function burstHearts(x, y) {
  const count = 8;
  for (let i = 0; i < count; i++) {
    createBurstHeart(x, y);
  }
}

document.addEventListener('click', (e) => {
  burstHearts(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if (touch) {
    burstHearts(touch.clientX, touch.clientY);
  }
}, { passive: true });

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  const size = Math.random() * 10 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.transform = `rotate(45deg) scale(${size / 15})`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1000);
}

function createBurstHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  const size = Math.random() * 10 + 10;
  const angle = Math.random() * 2 * Math.PI;
  const speed = Math.random() * 40 + 20;

  const dx = Math.cos(angle) * speed;
  const dy = Math.sin(angle) * speed;

  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  heart.animate(
    [
      {
        transform: `translate(0, 0) scale(${size / 15}) rotate(45deg)`,
        opacity: 1,
      },
      {
        transform: `translate(${dx}px, ${dy - 50}px) scale(${size / 15}) rotate(45deg)`,
        opacity: 0,
      },
    ],
    {
      duration: 1000,
      easing: 'ease-out',
      fill: 'forwards',
    }
  );

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}
