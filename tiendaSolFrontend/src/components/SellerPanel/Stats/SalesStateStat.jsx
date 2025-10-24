import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function SalesStateStat({ sellerId }) {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!sellerId) return;
    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/?vendedorID=${sellerId}`)
      .then(res => res.json())
      .then(data => setPedidos(data))
      .catch(err => console.error(err));
  }, [sellerId]);

  const data = Object.values(
    pedidos.reduce((acc, pedido) => {
      const estado = pedido.estado || "PENDIENTE";
      acc[estado] = acc[estado] || { estado, count: 0 };
      acc[estado].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50 text-center">
        Estadísticas de Ventas
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <XAxis dataKey="estado"/>
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#4f46e5" name="Cantidad de Pedidos" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
