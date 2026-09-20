"use client"

import { ShoppingCart } from "lucide-react"
import { PedidoHeader, PedidoPage, PedidoActionBar } from "./pedido-ui"

interface MenuViewProps {
  onStartOrder: () => void
  onBack: () => void
}

export function MenuView({ onStartOrder, onBack }: MenuViewProps) {
  // Precios definidos como variables
  const PRICES = {
    traditional: {
      portion: 11000,
      personal: 20000,
      small: 36000,
      medium: 46000,
    },
    special: {
      personal: 24000,
      small: 41000,
      medium: 52000,
    },
    lasagna: {
      mini: 15000,
      personal: 24000,
    },
    cornOrPlantain: 22000,
  }

  // Función para formatear precios en formato colombiano
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Función para generar los tamaños según el tipo de pizza
  const getPizzaSizes = (type: 'traditional' | 'special') => {
    const prices = PRICES[type]
    
    if (type === 'traditional') {
      return [
        `Porción (${formatPrice(prices.portion)})`,
        `Personal (4 mini porciones ${formatPrice(prices.personal)})`,
        `Pequeña (6 porciones ${formatPrice(prices.small)})`,
        `Mediana (8-10 porciones ${formatPrice(prices.medium)})`,
      ]
    } else {
      return [
        `Personal (4 mini porciones ${formatPrice(prices.personal)})`,
        `Pequeña (6 porciones ${formatPrice(prices.small)})`,
        `Mediana (8-10 porciones ${formatPrice(prices.medium)})`,
      ]
    }
  }

  const menuCategories = [
    {
      id: "pizzas",
      name: "🍕 Pizzas",
      items: [
        // Traditional flavors
        {
          name: "Hawaiana",
          ingredients: "Queso, piña, jamón",
          type: "traditional" as const,
        },
        {
          name: "Jamón y Queso",
          ingredients: "Queso, jamón",
          type: "traditional" as const,
        },
        {
          name: "Pepperoni",
          ingredients: "Queso, pepperoni",
          type: "traditional" as const,
        },
        // Special flavors
        {
          name: "De la Casa",
          ingredients: "Queso, cebolla, cabano, salami, champiñones, jamón y pimentón",
          type: "special" as const,
        },
        {
          name: "Especial",
          ingredients: "Queso, maíz, tomate, tocineta, aceite de oliva y albahaca",
          type: "special" as const,
        },
        {
          name: "Zamba",
          ingredients: "Queso, maduro, chorizo, tocineta y maíz",
          type: "special" as const,
        },
        {
          name: "Cárnica",
          ingredients: "Queso, cabano, salami, jamón y carne boloñesa",
          type: "special" as const,
        },
        {
          name: "Pocha",
          ingredients: "Queso, pollo y champiñones",
          type: "special" as const,
        },
        {
          name: "Vegetariana",
          ingredients: "Queso, cebolla, champiñones, tomate, aceitunas, pimentón y ajo en polvo",
          type: "special" as const,
        },
        {
          name: "Casual",
          ingredients: "Queso, pollo, tomate y tocineta",
          type: "special" as const,
        },
        {
          name: "Americana",
          ingredients: "Queso, piña, salchicha americana y maíz",
          type: "special" as const,
        },
        {
          name: "Napoly",
          ingredients: "Queso, cabano, carne boloñesa y champiñones",
          type: "special" as const,
        },
        {
          name: "BBQ",
          ingredients: "Queso, pollo, piña, tocineta y salsa BBQ dulce",
          type: "special" as const,
        },
        {
          name: "Primavera",
          ingredients: "Queso, carne boloñesa, tomate picado y orégano",
          type: "special" as const,
        },
        {
          name: "Tropical",
          ingredients: "Queso, cebolla, cabano, piña y jamón",
          type: "special" as const,
        },
        {
          name: "Tollo",
          ingredients: "Queso, pollo, piña y jamón",
          type: "special" as const,
        },
        {
          name: "Madurito",
          ingredients: "Queso, maduro y tocineta",
          type: "special" as const,
        },
        {
          name: "Clásica",
          ingredients: "Queso, piña, jamón y tocineta",
          type: "special" as const,
        },
        {
          name: "Picardía",
          ingredients: "Queso, salami, piña, carne boloñesa y pimienta limón",
          type: "special" as const,
        },
        {
          name: "Mexicana",
          ingredients: "Queso, cebolla, tomate, carne boloñesa, pimentón y jalapeños",
          type: "special" as const,
        },
        {
          name: "Napolitana",
          ingredients: "Queso, tomate, albahaca y aceite de oliva",
          type: "special" as const,
        },
      ].map(item => ({
        ...item,
        sizes: getPizzaSizes(item.type),
      })),
    },
    {
      id: "lasanas",
      name: "🍝 Lasañas",
      items: [
        {
          name: "Lasaña Mixta",
          ingredients: "Pasta, queso, carne boloñesa y pollo",
          sizes: [
            `Mini (${formatPrice(PRICES.lasagna.mini)})`,
            `Personal (${formatPrice(PRICES.lasagna.personal)})`,
          ],
        },
      ],
    },
    {
      id: "desgranados",
      name: "🌽 Desgranados",
      items: [
        {
          name: "Desgranado Ranchero",
          ingredients: "Queso, tocineta y pollo",
          flavors: [`Con maíz (${formatPrice(PRICES.cornOrPlantain)})`, `Con maduro (${formatPrice(PRICES.cornOrPlantain)})`],
        },
        {
          name: "Desgranado Campesino",
          ingredients: "Queso, pollo, tocineta y chorizo de ternera",
          flavors: [`Con maíz (${formatPrice(PRICES.cornOrPlantain)})`, `Con maduro (${formatPrice(PRICES.cornOrPlantain)})`],
        },
        {
          name: "Desgranado Americano",
          ingredients: "Queso, pollo y salchicha americana",
          flavors: [`Con maíz (${formatPrice(PRICES.cornOrPlantain)})`, `Con maduro (${formatPrice(PRICES.cornOrPlantain)})`],
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
          flavors: ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"],
        },
        {
          name: "Frappés",
          ingredients: "Bebida granizada",
          flavors: ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"],
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

  const accents = ["bg-jussi-red text-white", "bg-jussi-orange", "bg-jussi-beige", "bg-jussi-brown text-jussi-beige"]

  return (
    <PedidoPage>
      <PedidoHeader title="Nuestro menú" onBack={onBack} />

      {/* Navegación por categoría */}
      <nav className="sticky top-[70px] z-20 border-b border-jussi-brown/15 bg-jussi-beige">
        <div className="mx-auto flex max-w-md gap-2 overflow-x-auto px-4 py-3 md:max-w-2xl">
          {menuCategories.map((category, idx) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className={`btn-pop btn-pop-sm flex-shrink-0 whitespace-nowrap ${accents[idx % accents.length]}`}
            >
              {category.name}
            </a>
          ))}
        </div>
      </nav>

      <main className="mx-auto max-w-md px-4 pb-32 pt-6 md:max-w-2xl">
        {menuCategories.map((category, idx) => (
          <section key={category.id} id={category.id} className="mb-10 scroll-mt-40">
            <h2 className={`mb-4 inline-block rounded-full ring-1 ring-jussi-brown/15 px-5 py-2 font-display text-2xl font-extrabold shadow-pop-sm ${accents[idx % accents.length]}`}>
              {category.name}
            </h2>

            <div className="space-y-4">
              {category.items.map((item, index) => (
                <article key={index} className="card-soft bg-white p-5">
                  <h3 className="font-display text-xl font-extrabold leading-tight">{item.name}</h3>
                  <p className="mt-1 text-base opacity-80">{item.ingredients}</p>

                  {item.sizes && (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-bold uppercase tracking-widest opacity-80">Tamaños</p>
                      <div className="flex flex-wrap gap-2">
                        {item.sizes.map((size, sizeIndex) => (
                          <span
                            key={sizeIndex}
                            className="rounded-full ring-1 ring-jussi-brown/15 bg-jussi-brown/10 px-3 py-1 text-sm font-bold"
                          >
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {item.flavors && item.flavors.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-sm font-bold uppercase tracking-widest opacity-80">
                        {category.id === "bebidas" || category.id === "desgranados" ? "Opciones" : "Sabores"}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.flavors.map((flavor, flavorIndex) => (
                          <span
                            key={flavorIndex}
                            className="rounded-full ring-1 ring-jussi-brown/15 bg-jussi-orange/40 px-3 py-1 text-sm font-bold"
                          >
                            {flavor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>

      <PedidoActionBar>
        <button onClick={onStartOrder} className="btn-pop btn-pop-red btn-pop-lg w-full">
          <ShoppingCart className="h-5 w-5" />
          Ordenar ahora
        </button>
      </PedidoActionBar>
    </PedidoPage>
  )
}
