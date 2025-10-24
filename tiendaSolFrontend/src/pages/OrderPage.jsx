import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderPage/OrderCard";


export default function OrderPage() {
  const { usuario } = useUser();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!usuario?._id) return;
    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/usuarios/${usuario._id}/historialPedidos`)
      .then(res => res.ok ? res.json() : Promise.reject("Error al obtener pedidos"))
      .then(setPedidos)
      .catch(console.error);
  }, [usuario?._id]);

  const cancelarPedido = async (pedidoId) => {

    const prevPedidos = [...pedidos];
    setPedidos(prev =>
      prev.map(p =>
        p._id === pedidoId
          ? { ...p, estado: "CANCELADO" }
          : p
      )
    );

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/pedidos/${pedidoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: "CANCELADO" }),
      });
      if (!res.ok) throw new Error();
    } catch (error) {
      console.error(error);
      alert("No se pudo cancelar el pedido.");
      setPedidos(prevPedidos);
    }
  };

  if (!usuario)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <p className="mb-2">Logeate para ingresar a esta sección</p>
        <Link to="/login" className="text-indigo-500 hover:underline">Iniciar Sesión</Link>
      </div>
    );

  if (!pedidos.length)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <p className="mb-2">No tienes pedidos realizados aún.</p>
      </div>
    );

  return (
    <div className="max-w-screen bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-6 ">

            <header className="text-center">
                <h1 className="text-4xl font-extrabold mb-2 text-neutral-900 dark:text-white">
                Pedidos de <span className="text-indigo-600 dark:text-indigo-400">{usuario.nombre}</span>
                </h1>
            </header>

            <div className="space-y-6">
                {pedidos.map(pedido => {

                return (
                    <OrderCard key={pedido._id} pedido={pedido} cancelarPedido={cancelarPedido} />
                );
                })}
            </div>
        </div>
    </div>

  );
}
