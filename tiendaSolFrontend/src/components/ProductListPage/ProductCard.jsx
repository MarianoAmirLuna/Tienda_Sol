import {Link} from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <Link
      to={`/productos/${product._id}`}
      className="bg-white dark:bg-neutral-800 border border-gray-200 rounded-md -md overflow-hidden hover:-xl transition cursor-pointer flex flex-col"
    >
      <div className="relative w-full h-56 overflow-hidden rounded-t-md">
        <img
          src={product.fotos[0]}
          alt={product.nombre}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
            {product.nombre}
          </h3>
          <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
            ${product.precio?.toLocaleString("es-AR") || "0"}
          </p>
        </div>
      </div>
    </Link>
  );
}
