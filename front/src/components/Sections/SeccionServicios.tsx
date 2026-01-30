'use client'; 
import { useEffect, useState } from 'react';

export default function SeccionServicios({ data }: { data: any }) {
  // Estado para guardar las cards una vez tengan sus imágenes
  const [cardsActualizadas, setCardsActualizadas] = useState(data.cards || []);
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    async function cargarIconos() {
      try {
        // Pedimos SOLO los datos de la Home pero con el nivel de detalle necesario para los iconos
        const res = await fetch(`${baseUrl}/api/home?populate[secciones][on][sections.servicios][populate]=cards.icono`);
        const result = await res.json();

        // Buscamos dentro de todas las secciones cuál es la de servicios
        const seccionConImagenes = result.data.secciones.find(
          (s: any) => s.__component === "sections.servicios" && s.id === data.id
        );

        if (seccionConImagenes?.cards) {
          setCardsActualizadas(seccionConImagenes.cards);
        }
      } catch (error) {
        console.error("Error cargando iconos de servicios:", error);
      }
    }

    cargarIconos();
  }, [data.id, baseUrl]);

  if (!data) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{data.titulo}</h2>
          <p className="text-gray-600 text-lg">{data.descripcion}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsActualizadas.map((card: any, index: number) => {
            // Buscamos la URL de la imagen en los diferentes formatos de Strapi
            const iconPath = card.icono?.url || card.icono?.data?.attributes?.url;
            const fullImageUrl = iconPath ? `${baseUrl}${iconPath}` : null;

            return (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  {fullImageUrl ? (
                    <img 
                      src={fullImageUrl} 
                      alt={card.titulo} 
                      className="w-10 h-10 object-contain group-hover:brightness-0 group-hover:invert transition-all"
                    />
                  ) : (
                    <div className="text-blue-600 font-bold group-hover:text-white">
                      {index + 1}
                    </div>
                  )}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{card.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{card.descripcion}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}