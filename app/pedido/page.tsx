"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MenuView } from "./components/menu-view"
import { OrderFlow } from "./components/order-flow"
import { Pizza, Utensils } from "lucide-react"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"home" | "menu" | "order">("home")

  if (currentView === "menu") {
    return <MenuView onStartOrder={() => setCurrentView("order")} onBack={() => setCurrentView("home")} />
  }

  if (currentView === "order") {
    return <OrderFlow onBack={() => setCurrentView("home")} />
  }

  return (
 <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-green-400 hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="Jussi Pizza Logo" className="w-28 h-28 object-contain rounded-full" />
          </div>
          <h1 className="text-5xl font-bold text-brown-900 mb-3 drop-shadow-lg">JUSSI PIZZA</h1>
          <p className="text-brown-700 text-lg">Jamundí, Colombia</p>
          <p className="text-brown-600 mt-2">¡Ganadores del pizza fest 2021!</p>
        </div>

        {/* Main Actions */}
        <div className="space-y-4">
          <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Button
                onClick={() => setCurrentView("menu")}
                className="w-full h-16 text-xl font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md"
              >
                <Utensils className="w-6 h-6 mr-3" /> Ver menú
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <Button
                onClick={() => setCurrentView("order")}
                className="w-full h-16 text-xl font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md"
              >
                <Pizza className="w-6 h-6 mr-3" /> Hacer pedido
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-brown-600">
          <p className="text-sm font-bold">Horario de atención:</p>
          <p className="text-sm font-medium">Miércoles a lunes: 6:00 - 10:30 PM</p>
          <p className="text-sm font-medium">Martes no tenemos servicio!</p>
        </div>
      </div>
    </div>
  )
}
