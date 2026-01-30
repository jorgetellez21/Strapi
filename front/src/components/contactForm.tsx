"use client";
import { useState } from "react";

// 1. Agregamos las Props para recibir titulo y subtitulo
interface ContactFormProps {
  titulo?: string;
  subtitulo?: string;
}

export default function ContactForm({ titulo, subtitulo }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = {
      data: {
        nombre: formData.get("nombre"),
        email: formData.get("email"),
        mensaje: formData.get("mensaje"),
      },
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/contactos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-8 bg-gray-800 rounded-2xl shadow-xl border border-gray-700 my-10">
      {/* 2. Usamos las variables que vienen de Strapi */}
      <h2 className="text-3xl font-bold text-white mb-2 text-center">
        {titulo || "Contáctanos"} 
      </h2>
      {subtitulo && (
        <p className="text-gray-400 text-center mb-6">{subtitulo}</p>
      )}
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* ... (el resto de tus campos se quedan igual) ... */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Nombre Completo</label>
          <input 
            name="nombre" 
            type="text" 
            required 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Juan Pérez"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Correo Electrónico</label>
          <input 
            name="email" 
            type="email" 
            required 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="tu@email.com"
          />
        </div>

        <div>
          <label className="block text-gray-400 text-sm mb-2">Mensaje</label>
          <textarea 
            name="mensaje" 
            rows={4} 
            required 
            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            placeholder="¿En qué podemos ayudarte?"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === "loading"}
          className={`w-full py-3 rounded-lg font-bold text-white transition duration-300 ${
            status === "loading" ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
        </button>

        {status === "success" && (
          <p className="text-green-400 text-center font-medium mt-2">¡Mensaje enviado! Nos contactaremos pronto.</p>
        )}
        {status === "error" && (
          <p className="text-red-400 text-center font-medium mt-2">Hubo un error. Intenta de nuevo.</p>
        )}
      </form>
    </section>
  );
}