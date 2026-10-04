"use client"

import { useState, useEffect } from "react"
import { ItemSelection } from "./item-selection"
import { PizzaOrder } from "./pizza-order"
import { LasanaOrder } from "./lasana-order"
import { DesgranandoOrder } from "./desgranado-order"
import { BebidaOrder } from "./bebida-order"
import { OrderSummary } from "./order-summary"
import { DeliveryInfoComponent } from "./delivery-info"
import { Payment } from "./payment"
import { useFlowDirection, DraftProvider, useClearDrafts, ToastProvider, useToast, OrderProvider } from "./pedido-ui"

interface OrderFlowProps {
  onBack: () => void
}

export interface OrderItem {
  id: string
  type: "pizza" | "lasana" | "desgranado" | "bebida"
  name: string
  quantity: number
  size?: string
  flavors?: string[]
  base?: string
  details?: string
  price: number
}

export interface DeliveryInfo {
  type: "delivery" | "pickup"
  name?: string
  phone?: string
  address?: string
  observations?: string
  location?: "anturios" | "sachamate"
  neighborhood?: string
  deliveryCost?: number
}

function OrderFlowInner({ onBack }: OrderFlowProps) {
  const clearDrafts = useClearDrafts()
  const toast = useToast()
  const [currentStep, setCurrentStep] = useState<
    "selection" | "pizza" | "lasana" | "desgranado" | "bebida" | "summary" | "delivery" | "payment"
  >("selection")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)
  const [isOutOfService, setIsOutOfService] = useState(false)
  const [outOfServiceMessage, setOutOfServiceMessage] = useState("")
   
  
  const checkBusinessHours = () => {
  const now = new Date()

// 🚫 Días especiales sin servicio (03 al 05 de agosto de 2026)
  const specialCloseStart = new Date(2026, 7, 3, 0, 0, 0) // 7 = Agosto
  const specialCloseEnd = new Date(2026, 7, 5, 0, 0, 0)

  if (now >= specialCloseStart && now <= specialCloseEnd) {
    setIsOutOfService(true)
    setOutOfServiceMessage(
      "🚫 Hoy no tenemos servicio por motivos de fuerza mayor.\n" +
      "Volvemos el miércoles 5 de agosto. 🍕\n" +
      "Gracias por su comprensión. 🙏"
    )
    return false
  }
  const currentDay = now.getDay()
  const currentHour = now.getHours()
  const currentMinute = now.getMinutes()
  const currentTime = currentHour + currentMinute / 60


    // Check if it's Tuesday (day 2)
    if (currentDay === 2) {
      setIsOutOfService(true)
      setOutOfServiceMessage("🚫 Los martes no tenemos servicio. ¡Te esperamos mañana a partir de las 5:30 PM!")
      return false
    }

    // Check if it's before 5:30 PM (17:30)
    if (currentTime < 17.5) {
      setIsOutOfService(true)
      setOutOfServiceMessage("⏰ Aún no estamos abiertos. Nuestro horario de atención a domicilio es de 5:30 PM a 9:40 PM")
      return false
    }

    // Check if it's after 9:40 PM (21:40)
    if (currentTime >= 21.667) {
      setIsOutOfService(true)
      setOutOfServiceMessage("🌙 Ya cerramos por hoy. Nuestro horario de atención a domicilio es de 5:30 PM a 9:40 PM")
      return false
    }

    setIsOutOfService(false)
    return true
  }

  useEffect(() => {
    checkBusinessHours()
  }, [])

  // Posición de cada paso en el flujo, para saber si se avanza o se retrocede
  const stepIndex = { selection: 0, pizza: 1, lasana: 1, desgranado: 1, bebida: 1, summary: 2, delivery: 3, payment: 4 }[
    currentStep
  ]
  const direction = useFlowDirection(stepIndex)

  const renderStep = () => {
  // Fuera de servicio
  if (isOutOfService) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-jussi-beige p-4 font-sans text-jussi-brown">
        <div className="card-soft w-full max-w-md overflow-hidden bg-white">
          <div className="border-b border-jussi-brown/15 bg-jussi-red p-6 text-center text-white">
            <p className="font-display text-2xl font-extrabold">🍕 Jussi Pizza</p>
          </div>
          <div className="p-6 text-center md:p-8">
            <div className="mb-3 text-6xl">😴</div>
            <h2 className="font-display text-3xl font-extrabold">Fuera de servicio</h2>
            <p className="mt-3 whitespace-pre-line text-lg leading-relaxed opacity-80">{outOfServiceMessage}</p>

            <div className="mt-6 rounded-2xl ring-1 ring-jussi-brown/15 bg-jussi-orange/30 p-4 text-left">
              <h3 className="mb-1 font-display font-bold">📅 Horarios de atención</h3>
              <p>
                <strong>Lunes a domingo:</strong> 5:30 PM – 9:40 PM
                <br />
                <strong>Martes:</strong> cerrado
              </p>
            </div>

            <button onClick={onBack} className="btn-pop btn-pop-red btn-pop-lg mt-6 w-full">
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    )
  }

  const addItem = (item: OrderItem) => {
    // El formulario de ese producto vuelve a empezar en blanco para el siguiente
    clearDrafts(`${item.type}.`)
    setOrderItems((prev) => [...prev, { ...item, id: Date.now().toString() }])
    toast(`${item.name} añadido al pedido`, "success")
    setCurrentStep("summary")
  }

  const removeItem = (id: string) => {
    const removed = orderItems.find((item) => item.id === id)
    if (removed) toast(`Quitaste ${removed.name}`, "info")
    setOrderItems((prev) => prev.filter((item) => item.id !== id))
  }

  const getTotalPrice = () => {
    return orderItems.reduce((total, item) => total + item.price, 0)
  }

  if (currentStep === "pizza") {
    return <PizzaOrder onBack={() => setCurrentStep("selection")} onAddItem={addItem} />
  }

  if (currentStep === "lasana") {
    return <LasanaOrder onBack={() => setCurrentStep("selection")} onAddItem={addItem} />
  }

  if (currentStep === "desgranado") {
    return <DesgranandoOrder onBack={() => setCurrentStep("selection")} onAddItem={addItem} />
  }

  if (currentStep === "bebida") {
    return <BebidaOrder onBack={() => setCurrentStep("selection")} onAddItem={addItem} />
  }

  if (currentStep === "summary") {
    return (
      <OrderSummary
        items={orderItems}
        onBack={() => setCurrentStep("selection")}
        onRemoveItem={removeItem}
        onContinue={() => setCurrentStep("delivery")}
        onAddMore={() => setCurrentStep("selection")}
        totalPrice={getTotalPrice()}
        deliveryCost={deliveryInfo?.deliveryCost || 0}
      />
    )
  }

  if (currentStep === "delivery") {
    return (
      <DeliveryInfoComponent
        onBack={() => setCurrentStep("summary")}
        onContinue={(info) => {
          setDeliveryInfo(info)
          setCurrentStep("payment")
        }}
      />
    )
  }

  if (currentStep === "payment") {
    return (
      <Payment
        orderItems={orderItems}
        deliveryInfo={deliveryInfo!}
        totalPrice={getTotalPrice()}
        deliveryCost={deliveryInfo?.deliveryCost || 0}
        onBack={() => setCurrentStep("delivery")}
        onComplete={() => {
          // Reset order
          setOrderItems([])
          setDeliveryInfo(null)
          setCurrentStep("selection")
          onBack()
        }}
      />
    )
  }

  return (
    <ItemSelection
      onBack={onBack}
      onSelectItem={(type) => setCurrentStep(type)}
      hasItems={orderItems.length > 0}
      onViewSummary={() => setCurrentStep("summary")}
    />
  )
  }

  return (
    <OrderProvider value={{ items: orderItems, deliveryCost: deliveryInfo?.deliveryCost || 0 }}>
      <div key={currentStep} className={direction === "forward" ? "flow-forward" : "flow-back"}>
        {renderStep()}
      </div>
    </OrderProvider>
  )
}

export function OrderFlow(props: OrderFlowProps) {
  return (
    <DraftProvider>
      <ToastProvider>
        <OrderFlowInner {...props} />
      </ToastProvider>
    </DraftProvider>
  )
}
