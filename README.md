# 🌻 Flores Amarillas para Ariana Corpas 💛

Una experiencia web interactiva, emotiva y visualmente mágica creada especialmente para celebrar el **Día de las Flores Amarillas** (21 de Septiembre), dedicada a nuestra **Ingeniera, Azafata, Publicista y Barbie favorita: Ariana Corpas**.

---

## ✨ Características Principales

- 🌌 **Ambiente Nocturno Estrellado:** Cielo profundo con constelaciones parpadeantes y luciérnagas doradas con luz suave pulsante.
- 🌻 **Ramo de Flores Amarillas Interactivo (SVG):** Girasoles y tulipanes dorados con animación de florecimiento (*blooming*). Al tocar cada flor, se revela un mensaje especial con lluvia de pétalos.
- 🎵 **Música de Fondo Acústica de Flores Amarillas:**
  - Sistema de audio inteligente con fade-in suave.
  - Botón flotante estilo disco de vinilo dorado con control de reproducción y pausa.
  - **Doble soporte:** Reproduce tu archivo MP3 (`assets/audio/flores-amarillas.mp3`) o sintetiza automáticamente la melodía acústica con arpegios cálidos vía Web Audio API si no hay archivo de audio.
- 💌 **Carta de Dedicatoria Personalizada:** Con efecto máquina de escribir (*typewriter*), sello de cera dorado y palabras dedicadas a todas las facetas de Ariana (*Ingeniera, Azafata, Publicista, Barbie*).
- 📸 **Galería de Recuerdos Estilo Polaroid:**
  - Tarjetas fotográficas con cinta adhesiva dorada y tipografía manuscrita.
  - Efecto interactivo 3D Tilt al mover el cursor o deslizar el dedo.
  - Visor modal ampliado (*Lightbox*) con dedicatoria al hacer clic.
- 📱 **100% Responsivo:** Diseñado tanto para teléfonos celulares (Android / iPhone) como para computadoras y tablets.
- 🚀 **Zero Build:** Código nativo (HTML5, CSS3, JavaScript puro) listo para desplegarse instantáneamente en **GitHub Pages**.

---

## 📂 Estructura del Proyecto

```
flores-amarillas/
├── index.html                   # Página principal interactiva
├── css/
│   ├── style.css                # Estilos generales, tema nocturno y animaciones
│   └── polaroid.css             # Estilos de tarjetas polaroid y lightbox
├── js/
│   ├── app.js                   # Coordinador de bienvenida, carta y celebraciones
│   ├── particles.js             # Motor Canvas de pétalos y luciérnagas a 60 FPS
│   ├── flowers.js               # Flores SVG vectoriales y mensajes interactivos
│   ├── audio.js                 # Controlador de música acústica
│   └── gallery.js               # Efecto 3D Tilt y visor Lightbox
├── assets/
│   ├── audio/
│   │   └── flores-amarillas.mp3 # Coloca aquí tu pista MP3 favorita
│   └── photos/
│       ├── photo1.jpg           # Foto 1 de Ariana
│       ├── photo2.jpg           # Foto 2 de Ariana
│       ├── photo3.jpg           # Foto 3 de Ariana
│       └── photo4.jpg           # Foto 4 de Ariana
└── README.md
```

---

## 🖼️ ¿Cómo personalizar las fotos y música?

### 1. Fotos Personales
Guarda tus fotos en la carpeta `assets/photos/` con los nombres:
- `photo1.jpg`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`

*(Los textos y leyendas de cada foto se pueden editar fácilmente en el archivo `index.html` buscando la sección `<!-- POLAROID MEMORIES GALLERY -->`).*

### 2. Canción MP3
Coloca tu archivo MP3 con el nombre `flores-amarillas.mp3` dentro de la carpeta `assets/audio/`.  
Si no colocas ningún archivo, la web reproducirá automáticamente la versión instrumental acústica integrada por defecto.

---

## 🌐 Publicar en GitHub Pages en 2 Pasos

El repositorio ya está enlazado a `https://github.com/maurelfabian23/flores.git`. Para publicarlo:

1. **Subir los cambios a GitHub:**
   ```bash
   git add .
   git commit -m "feat: Experiencia Flores Amarillas para Ariana Corpas"
   git branch -M main
   git push -u origin main
   ```

2. **Activar GitHub Pages en el repositorio:**
   - Ve a tu repositorio en GitHub: `https://github.com/maurelfabian23/flores`
   - Entra a **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
   - En **Build and deployment** > **Source**, selecciona **Deploy from a branch**.
   - En **Branch**, selecciona `main` y la carpeta `/(root)`, luego presiona **Save**.
   - ¡Listo! En 1 o 2 minutos tu web estará disponible para todo el mundo en:
     **`https://maurelfabian23.github.io/flores/`**
