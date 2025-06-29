"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, MapPin, Phone, Clock } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BranchesPage() {
  const router = useRouter()

  const branches = [
    {
      name: "Sede Sachamate",
      address: "Cra 18 #12-22 Barrio Sachamate",
      phone: "+57 317 269 7230",
      whatsappNumber: "573172697230",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.3354983682593!2d-76.54898070321042!3d3.266644999999991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e309eb5f479442f%3A0xb90023a4b91e072d!2sJussi%20Pizza!5e0!3m2!1sen!2sco!4v1750386486959!5m2!1sen!2sco",
    },
    {
      name: "Sede Anturios",
      address: "Cra 19A #3-03 frente a Los Naranjos /Parque natura",
      phone: "+57 316 840 3329",
      whatsappNumber: "573168403329",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15933.448492146017!2d-76.57017271284177!3d3.259928300000015!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e309983d6c3c0e7%3A0x556bfa1aac6aae29!2sJussi%20Pizza!5e0!3m2!1ses!2sco!4v1750796005257!5m2!1ses!2sco",
    },
  ];

  return (
    <div className="min-h-[calc(100dvh)] bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-sm border-b border-green-200 p-4 z-10">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => router.back()} className="text-brown-700 hover:bg-green-100">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </Button>
          <h1 className="text-xl font-bold text-brown-900">Nuestras Ubicaciones</h1>
          <div className="w-16"></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 pb-20">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-brown-900 mb-2">📍 Visítanos</h2>
          <p className="text-brown-700">Encuentra la sede más cercana a ti</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {branches.map((branch, index) => (
            <Card key={index} className="border-2 border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg p-4">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {branch.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Google Maps Embed */}
                <div className="w-full h-[200px] md:h-64 bg-gray-200 rounded-none">
                  <iframe
                    src={branch.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-none"
                  />
                </div>

                {/* Branch Info */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brown-900">Dirección</p>
                      <p className="text-sm text-brown-700">{branch.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brown-900">Teléfono</p>
                      <a href={`tel:${branch.phone}`} className="text-sm text-green-600 hover:text-green-700">
                        {branch.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-brown-900">Horarios</p>
                      <p className="text-sm text-brown-700">Miércoles a Lunes</p>
                      <p className="text-sm text-brown-700">6:00 PM - 10:30 PM</p>
                    </div>
                  </div>

                  <div className="pt-2 space-y-2">
                    <Button
                      onClick={() => window.open(`https://wa.me/${branch.whatsappNumber}`, "_blank")}
                      className="w-full bg-green-500 hover:bg-green-600 text-white py-2 text-sm"
                    >
                      💬 Contactar por WhatsApp
                    </Button>
                    <Button
                      onClick={() =>
                        window.open(`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`, "_blank")
                      }
                      variant="outline"
                      className="w-full border-green-500 text-green-600 hover:bg-green-50 py-2 text-sm"
                    >
                      🗺️ Abrir en Google Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Info */}
        <Card className="mt-6 border-2 border-orange-200 bg-orange-50">
          <CardContent className="p-4 text-center">
            <h3 className="text-lg font-bold text-brown-900 mb-2">🍕 Información General</h3>
            <div className="grid md:grid-cols-2 gap-3 text-left text-sm">
              <div>
                <h4 className="font-semibold text-brown-900 mb-1">🕐 Horarios</h4>
                <p className="text-brown-700">Miércoles a lunes: 6:00 PM - 10:30 PM</p>
                <p className="text-brown-700">Martes cerrado</p>
              </div>
              <div>
                <h4 className="font-semibold text-brown-900 mb-1">🚚 Domicilios</h4>
                <p className="text-brown-700">Toda Jamundí</p>
                <p className="text-brown-700">30-45 minutos</p>
              </div>
            </div>
            <div className="mt-4">
              <Button
                onClick={() => router.push("/")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 text-sm"
              >
                🛒 Hacer Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}