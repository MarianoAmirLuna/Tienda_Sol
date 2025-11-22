import React from 'react';
import { Link } from 'react-router-dom'; 

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-900 text-center p-6">
      
      <h1 className="text-9xl font-extrabold text-indigo-600 dark:text-indigo-400">
        404
      </h1>
      
      <h2 className="text-3xl font-bold mt-4 mb-2 text-gray-800 dark:text-gray-100">
        Página No Encontrada
      </h2>
      <p className="text-lg text-gray-600 dark:text-neutral-400 max-w-md">
        Lo sentimos, no pudimos encontrar la ruta que estás buscando.
        Puede que la página haya sido eliminada o que la dirección sea incorrecta.
      </p>
      
      <div className="mt-8">
        <Link 
          to="/" 
          className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Volver a la Página Principal
        </Link>
      </div>

    </div>
  );
}