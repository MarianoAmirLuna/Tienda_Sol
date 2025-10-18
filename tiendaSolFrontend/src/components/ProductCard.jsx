export default function ProductCard({ product }) {
  // Usar la primera foto del array de fotos

  return (
    <a
      href={`/productos/${product._id}`}
      className="bg-white dark:bg-neutral-800 rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer flex flex-col"
    >
      <div className="relative w-full h-56 overflow-hidden rounded-t-2xl">
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
          <p className="text-blue-600 dark:text-blue-400 font-bold text-lg">
            ${product.precio?.toLocaleString("es-AR") || "0"}
          </p>
        </div>
      </div>
    </a>
  );
}
