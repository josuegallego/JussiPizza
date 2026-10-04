"use client"

import { ArrowRight, ShoppingCart } from "lucide-react"
import { PedidoHeader, PedidoPage, PedidoBody } from "./pedido-ui"

interface ItemSelectionProps {
  onBack: () => void
  onSelectItem: (type: "pizza" | "lasana" | "desgranado" | "bebida") => void
  hasItems: boolean
  onViewSummary: () => void
}

const items = [
  { type: "pizza" as const, emoji: "🍕", name: "Pizza", description: "Gran variedad de sabores", bg: "bg-jussi-red text-white" },
  { type: "lasana" as const, emoji: "🍝", name: "Lasaña", description: "Las mejores lasañas caseras", bg: "bg-jussi-orange" },
  { type: "desgranado" as const, emoji: "🌽", name: "Desgranado", description: "Como la lasaña, pero con maíz o maduro", bg: "bg-jussi-green" },
  { type: "bebida" as const, emoji: "🥤", name: "Bebida", description: "Jugos naturales y gaseosas", bg: "bg-white" },
]

export function ItemSelection({ onBack, onSelectItem, hasItems, onViewSummary }: ItemSelectionProps) {
  return (
    <PedidoPage>
      <PedidoHeader title="Hacer pedido" onBack={onBack} step={1} />

      <PedidoBody
        mobilePad="pb-32"
        actions={
          hasItems && (
            <button onClick={onViewSummary} className="btn-pop btn-pop-red btn-pop-lg w-full">
              <ShoppingCart className="h-5 w-5" />
              Ver resumen del pedido
            </button>
          )
        }
      >
        <div className="mb-8 lg:mb-6">
          <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl lg:text-4xl">
            ¿Qué se te <span className="text-jussi-red">antoja</span>?
          </h2>
          <p className="mt-2 text-lg opacity-80">Elige una categoría para empezar tu pedido.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {items.map((item) => (
            <button
              key={item.type}
              onClick={() => onSelectItem(item.type)}
              className={`card-soft group relative flex aspect-[4/5] flex-col justify-between p-4 text-left transition-transform duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-1 active:translate-y-1 active:shadow-none md:aspect-[4/3] md:p-6 lg:aspect-auto lg:min-h-[10.5rem] lg:gap-6 ${item.bg}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-jussi-beige text-3xl md:h-16 md:w-16 md:text-4xl lg:h-14 lg:w-14 lg:text-3xl">
                {item.emoji}
              </span>
              <span className="min-w-0">
                {/* El nombre se reduce en pantallas angostas para que "Desgranado" quepa entero */}
                <span className="block font-display text-lg font-extrabold min-[380px]:text-xl md:text-3xl lg:text-2xl">{item.name}</span>
                <span className="mt-1 block text-base font-medium leading-snug opacity-80">{item.description}</span>
              </span>
              <ArrowRight className="absolute right-4 top-4 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </button>
          ))}
        </div>
      </PedidoBody>
    </PedidoPage>
  )
}
