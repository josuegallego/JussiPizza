"use client"

import { ShoppingCart } from "lucide-react"
import { PedidoHeader, PedidoPage, PedidoActionBar } from "./pedido-ui"

interface MenuItem {
  name: string
  ingredients: string
  type?: "traditional" | "special"
  sizes?: string[]
  flavors?: string[]
}

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
        `Porción (${formatPrice(PRICES.traditional.portion)})`,
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

  const menuCategories: { id: string; name: string; items: MenuItem[] }[] = [
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

  // Portada de cada sección: foto real del producto + frase corta
  const heroes: Record<string, { image: string; alt: string; tagline: string }> = {
    pizzas: {
      image: "/menu/pizza-mixta.webp",
      alt: "Pizza recién horneada con maíz, tocineta y champiñones",
      tagline: "Masa artesanal, horneada al momento",
    },
    lasanas: {
      image: "/menu/lasana.webp",
      alt: "Lasaña mixta gratinada con tostadas de ajo",
      tagline: "Gratinada, casera y bien servida",
    },
    desgranados: {
      image: "/menu/desgranado.webp",
      alt: "Desgranado gratinado con queso derretido",
      tagline: "Como la lasaña, pero con maíz o maduro",
    },
    bebidas: {
      image: "/menu/bebidas.webp",
      alt: "Jugo de mango, limonada y frappé de fresa",
      tagline: "Jugos naturales, frappés, limonadas y gaseosas",
    },
  }

  const pizzaGroups = [
    {
      type: "traditional",
      title: "Tradicionales",
      dot: "bg-jussi-orange",
    },
    {
      type: "special",
      title: "Especiales",
      dot: "bg-jussi-red",
    },
  ] as const

  const chipList = (label: string, values: string[], chipClass: string) => (
    <div className="mt-4">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest opacity-80">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <span key={value} className={`rounded-full px-3 py-1 text-sm font-bold ring-1 ring-jussi-brown/15 ${chipClass}`}>
            {value}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <PedidoPage>
      {/* Encabezado y categorías en un mismo bloque fijo: así no queda rendija entre los dos */}
      <div className="sticky top-0 z-30">
      <PedidoHeader title="Nuestro menú" onBack={onBack} />

      {/* Navegación por categoría */}
      <nav className="border-b border-jussi-brown/15 bg-jussi-beige">
        <div className="mx-auto flex max-w-md gap-2 overflow-x-auto px-4 py-3 md:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
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
      </div>

      <main className="mx-auto max-w-md px-4 pb-32 pt-6 md:max-w-2xl lg:max-w-5xl xl:max-w-6xl">
        {menuCategories.map((category, idx) => {
          const hero = heroes[category.id]
          return (
            // Cada sección es una sola tarjeta: la foto es su parte de arriba y el contenido va pegado debajo
            <section
              key={category.id}
              id={category.id}
              className="card-soft mb-10 scroll-mt-40 overflow-hidden bg-white last:mb-0"
            >
              <figure className="relative bg-jussi-brown">
                <img
                  src={hero.image}
                  alt={hero.alt}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className="h-32 w-full object-cover sm:h-36 lg:h-40"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-jussi-brown/90 via-jussi-brown/50 to-jussi-brown/10" />
                <figcaption className="absolute inset-0 flex items-center justify-between gap-3 px-5 md:px-8">
                  <div className="min-w-0">
                    <h2 className="font-display text-3xl font-extrabold leading-none text-white md:text-5xl">
                      {category.name.replace(/^\S+\s/, "")}
                    </h2>
                    <p className="mt-1.5 text-sm font-semibold text-white/90 md:text-base">{hero.tagline}</p>
                  </div>
                  <span className={`sticker absolute right-3 top-3 flex-shrink-0 rotate-2 px-3 py-1 text-xs sm:static sm:px-4 sm:py-1.5 sm:text-sm ${accents[idx % accents.length]}`}>
                    {category.items.length} {category.items.length === 1 ? "opción" : "opciones"}
                  </span>
                </figcaption>
              </figure>

              {category.id === "pizzas" ? (
                // Pizzas: tradicionales y especiales dentro de la misma tarjeta, separadas por una línea
                pizzaGroups.map((group, i) => {
                  const pizzas = category.items.filter((item) => item.type === group.type)
                  return (
                    <div
                      key={group.type}
                      className={`px-5 pb-3 pt-5 md:px-6 ${i > 0 ? "border-t-2 border-dashed border-jussi-brown/15" : ""}`}
                    >
                      <h3 className="flex items-center gap-2 font-display text-xl font-extrabold sm:text-2xl">
                        <span className={`inline-block h-3 w-3 flex-shrink-0 rounded-full ${group.dot}`} aria-hidden />
                        Pizzas {group.title.toLowerCase()}
                      </h3>
                      {chipList("Tamaños y precios", pizzas[0]?.sizes ?? [], "bg-jussi-brown/10")}

                      <p className="mb-1 mt-5 text-sm font-bold uppercase tracking-widest opacity-80">Sabores</p>
                      <ul className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3">
                        {pizzas.map((pizza) => (
                          <li key={pizza.name} className="border-t border-dashed border-jussi-brown/15 py-3">
                            <h4 className="font-display text-base font-extrabold leading-tight">{pizza.name}</h4>
                            <p className="mt-0.5 text-sm opacity-75">{pizza.ingredients}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })
              ) : (
                (() => {
                  // Productos en lista. Si todos comparten opciones y precios (p. ej. desgranados), esas
                  // opciones se muestran una vez arriba.
                  const items = category.items
                  const sameAsFirst = (item: MenuItem) =>
                    JSON.stringify([item.sizes, item.flavors]) === JSON.stringify([items[0].sizes, items[0].flavors])
                  const shared = items.length > 1 && items.every(sameAsFirst) ? items[0] : null
                  const optionsLabel = category.id === "bebidas" || category.id === "desgranados" ? "Opciones" : "Sabores"
                  const chips = (item: MenuItem) => (
                    <>
                      {item.sizes && chipList("Tamaños", item.sizes, "bg-jussi-brown/10")}
                      {item.flavors && item.flavors.length > 0 && chipList(optionsLabel, item.flavors, "bg-jussi-orange/40")}
                    </>
                  )

                  return (
                    <div className="px-5 pb-1 pt-1 md:px-6">
                      {shared && <div className="pb-4">{chips(shared)}</div>}
                      {/* Cada producto lleva línea arriba; sin opciones compartidas se recorta la de la primera fila */}
                      <div className="overflow-hidden">
                        <ul className={`grid sm:gap-x-8 ${items.length > 1 ? "sm:grid-cols-2" : ""} ${shared ? "" : "-mt-px"}`}>
                          {items.map((item) => (
                            <li key={item.name} className="border-t border-dashed border-jussi-brown/15 py-4">
                              <h3 className="font-display text-lg font-extrabold leading-tight">{item.name}</h3>
                              <p className="mt-0.5 text-sm opacity-75">{item.ingredients}</p>
                              {!shared && <div className="[&>div]:mt-3">{chips(item)}</div>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })()
              )}
            </section>
          )
        })}
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
