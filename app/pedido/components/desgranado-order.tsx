"use client"

import type { OrderItem } from "./order-flow"
import { PedidoHeader, PedidoPage, Section, Stepper, OptionCard, AddToOrderButton, PedidoBody, optionGrid, useDraft, useToast } from "./pedido-ui"

interface DesgranandoOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

const bases = [
  { name: "Maíz", price: 22000 },
  { name: "Maduro", price: 22000 },
]

const flavors = [
  { name: "Ranchero", ingredients: "Queso, tocineta y pollo" },
  { name: "Campesino", ingredients: "Queso, pollo, tocineta y chorizo de ternera" },
  { name: "Americano", ingredients: "Queso, pollo y salchicha americana" },
]

export function DesgranandoOrder({ onBack, onAddItem }: DesgranandoOrderProps) {
  const [quantity, setQuantity] = useDraft("desgranado.quantity", 1)
  const [base, setBase] = useDraft("desgranado.base", "")
  const [flavor, setFlavor] = useDraft("desgranado.flavor", "")

  const toast = useToast()
  const selectedBase = bases.find((b) => b.name === base)
  const selectedFlavor = flavors.find((f) => f.name === flavor)
  const canAddToOrder = selectedBase && selectedFlavor

  const handleAddToOrder = () => {
    if (!selectedBase) return toast("Elige si lo quieres con maíz o con maduro.")
    if (!selectedFlavor) return toast("Elige el sabor de tu desgranado.")

    onAddItem({
      id: "",
      type: "desgranado",
      name: `Desgranado ${flavor}`,
      quantity,
      base: selectedBase.name,
      flavors: [flavor],
      details: selectedFlavor.ingredients,
      price: selectedBase.price * quantity,
    })
  }

  return (
    <PedidoPage>
      <PedidoHeader title="🌽 Desgranado" onBack={onBack} step={1} />

      <PedidoBody
        actions={
          <AddToOrderButton
            onClick={handleAddToOrder}
            disabled={!canAddToOrder}
            total={selectedBase ? selectedBase.price * quantity : undefined}
          />
        }
      >
        <Section title="Cantidad">
          <Stepper value={quantity} onChange={setQuantity} />
        </Section>

        <Section title="¿Con qué lo quieres?">
          <div className={optionGrid} role="radiogroup" aria-label="Base">
            {bases.map((option) => (
              <OptionCard
                key={option.name}
                selected={base === option.name}
                onSelect={() => setBase(option.name)}
                title={option.name}
                price={option.price}
              />
            ))}
          </div>
        </Section>

        <Section title="Elige el sabor" hint="Con maíz o maduro">
          <div className={optionGrid} role="radiogroup" aria-label="Sabor">
            {flavors.map((option) => (
              <OptionCard
                key={option.name}
                selected={flavor === option.name}
                onSelect={() => setFlavor(option.name)}
                title={option.name}
                description={option.ingredients}
              />
            ))}
          </div>
        </Section>
      </PedidoBody>
    </PedidoPage>
  )
}
