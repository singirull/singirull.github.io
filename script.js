let lastX = 0;
let lastY = 0;
let lastTime = 0;

document.addEventListener('mousemove', function(e) {
  const now = Date.now();
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Only create a heart if mouse moved enough and time passed
  if (dist > 5 && now - lastTime > 50) {
    createHeart(e.clientX, e.clientY);
    lastX = e.clientX;
    lastY = e.clientY;
    lastTime = now;
  }
});

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  // Optional: add some random size and rotation
  const size = Math.random() * 10 + 10;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  heart.style.transform = `rotate(45deg) scale(${size / 15})`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 1000);
}
