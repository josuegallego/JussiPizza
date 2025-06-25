"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ShoppingCart } from "lucide-react"

interface ItemSelectionProps {
  onBack: () => void
  onSelectItem: (type: "pizza" | "lasana" | "desgranado" | "bebida") => void
  hasItems: boolean
  onViewSummary: () => void
}

export function ItemSelection({ onBack, onSelectItem, hasItems, onViewSummary }: ItemSelectionProps) {
  const items = [
    { type: "pizza" as const, name: "🍕 Pizza", description: "Gran variedad de sabores" },
    { type: "lasana" as const, name: "🍝 Lasaña", description: "Las mejores lasañas caseras" },
    { type: "desgranado" as const, name: "🌽 Desgranado", description: "Con maíz o maduro" },
    { type: "bebida" as const, name: "🥤 Bebida", description: "Jugos naturales y gaseosas" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Inicio
          </Button>
          <h1 className="text-xl font-bold text-brown-900">Hacer Pedido</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-brown-900 mb-2">¿Qué deseas añadir?</h2>
          <p className="text-brown-700">Selecciona una categoría para comenzar</p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <Card
              key={item.type}
              className="border-2 border-green-200 shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              <CardContent className="p-6">
                <Button
                  onClick={() => onSelectItem(item.type)}
                  className="w-full h-16 text-xl font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl shadow-md flex flex-col items-center justify-center px-4 py-2"
                >
                  <span className="text-lg font-bold leading-tight">{item.name}</span>
                  <span className="text-xs opacity-90 leading-tight mt-0.5">{item.description}</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Summary Button */}
      {hasItems && (
        <div className="fixed bottom-4 left-4 right-4 z-20">
          <div className="max-w-md mx-auto">
            <Button
              onClick={onViewSummary}
              className="w-full h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Ver resumen del pedido
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
