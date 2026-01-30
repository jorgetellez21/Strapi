'use client';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function SliderPersonalizable({ Slides: initialSlides }: any) {
  const [currentSlides, setCurrentSlides] = useState(initialSlides || []);
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

  useEffect(() => {
    async function fetchSliderImages() {
      try {
        const res = await fetch(`${baseUrl}/api/home?populate[secciones][on][sections.slider-personalizable][populate]=Slides.imagen&populate[secciones][on][sections.slider-personalizable][populate]=Slides.boton`);
        const result = await res.json();

        const secciones = result?.data?.secciones || result?.data?.attributes?.secciones;
        if (secciones) {
          const sliderData = secciones.find(
            (s: any) => s.__component === "sections.slider-personalizable"
          );
          if (sliderData?.Slides) setCurrentSlides(sliderData.Slides);
        }
      } catch (error) {
        console.error("Error en slider:", error);
      }
    }
    fetchSliderImages();
  }, [baseUrl]);

  return (
    <section className="w-full h-[700px] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full w-full"
      >
        {currentSlides.map((slide: any, index: number) => {
          const imgPath = slide.imagen?.url || slide.imagen?.data?.attributes?.url;
          const imgUrl = imgPath ? `${baseUrl}${imgPath}` : "";
          
          // Procesar descripción (Rich Text de Strapi)
          const textoDescripcion = slide.descripcion?.[0]?.children?.[0]?.text || "";
          
          // Procesar botón
          const boton = Array.isArray(slide.boton) ? slide.boton[0] : slide.boton;

          return (
            <SwiperSlide key={index} className="relative w-full h-full">
              {/* Imagen de fondo */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${imgUrl})` }}
              >
                {/* Overlay oscuro para legibilidad */}
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Contenido Central */}
              <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
                <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  {slide.titulo}
                </h2>
                <p className="text-lg md:text-2xl max-w-2xl mb-8 drop-shadow-md">
                  {textoDescripcion}
                </p>
                {boton && (
                  <a
                    href={boton.URL || "#"}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
                  >
                    {boton.label || "Ver más"}
                  </a>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Estilos personalizados para ajustar flechas y puntos */}
      <style jsx global>{`
        .swiper-button-next, .swiper-button-prev { color: white !important; }
        .swiper-pagination-bullet { background: white !important; opacity: 0.7; }
        .swiper-pagination-bullet-active { background: #2563eb !important; opacity: 1; }
      `}</style>
    </section>
  );
}