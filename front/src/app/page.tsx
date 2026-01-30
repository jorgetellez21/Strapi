//D:\XAMPP\htdocs\strapi\front\src\app\page.tsx
import Hero from '@/components/Hero';
import Slider from '@/components/Slider';
import ContactForm from "@/components/contactForm";
import SeccionTextoImagen from "@/components/Sections/SeccionTextoImagen";
import SeccionServicios from "@/components/Sections/SeccionServicios";

async function getHomeData() {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?populate[secciones][populate]=*`;
  const res = await fetch(url, { cache: 'no-store' });
  const json = await res.json();
  return json.data;
}

export default async function Home() {
  const data = await getHomeData();
  const secciones = data?.secciones || [];

  return (
    <main>
      {secciones.map((seccion: any, index: number) => {
        // El 'case' debe coincidir exactamente con el nombre de API en Strapi
        switch (seccion.__component) {
          case "sections.hero":
            return <Hero key={index} {...seccion} />;

          case "sections.slider-personalizable":
            return <Slider key={index} Slides={seccion.Slides} />;

          case "sections.seccion-texto-imagen":
          return ( <SeccionTextoImagen key={index} data={seccion} 
            />
          );

          case "sections.servicios": // Este nombre debe coincidir con el ID de la API
            return <SeccionServicios key={index} data={seccion} />;

          case "sections.seccion-formulario": 
            return (
              <ContactForm 
                key={index} 
                titulo={seccion.titulo} 
                subtitulo={seccion.subtitulo} 
              />
            );

          default:
            return (
              <div key={index} className="p-4 bg-gray-100 text-gray-400 text-sm text-center">
                Componente detectado pero no renderizado: {seccion.__component}
              </div>
            );
        }
      })}
    </main>
  );
}