import React from "react";
import { ShoppingCart, Check } from "lucide-react";

export default function ProductDetailCart({
  producto,
  manejarAgregarAlCarrito,
  setCantidad,
  cantidad,
  agregado,
}) {
  
  const tieneStock = producto.stock > 0;
  const stockExcedido = cantidad > producto.stock;

  const botonDisabled = !tieneStock || stockExcedido || agregado;
  const botonClases = agregado
    ? "bg-green-600 text-white -lg -green-500/40 dark:-green-500/30"
    : botonDisabled
    ? "bg-gray-300 text-gray-500 dark:bg-neutral-700 dark:text-neutral-400 cursor-not-allowed"
    : "bg-indigo-600 hover:bg-indigo-700 text-white -md -indigo-500/40 dark:bg-indigo-500 dark:hover:bg-indigo-600";

  return (
    <div className="flex flex-col gap-5 pt-5 border-t border-neutral-200 dark:border-neutral-700">

      <div className="flex items-center justify-center sm:justify-start">
        <div
          className="flex items-center rounded-2xl border border-neutral-300 dark:border-neutral-600 
                     bg-neutral-100 dark:bg-neutral-700 overflow-hidden -sm"
        >
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            disabled={botonDisabled}
            className="px-5 py-3 text-xl font-bold text-indigo-600 dark:text-indigo-400 
                       hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            −
          </button>

          <span
            className="px-6 py-3 text-lg font-bold text-center text-neutral-900 dark:text-white 
                       border-x border-neutral-200 dark:border-neutral-600 min-w-[64px]"
          >
            {cantidad}
          </span>

          <button
            onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
            disabled={botonDisabled || cantidad >= producto.stock}
            className="px-5 py-3 text-xl font-bold text-indigo-600 dark:text-indigo-400 
                       hover:bg-neutral-200 dark:hover:bg-neutral-600 
                       transition disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={manejarAgregarAlCarrito}
        disabled={botonDisabled}
        className={`w-full py-4 text-lg font-extrabold rounded-2xl 
                    flex items-center justify-center gap-2 
                    transition-transform active:scale-95 ${botonClases}`}
      >
        {agregado ? (
          <>
            <Check className="w-6 h-6" />
            <span>¡Añadido al carrito!</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" />
            <span>{tieneStock ? "Agregar al carrito" : "Agotado"}</span>
          </>
        )}
      </button>
    </div>
  );
}
