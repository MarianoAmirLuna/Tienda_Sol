import React, { useState } from "react";
import { Package, Truck, CheckCircle, XCircle, Clock } from "lucide-react";

const ESTADOS = ["Pendiente", "Confirmado", "Enviado", "Entregado", "Cancelado"];

export default function OrdersTable({ pedidos }) {
  // Datos de prueba
  const testPedidos = [
    {
      _id: "65f042e9a3b6d0c2f8e1a7b4",
      total: 35000,
      cliente: { _id: "CL001", nombre: "Ana García" },
      estado: "Pendiente",
      items: [
        { _id: "ITM001", nombre: "Teclado Mecánico RGB", cantidad: 1, precio: 20000 },
        { _id: "ITM002", nombre: "Mouse Inalámbrico", cantidad: 2, precio: 7500 },
      ],
    },
    {
      _id: "65f042e9a3b6d0c2f8e1a7b5",
      total: 15000,
      cliente: { _id: "CL002", nombre: "Jorge Pérez" },
      estado: "Enviado",
      items: [{ _id: "ITM003", nombre: "Monitor 27 Pulgadas", cantidad: 1, precio: 15000 }],
    },
    {
      _id: "65f042e9a3b6d0c2f8e1a7b6",
      total: 8000,
      cliente: { _id: "CL003", nombre: "Marta López" },
      estado: "Entregado",
      items: [{ _id: "ITM004", nombre: "Cable USB-C 2m", cantidad: 4, precio: 2000 }],
    },
  ];

  pedidos = pedidos || testPedidos;

  const [estados, setEstados] = useState(
    pedidos.reduce((acc, p) => ({ ...acc, [p._id]: p.estado || "Pendiente" }), {})
  );

  const handleEstadoChange = (id, nuevoEstado) => {
    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case "Pendiente":
        return <Clock className="text-yellow-500 w-4 h-4" />;
      case "Confirmado":
        return <Package className="text-blue-500 w-4 h-4" />;
      case "Enviado":
        return <Truck className="text-purple-500 w-4 h-4" />;
      case "Entregado":
        return <CheckCircle className="text-green-500 w-4 h-4" />;
      case "Cancelado":
        return <XCircle className="text-red-500 w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-neutral-50 dark:bg-neutral-900 min-h-screen transition-colors duration-500">
      <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-800 shadow-2xl rounded-3xl overflow-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold p-6 border-b border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100">
          🧾 Lista de Pedidos
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm uppercase tracking-wider text-neutral-600 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-700">
                <th className="p-4">ID Pedido</th>
                <th className="p-4">Cliente</th>
                <th className="p-4">Productos</th>
                <th className="p-4 text-right">Total</th>
                <th className="p-4 text-center">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr
                  key={pedido._id}
                  className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/40 transition"
                >
                  <td className="p-4 font-mono text-sm text-neutral-700 dark:text-neutral-300">
                    {pedido._id.slice(-6).toUpperCase()}
                  </td>
                  <td className="p-4 font-medium text-neutral-800 dark:text-neutral-200">
                    {pedido.cliente.nombre}
                  </td>
                  <td className="p-4 text-neutral-700 dark:text-neutral-300">
                    <ul className="space-y-1">
                      {pedido.items.map((item) => (
                        <li key={item._id} className="flex justify-between">
                          <span>{item.nombre}</span>
                          <span className="text-sm text-neutral-500">x{item.cantidad}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="p-4 text-right font-bold text-green-600 dark:text-green-400">
                    ${pedido.total}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {getEstadoIcon(estados[pedido._id])}
                      <select
                        value={estados[pedido._id]}
                        onChange={(e) => handleEstadoChange(pedido._id, e.target.value)}
                        className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-700 text-sm text-neutral-800 dark:text-neutral-100 focus:ring-2 focus:ring-purple-500 transition"
                      >
                        {ESTADOS.map((estado) => (
                          <option key={estado} value={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
