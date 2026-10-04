"use client"

import { MapPin, Search, X, ArrowRight } from "lucide-react"
import type { DeliveryInfo as DeliveryInfoType } from "./order-flow"
import { PedidoHeader, PedidoPage, PedidoBody, OrderPanel, advanceToNextSection, Section, OptionCard, Field, useDraft, useToast } from "./pedido-ui"

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
  { name: "ALBORADA", price: 5000, type: "barrio" },
  { name: "AURORA", price: 5000, type: "barrio" },
  { name: "ACACIAS", price: 5000, type: "barrio" },
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
  { name: "ARBOLEDA", price: 5000, type: "barrio" },
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
  { name: "MANDARINOS", price: 5000, type: "barrio" },
  { name: "MAKUNAIMA", price: 5000, type: "barrio" },
  { name: "MARGARITAS", price: 6000, type: "barrio" },
  { name: "OPORTO", price: 5000, type: "barrio" },
  { name: "PORTAL DEL JORDAN", price: 4000, type: "barrio" },
  { name: "PORTAL DE JAMUNDI 3", price: 6000, type: "barrio" },
  { name: "PORTAL DE JAMUNDI 2", price: 6000, type: "barrio" },
  { name: "PORTAL DE JAMUNDI", price: 5000, type: "barrio" },
  { name: "PORTAL DEL SAMAN", price: 4000, type: "barrio" },
  { name: "PORTAL DEL SAMAN 2", price: 6000, type: "barrio" },
  { name: "LAS PALMAS", price: 6000, type: "barrio" },
  { name: "QUINTAS DE BOLIVAR", price: 5000, type: "barrio" },
  { name: "VILLA ESTELA", price: 5000, type: "barrio" },
  { name: "VILLA MAITE", price: 5000, type: "barrio" },
  { name: "VILLA PAULINA", price: 4000, type: "barrio" },
  { name: "VILLA PIME 1", price: 5000, type: "barrio" },
  { name: "VILLA PIME 2", price: 6000, type: "barrio" },
  { name: "VILLA DEL SOL", price: 5000, type: "barrio" },
  { name: "VILLA ELVIRA", price: 4000, type: "barrio" },
  { name: "VILLA MONICA", price: 4000, type: "barrio" },
  { name: "VILLA TATIANA", price: 5000, type: "barrio" },
  { name: "MANÀ", price: 8000, type: "barrio" },
  { name: "CIUDAD DE DIOS I", price: 9000, type: "barrio" },
  { name: "CIUDAD DE DIOS II", price: 10000, type: "barrio" },
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
  { name: "FORESTA PARQUE NATURA", price: 5000, type: "unidad" },
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
  { name: "ALEGRA", price: 6000, type: "unidad" },
  { name: "VERDI", price: 7000, type: "unidad" },
  { name: "FORESTAL SUN", price: 6000, type: "unidad" },
  { name: "CASAVENTO DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "GUAYACANES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "ALMENDROS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "PALMERAS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "GUADUALES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "CASA CAMPO CONJUNTO RESIDENCIAL", price: 8000, type: "unidad" },
  { name: "CASA TERRA CONJUNTO RESIDENCIAL", price: 8000, type: "unidad" },
  { name: "CASA LAGO CONJUNTO RECIDENCIAL", price: 10000, type: "unidad" },
  { name: "MIRALAGOS CONJUNTO RECIDENCIAL", price: 10000, type: "unidad" },
  { name: "CASA AZUL CONJUNTO RESIDENCIAL", price: 8000, type: "unidad" },
  { name: "TANGELOS DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "LAGOS DE VERDE ALFAGUARA", price: 10000, type: "unidad" },
  { name: "FARALLONES DE VERDE ALFAGUARA", price: 8000, type: "unidad" },
  { name: "ENTRE LAGOS CONJUNTO RESIDENCIAL", price: 10000, type: "unidad" },
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
  { name: "BALCONES DE VERDE HORIZONTE", price: 13000, type: "unidad" },
  { name: "PORTALES DE VERDE HORIZONTE", price: 13000, type: "unidad" },
  { name: "PRADERAS DE VERDE HORIZONTE", price: 13000, type: "unidad" },
  { name: "SENDEROS DE VERDE HORIZONTE", price: 13000, type: "unidad" },
  { name: "RINCON DE LOS GUADUALES", price: 13000, type: "unidad" },
  { name: "BAMBÙ", price: 4000, type: "unidad" },
  { name: "CARBONERO", price: 4000, type: "unidad" },
  { name: "KOA", price: 3000, type: "unidad" },
  { name: "MIRADOR DE FARALLONES PARQUE NATURA", price: 4000, type: "unidad" },
  { name: "FORESTAL AQUA", price: 6000, type: "unidad" },
  
  { name: "VILLAS DEL PARQUE", price: 9000, type: "unidad" },
  { name: "SENDEROS DE LA MORADA", price: 12000, type: "unidad" },
  { name: "RESERVAS DE RIO CLARO", price: 12000, type: "unidad" },
  { name: "CLUB DE CAMPO LA MORADA", price: 12000, type: "unidad" },
  { name: "SOLARES DE LA MORADA", price: 12000, type: "unidad" },
  { name: "REMANSOS DE LA MORADA", price: 12000, type: "unidad" },
  { name: "PARAISO DE LA MORADA", price: 12000, type: "unidad" },
  { name: "SAMANES DE LA MORADA", price: 12000, type: "unidad" },
  { name: "SAN MARINO", price: 6000, type: "unidad" },
  { name: "ARBORE COUNTRY CLUB", price: 12000, type: "unidad" },
  { name: "ALONDRA CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "TURPIAL CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "AZOR CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "FALCO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "JACAMAR CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "JILGUERO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "MILANO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "MORITO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "QUETZAL CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "TUCÁN CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "KINKINA CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "COCLÍ CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "FRAGATA CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "TÁNGARA CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "FLAMINGO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "CIRUELO CIUDAD COUNTRY", price: 9000, type: "unidad" },
  { name: "PASEO DE PANGOLA", price: 6000, type: "unidad" },
  { name: "PAISAJE DE PANGOLA", price: 6000, type: "unidad" },
  { name: "CAMINOS DE PANGOLA", price: 6000, type: "unidad" },
  { name: "CAMPOS DE PANGOLA", price: 6000, type: "unidad" },
  { name: "PARAÍSO DE PANGOLA", price: 6000, type: "unidad" },
  { name: "SURCOS DE PANGOLA", price: 6000, type: "unidad" },
  { name: "HACIENDA EL PINO", price: 4000, type: "unidad" },
  { name: "PALMETUM PARK", price: 4000, type: "unidad" },
 
]
// Opción especial para cuando no encuentran su opción
const NOT_IN_LIST_OPTION: LocationOption = {
  name: "NO ENCUENTRO MI BARRIO O UNIDAD RESIDENCIAL",
  price: 0,
  type: "otro"
}

// Celular colombiano: solo dígitos; se quita el prefijo +57 si lo pegan completo; máximo 10 dígitos
const normalizePhone = (value: string) => {
  let digits = value.replace(/\D/g, "")
  if (digits.length > 10 && digits.startsWith("57")) digits = digits.slice(2)
  return digits.slice(0, 10)
}

const getPhoneError = (phone: string) => {
  if (!phone) return undefined
  if (phone[0] !== "3") return "Los celulares en Colombia empiezan por 3."
  if (phone.length < 10) return `Faltan ${10 - phone.length} dígitos (son 10 en total).`
  return undefined
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
  const toast = useToast()
  const [deliveryType, setDeliveryType] = useDraft<"delivery" | "pickup" | "">("delivery.deliveryType", "")
  const [name, setName] = useDraft("delivery.name", "")
  const [phone, setPhone] = useDraft("delivery.phone", "")
  const [address, setAddress] = useDraft("delivery.address", "")
  const [observations, setObservations] = useDraft("delivery.observations", "")
  const [location, setLocation] = useDraft<"anturios" | "sachamate" | undefined>("delivery.location", undefined)
  const [neighborhood, setNeighborhood] = useDraft("delivery.neighborhood", "")
  const [customNeighborhood, setCustomNeighborhood] = useDraft("delivery.customNeighborhood", "")
  const [searchTerm, setSearchTerm] = useDraft("delivery.searchTerm", "")
  const [locationType, setLocationType] = useDraft<"barrio" | "unidad" | "">("delivery.locationType", "")
  const [isSearchActive, setIsSearchActive] = useDraft("delivery.isSearchActive", false)

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
    if (!deliveryType) return toast("Elige si es a domicilio o para recoger en tienda.")
    if (!name.trim()) return toast("Escribe tu nombre completo.")
    if (!phone.trim()) return toast("Escribe tu número de celular.")
    if (getPhoneError(phone)) return toast(`Revisa tu celular: ${getPhoneError(phone)}`, "error")

    if (deliveryType === "delivery") {
      if (!address.trim()) return toast("Escribe tu dirección completa.")
      if (!locationType) return toast("Indica si estás en un barrio o en una unidad residencial.")
      if (!neighborhood) return toast(`Busca y elige tu ${locationType === "barrio" ? "barrio" : "unidad residencial"}.`)
      if (neighborhood === NOT_IN_LIST_OPTION.name && !customNeighborhood.trim()) {
        return toast(`Escribe el nombre de tu ${locationType === "barrio" ? "barrio" : "unidad residencial"}.`)
      }
    } else {
      if (!location) return toast("Elige la sede donde vas a recoger tu pedido.")
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

  const canContinue = deliveryType && name && phone && !getPhoneError(phone) && 
    (deliveryType === "pickup" 
      ? location 
      : address && neighborhood && (neighborhood !== NOT_IN_LIST_OPTION.name || customNeighborhood.trim())
    )

  const selectedPrice = [...neighborhoods, ...residentialUnits].find((n) => n.name === neighborhood)?.price ?? 0

  const kindLabel = locationType === "barrio" ? "Barrio" : "Unidad Residencial"

  const resetLocation = (type: "barrio" | "unidad") => {
    setLocationType(type)
    setNeighborhood("")
    setCustomNeighborhood("")
    setSearchTerm("")
    setIsSearchActive(false)
  }

  const reopenSearch = () => {
    setIsSearchActive(true)
    setSearchTerm("")
  }

  const smallIconBtn =
    "flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-white transition-colors hover:bg-jussi-orange"

  return (
    <PedidoPage>
      <PedidoHeader title="Datos de entrega" onBack={onBack} step={3} />

      <PedidoBody
        aside={<OrderPanel deliveryCost={deliveryType === "delivery" ? selectedPrice : 0} />}
        actions={
          <button
            onClick={handleContinue}
            aria-disabled={!canContinue}
            className={`btn-pop btn-pop-red btn-pop-lg w-full ${canContinue ? "" : "opacity-60"}`}
          >
            Continuar al pago
            <ArrowRight className="h-5 w-5" />
          </button>
        }
      >
        <h2 className="mb-6 font-display text-3xl font-extrabold leading-tight md:mb-5 md:text-2xl">
          ¿Domicilio o <span className="text-jussi-red">para recoger</span>?
        </h2>

        <div
          data-step-section
          onClick={advanceToNextSection}
          className="mb-6 grid grid-cols-2 gap-4"
          role="radiogroup"
          aria-label="Tipo de entrega"
        >
          {[
            { id: "delivery" as const, emoji: "🏠", label: "Domicilio" },
            { id: "pickup" as const, emoji: "📍", label: "Recoger en tienda" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={deliveryType === opt.id}
              onClick={() => {
                setDeliveryType(opt.id)
                if (opt.id === "delivery") {
                  setLocation(undefined)
                } else {
                  setAddress("")
                  setObservations("")
                  setNeighborhood("")
                  setCustomNeighborhood("")
                }
              }}
              className={`card-soft flex flex-col items-center gap-2 p-5 text-center font-display text-lg font-extrabold transition-all duration-150 md:flex-row md:justify-center md:gap-3 md:p-4 md:text-base ${
                deliveryType === opt.id ? "bg-jussi-brown text-jussi-beige" : "bg-white hover:-translate-y-0.5"
              }`}
            >
              <span className="text-4xl md:text-2xl">{opt.emoji}</span>
              {opt.label}
            </button>
          ))}
        </div>

        <Section title="Datos de contacto">
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-4 lg:space-y-0">
            <Field id="name" label="Nombre completo *" value={name} onChange={setName} />
            <Field
              id="phone"
              label="Número de celular *"
              type="tel"
              inputMode="numeric"
              maxLength={14}
              value={phone}
              onChange={(v) => setPhone(normalizePhone(v))}
              error={getPhoneError(phone)}
              hint="Ej: 3001234567 (10 dígitos)"
            />
          </div>
        </Section>

        {deliveryType === "delivery" && (
          <Section title="Datos de entrega">
            <div className="space-y-5">
              <Field id="address" label="Dirección completa *" value={address} onChange={setAddress} hint="Calle, carrera, casa / torre, apto" />

              <div>
                <p className="mb-2 text-base font-bold">¿Dónde te encuentras? *</p>
                <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Tipo de ubicación">
                  {(
                    [
                      { id: "barrio", label: "Barrio" },
                      { id: "unidad", label: "Unidad Residencial" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      role="radio"
                      aria-checked={locationType === opt.id}
                      onClick={() => resetLocation(opt.id)}
                      className={`rounded-2xl ring-1 ring-jussi-brown/15 px-2 py-3 font-display font-bold transition-all ${
                        locationType === opt.id ? "bg-jussi-brown text-jussi-beige shadow-pop-sm" : "bg-jussi-beige/40 hover:-translate-y-0.5"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {locationType && (
                <div>
                                    {!isSearchActive && neighborhood && neighborhood !== NOT_IN_LIST_OPTION.name ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl ring-2 ring-jussi-brown bg-jussi-beige p-4">
                      <div>
                        <p className="font-display font-bold">✅ {neighborhood}</p>
                        <p className="text-base font-medium">
                          Costo de domicilio: <strong>+${[...neighborhoods, ...residentialUnits].find((n) => n.name === neighborhood)?.price.toLocaleString()}</strong>
                        </p>
                      </div>
                      <button onClick={reopenSearch} aria-label="Cambiar" className={smallIconBtn}>
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  ) : !isSearchActive && neighborhood === NOT_IN_LIST_OPTION.name && customNeighborhood ? (
                    <div className="flex items-center justify-between gap-3 rounded-2xl ring-1 ring-jussi-brown/15 bg-jussi-orange p-4">
                      <div>
                        <p className="font-display font-bold">⏳ {customNeighborhood}</p>
                        <p className="text-base font-medium">
                          El costo de domicilio será confirmado por WhatsApp (entre $4,000 - $12,000)
                        </p>
                      </div>
                      <button onClick={reopenSearch} aria-label="Cambiar" className={smallIconBtn}>
                        <Search className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <Field
                            id="neighborhoodSearch"
                            label={`Busca tu ${locationType === "barrio" ? "barrio" : "unidad residencial"} *`}
                            value={searchTerm}
                            onChange={setSearchTerm}
                          />
                        </div>
                        {(isSearchActive || neighborhood) && (
                          <button
                            onClick={() => {
                              setIsSearchActive(false)
                              setSearchTerm("")
                            }}
                            aria-label="Cancelar búsqueda"
                            className={smallIconBtn + " !h-16 !w-16"}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>

                      {searchTerm.trim() && (
                        <div className="mt-3 max-h-64 space-y-2 overflow-y-auto rounded-2xl ring-1 ring-jussi-brown/15 bg-white p-2">
                          {allOptions.length === 0 ? (
                            <div className="p-3 text-center opacity-80">
                              No encontramos resultados para "{searchTerm}"
                              <div className="mt-1 text-base">Prueba con palabras más generales o revisa la ortografía</div>
                            </div>
                          ) : (
                            allOptions.map((option, index) => {
                              if (locationType === "barrio" && option.type !== "barrio" && option.type !== "otro") return null
                              if (locationType === "unidad" && option.type !== "unidad" && option.type !== "otro") return null

                              const isOther = option.name === NOT_IN_LIST_OPTION.name
                              const selected = neighborhood === option.name

                              return (
                                <button
                                  type="button"
                                  key={`${option.name}-${index}`}
                                  role="radio"
                                  aria-checked={selected}
                                  onClick={() => {
                                    setNeighborhood(option.name)
                                    if (!isOther) {
                                      setCustomNeighborhood("")
                                      setIsSearchActive(false)
                                    }
                                  }}
                                  className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left text-base transition-colors ${
                                    isOther
                                      ? "bg-jussi-orange/40 font-bold"
                                      : selected
                                        ? "bg-jussi-brown text-jussi-beige"
                                        : "hover:bg-jussi-beige"
                                  }`}
                                >
                                  <span className="font-semibold">{option.name}</span>
                                  {!isOther && (
                                    <span className="flex-shrink-0 text-sm opacity-80">
                                      {option.type === "unidad" ? "Unidad" : "Barrio"}
                                    </span>
                                  )}
                                </button>
                              )
                            })
                          )}
                        </div>
                      )}
                    </>
                  )}

                  {neighborhood === NOT_IN_LIST_OPTION.name && isSearchActive && (
                    <div className="mt-4">
                      <Field
                        id="customNeighborhood"
                        label={locationType === "barrio" ? "Nombre de tu barrio *" : "Nombre de tu unidad residencial *"}
                        value={customNeighborhood}
                        onChange={setCustomNeighborhood}
                      />
                      <button
                        onClick={() => {
                          if (customNeighborhood.trim()) {
                            setIsSearchActive(false)
                          } else {
                            toast(locationType === "barrio" ? "Escribe el nombre de tu barrio." : "Escribe el nombre de tu unidad residencial.")
                          }
                        }}
                        aria-disabled={!customNeighborhood.trim()}
                        className={`btn-pop btn-pop-dark mt-3 w-full ${customNeighborhood.trim() ? "" : "opacity-60"}`}
                      >
                        Confirmar ubicación
                      </button>
                    </div>
                  )}
                </div>
              )}

              <Field id="observations" label="Observaciones (referencias adicionales)" multiline value={observations} onChange={setObservations} />
            </div>
          </Section>
        )}

        {deliveryType === "pickup" && (
          <Section title="¿En cuál sede recoges tu pedido?">
            <div className="space-y-4" role="radiogroup" aria-label="Sede">
              {locations.map((loc) => (
                <div key={loc.id}>
                  <OptionCard
                    selected={location === loc.id}
                    onSelect={() => setLocation(loc.id)}
                    title={loc.name}
                    description={loc.address}
                  />
                  <button
                    onClick={() => window.open(loc.mapUrl, "_blank")}
                    className="btn-pop btn-pop-beige btn-pop-sm mt-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Ver en el mapa
                  </button>
                </div>
              ))}

              <div className="rounded-2xl border-2 border-dashed border-jussi-brown/40 bg-jussi-orange/30 p-4">
                <p className="font-display font-bold">📞 Te contactaremos cuando esté listo</p>
                <p className="mt-1 text-base">Tiempo estimado de preparación: 20-30 minutos</p>
              </div>
            </div>
          </Section>
        )}
      </PedidoBody>
    </PedidoPage>
  )
}
