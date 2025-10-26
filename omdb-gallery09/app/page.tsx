export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 grid place-content-center gap-8 p-8">
      <div className="text-center space-y-4">
        <div className="text-6xl mb-4">🎬</div>
        <h1 className="text-4xl font-bold text-gray-900">
          Galería OMDb
        </h1>
        <p className="text-gray-600 text-lg">
          SSR + CSR · Películas y Series
        </p>
      </div>
      
      <a
        className="px-8 py-4 rounded-2xl border-2 border-orange-500 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 text-center text-lg"
        href="/movies"
      >
        🍿 Ir a la Galería
      </a>
    </main>
  );
}