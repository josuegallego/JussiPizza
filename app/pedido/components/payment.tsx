"use client"

import { useState } from "react"
import { MessageCircle, CheckCircle, ArrowUpRight, X } from "lucide-react"
import type { OrderItem, DeliveryInfo } from "./order-flow"
import { PedidoHeader, PedidoPage, Section, OptionCard, PedidoActionBar, Field, useDraft, useToast } from "./pedido-ui"

interface PaymentProps {
  orderItems: OrderItem[]
  deliveryInfo: DeliveryInfo
  totalPrice: number
  deliveryCost: number
  onBack: () => void
  onComplete: () => void
}

export function Payment({ orderItems, deliveryInfo, totalPrice, deliveryCost, onBack, onComplete }: PaymentProps) {
  const toast = useToast()
  const [paymentMethod, setPaymentMethod] = useDraft<"cash" | "transfer" | "">("payment.paymentMethod", "")
  const [cashAmount, setCashAmount] = useDraft("payment.cashAmount", "")
  const [showSuccess, setShowSuccess] = useState(false)
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)

  const finalTotal = totalPrice + deliveryCost
  
  // Barrios que cubre Anturios
  const anturiosNeighborhoods = [
    "ANTURIOS",
    "RECANTO", 
    "VENTINO",
    "KOA",
    "HACIENDA EL PINO",
    "CONDADO DEL SUR",

    // Todos los de Parque Natura
    "PINARES PARQUE NATURA",
    "ARRAYANES PARQUE NATURA",
    "CELESTA PARQUE NATURA",
    "ROSETO PARQUE NATURA",
    "SOLARIA PARQUE NATURA",
    "AMBERES PARQUE NATURA",
    "TRENTO PARQUE NATURA",
    "FIORELI PARQUE NATURA",
    "ALTEA PARQUE NATURA",
    "SOLÉ PARQUE NATURA",
    "CATANIA PARQUE NATURA",
    "BRISSEA PARQUE NATURA"
  ]

  // Barrios especiales que requieren confirmación
  const specialNeighborhoods = [
    "LOS NARANJOS",
    "PANGOLA"
  ]

  // Función para determinar automáticamente la sede basada en el barrio
  const getSedeForNeighborhood = (neighborhood: string): "anturios" | "sachamate" | "ask" => {
    const normalizedNeighborhood = neighborhood.toUpperCase().trim()
    
    // Verificar si es un barrio especial que requiere confirmación
    const isSpecial = specialNeighborhoods.some(specialBarrio => 
      normalizedNeighborhood.includes(specialBarrio) || 
      specialBarrio.includes(normalizedNeighborhood)
    )
    
    if (isSpecial) {
      return "ask"
    }
    
    // Verificar si es un barrio de Anturios
    const isAnturios = anturiosNeighborhoods.some(anturiosBarrio => 
      normalizedNeighborhood.includes(anturiosBarrio) || 
      anturiosBarrio.includes(normalizedNeighborhood)
    )
    
    // También verificar si contiene "PARQUE NATURA" en el nombre
    const isParqueNatura = normalizedNeighborhood.includes("PARQUE NATURA")
    
    return (isAnturios || isParqueNatura) ? "anturios" : "sachamate"
  }

  // Function to parse cash amount with different formats (Colombian format)
  const parseCashAmount = (value: string): number => {
    if (!value) return 0
    
    let cleaned = value.replace(/\s/g, "")
    
    if (cleaned.includes(",") && cleaned.includes(".")) {
      cleaned = cleaned.replace(/\./g, "").replace(",", ".")
    } else if (cleaned.includes(",")) {
      const commaIndex = cleaned.lastIndexOf(",")
      const afterComma = cleaned.substring(commaIndex + 1)
      
      if (afterComma.length <= 2 && /^\d+$/.test(afterComma)) {
        cleaned = cleaned.replace(",", ".")
      } else {
        cleaned = cleaned.replace(/,/g, "")
      }
    } else if (cleaned.includes(".")) {
      const dotCount = (cleaned.match(/\./g) || []).length
      const lastDotIndex = cleaned.lastIndexOf(".")
      const afterLastDot = cleaned.substring(lastDotIndex + 1)
      
      if (dotCount === 1 && afterLastDot.length <= 2 && afterLastDot.length > 0 && parseInt(afterLastDot) < 100) {
        cleaned = cleaned.replace(/\./g, "")
      } else {
        cleaned = cleaned.replace(/\./g, "")
      }
    }
    
    return Number.parseFloat(cleaned) || 0
  }

  const handleCashAmountChange = (value: string) => {
    const sanitized = value.replace(/[^0-9.,\s]/g, "")
    setCashAmount(sanitized)
  }

  const currentCashAmount = parseCashAmount(cashAmount)

  const handleWhatsApp = () => {
    if (!paymentMethod) return toast("Elige cómo vas a pagar: efectivo o transferencia.")
    if (paymentMethod === "cash" && !cashAmount) return toast("Escribe con cuánto vas a pagar para tener tu cambio listo.")
    if (paymentMethod === "cash" && currentCashAmount < finalTotal) {
      return toast(`El monto debe ser al menos ${finalTotal.toLocaleString()}.`, "error")
    }

    // Determinar la sede
    if (deliveryInfo.type === "pickup" && deliveryInfo.location) {
      handleWhatsAppSend(deliveryInfo.location)
    } else if (deliveryInfo.type === "delivery" && deliveryInfo.neighborhood) {
      const sedeResult = getSedeForNeighborhood(deliveryInfo.neighborhood)
      
      if (sedeResult === "ask") {
        // Mostrar modal de selección
        setShowLocationModal(true)
      } else {
        handleWhatsAppSend(sedeResult)
      }
    } else {
      setShowWhatsAppModal(true)
    }
  }

  const handleWhatsAppSend = (selectedLocation: "anturios" | "sachamate") => {
    const orderSummary = orderItems
      .map((item) => {
        let itemText = `• ${item.name}`
        if (item.size) {
          itemText += ` - ${item.size}`
        }
        if (item.base && item.type === "desgranado") {
          itemText += ` (con ${item.base})`
        }
        itemText += ` (${item.quantity}x) - $${item.price.toLocaleString()}`
        return itemText
      })
      .join("\n")

    const deliveryText =
      deliveryInfo.type === "delivery"
        ? `Domicilio:\nNombre: ${deliveryInfo.name}\nTelefono: ${deliveryInfo.phone}\nDireccion: ${deliveryInfo.address}\nBarrio: ${deliveryInfo.neighborhood}\n${deliveryInfo.observations ? `Observaciones: ${deliveryInfo.observations}\n` : ""}`
        : `Recoger en: ${selectedLocation === "anturios" ? "Sede Anturios" : "Sede Sachamate"}\nNombre: ${deliveryInfo.name}\nTelefono: ${deliveryInfo.phone}\n`

    const paymentText =
      paymentMethod === "cash"
        ? `Pago: Efectivo - Con $${Math.floor(currentCashAmount).toLocaleString()}`
        : `Pago: Transferencia (enviaré comprobante)`

    const message = `*¡Hola, quisiera hacer este pedido por favor!*

${orderSummary}

Subtotal: $${totalPrice.toLocaleString()}
${deliveryCost > 0 ? `Domicilio: $${deliveryCost.toLocaleString()}` : ""}
TOTAL: $${finalTotal.toLocaleString()}

${deliveryText}

${paymentText}

Muchas gracias!`

    const phoneNumber = selectedLocation === "anturios" ? "573168403329" : "573172697230"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    setShowLocationModal(false)
    setShowWhatsAppModal(false)
  }

  const handleCompleteOrder = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onComplete()
    }, 3000)
  }

  const cashInvalid = paymentMethod === "cash" && (!cashAmount || currentCashAmount < finalTotal)

  // Modal para elegir la sede (barrios especiales o si no se pudo determinar)
  const renderSedeModal = (open: boolean, onClose: () => void) => {
    if (!open) return null

    const sedes = [
      { id: "sachamate" as const, name: "Sede Sachamate", hint: "Barrio al lado del parque Sachamate", bg: "bg-white" },
      { id: "anturios" as const, name: "Sede Anturios", hint: "Sector de Alfaguara / Parque Natura", bg: "bg-jussi-orange" },
    ]

    return (
      <div
        className="fixed inset-0 z-50 flex items-end justify-center bg-jussi-brown/70 p-4 backdrop-blur-sm sm:items-center"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Elegir sede"
      >
        <div className="card-soft animate-fade-in w-full max-w-md bg-jussi-beige p-6" onClick={(e) => e.stopPropagation()}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h3 className="font-display text-2xl font-extrabold">¿A qué sede enviamos tu pedido?</h3>
              <p className="mt-1 opacity-80">Elige la ubicación más cercana a ti</p>
            </div>
            <button
              onClick={onClose}
              aria-label="Cerrar"
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            {sedes.map((sede) => (
              <button
                key={sede.id}
                onClick={() => handleWhatsAppSend(sede.id)}
                className={`btn-pop ${sede.bg} w-full !justify-between !rounded-2xl !py-4 text-left`}
              >
                <span>
                  <span className="block text-lg font-extrabold">{sede.name}</span>
                  <span className="block text-base font-medium opacity-80">{sede.hint}</span>
                </span>
                <ArrowUpRight className="h-6 w-6 flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-jussi-beige p-4 font-sans text-jussi-brown">
        <div className="card-soft w-full max-w-md bg-white p-8 text-center">
          <span className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-jussi-orange">
            <CheckCircle className="h-10 w-10" />
          </span>
          <h2 className="font-display text-3xl font-extrabold">¡Pedido cancelado!</h2>
          <p className="mt-3 text-lg opacity-80">Esperamos poder servirte en una próxima ocasión. ¡Hasta luego!</p>
          <p className="mt-4 text-base font-semibold opacity-80">Redirigiendo al inicio…</p>
        </div>
      </div>
    )
  }

  return (
    <PedidoPage>
      <PedidoHeader title="Pago" onBack={onBack} step={4} />

      <main className="mx-auto max-w-md px-4 pb-64 pt-6 md:max-w-2xl">
        {/* Resumen */}
        <section className="card-soft mb-6 bg-jussi-brown p-5 text-jussi-beige">
          <h2 className="font-display text-xl font-extrabold">Resumen del pedido</h2>
          <ul className="mt-4 space-y-2 text-base">
            {orderItems.map((item, index) => (
              <li key={index} className="flex justify-between gap-3">
                <span className="opacity-85">
                  {item.name} <span className="opacity-80">({item.quantity}x)</span>
                </span>
                <span className="flex-shrink-0 font-semibold">${item.price.toLocaleString()}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t-2 border-dashed border-jussi-beige/30 pt-3">
            <div className="flex justify-between">
              <span className="opacity-80">Subtotal</span>
              <span className="font-semibold">${totalPrice.toLocaleString()}</span>
            </div>
            {deliveryCost > 0 && (
              <div className="flex justify-between">
                <span className="opacity-80">Domicilio</span>
                <span className="font-semibold">${deliveryCost.toLocaleString()}</span>
              </div>
            )}
            <div className="flex items-end justify-between pt-1">
              <span className="font-display text-lg font-bold">Total</span>
              <span className="font-display text-3xl font-extrabold text-jussi-orange">${finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </section>

        <Section title="Método de pago">
          <div className="space-y-3" role="radiogroup" aria-label="Método de pago">
            <OptionCard
              selected={paymentMethod === "cash"}
              onSelect={() => setPaymentMethod("cash")}
              title="💰 Efectivo"
              description="Pagas al recibir tu pedido"
            />
            <OptionCard
              selected={paymentMethod === "transfer"}
              onSelect={() => setPaymentMethod("transfer")}
              title="💳 Transferencia"
              description="Envías el comprobante por WhatsApp"
            />
          </div>
        </Section>

        {paymentMethod === "cash" && (
          <Section title="¿Con cuánto vas a pagar? *" hint="Así sabemos cuánto cambio tenerte listo">
            <Field
              id="cashAmount"
              label="¿Con cuánto pagas? (monto en efectivo)"
              inputMode="numeric"
              value={cashAmount}
              onChange={handleCashAmountChange}
              hint={`Mínimo: ${finalTotal.toLocaleString()}`}
            />
            <div className="mt-2 text-base font-semibold">
              {cashAmount && currentCashAmount > 0 && (
                <p className="text-green-700">Monto ingresado: ${Math.floor(currentCashAmount).toLocaleString()}</p>
              )}
              {cashAmount && currentCashAmount < finalTotal && (
                <p className="text-jussi-red">El monto debe ser mayor o igual a ${finalTotal.toLocaleString()}</p>
              )}
              {!cashAmount && <p className="text-jussi-red">* Campo obligatorio</p>}
            </div>
          </Section>
        )}

        {paymentMethod === "transfer" && (
          <div className="card-soft mb-6 bg-jussi-orange p-5 font-semibold">
            Comunícate por WhatsApp para enviar el comprobante de transferencia.
          </div>
        )}
      </main>

      <PedidoActionBar>
        <button
          onClick={handleWhatsApp}
          aria-disabled={!paymentMethod || cashInvalid}
          className={`btn-pop btn-pop-red btn-pop-lg w-full ${!paymentMethod || cashInvalid ? "opacity-60" : ""}`}
        >
          <MessageCircle className="h-5 w-5" />
          Enviar pedido por WhatsApp
        </button>
        <button onClick={handleCompleteOrder} className="btn-pop btn-pop-beige btn-pop-sm w-full">
          Cancelar pedido
        </button>
      </PedidoActionBar>

      {renderSedeModal(showLocationModal, () => setShowLocationModal(false))}
      {renderSedeModal(showWhatsAppModal, () => setShowWhatsAppModal(false))}
    </PedidoPage>
  )
}
