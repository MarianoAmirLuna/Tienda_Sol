import React from 'react'
import { Link } from "react-router-dom";

export default function ProductDetailInfo({producto}) {
  return (
        <div>            
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {producto.unidadesVendidas} unidades vendidas
            </p>
            <h1 className="text-4xl font-extrabold mb-4">{producto.nombre}</h1>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                ${producto.precio?.toLocaleString("es-AR") || "0"}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Stock disponible: {producto.stock}
            </p>
            <p className="text-sm mb-4">
                Vendido por{" "}
                <Link 
                to={`/${producto.vendedor._id}/productos`} 
                className="text-indigo-500 hover:underline"
                >
                {producto.vendedor.nombre}
                </Link>
            </p>
            {producto.categorias?.length > 0 && (
                <div className="mb-4">
                <h2 className="font-semibold mb-2">Categorías:</h2>
                <div className="flex flex-wrap gap-2">
                    {producto.categorias.map((cat, i) => (
                    <span 
                        key={i} 
                        className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm"
                    >
                        {cat}
                    </span>
                    ))}
                </div>
                </div>
            )}
        </div>
  )
}
