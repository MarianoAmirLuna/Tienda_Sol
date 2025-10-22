import React from 'react'
import ProductListPage from './ProductListPage'
import { useParams } from 'react-router-dom';

export default function SellerPage() {

  const { sellerId } = useParams();

  return (
    <>
        <ProductListPage sellerId={sellerId} />
    </>
  )
}
