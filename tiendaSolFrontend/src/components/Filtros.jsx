import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";

export default function Filtros() {
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [categoria, setCategoria] = useState("");
  const [orden, setOrden] = useState("");
  const [mostrarFiltros, setMostrarFiltros] = useState(true); // Cambiado a true

  const manejarBuscar = () => {
    // Aquí iría la lógica de filtrado cuando la implementes
    console.log("Buscando con:", {
      terminoBusqueda,
      precioMin,
      precioMax,
      categoria,
      orden,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      {/* Botón para mostrar/ocultar filtros */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setMostrarFiltros(!mostrarFiltros)}
          className="flex items-center space-x-2 bg-white dark:bg-neutral-800 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-neutral-700"
        >
          <Filter className="w-5 h-5" />
          <span className="font-medium">
            {mostrarFiltros ? "Ocultar Filtros" : "Mostrar Filtros"}
          </span>
        </button>
      </div>

      {/* Panel de Filtros Expandible - Ahora visible por defecto */}
      {mostrarFiltros && (
        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-neutral-700">
          <h3 className="text-lg font-semibold mb-6 text-center">
            Filtrar Productos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
            {/* Búsqueda por término */}
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Buscar producto
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Nombre, categoría, descripción..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Filtro por categoría */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Categoría
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Todas las categorías</option>
                <option value="electronica">Electrónica</option>
                <option value="ropa">Ropa</option>
                <option value="hogar">Hogar</option>
                <option value="deportes">Deportes</option>
                <option value="libros">Libros</option>
              </select>
            </div>

            {/* Filtro por precio mínimo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Precio mínimo
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  placeholder="0"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Filtro por precio máximo */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Precio máximo
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  placeholder="9999"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  min="0"
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Ordenar por
              </label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors appearance-none"
                >
                  <option value="">Por defecto</option>
                  <option value="asc">Precio: Ascendente</option>
                  <option value="desc">Precio: Descendente</option>
                  <option value="mas_vendido">Más vendido</option>
                </select>
              </div>
            </div>
          </div>

          {/* Botón Buscar */}
          <div className="flex justify-center">
            <button
              onClick={manejarBuscar}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Buscar</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
