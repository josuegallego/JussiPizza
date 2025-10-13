"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, MessageCircle, CheckCircle } from "lucide-react"
import type { OrderItem, DeliveryInfo } from "./order-flow"

interface PaymentProps {
  orderItems: OrderItem[]
  deliveryInfo: DeliveryInfo
  totalPrice: number
  deliveryCost: number
  onBack: () => void
  onComplete: () => void
}

export function Payment({ orderItems, deliveryInfo, totalPrice, deliveryCost, onBack, onComplete }: PaymentProps) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "transfer" | "">("")
  const [cashAmount, setCashAmount] = useState("")
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
    if (paymentMethod === "cash" && (!cashAmount || currentCashAmount < finalTotal)) {
      return
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

  // Modal para seleccionar sede en barrios especiales
  const renderLocationModal = () => {
    if (!showLocationModal) return null

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-in fade-in zoom-in-95">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#F22233] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-[#231107] mb-2">¿En cuál sede deseas ordenar?</h3>
            <p className="text-[#231107]/70 mb-6">Selecciona la ubicación más cercana a ti</p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleWhatsAppSend("sachamate")}
                className="w-full bg-[#4EBF4B] hover:bg-[#4EBF4B]/90 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="text-left">
                  <div className="font-bold">Sede Sachamate</div>
                  <div className="text-sm opacity-90">Barrio al lado del parque Sachamate</div>
                </div>
              </button>
              
              <button
                onClick={() => handleWhatsAppSend("anturios")}
                className="w-full bg-[#F27F1B] hover:bg-[#F27F1B]/90 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <div className="text-left">
                  <div className="font-bold">Sede Anturios</div>
                  <div className="text-sm opacity-90">Sector de Alfafuara/Parque natura</div>
                </div>
              </button>
            </div>
            
            <button
              onClick={() => setShowLocationModal(false)}
              className="text-[#231107]/50 hover:text-[#231107] transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-2 border-green-300 shadow-lg">
          <CardContent className="p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">¡Pedido Cancelado!</h2>
            <p className="text-green-700 mb-4">
              Esperamos poder servirte en una próxima ocasión, hasta luego!
            </p>
            <p className="text-sm text-green-600">Redirigiendo al inicio...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
          </Button>
          <h1 className="text-xl font-bold text-brown-900">Pago</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        {/* Order Summary */}
        <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-brown-900">Resumen del pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4">
              {orderItems.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-brown-700">
                    {item.name} ({item.quantity}x)
                  </span>
                  <span className="font-medium text-brown-900">${item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-brown-900">Subtotal:</span>
                <span className="text-base font-medium text-brown-900">${totalPrice.toLocaleString()}</span>
              </div>
              {deliveryCost > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-brown-900">Domicilio:</span>
                  <span className="text-base font-medium text-brown-900">${deliveryCost.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center border-t pt-1">
                <span className="text-lg font-bold text-brown-900">Total:</span>
                <span className="text-xl font-bold text-orange-600">${finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Método de pago</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="cash"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value as "cash")}
                className="w-4 h-4 text-green-600"
              />
              <Label htmlFor="cash" className="cursor-pointer text-lg font-medium text-brown-900">
                💰 Efectivo
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="transfer"
                name="paymentMethod"
                value="transfer"
                checked={paymentMethod === "transfer"}
                onChange={(e) => setPaymentMethod(e.target.value as "transfer")}
                className="w-4 h-4 text-green-600"
              />
              <Label htmlFor="transfer" className="cursor-pointer text-lg font-medium text-brown-900">
                💳 Transferencia
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Cash Amount Input */}
        {paymentMethod === "cash" && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-brown-900">¿Con cuánto vas a pagar? *</CardTitle>
            </CardHeader>
            <CardContent>
              <Label htmlFor="cashAmount" className="text-brown-900">
                Monto en efectivo
              </Label>
              <Input
                id="cashAmount"
                value={cashAmount}
                onChange={(e) => handleCashAmountChange(e.target.value)}
                placeholder={`Mínimo: ${finalTotal.toLocaleString()}`}
                className="mt-1"
              />
              <div className="mt-2 text-sm">
                {cashAmount && currentCashAmount > 0 && (
                  <p className="text-green-600">Monto ingresado: ${Math.floor(currentCashAmount).toLocaleString()}</p>
                )}
                {cashAmount && currentCashAmount < finalTotal && (
                  <p className="text-red-600 font-medium">
                    El monto debe ser mayor o igual a ${finalTotal.toLocaleString()}
                  </p>
                )}
                {paymentMethod === "cash" && !cashAmount && (
                  <p className="text-orange-600 font-medium">
                    * Campo obligatorio: Para saber cuánto cambio tenerte listo
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Transfer Instructions */}
        {paymentMethod === "transfer" && (
          <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <p className="text-blue-800 text-center font-medium">
                Comunícate por WhatsApp para enviar el comprobante de transferencia
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className="max-w-md mx-auto space-y-3">
          {paymentMethod && (
            <Button
              onClick={handleWhatsApp}
              disabled={paymentMethod === "cash" && (!cashAmount || currentCashAmount < finalTotal)}
              className="w-full h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-xl shadow-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Enviar pedido por WhatsApp
            </Button>
          )}
          <Button
            onClick={handleCompleteOrder}
            disabled={!paymentMethod || (paymentMethod === "cash" && (!cashAmount || currentCashAmount < finalTotal))}
            variant="outline"
            className="w-full h-12 text-lg font-semibold border-2 border-red-500 text-red-600 hover:bg-red-50 disabled:opacity-50"
          >
            Cancelar pedido
          </Button>
        </div>
      </div>

      {/* Location Selection Modal */}
      {renderLocationModal()}

      {/* WhatsApp Selection Modal - Fallback */}
      {showWhatsAppModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-sm border-2 border-green-200 shadow-2xl">
            <CardHeader className="text-center bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-xl">📱 Enviar Pedido</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-center text-brown-900 mb-6 font-medium">¿A cuál sede deseas enviar tu pedido?</p>
              <div className="space-y-4">
                <Button
                  onClick={() => handleWhatsAppSend("sachamate")}
                  className="w-full h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md"
                >
                  📍 Sede Sachamate
                  <span className="block text-sm opacity-90">Principal</span>
                </Button>
                <Button
                  onClick={() => handleWhatsAppSend("anturios")}
                  className="w-full h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md"
                >
                  📍 Sede Anturios
                  <span className="block text-sm opacity-90">Sector parque natura</span>
                </Button>
                <Button
                  onClick={() => setShowWhatsAppModal(false)}
                  variant="outline"
                  className="w-full h-12 text-lg font-medium border-2 border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}