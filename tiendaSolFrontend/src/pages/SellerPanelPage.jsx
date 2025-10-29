import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import SalesTable from "../components/SellerPanel/SalesTable/SalesTable";
import CreateProduct from "../components/SellerPanel/CreateProductForm/CreateProduct";
import ProductTable from "../components/SellerPanel/ProductTable/ProductTable";
import SalesStateStat from "../components/SellerPanel/Stats/SalesStateStat";
import SalesEarningStat from "../components/SellerPanel/Stats/SalesEarningStat";

export default function SellerPanelPage() {
  const { usuario } = useUser();

  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <p className="mb-2">Logeate para ingresar a esta sección</p>
        <Link to="/login" className="text-indigo-500 hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  const sellerId = usuario.id;

  return (
    <div className="bg-neutral-50 dark:bg-neutral-900 min-h-screen p-4 sm:p-8 lg:p-10 space-y-10">
      
      <header className="text-center">
        <h1 className="text-4xl font-extrabold mb-2 text-neutral-900 dark:text-white">
          Bienvenido, <span className="text-indigo-600 dark:text-indigo-400">{usuario.nombre}</span>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base">
          Panel de control de ventas y productos
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
          Métricas Clave y Rendimiento
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SalesStateStat sellerId={sellerId} />
          </div>
          <div className="lg:col-span-2">
            <SalesEarningStat sellerId={sellerId} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
          Gestión de Inventario
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <CreateProduct sellerId={sellerId} />
          </div>
          <div className="lg:col-span-2">
            <ProductTable sellerId={sellerId} />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-2">
          Detalle de Pedidos
        </h2>
        <SalesTable sellerId={sellerId} />
      </section>

    </div>
  );
}
