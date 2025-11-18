import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import FormularioLogin from "../components/Login/FormularioLogin";
import { toast } from "react-toastify";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Cambia setUsuario por login

  const handleLogin = async (email, password) => {
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_INICIAL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error en el login");
      }

      if (data.token && data.user) {
        // ✅ Usa la función login del contexto que guarda TODO
        login(data.user, data.token);

        toast.success("¡Bienvenido de nuevo!");
        navigate("/");
      } else {
        setError("Datos de autenticación incompletos.");
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-12">
      <FormularioLogin onSubmit={handleLogin} error={error} loading={loading} />
    </div>
  );
}
