/* =========================================================
   BLOOMING FLOWERS GENERATOR & INTERACTIVE SURPRISES
   ========================================================= */

(function () {
  const container = document.getElementById('bouquetContainer');
  if (!container) return;

  // Surprise messages tailored for Ariana Corpas
  const flowerMessages = [
    {
      icon: '🌻',
      title: 'Ingeniera Brillante',
      text: 'Tu mente brillante e inteligencia construyen soluciones extraordinarias.'
    },
    {
      icon: '✈️',
      title: 'Azafata de Ensueño',
      text: 'Tu elegancia y espíritu no conocen fronteras. ¡Vuelas alto siempre!'
    },
    {
      icon: '💡',
      title: 'Publicista Creativa',
      text: 'Llenas de magia, color e ideas brillantes cada lugar que pisas.'
    },
    {
      icon: '👑',
      title: 'Barbie Ariana',
      text: 'Dulzura, estilo y perfección. Eres única en todo lo que haces.'
    },
    {
      icon: '💛',
      title: '21 de Septiembre',
      text: '¡Todas las flores amarillas del mundo son pocas para agradecer tu existencia!'
    }
  ];

  // SVG Markup with Sunflowers & Tulips
  const svgMarkup = `
    <svg viewBox="0 0 600 500" class="bouquet-svg" style="width: 100%; height: 100%; overflow: visible;" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Filter for Golden Glow -->
        <filter id="flowerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        <!-- Petal Gradient 1 -->
        <linearGradient id="petalGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#fff8db" />
          <stop offset="35%" stop-color="#ffd700" />
          <stop offset="100%" stop-color="#f59e0b" />
        </linearGradient>

        <!-- Petal Gradient 2 -->
        <linearGradient id="petalGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffec99" />
          <stop offset="60%" stop-color="#ffbe0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>

        <!-- Tulip Petal Gradient -->
        <linearGradient id="tulipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fff3b0" />
          <stop offset="50%" stop-color="#ffd166" />
          <stop offset="100%" stop-color="#f48c06" />
        </linearGradient>

        <!-- Sunflower Center Gradient -->
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#3d1e03" />
          <stop offset="55%" stop-color="#2a1401" />
          <stop offset="85%" stop-color="#542c05" />
          <stop offset="100%" stop-color="#d97706" />
        </radialGradient>

        <!-- Stem Gradient -->
        <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#14532d" />
          <stop offset="50%" stop-color="#22c55e" />
          <stop offset="100%" stop-color="#166534" />
        </linearGradient>

        <!-- Leaf Gradient -->
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4ade80" />
          <stop offset="70%" stop-color="#15803d" />
          <stop offset="100%" stop-color="#052e16" />
        </linearGradient>
      </defs>

      <!-- Ribbon / Wrap Bow at the base -->
      <g class="bouquet-wrap" transform="translate(300, 440)">
        <path d="M -70 -10 Q 0 35 70 -10 Q 30 15 0 20 Q -30 15 -70 -10 Z" fill="rgba(255, 215, 0, 0.3)" stroke="#ffd700" stroke-width="1.5" />
        <!-- Silk bow -->
        <circle cx="0" cy="5" r="12" fill="#ffd700" />
        <path d="M 0 5 Q -40 -15 -60 15 Q -25 35 0 10 Z" fill="#ffb703" opacity="0.9" />
        <path d="M 0 5 Q 40 -15 60 15 Q 25 35 0 10 Z" fill="#ffb703" opacity="0.9" />
        <path d="M -5 15 L -25 70 L -10 65 L 0 20 Z" fill="#fb8500" opacity="0.8" />
        <path d="M 5 15 L 25 70 L 10 65 L 0 20 Z" fill="#fb8500" opacity="0.8" />
      </g>

      <!-- STEMS LAYER -->
      <g class="stems-group" stroke="url(#stemGrad)" fill="none" stroke-linecap="round">
        <!-- Stem Left Tulip -->
        <path id="stem1" d="M 300 420 Q 240 330 180 230" stroke-width="7" />
        <!-- Stem Mid-Left Sunflower -->
        <path id="stem2" d="M 300 420 Q 260 280 230 160" stroke-width="8" />
        <!-- Stem Center Giant Sunflower -->
        <path id="stem3" d="M 300 420 Q 300 280 300 120" stroke-width="9" />
        <!-- Stem Mid-Right Sunflower -->
        <path id="stem4" d="M 300 420 Q 340 280 370 160" stroke-width="8" />
        <!-- Stem Right Tulip -->
        <path id="stem5" d="M 300 420 Q 360 330 420 230" stroke-width="7" />
      </g>

      <!-- LEAVES LAYER -->
      <g class="leaves-group" fill="url(#leafGrad)">
        <path d="M 270 340 Q 180 320 150 360 Q 210 390 270 345 Z" />
        <path d="M 330 350 Q 420 330 450 370 Q 390 400 330 355 Z" />
        <path d="M 285 270 Q 190 230 180 280 Q 240 300 285 275 Z" />
        <path d="M 315 280 Q 410 240 420 290 Q 360 310 315 285 Z" />
      </g>

      <!-- FLOWERS GROUP (Interactive) -->

      <!-- Flower 1: Left Tulip -->
      <g id="flower1" class="flower-interactive" transform="translate(180, 230)" style="cursor: pointer;" data-index="0">
        <g class="flower-head">
          <path d="M 0 0 C -40 -30 -35 -90 0 -110 C 35 -90 40 -30 0 0 Z" fill="url(#tulipGrad)" filter="url(#flowerGlow)" />
          <path d="M 0 0 C -30 -20 -25 -75 0 -95 C -15 -60 -10 -20 0 0 Z" fill="#ffe066" opacity="0.9" />
          <path d="M 0 0 C 30 -20 25 -75 0 -95 C 15 -60 10 -20 0 0 Z" fill="#f77f00" opacity="0.75" />
          <circle cx="0" cy="-60" r="8" fill="#fff9db" opacity="0.6" filter="url(#flowerGlow)" />
        </g>
      </g>

      <!-- Flower 2: Mid-Left Sunflower -->
      <g id="flower2" class="flower-interactive" transform="translate(230, 160)" style="cursor: pointer;" data-index="1">
        <g class="flower-head" filter="url(#flowerGlow)">
          <!-- Outer Petals (Rotated) -->
          <g fill="url(#petalGrad2)">
            ${generateSunflowerPetals(14, 55, 18)}
          </g>
          <!-- Inner Petals -->
          <g fill="url(#petalGrad1)" transform="rotate(12)">
            ${generateSunflowerPetals(14, 46, 15)}
          </g>
          <!-- Center Disk -->
          <circle cx="0" cy="0" r="28" fill="url(#centerGrad)" />
          <!-- Seed Details -->
          <circle cx="0" cy="0" r="24" fill="none" stroke="#eab308" stroke-width="2" stroke-dasharray="3, 4" opacity="0.6" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="2, 3" opacity="0.7" />
        </g>
      </g>

      <!-- Flower 3: Center Giant Sunflower (The Queen) -->
      <g id="flower3" class="flower-interactive" transform="translate(300, 120)" style="cursor: pointer;" data-index="4">
        <g class="flower-head" filter="url(#flowerGlow)">
          <!-- Golden Halo Ring -->
          <circle cx="0" cy="0" r="85" fill="rgba(255, 215, 0, 0.15)" filter="url(#flowerGlow)" />
          <!-- Outer Petals -->
          <g fill="url(#petalGrad2)">
            ${generateSunflowerPetals(18, 75, 24)}
          </g>
          <!-- Inner Petals -->
          <g fill="url(#petalGrad1)" transform="rotate(10)">
            ${generateSunflowerPetals(18, 62, 20)}
          </g>
          <!-- Center Disk -->
          <circle cx="0" cy="0" r="38" fill="url(#centerGrad)" />
          <circle cx="0" cy="0" r="32" fill="none" stroke="#fcd34d" stroke-width="2.5" stroke-dasharray="4, 4" opacity="0.7" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3, 3" opacity="0.8" />
          <circle cx="0" cy="0" r="8" fill="#1e1003" />
        </g>
      </g>

      <!-- Flower 4: Mid-Right Sunflower -->
      <g id="flower4" class="flower-interactive" transform="translate(370, 160)" style="cursor: pointer;" data-index="2">
        <g class="flower-head" filter="url(#flowerGlow)">
          <g fill="url(#petalGrad2)">
            ${generateSunflowerPetals(14, 55, 18)}
          </g>
          <g fill="url(#petalGrad1)" transform="rotate(12)">
            ${generateSunflowerPetals(14, 46, 15)}
          </g>
          <circle cx="0" cy="0" r="28" fill="url(#centerGrad)" />
          <circle cx="0" cy="0" r="24" fill="none" stroke="#eab308" stroke-width="2" stroke-dasharray="3, 4" opacity="0.6" />
        </g>
      </g>

      <!-- Flower 5: Right Tulip -->
      <g id="flower5" class="flower-interactive" transform="translate(420, 230)" style="cursor: pointer;" data-index="3">
        <g class="flower-head">
          <path d="M 0 0 C -40 -30 -35 -90 0 -110 C 35 -90 40 -30 0 0 Z" fill="url(#tulipGrad)" filter="url(#flowerGlow)" />
          <path d="M 0 0 C -30 -20 -25 -75 0 -95 C -15 -60 -10 -20 0 0 Z" fill="#f77f00" opacity="0.75" />
          <path d="M 0 0 C 30 -20 25 -75 0 -95 C 15 -60 10 -20 0 0 Z" fill="#ffe066" opacity="0.9" />
          <circle cx="0" cy="-60" r="8" fill="#fff9db" opacity="0.6" filter="url(#flowerGlow)" />
        </g>
      </g>
    </svg>
  `;

  // Helper function to calculate sunflower petals array
  function generateSunflowerPetals(count, length, width) {
    let petalsSvg = '';
    const angleStep = 360 / count;
    for (let i = 0; i < count; i++) {
      const angle = i * angleStep;
      petalsSvg += `
        <path d="M 0 0 Q -${width / 2} -${length * 0.55} 0 -${length} Q ${width / 2} -${length * 0.55} 0 0 Z"
              transform="rotate(${angle})" />
      `;
    }
    return petalsSvg;
  }

  container.innerHTML = svgMarkup;

  // Blooming Animation with CSS & Transitions
  const styleBloom = document.createElement('style');
  styleBloom.textContent = `
    .flower-head {
      transform-origin: center center;
      transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .flower-interactive:hover .flower-head {
      transform: scale(1.15) rotate(5deg);
      filter: drop-shadow(0 0 16px rgba(255, 215, 0, 0.8));
    }
    .flower-interactive:active .flower-head {
      transform: scale(0.95);
    }
    .bloom-initial .flower-head {
      transform: scale(0);
      opacity: 0;
    }
    .bloom-active .flower-head {
      transform: scale(1);
      opacity: 1;
    }
  `;
  document.head.appendChild(styleBloom);

  // Setup toast notification element
  let toastEl = document.getElementById('flowerToast');
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = 'flowerToast';
    toastEl.className = 'flower-toast';
    document.body.appendChild(toastEl);
  }

  let toastTimeout;
  function showFlowerMessage(idx, evt) {
    const msg = flowerMessages[idx % flowerMessages.length];
    toastEl.innerHTML = `
      <span style="font-size: 1.5rem;">${msg.icon}</span>
      <div>
        <strong style="color: var(--gold-pure); display: block; font-size: 0.95rem;">${msg.title}</strong>
        <span>${msg.text}</span>
      </div>
    `;
    toastEl.classList.add('visible');

    // Trigger golden petal explosion
    const rect = evt.currentTarget.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;
    if (window.triggerPetalBurst) {
      window.triggerPetalBurst(clickX, clickY);
    }

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('visible');
    }, 4500);
  }

  // Attach click listeners to all flowers
  const flowers = container.querySelectorAll('.flower-interactive');
  flowers.forEach((flower) => {
    flower.addEventListener('click', (e) => {
      const idx = parseInt(flower.getAttribute('data-index') || '0', 10);
      showFlowerMessage(idx, e);
    });
  });

  // Global Bloom trigger function
  window.triggerBouquetBloom = function () {
    flowers.forEach((flower, i) => {
      const head = flower.querySelector('.flower-head');
      if (head) {
        head.style.transform = 'scale(0)';
        head.style.opacity = '0';
        setTimeout(() => {
          head.style.transition = 'transform 1.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 1s ease';
          head.style.transform = 'scale(1)';
          head.style.opacity = '1';
        }, 300 + i * 200);
      }
    });
  };
})();
