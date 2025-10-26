import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Personaje no encontrado 🧪</h2>
      <p className="mb-8 opacity-80">
        No existe el personaje solicitado o ocurrió un error.
      </p>
      <Link
        href="/rick"
        className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-green-300 transition"
      >
        Volver al listado
      </Link>
    </div>
  );
}
