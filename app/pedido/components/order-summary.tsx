"use client"

import { Trash2, Plus, ArrowRight, ShoppingBag } from "lucide-react"
import type { OrderItem } from "./order-flow"
import { PedidoHeader, PedidoPage, PedidoActionBar } from "./pedido-ui"

interface OrderSummaryProps {
  items: OrderItem[]
  onBack: () => void
  onRemoveItem: (id: string) => void
  onContinue: () => void
  onAddMore: () => void
  totalPrice: number
  deliveryCost: number
}

const emojiByType: Record<OrderItem["type"], string> = {
  pizza: "🍕",
  lasana: "🍝",
  desgranado: "🌽",
  bebida: "🥤",
}

export function OrderSummary({
  items,
  onBack,
  onRemoveItem,
  onContinue,
  onAddMore,
  totalPrice,
  deliveryCost,
}: OrderSummaryProps) {
  const finalTotal = totalPrice + deliveryCost

  return (
    <PedidoPage>
      <PedidoHeader title="Tu pedido" onBack={onBack} step={2} />

      <main className={`mx-auto max-w-md px-4 pt-6 md:max-w-2xl ${items.length > 0 ? "pb-44" : "pb-10"}`}>
        {items.length === 0 ? (
          <div className="card-soft mt-6 bg-white px-6 py-12 text-center">
            <span className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-jussi-orange">
              <ShoppingBag className="h-8 w-8" />
            </span>
            <p className="font-display text-2xl font-extrabold">Tu pedido está vacío</p>
            <p className="mb-6 mt-1 opacity-80">Añade algo delicioso para empezar.</p>
            <button onClick={onAddMore} className="btn-pop btn-pop-orange btn-pop-lg">
              <Plus className="h-5 w-5" />
              Añadir productos
            </button>
          </div>
        ) : (
          <>
            <p className="mb-4 font-display text-base font-bold uppercase tracking-widest opacity-80">
              {items.length} {items.length === 1 ? "producto" : "productos"}
            </p>

            <ul className="mb-6 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="card-soft flex items-start gap-3 bg-white p-4">
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-jussi-beige text-2xl">
                    {emojiByType[item.type]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-extrabold leading-tight">{item.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-1.5 text-sm font-semibold">
                      <span className="rounded-full bg-jussi-brown px-2.5 py-0.5 text-jussi-beige">x{item.quantity}</span>
                      {item.size && <span className="rounded-full bg-jussi-orange/40 px-2.5 py-0.5">{item.size}</span>}
                      {item.base && <span className="rounded-full bg-jussi-brown/10 px-2.5 py-0.5">{item.base}</span>}
                    </div>
                    {item.flavors && item.flavors.length > 0 && (
                      <p className="mt-2 text-base opacity-80">{item.flavors.join(", ")}</p>
                    )}
                    <p className="mt-2 font-display text-xl font-extrabold">${item.price.toLocaleString()}</p>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Quitar ${item.name}`}
                    className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-white transition-colors hover:bg-jussi-red hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="card-soft bg-jussi-brown p-5 text-jussi-beige">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="opacity-80">Subtotal</span>
                  <span className="font-semibold">${totalPrice.toLocaleString()}</span>
                </div>
                {deliveryCost > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="opacity-80">Domicilio</span>
                    <span className="font-semibold">${deliveryCost.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex items-end justify-between border-t-2 border-dashed border-jussi-beige/30 pt-3">
                  <span className="font-display text-lg font-bold">Total</span>
                  <span className="font-display text-4xl font-extrabold text-jussi-orange">
                    ${finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      {items.length > 0 && (
        <PedidoActionBar>
          <button onClick={onAddMore} className="btn-pop btn-pop-beige btn-pop-sm w-full">
            <Plus className="h-5 w-5" />
            Añadir más productos
          </button>
          <button onClick={onContinue} className="btn-pop btn-pop-red btn-pop-lg w-full">
            Continuar con el pedido
            <ArrowRight className="h-5 w-5" />
          </button>
        </PedidoActionBar>
      )}
    </PedidoPage>
  )
}
