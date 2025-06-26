"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, AlertCircle } from "lucide-react"
import type { DeliveryInfo as DeliveryInfoType } from "./order-flow"

interface DeliveryInfoProps {
  onBack: () => void
  onContinue: (info: DeliveryInfoType) => void
}

const neighborhoods = [
  { name: "ANGEL MARIA CAMACHO", price: 4000 },
  { name: "ARBOLEDA", price: 4000 },
  { name: "ALFEREZ REAL", price: 4000 },
  { name: "ALAMEDA DE RIO CLARO (Bloques aptos)", price: 6000 },
  { name: "ADRIANITA", price: 4000 },
  { name: "ALBORADA", price: 4000 },
  { name: "AURORA", price: 4000 },
  { name: "BELALCAZAR II", price: 5000 },
  { name: "AMIGOS 2000", price: 6000 },
  { name: "ACACIAS", price: 4000 },
  { name: "BELALCAZAR I", price: 4000 },
  { name: "BRISAS DEL ROSARIO", price: 4000 },
  { name: "BELLO HORIZONTE", price: 4000 },
  { name: "ANTURIOS", price: 2000 },
  { name: "CENTENARIO", price: 4000 },
  { name: "CANTABRIA", price: 4000 },
  { name: "PARQUE NATURA", price: 5000 },
  { name: "CIRO VELASCO", price: 4000 },
  { name: "CIUDAD SUR", price: 4000 },
  { name: "COVICEDROS", price: 4000 },
  { name: "CONDADO DEL SUR", price: 5000 },
  { name: "DORADO", price: 4000 },
  { name: "ESPERANZA", price: 4000 },
  { name: "ESMERALDA", price: 4000 },
  { name: "ESTACION", price: 4000 },
  { name: "HOJARASCA", price: 4000 },
  { name: "JARDIN I", price: 5000 },
  { name: "JARDIN II", price: 6000 },
  { name: "JUAN DE AMPUDIA", price: 4000 },
  { name: "JUAN PABLO II", price: 4000 },
  { name: "LIBERTADORES", price: 4000 },
  { name: "LA ALBORADA", price: 5000 },
  { name: "LA LUCHA", price: 4000 },
  { name: "MANDARINOS", price: 6000 },
  { name: "MAKUNAIMA", price: 5000 },
  { name: "MARGARITAS", price: 6000 },
  { name: "OPORTO", price: 5000 },
  { name: "PORTAL DEL JORDAN", price: 4000 },
  { name: "PORTAL DE JAMUNDI", price: 4000 },
  { name: "PANAMERICANO", price: 5000 },
  { name: "PILOTO", price: 4000 },
  { name: "POPULAR", price: 4000 },
  { name: "PORVENIR", price: 4000 },
  { name: "PRIMERO DE MAYO", price: 4000 },
  { name: "PARQUES DE CASTILLA", price: 4000 },
  { name: "LA PRADERA", price: 4000 },
  { name: "PORTAL DEL SAMAN", price: 4000 },
  { name: "PALOSANTO", price: 4000 },
  { name: "PALMAS", price: 6000 },
  { name: "QUINTAS DE BOLIVAR", price: 5000 },
  { name: "ROSARIO", price: 4000 },
  { name: "RINCON DE ZARAGOZA", price: 4000 },
  { name: "RINCON DE LAS GARZAS", price: 4000 },
  { name: "RIBERAS DEL ROSARIO", price: 4000 },
  { name: "SIGLO XXI", price: 5000 },
  { name: "SACHAMATE (URB. MUNICIPAL)", price: 2000 },
  { name: "SOLAR DE LAS GARZAS", price: 4000 },
  { name: "SIMON BOLIVAR", price: 4000 },
  { name: "SANTA ANA", price: 4000 },
  { name: "SOCORRO", price: 4000 },
  { name: "VILLA ESTELA", price: 5000 },
  { name: "VILLA MAITE", price: 5000 },
  { name: "VILLA PAULINA", price: 4000 },
  { name: "VILLA PIME 1", price: 5000 },
  { name: "VILLA PIME 2", price: 5000 },
  { name: "VILLA DEL SOL", price: 5000 },
  { name: "VILLA ELVIRA", price: 4000 },
  { name: "VILLA MONICA", price: 4000 },
  { name: "VILLA TATIANA", price: 4000 },
  { name: "LOS NARANJOS", price: 4000 },
  { name: "RECANTO", price: 3000 },
  { name: "VENTINO", price: 3000 },
  // Conjuntos Cerrados
  { name: "LOS NARANJOS", price: 4000 },
  { name: "SOLARES DE SACHAMATE", price: 6000 },
  { name: "COUNTRY PLAZA II", price: 7000 },
  { name: "COUNTRY PLAZA I", price: 7000 },
  { name: "SOL DEL CAMPO", price: 6000 },
  { name: "SOL DE LA ARBOLEDA", price: 6000 },
  { name: "SOL DE LA LLANURA", price: 6000 },
  { name: "SOL DEL BOSQUE", price: 6000 },
  { name: "SOL DE PRIMAVERA", price: 6000 },
  { name: "SAN CAYETANO", price: 6000 },
  { name: "TORRES DE JAMUNDI", price: 5000 },
  { name: "VILLAS DE ALTAGRACIA", price: 4000 },
  { name: "EL PINO", price: 4000 },
  { name: "PRADOS DE ALFAGUARA", price: 4000 },
  { name: "ALEGRA", price: 5000 },
  { name: "GUAYACANES DE VERDE ALFAGUARA", price: 8000 },
  { name: "ALMENDROS DE VERDE ALFAGUARA", price: 8000 },
  { name: "PALMERAS DE VERDE ALFAGUARA", price: 8000 },
  { name: "GUADUALES DE VERDE ALFAGUARA", price: 8000 },
  { name: "CASA CAMPO CONJUNTO RESIDENCIAL", price: 8000 },
  { name: "TANGELOS DE VERDE ALFAGUARA", price: 8000 },
  { name: "LAGOS DE VERDE ALFAGUARA", price: 8000 },
  { name: "FARALLONES DE VERDE ALFAGUARA", price: 8000 },
  { name: "ENTRELAGOS CONJUNTO RESIDENCIAL", price: 8000 },
  { name: "VILLAS DE LAS MERCEDES", price: 12000 },
  { name: "HONTANAR DE LAS MERCEDES", price: 12000 },
  { name: "MANANTIAL DE LAS MERCEDES", price: 12000 },
  { name: "FONTANAR DE LAS MERCEDES", price: 12000 },
  { name: "SENDEROS DE LAS MERCEDES", price: 12000 },
  { name: "RINCON DE LAS MERCEDES", price: 12000 },
  { name: "LAS MERCEDES", price: 12000 },
  { name: "GUADUALES DE LAS MERCEDES", price: 12000 },
  { name: "VALLE DEL RIO", price: 12000 },
  { name: "VALLE VERDE", price: 12000 },
  { name: "BALCONES DE VERDE HORIZONTE", price: 12000 },
  { name: "PORTALES DE VERDE HORIZONTE", price: 12000 },
  { name: "PRADERAS DE VERDE HORIZONTE", price: 12000 },
  { name: "SENDEROS DE VERDE HORIZONTE", price: 12000 },
  { name: "RINCON DE LOS GUADUALES", price: 12000 },
  { name: "MANÀ", price: 8000 },
  { name: "CIUDAD DE DIOS I Y II", price: 8000 },
  { name: "BAMBÙ", price: 4000 },
  { name: "CARBONERO", price: 4000 },
  { name: "LA ARBOLEDA", price: 4000 },
  { name: "KOA", price: 2000 },
  { name: "MIRADOR DE FARALLONES", price: 4000 },
  { name: "FORESTAL AQUA", price: 6000 },
  { name: "VILLAS DEL PARQUE", price: 7000 },
  { name: "SENDEROS DE LA MORADA", price: 12000 },
  { name: "RESERVAS DE RIO CLARO", price: 12000 },
  { name: "CLUB DE CAMPO LA MORADA", price: 12000 },
  { name: "SOLARES DE LA MORADA", price: 12000 },
  { name: "REMANSOS DE LA MORADA", price: 12000 },
  { name: "PARAISO DE LA MORADA", price: 12000 },
  { name: "SAMANES DE LA MORADA", price: 12000 },
  { name: "SAN MARINO", price: 6000 },
  { name: "ARBORE COUNTRY CLUB", price: 12000 },
  { name: "CIUDAD COUNTRY", price: 8000 },
  { name: "VERONA", price: 4000 },
  { name: "PASEO DE PANGOLA", price: 5000 },
  { name: "PAISAJE DE PANGOLA", price: 5000 },
  { name: "CAMINOS DE PANGOLA", price: 5000 },
  { name: "CAMPOS DE PANGOLA", price: 5000 },
  { name: "PARAÍSO DE PANGOLA", price: 5000 },
]

// Opción especial para cuando no encuentran su barrio
const NOT_IN_LIST_OPTION = {
  name: "MI BARRIO NO ESTÁ EN LA LISTA",
  price: 0 // El precio se definirá después
}

export function DeliveryInfoComponent({ onBack, onContinue }: DeliveryInfoProps) {
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup" | "">("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [observations, setObservations] = useState("")
  const [location, setLocation] = useState<"anturios" | "sachamate" | undefined>(undefined)
  const [neighborhood, setNeighborhood] = useState("")
  const [customNeighborhood, setCustomNeighborhood] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const locations = [
    {
      id: "anturios" as const,
      name: "Sede Anturios",
      address: "Cra 19A #3-03 frente a Los Naranjos",
      mapUrl: "https://maps.app.goo.gl/33vmvieN2cqjqE5f6",
    },
    {
      id: "sachamate" as const,
      name: "Sede Sachamate",
      address: "Cra 18 #12-22 Barrio Sachamate",
      mapUrl: "https://maps.app.goo.gl/GnmVHC39gcTEv2Fd8",
    },
  ]

  const filteredNeighborhoods = neighborhoods.filter((n) => 
    n.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Siempre mostrar la opción "no está en lista" al principio
  const neighborhoodOptions = [NOT_IN_LIST_OPTION, ...filteredNeighborhoods]

  const handleContinue = () => {
    if (!deliveryType || !name || !phone) return

    if (deliveryType === "delivery") {
      if (!address || !neighborhood) return
      // Si seleccionó "no está en lista", también necesita escribir el barrio
      if (neighborhood === NOT_IN_LIST_OPTION.name && !customNeighborhood.trim()) return
    } else {
      if (!location) return
    }

    const selectedNeighborhood = neighborhoods.find((n) => n.name === neighborhood)
    const finalNeighborhood = neighborhood === NOT_IN_LIST_OPTION.name ? customNeighborhood : neighborhood
    
    const info: DeliveryInfoType = {
      type: deliveryType,
      name,
      phone,
      address: deliveryType === "delivery" ? address : undefined,
      observations: deliveryType === "delivery" ? observations : undefined,
      location: deliveryType === "pickup" ? location : undefined,
      neighborhood: deliveryType === "delivery" ? finalNeighborhood : undefined,
      deliveryCost: deliveryType === "delivery" ? (selectedNeighborhood?.price || 0) : 0,
    }

    onContinue(info)
  }

  const canContinue = deliveryType && name && phone && 
    (deliveryType === "pickup" 
      ? location 
      : address && neighborhood && (neighborhood !== NOT_IN_LIST_OPTION.name || customNeighborhood.trim())
    )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button variant="ghost" onClick={onBack} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Atrás
          </Button>
          <h1 className="text-xl font-bold text-brown-900">Información de Entrega</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 pb-24">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brown-900 mb-2">¿Es para domicilio o para recoger?</h2>
        </div>

        {/* Delivery Type Selection */}
        <Card className="mb-6 border-2 border-green-200">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="delivery"
                name="deliveryType"
                value="delivery"
                checked={deliveryType === "delivery"}
                onChange={(e) => {
                  setDeliveryType(e.target.value as "delivery")
                  setLocation(undefined)
                }}
                className="w-4 h-4 text-green-600"
              />
              <Label htmlFor="delivery" className="cursor-pointer text-lg font-medium text-brown-900">
                🏠 Domicilio
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="radio"
                id="pickup"
                name="deliveryType"
                value="pickup"
                checked={deliveryType === "pickup"}
                onChange={(e) => {
                  setDeliveryType(e.target.value as "pickup")
                  setAddress("")
                  setObservations("")
                  setNeighborhood("")
                  setCustomNeighborhood("")
                }}
                className="w-4 h-4 text-green-600"
              />
              <Label htmlFor="pickup" className="cursor-pointer text-lg font-medium text-brown-900">
                🏪 Recoger en tienda
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information - Required for both delivery and pickup */}
        <Card className="mb-6 border-2 border-green-200">
          <CardHeader>
            <CardTitle className="text-brown-900">Datos de contacto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-brown-900">
                Nombre completo *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tu nombre completo"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-brown-900">
                Número de celular *
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="3001234567"
                className="mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Delivery Form */}
        {deliveryType === "delivery" && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-brown-900">Datos de entrega</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="address" className="text-brown-900">
                  Dirección completa *
                </Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Calle, carrera, número, barrio"
                  className="mt-1"
                />
              </div>
              
              {/* Aviso importante sobre barrios */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      ¡Importante!
                    </p>
                    <p className="text-sm text-blue-700">
                      Si no encuentras tu barrio, selecciona "MI BARRIO NO ESTÁ EN LA LISTA"
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="neighborhood" className="text-brown-900">
                  Barrio *
                </Label>
                <Input
                  id="neighborhoodSearch"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar barrio..."
                  className="mt-1 mb-2"
                />
                <div className="max-h-40 overflow-y-auto border rounded-md">
                  {neighborhoodOptions.map((n, index) => (
                    <div 
                      key={`${n.name}-${index}`} 
                      className={`flex items-center space-x-3 p-2 hover:bg-green-50 ${
                        n.name === NOT_IN_LIST_OPTION.name ? 'bg-orange-50 border-b border-orange-200' : ''
                      }`}
                    >
                      <input
                        type="radio"
                        id={`${n.name}-${index}`}
                        name="neighborhood"
                        value={n.name}
                        checked={neighborhood === n.name}
                        onChange={(e) => {
                          setNeighborhood(e.target.value)
                          if (e.target.value !== NOT_IN_LIST_OPTION.name) {
                            setCustomNeighborhood("")
                          }
                        }}
                        className="w-4 h-4 text-green-600"
                      />
                      <Label htmlFor={`${n.name}-${index}`} className="cursor-pointer flex-1">
                        <span className={`text-sm ${
                          n.name === NOT_IN_LIST_OPTION.name 
                            ? 'text-orange-800 font-medium' 
                            : 'text-brown-900'
                        }`}>
                          {n.name === NOT_IN_LIST_OPTION.name ? ' ' : ''}{n.name}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>

                {/* Campo para escribir barrio personalizado */}
                {neighborhood === NOT_IN_LIST_OPTION.name && (
                  <div className="mt-3">
                    <Label htmlFor="customNeighborhood" className="text-brown-900">
                      Escribe el nombre de tu barrio *
                    </Label>
                    <Input
                      id="customNeighborhood"
                      value={customNeighborhood}
                      onChange={(e) => setCustomNeighborhood(e.target.value)}
                      placeholder="Nombre de tu barrio"
                      className="mt-1"
                    />
                  </div>
                )}

                {/* Mostrar información del barrio seleccionado */}
                {neighborhood && neighborhood !== NOT_IN_LIST_OPTION.name && (
                  <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-md">
                    <p className="text-sm text-green-800 font-medium">
                      ✅ Barrio seleccionado: <strong>{neighborhood}</strong>
                    </p>
                    <p className="text-sm text-green-700">
                      Costo de domicilio:{" "}
                      <strong className="text-green-600">
                        +${neighborhoods.find((n) => n.name === neighborhood)?.price.toLocaleString()}
                      </strong>
                    </p>
                  </div>
                )}

                {/* Aviso para barrio no en lista */}
                {neighborhood === NOT_IN_LIST_OPTION.name && customNeighborhood && (
                  <div className="mt-3 p-3 bg-orange-100 border border-orange-300 rounded-md">
                    <p className="text-sm text-orange-800 font-medium">
                      ⏳ Barrio: <strong>{customNeighborhood}</strong>
                    </p>
                    <p className="text-sm text-orange-700">
                      El costo de domicilio será confirmado por WhatsApp (entre $4,000 - $10,000)
                    </p>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="observations" className="text-brown-900">
                  Observaciones
                </Label>
                <Textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Referencias adicionales, apartamento, etc."
                  className="mt-1"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Pickup Location Selection */}
        {deliveryType === "pickup" && (
          <Card className="mb-6 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-brown-900">¿En cuál sede deseas recoger tu pedido?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((loc) => (
                <div
                  key={loc.id}
                  className="border-2 rounded-lg p-4 hover:bg-green-50 transition-colors border-green-200"
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="radio"
                      id={loc.id}
                      name="location"
                      value={loc.id}
                      checked={location === loc.id}
                      onChange={(e) => setLocation(e.target.value as "anturios" | "sachamate")}
                      className="w-4 h-4 text-green-600 mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor={loc.id} className="cursor-pointer">
                        <div className="font-bold text-brown-900 text-lg mb-1">{loc.name}</div>
                        <div className="text-brown-600 text-sm">{loc.address}</div>
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(loc.mapUrl, "_blank")}
                        className="mt-3 text-green-600 border-green-300 hover:bg-green-50"
                      >
                        <MapPin className="w-4 h-4 mr-1" />
                        Ver ubicación en mapa
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {deliveryType === "pickup" && (
                <div className="mt-4 p-3 bg-blue-100 border border-blue-300 rounded-md">
                  <p className="text-sm text-blue-800 font-medium">
                    📞 Te contactaremos cuando tu pedido esté listo para recoger
                  </p>
                  <p className="text-sm text-blue-700 mt-1">Tiempo estimado de preparación: 20-30 minutos</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Fixed Continue Button */}
      <div className="fixed bottom-4 left-4 right-4 z-20">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!canContinue}
            className="w-full h-14 text-lg font-semibold bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white rounded-xl shadow-lg"
          >
            Continuar al pago
          </Button>
        </div>
      </div>
    </div>
  )
}