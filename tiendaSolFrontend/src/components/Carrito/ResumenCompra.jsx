import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import DireccionForm from "./DireccionForm";
import { Truck, DollarSign, ChevronDown, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function ResumenCompra({ compradorId, subtotal, vendedorId, direccionUsuario }) {
  const { crearPedido } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [direccionSeleccionada, setDireccionSeleccionada] = useState(direccionUsuario || null);
  const [direccionValida, setDireccionValida] = useState(!!direccionUsuario);

  const handleDireccionChange = (dir, esValida) => {
    setDireccionSeleccionada(dir);
    setDireccionValida(esValida);
  };

  const navigate = useNavigate()

  const handleGenerarPedido = async () => {
    try {
      await crearPedido(direccionSeleccionada, compradorId, vendedorId);
      toast.success('¡Pedido generado con éxito!');
      navigate("/orders");
    } catch (error) {
      console.error("Error al generar el pedido:", error);
      toast.error('¡Error al generar el pedido!');
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl -xl border border-gray-100 dark:border-gray-700">
      <h3 className="flex items-center text-xl font-extrabold text-gray-900 dark:text-white mb-6 border-b pb-2 border-gray-200 dark:border-gray-700">
        <DollarSign className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        Resumen de la Orden
      </h3>

      <div className="flex justify-between items-center text-lg font-medium text-gray-700 dark:text-gray-300 mb-6">
        <span>Subtotal de productos:</span>
        <span className="font-bold text-gray-900 dark:text-white">${subtotal}</span>
      </div>

      <hr className="mb-6 border-gray-200 dark:border-gray-700" />

      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full mb-4 flex items-center justify-center py-3 px-4 bg-indigo-50 dark:bg-gray-700 text-indigo-700 dark:text-white font-semibold rounded-xl transition hover:bg-indigo-100 dark:hover:bg-gray-600 border border-indigo-200 dark:border-gray-600"
      >
        <Truck className="w-5 h-5 mr-2" />
        {direccionValida ? <CheckCircle className="w-4 h-4 mr-2 text-green-500" /> : null}
        {isOpen ? "Ocultar Detalles de Envío" : "Seleccionar / Modificar Dirección"}
        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="mb-6 p-4 border border-indigo-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 -inner">
          <DireccionForm
            direccionInicial={direccionUsuario}
            onChange={handleDireccionChange}
          />
        </div>
      )}
      
      {!isOpen && direccionSeleccionada && (
        <div className={`mb-6 p-3 rounded-lg border text-sm ${direccionValida ? 'bg-green-50 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-300' : 'bg-red-50 border-red-300 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-300'}`}>
          {direccionValida ? 'Dirección de envío válida seleccionada.' : 'Dirección incompleta o inválida. Por favor, revísala.'}
        </div>
      )}

      <button
        onClick={handleGenerarPedido}
        disabled={!direccionValida}
        className={`w-full py-3 px-4 text-lg font-bold rounded-xl -lg transition transform active:scale-95 ${
          direccionValida
            ? "bg-indigo-600 hover:bg-indigo-700 text-white -indigo-500/50"
            : "bg-gray-300 text-gray-500 cursor-not-allowed -none"
        }`}
      >
        Pagar y Generar Pedido
      </button>
    </div>
  );
}