import { Search, ArrowUpDown } from "lucide-react";

const CATEGORIAS = [
  { value: "", label: "Todas las categorías" },
  { value: "REMERA", label: "Remeras" },
  { value: "ZAPATOS", label: "Zapatos" },
  { value: "PANTALON", label: "Pantalon" },
  { value: "CAMPERA", label: "Campera" },
];

const ORDENES = [
  { value: "", label: "Por defecto" },
  { value: "asc", label: "Precio: Ascendente" },
  { value: "desc", label: "Precio: Descendente" },
  { value: "masVendido", label: "Más vendido" },
];

export default function PanelDeFiltros({ filtros, manejarCambio, manejarBuscar }) {

  const manejarCambioNumerico = (campo, valor) => {
    const val = valor === "" ? "" : parseInt(valor, 10);
    manejarCambio(campo, isNaN(val) ? "" : val);
  };

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-2xl -lg p-6 mb-8 border border-gray-200 dark:border-neutral-700">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Filtrar Productos
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Buscar producto
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Nombre, categoría, descripción..."
              value={filtros.terminoBusqueda || ""}
              onChange={(e) =>
                manejarCambio("terminoBusqueda", e.target.value)
              }
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Categoría
          </label>
          <select
            value={filtros.categoria || ""}
            onChange={(e) => manejarCambio("categoria", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
          >
            {CATEGORIAS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

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
              value={filtros.precioMin || ""}
              onChange={(e) => manejarCambioNumerico("precioMin", e.target.value)}
              min="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>

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
              value={filtros.precioMax || ""}
              onChange={(e) => manejarCambioNumerico("precioMax", e.target.value)}
              min="0"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
            />
          </div>
        </div>


        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            Ordenar por
          </label>
          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filtros.orden || ""}
              onChange={(e) => manejarCambio("orden", e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors appearance-none"
            >
              {ORDENES.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={manejarBuscar}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>Buscar</span>
          </button>
        </div>
      </div>
    </div>
  );
}