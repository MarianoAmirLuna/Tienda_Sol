import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import NotificationPage from "./pages/NotificationPage";
import CreateProduct from "./components/SellerPanel/CreateProductForm/CreateProduct";
import Login from "./pages/Login";
import SellerProductPage from "./pages/SellerProductPage";
import SellerPanelPage from "./pages/SellerPanelPage";
import OrderPage from "./pages/OrderPage";

function App() {
  
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true" ? true : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
    console.log("Dark mode:", darkMode ? "ON" : "OFF");
  }, [darkMode]);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:idProducto" element={<ProductDetail />} />
        <Route path="/:sellerId/productos" element={<SellerProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notificaciones" element={<NotificationPage />} />
        <Route path="/nuevo-producto" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel-vendedor" element={<SellerPanelPage />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
