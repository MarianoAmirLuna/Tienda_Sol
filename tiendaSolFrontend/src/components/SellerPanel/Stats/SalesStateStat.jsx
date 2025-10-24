import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#16a34a", "#f59e0b", "#ef4444", "#8b5cf6", "#10b981"];

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
      acc[estado] = acc[estado] || { name: estado, value: 0 };
      acc[estado].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl -2xl border border-gray-200 dark:border-neutral-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50 text-center">
        Distribución de Pedidos
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#4f46e5"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} pedidos`} />
          <Legend verticalAlign="bottom" height={36}/>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
