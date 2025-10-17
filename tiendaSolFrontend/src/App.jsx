import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'

function App() {
  return (
    // Importante: El BrowserRouter y el CartProvider envuelven la App
    <>
      <Header /> 
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/productos" element={<ProductList />} />
        <Route path="/productos/:idProducto" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<div className="p-10 text-center text-2xl font-bold text-red-600 bg-white rounded-xl shadow-lg">404 - Página No Encontrada</div>} /> */}
      </Routes>
    </>

    
  );
}

export default App
