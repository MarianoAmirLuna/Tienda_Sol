import React from "react";

export default function ResumenCompra({ carrito }) {
  const subtotal = carrito.reduce(
    (acumulador, producto) => acumulador + producto.precio * producto.cantidad,
    0
  );

  const envio = 0;
  const total = subtotal + envio;

  const formatearMoneda = (valor) => `$${valor}`;

  return (
    <div
      className="rounded-3xl p-6 sticky top-28 
                 bg-neutral-100 dark:bg-neutral-900 
                 transition-colors duration-300"
    >
      <h2
        className="text-2xl font-semibold mb-6 
                   text-neutral-800 dark:text-white"
      >
        Resumen
      </h2>

      {/* 🛒 Lista de productos */}
      <div className="mb-6 space-y-3">
        {carrito.length === 0 ? (
          <p className="text-neutral-500 dark:text-neutral-400">
            Tu carrito está vacío.
          </p>
        ) : (
          carrito.map((producto) => (
            <div
              key={producto.id}
              className="flex justify-between items-center 
                         bg-neutral-200 dark:bg-neutral-800 
                         rounded-xl px-3 py-2"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  {producto.nombre}
                </span>
                <span className="text-xs text-neutral-600 dark:text-neutral-400">
                  Cantidad: {producto.cantidad}
                </span>
              </div>

              <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                {formatearMoneda(producto.precio * producto.cantidad)}
              </span>
            </div>
          ))
        )}
      </div>

      <hr className="my-4 border-neutral-300 dark:border-neutral-700" />

      <div className="grid grid-cols-2 gap-y-3 ">
        <span className="text-neutral-600 dark:text-neutral-300">Envíos</span>
        <span className="text-neutral-800 dark:text-white text-right font-medium">
          {formatearMoneda(envio)}
        </span>
      </div>

      <hr className="my-4 border-neutral-300 dark:border-neutral-700" />

      <div className="grid grid-cols-2 items-center mb-8">
        <span className="text-lg font-bold text-neutral-900 dark:text-white">
          Total
        </span>
        <span className="text-xl text-neutral-900 dark:text-white text-right font-bold">
          {formatearMoneda(total)}
        </span>
      </div>

      <button
        className="w-full bg-indigo-500 hover:bg-indigo-600 
                   dark:bg-indigo-600 dark:hover:bg-indigo-700 
                   text-white font-bold py-3 px-4 rounded-full 
                   transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={carrito.length === 0}
      >
        Pagar
      </button>
    </div>
  );
}
