/* =========================================================
   PARTICLE ENGINE: FALLING PETALS, FIREFLIES & SPARKLES
   ========================================================= */

(function () {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initStars();
  });

  // Settings
  const PETAL_COUNT = window.innerWidth < 768 ? 24 : 45;
  const FIREFLY_COUNT = window.innerWidth < 768 ? 20 : 38;
  const STAR_COUNT = window.innerWidth < 768 ? 60 : 120;

  const petals = [];
  const fireflies = [];
  const stars = [];
  const sparkles = [];

  // Wind variable for organic sway
  let wind = 0;
  let windTarget = 0;

  // Star Class
  class Star {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * (height * 0.7);
      this.size = Math.random() * 1.5 + 0.5;
      this.baseAlpha = Math.random() * 0.7 + 0.2;
      this.twinkleSpeed = Math.random() * 0.02 + 0.008;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.phase += this.twinkleSpeed;
    }
    draw() {
      const alpha = this.baseAlpha + Math.sin(this.phase) * 0.3;
      ctx.fillStyle = `rgba(255, 255, 230, ${Math.max(0.1, alpha)})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push(new Star());
    }
  }
  initStars();

  // Petal Class (Yellow Flower Petal)
  class Petal {
    constructor(isBurst = false, originX, originY) {
      this.isBurst = isBurst;
      if (isBurst) {
        this.x = originX || width / 2;
        this.y = originY || height / 2;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 3;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - 2;
        this.gravity = 0.12;
      } else {
        this.reset(true);
      }
    }

    reset(initial = false) {
      this.x = Math.random() * (width + 100) - 50;
      this.y = initial ? Math.random() * height : -30;
      this.size = Math.random() * 10 + 12; // 12px to 22px
      this.vy = Math.random() * 1.2 + 0.8;
      this.vx = Math.random() * 0.8 - 0.4;
      this.rotX = Math.random() * Math.PI * 2;
      this.rotY = Math.random() * Math.PI * 2;
      this.rotZ = Math.random() * Math.PI * 2;
      this.rotSpeedX = Math.random() * 0.03 + 0.01;
      this.rotSpeedY = Math.random() * 0.02 + 0.01;
      this.rotSpeedZ = Math.random() * 0.015 - 0.007;
      this.oscillationSpeed = Math.random() * 0.02 + 0.01;
      this.oscillationDistance = Math.random() * 1.5 + 0.5;
      this.colorIndex = Math.floor(Math.random() * 4);
      this.opacity = Math.random() * 0.35 + 0.65;
    }

    update() {
      if (this.isBurst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
        this.rotZ += 0.05;
        this.opacity -= 0.008;
        return;
      }

      this.rotX += this.rotSpeedX;
      this.rotY += this.rotSpeedY;
      this.rotZ += this.rotSpeedZ;

      this.y += this.vy;
      this.x += Math.sin(this.rotX) * this.oscillationDistance + wind + this.vx;

      // Wrap around edges
      if (this.y > height + 40) {
        this.reset(false);
      }
      if (this.x < -60) this.x = width + 50;
      if (this.x > width + 60) this.x = -50;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotZ);
      ctx.scale(Math.cos(this.rotY), Math.sin(this.rotX));
      ctx.globalAlpha = Math.max(0, this.opacity);

      // Yellow petal color palette
      const colors = [
        ['#ffd700', '#ffb703'],
        ['#ffe066', '#f77f00'],
        ['#ffc300', '#e09f3e'],
        ['#fff3b0', '#f48c06']
      ];
      const pal = colors[this.colorIndex % colors.length];

      const grad = ctx.createLinearGradient(-this.size / 2, -this.size, this.size / 2, this.size);
      grad.addColorStop(0, pal[0]);
      grad.addColorStop(1, pal[1]);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(255, 215, 0, 0.4)';
      ctx.shadowBlur = 6;

      // Draw organic petal curve
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.6, this.size * 0.8, this.size * 0.4, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.4, -this.size * 0.7, -this.size * 0.6, 0, -this.size);
      ctx.fill();

      // Subtle petal vein
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.8);
      ctx.lineTo(0, this.size * 0.7);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Firefly Class (Luciérnagas)
  class Firefly {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2.5 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.pulseSpeed = Math.random() * 0.04 + 0.02;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.phase += this.pulseSpeed;
      this.x += this.vx + Math.sin(this.phase * 0.5) * 0.3;
      this.y += this.vy + Math.cos(this.phase * 0.5) * 0.3;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;
    }
    draw() {
      const alpha = (Math.sin(this.phase) + 1) / 2 * 0.85 + 0.15;
      ctx.save();
      ctx.translate(this.x, this.y);

      // Glow halo
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 4.5);
      grad.addColorStop(0, `rgba(255, 245, 150, ${alpha})`);
      grad.addColorStop(0.3, `rgba(255, 215, 0, ${alpha * 0.6})`);
      grad.addColorStop(1, 'rgba(255, 215, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Bright core
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Interactive Sparkle Trail Class
  class Sparkle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 4 + 2;
      this.color = ['#fff', '#ffd700', '#ffe680', '#ff9e00'][Math.floor(Math.random() * 4)];
      this.vx = (Math.random() - 0.5) * 3;
      this.vy = (Math.random() - 0.5) * 3;
      this.alpha = 1;
      this.decay = Math.random() * 0.03 + 0.02;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.fillStyle = this.color;
      ctx.shadowColor = '#ffd700';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const sunflowers = [];

  // Falling Sunflower Class (Full Sunflower with Petals and Seed Disk)
  class FallingSunflower {
    constructor(originX, originY) {
      this.isBurst = originX !== undefined;
      if (this.isBurst) {
        this.x = originX + (Math.random() - 0.5) * 60;
        this.y = originY + (Math.random() - 0.5) * 30;
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
        const speed = Math.random() * 8 + 4;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.16;
      } else {
        this.x = Math.random() * width;
        this.y = -60 - Math.random() * 250;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = Math.random() * 2 + 1.8;
      }

      this.size = Math.random() * 12 + 20; // 20px to 32px
      this.petals = 12;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.05;
      this.tilt = Math.random() * Math.PI * 2;
      this.tiltSpeed = Math.random() * 0.04 + 0.02;
      this.opacity = 1;
    }

    update() {
      this.rotation += this.rotSpeed;
      this.tilt += this.tiltSpeed;

      if (this.isBurst) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.vx *= 0.98;
      } else {
        this.y += this.vy;
        this.x += this.vx + Math.sin(this.tilt) * 1.2 + wind;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.scale(1, Math.cos(this.tilt) * 0.45 + 0.55); // 3D flutter effect
      ctx.globalAlpha = Math.max(0, this.opacity);

      // Golden Petals around center
      const petalLength = this.size * 0.85;
      const petalWidth = this.size * 0.35;
      ctx.fillStyle = '#ffbe0b';
      ctx.shadowColor = 'rgba(255, 215, 0, 0.6)';
      ctx.shadowBlur = 8;

      for (let i = 0; i < this.petals; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / this.petals) * i);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(petalWidth, -petalLength * 0.55, 0, -petalLength);
        ctx.quadraticCurveTo(-petalWidth, -petalLength * 0.55, 0, 0);
        ctx.fill();
        ctx.restore();
      }

      // Dark golden/brown center seed disk
      ctx.shadowBlur = 0;
      const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 0.38);
      centerGrad.addColorStop(0, '#2d1400');
      centerGrad.addColorStop(0.7, '#4a2500');
      centerGrad.addColorStop(1, '#d97706');
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.38, 0, Math.PI * 2);
      ctx.fill();

      // Seed Ring Texture
      ctx.strokeStyle = '#fcd34d';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 3]);
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.22, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();
    }
  }

  // Populate
  for (let i = 0; i < PETAL_COUNT; i++) petals.push(new Petal(false));
  for (let i = 0; i < FIREFLY_COUNT; i++) fireflies.push(new Firefly());

  // Cursor & Touch Listener for Sparkles
  function addSparkle(x, y) {
    for (let i = 0; i < 2; i++) {
      sparkles.push(new Sparkle(x, y));
    }
  }

  window.addEventListener('pointermove', (e) => {
    addSparkle(e.clientX, e.clientY);
  });
  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      addSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  // Petal burst trigger (accessible globally)
  window.triggerPetalBurst = function (originX, originY) {
    const burstX = originX || width / 2;
    const burstY = originY || height / 2;
    for (let i = 0; i < 40; i++) {
      petals.push(new Petal(true, burstX, burstY));
    }
    for (let i = 0; i < 25; i++) {
      sparkles.push(new Sparkle(burstX, burstY));
    }
  };

  // Sunflower Rain trigger (accessible globally)
  window.triggerSunflowerRain = function (originX, originY) {
    const burstX = originX || width / 2;
    const burstY = originY || height / 2;
    // Burst sunflowers upward from button
    for (let i = 0; i < 24; i++) {
      sunflowers.push(new FallingSunflower(burstX, burstY));
    }
    // Rain sunflowers from top across the whole screen
    for (let i = 0; i < 22; i++) {
      sunflowers.push(new FallingSunflower());
    }
  };

  // Main Render Loop
  let lastWindChange = 0;
  function animate(timestamp) {
    ctx.clearRect(0, 0, width, height);

    // Dynamic wind modulation
    if (timestamp - lastWindChange > 3000) {
      windTarget = (Math.random() - 0.5) * 1.6;
      lastWindChange = timestamp;
    }
    wind += (windTarget - wind) * 0.01;

    // Draw stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
    }

    // Draw fireflies
    for (let i = 0; i < fireflies.length; i++) {
      fireflies[i].update();
      fireflies[i].draw();
    }

    // Draw petals
    for (let i = petals.length - 1; i >= 0; i--) {
      const p = petals[i];
      p.update();
      p.draw();
      if (p.isBurst && p.opacity <= 0) {
        petals.splice(i, 1);
      }
    }

    // Draw falling sunflowers
    for (let i = sunflowers.length - 1; i >= 0; i--) {
      const sf = sunflowers[i];
      sf.update();
      sf.draw();
      if (sf.y > height + 80) {
        sunflowers.splice(i, 1);
      }
    }

    // Draw sparkles
    for (let i = sparkles.length - 1; i >= 0; i--) {
      const s = sparkles[i];
      s.update();
      s.draw();
      if (s.alpha <= 0) {
        sparkles.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
