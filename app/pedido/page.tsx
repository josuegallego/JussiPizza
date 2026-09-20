"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuView } from "./components/menu-view"
import { OrderFlow } from "./components/order-flow"
import { useFlowDirection } from "./components/pedido-ui"
import { DynamicBackground } from "./components/dynamic-bg"
import { Pizza, Utensils, Clock, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "menu" | "order">("home")
  const direction = useFlowDirection({ home: 0, menu: 1, order: 2 }[currentView])
  const flowClass = direction === "forward" ? "flow-forward" : "flow-back"

  if (currentView === "menu") {
    return (
      <div key="menu" className={flowClass}>
        <MenuView onStartOrder={() => setCurrentView("order")} onBack={() => setCurrentView("home")} />
      </div>
    )
  }

  if (currentView === "order") {
    return (
      <div key="order" className={flowClass}>
        <OrderFlow onBack={() => setCurrentView("home")} />
      </div>
    )
  }

  return (
    <div key="home" className={`${flowClass} relative flex min-h-[100svh] flex-col overflow-hidden bg-jussi-beige font-sans text-jussi-brown`}>
      <DynamicBackground />

      <main className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-10">
        <div className="mb-10 text-center">
          <Link
            href="/"
            aria-label="Ir a la página principal"
            className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-pop-lg ring-1 ring-jussi-brown/15 transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <img src="/logo.png" alt="Jussi Pizza" className="h-24 w-24 rounded-full object-contain" />
          </Link>
          <h1 className="font-display text-6xl font-extrabold uppercase leading-[0.9]">
            Jussi
            <br />
            <span className="text-jussi-red">Pizza</span>
          </h1>
          <p className="mt-4 font-display text-lg font-bold">Jamundí, Colombia</p>
          <span className="sticker mt-3 -rotate-2 bg-jussi-orange">🏆 Ganadores Pizza Fest 2021</span>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setCurrentView("menu")}
            className="btn-pop btn-pop-green btn-pop-lg w-full !justify-between !py-5"
          >
            <span className="flex items-center gap-3">
              <Utensils className="h-6 w-6" /> Ver menú
            </span>
            <ArrowRight className="h-6 w-6" />
          </button>
          <button
            onClick={() => setCurrentView("order")}
            className="btn-pop btn-pop-red btn-pop-lg w-full !justify-between !py-5"
          >
            <span className="flex items-center gap-3">
              <Pizza className="h-6 w-6" /> Hacer pedido
            </span>
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        <div className="card-soft mt-10 flex items-start gap-3 bg-white p-4">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-jussi-beige">
            <Clock className="h-5 w-5" />
          </span>
          <div className="text-base">
            <p className="font-display font-bold">Horario de atención</p>
            <p>Miércoles a lunes · 5:30 – 10:30 PM</p>
            <p className="font-semibold text-jussi-red">Los martes no tenemos servicio</p>
          </div>
        </div>
      </main>
    </div>
  )
}
