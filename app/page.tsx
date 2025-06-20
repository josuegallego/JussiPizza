"use client"

import { useState, useEffect } from "react"
import { MapPin, Instagram, MessageCircle, Award, Heart, Pizza, Clock, Users, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const pizzasEspeciales = [
  {
    name: "De la casa",
    ingredients: "Queso, cebolla, cabano, salami, champiñones, jamón y pimentón",
    popular: true,
  },
  {
    name: "Especial",
    ingredients: "Queso, maíz, tomate, tocineta, aceite de oliva y albahaca",
    popular: false,
  },
  {
    name: "Zamba",
    ingredients: "Queso, maduro, chorizo, tocineta y maíz",
    popular: true,
  },
  {
    name: "Cárnica",
    ingredients: "Queso, cabano, salami, jamón y carne boloñesa",
    popular: false,
  },
  {
    name: "Pocha",
    ingredients: "Queso, pollo y champiñones",
    popular: false,
  },
  {
    name: "Vegetariana",
    ingredients: "Queso, cebolla, champiñones, tomate, aceitunas, pimentón y ajo en polvo",
    popular: false,
  },
  {
    name: "Casual",
    ingredients: "Queso, pollo, tomate y tocineta",
    popular: false,
  },
  {
    name: "Americana",
    ingredients: "Queso, piña, salchicha americana y maíz",
    popular: true,
  },
  {
    name: "Napoly",
    ingredients: "Queso, cabano, carne boloñesa y champiñones",
    popular: false,
  },
  {
    name: "BBQ",
    ingredients: "Queso, pollo, piña, tocineta y salsa BBQ dulce",
    popular: true,
  },
  {
    name: "Primavera",
    ingredients: "Queso, carne boloñesa, tomate picado y orégano",
    popular: false,
  },
  {
    name: "Tropical",
    ingredients: "Queso, cebolla, cabano, piña y jamón",
    popular: false,
  },
  {
    name: "Tollo",
    ingredients: "Queso, pollo, piña y jamón",
    popular: false,
  },
  {
    name: "Madurito",
    ingredients: "Queso, maduro y tocineta",
    popular: true,
  },
  {
    name: "Clásica",
    ingredients: "Queso, piña, jamón y tocineta",
    popular: false,
  },
  {
    name: "Picardía",
    ingredients: "Queso, salami, piña, carne boloñesa y pimienta limón",
    popular: false,
  },
  {
    name: "Mexicana",
    ingredients: "Queso, cebolla, tomate, carne boloñesa, pimentón y jalapeños",
    popular: true,
  },
  {
    name: "Napolitana",
    ingredients: "Queso, tomate, albahaca y aceite de oliva",
    popular: false,
  },
]

const pizzasTradicionales = [
  {
    name: "Hawaiana",
    ingredients: "Queso, jamón y piña",
    popular: true,
  },
  {
    name: "Jamón y Queso",
    ingredients: "Queso y jamón",
    popular: false,
  },
  {
    name: "Pepperoni",
    ingredients: "Queso y pepperoni",
    popular: true,
  },
]

const lasanas = [
  {
    name: "Lasaña Mini",
    ingredients: "Queso, pasta, carne boloñesa y pollo",
    size: "Porción individual",
    category: "lasana",
  },
  {
    name: "Lasaña Personal",
    ingredients: "Queso, pasta, carne boloñesa y pollo",
    size: "Porción individual",
    category: "lasana",
  },
]
const desgranados = [
  {
    name: "Desgranado Ranchero",
    ingredients: "Queso, tocineta y pollo",
    options: "Con maíz o maduro",
    category: "desgranado",
  },
  {
    name: "Desgranado Campesino",
    ingredients: "Queso, pollo, tocineta y chorizo de ternera",
    options: "Con maíz o maduro",
    category: "desgranado",
  },
  {
    name: "Desgranado Americano",
    ingredients: "Queso, pollo y salchicha americana",
    options: "Con maíz o maduro",
    category: "desgranado",
  },
]

const locations = [
  {
    name: "Sede Sachamate",
    address: "Cra 18 #12-22 Barrio Sachamate",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.3354983682593!2d-76.54898070321042!3d3.266644999999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e309eb5f479442f%3A0xb90023a4b91e072d!2sJussi%20Pizza!5e0!3m2!1sen!2sco!4v1750386486959!5m2!1sen!2sco",
  },
  {
    name: "Sede Anturios",
    address: "Cra 19A #3-03 frente a Los Naranjos",
    mapSrc:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.3354983682593!2d-76.54898070321042!3d3.266644999999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e309983d6c3c0e7%3A0x556bfa1aac6aae29!2sJussi%20Pizza!5e0!3m2!1sen!2sco!4v1750386509586!5m2!1sen!2sco",
  },
]

const pizzaSizes = [
  { name: "Personal", size: "21 cm", slices: "4 mini porciones", diameter: 60 },
  { name: "Pequeña", size: "30 cm", slices: "6 porciones", diameter: 80 },
  { name: "Mediana", size: "40 cm", slices: "8 porciones (opcional hasta 10)", diameter: 100 },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  // Handle WhatsApp click with location selection
  const handleWhatsAppClick = () => {
    // Create modal overlay
    const modalOverlay = document.createElement("div")
    modalOverlay.className = "fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    modalOverlay.style.animation = "fadeIn 0.3s ease-out"

    // Create modal content
    const modalContent = document.createElement("div")
    modalContent.className = "bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform"
    modalContent.style.animation = "slideUp 0.3s ease-out"
    modalContent.innerHTML = `
      <div class="text-center">
        <div class="w-16 h-16 bg-[#F22233] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-[#231107] mb-2">¿En cuál sede deseas ordenar?</h3>
        <p class="text-[#231107]/70 mb-6">Selecciona la ubicación más cercana a ti</p>
        
        <div class="space-y-3 mb-6">
          <button id="sachamate-btn" class="w-full bg-[#4EBF4B] hover:bg-[#4EBF4B]/90 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <div class="text-left">
              <div class="font-bold">Sede Sachamate</div>
              <div class="text-sm opacity-90">Barrio al lado del parque Sachamate</div>
            </div>
          </button>
          
          <button id="anturios-btn" class="w-full bg-[#F27F1B] hover:bg-[#F27F1B]/90 text-white p-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
            <div class="text-left">
              <div class="font-bold">Sede Anturios</div>
              <div class="text-sm opacity-90">Sector de Alfafuara/Parque Natura</div>
            </div>
          </button>
        </div>
        
        <button id="close-modal" class="text-[#231107]/50 hover:text-[#231107] transition-colors">
          Cancelar
        </button>
      </div>
    `

    modalOverlay.appendChild(modalContent)
    document.body.appendChild(modalOverlay)

    // Add event listeners
    document.getElementById("sachamate-btn")?.addEventListener("click", () => {
      const message = encodeURIComponent("¡Hola! Me gustaría hacer un pedido de pizza 🍕 - Sede Sachamate")
      window.open(
        `https://api.whatsapp.com/send/?phone=573172697230&text=${message}&type=phone_number&app_absent=0`,
        "_blank",
      )
      document.body.removeChild(modalOverlay)
    })

    document.getElementById("anturios-btn")?.addEventListener("click", () => {
      const message = encodeURIComponent("¡Hola! Me gustaría hacer un pedido de pizza 🍕 - Sede Anturios")
      window.open(
        `https://api.whatsapp.com/send/?phone=573168403329&text=${message}&type=phone_number&app_absent=0`,
        "_blank",
      )
      document.body.removeChild(modalOverlay)
    })

    document.getElementById("close-modal")?.addEventListener("click", () => {
      document.body.removeChild(modalOverlay)
    })

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        document.body.removeChild(modalOverlay)
      }
    })
  }

  // Handle Instagram click
  const handleInstagramClick = () => {
    window.open("https://instagram.com/jussipizza_", "_blank")
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "menu", "locations", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#F3EDD6]">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#231107]/95 backdrop-blur-sm text-[#F3EDD6] py-4 px-6 shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#F22233] rounded-full flex items-center justify-center overflow-hidden">
              <img src="/logo beige.png" alt="Jussi Pizza Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Jussi Pizza</h1>
              <p className="text-sm opacity-80">Jamundí, Valle del Cauca</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              { id: "home", label: "Inicio" },
              { id: "menu", label: "Menú" },
              { id: "locations", label: "Ubicaciones" },
              { id: "contact", label: "Contacto" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`hover:text-[#F27F1B] transition-colors px-3 py-2 rounded-xl ${
                  activeSection === item.id ? "text-[#F27F1B] bg-[#F27F1B]/10" : ""
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`h-0.5 bg-[#F3EDD6] transition-all ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div className={`h-0.5 bg-[#F3EDD6] transition-all ${mobileMenuOpen ? "opacity-0" : ""}`}></div>
              <div
                className={`h-0.5 bg-[#F3EDD6] transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#F3EDD6]/20">
            <nav className="flex flex-col space-y-2 mt-4">
              {[
                { id: "home", label: "Inicio" },
                { id: "menu", label: "Menú" },
                { id: "locations", label: "Ubicaciones" },
                { id: "contact", label: "Contacto" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left hover:text-[#F27F1B] transition-colors px-3 py-2 rounded-xl ${
                    activeSection === item.id ? "text-[#F27F1B] bg-[#F27F1B]/10" : ""
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="relative pt-32 pb-20 px-6 text-center min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/IMG_0096.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Background Overlay with Blur Effect */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3EDD6]/20 via-transparent to-[#4EBF4B]/10"></div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-4 h-4 bg-[#F22233]/30 rounded-full animate-ping"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-[#4EBF4B]/30 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-32 left-20 w-5 h-5 bg-[#F27F1B]/30 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-20 right-10 w-3 h-3 bg-[#F22233]/30 rounded-full animate-ping delay-500"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex justify-center mb-12">
            <div className="bg-[#F22233] text-white px-6 py-3 rounded-full flex items-center space-x-2 shadow-lg animate-bounce">
              <Award className="w-5 h-5" />
              <span className="font-semibold">Ganadores del Pizza Fest 2021</span>
            </div>
          </div>

          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight animate-fade-in drop-shadow-2xl">
            Bienvenidos a<br />
            <span className="relative inline-block">
              <span className="absolute inset-0 text-black blur-md opacity-60">
                Jussi Pizza
              </span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#F22233] to-[#F3EDD6] bg-[length:300%_300%] bg-[position:0%_50%] animate-gradient-x drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] text-6xl md:text-8xl font-bold leading-tight">
                Jussi Pizza
              </span>
            </span>
          </h2>

          <div className="flex items-center justify-center space-x-3 mb-10 animate-fade-in delay-300">
            <Heart className="w-8 h-8 text-[#F22233] animate-pulse drop-shadow-lg" />
            <p className="text-2xl text-white italic font-bold bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 drop-shadow-lg">
              "En las manos de Dios"
            </p>
            <Heart className="w-8 h-8 text-[#F22233] animate-pulse drop-shadow-lg" />
          </div>

          <p className="text-xl md:text-2xl text-white/95 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-in delay-500 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/20 drop-shadow-xl">
            Auténtica y deliciosa pizza en el corazón de Jamundí. Nuestras pizzas se preparan con ingredientes frescos y
            de calidad, combinando la tradición italiana con el sabor único Colombiano. Cada porción está hecha con
            dedicación, pasión... y mucho amor.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in delay-1000">
            <Button
              onClick={() => scrollToSection("menu")}
              className="bg-gradient-to-r from-[#25D366] to-[#25D366]/90 hover:from-[#25D366]/90 hover:to-[#25D366] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg flex items-center space-x-3 transform hover:-translate-y-2 backdrop-blur-sm border border-white/20"
            >
              <span className="flex items-center space-x-3">
                <Pizza className="w-7 h-7" />
                <span>Ver Menú</span>
              </span>
            </Button>
            <Button
              onClick={handleWhatsAppClick}
              className="bg-gradient-to-r from-[#25D366] to-[#25D366]/90 hover:from-[#25D366]/90 hover:to-[#25D366] text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-lg flex items-center space-x-3 transform hover:-translate-y-2 backdrop-blur-sm border border-white/20"
            >
              <span>¡Pedir Ahora!</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-[#231107] mb-4">Nuestro Menú</h3>
            <p className="text-xl text-[#231107]/70 max-w-2xl mx-auto">
              Las mejores pizzas, lasañas y desgranados deliciosos preparados con ingredientes frescos
            </p>
          </div>

          {/* Pizzas Tradicionales Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-[#4EBF4B]/10 to-[#4EBF4B]/5 rounded-2xl p-6 mb-8">
              <h4 className="text-3xl font-bold text-[#231107] text-center mb-4">🍕 Sabores Tradicionales</h4>
              <p className="text-center text-[#231107]/70">Los clásicos de siempre que nunca pasan de moda</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pizzasTradicionales.map((pizza, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-[#F3EDD6] hover:border-[#4EBF4B] bg-gradient-to-br from-white to-[#F3EDD6]/20 relative overflow-hidden flex flex-col h-full"
                >
                  {pizza.popular && (
                    <div className="absolute top-3 right-3 bg-[#4EBF4B] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Favorita
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="relative mb-4">
                      <img
                        src="/tradicional.jpg?height=200&width=300"
                        alt={`Pizza ${pizza.name}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>

                    <h4 className="text-2xl font-bold text-[#231107] mb-3 group-hover:text-[#4EBF4B] transition-colors">
                      {pizza.name}
                    </h4>

                    <p className="text-[#231107]/70 leading-relaxed mb-4 flex-grow">{pizza.ingredients}</p>

                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-[#4EBF4B] hover:bg-[#4EBF4B]/90 text-white rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-105 mt-auto"
                    >
                      Ordenar Esta Pizza
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pizzas Especiales Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-[#F22233]/10 to-[#F22233]/5 rounded-2xl p-6 mb-8">
              <h4 className="text-3xl font-bold text-[#231107] text-center mb-4">🍕 Sabores Especiales</h4>
              <p className="text-center text-[#231107]/70">Sabores únicos que encantan paladares</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pizzasEspeciales.map((pizza, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-[#F3EDD6] hover:border-[#F22233] bg-gradient-to-br from-white to-[#F3EDD6]/20 relative overflow-hidden flex flex-col h-full"
                >
                  {pizza.popular && (
                    <div className="absolute top-3 right-3 bg-[#F22233] text-white px-3 py-1 rounded-full text-sm font-semibold z-10">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="relative mb-4">
                      <img
                        src="/espc.jpg?height=200&width=300"
                        alt={`Pizza ${pizza.name}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>

                    <h4 className="text-2xl font-bold text-[#231107] mb-3 group-hover:text-[#F22233] transition-colors">
                      {pizza.name}
                    </h4>

                    <p className="text-[#231107]/70 leading-relaxed mb-4 flex-grow">{pizza.ingredients}</p>

                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-[#F22233] hover:bg-[#F22233]/90 text-white rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-105 mt-auto"
                    >
                      Ordenar Esta Pizza
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Pizza Sizes - Moved here within menu section */}
          <div className="bg-gradient-to-r from-[#F27F1B]/10 to-[#F27F1B]/5 rounded-2xl p-8 mb-16">
            <h4 className="text-3xl font-bold text-[#231107] text-center mb-8">Tamaños Disponibles</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {pizzaSizes.map((size, index) => (
                <div key={index} className="text-center flex flex-col items-center">
                  <div className="relative mb-4 flex items-center justify-center" style={{ height: "120px" }}>
                    <div
                      className="rounded-full border-4 border-[#F22233] bg-[#F27F1B]/20 flex items-center justify-center"
                      style={{ width: size.diameter, height: size.diameter }}
                    >
                      <Pizza className="w-8 h-8 text-[#F22233]" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-start">
                    <h5 className="text-xl font-bold text-[#231107] mb-2">{size.name}</h5>
                    <p className="text-[#231107]/70 mb-1">{size.size}</p>
                    <p className="text-[#231107]/70">{size.slices}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <p className="text-lg text-[#231107] font-medium">
                <span className="text-[#F22233] font-bold">¡Combina sabores!</span> Puedes combinar tu pizza con 2
                sabores diferentes. Los precios varían según los sabores elegidos.
              </p>
            </div>
          </div>

          {/* Desgranados Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-[#F27F1B]/10 to-[#F27F1B]/5 rounded-2xl p-6 mb-8">
              <h4 className="text-3xl font-bold text-[#231107] text-center mb-4">🌽 Nuestros Desgranados</h4>
              <p className="text-center text-[#231107]/70">Puedes elegir si los quieres con maíz o maduro</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {desgranados.map((desgranado, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-[#F3EDD6] hover:border-[#F27F1B] bg-gradient-to-br from-white to-[#F3EDD6]/20 relative overflow-hidden flex flex-col h-full"
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="relative mb-4">
                      <img
                        src="/maiz.jpg?height=200&width=300"
                        alt={`${desgranado.name}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    <h4 className="text-2xl font-bold text-[#231107] mb-3 group-hover:text-[#F27F1B] transition-colors">
                      {desgranado.name}
                    </h4>
                    <div className="flex-grow">
                      <p className="text-[#231107]/70 leading-relaxed mb-2">{desgranado.ingredients}</p>
                      <p className="text-[#F27F1B] font-semibold text-sm mb-4">{desgranado.options}</p>
                    </div>
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-[#F27F1B] hover:bg-[#F27F1B]/90 text-white rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-105 mt-auto"
                    >
                      Ordenar Desgranado
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Lasañas Section */}
          <div className="mb-16">
            <div className="bg-gradient-to-r from-[#F27F1B]/10 to-[#F27F1B]/5 rounded-2xl p-6 mb-8">
              <h4 className="text-3xl font-bold text-[#231107] text-center">🍝 Nuestras Lasañas</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center max-w-4xl mx-auto">
              {lasanas.map((lasana, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-2 border-[#F3EDD6] hover:border-[#F27F1B] bg-gradient-to-br from-white to-[#F3EDD6]/20 relative overflow-hidden"
                >
                  <CardContent className="p-6">
                    <div className="relative mb-4">
                      <img
                        src="/lasaña.jpg?height=200&width=300"
                        alt={lasana.name}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    </div>
                    <h4 className="text-2xl font-bold text-[#231107] mb-3 group-hover:text-[#F27F1B] transition-colors">
                      {lasana.name}
                    </h4>
                    <p className="text-[#231107]/70 leading-relaxed mb-2">{lasana.ingredients}</p>
                    <p className="text-[#F27F1B] font-semibold text-sm mb-4">{lasana.size}</p>
                    <Button
                      onClick={handleWhatsAppClick}
                      className="w-full bg-[#F27F1B] hover:bg-[#F27F1B]/90 text-white rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Ordenar {lasana.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-20 px-6 bg-[#F3EDD6]">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-[#231107] mb-4">Nuestras Sedes</h3>
            <p className="text-xl text-[#231107]/70 max-w-2xl mx-auto">
              Dos sedes ubicadas en Jamundí para servirte de la mejor manera. ¡Visítanos o pide a domicilio!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-2xl border-2 border-[#4EBF4B]/20 hover:border-[#4EBF4B] transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-0">
                  <div className="bg-[#231107] text-[#F3EDD6] p-6">
                    <div className="flex items-center space-x-3 mb-2">
                      <MapPin className="w-6 h-6 text-[#F27F1B]" />
                      <h4 className="text-2xl font-bold">{location.name}</h4>
                    </div>
                    <p className="text-lg opacity-90 mb-4">{location.address}</p>
                    <div className="flex space-x-3">
                      <Button
                        onClick={handleWhatsAppClick}
                        className="bg-[#25D366] hover:bg-[#25D366]/90 text-white px-4 py-2 rounded-xl text-sm flex items-center space-x-2"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Llamar</span>
                      </Button>
                      <Button
                        onClick={() =>
                          window.open(`https://maps.google.com/?q=${encodeURIComponent(location.address)}`, "_blank")
                        }
                        className="bg-[#4EBF4B] hover:bg-[#4EBF4B]/90 text-white px-4 py-2 rounded-xl text-sm flex items-center space-x-2"
                      >
                        <MapPin className="w-4 h-4" />
                        <span>Cómo llegar</span>
                      </Button>
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-2xl">
                    <iframe
                      src={location.mapSrc}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="w-full rounded-2xl"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-[#231107] text-[#F3EDD6]">
        <div className="container mx-auto text-center">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">¡Haz tu Pedido!</h3>

          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Haz tu pedido en segundos desde nuestro enlace o escríbenos directo. ¡Estamos para servirte!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto mb-12">
            <Button
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto bg-[#25D366] hover:bg-[#25D366]/90 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Pedir por WhatsApp</span>
            </Button>

            <Button
              onClick={handleInstagramClick}
              className="w-full sm:w-auto bg-gradient-to-r from-[#E4405F] to-[#F56040] hover:from-[#E4405F]/90 hover:to-[#F56040]/90 text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center space-x-3 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Instagram className="w-6 h-6" />
              <span>Ver Instagram</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Clock className="w-12 h-12 text-[#F27F1B] mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Horarios</h4>
              <p className="opacity-80">
                Miércoles a Lunes
                <br />
                6:00 PM - 10:30 PM
              </p>
            </div>
            <div className="text-center">
              <Users className="w-12 h-12 text-[#F27F1B] mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Servicio</h4>
              <p className="opacity-80">
                Domicilio
                <br />
                Para llevar
                <br />
                Consumo en sitio
              </p>
            </div>
            <div className="text-center">
              <Pizza className="w-12 h-12 text-[#F27F1B] mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Especialidad</h4>
              <p className="opacity-80">
                Pizza Crocante
                <br />
                Ingredientes frescos
                <br />
                Receta tradicional
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-[#F3EDD6]/20">
            <p className="text-[#F3EDD6]/70">© 2025 Jussi Pizza - Jamundí, Valle del Cauca, Colombia</p>
            <p className="text-[#F3EDD6]/70 mt-2">Ganadores Pizza Fest 2021 🏆</p>
          </div>
        </div>
      </section>
    </div>
  )
}
