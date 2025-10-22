import { Link } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Moon, Sun, User } from "lucide-react";
import logo from "/logoTiendaSol.png";
import { useCart } from "../context/CartContext.jsx";
import UserPanel from "./UserPanel.jsx";

export default function Navbar({ darkMode, setDarkMode }) {
  const [userOpen, setUserOpen] = useState(false);
  const { carrito } = useCart();

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <nav
      className="w-full z-50 
                 bg-neutral-900/80
                 border-b border-neutral-800/60 shadow-lg 
                 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center space-x-3 group">
          <img
            src={logo}
            alt="Logo Tienda Sol"
            className="h-12 w-auto group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-white text-2xl font-light tracking-widest group-hover:text-indigo-400 transition-colors">
            Tienda Sol
          </span>
        </Link>

        {/* LINKS */}
        <div className="hidden md:flex items-center space-x-10 text-lg">
          <Link
            to="/"
            className="relative font-light text-neutral-100 hover:text-indigo-400 transition duration-300 
                       after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-400 
                       after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Inicio
          </Link>
          <Link
            to="/productos"
            className="relative font-light text-neutral-100 hover:text-indigo-400 transition duration-300 
                       after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-indigo-400 
                       after:bottom-[-4px] after:left-0 hover:after:w-full after:transition-all after:duration-300"
          >
            Productos
          </Link>
        </div>

        {/* ICONOS */}
        <div className="flex items-center space-x-4 relative">
          {/* Dark Mode */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full hover:bg-neutral-800/70 transition"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-neutral-100" />
            )}
          </button>

          {/* Carrito */}
          <Link
            to="/cart"
            className="relative p-3 rounded-full hover:bg-neutral-800/70 transition"
          >
            <ShoppingCart className="w-6 h-6 text-white" />
            {cantidadTotal > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs px-2 py-[2px] rounded-full shadow-md">
                {cantidadTotal}
              </span>
            )}
          </Link>

          {/* Usuario */}
          <div className="relative">
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="p-3 rounded-full hover:bg-neutral-800/70 transition"
            >
              <User className="w-6 h-6 text-white" />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-2">
                <UserPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
