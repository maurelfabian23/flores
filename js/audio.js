/* =========================================================
   DUAL AUDIO CONTROLLER: MP3 PLAYER + ACOUSTIC SYNTHESIZER
   ========================================================= */

(function () {
  const audioWidget = document.getElementById('audioWidget');
  const discBtn = document.getElementById('musicDiscBtn');
  const trackStatus = document.getElementById('trackStatus');
  const trackTitle = document.getElementById('trackTitle');

  let isPlaying = false;
  let usingSynthesizer = false;
  let audioContext = null;
  let synthInterval = null;

  // Native HTML5 Audio
  const audio = new Audio();
  audio.src = 'assets/audio/flores-amarillas.mp3';
  audio.loop = true;
  audio.volume = 0;

  // Handle errors or missing MP3 gracefully by falling back to Web Audio acoustic arpeggio
  audio.addEventListener('error', () => {
    console.info('MP3 local no detectado o formato pendiente. Activando sintetizador acústico web de respaldo.');
    usingSynthesizer = true;
  });

  // Fade-in volume helper
  function fadeInAudio(targetVol = 0.65, durationMs = 2500) {
    let current = 0;
    const step = 0.05;
    const intervalTime = durationMs / (targetVol / step);
    const fadeTimer = setInterval(() => {
      current += step;
      if (current >= targetVol) {
        audio.volume = targetVol;
        clearInterval(fadeTimer);
      } else {
        audio.volume = current;
      }
    }, intervalTime);
  }

  // Web Audio Synthesizer: Plays "Flores Amarillas" Acoustic Melody & Chords
  function initAcousticSynthesizer() {
    if (!audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioCtx();
    }
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
  }

  function playAcousticPluck(freq, time, duration = 1.6, gainLevel = 0.18) {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const filter = audioContext.createBiquadFilter();

    // Warm guitar/nylon acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(300, time + duration);

    // Warm harmonics: mix of triangle with gentle resonance
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    // Exponential pluck envelope
    gainNode.gain.setValueAtTime(0.001, time);
    gainNode.gain.linearRampToValueAtTime(gainLevel, time + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  // Note frequency map
  const NOTES = {
    G3: 196.00, B3: 246.94, D4: 293.66, E4: 329.63,
    G4: 392.00, A4: 440.00, B4: 493.88, C5: 523.25,
    D5: 587.33, E5: 659.25, Fs4: 369.99
  };

  // Melody sequence representing Floricienta - Flores Amarillas chorus
  const melodyScore = [
    // "Él la estaba esperando con una flor amarilla..."
    { note: NOTES.G4, dur: 0.35 },
    { note: NOTES.G4, dur: 0.35 },
    { note: NOTES.A4, dur: 0.35 },
    { note: NOTES.B4, dur: 0.70 },
    { note: NOTES.B4, dur: 0.35 },
    { note: NOTES.A4, dur: 0.35 },
    { note: NOTES.G4, dur: 0.50 },
    { note: NOTES.D4, dur: 0.60 },

    // "Ella lo estaba soñando..."
    { note: NOTES.G4, dur: 0.35 },
    { note: NOTES.A4, dur: 0.35 },
    { note: NOTES.B4, dur: 0.70 },
    { note: NOTES.C5, dur: 0.35 },
    { note: NOTES.B4, dur: 0.35 },
    { note: NOTES.A4, dur: 0.70 },

    // Chords and flourish
    { note: NOTES.B4, dur: 0.35 },
    { note: NOTES.D5, dur: 0.65 },
    { note: NOTES.C5, dur: 0.35 },
    { note: NOTES.B4, dur: 0.35 },
    { note: NOTES.A4, dur: 0.75 },
    { note: NOTES.G4, dur: 0.90 }
  ];

  let currentNoteIdx = 0;
  function startAcousticLoop() {
    initAcousticSynthesizer();
    currentNoteIdx = 0;

    function scheduleNext() {
      if (!isPlaying || !usingSynthesizer) return;
      const item = melodyScore[currentNoteIdx];
      const now = audioContext.currentTime;

      // Melody note
      playAcousticPluck(item.note, now, item.dur * 2.2, 0.16);

      // Warm acoustic bass accompaniment on root beats
      if (currentNoteIdx % 4 === 0) {
        const bassNotes = [NOTES.G3, NOTES.E4, NOTES.D4, NOTES.B3];
        const bass = bassNotes[(currentNoteIdx / 4) % bassNotes.length];
        playAcousticPluck(bass, now, 2.5, 0.12);
      }

      currentNoteIdx = (currentNoteIdx + 1) % melodyScore.length;
      synthInterval = setTimeout(scheduleNext, item.dur * 1000);
    }

    scheduleNext();
  }

  function stopAcousticLoop() {
    if (synthInterval) {
      clearTimeout(synthInterval);
      synthInterval = null;
    }
  }

  // Play audio main function
  function playMusic() {
    isPlaying = true;
    updateUI(true);

    if (!usingSynthesizer) {
      audio.play().then(() => {
        fadeInAudio(0.7);
      }).catch(() => {
        // Autoplay policy or 404 -> use synthesizer
        usingSynthesizer = true;
        startAcousticLoop();
      });
    } else {
      startAcousticLoop();
    }
  }

  // Pause audio function
  function pauseMusic() {
    isPlaying = false;
    updateUI(false);
    if (!usingSynthesizer) {
      audio.pause();
    } else {
      stopAcousticLoop();
    }
  }

  // UI state updates
  function updateUI(playing) {
    if (discBtn) {
      if (playing) {
        discBtn.classList.add('playing');
        if (trackStatus) trackStatus.textContent = 'En reproducción';
      } else {
        discBtn.classList.remove('playing');
        if (trackStatus) trackStatus.textContent = 'Pausado';
      }
    }
  }

  // Click on floating disc toggles audio
  if (discBtn) {
    discBtn.addEventListener('click', () => {
      if (isPlaying) {
        pauseMusic();
      } else {
        playMusic();
      }
    });
  }

  // Expose globally for the welcome screen trigger
  window.startBackgroundMusic = function () {
    playMusic();
  };
})();
