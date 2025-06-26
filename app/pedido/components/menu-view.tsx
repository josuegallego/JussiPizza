"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"

interface MenuViewProps {
  onStartOrder: () => void
  onBack: () => void
}

export function MenuView({ onStartOrder, onBack }: MenuViewProps) {
  const menuCategories = [
    {
      id: "pizzas",
      name: "🍕 Pizzas",
      items: [
        // Traditional flavors
        {
          name: "Hawaiana",
          ingredients: "Queso, piña, jamón",
          type: "traditional",
          sizes: ["Porción ($9.000)", "Personal (4 mini porciones $18.000)", "Pequeña (6 porciones $32.000)", "Mediana (8-10 porciones $42.000)"],
        },
        {
          name: "Jamón y Queso",
          ingredients: "Queso, jamón",
          type: "traditional",
          sizes: ["Porción ($9.000)", "Personal (4 mini porciones $18.000)", "Pequeña (6 porciones $32.000)", "Mediana (8-10 porciones $42.000)"],
        },
        {
          name: "Pepperoni",
          ingredients: "Queso, pepperoni",
          type: "traditional",
          sizes: ["Porción ($9.000)", "Personal (4 mini porciones $18.000)", "Pequeña (6 porciones $32.000)", "Mediana (8-10 porciones $42.000)"],
        },
        // Special flavors
        {
          name: "De la Casa",
          ingredients: "Queso, cebolla, cabano, salami, champiñones, jamón y pimentón",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Especial",
          ingredients: "Queso, maíz, tomate, tocineta, aceite de oliva y albahaca",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Zamba",
          ingredients: "Queso, maduro, chorizo, tocineta y maíz",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Cárnica",
          ingredients: "Queso, cabano, salami, jamón y carne boloñesa",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Pocha",
          ingredients: "Queso, pollo y champiñones",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Vegetariana",
          ingredients: "Queso, cebolla, champiñones, tomate, aceitunas, pimentón y ajo en polvo",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Casual",
          ingredients: "Queso, pollo, tomate y tocineta",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Americana",
          ingredients: "Queso, piña, salchicha americana y maíz",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Napoly",
          ingredients: "Queso, cabano, carne boloñesa y champiñones",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "BBQ",
          ingredients: "Queso, pollo, piña, tocineta y salsa BBQ dulce",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Primavera",
          ingredients: "Queso, carne boloñesa, tomate picado y orégano",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Tropical",
          ingredients: "Queso, cebolla, cabano, piña y jamón",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Tollo",
          ingredients: "Queso, pollo, piña y jamón",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Madurito",
          ingredients: "Queso, maduro y tocineta",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Clásica",
          ingredients: "Queso, piña, jamón y tocineta",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Picardía",
          ingredients: "Queso, salami, piña, carne boloñesa y pimienta limón",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Mexicana",
          ingredients: "Queso, cebolla, tomate, carne boloñesa, pimentón y jalapeños",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
        {
          name: "Napolitana",
          ingredients: "Queso, tomate, albahaca y aceite de oliva",
          type: "special",
          sizes: ["Personal (4 mini porciones $22.000)", "Pequeña (6 porciones $37.000)", "Mediana (8-10 porciones $46.000)"],
        },
      ],
    },
    {
      id: "lasanas",
      name: "🍝 Lasañas",
      items: [
        {
          name: "Lasaña Mixta",
          ingredients: "Pasta, queso, carne boloñesa y pollo",
          sizes: ["Mini ($13,000)", "Personal ($21,000)"],
        },
      ],
    },
    {
      id: "desgranados",
      name: "🌽 Desgranados",
      items: [
        {
          name: "Desgranado Ranchero",
          ingredients: "Queso, tocineta y pollo (Con maíz o maduro)",
          flavors: ["Ranchero", "Campesino", "Americano"],
        },
        {
          name: "Desgranado Campesino",
          ingredients: "Queso, pollo, tocineta y chorizo de ternera (Con maíz o maduro)",
          flavors: ["Ranchero", "Campesino", "Americano"],
        },
        {
          name: "Desgranado Americano",
          ingredients: "Queso, pollo y salchicha americana (Con maíz o maduro)",
          flavors: ["Ranchero", "Campesino", "Americano"],
        },
      ],
    },
    {
      id: "bebidas",
      name: "🥤 Bebidas",
      items: [
        {
          name: "Jugos Naturales",
          ingredients: "En agua o en leche",
          flavors: ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Lulo", "Fresa"],
        },
        {
          name: "Frappés",
          ingredients: "Bebida granizada",
          flavors: ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Lulo", "Fresa"],
        },
        {
          name: "Limonadas",
          ingredients: "Refrescantes limonadas",
          flavors: ["Natural", "Cerezada", "De coco"],
        },
        {
          name: "Gaseosas Coca Cola",
          ingredients: "Bebidas gaseosas",
          flavors: ["Personal", "Litro y medio"],
        },
        {
          name: "Gaseosas Postobón",
          ingredients: "Bebidas gaseosas",
          flavors: ["Personal", "Litro y medio"],
        },
      ],
    },
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
          <h1 className="text-xl font-bold text-brown-900">Nuestro Menú</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        {menuCategories.map((category) => (
          <div key={category.id} className="mb-8">
            <h2 className="text-2xl font-bold text-brown-900 mb-4 text-center">{category.name}</h2>
            <div className="space-y-4">
              {category.items.map((item, index) => (
                <Card key={index} className="border-2 border-green-200 shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-brown-900">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-brown-700 text-sm mb-3">{item.ingredients}</p>
                    {item.sizes && (
                      <div className="mb-2">
                        <p className="text-xs font-medium text-brown-600 mb-1">Tamaños disponibles:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map((size, sizeIndex) => (
                            <Badge key={sizeIndex} variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              {size}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    {item.flavors && item.flavors.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-brown-600 mb-1">
                          {category.id === "bebidas" ? "Opciones disponibles:" : "Sabores disponibles:"}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {item.flavors.map((flavor, flavorIndex) => (
                            <Badge
                              key={flavorIndex}
                              variant="secondary"
                              className="bg-orange-100 text-orange-800 text-xs"
                            >
                              {flavor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Order Button */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className="max-w-md mx-auto">
          <Button
            onClick={onStartOrder}
            className="w-full h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Ordenar ahora
          </Button>
        </div>
      </div>
    </div>
  )
}
