"use client"

import { useEffect } from "react"
import type { OrderItem } from "./order-flow"
import { PedidoHeader, PedidoPage, Section, Stepper, OptionCard, AddToOrderBar, useDraft, useToast } from "./pedido-ui"

interface PizzaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function PizzaOrder({ onBack, onAddItem }: PizzaOrderProps) {
  const [quantity, setQuantity] = useDraft("pizza.quantity", 1)
  const [size, setSize] = useDraft("pizza.size", "")
  const [selectedFlavors, setSelectedFlavors] = useDraft<string[]>("pizza.selectedFlavors", [])
  const [portions, setPortions] = useDraft<"8" | "10" | "">("pizza.portions", "")
  const toast = useToast()

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
          return 11000
        case "Personal":
          return 20000
        case "Pequeña":
          return 36000
        case "Mediana":
          return 46000
        default:
          return 0
      }
    } else {
      switch (size) {
        case "Personal":
          return 24000
        case "Pequeña":
          return 41000
        case "Mediana":
          return 52000
        default:
          return 0
      }
    }
  }

  const sizes = [
    { name: "Porción", description: "9 cm - 1 porción", traditional: true },
    { name: "Personal", description: "21 cm - 4 mini porciones", traditional: true, special: true },
    { name: "Pequeña", description: "30 cm - 6 porciones", traditional: true, special: true },
    { name: "Mediana", description: "40 cm - 8 ó 10 porciones", traditional: true, special: true },
  ]

  const flavors = [
    // Traditional
    { 
      name: "Hawaiana", 
      type: "traditional",
      ingredients: "Queso, piña, jamón"
    },
    { 
      name: "Jamón y Queso", 
      type: "traditional",
      ingredients: "Queso, jamón"
    },
    { 
      name: "Pepperoni", 
      type: "traditional",
      ingredients: "Queso, pepperoni"
    },
    // Special
    { 
      name: "De la Casa", 
      type: "special",
      ingredients: "Queso, cebolla, cabano, salami, champiñones, jamón y pimentón"
    },
    { 
      name: "Especial", 
      type: "special",
      ingredients: "Queso, maíz, tomate, tocineta, aceite de oliva y albahaca"
    },
    { 
      name: "Zamba", 
      type: "special",
      ingredients: "Queso, maduro, chorizo, tocineta y maíz"
    },
    { 
      name: "Cárnica", 
      type: "special",
      ingredients: "Queso, cabano, salami, jamón y carne boloñesa"
    },
    { 
      name: "Pocha", 
      type: "special",
      ingredients: "Queso, pollo y champiñones"
    },
    { 
      name: "Vegetariana", 
      type: "special",
      ingredients: "Queso, cebolla, champiñones, tomate, aceitunas, pimentón y ajo en polvo"
    },
    { 
      name: "Casual", 
      type: "special",
      ingredients: "Queso, pollo, tomate y tocineta"
    },
    { 
      name: "Americana", 
      type: "special",
      ingredients: "Queso, piña, salchicha americana y maíz"
    },
    { 
      name: "Napoly", 
      type: "special",
      ingredients: "Queso, cabano, carne boloñesa y champiñones"
    },
    { 
      name: "BBQ", 
      type: "special",
      ingredients: "Queso, pollo, piña, tocineta y salsa BBQ dulce"
    },
    { 
      name: "Primavera", 
      type: "special",
      ingredients: "Queso, carne boloñesa, tomate picado y orégano"
    },
    { 
      name: "Tropical", 
      type: "special",
      ingredients: "Queso, cebolla, cabano, piña y jamón"
    },
    { 
      name: "Tollo", 
      type: "special",
      ingredients: "Queso, pollo, piña y jamón"
    },
    { 
      name: "Madurito", 
      type: "special",
      ingredients: "Queso, maduro y tocineta"
    },
    { 
      name: "Clásica", 
      type: "special",
      ingredients: "Queso, piña, jamón y tocineta"
    },
    { 
      name: "Picardía", 
      type: "special",
      ingredients: "Queso, salami, piña, carne boloñesa y pimienta limón"
    },
    { 
      name: "Mexicana", 
      type: "special",
      ingredients: "Queso, cebolla, tomate, carne boloñesa, pimentón y jalapeños"
    },
    { 
      name: "Napolitana", 
      type: "special",
      ingredients: "Queso, tomate, albahaca y aceite de oliva"
    },
  ]

  const handleFlavorChange = (flavor: string, checked: boolean) => {
    if (checked) {
      const maxFlavors = size === "Porción" ? 1 : 2
      if (selectedFlavors.length >= maxFlavors) {
        toast(
          size === "Porción"
            ? "La porción solo puede tener un sabor. Quita el actual para elegir otro."
            : "Solo puedes elegir 2 sabores (mitad y mitad). Quita uno para cambiarlo.",
          "error",
        )
        return
      }
      // Don't allow special flavors for Porción size
      if (size === "Porción" && flavors.find((f) => f.name === flavor)?.type === "special") {
        toast("La porción solo tiene sabores tradicionales.", "info")
        return
      }
      setSelectedFlavors((prev) => [...prev, flavor])
    } else {
      setSelectedFlavors((prev) => prev.filter((f) => f !== flavor))
    }
  }

  const handleAddToOrder = () => {
    if (!size) return toast("Elige el tamaño de tu pizza.")
    if (selectedFlavors.length === 0) return toast("Elige al menos un sabor.")
    if (size === "Mediana" && !portions) return toast("Elige en cuántas porciones la quieres: 8 o 10.")

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

  const maxFlavors = size === "Porción" ? 1 : 2

  return (
    <PedidoPage>
      <PedidoHeader title="🍕 Pizza" onBack={onBack} step={1} />

      <main className="mx-auto max-w-md px-4 pb-40 pt-6 md:max-w-2xl">
        <Section title="Cantidad">
          <Stepper value={quantity} onChange={setQuantity} />
        </Section>

        <Section title="Elige el tamaño">
          <div className="space-y-3" role="radiogroup" aria-label="Tamaño">
            {sizes.map((sizeOption) => {
              const canShow =
                selectedFlavors.length === 0 ||
                (selectedFlavors.every((f) => flavors.find((fl) => fl.name === f)?.type === "traditional")
                  ? sizeOption.traditional
                  : sizeOption.special)

              if (!canShow) return null

              const price = selectedFlavors.length > 0 ? getPizzaPrice(sizeOption.name, selectedFlavors) : 0

              return (
                <OptionCard
                  key={sizeOption.name}
                  selected={size === sizeOption.name}
                  onSelect={() => setSize(sizeOption.name)}
                  title={sizeOption.name}
                  description={sizeOption.description}
                  price={price > 0 ? price : undefined}
                />
              )
            })}
          </div>
        </Section>

        {size === "Mediana" && (
          <section className="card-soft mb-6 bg-jussi-orange p-5">
            <h2 className="font-display text-xl font-extrabold">¿En cuántas porciones?</h2>
            <div className="mt-4 grid grid-cols-2 gap-3" role="radiogroup" aria-label="Porciones">
              {(["8", "10"] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={portions === n}
                  onClick={() => setPortions(n)}
                  className={`rounded-2xl ring-1 ring-jussi-brown/15 py-4 font-display text-lg font-extrabold transition-all ${
                    portions === n ? "bg-jussi-brown text-jussi-beige shadow-pop-sm" : "bg-jussi-beige hover:-translate-y-0.5"
                  }`}
                >
                  {n} porciones
                </button>
              ))}
            </div>
          </section>
        )}

        <Section
          title={`Elige los sabores (${selectedFlavors.length}/${maxFlavors})`}
          hint={size && size !== "Porción" ? "Puedes elegir hasta 2 sabores: ¡mitad y mitad!" : undefined}
        >
          <div className="space-y-3">
            {(["traditional", "special"] as const).map((group) => (
              <div key={group}>
                <p className="mb-2 mt-1 flex items-center gap-2 font-display text-sm font-bold uppercase tracking-widest">
                  <span
                    className={`inline-block h-3 w-3 rounded-full ring-1 ring-jussi-brown/15 ${
                      group === "traditional" ? "bg-jussi-orange" : "bg-jussi-red"
                    }`}
                  />
                  {group === "traditional" ? "Tradicionales" : "Especiales"}
                </p>
                <div className="space-y-3">
                  {flavors
                    .filter((f) => f.type === group)
                    .map((flavor) => {
                      const selected = selectedFlavors.includes(flavor.name)
                      return (
                        <OptionCard
                          key={flavor.name}
                          kind="check"
                          selected={selected}
                          onSelect={() => handleFlavorChange(flavor.name, !selected)}
                          title={flavor.name}
                          description={flavor.ingredients}
                          disabled={size === "Porción" && flavor.type === "special"}
                        />
                      )
                    })}
                </div>
              </div>
            ))}
            {size === "Porción" && (
              <p className="text-base font-semibold text-jussi-red">* La porción solo puede tener sabores tradicionales</p>
            )}
          </div>
        </Section>
      </main>

      <AddToOrderBar
        onClick={handleAddToOrder}
        disabled={!canAddToOrder}
        total={size ? getPizzaPrice(size, selectedFlavors) * quantity : undefined}
      />
    </PedidoPage>
  )
}
