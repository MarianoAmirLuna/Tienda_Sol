import React from "react";
import FilaPedido from "./FilaPedido";
import useSales from "./useSales";
import LoadingIndicator from "../../LoadingIndicator";

export default function SalesPanel({ sellerId }) {
  const { pedidos, estados, loading, error, actualizarEstado } = useSales(sellerId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingIndicator 
          message="Cargando producto..." 
          size={15} 
          color="#4f46e5" 
        />
      </div>
    );
  }


  if (!pedidos.length)
    return <div className="p-10 text-center text-neutral-500 dark:text-neutral-300">No hay pedidos todavía.</div>;

  return (
    <div className="dark:bg-neutral-900">
      <div className="mx-auto bg-white dark:bg-neutral-800 rounded-3xl -2xl overflow-hidden border border-neutral-200 dark:border-neutral-700">
        <header className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-700">
          <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">Panel de Ventas</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">{pedidos.length} pedidos totales</p>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead className="bg-neutral-200/50 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-5 text-left">Pedido</th>
                <th className="p-5 text-left">Comprador</th>
                <th className="p-5 text-left">Productos</th>
                <th className="p-5 text-left">Entrega</th>
                <th className="p-5 text-right">Total</th>
                <th className="p-5 text-center">Estado</th>
                <th className="p-5 text-center">Fecha</th>
                <th className="p-5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <FilaPedido
                  key={pedido._id}
                  pedido={pedido}
                  estado={estados[pedido._id]}
                  onEstadoChange={actualizarEstado}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
