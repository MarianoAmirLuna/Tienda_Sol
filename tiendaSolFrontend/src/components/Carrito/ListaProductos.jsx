import React from "react";
import ItemProducto from "./ItemProducto";

export default function ListaProductos({ carrito }) {

  

  return (
    <div className="rounded-xl p-4 sm:p-6  transition-colors duration-300 min-h-[250px]" >
      <h3 className="text-xl font-semibold mb-6 text-neutral-900 dark:text-white">
        Artículos en el pedido
      </h3>
        <div className="space-y-4">
          {carrito.map((producto) => (
            <ItemProducto
              producto={producto}
            />
          ))}
        </div>
    </div>
  );
}