import ProductList from "../components/ProductList";
import Filtros from "../components/Filtros/Filtros";
import { useEffect, useState } from "react";


const FILTROS_INICIALES = {
  terminoBusqueda: "",
  precioMin: "",
  precioMax: "",
  categoria: "",
  orden: "",
};

const construirQueryParams = (filtros) => {
  const params = new URLSearchParams();

  if (filtros.terminoBusqueda) {
    params.append("keyWord", filtros.terminoBusqueda);
  }
  if (filtros.categoria) {
    params.append("category", filtros.categoria);
  }
  if (filtros.precioMin && !isNaN(Number(filtros.precioMin))) {
    params.append("minPrice", filtros.precioMin);
  }
  if (filtros.precioMax && !isNaN(Number(filtros.precioMax))) {
    params.append("maxPrice", filtros.precioMax);
  }
  if (filtros.orden) {
    params.append("sortOrder", filtros.orden);
  }

  return params.toString();
};

function ProductListPage() {
  const [productos, setProductos] = useState([]);
  const [filtros, setFiltros] = useState(FILTROS_INICIALES);

  const buscarProductos = (filtrosAplicados = filtros) => {
    const queryParams = construirQueryParams(filtrosAplicados);
    const url = queryParams
      ? `${import.meta.env.VITE_API_URL_INICIAL}/productos?${queryParams}`
      : `${import.meta.env.VITE_API_URL_INICIAL}/productos`;

    console.log("url enviada: " + url);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => console.error("Error en fetch:", error));
  };

  useEffect(() => {
    buscarProductos(FILTROS_INICIALES); 
  }, []);

  const manejarCambioFiltros = (nuevosFiltros) => {
    setFiltros(nuevosFiltros);
  };

  const aplicarFiltros = () => {
    buscarProductos();
  };

  return (
    <>
      <div className="text-center text-2xl py-10">Bienvenido a Tienda Sol</div>

      <Filtros
        filtros={filtros}
        onCambioFiltros={manejarCambioFiltros}
        onBuscar={aplicarFiltros}
      />

      <ProductList products={productos} />
    </>
  );
}

export default ProductListPage;