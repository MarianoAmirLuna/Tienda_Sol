import { useEffect, useState } from "react";
import ProductList from "../components/ProductListPage/ProductList";
import Filtros from "../components/Filtros/Filtros";

function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true)
  const [filtros, setFiltros] = useState({
    terminoBusqueda: "",
    precioMin: "",
    precioMax: "",
    categoria: "",
    orden: "",
  });

  // Función para construir query params
  const construirQueryParams = (filtros) => {
    const params = new URLSearchParams();

    if (filtros.terminoBusqueda) {
      params.append("keyWord", filtros.terminoBusqueda);
    }
    if (filtros.categoria) {
      params.append("category", filtros.categoria);
    }
    if (filtros.precioMin) {
      params.append("minPrice", filtros.precioMin);
    }
    if (filtros.precioMax) {
      params.append("maxPrice", filtros.precioMax);
    }
    if (filtros.orden) {
      params.append("sortOrder", filtros.orden);
    }

    return params.toString();
  };

  const buscarProductos = (filtrosAplicados = filtros) => {
    const queryParams = construirQueryParams(filtrosAplicados);
    const url = queryParams
      ? `${import.meta.env.VITE_API_URL_INICIAL}/productos?${queryParams}`
      : `${import.meta.env.VITE_API_URL_INICIAL}/productos`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false)
        setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    setLoading(true)
    buscarProductos();
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

      <ProductList products={productos} loading={loading}/>
    </>
  );
}

export default Home;
