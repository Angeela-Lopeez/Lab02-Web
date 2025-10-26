// src/app/pokemon/not-found.tsx
import Link from "next/link";

export default function PokemonNotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white px-6">
      <h2 className="text-3xl font-bold mb-4">Pokémon no encontrado 🕵️‍♂️</h2>
      <p className="mb-8 opacity-80">
        No pudimos encontrar el recurso solicitado.
      </p>
      <Link
        href="/pokemon"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-purple-200 transition"
      >
        Volver al Pokédex
      </Link>
    </div>
  );
}
