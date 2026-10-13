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
import { OutOfService, getOutOfServiceReason, previewTime, type OutOfServiceReason } from "./out-of-service"
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
  const [outOfService, setOutOfService] = useState<OutOfServiceReason | null>(null)
  const [previewNow, setPreviewNow] = useState<Date>()

  useEffect(() => {
    // Solo en desarrollo: /pedido?fuera=early|closed|tuesday|special muestra el aviso con una hora de ejemplo
    const preview = new URLSearchParams(window.location.search).get("fuera") as OutOfServiceReason | null
    if (process.env.NODE_ENV === "development" && preview) {
      setOutOfService(preview)
      setPreviewNow(previewTime(preview))
      return
    }
    setOutOfService(getOutOfServiceReason())
  }, [])

  // Posición de cada paso en el flujo, para saber si se avanza o se retrocede
  const stepIndex = { selection: 0, pizza: 1, lasana: 1, desgranado: 1, bebida: 1, summary: 2, delivery: 3, payment: 4 }[
    currentStep
  ]
  const direction = useFlowDirection(stepIndex)

  const renderStep = () => {
  // Fuera de servicio
  if (outOfService) {
    return <OutOfService reason={outOfService} onBack={onBack} simulatedNow={previewNow} />
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
