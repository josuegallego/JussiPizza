"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import type { OrderItem } from "./order-flow"

interface BebidaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function BebidaOrder({ onBack, onAddItem }: BebidaOrderProps) {
  const [quantity, setQuantity] = useState(1)
  const [type, setType] = useState("")
  const [base, setBase] = useState("")
  const [flavor, setFlavor] = useState("")

  const types = [
    { name: "Jugo", price: 4000 },
    { name: "Frappé", price: 7000 },
    { name: "Limonada", price: 0 }, // Precio variable según sabor
    { name: "Gaseosa", price: 0 }, // Precio variable según marca y tamaño
  ]

  const juiceBases = ["En agua", "En leche"]
  const juiceFlavors = ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"]
  const frappeFlavors = ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"]

  const limonadaFlavors = [
    { name: "Natural", price: 6000 },
    { name: "Cerezada", price: 8000 },
    { name: "De coco", price: 9000 },
  ]

  const gaseosaOptions = [
    { brand: "Coca Cola", size: "Personal", price: 4000 },
    { brand: "Coca Cola", size: "Litro y medio", price: 7000 },
    { brand: "Postobón", size: "Personal", price: 4000 },
    { brand: "Postobón", size: "Litro y medio", price: 6000 },
  ]

  const getPrice = () => {
    const selectedType = types.find((t) => t.name === type)
    if (!selectedType) return 0

    if (type === "Jugo" || type === "Frappé") {
      return selectedType.price
    }

    if (type === "Limonada") {
      const selectedFlavor = limonadaFlavors.find((f) => f.name === flavor)
      return selectedFlavor?.price || 0
    }

    if (type === "Gaseosa") {
      const selectedOption = gaseosaOptions.find((g) => `${g.brand} ${g.size}` === flavor)
      return selectedOption?.price || 0
    }

    return 0
  }

  const handleAddToOrder = () => {
    if (!type || !flavor) return
    if (type === "Jugo" && !base) return

    let itemName = ""

    if (type === "Jugo") {
      itemName = `Jugo de ${flavor} ${base}`
    } else if (type === "Frappé") {
      itemName = `Frappé de ${flavor}`
    } else if (type === "Limonada") {
      itemName = `Limonada ${flavor}`
    } else if (type === "Gaseosa") {
      itemName = flavor // Ya incluye marca y tamaño
    }

    const item: OrderItem = {
      id: "",
      type: "bebida",
      name: itemName,
      quantity,
      base: type === "Jugo" ? base : undefined,
      flavors: [flavor],
      price: getPrice() * quantity,
    }

    onAddItem(item)
  }

  const canAddToOrder = type && flavor && (type !== "Jugo" || base)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
          <h1 className="text-xl font-bold text-brown-900">🥤 Bebida</h1>
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

        {/* Type Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Elegir tipo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {types.map((typeOption) => (
              <div key={typeOption.name} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={typeOption.name}
                  name="type"
                  value={typeOption.name}
                  checked={type === typeOption.name}
                  onChange={(e) => {
                    setType(e.target.value)
                    setBase("")
                    setFlavor("")
                  }}
                  className="w-4 h-4 text-green-600"
                />
                <Label htmlFor={typeOption.name} className="flex-1 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div className="font-medium text-brown-900">{typeOption.name}</div>
                    {typeOption.price > 0 && typeOption.name !== "Jugo" && typeOption.name !== "Frappé" && (
                      <div className="text-lg font-bold text-green-600">${typeOption.price.toLocaleString()}</div>
                    )}
                  </div>
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Base Selection for Juices */}
        {type === "Jugo" && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-brown-900">¿En agua o en leche?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {juiceBases.map((baseOption) => (
                <div key={baseOption} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={baseOption}
                    name="base"
                    value={baseOption}
                    checked={base === baseOption}
                    onChange={(e) => setBase(e.target.value)}
                    className="w-4 h-4 text-green-600"
                  />
                  <Label htmlFor={baseOption} className="cursor-pointer text-brown-900">
                    {baseOption}
                  </Label>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Flavor/Option Selection */}
        {type && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-brown-900">
                {type === "Jugo" && "Elegir sabor"}
                {type === "Frappé" && "Elegir sabor de frappé"}
                {type === "Limonada" && "Elegir tipo de limonada"}
                {type === "Gaseosa" && "Elegir gaseosa"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Juice Flavors */}
              {type === "Jugo" &&
                juiceFlavors.map((flavorOption) => (
                  <div key={flavorOption} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={flavorOption}
                      name="flavor"
                      value={flavorOption}
                      checked={flavor === flavorOption}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Label htmlFor={flavorOption} className="cursor-pointer text-brown-900">
                      {flavorOption}
                    </Label>
                  </div>
                ))}

              {/* Frappé Flavors */}
              {type === "Frappé" &&
                frappeFlavors.map((flavorOption) => (
                  <div key={flavorOption} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={`frappe-${flavorOption}`}
                      name="flavor"
                      value={flavorOption}
                      checked={flavor === flavorOption}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Label htmlFor={`frappe-${flavorOption}`} className="cursor-pointer text-brown-900">
                      {flavorOption}
                    </Label>
                  </div>
                ))}

              {/* Limonada Options */}
              {type === "Limonada" &&
                limonadaFlavors.map((limonadaOption) => (
                  <div key={limonadaOption.name} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      id={limonadaOption.name}
                      name="flavor"
                      value={limonadaOption.name}
                      checked={flavor === limonadaOption.name}
                      onChange={(e) => setFlavor(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <Label htmlFor={limonadaOption.name} className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <div className="font-medium text-brown-900">{limonadaOption.name}</div>
                        <div className="text-lg font-bold text-green-600">${limonadaOption.price.toLocaleString()}</div>
                      </div>
                    </Label>
                  </div>
                ))}

              {/* Gaseosa Options */}
              {type === "Gaseosa" &&
                gaseosaOptions.map((gaseosaOption) => {
                  const optionId = `${gaseosaOption.brand} ${gaseosaOption.size}`
                  return (
                    <div key={optionId} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        id={optionId}
                        name="flavor"
                        value={optionId}
                        checked={flavor === optionId}
                        onChange={(e) => setFlavor(e.target.value)}
                        className="w-4 h-4 text-green-600"
                      />
                      <Label htmlFor={optionId} className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-brown-900">{gaseosaOption.brand}</div>
                            <div className="text-sm text-brown-600">{gaseosaOption.size}</div>
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            ${gaseosaOption.price.toLocaleString()}
                          </div>
                        </div>
                      </Label>
                    </div>
                  )
                })}
            </CardContent>
          </Card>
        )}
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
            {canAddToOrder && <span className="ml-2">- ${(getPrice() * quantity).toLocaleString()}</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
