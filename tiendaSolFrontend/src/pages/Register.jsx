import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../components/LoadingIndicator";


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    fetch(`${import.meta.env.VITE_API_URL_INICIAL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) =>
        res.json().then((data) => {
          if (!res.ok) throw new Error(data.message || "Error en el registro");
          return data;
        })
      )
      .then((data) => {
        setSuccess("Usuario registrado exitosamente!");
        if (data.token) localStorage.setItem("token", data.token);
        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          password: "",
          telefono: "",
        });

        navigate("/login");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          Crear tu cuenta
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Completá tus datos para empezar
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-neutral-800 border border border-neutral-200 dark:border-neutral-700 shadow-md rounded-xl px-8 py-10 transition-colors">
          {error && (
            <div className="mb-4 text-sm bg-red-50 dark:bg-red-900/40 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded-lg">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 text-sm bg-green-50 dark:bg-green-900/40 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
              <input
                name="apellido"
                type="text"
                placeholder="Apellido"
                required
                value={formData.apellido}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            <input
              name="telefono"
              type="tel"
              placeholder="Teléfono"
              required
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-2.5 px-4 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-60 transition-all"
            >
              {loading ? (
                <LoadingIndicator
                  size={15} 
                  color="#4f46e5" 
                  message="Registrando..."
                />
              ) : (
                "Registrarse"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            ¿Ya tenés una cuenta?{" "}
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
            >
              Iniciá sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
