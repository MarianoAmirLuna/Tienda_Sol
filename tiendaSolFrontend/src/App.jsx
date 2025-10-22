import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import NotificationPage from "./pages/NotificationPage";
import CreateProductPage from "./pages/CreateProductPage";
import Login from "./pages/Login";
import SellerPage from "./pages/SellerPage";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    console.log("Dark mode:", darkMode ? "ON" : "OFF");
  }, [darkMode]);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:idProducto" element={<ProductDetail />} />
        <Route path="/:sellerId/productos" element={<SellerPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notificaciones" element={<NotificationPage />} />
        <Route path="/nuevo-producto" element={<CreateProductPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
