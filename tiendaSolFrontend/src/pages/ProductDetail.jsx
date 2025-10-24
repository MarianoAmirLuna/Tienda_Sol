import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import ProductDetailCarrousel from "../components/ProductDetail/ProductDetailCarrousel.jsx";
import ProductDetailInfo from "../components/ProductDetail/ProductDetailInfo.jsx";
import ProductDetailCart from "../components/ProductDetail/ProductDetailCart.jsx";

export default function DetalleProducto() {
  const { idProducto } = useParams();
  const { agregarAlCarrito } = useCart();

  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    if (!idProducto) return;

    const abortController = new AbortController();
    const fetchProducto = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(
          `${import.meta.env.VITE_API_URL_INICIAL}/productos/${idProducto}`,
          { signal: abortController.signal }
        );

        if (res.status === 404) throw new Error("Producto no encontrado.");
        if (!res.ok) throw new Error("Error al cargar el producto.");

        const data = await res.json();
        setProducto(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          console.error("Error al obtener el producto:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducto();
    return () => abortController.abort();
  }, [idProducto]);

  const manejarAgregarAlCarrito = () => {
    if (!producto) return;

    if (cantidad <= 0 || cantidad > producto.stock) {
      alert(`No puedes agregar esa cantidad. Stock disponible: ${producto.stock}`);
      return;
    }

    agregarAlCarrito(producto, cantidad);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 2500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-neutral-600 dark:text-neutral-400">
        Cargando producto...
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-500">
        {error || "Detalles no disponibles."}
      </div>
    );
  }

  return (
    <div className="from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-white dark:bg-neutral-900 rounded-3xl -2xl overflow-hidden">
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
