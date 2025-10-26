"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Character } from "@/types/rickandmorty";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [type, setType] = useState("");
  const [results, setResults] = useState<Character[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!query && !status && !gender && !type) {
        setResults([]);
        return;
      }

      const params = new URLSearchParams();
      if (query) params.append("name", query);
      if (status) params.append("status", status);
      if (gender) params.append("gender", gender);
      if (type) params.append("type", type);

      const res = await fetch(
        `https://rickandmortyapi.com/api/character/?${params.toString()}`
      );

      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      } else {
        setResults([]);
      }
    };

    fetchData();
  }, [query, status, gender, type]);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Buscar Personajes</h1>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <input
          type="text"
          placeholder="Nombre..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 rounded-md text-black"
          aria-label="Buscar por nombre"
        />
        <select
          className="p-2 rounded-md text-black"
          aria-label="Filtrar por estado"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Estado</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className="p-2 rounded-md text-black"
          aria-label="Filtrar por género"
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Género</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <input
          type="text"
          placeholder="Tipo..."
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="p-2 rounded-md text-black"
          aria-label="Buscar por tipo"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {results.map((char) => (
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
              <h2 className="text-lg font-bold">{char.name}</h2>
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
