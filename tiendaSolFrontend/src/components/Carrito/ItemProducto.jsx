import React from "react";
import { Plus, Minus, X } from "lucide-react";
import { useCart } from "../../context/CartContext"

export default function ItemProducto({producto}) {

  const subtotalItem = producto.precio * producto.cantidad;
  const { eliminarDelCarrito, actualizarCantidad } = useCart(); 
  const stockDisponible = producto.stock || 0;

  return (
    <div
      className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4 
                 p-4 sm:p-5 rounded-xl 
                 bg-neutral-100 dark:bg-neutral-900 
                 transition- hover:-md"
    >
      <div className="flex items-center gap-4 flex-grow min-w-[200px]">
        
        <div className="bg-white dark:bg-neutral-700 p-1 rounded-lg flex-shrink-0 border border-neutral-300 dark:border-neutral-700">
          <img
            src={producto.fotos?.[0] || "https://via.placeholder.com/80"}
            alt={producto.nombre}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>

        <div className="flex-grow min-w-[100px] pr-2">
          <p className="text-base font-semibold text-neutral-900 dark:text-white line-clamp-2">
            {producto.nombre}
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            ${producto.precio} / u.
          </p>
          <button
            onClick={() => eliminarDelCarrito(producto.id)}
            className="text-red-600 hover:text-red-500 text-sm font-medium mt-1 transition flex items-center"
          >
            Remover
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 justify-end w-full sm:w-auto">
        
        <div
          className="flex items-center 
                     rounded-xl 
                     bg-white dark:bg-neutral-700 
                     border border-neutral-300 dark:border-neutral-600
                     text-neutral-900 dark:text-white flex-shrink-0"
        >
          <button
            onClick={() => actualizarCantidad(producto.id, producto.cantidad - 1)}
            className="p-2 rounded-l-xl hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       text-indigo-600 dark:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={producto.cantidad <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-bold text-base border-x border-neutral-200 dark:border-neutral-600">
            {producto.cantidad}
          </span>

          <button
            onClick={() => actualizarCantidad(producto.id, producto.cantidad + 1)}
            className="p-2 rounded-r-xl hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       text-indigo-600 dark:text-indigo-400 disabled:opacity-30 disabled:cursor-not-allowed"
            disabled={producto.cantidad >= stockDisponible} 
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="w-24 text-right flex-shrink-0">
          <p className="text-xl font-extrabold text-neutral-900 dark:text-white">
            ${subtotalItem}
          </p>
        </div>
      </div>
    </div>
  );
}