
// src/components/Header.tsx

export default function Header({ logo, menu_links, boton_accion }: any) {
  // 1. Construimos la URL del logo de Strapi
  const logoUrl = logo?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${logo.url}` 
    : null;

  return (
    <header className="fixed top-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-10 w-auto" />
          ) : (
            <span className="text-xl font-bold italic">Logo</span>
          )}
        </div>

        {/* Navegación usando menu_links */}
        <nav className="hidden md:flex space-x-8">
          {menu_links?.map((link: any, index: number) => (
            <a 
              key={index} 
              href={link.href} // El campo href que creaste en Strapi
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
            >
              {link.label} {/* El campo label que creaste en Strapi */}
            </a>
          ))}
        </nav>

        {/* Botón opcional (si lo creaste en el Header) */}
        <div className="flex items-center">
          {boton_accion && (
            <a 
              href={boton_accion[0]?.URL || "#"} 
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700"
            >
              {boton_accion[0]?.label || "Entrar"}
            </a>
          )}
        </div>

      </div>
    </header>
  );
}