# Portfolio GSAP (Diego Rodríguez)

Pequeño portfolio estático hecho con HTML + CSS + JS. Animaciones y scroll suave con GSAP/ScrollTrigger y Lenis. Iconos de stack vía Devicon (CDN). Incluye páginas legales independientes y un aviso de cookies básico con `localStorage`.

## Tecnologías
- HTML/CSS/JS sin bundler
- GSAP 3 + ScrollTrigger (CDN)
- Lenis (scroll suave, CDN)
- Devicon (iconos de tecnologías, CDN)

## Estructura
- `index.html`: home con hero animado, proyectos, stack, experiencia, formación, contacto.
- `terminos.html`, `privacidad.html`, `cookies.html`: páginas legales simples.
- `styles.css`: estilos monocromo, hero con consola animada, mira, indicador de scroll, tarjetas.
- `script.js`: animaciones de entrada, consola y barra de progreso en hero, scroll suave, render dinámico de proyectos/stack/experiencia/formación, banner de cookies.
- `favicon.svg`: icono simple.

## Notas
- El banner de cookies solo se muestra hasta que aceptas (se guarda `cookie_consent` en `localStorage`).
- El scroll y algunas animaciones requieren que carguen los scripts de CDN. Sin conexión, funcionan los fallbacks básicos.
