import { useState } from "react";
import { User } from "lucide-react";

export default function FormularioLogin({ onSubmit, error }) {
    const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    onSubmit(usuario, contrasena);
  };

  return (
      
    <div className="relative bg-neutral-900 p-10 pt-16 rounded-3xl shadow-2xl"> {/*tarjeta */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 p-6 rounded-full border-4 border-white dark:border-neutral-950">
        <User className="w-12 h-12 text-white" />
      </div>

      <h2 className="text-center text-3xl font-light text-white mb-8">
        ACCEDÉ A TU CUENTA
      </h2>

      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo Usuario */}
        <div>
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-neutral-300"
          >
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 bg-white text-neutral-900 rounded-lg shadow-sm"
          />
        </div>

        {/* Campo Contraseña */}
        <div>
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-neutral-300"
          >
            Contraseña
          </label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 bg-white text-neutral-900 rounded-lg shadow-sm"
          />
        </div>

        {/* 4. Mensaje de error (si existe) */}
        {error && (
          <div className="text-red-400 text-sm text-center font-medium pt-2">
            {error}
          </div>
        )}

        {/* Botón Entrar */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-full transition
                     hover:bg-indigo-600"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
