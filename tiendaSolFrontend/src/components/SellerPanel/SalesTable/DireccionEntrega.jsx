import React from "react";
import { MapPin, ChevronDown } from "lucide-react";

export default function DireccionEntrega({ direccion }) {
  return (
    <details>
      <summary className="flex items-center gap-2 cursor-pointer text-indigo-600 dark:text-indigo-400 font-medium">
        <MapPin className="w-4 h-4" />
        Ver dirección
        <ChevronDown className="w-3 h-3" />
      </summary>
      <div className="mt-2 pl-6 text-xs sm:text-sm space-y-0.5 text-neutral-600 dark:text-neutral-400">
        <p>
          {direccion.calle} {direccion.altura}
          {direccion.piso && `, Piso ${direccion.piso}`}
          {direccion.departamento && `, Dpto ${direccion.departamento}`}
        </p>
        <p>
          {direccion.ciudad}, {direccion.provincia}
        </p>
        <p>{direccion.pais}</p>
        <p>CP: {direccion.codigoPostal}</p>
      </div>
    </details>
  );
}
