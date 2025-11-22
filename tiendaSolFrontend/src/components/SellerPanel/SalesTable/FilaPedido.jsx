import React, { useState, useEffect } from "react";
import EstadoPedidoSelect from "./EstadoPedidoSelect";
import DireccionEntrega from "./DireccionEntrega";
import { FileText } from "lucide-react";
import generarFactura from "./generadorFactura";

export default function FilaPedido({ pedido, estado, onEstadoChange }) {
  const transiciones = {
    PENDIENTE: ["PENDIENTE", "CONFIRMADO", "CANCELADO", "ENVIADO"],
    CONFIRMADO: ["CONFIRMADO", "ENVIADO", "CANCELADO", "EN_PREPARACION"],
    EN_PREPARACION: ["EN_PREPARACION", "ENVIADO", "CANCELADO"],
    ENVIADO: ["ENVIADO", "ENTREGADO"],
    ENTREGADO: [],
    CANCELADO: [],
  };

  const [productos, setProductos] = useState({});

  useEffect(() => {
    pedido.itemsPedido.forEach((item) => {
      fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${item.productoID}`)
        .then((res) => res.json())
        .then((data) => {
          setProductos((prev) => ({ ...prev, [item.productoID]: data }));
        })
        .catch((err) => console.error("Error al cargar producto:", err));
    });
  }, [pedido.itemsPedido]);


  const [comprador, setComprador] = useState(null);
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/usuarios/${pedido.compradorID}`)
      .then((res) => res.json())
      .then((data) => {
        setComprador(data);
      })
      .catch((err) => console.error("Error al cargar comprador:", err));
  }, [pedido.compradorID]);

  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/30">
      <td className="p-5 font-mono text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">{pedido._id}</td>
      <td className="p-5 text-neutral-800 dark:text-neutral-200 font-medium">{comprador?.nombre || "Cargando..."}</td>
      <td className="p-5 text-neutral-700 dark:text-neutral-300">
        <ul className="space-y-1">
          {pedido.itemsPedido.map((item) => (
            <li key={item._id} className="flex justify-between">
              <span className="truncate font-medium">
                {productos[item.productoID]?.nombre || "Cargando..."}
              </span>
              <span className="text-neutral-500 text-sm">x{item.cantidad}</span>
            </li>
          ))}
        </ul>
      </td>
      <td className="p-5 text-sm text-neutral-700 dark:text-neutral-300">
        <DireccionEntrega direccion={pedido.direccionEntrega} />
      </td>
      <td className="p-5 text-right font-bold text-green-600 dark:text-green-400">
        ${pedido.total.toLocaleString("es-AR")}
      </td>
      <td className="p-5 text-center">
        <EstadoPedidoSelect
          estado={estado}
          onChange={(nuevo) => onEstadoChange(pedido._id, nuevo)}
          transiciones={transiciones}
        />
      </td>
      <td className="p-5 text-center text-sm text-neutral-500 dark:text-neutral-400">
        {new Date(pedido.fechaCreacion).toLocaleString("es-AR", {
          dateStyle: "medium",
          timeStyle: "short",
        })}
      </td>
      <td className="p-5 text-center">
        <button
          onClick={() => generarFactura(pedido)}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg -md"
        >
          <FileText className="w-4 h-4" />
          Factura
        </button>
      </td>
    </tr>
  );
}
