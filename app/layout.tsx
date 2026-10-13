import type React from "react"
import type { Metadata } from "next"
import { Unbounded, Manrope } from "next/font/google"
import "./globals.css"

// Titulares: sans-serif ancha y divertida
const display = Unbounded({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

// Texto corrido y UI: sans-serif limpia y muy legible
const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Jussi Pizza - Jamundí",
  description: "Auténtica pizza en Jamundí. Ganadores del Pizza Fest 2021.",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // suppressHydrationWarning: extensiones del navegador (traductores, correctores) añaden atributos a
    // <html>/<body> antes de que React cargue; solo ignora esa diferencia de atributos, no la del contenido
    <html lang="es" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
