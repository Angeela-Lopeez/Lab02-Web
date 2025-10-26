'use client';

import { useState } from "react";
import MovieModal from "./MovieModal";

type BasicMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | string;
};

export default function PopularGridClient({ items }: { items: BasicMovie[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      {/* ⬇️ importante: agrega 'grid' */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {items.map((m) => (
          <article
            key={m.imdbID}
            onClick={() => setOpenId(m.imdbID)}
            className="group relative bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer"
          >
            <div className="absolute top-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg">
                Ver detalle
              </span>
            </div>

            <div className="relative aspect-[2/3] overflow-hidden bg-gray-100">
              <img
                src={m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={m.Title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

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

      {openId && (
        <MovieModal imdbID={openId} onClose={() => setOpenId(null)} />
      )}
    </>
  );
}
