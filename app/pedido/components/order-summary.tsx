"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Trash2, Plus } from "lucide-react"
import type { OrderItem } from "./order-flow"

interface OrderSummaryProps {
  items: OrderItem[]
  onBack: () => void
  onRemoveItem: (id: string) => void
  onContinue: () => void
  onAddMore: () => void
  totalPrice: number
  deliveryCost: number
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            
          </Button>
          <h1 className="text-xl font-bold text-brown-900">Resumen del Pedido</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-32">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brown-600 text-lg mb-4">No hay productos en tu pedido</p>
            <Button onClick={onAddMore} className="bg-green-500 hover:bg-green-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Añadir productos
            </Button>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <Card key={item.id} className="border-2 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-brown-900">{item.name}</h3>
                        <div className="text-sm text-brown-600 mt-1">
                          <p>Cantidad: {item.quantity}</p>
                          {item.size && <p>Tamaño: {item.size}</p>}
                          {item.base && <p>Base: {item.base}</p>}
                          {item.flavors && item.flavors.length > 0 && <p>Sabor(es): {item.flavors.join(", ")}</p>}
                        </div>
                        <p className="font-bold text-green-600 mt-2">${item.price.toLocaleString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Total */}
            <Card className="border-2 border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-brown-900">Subtotal:</span>
                    <span className="text-lg font-medium text-brown-900">${totalPrice.toLocaleString()}</span>
                  </div>
                  {deliveryCost > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-brown-900">Domicilio:</span>
                      <span className="text-lg font-medium text-brown-900">${deliveryCost.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-brown-900">Total:</span>
                      <span className="text-2xl font-bold text-orange-600">${finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Fixed Action Buttons */}
      {items.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-20">
          <div className="max-w-md mx-auto space-y-3">
            <Button
              onClick={onAddMore}
              variant="outline"
              className="w-full h-12 text-lg font-semibold border-2 border-green-500 text-green-600 hover:bg-green-50"
            >
              <Plus className="w-5 h-5 mr-2" />
              Añadir más productos
            </Button>
            <Button
              onClick={onContinue}
              className="w-full h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
            >
              Continuar con el pedido
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
