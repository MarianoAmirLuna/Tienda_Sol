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
import AllProducts from "./pages/AllProducts";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./pages/Register";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    return stored === "true" ? true : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div className="bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 min-h-screen">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos" element={<AllProducts />} />
        <Route path="/productos/:idProducto" element={<ProductDetail />} />
        <Route path="/:sellerId/productos" element={<SellerProductPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notificaciones" element={<NotificationPage />} />
        <Route path="/nuevo-producto" element={<CreateProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/panel-vendedor" element={<SellerPanelPage />} />
        <Route path="/orders" element={<OrderPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>

      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
