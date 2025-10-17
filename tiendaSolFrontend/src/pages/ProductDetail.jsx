import { useParams } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";

// Ejemplo de "base de datos" de productos
const PRODUCTS = [
  {
    id: 1,
    name: "Zapatillas Urban Classic",
    price: 34999,
    description:
      "Diseño limpio, materiales de alta calidad y una comodidad superior. Inspiradas en el movimiento urbano moderno.",
    image:
      "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    stock: 10,
  },
  {
    id: 2,
    name: "Reloj Minimal Pro",
    price: 12999,
    description: "Reloj elegante, minimalista y resistente al agua.",
    image:
      "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    stock: 5,
  },
];

export default function ProductDetail() {

  const { idProducto } = useParams();
  
  // muchachos, aca se deberia hacer un getProducto por id y borrar la lista de arriba
  const product = PRODUCTS.find((p) => p.id === parseInt(idProducto));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600 dark:text-red-400">
        Producto no encontrado
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Agregaste ${quantity} ${product.name} al carrito 🛒`);
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-xl overflow-hidden transition-colors duration-300">
        
        <div className="bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center p-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-10 flex flex-col justify-between space-y-8">
          
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              {product.description}
            </p>
           
            <p className="mt-6 text-3xl font-extrabold">
              ${product.price?.toLocaleString("es-AR") || "0"}
            </p>
            
            <p
              className={`mt-1 text-sm ${
                product.stock > 0
                  ? "text-neutral-500 dark:text-neutral-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            >
              {product.stock > 0
                ? `Stock disponible: ${product.stock}`
                : "Sin stock disponible"}
            </p>

          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-4 space-y-4 md:space-y-0">
           
            <div className="flex items-center border rounded-xl overflow-hidden border-neutral-200 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-700">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
              >
                −
              </button>
              <span className="px-5 text-lg font-semibold">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="px-4 py-2 text-lg font-medium hover:bg-neutral-200 dark:hover:bg-neutral-600 transition"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 font-semibold rounded-xl transition flex items-center justify-center space-x-2 ${
                product.stock > 0
                  ? "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-blue-600 dark:hover:bg-blue-500"
                  : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Agregar al carrito</span>
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
}
