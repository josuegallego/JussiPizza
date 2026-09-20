# Opción A — "Pop" (pizzería moderna y juguetona)

Restaurar: copiar los .bak a su sitio quitando `.bak`:
- page.tsx.bak -> app/page.tsx
- layout.tsx.bak -> app/layout.tsx
- globals.css.bak -> app/globals.css
- tailwind.config.ts.bak -> tailwind.config.ts

## Identidad
- Fuentes: Bricolage Grotesque (titulares, var --font-display) + DM Sans (texto, --font-body)
- Colores: verde #4EBF4B, rojo #F22233, naranja #F27F1B, beige #F3EDD6 (fondo), café #231107 (texto/bordes)
- Formas: píldoras, bordes de 2px café, sombras planas desplazadas (shadow-pop 4px 4px 0 café; -lg 6px; -sm 2px)
- Clases: btn-pop(-green/-red/-orange/-beige/-lg), card-pop, sticker, eyebrow
- Animaciones: botón sube al hover y se "hunde" (translate 3px + sin sombra) al presionar; cinta marquee naranja rotada -1deg (28s linear);
  sticker rotado -3deg; fade-in 0.6s; hero con parallax (imagen fixed + clip-path inset(0)).
- Secciones: header píldora flotante, hero titular gigante (PIZZA verde con text-shadow plano), cinta marquee, galería en card-pop,
  sedes sobre fondo verde, contacto sobre café con 3 tarjetas de borde beige, modal de sede como bottom-sheet en móvil.
