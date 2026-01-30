//D:\XAMPP\htdocs\strapi\front\src\app\layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mi Sitio con Strapi",
  description: "Generado con Next.js y Strapi",
};

// 1. Función para obtener los datos del Header
async function getHeaderData() {
  const urlHeader = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header?populate=*`;
  
  try {
    const res = await fetch(urlHeader, { cache: 'no-store' });
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error cargando el Header:", error);
    return null;
  }
}

// Función para traer datos del Footer
async function getFooterData() {
  // Esta URL usa la sintaxis de "comodín" (*) para entrar en los componentes
  // Es la forma más segura de traer el icono dentro de SocialLink
  const urlFooter = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?populate[SocialLink][populate]=*&populate[logo]=*&populate[enlaces_legales]=*`;
  
  try {
    const res = await fetch(urlFooter, { cache: 'no-store' });
    
    if (!res.ok) {
      // Si la URL de arriba falla, este plan de rescate evita que el Header se bloquee
      const simpleRes = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?populate=*`, { cache: 'no-store' });
      const simpleJson = await simpleRes.json();
      return simpleJson.data;
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error de conexión:", error);
    return null;
  }
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 2. Ejecutamos la carga de datos
  const headerData = await getHeaderData();//header
  const footerData = await getFooterData();//footer
  
  return (
   <html lang="es">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/* 1. Header arriba */}
          {headerData && (
            <Header 
              logo={headerData.logo} 
              menu_links={headerData.menu_links} 
              boton_accion={headerData.boton_accion} 
            />
          )}
          
          {/* 2. El contenido de tus páginas (Home, etc.) */}
          <main className="pt-20 min-h-screen"> 
            {children}
          </main>

          {/* 3. EL FOOTER VA AQUÍ (Antes del cierre del body) */}
          {footerData && (
            <Footer 
              logo={footerData.logo}
              copy={footerData.copy}
              SocialLink={footerData.SocialLink} // <--- Revisa que coincida con el JSON
              enlaces_legales={footerData.enlaces_legales}
            />
          )}
        </body>
    </html>
  );
}

