// lib/omdb.ts
import axios from "axios";

const apiKey = process.env.OMDB_API_KEY || process.env.NEXT_PUBLIC_OMDB_KEY;
const BASE_URL = "https://www.omdbapi.com/";

if (!apiKey) {
  console.warn("⚠️ Falta OMDB_API_KEY / NEXT_PUBLIC_OMDB_KEY en .env.local");
}

export async function searchMovies(query: string, page = 1) {
  const url = `${BASE_URL}?apikey=${apiKey}&s=${encodeURIComponent(query)}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
}

export async function getById(imdbID: string) {
  const url = `${BASE_URL}?apikey=${apiKey}&i=${encodeURIComponent(imdbID)}&plot=full`;
  const { data } = await axios.get(url);
  return data;
}

export async function getPopularSSR() {
  const first = await searchMovies("marvel", 1);
  return Array.isArray(first?.Search) ? first.Search : [];
}
