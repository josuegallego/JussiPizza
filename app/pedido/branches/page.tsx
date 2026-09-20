"use client"

import { MapPin, Phone, Clock, MessageCircle, ArrowUpRight, ShoppingCart } from "lucide-react"
import { useRouter } from "next/navigation"
import { PedidoHeader, PedidoPage } from "../components/pedido-ui"

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

  const accents = ["bg-jussi-orange", "bg-jussi-beige"]

  return (
    <PedidoPage>
      <PedidoHeader title="Nuestras ubicaciones" onBack={() => router.back()} wide />

      <main className="mx-auto max-w-md px-4 pb-16 pt-8 md:max-w-4xl">
        <div className="mb-8">
          <h2 className="font-display text-4xl font-extrabold md:text-5xl">
            Visítanos <span className="text-jussi-red">📍</span>
          </h2>
          <p className="mt-2 text-lg opacity-80">Encuentra la sede más cercana a ti.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {branches.map((branch, index) => (
            <article key={index} className="card-soft overflow-hidden bg-white">
              <div className={`flex items-center gap-3 border-b border-jussi-brown/15 p-5 ${accents[index % accents.length]}`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-jussi-brown/15 bg-jussi-beige">
                  <MapPin className="h-5 w-5" />
                </span>
                <h3 className="font-display text-2xl font-extrabold">{branch.name}</h3>
              </div>

              <div className="h-[220px] border-b border-jussi-brown/15 md:h-64">
                <iframe
                  src={branch.mapEmbed}
                  title={`Mapa ${branch.name}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="space-y-4 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80">Dirección</p>
                    <p className="font-semibold">{branch.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80">Teléfono</p>
                    <a href={`tel:${branch.phone}`} className="font-semibold underline decoration-jussi-orange decoration-2 underline-offset-4">
                      {branch.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-80">Horarios</p>
                    <p className="font-semibold">Miércoles a Lunes</p>
                    <p className="text-base opacity-80">6:00 PM - 10:30 PM</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <button
                    onClick={() => window.open(`https://wa.me/${branch.whatsappNumber}`, "_blank")}
                    className="btn-pop btn-pop-dark w-full"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contactar por WhatsApp
                  </button>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(branch.address)}`, "_blank")}
                    className="btn-pop btn-pop-beige w-full"
                  >
                    Abrir en Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="card-soft mt-8 bg-jussi-brown p-6 text-jussi-beige">
          <h3 className="font-display text-2xl font-extrabold">🍕 Información general</h3>
          <div className="mt-4 grid gap-5 text-base md:grid-cols-2">
            <div>
              <h4 className="mb-1 font-display font-bold text-jussi-orange">🕐 Horarios</h4>
              <p>Miércoles a lunes: 5:30 PM - 10:30 PM</p>
              <p>Martes cerrado</p>
            </div>
            <div>
              <h4 className="mb-1 font-display font-bold text-jussi-orange">🚚 Domicilios</h4>
              <p>Toda Jamundí</p>
              <p>30-45 minutos</p>
            </div>
          </div>
          <button onClick={() => router.push("/pedido")} className="btn-pop btn-pop-red mt-6 !border-jussi-beige !shadow-[4px_4px_0_0_#F3EDD6]">
            <ShoppingCart className="h-4 w-4" />
            Hacer pedido
          </button>
        </section>
      </main>
    </PedidoPage>
  )
}
