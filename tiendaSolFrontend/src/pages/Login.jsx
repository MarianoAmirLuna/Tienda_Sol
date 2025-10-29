import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import FormularioLogin from "../components/Login/FormularioLogin";
import { toast } from "react-toastify";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext);

  const handleLogin = async (email, password) => {
    setError(null);
    setLoading(true);
    console.log("Datos recibidos:", { email, password });

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

      console.log("Respuesta del servidor:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);

        if (data.user) {
          setUsuario(data.user);
        } else {
          setUsuario({ email: email });
        }

        toast.success("🎉 ¡Bienvenido de nuevo!");
        navigate("/");
      } else {
        setError("No se recibió token de autenticación.");
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
