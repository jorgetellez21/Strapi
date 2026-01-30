//\XAMPP\htdocs\strapi\front\src\components\Hero.tsx
// se definen las Props
export default function Hero({ titulo, descripcion, imagen_fondo, boton }: any) {
  const imageUrl = imagen_fondo?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${imagen_fondo.url}` 
    : '';

  // 1. Extraer el texto del botón (esto ya te funciona)
  const textoBoton = boton?.[0]?.label || "Ver más";

   // Usamos .URL con mayúsculas porque así aparece en tu Strapi
  const enlaceBoton = boton?.[0]?.URL || "#"; 
    
  // 2. Extraer el TITULO
  const textoTitulo = typeof titulo === 'string' 
    ? titulo 
    : titulo?.[0]?.children?.[0]?.text || "";

  // 3. Extraer la DESCRIPCIÓN
  const textoDescripcion = descripcion?.[0]?.children?.[0]?.text || "";

  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-gray-900 text-white">
      {imageUrl ? (
        <img 
          src={imageUrl} 
          className="absolute inset-0 w-full h-full object-cover opacity-50" 
          alt="Hero Background" 
        />
      ) : null}

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl">
          {textoTitulo || "Título no encontrado"}
        </h1>
        
        <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
          {textoDescripcion || "Descripción no encontrada"}
        </p>
        
        {/* Ahora 'enlaceBoton' ya existe y no dará error */}
        <a 
          href={enlaceBoton}
          target="_blank"             
          rel="noopener noreferrer"    
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all transform hover:scale-105 shadow-xl inline-block"
        >
          {textoBoton}
        </a>
      </div>
    </section>
  );
}