"use client"

import type { OrderItem } from "./order-flow"
import { PedidoHeader, PedidoPage, Section, Stepper, OptionCard, AddToOrderButton, PedidoBody, optionGrid, useDraft, useToast } from "./pedido-ui"

interface LasanaOrderProps {
  onBack: () => void
  onAddItem: (item: OrderItem) => void
}

const sizes = [
  { name: "Mini", price: 15000 },
  { name: "Personal", price: 24000 },
]

export function LasanaOrder({ onBack, onAddItem }: LasanaOrderProps) {
  const [quantity, setQuantity] = useDraft("lasana.quantity", 1)
  const [size, setSize] = useDraft("lasana.size", "")

  const toast = useToast()
  const selectedSize = sizes.find((s) => s.name === size)

  const handleAddToOrder = () => {
    if (!selectedSize) return toast("Elige el tamaño de tu lasaña.")

    onAddItem({
      id: "",
      type: "lasana",
      name: "Lasaña Mixta",
      quantity,
      size: selectedSize.name,
      flavors: ["Mixta"],
      details: "Pasta, queso, carne boloñesa y pollo",
      price: selectedSize.price * quantity,
    })
  }

  return (
    <PedidoPage>
      <PedidoHeader title="🍝 Lasaña" onBack={onBack} step={1} />

      <PedidoBody
        actions={
          <AddToOrderButton
            onClick={handleAddToOrder}
            disabled={!selectedSize}
            total={selectedSize ? selectedSize.price * quantity : undefined}
          />
        }
      >
        <div className="card-soft mb-6 bg-jussi-orange p-5">
          <h2 className="font-display text-2xl font-extrabold">Lasaña Mixta</h2>
          <p className="mt-1 font-medium">Pasta, queso, carne boloñesa y pollo</p>
        </div>

        <Section title="Cantidad">
          <Stepper value={quantity} onChange={setQuantity} />
        </Section>

        <Section title="Elige el tamaño">
          <div className={optionGrid} role="radiogroup" aria-label="Tamaño">
            {sizes.map((option) => (
              <OptionCard
                key={option.name}
                selected={size === option.name}
                onSelect={() => setSize(option.name)}
                title={option.name}
                price={option.price}
              />
            ))}
          </div>
        </Section>
      </PedidoBody>
    </PedidoPage>
  )
}
