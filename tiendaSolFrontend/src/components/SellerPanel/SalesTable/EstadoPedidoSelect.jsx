import React from "react";
import { Clock, Package, Truck, CheckCircle, XCircle, Hammer } from "lucide-react";

const iconosEstado = {
  PENDIENTE: <Clock className="text-yellow-500 w-5 h-5" />,
  CONFIRMADO: <Package className="text-blue-500 w-5 h-5" />,
  EN_PREPARACION: <Hammer className="text-orange-500 w-5 h-5" />,
  ENVIADO: <Truck className="text-indigo-500 w-5 h-5" />,
  ENTREGADO: <CheckCircle className="text-green-500 w-5 h-5" />,
  CANCELADO: <XCircle className="text-red-500 w-5 h-5" />,
};


export default function EstadoPedidoSelect({ estado, onChange, transiciones }) {
  return (
    <div className="flex items-center justify-center gap-2">
      {iconosEstado[estado]}
      {estado !== "CANCELADO" && estado !== "ENTREGADO" && (
        <select
          value={estado}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-sm focus:ring-2 focus:ring-indigo-500"
        >
          {transiciones[estado]?.map((nuevo) => (
            <option key={nuevo} value={nuevo}>
              {nuevo}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
