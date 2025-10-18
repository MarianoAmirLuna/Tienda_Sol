import ProductList from "../components/ProductList";
import Filtros from "../components/filtros";
import { useEffect, useState } from "react";

function Home() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    console.log(`${import.meta.env.VITE_API_URL_INICIAL}/productos`);

    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos`)
      .then((response) => response.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <div className="text-center text-2xl py-10">Bienvenido a Tienda Sol</div>

      <Filtros />

      <ProductList products={productos} />
    </>
  );
}

export default Home;
