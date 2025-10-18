import React from "react";
import ItemProducto from "./ItemProducto";
import { useCart } from "../../context/CartContext.jsx";

export default function ListaProductos() {

  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCart();

  return (
    <div
      className="rounded-3xl p-6 
                 bg-neutral-100 dark:bg-neutral-900 
                 transition-colors duration-300"
    >
      <h2 className="text-2xl font-semibold mb-6 
                     text-neutral-900 dark:text-white">
        Productos
      </h2>

      {carrito.length === 0 ? (
        <p className="text-neutral-500 dark:text-neutral-400">
          Tu carrito está vacío.
        </p>
      ) : (
        <div className="space-y-4">
          {carrito.map((producto) => (
            <ItemProducto
              key={producto.id}
              producto={producto}
              onEliminar={eliminarDelCarrito}
              onActualizarCantidad={actualizarCantidad}
            />
          ))}
        </div>
      )}
    </div>
  );
}
