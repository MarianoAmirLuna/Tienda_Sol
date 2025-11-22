import React, { useState, useEffect, useMemo } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import LoadingIndicator from "../../LoadingIndicator";

const useCurrencyFormatter = () => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function SalesEarningStat({ sellerId }) {
  const [pedidos, setPedidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const currencyFormatter = useCurrencyFormatter();

  useEffect(() => {
    if (!sellerId) {
      setPedidos([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/?vendedorID=${sellerId}`, {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setPedidos(data || []);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError("No se pudieron cargar los datos de ventas.");
          setPedidos([]);
          setIsLoading(false);
        }
      });

    return () => controller.abort();
  }, [sellerId]);

  const { pedidosCompletados, totalGanancias, promedioPedido, data } = useMemo(() => {
    const completedPedidos = pedidos.filter(p => p.estado === "ENTREGADO");
    const totalEarnings = completedPedidos.reduce((sum, p) => sum + (Number(p.total) || 0), 0);
    const averageOrder = completedPedidos.length > 0 ? totalEarnings / completedPedidos.length : 0;

    const salesByDay = completedPedidos.reduce((acc, p) => {
      const dateKey = p.fechaCreacion ? new Date(p.fechaCreacion).toISOString().slice(0, 10) : '2000-01-01';
      const displayDate = new Date(dateKey).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
      acc[dateKey] = acc[dateKey] || { fecha: displayDate, total: 0 };
      acc[dateKey].total += Number(p.total) || 0;
      return acc;
    }, {});

    const sortedData = Object.entries(salesByDay)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([, value]) => value);

    return {
      pedidosCompletados: completedPedidos,
      totalGanancias: totalEarnings,
      promedioPedido: averageOrder,
      data: sortedData,
    };
  }, [pedidos]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingIndicator 
          message="Cargando Estadistica..." 
          size={15} 
          color="#4f46e5" 
        />
      </div>
    );
  }
  if (error || pedidosCompletados.length === 0) {
    return (
      <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl -2xl border border-gray-200 dark:border-neutral-700 h-[450px] flex items-center justify-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          {error || "No hay pedidos completados para mostrar estadísticas."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl -2xl border border-gray-200 dark:border-neutral-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-50 text-center">
        Estadísticas de Ventas y Ganancias
      </h2>

      <div className="flex justify-around mb-6 text-center">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Pedidos Entregados</p>
          <p className="text-xl font-bold text-gray-900 dark:text-gray-50">{pedidosCompletados.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Ganancias Totales</p>
          <p className="text-xl font-bold text-green-600 dark:text-green-400">
            {currencyFormatter.format(totalGanancias)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Promedio por Pedido</p>
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {currencyFormatter.format(promedioPedido)}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-3 mt-8 text-gray-800 dark:text-gray-100 text-center">Ganancias por Día</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="fecha" tick={{ fontSize: 10, fill: '#374151' }} />
          <YAxis 
            tickFormatter={(value) => currencyFormatter.format(value)} 
            tick={{ fontSize: 10, fill: '#374151' }}
          />
          <Tooltip 
            formatter={(value) => currencyFormatter.format(value)}
            labelFormatter={(label) => `Fecha: ${label}`} 
          />
          <Line 
            type="monotone" 
            dataKey="total" 
            stroke="#4f46e5" 
            name="Ganancias por Día" 
            strokeWidth={3} 
            dot={{ fill: '#4f46e5', r: 4 }}
            activeDot={{ r: 7 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
