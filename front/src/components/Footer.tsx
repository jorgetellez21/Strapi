export default function Footer({ logo, copy, SocialLink, enlaces_legales }: any) {
  // Construimos la URL del logo para el footer
  const logoUrl = logo?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.url}` : null;
 
 return (
<footer className="bg-gray-900 text-white py-12 mt-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Columna 1: Logo */}
        <div className="flex flex-col gap-4">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-8 w-fit brightness-0 invert" />
          ) : (
            <span className="text-xl font-bold italic">Logo</span>
          )}
          <p className="text-gray-400 text-sm">{copy}</p>
        </div>

        {/* Columna 2: Redes Sociales */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Síguenos</h3>
          <div className="flex flex-col gap-3">
            {/* 2. Usamos el nombre exacto 'SocialLink' que viene de Strapi */}
            {SocialLink?.map((red: any, index: number) => {
            // Verificamos qué hay en icono.url
            const urlRelativa = red.icono?.url;
            const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
            const iconoUrl = urlRelativa ? `${baseUrl}${urlRelativa}` : null;

            return (
                <a key={index} href={red.url} target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-white transition">
                {iconoUrl && (
                    <img 
                    src={iconoUrl} 
                    alt={red.plataforma} 
                    className="w-5 h-5 object-contain invert" // Quitamos brightness-0 para probar
                    />
                )}
                <span className="text-sm">{red.plataforma}</span>
                </a>
            );
            })}
          </div>
        </div>

        {/* Columna 3: Legal */}
        <div>
          <h3 className="font-semibold mb-4 text-gray-200">Legal</h3>
          <ul className="flex flex-col gap-2">
            {enlaces_legales?.map((link: any, index: number) => (
              <li key={index}>
                <a href={link.href} className="text-gray-400 hover:text-white transition-colors text-sm">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}