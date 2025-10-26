import { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { GiSpaceship } from "react-icons/gi";

export const metadata: Metadata = {
  title: "Rick and Morty App",
  description: "Explora personajes con Next.js",
};

export default function RickLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-green-800 text-white">
      <nav className="bg-black/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between">
          <Link
            href="/rick"
            className="text-2xl font-bold hover:text-green-400 transition"
          >
            <GiSpaceship className="inline-block mr-2" size={28} />
            Rick and Morty
          </Link>
          <Link
            href="/rick/search"
            className="text-sm border border-green-400 px-3 py-1 rounded-md hover:bg-green-500 hover:text-black transition"
          >
            Buscar
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
