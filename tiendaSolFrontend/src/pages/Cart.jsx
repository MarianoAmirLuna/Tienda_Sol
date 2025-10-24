import React from "react";
import ResumenCompra from "../components/Carrito/ResumenCompra";
import ListaProductos from "../components/Carrito/ListaProductos";
import { useCart } from "../context/CartContext";
import {useUser} from "../context/UserContext"
import { Link } from "react-router-dom";

export default function Cart() {
  const { carrito, groupedCart } = useCart();
  const {usuario} = useUser()

  const vendedoresIds = Object.keys(groupedCart);

  if (!carrito || carrito.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-50 text-center">
        <h1 className="text-4xl font-bold mb-4">Carrito de Compras</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          Tu carrito está vacío
        </p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <p className="mb-2">Logeate para ingresar a esta sección</p>
        <Link to="/login" className="text-indigo-500 hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-900 text-gray-900 dark:text-gray-50 px-6 py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Carrito de Compras</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Revisa tus productos antes de finalizar la compra
        </p>
      </header>

      <main className="flex-1 flex flex-col items-center w-full gap-10">
        {vendedoresIds.map((vendedorId) => {
          const grupoVendedor = groupedCart[vendedorId];
          return (
            <div
              key={vendedorId}
              className="w-full max-w-6xl p-6 bg-white dark:bg-neutral-800 rounded-2xl shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-bold mb-6 border-b border-neutral-200 dark:border-neutral-700 pb-3">
                Pedido de{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {grupoVendedor.nombreVendedor}
                </span>
              </h2>

              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <ListaProductos carrito={grupoVendedor.items} />
                </div>

                <div className="w-full lg:w-1/3">
                  <ResumenCompra
                    compradorId={usuario._id}
                    subtotal={grupoVendedor.subtotal}
                    vendedorId={vendedorId}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}