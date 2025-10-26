"use client";

import { useEffect } from "react";

export default function PokemonError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Icono decorativo */}
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10">
          <svg
            className="w-10 h-10 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          Ups, algo salió mal
        </h2>

        {/* Descripción */}
        <p className="text-white/70 mb-8 leading-relaxed">
          Ocurrió un error al cargar el módulo Pokédex. No te preocupes, puedes
          intentarlo de nuevo.
        </p>

        {/* Botón */}
        <button
          onClick={() => reset()}
          className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3.5 rounded-xl font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
        >
          <svg
            className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Reintentar
        </button>

        {/* Detalle técnico opcional (solo en dev) */}
        {process.env.NODE_ENV === "development" && error.message && (
          <div className="mt-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
            <p className="text-xs text-red-300/80 font-mono break-all">
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}