import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ShoppingCart, Moon, Sun, User } from "lucide-react";
import logo from "/logoTiendaSol.png";
import { useCart } from '../context/CartContext.jsx';


export default function Navbar({ darkMode, setDarkMode }) {

  const [userOpen, setUserOpen] = useState(false);

  const { carrito } = useCart();
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const user = {
    name: "Gianlucca Bolocco",
    id: 1
  };

  return (
    <nav className="w-full z-50 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200/40 dark:border-neutral-800/40 font-[Outfit,sans-serif]">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        <a href="/">
          <img href="/" src={logo} alt="Logo Tienda Sol" className="h-16 w-auto" />
        </a>

        <div className="hidden md:flex items-center space-x-8 text-base">
          <a href="/" className="relative font-medium text-white hover:text-neutral-400 transition" >
            Inicio
          </a>

          <a href="/productos" className="relative font-medium text-white hover:text-neutral-400 transition" >
            Productos
          </a>

        </div>

        <div className="flex items-center space-x-4">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full hover:bg-neutral-200/20 dark:hover:bg-neutral-800/70 transition"
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-neutral-100" />
            )}
          </button>

          <Link to="/cart" className="relative p-3 rounded-full hover:bg-neutral-800/70 transition">
            <ShoppingCart className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 bg-neutral-400 text-neutral-900 text-xs px-2 rounded-full">
              {cantidadTotal}
            </span>
          </Link>

          <div>
            <button
              onClick={() => setUserOpen(!userOpen)}
              className="p-3 rounded-full hover:bg-neutral-800/70 transition"
            >
              <User className="w-6 h-6 text-white" />
            </button>

            {userOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-neutral-800 dark:bg-neutral-900 border border-neutral-700/50 dark:border-neutral-800/50 rounded-2xl shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-neutral-700 dark:border-neutral-800">
                  <p className="text-xs text-neutral-400">Sesión iniciada como</p>
                  <p className="font-medium text-white truncate">{user.name}</p>
                </div>

                <button className="w-full text-left px-4 py-2 flex items-center justify-between text-sm hover:bg-neutral-700/50 transition">
                  <a href='/notificaciones' className="text-neutral-100">Notificaciones</a>
                </button>

                <button className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700/50 transition text-red-400">
                  Cerrar sesión
                </button>

              </div>
            )}
          </div>

        </div>

      </div>

    </nav>
  );
}
