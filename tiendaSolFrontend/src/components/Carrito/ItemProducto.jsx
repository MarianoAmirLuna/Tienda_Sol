import React from "react";
import { Plus, Minus } from "lucide-react";

export default function ItemProducto({
  producto,
  onEliminar,
  onActualizarCantidad,
}) {
  const formatearMoneda = (valor) => `$${valor}`;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 
                 p-4 rounded-2xl 
                 bg-neutral-200 dark:bg-neutral-800 
                 transition-colors duration-300"
    >
      <div className="flex items-center gap-4 flex-grow min-w-[200px]">
        <div className="w-5 h-5 border-2 border-neutral-400 dark:border-neutral-500 rounded-full flex-shrink-0"></div>

        <div className="bg-neutral-100 dark:bg-neutral-700 p-1 rounded-lg flex-shrink-0">
          <img
            src={producto.fotos?.[0] || "https://via.placeholder.com/100"}
            alt={producto.nombre}
            className="w-20 h-20 object-cover rounded-md"
          />
        </div>

        <div className="flex-grow">
          <p className="text-lg font-medium text-neutral-900 dark:text-white truncate">
            {producto.nombre}
          </p>
          <button
            onClick={() => onEliminar(producto.id)}
            className="text-red-500 hover:text-red-400 text-sm font-medium transition"
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Derecha */}
      <div className="flex items-center gap-4 flex-grow justify-end lg:flex-grow-0">
        <div className="w-28 text-right flex-shrink-0">
          <p className="text-lg font-medium text-neutral-900 dark:text-white">
            {formatearMoneda(producto.precio)}
          </p>
        </div>

        <div
          className="flex items-center gap-2 
                     rounded-lg p-1 
                     bg-neutral-100 dark:bg-neutral-700 
                     text-neutral-900 dark:text-white
                     transition-colors duration-300 flex-shrink-0"
        >
          <button
            onClick={() =>
              onActualizarCantidad(producto.id, producto.cantidad - 1)
            }
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       text-neutral-600 dark:text-neutral-300
                       disabled:opacity-30"
            disabled={producto.cantidad <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>

          <span className="w-8 text-center font-medium">
            {producto.cantidad}
          </span>

          <button
            onClick={() =>
              onActualizarCantidad(producto.id, producto.cantidad + 1)
            }
            className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       text-neutral-600 dark:text-neutral-300"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
