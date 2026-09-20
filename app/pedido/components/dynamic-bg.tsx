/**
 * Fondo con tres círculos planos de la marca, pegados a los bordes (parcialmente fuera de pantalla)
 * para no cruzarse con el contenido. Se mueven solos, con un vaivén corto y lento: funciona igual
 * en celular y solo anima `transform`, así que es liviano.
 */
const shapes = [
  { cls: "-left-16 top-24 h-48 w-48 bg-jussi-orange", anim: "animate-drift-a" },
  { cls: "-right-20 top-1/2 h-56 w-56 bg-jussi-green", anim: "animate-drift-b" },
  { cls: "-bottom-16 left-10 h-40 w-40 bg-jussi-red", anim: "animate-drift-c" },
] as const

export function DynamicBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      {shapes.map((s, i) => (
        <div key={i} className={`absolute rounded-full will-change-transform ${s.cls} ${s.anim}`} />
      ))}
    </div>
  )
}
