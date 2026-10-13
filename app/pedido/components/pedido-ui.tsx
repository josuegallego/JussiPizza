"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type SetStateAction,
} from "react"
import { AlertCircle, ArrowLeft, CheckCircle2, Info, ShoppingBag } from "lucide-react"
import type { OrderItem } from "./order-flow"

export const emojiByType: Record<OrderItem["type"], string> = {
  pizza: "🍕",
  lasana: "🍝",
  desgranado: "🌽",
  bebida: "🥤",
}

/** Lista de opciones: una columna en celular, dos en escritorio */
export const optionGrid = "space-y-3 lg:grid lg:grid-cols-2 lg:gap-3 lg:space-y-0"

/** Pedido en curso, para mostrarlo en la columna lateral de escritorio en cualquier paso */
const OrderContext = createContext<{ items: OrderItem[]; deliveryCost: number }>({ items: [], deliveryCost: 0 })
export const OrderProvider = OrderContext.Provider

/**
 * Dirección de la transición entre pantallas: "forward" si el índice sube, "back" si baja.
 * También lleva el scroll al inicio en cada cambio.
 */
export function useFlowDirection(index: number): "forward" | "back" {
  const prev = useRef(index)
  const dir = useRef<"forward" | "back">("forward")
  if (index !== prev.current) {
    dir.current = index > prev.current ? "forward" : "back"
    prev.current = index
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior })
  }, [index])
  return dir.current
}

/**
 * Borradores del pedido: guardan lo que el usuario va llenando en cada pantalla mientras dura el
 * pedido, para que al volver atrás (la pantalla se desmonta) no se pierda nada.
 */
const DraftContext = createContext<Map<string, unknown> | null>(null)

export function DraftProvider({ children }: { children: ReactNode }) {
  const store = useRef(new Map<string, unknown>())
  return <DraftContext.Provider value={store.current}>{children}</DraftContext.Provider>
}

/** Igual que useState, pero el valor sobrevive a que la pantalla se desmonte y se vuelva a montar */
export function useDraft<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const store = useContext(DraftContext)
  const [value, setValue] = useState<T>(() => (store?.has(key) ? (store.get(key) as T) : initial))
  useEffect(() => {
    store?.set(key, value)
  }, [store, key, value])
  return [value, setValue]
}

/** Borra los borradores cuyo nombre empieza por el prefijo dado (p. ej. "pizza.") */
export function useClearDrafts() {
  const store = useContext(DraftContext)
  return (prefix: string) => {
    if (!store) return
    for (const key of Array.from(store.keys())) {
      if (key.startsWith(prefix)) store.delete(key)
    }
  }
}

/**
 * Notificaciones (toasts): avisos breves arriba de la pantalla.
 * "info" = falta algo por completar, "error" = algo no se puede hacer, "success" = listo.
 */
type ToastKind = "info" | "error" | "success"
const TOAST_MS = 3600
type ToastFn = (message: string, kind?: ToastKind) => void

const ToastContext = createContext<ToastFn>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<{ id: number; message: string; kind: ToastKind; leaving?: boolean }[]>([])
  const nextId = useRef(0)

  // Primero se marca como saliente (anima la salida) y luego se quita
  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.map((t) => (t.id === id ? { ...t, leaving: true } : t)))
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 280)
  }, [])

  const toast = useCallback<ToastFn>(
    (message, kind = "info") => {
      const id = ++nextId.current
      // Si el mismo aviso ya está visible, se reemplaza (no se apilan repetidos)
      setToasts((prev) => [...prev.filter((t) => t.message !== message).slice(-2), { id, message, kind }])
      setTimeout(() => dismiss(id), TOAST_MS)
    },
    [dismiss],
  )

  const styles: Record<ToastKind, { box: string; Icon: typeof Info }> = {
    info: { box: "bg-jussi-orange text-jussi-brown", Icon: Info },
    error: { box: "bg-jussi-red text-white", Icon: AlertCircle },
    success: { box: "bg-jussi-brown text-jussi-beige", Icon: CheckCircle2 },
  }

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Celular: arriba al centro. Escritorio: abajo a la derecha */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-0 top-24 z-[60] flex flex-col items-center gap-2 px-4 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:top-auto lg:items-end lg:px-0"
      >
        {toasts.map(({ id, message, kind, leaving }) => {
          const { box, Icon } = styles[kind]
          return (
            <div
              key={id}
              role={kind === "error" ? "alert" : "status"}
              onClick={() => dismiss(id)}
              className={`pointer-events-auto relative flex w-full max-w-md cursor-pointer items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-base font-semibold shadow-[0_14px_32px_-12px_rgba(35,17,7,0.55)] lg:w-auto lg:min-w-[18rem] lg:max-w-sm ${
                leaving ? "animate-toast-out" : "animate-toast-in"
              } ${box}`}
            >
              <Icon className="h-6 w-6 flex-shrink-0" aria-hidden />
              <span>{message}</span>
              {/* Barra de tiempo restante */}
              <span
                aria-hidden
                className="toast-timer absolute inset-x-0 bottom-0 h-1 bg-current opacity-25"
                style={{ "--toast-ms": `${TOAST_MS}ms` } as CSSProperties}
              />
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}

const STEPS = ["Productos", "Resumen", "Entrega", "Pago"]

interface PedidoHeaderProps {
  title: string
  onBack: () => void
  /** Paso actual del flujo (1-4). Si se omite no se muestra la barra de progreso. */
  step?: 1 | 2 | 3 | 4
}

/** Ancho del contenido: angosto en celular, dos columnas en escritorio */
const width = "md:max-w-2xl lg:max-w-5xl xl:max-w-6xl"

/** Encabezado fijo de las pantallas del pedido: botón atrás, título y progreso */
export function PedidoHeader({ title, onBack, step }: PedidoHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-jussi-brown/15 bg-jussi-beige">
      <div className={`mx-auto flex max-w-md items-center gap-3 px-4 py-3 ${width}`}>
        <button
          onClick={onBack}
          aria-label="Volver"
          className="btn-pop btn-pop-beige !h-11 !w-11 flex-shrink-0 !p-0"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="flex-1 truncate font-display text-xl font-extrabold md:text-2xl">{title}</h1>
        {step && (
          <span className="rounded-full bg-jussi-orange px-3 py-1 font-display text-sm font-bold">{step}/4</span>
        )}
      </div>

      {step && (
        <div className={`mx-auto flex max-w-md gap-1.5 px-4 pb-3 ${width}`} aria-hidden>
          {STEPS.map((label, i) => (
            <div key={label} className="flex-1">
              <div className={`h-2 rounded-full ${i < step ? "bg-jussi-brown" : "bg-jussi-brown/15"}`} />
              <span
                className={`mt-1 hidden text-xs font-bold uppercase tracking-wider sm:block ${i < step ? "" : "opacity-50"}`}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </header>
  )
}

/** Contenedor de página del pedido: fondo beige */
export function PedidoPage({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-jussi-beige font-sans text-jussi-brown">{children}</div>
}

/** Barra inferior fija con las acciones principales */
export function PedidoActionBar({ children, mobileOnly }: { children: ReactNode; mobileOnly?: boolean }) {
  return (
    <div
      className={`animate-bar-in fixed inset-x-0 bottom-0 z-20 bg-jussi-beige px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-10px_24px_-14px_rgba(35,17,7,0.35)] ${
        mobileOnly ? "lg:hidden" : ""
      }`}
    >
      <div className="mx-auto flex max-w-md flex-col gap-2">{children}</div>
    </div>
  )
}

/** Resumen compacto del pedido en curso (columna lateral de escritorio) */
export function OrderPanel({ deliveryCost }: { deliveryCost?: number }) {
  const order = useContext(OrderContext)
  const delivery = deliveryCost ?? order.deliveryCost
  const subtotal = order.items.reduce((total, item) => total + item.price, 0)

  return (
    <section className="card-soft bg-white p-5">
      <h2 className="flex items-center justify-between font-display text-lg font-extrabold">
        Tu pedido
        <span className="rounded-full bg-jussi-orange px-2.5 py-0.5 text-sm">{order.items.length}</span>
      </h2>

      {order.items.length === 0 ? (
        <div className="mt-4 flex flex-col items-center rounded-2xl border-2 border-dashed border-jussi-brown/15 px-4 py-6 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-jussi-beige">
            <ShoppingBag className="h-6 w-6" aria-hidden />
          </span>
          <p className="mt-3 font-display font-bold">Tu pedido está vacío</p>
          <p className="mt-1 text-sm font-medium opacity-70">Lo que añadas aparecerá aquí con el total.</p>
        </div>
      ) : (
        <>
          <ul className="mt-3 max-h-[36vh] space-y-3 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-start gap-3 text-sm">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-jussi-beige text-lg">
                  {emojiByType[item.type]}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold leading-tight">{item.name}</span>
                  <span className="block opacity-70">
                    x{item.quantity}
                    {item.size && ` · ${item.size}`}
                    {item.base && ` · ${item.base}`}
                  </span>
                </span>
                <span className="flex-shrink-0 font-bold">${item.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1.5 border-t-2 border-dashed border-jussi-brown/15 pt-3 text-sm">
            <div className="flex justify-between">
              <span className="opacity-70">Subtotal</span>
              <span className="font-semibold">${subtotal.toLocaleString()}</span>
            </div>
            {delivery > 0 && (
              <div className="flex justify-between">
                <span className="opacity-70">Domicilio</span>
                <span className="font-semibold">${delivery.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-end justify-between pt-1">
              <span className="font-display text-base font-bold">Total</span>
              <span className="font-display text-2xl font-extrabold text-jussi-red">
                ${(subtotal + delivery).toLocaleString()}
              </span>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

interface PedidoBodyProps {
  children: ReactNode
  /** Botones principales: barra fija abajo en celular, columna lateral en escritorio */
  actions?: ReactNode
  /** Contenido de la columna lateral en escritorio (por defecto, el resumen del pedido) */
  aside?: ReactNode
  /** Espacio inferior en celular para que la barra fija no tape el contenido */
  mobilePad?: string
}

/** Cuerpo de las pantallas del pedido: una columna en celular; contenido + columna lateral fija en escritorio */
export function PedidoBody({ children, actions, aside, mobilePad = "pb-40" }: PedidoBodyProps) {
  return (
    <>
      <div
        className={`mx-auto max-w-md px-4 pt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start lg:gap-10 lg:pb-16 lg:pt-8 ${width} ${
          actions ? mobilePad : "pb-10"
        }`}
      >
        <main className="min-w-0">{children}</main>
        {/* Columna lateral separada por una línea que llega hasta abajo; su contenido queda fijo al hacer scroll */}
        <aside className="hidden lg:block lg:min-h-[calc(100svh-11rem)] lg:self-stretch lg:border-l-2 lg:border-dashed lg:border-jussi-brown/15 lg:pl-8">
          <div className="lg:sticky lg:top-36 lg:flex lg:flex-col lg:gap-4">
            {aside ?? <OrderPanel />}
            {actions && (
              <div className="flex flex-col gap-2 [&_.btn-pop-lg]:px-5 [&_.btn-pop]:whitespace-nowrap">{actions}</div>
            )}
          </div>
        </aside>
      </div>
      {actions && <PedidoActionBar mobileOnly>{actions}</PedidoActionBar>}
    </>
  )
}

/**
 * Al elegir una opción (role="radio") dentro de un bloque marcado con `data-step-section`, lleva con
 * suavidad al siguiente bloque del formulario. Va en el onClick del bloque.
 */
export function advanceToNextSection(e: MouseEvent<HTMLElement>) {
  if (!(e.target as HTMLElement).closest('[role="radio"]')) return
  const current = e.currentTarget
  // Pausa breve: deja ver lo elegido y que aparezcan los bloques que dependen de eso (p. ej. porciones)
  setTimeout(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-step-section]"))
    const next = steps[steps.indexOf(current) + 1]
    if (!next) return
    const headerBottom = document.querySelector("header")?.getBoundingClientRect().bottom ?? 0
    const offset = next.getBoundingClientRect().top - headerBottom - 20
    // Solo hacia abajo: si el siguiente bloque ya está arriba a la vista, no se mueve nada
    if (offset <= 8) return
    smoothScrollBy(offset, () => {
      next.classList.remove("section-arrive")
      void next.offsetWidth // reinicia la animación si ya se había usado
      next.classList.add("section-arrive")
      next.addEventListener("animationend", () => next.classList.remove("section-arrive"), { once: true })
    })
  }, 320)
}

/**
 * Scroll suave propio (el nativo se siente brusco): arranca y frena despacio, y se cancela si
 * la persona mueve la página por su cuenta.
 */
function smoothScrollBy(distance: number, onDone?: () => void) {
  // No se apaga con prefers-reduced-motion: Windows lo activa al desactivar sus animaciones, y un
  // salto brusco desorienta más que un desplazamiento suave
  const start = window.scrollY
  const duration = Math.min(1000, Math.max(600, Math.abs(distance) * 1.1))
  const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
  let cancelled = false
  const cancel = () => (cancelled = true)
  const events = ["wheel", "touchstart", "keydown"] as const
  events.forEach((ev) => window.addEventListener(ev, cancel, { passive: true, once: true }))
  const cleanup = () => events.forEach((ev) => window.removeEventListener(ev, cancel))

  const t0 = performance.now()
  const step = (now: number) => {
    if (cancelled) return cleanup()
    const t = Math.min(1, (now - t0) / duration)
    // "instant": el html tiene scroll-behavior: smooth, que pelearía con cada cuadro
    window.scrollTo({ top: start + distance * easeInOutCubic(t), behavior: "instant" as ScrollBehavior })
    if (t < 1) return requestAnimationFrame(step)
    cleanup()
    onDone?.()
  }
  requestAnimationFrame(step)
}

/** Bloque de formulario con título */
export function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <section data-step-section className="card-soft mb-6 p-5" onClick={advanceToNextSection}>
      <h2 className="font-display text-xl font-extrabold">{title}</h2>
      {hint && <p className="mt-1 text-base font-medium opacity-80">{hint}</p>}
      <div className="mt-4">{children}</div>
    </section>
  )
}

/** Selector de cantidad con - y + */
export function Stepper({ value, onChange, min = 1 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="inline-flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label="Restar"
        className="btn-pop btn-pop-beige !h-12 !w-12 !p-0 text-xl"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        onChange={(e) => onChange(Math.max(min, Number.parseInt(e.target.value) || min))}
        aria-label="Cantidad"
        className="input-pop !w-20 text-center font-display text-xl font-bold"
      />
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        aria-label="Sumar"
        className="btn-pop btn-pop-orange !h-12 !w-12 !p-0 text-xl"
      >
        +
      </button>
    </div>
  )
}

interface FieldProps {
  id: string
  /** Título del campo: vive dentro del recuadro y sube al escribir */
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  inputMode?: "text" | "tel" | "numeric" | "email"
  multiline?: boolean
  rows?: number
  /** Texto de ayuda debajo del campo */
  hint?: string
  /** Mensaje de error: pinta el campo en rojo y reemplaza la ayuda */
  error?: string
  maxLength?: number
}

/** Campo con título flotante: el título empieza dentro del recuadro y, al enfocar o escribir, sube pequeño */
export function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  multiline,
  rows = 3,
  hint,
  error,
  maxLength,
}: FieldProps) {
  const inputBase = `peer block w-full rounded-2xl border bg-white px-4 font-sans text-lg font-bold text-jussi-brown placeholder-transparent md:text-base transition-shadow focus:outline-none focus:ring-4 ${
    error
      ? "border-jussi-red focus:border-jussi-red focus:ring-jussi-red/30"
      : "border-jussi-brown/25 focus:border-jussi-brown focus:ring-jussi-orange/40"
  }`

  const labelBase =
    "pointer-events-none absolute left-4 top-2.5 font-display text-[13px] font-semibold text-jussi-brown/70 transition-all duration-200 " +
    "peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-[13px] peer-focus:text-jussi-brown"

  return (
    <div>
      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            rows={rows}
            value={value}
            placeholder=" "
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} min-h-[7rem] resize-none pb-3 pt-7 md:min-h-[5.5rem]`}
          />
        ) : (
          <input
            id={id}
            type={type}
            inputMode={inputMode}
            maxLength={maxLength}
            aria-invalid={!!error}
            value={value}
            placeholder=" "
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBase} h-16 pb-1 pt-6 md:h-14`}
          />
        )}
        <label
          htmlFor={id}
          className={`${labelBase} ${
            multiline
              ? "peer-placeholder-shown:top-5"
              : "peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2"
          }`}
        >
          {label}
        </label>
      </div>
      {error ? (
        <p role="alert" className="mt-1.5 px-1 text-base font-semibold text-jussi-red">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 px-1 text-base font-medium opacity-80 md:text-sm">{hint}</p>
      )}
    </div>
  )
}

interface OptionCardProps {
  selected: boolean
  onSelect: () => void
  title: string
  description?: string
  price?: number
  /** "radio" (una opción) o "check" (varias) */
  kind?: "radio" | "check"
  disabled?: boolean
}

/** Opción seleccionable tipo tarjeta (reemplaza radios y checkboxes) */
export function OptionCard({ selected, onSelect, title, description, price, kind = "radio", disabled }: OptionCardProps) {
  return (
    <button
      type="button"
      role={kind === "radio" ? "radio" : "checkbox"}
      aria-checked={selected}
      aria-disabled={disabled}
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl p-4 text-left transition-all duration-150 ${
        disabled ? "cursor-not-allowed opacity-40" : ""
      } ${
        selected
          ? "bg-jussi-brown text-jussi-beige ring-2 ring-jussi-brown"
          : "bg-jussi-beige/60 ring-1 ring-jussi-brown/15 hover:bg-jussi-beige hover:ring-jussi-brown/40"
      }`}
    >
      <span
        className={`flex h-7 w-7 flex-shrink-0 items-center justify-center border-2 border-jussi-brown ${
          kind === "radio" ? "rounded-full" : "rounded-lg"
        } ${selected ? "bg-jussi-orange" : "bg-white"}`}
        aria-hidden
      >
        {selected && <span className="text-sm font-bold text-jussi-brown">✓</span>}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-lg font-bold leading-tight">{title}</span>
        {description && <span className="mt-1 block text-base font-medium leading-snug opacity-80">{description}</span>}
      </span>
      {price !== undefined && (
        <span className="flex-shrink-0 font-display text-xl font-extrabold">${price.toLocaleString()}</span>
      )}
    </button>
  )
}

/** Botón "Añadir al pedido" con el total (va en `actions` de PedidoBody) */
export function AddToOrderButton({
  onClick,
  disabled,
  total,
  label = "Añadir al pedido",
}: {
  onClick: () => void
  disabled?: boolean
  total?: number
  label?: string
}) {
  return (
    <button
      onClick={onClick}
      aria-disabled={disabled}
      className={`btn-pop btn-pop-red btn-pop-lg w-full ${disabled ? "opacity-60" : ""}`}
    >
      {label}
      {!disabled && total !== undefined && (
        <span className="rounded-full bg-white/25 px-3 py-0.5">${total.toLocaleString()}</span>
      )}
    </button>
  )
}
