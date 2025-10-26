// app/movies/page.tsx
import { getPopularSSR } from "../../lib/omdb";
import SearchClient from "./SearchClient";
import PopularGridClient from "./PopularGridClient"; // ⬅️ importante

export const dynamic = "force-dynamic";

type BasicMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: "movie" | "series" | string;
};

export default async function MoviesPage() {
  const popular: BasicMovie[] = await getPopularSSR();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎬</span>
            <h1 className="text-2xl font-bold text-gray-900">
              Galería de Películas y Series
            </h1>
          </div>
          <p className="text-sm text-gray-600">Explora y busca títulos al instante.</p>
        </header>

        {/* Búsqueda (CSR) */}
        <div className="mb-6">
          <SearchClient />
        </div>

        {/* Populares (SSR + interacción en cliente para abrir modal) */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">En Cartelera</h2>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-semibold">
                  SSR
                </span>
              </div>
            </div>

            <div className="p-6">
              {popular.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No hay resultados para mostrar ahora mismo.</p>
                </div>
              ) : (
                // ⬇️ Reemplaza el map directo por el componente cliente
                <PopularGridClient items={popular} />
              )}

              <div className="mt-8 bg-green-50 rounded-xl border border-green-200 p-4">
                <div className="flex items-start gap-3">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-green-800 font-semibold text-sm">
                      Renderizado del Servidor (SSR)
                    </p>
                    <p className="text-green-700 text-xs mt-1">
                      El HTML ya llega con tarjetas renderizadas desde el servidor para mejor SEO.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Justificación SSR vs CSR */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h3 className="text-2xl font-bold text-white flex items-center gap-2">
              <span>📚</span>
              Justificación SSR vs CSR
            </h3>
          </div>

          <div className="p-6">
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-gray-700 font-bold text-sm">Caso</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold text-sm">Estrategia</th>
                    <th className="px-6 py-3 text-left text-gray-700 font-bold text-sm">¿Por qué?</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-semibold">Populares</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        SSR
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">Mejor SEO y contenido listo en el primer HTML.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-semibold">Búsqueda interactiva</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                        CSR
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">Interactividad en tiempo real sin recargar.</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-900 font-semibold">Detalle</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                        CSR (modal)
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">Carga bajo demanda manteniendo el contexto.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
