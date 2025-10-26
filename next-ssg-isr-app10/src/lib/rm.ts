// src/lib/rm.ts
import { CharacterResponse, Character } from "@/types/rickandmorty";

const BASE = "https://rickandmortyapi.com/api";

export async function getAllCharacters(): Promise<CharacterResponse> {
  const res = await fetch(`${BASE}/character`);
  if (!res.ok) throw new Error("Error al obtener personajes");
  return res.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const res = await fetch(`${BASE}/character/${id}`);
  if (!res.ok) throw new Error("Error al obtener personaje");
  return res.json();
}
