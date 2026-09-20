"use client"

import type { OrderItem } from "./order-flow"
import { PedidoHeader, PedidoPage, Section, Stepper, OptionCard, AddToOrderBar, useDraft, useToast } from "./pedido-ui"

interface BebidaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

export function BebidaOrder({ onBack, onAddItem }: BebidaOrderProps) {
  const toast = useToast()
  const [quantity, setQuantity] = useDraft("bebida.quantity", 1)
  const [type, setType] = useDraft("bebida.type", "")
  const [base, setBase] = useDraft("bebida.base", "")
  const [flavor, setFlavor] = useDraft("bebida.flavor", "")

  const types = [
    { name: "Jugo", price: 0 }, // Precio variable según base
    { name: "Frappé", price: 7000 },
    { name: "Limonada", price: 0 }, // Precio variable según sabor
    { name: "Gaseosa", price: 0 }, // Precio variable según marca y tamaño
  ]

  const juiceBases = [
    { name: "En agua", price: 6000 },
    { name: "En leche", price: 7000 }
  ]
  const juiceFlavors = ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"]
  const frappeFlavors = ["Mora", "Lulo", "Maracuyá", "Mango", "Guanábana", "Fresa"]

  const limonadaFlavors = [
    { name: "Natural", price: 6000 },
    { name: "Cerezada", price: 8000 },
    { name: "De coco", price: 9000 },
  ]

  const gaseosaOptions = [
    { brand: "Coca Cola", size: "Personal", price: 4000 },
    { brand: "Coca Cola", size: "Litro y medio", price: 8000 },
    { brand: "Postobón", size: "Personal", price: 4000 },
    { brand: "Postobón", size: "Litro y medio", price: 7000 },
  ]

  const getPrice = () => {
    if (type === "Jugo") {
      const selectedBase = juiceBases.find((b) => b.name === base)
      return selectedBase?.price || 0
    }

    if (type === "Frappé") {
      return 7000
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
    if (!type) return toast("Elige qué quieres tomar.")
    if (type === "Jugo" && !base) return toast("Elige si tu jugo va en agua o en leche.")
    if (!flavor) return toast(type === "Gaseosa" ? "Elige la gaseosa." : type === "Limonada" ? "Elige el tipo de limonada." : "Elige el sabor.")

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

  const flavorTitle: Record<string, string> = {
    Jugo: "Elige el sabor",
    "Frappé": "Elige el sabor de frappé",
    Limonada: "Elige el tipo de limonada",
    Gaseosa: "Elige la gaseosa",
  }

  return (
    <PedidoPage>
      <PedidoHeader title="🥤 Bebida" onBack={onBack} step={1} />

      <main className="mx-auto max-w-md px-4 pb-40 pt-6 md:max-w-2xl">
        <Section title="Cantidad">
          <Stepper value={quantity} onChange={setQuantity} />
        </Section>

        <Section title="¿Qué quieres tomar?">
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de bebida">
            {types.map((typeOption) => (
              <button
                key={typeOption.name}
                type="button"
                role="radio"
                aria-checked={type === typeOption.name}
                onClick={() => {
                  setType(typeOption.name)
                  setBase("")
                  setFlavor("")
                }}
                className={`rounded-2xl ring-1 ring-jussi-brown/15 py-4 font-display text-lg font-extrabold transition-all ${
                  type === typeOption.name ? "bg-jussi-brown text-jussi-beige shadow-pop-sm" : "bg-jussi-beige/40 hover:-translate-y-0.5 hover:bg-jussi-beige"
                }`}
              >
                {typeOption.name}
              </button>
            ))}
          </div>
        </Section>

        {type === "Jugo" && (
          <Section title="¿En agua o en leche?">
            <div className="space-y-3" role="radiogroup" aria-label="Base">
              {juiceBases.map((baseOption) => (
                <OptionCard
                  key={baseOption.name}
                  selected={base === baseOption.name}
                  onSelect={() => setBase(baseOption.name)}
                  title={baseOption.name}
                  price={baseOption.price}
                />
              ))}
            </div>
          </Section>
        )}

        {type && (
          <Section title={flavorTitle[type]}>
            <div className="space-y-3" role="radiogroup" aria-label="Opciones">
              {type === "Jugo" &&
                juiceFlavors.map((option) => (
                  <OptionCard key={option} selected={flavor === option} onSelect={() => setFlavor(option)} title={option} />
                ))}

              {type === "Frappé" &&
                frappeFlavors.map((option) => (
                  <OptionCard key={option} selected={flavor === option} onSelect={() => setFlavor(option)} title={option} />
                ))}

              {type === "Limonada" &&
                limonadaFlavors.map((option) => (
                  <OptionCard
                    key={option.name}
                    selected={flavor === option.name}
                    onSelect={() => setFlavor(option.name)}
                    title={option.name}
                    price={option.price}
                  />
                ))}

              {type === "Gaseosa" &&
                gaseosaOptions.map((option) => {
                  const optionId = `${option.brand} ${option.size}`
                  return (
                    <OptionCard
                      key={optionId}
                      selected={flavor === optionId}
                      onSelect={() => setFlavor(optionId)}
                      title={option.brand}
                      description={option.size}
                      price={option.price}
                    />
                  )
                })}
            </div>
          </Section>
        )}
      </main>

      <AddToOrderBar onClick={handleAddToOrder} disabled={!canAddToOrder} total={getPrice() * quantity} />
    </PedidoPage>
  )
}
