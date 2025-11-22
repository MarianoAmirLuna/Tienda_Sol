import React, { useState } from "react";
import ResumenCompra from "../components/Carrito/ResumenCompra";
import ListaProductos from "../components/Carrito/ListaProductos";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import DireccionForm from "../components/Carrito/DireccionForm";
import { Truck, ChevronDown, CheckCircle } from 'lucide-react';

export default function Cart() {
  const { carrito, groupedCart, crearPedido } = useCart();
  const { usuario } = useUser();
  const navigate = useNavigate();

  const vendedoresIds = Object.keys(groupedCart);

  // FORMULARIO MAESTRO 
  const [isMaestroOpen, setIsMaestroOpen] = useState(false);
  const [direccionMaestra, setDireccionMaestra] = useState(usuario?.direccion || null);
  const [direccionMaestraValida, setDireccionMaestraValida] = useState(!!usuario?.direccion);

  const handleDireccionMaestraChange = (dir, esValida) => {
    setDireccionMaestra(dir);
    setDireccionMaestraValida(esValida);
  };

  const handleGenerarTodosLosPedidos = async () => {
    if (!direccionMaestraValida) {
      toast.error('Por favor, completa la dirección de envío.');
      return;
    }

    try {
      const promesasDePedidos = vendedoresIds.map(vendedorId => {
        return crearPedido(direccionMaestra, usuario.id, vendedorId);
      });
      await Promise.all(promesasDePedidos);

      toast.success('¡Todos los pedidos han sido generados con éxito!');
      navigate("/orders");
    } catch (error) {
      console.error("Error al generar uno o más pedidos:", error);
      toast.error('¡Error al generar uno o más pedidos!');
    }
  };

  const subtotalGeneral = Object.values(groupedCart).reduce(
    (acc, grupo) => acc + grupo.subtotal,
    0
  );

  const formatearMoneda = (valor) => {
    const numeroFormateado = valor.toLocaleString('es-AR');
    return `$ ${numeroFormateado}`;
  };

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

      <div className="w-full max-w-6xl mx-auto mb-10">
        <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6">
          <h2 className="text-2xl font-bold mb-5 border-b border-neutral-200 dark:border-neutral-700 pb-3">
            Resumen Total y Envío Unificado
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600 dark:text-gray-300">Subtotal de productos:</span>
              <span className="font-bold">{formatearMoneda(subtotalGeneral)}</span>
            </div>
          </div>

          <hr className="my-6 border-gray-200 dark:border-gray-700" />

          <button
            onClick={() => setIsMaestroOpen(prev => !prev)}
            className="w-full mb-4 flex items-center justify-center py-3 px-4 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-white font-semibold rounded-xl ..."
          >
            <Truck className="w-5 h-5 mr-2" />
            {direccionMaestraValida ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : null}
            {isMaestroOpen ? "Ocultar Dirección de Envío" : "Usar una Dirección para TODOS los pedidos"}
            <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isMaestroOpen ? 'transform rotate-180' : ''}`} />
          </button>

          {isMaestroOpen && (
            <div className="mb-6 p-4 border border-indigo-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900">
              <DireccionForm
                direccionInicial={usuario.direccion}
                onChange={handleDireccionMaestraChange}
              />
            </div>
          )}

          <button
            onClick={handleGenerarTodosLosPedidos}
            disabled={!direccionMaestraValida}
            className={`w-full py-3 px-4 text-lg font-bold rounded-xl transition ... ${direccionMaestraValida
                ? "bg-indigo-600 hover:bg-indigo-700 text-white ..."
                : "bg-gray-300 text-gray-500 cursor-not-allowed ..."
              }`}
          >
            Pagar y Generar TODOS los Pedidos
          </button>
        </div>
      </div>


      <main className="flex-1 flex flex-col items-center w-full gap-10">
        {vendedoresIds.map((vendedorId) => {
          const grupoVendedor = groupedCart[vendedorId];
          return (
            <div
              key={vendedorId}
              className="w-full max-w-6xl p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700"
            >
              <h2 className="text-2xl font-bold mb-6 ...">
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
                    compradorId={usuario.id}
                    subtotal={grupoVendedor.subtotal}
                    vendedorId={vendedorId}
                    direccionUsuario={usuario.direccion}
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