import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Jussi Pizza - Jamundí, Valle del Cauca",
  description: "Auténtica pizza artesanal en Jamundí. Ganadores del Pizza Fest 2021.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon básico */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#F22233" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
