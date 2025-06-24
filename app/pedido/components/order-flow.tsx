"use client"

import { useState } from "react"
import { ItemSelection } from "./item-selection"
import { PizzaOrder } from "./pizza-order"
import { LasanaOrder } from "./lasana-order"
import { DesgranandoOrder } from "./desgranado-order"
import { BebidaOrder } from "./bebida-order"
import { OrderSummary } from "./order-summary"
import { DeliveryInfoComponent } from "./delivery-info"
import { Payment } from "./payment"

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

export function OrderFlow({ onBack }: OrderFlowProps) {
  const [currentStep, setCurrentStep] = useState<
    "selection" | "pizza" | "lasana" | "desgranado" | "bebida" | "summary" | "delivery" | "payment"
  >("selection")
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)

  const addItem = (item: OrderItem) => {
    setOrderItems((prev) => [...prev, { ...item, id: Date.now().toString() }])
    setCurrentStep("summary")
  }

  const removeItem = (id: string) => {
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
