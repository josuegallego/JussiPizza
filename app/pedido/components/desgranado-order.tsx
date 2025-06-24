"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import type { OrderItem } from "./order-flow"

interface DesgranandoOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function DesgranandoOrder({ onBack, onAddItem }: DesgranandoOrderProps) {
  const [quantity, setQuantity] = useState(1)
  const [base, setBase] = useState("")
  const [flavor, setFlavor] = useState("")

  const bases = [
    { name: "Maíz", price: 19000 },
    { name: "Maduro", price: 19000 },
  ]

  const flavors = [
    {
      name: "Ranchero",
      ingredients: "Queso, tocineta y pollo",
    },
    {
      name: "Campesino",
      ingredients: "Queso, pollo, tocineta y chorizo de ternera",
    },
    {
      name: "Americano",
      ingredients: "Queso, pollo y salchicha americana",
    },
  ]

  const handleAddToOrder = () => {
    if (!base || !flavor) return

    const selectedBase = bases.find((b) => b.name === base)!
    const selectedFlavor = flavors.find((f) => f.name === flavor)!
    const item: OrderItem = {
      id: "",
      type: "desgranado",
      name: `Desgranado ${flavor}`,
      quantity,
      base: selectedBase.name,
      flavors: [flavor],
      details: selectedFlavor.ingredients,
      price: selectedBase.price * quantity,
    }

    onAddItem(item)
  }

  const canAddToOrder = base && flavor

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
          <h1 className="text-xl font-bold text-brown-900">🌽 Desgranado</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
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

        {/* Base Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">¿Con qué lo quieres?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {bases.map((baseOption) => (
              <div key={baseOption.name} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={baseOption.name}
                  name="base"
                  value={baseOption.name}
                  checked={base === baseOption.name}
                  onChange={(e) => setBase(e.target.value)}
                  className="w-4 h-4 text-green-600"
                />
                <Label htmlFor={baseOption.name} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-brown-900">{baseOption.name}</div>
                    <div className="text-lg font-bold text-green-600">${baseOption.price.toLocaleString()}</div>
                  </div>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Flavor Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Elegir sabor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {flavors.map((flavorOption) => (
              <div key={flavorOption.name} className="border rounded-lg p-3 hover:bg-green-50 transition-colors">
                <div className="flex items-start space-x-3">
                  <input
                    type="radio"
                    id={flavorOption.name}
                    name="flavor"
                    value={flavorOption.name}
                    checked={flavor === flavorOption.name}
                    onChange={(e) => setFlavor(e.target.value)}
                    className="w-4 h-4 text-green-600 mt-1"
                  />
                  <Label htmlFor={flavorOption.name} className="cursor-pointer flex-1">
                    <div className="font-medium text-brown-900 mb-1">{flavorOption.name}</div>
                    <div className="text-sm text-brown-600">{flavorOption.ingredients}</div>
                    <div className="text-xs text-brown-500 mt-1">Con maíz o maduro</div>
                  </Label>
                </div>
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
            {canAddToOrder && base && (
              <span className="ml-2">- ${(bases.find((b) => b.name === base)!.price * quantity).toLocaleString()}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
