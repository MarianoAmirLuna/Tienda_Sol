import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Cargar carrito del localStorage si existe, sino array vacío
  const [carrito, setCarrito] = useState(() => {
    const saved = localStorage.getItem("carrito");
    return saved ? JSON.parse(saved) : [];
  });

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existente = prev.find((p) => p.id === producto.id);
      if (existente) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + producto.cantidad }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad: producto.cantidad }];
      }
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((p) => (p.id === id ? { ...p, cantidad: nuevaCantidad } : p))
    );
  };

  const vaciarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
