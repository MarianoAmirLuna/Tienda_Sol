import { useEffect, useState } from "react";

export default function useSales(sellerId) {
  const [pedidos, setPedidos] = useState([]);
  const [estados, setEstados] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener pedidos del backend
  useEffect(() => {
    if (!sellerId) return;

    const obtenerPedidos = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/?vendedorID=${sellerId}`);
        if (!res.ok) throw new Error("Error al obtener pedidos");
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    obtenerPedidos();
  }, [sellerId]);

  // Sincronizar los estados iniciales
  useEffect(() => {
    if (pedidos.length > 0) {
      setEstados(
        pedidos.reduce((acc, p) => ({ ...acc, [p._id]: p.estado || "PENDIENTE" }), {})
      );
    }
  }, [pedidos]);

  // Actualizar estado de un pedido
  const actualizarEstado = async (id, nuevoEstado) => {
    setEstados((prev) => ({ ...prev, [id]: nuevoEstado }));

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error("Error al actualizar el estado");
    } catch (error) {
      console.error(error);
      const pedidoOriginal = pedidos.find((p) => p._id === id);
      setEstados((prev) => ({ ...prev, [id]: pedidoOriginal?.estado || "PENDIENTE" }));
      setError("No se pudo actualizar el estado");
    }
  };

  return { pedidos, estados, loading, error, actualizarEstado };
}
