import { useState } from "react";
import BotonToggleFiltros from "./BotonToggleFiltros";
import PanelDeFiltros from "./PanelDeFiltros";


export default function Filtros({ filtros, onCambioFiltros, onBuscar }) {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);

  const manejarCambio = (campo, valor) => {
    onCambioFiltros({
      ...filtros,
      [campo]: valor,
    });
  };

  const manejarBuscar = () => {
    onBuscar();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
      <BotonToggleFiltros
        mostrarFiltros={mostrarFiltros}
        onClick={() => setMostrarFiltros(!mostrarFiltros)}
      />

      {mostrarFiltros && (
        <PanelDeFiltros
          filtros={filtros}
          manejarCambio={manejarCambio}
          manejarBuscar={manejarBuscar}
        />
      )}
    </div>
  );
}