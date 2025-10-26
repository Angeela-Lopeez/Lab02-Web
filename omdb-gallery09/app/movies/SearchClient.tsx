'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import MovieModal from "./MovieModal";

type BasicMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | string;
};

type SearchResponse = {
  Response: "True" | "False";
  Search?: BasicMovie[];
  totalResults?: string;
  Error?: string;
};

const BASE = "https://www.omdbapi.com/";

export default function SearchClient() {
  const [query, setQuery] = useState("batman");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<BasicMovie[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_OMDB_KEY ?? process.env.OMDB_API_KEY;
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const run = async () => {
      if (!apiKey) {
        setError("Falta tu API key de OMDb. Agrega NEXT_PUBLIC_OMDB_KEY o OMDB_API_KEY en .env.local");
        return;
      }
      if (!debouncedQuery.trim()) {
        setResults([]);
        setError(null);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const url = `${BASE}?apikey=${apiKey}&s=${encodeURIComponent(debouncedQuery)}&page=1`;
        const { data } = await axios.get<SearchResponse>(url);
        if (data.Response === "True" && Array.isArray(data.Search)) {
          setResults(data.Search);
        } else {
          setResults([]);
          setError(data.Error || "No se encontraron resultados.");
        }
      } catch (e: any) {
        setError("Error al buscar. Revisa tu conexión o la API key.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [debouncedQuery, apiKey]);

  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Búsqueda (CSR)</h2>
          <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
            CSR
          </span>
        </div>
      </div>

      <div className="p-6">
        {/* Input de búsqueda */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca por título (ej: batman, matrix, friends)"
            className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
          />
          <div className="text-sm text-gray-600 font-semibold self-center whitespace-nowrap px-4 py-2 bg-gray-50 rounded-lg">
            {loading ? "🔍 Buscando..." : results.length > 0 ? `✨ ${results.length} resultados` : "📭 Sin resultados"}
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium text-sm">⚠️ {error}</p>
          </div>
        )}

        {/* Resultados - 5 columnas fijas */}
        <div className="grid grid-cols-5 gap-6">
          {results.map((m) => (
            <article
              key={m.imdbID}
              onClick={() => setOpenId(m.imdbID)}
              className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer"
            >
              {/* Botón "Ver detalle" */}
              <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                  Ver detalle
                </button>
              </div>

              {/* Poster */}
              <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
                <img
                  src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                  alt={m.Title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Overlay oscuro al hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Info de la película */}
              <div className="p-4">
                <h3 className="font-bold text-gray-900 text-sm leading-tight mb-2 line-clamp-2">
                  {m.Title}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <span>{m.Year}</span>
                  <span>•</span>
                  <span className="capitalize">{m.Type}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Badge informativo */}
        <div className="mt-6 bg-blue-50 rounded-xl border border-blue-200 p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl">🔄</span>
            <div>
              <p className="text-blue-800 font-semibold text-sm">
                Renderizado del Cliente (CSR)
              </p>
              <p className="text-blue-700 text-xs mt-1">
                Los resultados y el detalle se obtienen en el navegador con Axios, sin recargar la página.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de detalle */}
      {openId && (
        <MovieModal imdbID={openId} onClose={() => setOpenId(null)} />
      )}
    </section>
  );
}

/** Hook de debounce simple */
function useDebounce<T>(value: T, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

