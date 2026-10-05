"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Clock } from "lucide-react"

/** Horario de domicilios: 5:30 PM a 9:40 PM, todos los días menos el martes */
const OPEN = { h: 17, m: 30 }
const CLOSE = { h: 21, m: 40 }
const CLOSED_WEEKDAY = 2 // martes

// Cierre especial: todo el domingo 4 de octubre de 2026 (9 = octubre); el lunes 5 se atiende normal
const SPECIAL_CLOSE_START = new Date(2026, 9, 4, 0, 0, 0)
const SPECIAL_CLOSE_END = new Date(2026, 9, 5, 0, 0, 0)

export type OutOfServiceReason = "special" | "tuesday" | "early" | "closed"

/** Motivo por el que no se reciben pedidos ahora, o null si está abierto */
export function getOutOfServiceReason(now = new Date()): OutOfServiceReason | null {
  if (now >= SPECIAL_CLOSE_START && now <= SPECIAL_CLOSE_END) return "special"
  if (now.getDay() === CLOSED_WEEKDAY) return "tuesday"
  const minutes = now.getHours() * 60 + now.getMinutes()
  if (minutes < OPEN.h * 60 + OPEN.m) return "early"
  if (minutes >= CLOSE.h * 60 + CLOSE.m) return "closed"
  return null
}

/** Próxima apertura: hoy o un día siguiente a las 5:30 PM, saltando martes y el cierre especial */
function getNextOpening(now: Date) {
  for (let i = 0; i < 10; i++) {
    const candidate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, OPEN.h, OPEN.m)
    if (candidate <= now) continue
    if (candidate.getDay() === CLOSED_WEEKDAY) continue
    if (candidate >= SPECIAL_CLOSE_START && candidate <= SPECIAL_CLOSE_END) continue
    return candidate
  }
  return null
}

const WEEKDAYS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]

/** "en 2 h 15 min" si es hoy; "mañana" o "el miércoles" si es otro día */
function describeOpening(next: Date, now: Date) {
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  const days = Math.round((startOfDay(next) - startOfDay(now)) / 86_400_000)
  if (days === 0) {
    const total = Math.max(1, Math.ceil((next.getTime() - now.getTime()) / 60_000))
    const h = Math.floor(total / 60)
    const m = total % 60
    return { big: h > 0 ? `${h} h ${m} min` : `${m} min`, prefix: "Abrimos en", suffix: "hoy a las 5:30 PM" }
  }
  if (days === 1) return { big: "Mañana", prefix: "Volvemos", suffix: "desde las 5:30 PM" }
  return { big: `El ${WEEKDAYS[next.getDay()]}`, prefix: "Volvemos", suffix: "desde las 5:30 PM" }
}

const content: Record<OutOfServiceReason, { emoji: string; title: string; message: string }> = {
  early: {
    emoji: "⏰",
    title: "Aún no abrimos",
    message: "El horno se está calentando. Recibimos pedidos a domicilio desde las 5:30 PM.",
  },
  closed: {
    emoji: "🌙",
    title: "Domicilios cerrados por hoy",
    message:
      "Cerramos los domicilios a las 9:40 PM para alcanzar a despacharlos. Si estás cerca, en el local te atendemos hasta las 10:30 PM.",
  },
  tuesday: {
    emoji: "😴",
    title: "Hoy descansamos",
    message: "Los martes no tenemos servicio. ¡Te esperamos mañana desde las 5:30 PM!",
  },
  special: {
    emoji: "🚧",
    title: "Hoy no tenemos servicio",
    message: "Por motivos de fuerza mayor no estamos atendiendo. Volvemos mañana lunes 5 de octubre desde las 5:30 PM. ¡Gracias por tu comprensión!",
  },
}

// Semana empezando el lunes; índice = getDay()
const WEEK = [
  { day: 1, label: "Lu" },
  { day: 2, label: "Ma" },
  { day: 3, label: "Mi" },
  { day: 4, label: "Ju" },
  { day: 5, label: "Vi" },
  { day: 6, label: "Sá" },
  { day: 0, label: "Do" },
]

/** Hora de ejemplo para cada motivo, para la vista previa en desarrollo (/pedido?fuera=...) */
export function previewTime(reason: OutOfServiceReason) {
  const d = new Date()
  const at = (dayOffset: number, h: number, m = 0) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + dayOffset, h, m)
  if (reason === "early") return at(0, 15, 10)
  if (reason === "closed") return at(0, 22, 15)
  if (reason === "tuesday") return at((CLOSED_WEEKDAY - d.getDay() + 7) % 7, 13)
  return new Date(SPECIAL_CLOSE_START.getTime() + 13 * 3_600_000) // special
}

export function OutOfService({
  reason,
  onBack,
  simulatedNow,
}: {
  reason: OutOfServiceReason
  onBack: () => void
  /** Solo para la vista previa: hora fija en lugar de la real */
  simulatedNow?: Date
}) {
  // Se actualiza cada 30 s para que la cuenta regresiva no se quede quieta
  const [realNow, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])
  const now = simulatedNow ?? realNow

  const { emoji, title, message } = content[reason]
  const next = getNextOpening(now)
  const opening = next && describeOpening(next, now)
  const today = now.getDay()

  return (
    <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-jussi-brown p-4 font-sans text-jussi-brown">
      {/* Foto de fondo, oscurecida para que la tarjeta resalte */}
      <img
        src="/menu/pizza-mixta.webp"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-[2px]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-jussi-brown/60 via-jussi-brown/40 to-jussi-brown/80" aria-hidden />

      <div className="animate-rise relative w-full max-w-md">
        {/* Sello "Cerrado" */}
        <span className="sticker absolute -right-2 -top-4 z-10 rotate-6 bg-jussi-red text-white sm:-right-5">Cerrado</span>

        <div className="card-soft overflow-hidden bg-jussi-beige">
          <div className="flex items-center gap-3 bg-jussi-brown px-5 py-4 text-jussi-beige">
            <img src="/logo.png" alt="" className="h-11 w-11 rounded-full bg-white object-contain p-0.5" />
            <div>
              <p className="font-display text-xl font-extrabold leading-none">Jussi Pizza</p>
              <p className="mt-1 text-sm font-medium opacity-80">Pedidos a domicilio · Jamundí</p>
            </div>
          </div>

          <div className="px-6 pb-6 pt-7 text-center md:px-8">
            <span className="animate-float mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white text-5xl shadow-pop-sm ring-1 ring-jussi-brown/15">
              {emoji}
            </span>
            <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight md:text-4xl">{title}</h2>
            <p className="mx-auto mt-2 max-w-sm text-lg leading-relaxed opacity-80">{message}</p>

            {opening && (
              <div className="mt-6 rounded-2xl bg-jussi-orange px-5 py-4">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80">{opening.prefix}</p>
                <p className="font-display text-4xl font-extrabold leading-tight">{opening.big}</p>
                <p className="font-semibold opacity-80">{opening.suffix}</p>
              </div>
            )}

            {/* Semana: hoy resaltado, martes cerrado */}
            <div className="mt-6">
              <p className="mb-2 flex items-center justify-center gap-1.5 text-sm font-bold uppercase tracking-widest opacity-70">
                <Clock className="h-4 w-4" aria-hidden />
                Domicilios · 5:30 PM – 9:40 PM
              </p>
              <p className="mb-3 text-sm font-medium opacity-70">En el local atendemos hasta las 10:30 PM</p>
              <ul className="grid grid-cols-7 gap-1.5" aria-label="Días de atención">
                {WEEK.map(({ day, label }) => {
                  const closed = day === CLOSED_WEEKDAY
                  const isToday = day === today
                  return (
                    <li
                      key={day}
                      aria-label={`${WEEKDAYS[day]}${closed ? ": cerrado" : ""}${isToday ? " (hoy)" : ""}`}
                      className={`relative rounded-xl py-2 font-display text-sm font-extrabold ${
                        isToday ? "bg-jussi-brown text-jussi-beige" : closed ? "bg-jussi-brown/5 opacity-50" : "bg-white"
                      }`}
                    >
                      <span className={closed ? "line-through decoration-2" : ""}>{label}</span>
                      {isToday && (
                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-jussi-orange px-1.5 text-[10px] leading-4 text-jussi-brown">
                          hoy
                        </span>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>

            <button onClick={onBack} className="btn-pop btn-pop-red btn-pop-lg mt-8 w-full">
              <ArrowLeft className="h-5 w-5" />
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
