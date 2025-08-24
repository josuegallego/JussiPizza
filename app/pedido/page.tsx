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
<div className="relative min-h-[100svh] bg-gradient-to-br from-amber-50 to-orange-50 overflow-hidden">
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
  <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
  
      <div className="max-w-md mx-auto flex flex-col justify-between h-[calc(100svh-2rem)]"> {/* Restamos el padding (2rem = 32px) */}
        
        {/* Header optimizado */}
        <div className="text-center mt-6">
          <div className="w-28 h-28 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-green-400 hover:scale-105 transition-transform duration-300">
            <img src="/logo.png" alt="Jussi Pizza Logo" className="w-24 h-24 object-contain rounded-full" />
          </div>
          <h1 className="text-4xl font-bold text-brown-900 mb-2 drop-shadow-md">JUSSI PIZZA</h1>
          <p className="text-brown-700 text-lg">Jamundí, Colombia</p>
          <p className="text-brown-600 mt-1">¡Ganadores del pizza fest 2021!</p>
        </div>

        {/* Main Actions - Espacio controlado */}
        <div className="space-y-4 my-4">
          <Card className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4">
              <Button
                onClick={() => setCurrentView("menu")}
                className="w-full h-16 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md"
              >
                <Utensils className="w-6 h-6 mr-2" /> Ver menú
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-red-200 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-4">
              <Button
                onClick={() => setCurrentView("order")}
                className="w-full h-16 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md"
              >
                <Pizza className="w-6 h-6 mr-2" /> Hacer pedido
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer ajustado */}
        <div className="text-center text-brown-600 pb-2">
          <p className="text-sm font-bold">Horario de atención:</p>
          <p className="text-sm">Miércoles a lunes: 6:00 - 10:30 PM</p>
          <p className="text-sm font-medium">Martes no tenemos servicio!</p>
        </div>
      </div>
    </div>
  )
}