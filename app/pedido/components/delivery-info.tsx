"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, MapPin, AlertCircle, Search, X } from "lucide-react"
import type { DeliveryInfo as DeliveryInfoType } from "./order-flow"

interface DeliveryInfoProps {
  onBack: () => void
  onContinue: (info: DeliveryInfoType) => void
}

interface LocationOption {
  name: string
  price: number
  type: "barrio" | "unidad" | "otro"
}

const neighborhoods = [
  { name: "ANGEL MARIA CAMACHO", price: 4000, type: "barrio" },
  { name: "ALFEREZ REAL", price: 4000, type: "barrio" },
  { name: "ADRIANITA", price: 4000, type: "barrio" },
  { name: "ALBORADA", price: 4000, type: "barrio" },
  { name: "AURORA", price: 4000, type: "barrio" },
  { name: "ACACIAS", price: 4000, type: "barrio" },
  { name: "BRISAS DEL ROSARIO", price: 4000, type: "barrio" },
  { name: "BELLO HORIZONTE", price: 4000, type: "barrio" },
  { name: "ANTURIOS", price: 3000, type: "barrio" },
  { name: "CENTENARIO", price: 4000, type: "barrio" },
  { name: "CANTABRIA", price: 4000, type: "barrio" },
  { name: "CIRO VELASCO", price: 4000, type: "barrio" },
  { name: "CIUDAD SUR", price: 4000, type: "barrio" },
  { name: "COVICEDROS", price: 4000, type: "barrio" },
  { name: "DORADO", price: 4000, type: "barrio" },
  { name: "ESPERANZA", price: 4000, type: "barrio" },
  { name: "ESMERALDA", price: 4000, type: "barrio" },
  { name: "ESTACION", price: 4000, type: "barrio" },
  { name: "HOJARASCA", price: 4000, type: "barrio" },
  { name: "JUAN DE AMPUDIA", price: 4000, type: "barrio" },
  { name: "JUAN PABLO II", price: 4000, type: "barrio" },
  { name: "LIBERTADORES", price: 4000, type: "barrio" },
  { name: "LA LUCHA", price: 4000, type: "barrio" },
  { name: "PANAMERICANO", price: 5000, type: "barrio" },
  { name: "PILOTO", price: 4000, type: "barrio" },
  { name: "POPULAR", price: 4000, type: "barrio" },
  { name: "PORVENIR", price: 4000, type: "barrio" },
  { name: "PRIMERO DE MAYO", price: 4000, type: "barrio" },
  { name: "LA PRADERA", price: 4000, type: "barrio" },
  { name: "ROSARIO", price: 4000, type: "barrio" },
  { name: "RINCON DE ZARAGOZA", price: 4000, type: "barrio" },
  { name: "RINCON DE LAS GARZAS", price: 4000, type: "barrio" },
  { name: "RIBERAS DEL ROSARIO", price: 4000, type: "barrio" },
  { name: "SIGLO XXI", price: 5000, type: "barrio" },
  { name: "SACHAMATE (CASA)", price: 2000, type: "barrio" },
  { name: "SOLAR DE LAS GARZAS", price: 4000, type: "barrio" },
  { name: "SIMON BOLIVAR", price: 4000, type: "barrio" },
  { name: "SANTA ANA", price: 4000, type: "barrio" },
  { name: "SOCORRO", price: 4000, type: "barrio" },
  { name: "RECANTO", price: 3000, type: "barrio" },
  { name: "VENTINO", price: 3000, type: "barrio" },
  { name: "VERONA", price: 4000, type: "barrio" },
  { name: "ARBOLEDA", price: 4000, type: "barrio" },
  { name: "SAN BENITO 1", price: 8000, type: "barrio" },
  { name: "SAN BENITO 2", price: 9000, type: "barrio" },
  { name: "PARQUES DE CASTILLA", price: 4000, type: "barrio" },
  { name: "PALO SANTO", price: 4000, type: "barrio" },
  { name: "BELALCAZAR II", price: 5000, type: "barrio" },
  { name: "AMIGOS 2000", price: 6000, type: "barrio" },
  { name: "BELALCAZAR I", price: 4000, type: "barrio" },
  { name: "CONDADO DEL SUR", price: 5000, type: "barrio" },
  { name: "JARDIN I", price: 5000, type: "barrio" },
  { name: "JARDIN II", price: 6000, type: "barrio" },
  { name: "LA ALBORADA", price: 5000, type: "barrio" },
  { name: "MANDARINOS", price: 6000, type: "barrio" },
  { name: "MAKUNAIMA", price: 5000, type: "barrio" },
  { name: "MARGARITAS", price: 6000, type: "barrio" },
  { name: "OPORTO", price: 5000, type: "barrio" },
  { name: "PORTAL DEL JORDAN", price: 4000, type: "barrio" },
  { name: "PORTAL DE JAMUNDI", price: 4000, type: "barrio" },
  { name: "PORTAL DEL SAMAN", price: 4000, type: "barrio" },
  { name: "LAS PALMAS", price: 6000, type: "barrio" },
  { name: "QUINTAS DE BOLIVAR", price: 5000, type: "barrio" },
  { name: "VILLA ESTELA", price: 5000, type: "barrio" },
  { name: "VILLA MAITE", price: 5000, type: "barrio" },
  { name: "VILLA PAULINA", price: 4000, type: "barrio" },
  { name: "VILLA PIME 1", price: 5000, type: "barrio" },
  { name: "VILLA PIME 2", price: 5000, type: "barrio" },
  { name: "VILLA DEL SOL", price: 5000, type: "barrio" },
  { name: "VILLA ELVIRA", price: 4000, type: "barrio" },
  { name: "VILLA MONICA", price: 4000, type: "barrio" },
  { name: "VILLA TATIANA", price: 4000, type: "barrio" },
    { name: "MANÀ", price: 8000, type: "barrio" },
  { name: "CIUDAD DE DIOS I Y II", price: 8000, type: "barrio" },
]

const residentialUnits = [
  { name: "LA ARBOLEDA", price: 4000, type: "unidad" },
  { name: "ALAMEDA DE RIO CLARO (Bloques aptos)", price: 6000, type: "unidad" },
  { name: "PINARES PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "ARRAYANES PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "CELESTA PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "ROSETO PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "SOLARIA PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "AMBERES PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "TRENTO PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "FIORELI PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "ALTEA PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "SOLÉ PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "CATANIA PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "BRISSEA PARQUE NATURA", price: 5000, type: "unidad" },
  { name: "PARQUES DE CASTILLA 1 O 2", price: 4000, type: "unidad" },
  { name: "LOS NARANJOS", price: 4000, type: "unidad" },
  { name: "SOLARES DE SACHAMATE", price: 6000, type: "unidad" },
  { name: "COUNTRY PLAZA II", price: 7000, type: "unidad" },
  { name: "COUNTRY PLAZA I", price: 7000, type: "unidad" },
  { name: "SOL DEL CAMPO", price: 6000, type: "unidad" },
  { name: "SOL DE LA ARBOLEDA", price: 6000, type: "unidad" },
  { name: "SOL DE LA LLANURA", price: 6000, type: "unidad" },
  { name: "SOL DEL BOSQUE", price: 6000, type: "unidad" },
  { name: "SOL DE PRIMAVERA", price: 6000, type: "unidad" },
  { name: "SAN CAYETANO", price: 6000, type: "unidad" },
  { name: "TORRES DE JAMUNDI", price: 5000, type: "unidad" },
  { name: "VILLAS DE ALTAGRACIA", price: 4000, type: "unidad" },
  { name: "PRADOS DE ALFAGUARA", price: 4000, type: "unidad" },
  { name: "ALEGRA", price: 5000, type: "unidad" },
  { name: "VERDI", price: 7000, type: "unidad" },
  { name: "GUAYACANES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "ALMENDROS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "PALMERAS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "GUADUALES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "CASA CAMPO CONJUNTO RESIDENCIAL", price: 8000, type: "unidad" },
  { name: "TANGELOS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "LAGOS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "FARALLONES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "ENTRELAGOS CONJUNTO RESIDENCIAL", price: 8000, type: "unidad" },
  { name: "VILLAS DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "HONTANAR DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "MANANTIAL DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "FONTANAR DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "SENDEROS DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "RINCON DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "GUADUALES DE LAS MERCEDES", price: 12000, type: "unidad" },
  { name: "VALLE DEL RIO", price: 12000, type: "unidad" },
  { name: "VALLE VERDE", price: 12000, type: "unidad" },
  { name: "BALCONES DE VERDE HORIZONTE", price: 12000, type: "unidad" },
  { name: "PORTALES DE VERDE HORIZONTE", price: 12000, type: "unidad" },
  { name: "PRADERAS DE VERDE HORIZONTE", price: 12000, type: "unidad" },
  { name: "SENDEROS DE VERDE HORIZONTE", price: 12000, type: "unidad" },
  { name: "RINCON DE LOS GUADUALES", price: 12000, type: "unidad" },

  { name: "BAMBÙ", price: 4000, type: "unidad" },
  { name: "CARBONERO", price: 4000, type: "unidad" },
  { name: "KOA", price: 3000, type: "unidad" },
  { name: "MIRADOR DE FARALLONES", price: 4000, type: "unidad" },
  { name: "FORESTAL AQUA", price: 6000, type: "unidad" },
  { name: "VILLAS DEL PARQUE", price: 7000, type: "unidad" },
  { name: "SENDEROS DE LA MORADA", price: 12000, type: "unidad" },
  { name: "RESERVAS DE RIO CLARO", price: 12000, type: "unidad" },
  { name: "CLUB DE CAMPO LA MORADA", price: 12000, type: "unidad" },
  { name: "SOLARES DE LA MORADA", price: 12000, type: "unidad" },
  { name: "REMANSOS DE LA MORADA", price: 12000, type: "unidad" },
  { name: "PARAISO DE LA MORADA", price: 12000, type: "unidad" },
  { name: "SAMANES DE LA MORADA", price: 12000, type: "unidad" },
  { name: "SAN MARINO", price: 6000, type: "unidad" },
  { name: "ARBORE COUNTRY CLUB", price: 12000, type: "unidad" },
  { name: "ALONDRA CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "TURPIAL CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "AZOR CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "FALCO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "JACAMAR CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "JILGUERO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "MILANO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "MORITO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "QUETZAL CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "TUCÁN CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "KINKINA CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "COCLÍ CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "FRAGATA CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "TÁNGARA CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "FLAMINGO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "CIRUELO CIUDAD COUNTRY", price: 8000, type: "unidad" },
  { name: "PASEO DE PANGOLA", price: 5000, type: "unidad" },
  { name: "PAISAJE DE PANGOLA", price: 5000, type: "unidad" },
  { name: "CAMINOS DE PANGOLA", price: 5000, type: "unidad" },
  { name: "CAMPOS DE PANGOLA", price: 5000, type: "unidad" },
  { name: "PARAÍSO DE PANGOLA", price: 5000, type: "unidad" },
  { name: "HACIENDA EL PINO", price: 4000, type: "unidad" },
]
// Opción especial para cuando no encuentran su opción
const NOT_IN_LIST_OPTION: LocationOption = {
  name: "NO ENCUENTRO MI BARRIO O UNIDAD RESIDENCIAL",
  price: 0,
  type: "otro"
}

// Función para normalizar el texto para búsqueda
const normalizeSearchText = (text: string) => {
  return text
    .toLowerCase()
    .replace(/^(la|el|los|las|un|uno|una|unos|unas)\s+/i, '')
    .replace(/[^a-z0-9áéíóúüñ\s]/gi, '')
    .trim()
}

// Función de búsqueda mejorada
const searchLocations = (term: string, locations: LocationOption[]) => {
  if (!term.trim()) return []

  const normalizedTerm = normalizeSearchText(term)
  const termParts = normalizedTerm.split(/\s+/)

  return locations.map(location => {
    const normalizedName = normalizeSearchText(location.name)
    
    let score = 0
    
    // Coincidencia exacta
    if (normalizedName === normalizedTerm) score += 100
    
    // Término incluido en el nombre
    if (normalizedName.includes(normalizedTerm)) score += 50
    
    // Todas las partes del término coinciden
    const allPartsMatch = termParts.every(part => normalizedName.includes(part))
    if (allPartsMatch) score += termParts.length * 10
    
    // Algunas partes coinciden
    const somePartsMatch = termParts.some(part => normalizedName.includes(part))
    if (somePartsMatch) score += 5

    return { ...location, score }
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(({ score, ...rest }) => rest)
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
  const [locationType, setLocationType] = useState<"barrio" | "unidad" | "">("")
  const [isSearchActive, setIsSearchActive] = useState(false)

  const locations = [
    {
      id: "anturios" as const,
      name: "Sede Anturios",
      address: "Cra 19A #3-03 frente a Los Naranjos / Parque natura",
      mapUrl: "https://maps.app.goo.gl/33vmvieN2cqjqE5f6",
    },
    {
      id: "sachamate" as const,
      name: "Sede Sachamate",
      address: "Cra 18 #12-22 Barrio Sachamate",
      mapUrl: "https://maps.app.goo.gl/GnmVHC39gcTEv2Fd8",
    },
  ]

  // Filtrar opciones basado en el término de búsqueda
  const filteredNeighborhoods = searchTerm.trim() 
    ? searchLocations(searchTerm, neighborhoods)
    : []

  const filteredResidentialUnits = searchTerm.trim() 
    ? searchLocations(searchTerm, residentialUnits)
    : []

const allOptions = [
  ...filteredNeighborhoods,
  ...filteredResidentialUnits,
  NOT_IN_LIST_OPTION  // Ahora aparece al final
]
  const handleContinue = () => {
    if (!deliveryType || !name || !phone) return

    if (deliveryType === "delivery") {
      if (!address || !neighborhood) return
      if (neighborhood === NOT_IN_LIST_OPTION.name && !customNeighborhood.trim()) return
    } else {
      if (!location) return
    }

    const selectedOption = [...neighborhoods, ...residentialUnits].find((n) => n.name === neighborhood)
    const finalNeighborhood = neighborhood === NOT_IN_LIST_OPTION.name ? customNeighborhood : neighborhood
    
    const info: DeliveryInfoType = {
      type: deliveryType,
      name,
      phone,
      address: deliveryType === "delivery" ? address : undefined,
      observations: deliveryType === "delivery" ? observations : undefined,
      location: deliveryType === "pickup" ? location : undefined,
      neighborhood: deliveryType === "delivery" ? finalNeighborhood : undefined,
      deliveryCost: deliveryType === "delivery" ? (selectedOption?.price || 0) : 0,
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
                📍 Recoger en tienda
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
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
                  placeholder="Calle, carrera, casa / torre, apto"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-brown-900 block mb-2">
                  ¿Dónde te encuentras? *
                </Label>
                <div className="flex space-x-4 mb-4">
                  <Button
                    variant={locationType === "barrio" ? "default" : "outline"}
                    onClick={() => {
                      setLocationType("barrio")
                      setNeighborhood("")
                      setCustomNeighborhood("")
                      setSearchTerm("")
                      setIsSearchActive(false)
                    }}
                    className="flex-1"
                  >
                    Barrio
                  </Button>
                  <Button
                    variant={locationType === "unidad" ? "default" : "outline"}
                    onClick={() => {
                      setLocationType("unidad")
                      setNeighborhood("")
                      setCustomNeighborhood("")
                      setSearchTerm("")
                      setIsSearchActive(false)
                    }}
                    className="flex-1"
                  >
                    Unidad Residencial
                  </Button>
                </div>
              </div>

              {locationType && (
                <div>
                  <Label htmlFor="neighborhood" className="text-brown-900">
                    {locationType === "barrio" ? "Barrio *" : "Unidad Residencial *"}
                  </Label>
                  
                  {/* Mostrar selección actual o botón de búsqueda */}
                  {!isSearchActive && neighborhood && neighborhood !== NOT_IN_LIST_OPTION.name ? (
                    <div className="mt-1 p-3 bg-green-100 border border-green-300 rounded-md flex items-center justify-between">
                      <div>
                        <p className="text-sm text-green-800 font-medium">
                          ✅ {locationType === "barrio" ? "Barrio" : "Unidad Residencial"}: <strong>{neighborhood}</strong>
                        </p>
                        <p className="text-sm text-green-700">
                          Costo de domicilio: <strong className="text-green-600">
                            +${[...neighborhoods, ...residentialUnits].find((n) => n.name === neighborhood)?.price.toLocaleString()}
                          </strong>
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsSearchActive(true)
                          setSearchTerm("")
                        }}
                        className="ml-2"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : !isSearchActive && neighborhood === NOT_IN_LIST_OPTION.name && customNeighborhood ? (
                    <div className="mt-1 p-3 bg-orange-100 border border-orange-300 rounded-md flex items-center justify-between">
                      <div>
                        <p className="text-sm text-orange-800 font-medium">
                          ⏳ {locationType === "barrio" ? "Barrio" : "Unidad Residencial"}: <strong>{customNeighborhood}</strong>
                        </p>
                        <p className="text-sm text-orange-700">
                          El costo de domicilio será confirmado por WhatsApp (entre $4,000 - $12,000)
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsSearchActive(true)
                          setSearchTerm("")
                        }}
                        className="ml-2"
                      >
                        <Search className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex mt-1">
                        <Input
                          id="neighborhoodSearch"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          placeholder={`Busca tu ${locationType === "barrio" ? "barrio" : "unidad residencial"} aquí`}
                          className="flex-1"
                        />
                        {(isSearchActive || neighborhood) && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setIsSearchActive(false)
                              setSearchTerm("")
                            }}
                            className="ml-2"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      
                      {searchTerm.trim() && (
                        <div className="max-h-60 overflow-y-auto border rounded-md mt-2">
                          {allOptions.length === 0 ? (
                            <div className="p-3 text-center text-gray-500">
                              No encontramos resultados para "{searchTerm}"
                              <div className="text-sm mt-1">
                                Prueba con palabras más generales o revisa la ortografía
                              </div>
                            </div>
                          ) : (
                            allOptions.map((option, index) => {
                              if (locationType === "barrio" && option.type !== "barrio" && option.type !== "otro") return null
                              if (locationType === "unidad" && option.type !== "unidad" && option.type !== "otro") return null
                              
                              return (
                                <div 
                                  key={`${option.name}-${index}`} 
                                  className={`flex items-center space-x-3 p-2 hover:bg-green-50 ${
                                    option.name === NOT_IN_LIST_OPTION.name ? 'bg-orange-50 border-b border-orange-200' : ''
                                  }`}
                                >
                                  <input
                                    type="radio"
                                    id={`${option.name}-${index}`}
                                    name="neighborhood"
                                    value={option.name}
                                    checked={neighborhood === option.name}
                                    onChange={(e) => {
                                      setNeighborhood(e.target.value)
                                      if (e.target.value !== NOT_IN_LIST_OPTION.name) {
                                        setCustomNeighborhood("")
                                        setIsSearchActive(false)
                                      }
                                    }}
                                    className="w-4 h-4 text-green-600"
                                  />
                                  <Label htmlFor={`${option.name}-${index}`} className="cursor-pointer flex-1">
                                    <span className={`text-sm ${
                                      option.name === NOT_IN_LIST_OPTION.name 
                                        ? 'text-orange-800 font-medium' 
                                        : 'text-brown-900'
                                    }`}>
                                      {option.name}
                                    </span>
                                    {option.name !== NOT_IN_LIST_OPTION.name && (
                                      <span className="text-xs text-gray-500 ml-2">
                                        {option.type === "unidad" ? "Unidad Residencial" : "Barrio"}
                                      </span>
                                    )}
                                  </Label>
                                </div>
                              )
                            })
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {/* Input para barrio/unidad personalizada */}
                  {neighborhood === NOT_IN_LIST_OPTION.name && isSearchActive && (
                    <div className="mt-3">
                      <Label htmlFor="customNeighborhood" className="text-brown-900">
                        {locationType === "barrio" 
                          ? "Escribe el nombre de tu barrio *" 
                          : "Escribe el nombre de tu unidad residencial *"}
                      </Label>
                      <Input
                        id="customNeighborhood"
                        value={customNeighborhood}
                        onChange={(e) => setCustomNeighborhood(e.target.value)}
                        placeholder={locationType === "barrio" 
                          ? "Nombre de tu barrio" 
                          : "Nombre de tu unidad residencial"}
                        className="mt-1"
                      />
                      <Button
                        onClick={() => {
                          if (customNeighborhood.trim()) {
                            setIsSearchActive(false)
                          }
                        }}
                        disabled={!customNeighborhood.trim()}
                        className="mt-2 w-full"
                        size="sm"
                      >
                        Confirmar ubicación
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              <div>
                <Label htmlFor="observations" className="text-brown-900">
                  Observaciones
                </Label>
                <Textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Referencias adicionales"
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