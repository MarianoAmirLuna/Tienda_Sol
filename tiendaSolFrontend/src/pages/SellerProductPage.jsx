import React from 'react'
import ProductListPage from './ProductListPage'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SellerProductPage() {

  const { sellerId } = useParams();
  const [loading, setLoading] = useState(true)

  const [vendedor, setVendedor] = useState(null);
    
  useEffect(() => {
    setLoading(true)
    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/usuarios/${sellerId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setVendedor(data);
      })
      .catch((err) => console.error("Error al cargar vendedor:", err));
  }, [sellerId]);


  return (
    <>
      <div className="mt-24 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10 text-center">
          Productos de {vendedor ? vendedor.nombre : 'Cargando...'}
        </h2>
        <ProductListPage sellerId={sellerId} loading={loading} />
      </div>
    </>
  )
}
