import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  // Captura el valor del segmento ":idProducto" de la URL
  const { idProducto } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Aquí es donde harías la llamada a tu backend:
    // fetch(`/api/productos/${idProducto}`)
    //   .then(res => res.json())
    //   .then(data => setProduct(data));
    
    // Simulación de carga
    console.log(`Cargando producto con ID: ${idProducto}`);

  }, [idProducto]); // Vuelve a ejecutar si el ID cambia

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Detalle de Producto ID: {idProducto}</h1>
      {/* ... Muestra la información del producto ... */}
    </div>
  );
}