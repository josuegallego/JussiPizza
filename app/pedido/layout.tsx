import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pedidos - Jussi Pizza - Jamundí",
  description: "Auténtica pizza en Jamundí. Ganadores del Pizza Fest 2021.",
}

export default function PedidoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}