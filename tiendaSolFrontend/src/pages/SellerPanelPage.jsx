import React, { useState, useEffect } from "react";
import SalesTable from "../components/SellerPanel/SalesTable";
import CreateProduct from "../components/SellerPanel/CreateProductForm/CreateProduct";
import { useUser } from "../context/UserContext";

export default function SellerPanelPage() {

    const [ventas, setVentas] = useState([]);
    
    const { usuario, setUsuario } = useUser();


    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white p-8">
        <h1 className="text-3xl font-bold mb-6">Bienvenido {usuario?.nombre}!</h1>


        <section className="mb-10">
            <h2 className="text-center text-2xl font-semibold mb-4">Agregar Producto</h2>
            <CreateProduct sellerId={usuario?._id} />
        </section>

        <section>
            <h2 className="text-2xl font-semibold mb-4">Ventas / Pedidos</h2>
            <SalesTable ventas={ventas} />
        </section>
        </div>
    );
}
