import React, { useState } from "react";

export default function ProductDetailCarrousel({ producto }) {
  const [imagenIndex, setImagenIndex] = useState(0);

  const fotos =
    producto?.fotos && producto.fotos.length > 0
      ? producto.fotos
      : ["https://via.placeholder.com/500x500?text=Sin+Imagen"];

  const prevImagen = () => {
    setImagenIndex((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  };

  const nextImagen = () => {
    setImagenIndex((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center bg-neutral-100 dark:bg-neutral-800 p-6 rounded-3xl -md transition">
      <div className="relative w-full flex items-center justify-center">
        <img
          src={fotos[imagenIndex]}
          alt={`${producto.nombre} ${imagenIndex + 1}`}
          className="w-full h-[400px] object-contain rounded-2xl transition-transform duration-500 ease-in-out"
        />

        {fotos.length > 1 && (
          <>
            <button
              onClick={prevImagen}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 -md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              ‹
            </button>

            <button
              onClick={nextImagen}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 -md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
            >
              ›
            </button>
          </>
        )}
      </div>

      {fotos.length > 1 && (
        <div className="flex gap-3 mt-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
          {fotos.map((foto, idx) => (
            <button
            key={idx}
            onClick={() => setImagenIndex(idx)}
            className={`flex-shrink-0 border-2 rounded-xl transition-all duration-300 ${
                idx === imagenIndex
                ? "border-indigo-600 dark:border-green-400"
                : "border-transparent"
            } hover:-lg hover:-indigo-500/30 dark:hover:-green-400/30`}
            >
            <img
                src={foto}
                alt={`Vista ${idx + 1}`}
                className="w-20 h-20 object-cover rounded-lg"
            />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
