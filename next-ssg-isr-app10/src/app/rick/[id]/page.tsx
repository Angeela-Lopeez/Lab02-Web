import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Character, CharacterResponse } from "@/types/rickandmorty";
import Image from "next/image";
import Link from "next/link";

/** 🔹 Función para obtener los datos del personaje */
async function getCharacter(id: string): Promise<Character> {
  try {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`, {
      next: { revalidate: 864000 }, // 10 días (ISR)
    });

    if (res.status === 404) {
      notFound(); // si no existe, redirige a not-found.tsx
    }

    if (!res.ok) {
      throw new Error("Error al obtener personaje");
    }

    return res.json();
  } catch (error) {
    console.error("Error en getCharacter:", error);
    notFound();
  }
}

/** 🔹 Genera rutas estáticas (SSG) */
export async function generateStaticParams() {
  const res = await fetch("https://rickandmortyapi.com/api/character");
  const data: CharacterResponse = await res.json();

  // Retorna los IDs como strings
  return data.results.map((char) => ({
    id: char.id.toString(),
  }));
}

/** 🔹 Metadata dinámica para SEO */
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const char = await getCharacter(params.id);
  return {
    title: `${char.name} - Rick and Morty`,
    description: `Información sobre ${char.name}`,
  };
}

/** 🔹 Página del personaje */
export default async function CharacterDetail({
  params,
}: {
  params: { id: string };
}) {
  const char = await getCharacter(params.id);

  if (!char) return null;

  return (
    <div className="p-8 max-w-4xl mx-auto text-black">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header con imagen */}
        <div className="flex flex-col md:flex-row">
          <Image
            src={char.image}
            alt={char.name}
            width={300}
            height={300}
            className="object-cover w-full md:w-1/2"
            priority
          />

          <div className="p-6 flex-1">
            <h1 className="text-3xl font-bold mb-2">{char.name}</h1>
            <p><strong>Estado:</strong> {char.status}</p>
            <p><strong>Especie:</strong> {char.species}</p>
            <p><strong>Tipo:</strong> {char.type || "No especificado"}</p>
            <p><strong>Género:</strong> {char.gender}</p>
            <p><strong>Origen:</strong> {char.origin.name}</p>
            <p><strong>Ubicación:</strong> {char.location.name}</p>
            <p><strong>Episodios:</strong> {char.episode.length}</p>
            <p className="text-sm text-gray-500 mt-4">
              Creado: {new Date(char.created).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 text-center">
          <Link
            href="/rick"
            className="inline-block bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-md transition"
          >
            ← Volver al listado
          </Link>
        </div>
      </div>
    </div>
  );
}
