import { createContext, useState, useContext, useEffect } from "react";

export const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      try {
        setUsuario(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("usuario");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
  };

  const value = {
    usuario,
    setUsuario,
    login, 
    logout, 
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
