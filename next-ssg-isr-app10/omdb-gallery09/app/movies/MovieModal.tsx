'use client';

import { useEffect, useState } from "react";
import axios from "axios";

type Detail = {
  Title?: string;
  Year?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Poster?: string;
  Ratings?: { Source: string; Value: string }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  imdbID?: string;
  Type?: string;
  totalSeasons?: string;
  Response?: "True" | "False";
  Error?: string;
};

const BASE = "https://www.omdbapi.com/";

export default function MovieModal({
  imdbID,
  onClose,
}: {
  imdbID: string;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_OMDB_KEY ?? process.env.OMDB_API_KEY;

  useEffect(() => {
    const run = async () => {
      if (!apiKey) {
        setError("Falta tu API key de OMDb.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const url = `${BASE}?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`;
        const { data } = await axios.get<Detail>(url);
        if (data?.Response === "False") {
          setError(data.Error || "No se pudo cargar el detalle.");
          setDetail(null);
        } else {
          setDetail(data);
        }
      } catch {
        setError("Error al cargar el detalle.");
        setDetail(null);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [imdbID, apiKey]);

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 grid place-items-center p-4"
      onMouseDown={onClose}     // ⬅️ cerrar con mousedown en backdrop
      aria-modal
      role="dialog"
    >
      <div
        className="w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onMouseDown={(e) => e.stopPropagation()} // ⬅️ NO cerrar cuando el mousedown es dentro del modal
      >
        {/* Header del modal */}
        <div className="sticky top-0 z-10 flex justify-between items-center p-5 border-b bg-gradient-to-r from-purple-500 to-purple-600">
          <h4 className="text-xl font-bold text-white">Detalle de la Película</h4>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold transition backdrop-blur-sm"
          >
            ✕ Cerrar
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 font-semibold">Cargando detalle...</p>
          </div>
        ) : error ? (
          <div className="p-8">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
              <p className="text-red-700 font-semibold text-lg">⚠️ {error}</p>
            </div>
          </div>
        ) : detail ? (
          <div className="grid md:grid-cols-5 gap-6 p-6">
            {/* Poster */}
            <div className="md:col-span-2">
              <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-xl sticky top-24">
                <img
                  src={detail.Poster && detail.Poster !== "N/A" ? detail.Poster : "https://via.placeholder.com/400x600?text=No+Image"}
                  alt={detail.Title || "Poster"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Información */}
            <div className="md:col-span-3 space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{detail.Title}</h3>
                <div className="flex items-center gap-3 text-gray-600 flex-wrap">
                  <span className="font-semibold">{detail.Year}</span>
                  <span>•</span>
                  <span className="capitalize bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                    {detail.Type}
                  </span>
                  {detail.Rated && detail.Rated !== "N/A" && (
                    <>
                      <span>•</span>
                      <span className="bg-gray-200 px-2 py-1 rounded text-sm font-semibold">
                        {detail.Rated}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Rating */}
              {detail.imdbRating && detail.imdbRating !== "N/A" && (
                <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      ⭐ {detail.imdbRating}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {detail.imdbVotes} votos
                    </div>
                  </div>
                  {detail.Metascore && detail.Metascore !== "N/A" && (
                    <div className="text-center pl-4 border-l-2 border-yellow-300">
                      <div className="text-2xl font-bold text-green-600">
                        {detail.Metascore}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">Metascore</div>
                    </div>
                  )}
                </div>
              )}

              {/* Sinopsis */}
              {detail.Plot && detail.Plot !== "N/A" && (
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">📖 Sinopsis</h4>
                  <p className="text-gray-700 leading-relaxed">{detail.Plot}</p>
                </div>
              )}

              {/* Detalles en grid */}
              <div className="grid sm:grid-cols-2 gap-4">
                {detail.Genre && detail.Genre !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">🎭 Género</div>
                    <div className="text-gray-900 font-semibold">{detail.Genre}</div>
                  </div>
                )}

                {detail.Runtime && detail.Runtime !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">⏱️ Duración</div>
                    <div className="text-gray-900 font-semibold">{detail.Runtime}</div>
                  </div>
                )}

                {detail.Director && detail.Director !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">🎬 Director</div>
                    <div className="text-gray-900 font-semibold">{detail.Director}</div>
                  </div>
                )}

                {detail.Released && detail.Released !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">📅 Estreno</div>
                    <div className="text-gray-900 font-semibold">{detail.Released}</div>
                  </div>
                )}

                {detail.Language && detail.Language !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">🗣️ Idioma</div>
                    <div className="text-gray-900 font-semibold">{detail.Language}</div>
                  </div>
                )}

                {detail.Country && detail.Country !== "N/A" && (
                  <div className="bg-white border border-gray-200 rounded-xl p-3">
                    <div className="text-xs text-gray-500 font-semibold mb-1">🌍 País</div>
                    <div className="text-gray-900 font-semibold">{detail.Country}</div>
                  </div>
                )}
              </div>

              {/* Actores */}
              {detail.Actors && detail.Actors !== "N/A" && (
                <div className="bg-white border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-500 font-semibold mb-2">🎭 Reparto Principal</div>
                  <div className="text-gray-900">{detail.Actors}</div>
                </div>
              )}

              {/* Premios */}
              {detail.Awards && detail.Awards !== "N/A" && (
                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="text-xs text-amber-700 font-semibold mb-2">🏆 Premios</div>
                  <div className="text-gray-900 font-semibold">{detail.Awards}</div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
