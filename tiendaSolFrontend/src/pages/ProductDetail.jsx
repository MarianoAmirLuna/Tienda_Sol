import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailCarrousel from "../components/ProductDetail/ProductDetailCarrousel.jsx";
import ProductDetailInfo from "../components/ProductDetail/ProductDetailInfo.jsx";
import ProductDetailCart from "../components/ProductDetail/ProductDetailCart.jsx";
import { toast } from 'react-toastify';
import LoadingIndicator from "../components/LoadingIndicator.jsx";

export default function DetalleProducto() {
  const { idProducto } = useParams();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!idProducto) return;

    const abortController = new AbortController();
    setIsLoading(true);

    const cargarProducto = async () => {
      try {
        const respuesta = await fetch(
          `${import.meta.env.VITE_API_URL_INICIAL}/productos/${idProducto}`,
          { signal: abortController.signal }
        );

        if (!respuesta.ok) {
          throw new Error(`Error ${respuesta.status}`);
        }

        const data = await respuesta.json();
        setProducto(data);

      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error al obtener el producto:", error);
          toast.error("Error al cargar el producto. Intentá nuevamente.");
        }
        setProducto(null);
      } finally {
        setIsLoading(false);
      }
    };

    cargarProducto();

    return () => abortController.abort();
  }, [idProducto]);

  const manejarAgregarAlCarrito = () => {
    if (!producto) {
      toast.error('No se puede agregar al carrito un producto no cargado.');
      return;
    }

    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
    toast.success('¡Producto agregado al carrito!');
  };

  if (isLoading || !producto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
        <LoadingIndicator 
          message="Cargando producto..." 
          size={15} 
          color="#4f46e5" 
        />
      </div>
    );
  }


  return (
    <div className="from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden">
        <ProductDetailCarrousel producto={producto} />

        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-8">
          <ProductDetailInfo producto={producto} />

          <ProductDetailCart
            producto={producto}
            manejarAgregarAlCarrito={manejarAgregarAlCarrito}
            setCantidad={setCantidad}
            cantidad={cantidad}
            agregado={agregado}
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 px-2 overflow-hidden">
        <h2 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">
          Descripción
        </h2>
        <div
          className="text-neutral-700 dark:text-neutral-300 leading-relaxed 
                     whitespace-pre-line break-words overflow-y-auto max-h-[400px] pr-2"
        >
          {producto.descripcion}
        </div>
      </div>
    </div>
  );
}
