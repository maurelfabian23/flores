/* =========================================================
   MAIN APP ORCHESTRATOR & TYPEWRITER LETTER EFFECT
   ========================================================= */

(function () {
  const introOverlay = document.getElementById('introOverlay');
  const openSurpriseBtn = document.getElementById('openSurpriseBtn');
  const envelopeIconBtn = document.getElementById('envelopeIconBtn');
  const mainWrapper = document.getElementById('mainWrapper');
  const typewriterTarget = document.getElementById('typewriterText');
  const burstBtn = document.getElementById('burstBtn');

  // Romantic and affectionate letter content for Ariana Corpas
  const letterText = 
`Dicen que el 21 de septiembre es el día en que florece la primavera y se regalan flores amarillas a las personas que iluminan tu vida... y hoy todas son para ti.

No cualquiera tiene el privilegio de reunir tanta belleza, ingenio y talento en una sola persona. Eres nuestra brillante Ingeniera capaz de resolver cualquier desafío, la Azafata que vuela alto y nos inspira a soñar, la Publicista creativa que llena cada instante de ideas y colores, y por supuesto... nuestra auténtica Barbie llena de estilo, dulzura y luz propia.

Que cada flor amarilla en este día te recuerde lo profundamente especial, admirada y querida que eres. Gracias por llenar cada rincón de magia. 🌻✨💛`;

  let hasStarted = false;

  function launchExperience(e) {
    if (hasStarted) return;
    hasStarted = true;

    // 1. Trigger Petal Burst at click coordinates
    const clickX = e ? e.clientX : window.innerWidth / 2;
    const clickY = e ? e.clientY : window.innerHeight / 2;
    if (window.triggerPetalBurst) {
      window.triggerPetalBurst(clickX, clickY);
    }

    // 2. Hide intro overlay with smooth fade
    if (introOverlay) {
      introOverlay.classList.add('hidden');
    }

    // 3. Show main wrapper
    if (mainWrapper) {
      mainWrapper.classList.add('visible');
    }

    // 4. Start acoustic background music
    if (window.startBackgroundMusic) {
      window.startBackgroundMusic();
    }

    // 5. Trigger flower blooming animation
    setTimeout(() => {
      if (window.triggerBouquetBloom) {
        window.triggerBouquetBloom();
      }
    }, 600);

    // 6. Start typewriter effect for the letter
    setTimeout(() => {
      startTypewriter(letterText);
    }, 1200);
  }

  // Typewriter effect function
  function startTypewriter(text) {
    if (!typewriterTarget) return;
    typewriterTarget.innerHTML = '';
    let i = 0;
    const speed = 26; // ms per character

    function type() {
      if (i < text.length) {
        const char = text.charAt(i);
        if (char === '\n') {
          typewriterTarget.innerHTML += '<br><br>';
        } else {
          typewriterTarget.innerHTML += char;
        }
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Event Listeners for Intro Button
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener('click', launchExperience);
  }
  if (envelopeIconBtn) {
    envelopeIconBtn.addEventListener('click', launchExperience);
  }

  // Celebration burst button
  if (burstBtn) {
    burstBtn.addEventListener('click', (e) => {
      const rect = burstBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      if (window.triggerPetalBurst) {
        window.triggerPetalBurst(x, y);
        // Double burst for celebratory punch
        setTimeout(() => window.triggerPetalBurst(x - 80, y - 40), 150);
        setTimeout(() => window.triggerPetalBurst(x + 80, y - 40), 300);
      }
    });
  }
})();
