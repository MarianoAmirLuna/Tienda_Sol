import SalesTable from "../components/SellerPanel/SalesTable/SalesTable";
import CreateProduct from "../components/SellerPanel/CreateProductForm/CreateProduct";
import { useUser } from "../context/UserContext";
import ProductTable from "../components/SellerPanel/ProductTable/ProductTable";
import { Link } from "react-router-dom";

export default function SellerPanelPage() {

    
    const { usuario, setUsuario } = useUser();

    if (!usuario) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
                <p>Logeate para ingresar a esta seccion</p>
                <Link to="/login" className="text-blue-500 hover:underline">Iniciar Sesión</Link>
            </div>
        );
    }

    return (
        <div className="bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white p-8">

        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2">
            Bienvenido, <span className="text-indigo-600 dark:text-indigo-400">{usuario.nombre}</span> 👋
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Administrá tus productos, gestioná tus ventas y agregá nuevos artículos fácilmente.
          </p>
        </header>


        <section className="mb-10">
            <CreateProduct sellerId={usuario?._id} />
        </section>

        <section className="mb-10">
            <SalesTable sellerId={usuario?._id} />
        </section>

        <section className="mb-10">
            <ProductTable sellerId={usuario?._id} />
        </section>
        </div>
    );
}
