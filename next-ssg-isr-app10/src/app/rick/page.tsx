import { CharacterResponse } from "@/types/rickandmorty";
import Image from "next/image";
import Link from "next/link";

async function getCharacters() {
  const res = await fetch("https://rickandmortyapi.com/api/character", {
    cache: "force-cache", // SSG
  });
  if (!res.ok) throw new Error("Error al cargar personajes");
  const data: CharacterResponse = await res.json();
  return data.results;
}

export default async function CharacterList() {
  const characters = await getCharacters();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Personajes (SSR / SSG)
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {characters.map((char) => (
          <Link
            key={char.id}
            href={`/rick/${char.id}`}
            className="bg-white/10 rounded-xl overflow-hidden shadow hover:scale-105 transition"
          >
            <Image
              src={char.image}
              alt={char.name}
              width={300}
              height={300}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{char.name}</h2>
              <p className="text-sm opacity-80">
                {char.status} – {char.species}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
