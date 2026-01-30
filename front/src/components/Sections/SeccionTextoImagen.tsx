//D:\XAMPP\htdocs\strapi\front\src\components\Sections\SeccionTextoImagen.tsx
export default function SeccionTextoImagen({ data }: { data: any }) {
  if (!data) return null;

  // IMPORTANTE: Que el nombre 'posicion_imagen' sea igual al de Strapi
  const esImagenDerecha = data.posicion_imagen === "derecha";
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className={`container mx-auto px-6 flex flex-col md:items-center gap-12 
        ${esImagenDerecha ? 'md:flex-row-reverse' : 'md:flex-row'}`}> 
        {/* ^ Esta línea de arriba es la que hace la magia del cambio de posición ^ */}
        
        {/* Contenedor de Imagen */}
        <div className="flex-1 w-full">
          {data.imagen?.url && (
            <img 
              src={`${baseUrl}${data.imagen.url}`} 
              alt={data.titulo}
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
            />
          )}
        </div>

        {/* Contenedor de Texto */}
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold text-gray-900">{data.titulo}</h2>
          <div className="text-gray-600 text-lg leading-relaxed">
            <p>{data.descripcion}</p>
          </div>
        </div>

      </div>
    </section>
  );
}