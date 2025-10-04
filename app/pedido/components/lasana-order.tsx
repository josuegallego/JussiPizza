"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import type { OrderItem } from "./order-flow"

interface LasanaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function LasanaOrder({ onBack, onAddItem }: LasanaOrderProps) {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("")

  const sizes = [
    { name: "Mini", price: 14000 },
    { name: "Personal", price: 22000 },
  ]

  const handleAddToOrder = () => {
    if (!size) return

    const selectedSize = sizes.find((s) => s.name === size)!
    const item: OrderItem = {
      id: "",
      type: "lasana",
      name: "Lasaña Mixta",
      quantity,
      size: selectedSize.name,
      flavors: ["Mixta"],
      details: "Pasta, queso, carne boloñesa y pollo",
      price: selectedSize.price * quantity,
    }

    onAddItem(item)
  }

  const canAddToOrder = size

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            
          </Button>
          <h1 className="text-xl font-bold text-brown-900">🍝 Lasaña</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        {/* Product Info */}
        <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4">
            <h3 className="text-lg font-bold text-brown-900 mb-2">Lasaña Mixta</h3>
            <p className="text-brown-700 text-sm">Pasta, queso, carne boloñesa y pollo</p>
          </CardContent>
        </Card>

        {/* Quantity */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Cantidad</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-full"
              >
                -
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="w-20 text-center"
                min="1"
              />
              <Button variant="outline" onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 rounded-full">
                +
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Size Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Seleccionar tamaño</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sizes.map((sizeOption) => (
              <div key={sizeOption.name} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={sizeOption.name}
                  name="size"
                  value={sizeOption.name}
                  checked={size === sizeOption.name}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <Label htmlFor={sizeOption.name} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-brown-900">{sizeOption.name}</div>
                    <div className="text-lg font-bold text-green-600">${sizeOption.price.toLocaleString()}</div>
                  </div>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Fixed Add Button */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleAddToOrder}
            disabled={!canAddToOrder}
            className="w-full h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl shadow-lg"
          >
            Añadir al pedido
            {canAddToOrder && size && (
              <span className="ml-2">- ${(sizes.find((s) => s.name === size)!.price * quantity).toLocaleString()}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
