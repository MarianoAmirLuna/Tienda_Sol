import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import FormularioLogin from "../components/Login/FormularioLogin";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUsuario } = useContext(UserContext); // 👈 acá lo obtenés del contexto

  const handleLogin = async (usuario) => {
    setError(null);
    console.log("Datos recibidos:", { usuario });

    try {
      const response = await fetch(
        `http://localhost:8000/usuarios/${usuario}`
      );

      if (!response.ok) {
        throw new Error("Error al obtener el usuario");
      }

      const data = await response.json();
      console.log("usuario del servidor:", data);

      if (data) {
        setUsuario(data); // 👈 guardás el usuario en contexto
        alert("¡Login exitoso!");
        navigate("/");
      } else {
        setError("Usuario o contraseña incorrectos.");
      }
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-5xl w-full">
        <FormularioLogin onSubmit={handleLogin} error={error} />
        <div className="hidden lg:block">
          <h1 className="text-6xl font-light uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
            Ingresa
          </h1>
        </div>
      </div>
    </div>
  );
}
