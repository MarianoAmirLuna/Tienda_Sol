import LoadingIndicator from "../LoadingIndicator";
import ProductCard from "./ProductCard";

export default function ProductList({ products, loading }) {


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingIndicator 
          message="Cargando producto..." 
          size={15} 
          color="#4f46e5"
        />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-20 text-neutral-500 dark:text-neutral-400">
        No hay productos disponibles.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
