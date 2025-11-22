import ProductList from '../ProductListPage/ProductList';
import { useState, useEffect } from "react";


export default function Top10Productos() {
    const [productos, setProductos] = useState([]);
    const [loading,setLoading] = useState(true)

    const masVendidos = () => {

        fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/?sortOrder=masVendido`)
        .then((response) => {
            setLoading(false)
            if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => setProductos(data))
        .catch((error) => console.error("Error en fetch:", error));
  };

  useEffect(() => {
    setLoading(true)
    masVendidos(); 
  }, []);


  return (
    <>
      <ProductList products={productos} loading={loading} />
    </>
  );

}