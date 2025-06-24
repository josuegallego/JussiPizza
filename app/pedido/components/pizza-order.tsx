"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { OrderItem } from "./order-flow"
import { Badge } from "@/components/ui/badge"

interface PizzaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function PizzaOrder({ onBack, onAddItem }: PizzaOrderProps) {
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState("")
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([])
  const [portions, setPortions] = useState<"8" | "10" | "">("")
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    if (size === "Porción") {
      // Remove any special flavors when Porción is selected
      setSelectedFlavors((prev) =>
        prev.filter((flavor) => flavors.find((f) => f.name === flavor)?.type === "traditional"),
      )
    }
    // Reset portions when size changes
    if (size !== "Mediana") {
      setPortions("")
    }
  }, [size])

  const getPizzaPrice = (size: string, flavors: string[]) => {
    const traditionalFlavors = ["Hawaiana", "Jamón y Queso", "Pepperoni"]
    const isTraditional = flavors.every((flavor) => traditionalFlavors.includes(flavor))

    if (isTraditional) {
      switch (size) {
        case "Porción":
          return 9000
        case "Personal":
          return 18000
        case "Pequeña":
          return 32000
        case "Mediana":
          return 42000
        default:
          return 0
      }
    } else {
      switch (size) {
        case "Personal":
          return 22000
        case "Pequeña":
          return 37000
        case "Mediana":
          return 46000
        default:
          return 0
      }
    }
  }

  const sizes = [
    { name: "Porción", description: "9 cm - 1 porción", traditional: true },
    { name: "Personal", description: "21 cm - 4 mini porciones", traditional: true, special: true },
    { name: "Pequeña", description: "6 porciones", traditional: true, special: true },
    { name: "Mediana", description: "8-10 porciones", traditional: true, special: true },
  ]

  const flavors = [
    // Traditional
    { name: "Hawaiana", type: "traditional" },
    { name: "Jamón y Queso", type: "traditional" },
    { name: "Pepperoni", type: "traditional" },
    // Special
    { name: "De la Casa", type: "special" },
    { name: "Especial", type: "special" },
    { name: "Zamba", type: "special" },
    { name: "Cárnica", type: "special" },
    { name: "Pocha", type: "special" },
    { name: "Vegetariana", type: "special" },
    { name: "Casual", type: "special" },
    { name: "Americana", type: "special" },
    { name: "Napoly", type: "special" },
    { name: "BBQ", type: "special" },
    { name: "Primavera", type: "special" },
    { name: "Tropical", type: "special" },
    { name: "Tollo", type: "special" },
    { name: "Madurito", type: "special" },
    { name: "Clásica", type: "special" },
    { name: "Picardía", type: "special" },
    { name: "Mexicana", type: "special" },
    { name: "Napolitana", type: "special" },
  ]

  const handleFlavorChange = (flavor: string, checked: boolean) => {
    if (checked) {
      const maxFlavors = size === "Porción" ? 1 : 2
      if (selectedFlavors.length >= maxFlavors) {
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
        return
      }
      // Don't allow special flavors for Porción size
      if (size === "Porción" && flavors.find((f) => f.name === flavor)?.type === "special") {
        return
      }
      setSelectedFlavors((prev) => [...prev, flavor])
    } else {
      setSelectedFlavors((prev) => prev.filter((f) => f !== flavor))
    }
  }

  const handleAddToOrder = () => {
    if (!size || selectedFlavors.length === 0) return
    if (size === "Mediana" && !portions) return

    const price = getPizzaPrice(size, selectedFlavors) * quantity
    const sizeDescription = sizes.find((s) => s.name === size)?.description
    const finalSizeDescription =
      size === "Mediana" && portions ? `${size} (${portions} porciones)` : `${size} (${sizeDescription})`

    const item: OrderItem = {
      id: "",
      type: "pizza",
      name: `Pizza ${selectedFlavors.join(" y ")}`,
      quantity,
      size: finalSizeDescription,
      flavors: selectedFlavors,
      price,
    }

    onAddItem(item)
  }

  const canAddToOrder = size && selectedFlavors.length > 0 && (size !== "Mediana" || portions)

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
          <h1 className="text-xl font-bold text-brown-900">🍕 Pizza</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        {showAlert && (
          <Alert className="mb-4 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {size === "Porción"
                ? "La porción solo puede tener un sabor."
                : "Solo puedes seleccionar 2 sabores (mitad y mitad)."}
            </AlertDescription>
          </Alert>
        )}

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
            {sizes.map((sizeOption) => {
              const canShow =
                selectedFlavors.length === 0 ||
                (selectedFlavors.every((f) => flavors.find((fl) => fl.name === f)?.type === "traditional")
                  ? sizeOption.traditional
                  : sizeOption.special)

              if (!canShow) return null

              const price = selectedFlavors.length > 0 ? getPizzaPrice(sizeOption.name, selectedFlavors) : 0

              return (
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
                      <div>
                        <div className="font-medium text-brown-900">{sizeOption.name}</div>
                        <div className="text-sm text-brown-600">{sizeOption.description}</div>
                      </div>
                      {price > 0 && <div className="text-lg font-bold text-green-600">${price.toLocaleString()}</div>}
                    </div>
                  </Label>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Portions Selection for Mediana */}
        {size === "Mediana" && (
          <Card className="mb-6 border-2 border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="text-brown-900">¿En cuántas porciones?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="8-portions"
                  name="portions"
                  value="8"
                  checked={portions === "8"}
                  onChange={(e) => setPortions(e.target.value as "8")}
                  className="w-4 h-4 text-orange-600"
                />
                <Label htmlFor="8-portions" className="cursor-pointer text-brown-900 font-medium">
                  8 porciones
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="10-portions"
                  name="portions"
                  value="10"
                  checked={portions === "10"}
                  onChange={(e) => setPortions(e.target.value as "10")}
                  className="w-4 h-4 text-orange-600"
                />
                <Label htmlFor="10-portions" className="cursor-pointer text-brown-900 font-medium">
                  10 porciones
                </Label>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Flavor Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">
              Seleccionar sabores ({selectedFlavors.length}/{size === "Porción" ? "1" : "2"})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {flavors.map((flavor) => {
              const isDisabled = size === "Porción" && flavor.type === "special"

              return (
                <div key={flavor.name} className="flex items-center space-x-3">
                  <Checkbox
                    id={flavor.name}
                    checked={selectedFlavors.includes(flavor.name)}
                    onCheckedChange={(checked) => handleFlavorChange(flavor.name, checked as boolean)}
                    disabled={isDisabled}
                  />
                  <Label
                    htmlFor={flavor.name}
                    className={`cursor-pointer text-brown-900 flex-1 ${isDisabled ? "opacity-50" : ""}`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{flavor.name}</span>
                      <Badge
                        variant="secondary"
                        className={
                          flavor.type === "traditional" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                        }
                      >
                        {flavor.type === "traditional" ? "Tradicional" : "Especial"}
                      </Badge>
                    </div>
                  </Label>
                </div>
              )
            })}
            {size === "Porción" && (
              <p className="text-sm text-orange-600 font-medium">* La porción solo puede tener sabores tradicionales</p>
            )}
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
              <span className="ml-2">- ${(getPizzaPrice(size, selectedFlavors) * quantity).toLocaleString()}</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
