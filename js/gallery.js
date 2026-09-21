/* =========================================================
   POLAROID MEMORY GALLERY & 3D TILT LIGHTBOX
   ========================================================= */

(function () {
  const polaroids = document.querySelectorAll('.polaroid-card');
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxNote = document.getElementById('lightboxNote');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  // Interactive 3D Tilt Effect on mousemove
  polaroids.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element.
      const y = e.clientY - rect.top;  // y position within element.

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const deltaX = (x - centerX) / centerX;
      const deltaY = (y - centerY) / centerY;

      const rotateX = -deltaY * 12;
      const rotateY = deltaX * 12;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // Click to Open in Lightbox
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const title = card.getAttribute('data-title') || 'Recuerdo Especial';
      const note = card.getAttribute('data-note') || 'Un momento inolvidable lleno de sonrisas y luz.';

      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        if (lightboxCaption) lightboxCaption.textContent = title;
        if (lightboxNote) lightboxNote.textContent = note;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (window.triggerPetalBurst) {
          const rect = card.getBoundingClientRect();
          window.triggerPetalBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      }
    });
  });

  // Close Lightbox function
  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard shortcut: Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });
})();
