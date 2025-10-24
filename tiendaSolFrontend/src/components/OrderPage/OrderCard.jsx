import React from 'react'
import { CheckCircle, XCircle, Clock, Truck, X, Package } from "lucide-react";


const estadoConfig = {
  ENTREGADO: { color: "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-50", icon: CheckCircle },
  CANCELADO: { color: "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-50", icon: XCircle },
  ENVIADO: { color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-indigo-50", icon: Truck },
  CONFIRMADO: { color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-50", icon: Package },
  PENDIENTE: { color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-50", icon: Clock },
};


function OrderCard({pedido, cancelarPedido}) {

    const { estado, historialEstados, _id, total, fechaCreacion } = pedido;
    const puedeCancelar = !["ENTREGADO", "ENVIADO", "CANCELADO"].includes(estado);
    const EstadoIcon = estadoConfig[estado]?.icon || Clock;
    const estadoColor = estadoConfig[estado]?.color || estadoConfig.PENDIENTE.color;

  return (
    <div key={_id} className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-neutral-200 dark:border-neutral-700">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        <div className="md:col-span-2 space-y-1">
            <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold">
            Pedido #<span className="text-gray-900 dark:text-gray-50 font-bold">{_id}</span>
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-gray-50">${total}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            Realizado el: {new Date(fechaCreacion).toLocaleDateString("es-ES", { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
        </div>

        <div className="md:col-span-1 flex flex-col items-start md:items-center space-y-1">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">Estado Actual</p>
            <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-bold shadow ${estadoColor}`}>
            <EstadoIcon className="w-4 h-4 mr-1" />
            {estado}
            </span>
        </div>

        <div className="md:col-span-1 flex justify-start md:justify-end">
            {puedeCancelar ? (
            <button
                onClick={() => cancelarPedido(_id)}
                className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-md"
            >
                <X className="w-4 h-4 mr-1" />
                Cancelar Pedido
            </button>
            ) : (
            <span className="text-sm text-neutral-500 dark:text-neutral-400 py-2">No cancelable</span>
            )}
        </div>
        </div>

        <div className="mt-4 pt-4 border-t border-neutral-100 dark:border-neutral-700">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Historial del Pedido:</p>
        <div className="flex flex-wrap gap-2">
            {historialEstados.map((e, i) => {
            const Icon = estadoConfig[e]?.icon || Clock;
            const color = estadoConfig[e]?.color || estadoConfig.PENDIENTE.color;
            return (
                <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
                <Icon className="w-4 h-4 mr-1" />
                {e}
                </span>
            );
            })}
        </div>
        </div>
    </div>
  )
}

export default OrderCard