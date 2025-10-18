import ResumenCompra from "../components/Carrito/ResumenCompra";
import ListaProductos from "../components/Carrito/ListaProductos";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-light text-center mb-12 uppercase tracking-widest">
        Carrito
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <ListaProductos
            carrito={carrito}
            onEliminar={eliminarDelCarrito}
            onActualizar={actualizarCantidad}
          />
        </div>

        <div className="lg:w-1/3">
          <ResumenCompra carrito={carrito} />
        </div>
      </div>
    </div>
  );
}
