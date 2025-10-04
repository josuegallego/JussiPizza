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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

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
  const [isOutOfService, setIsOutOfService] = useState(false)
  const [outOfServiceMessage, setOutOfServiceMessage] = useState("")
   
  
  const checkBusinessHours = () => {
    const now = new Date()
    const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, 2 = Tuesday, etc.
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
      setOutOfServiceMessage("⏰ Aún no estamos abiertos. Nuestro horario de atención es de 5:30 PM a 10:00 PM")
      return false
    }

    // Check if it's after 10:00 PM (22:00)
    if (currentTime >= 22) {
      setIsOutOfService(true)
      setOutOfServiceMessage("🌙 Ya cerramos por hoy. Nuestro horario de atención es de 5:30 PM a 10:00 PM")
      return false
    }

    setIsOutOfService(false)
    return true
  }

  useEffect(() => {
    checkBusinessHours()
  }, [])

  // // Out of Service Modal
  if (isOutOfService) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-2 border-red-200 shadow-2xl">
          <CardHeader className="text-center bg-gradient-to-r from-red-500 to-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">🍕 Jussi Pizza</CardTitle>
          </CardHeader>
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">😴</div>
            <h2 className="text-2xl font-bold text-red-800 mb-4">Fuera de Servicio</h2>
            <p className="text-red-700 mb-6 text-lg leading-relaxed">{outOfServiceMessage}</p>
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 mb-6">
              <h3 className="font-bold text-orange-800 mb-2">📅 Horarios de Atención:</h3>
              <p className="text-orange-700">
                <strong>Lunes a Domingo:</strong> 5:30 PM - 10:00 PM
                <br />
                <strong>Martes:</strong> Cerrado
              </p>
            </div>
            <Button
              onClick={onBack}
              className="w-full h-12 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
            >
              Volver al Inicio
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

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
