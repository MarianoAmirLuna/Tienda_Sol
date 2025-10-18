import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/LoginORegister/FormularioLogin";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  // const { login } = useAuth(); para despues

  const handleLogin = (usuario, contrasena) => {
    setError(null);

    // --- AQUÍ IRÍA TU LÓGICA DE API (fetch/axios) para despues
    console.log("Datos recibidos:", { usuario, contrasena });

    if (usuario === "admin" && contrasena === "1234") {
      // SIMULACIÓN DE ÉXITO
      // const userData = await miApi.login(usuario, contrasena);
      // login(userData); // 1. Guardarías al usuario en el contexto
      alert("¡Login exitoso! (simulado)");
      navigate("/"); // 2. Redirigirías al inicio
    } else {
      // SIMULACIÓN DE ERROR
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)] px-6 py-12">
      {" "}
      {/* Este es un contenedor general */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-5xl w-full">
        {" "}
        {/*Separo todo en 2 columnas */}
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
