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
`Dicen que el 21 de septiembre es un dia especial donde se regalan flores amarillas a las personas que iluminan tu vida, pero es que tu la iluminas todos los dias.

Me siento muy feliz y orgulloso de tener a alguien tan espectacular, increible y hermosa persona como tu en mi vida. Eres la Publicista creativa y loquita que llena todo de color, la Azafata determinada y enfocada que siempre quiere lograr lo que se propone, la Ingeniera que siempre quiere crear todo lo que piensa y la Barbie que siempre es lo que quiera ser.

Ño tengo palabras para agradecerte por todo mi vida, eres la mejor persona que he conocido. Te amo muchisimo. Gracias por todo y perdon por tan poco.`;

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
          typewriterTarget.innerHTML += '<br>';
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

  // Celebration burst button ("Pulsa para lluvia de Flores!!")
  if (burstBtn) {
    function launchCelebrationRain(e) {
      if (e && e.type === 'touchstart') {
        e.preventDefault();
      }
      const rect = burstBtn.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // 1. Rain full sunflowers
      if (window.triggerSunflowerRain) {
        window.triggerSunflowerRain(x, y);
      }

      // 2. Burst golden petals
      if (window.triggerPetalBurst) {
        window.triggerPetalBurst(x, y);
        setTimeout(() => window.triggerPetalBurst(x - 80, y - 40), 150);
        setTimeout(() => window.triggerPetalBurst(x + 80, y - 40), 300);
      }
    }

    burstBtn.addEventListener('click', launchCelebrationRain);
    burstBtn.addEventListener('touchstart', launchCelebrationRain, { passive: false });
  }
})();
