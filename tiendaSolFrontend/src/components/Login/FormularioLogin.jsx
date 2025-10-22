import { useState } from "react";
import { User } from "lucide-react";

export default function FormularioLogin({ onSubmit, error }) {

  const [usuario, setUsuario] = useState("");
  //const [contrasena, setContrasena] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(usuario); //, contrasena); // enviás solo el usuario
  };

  return (
    <div
      className="relative bg-neutral-100 dark:bg-neutral-900 p-10 pt-16 rounded-3xl shadow-2xl 
                 transition-colors duration-300 max-w-md mx-auto"
    >
      {/* Icono superior */}
      <div
        className="absolute -top-12 left-1/2 -translate-x-1/2 
                   bg-indigo-500 dark:bg-indigo-400 
                   p-6 rounded-full border-4 
                   border-white dark:border-neutral-900 shadow-lg"
      >
        <User className="w-12 h-12 text-white dark:text-neutral-900" />
      </div>

      <h2 className="text-center text-3xl font-light text-neutral-900 dark:text-white mb-8">
        ACCEDÉ A TU CUENTA
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Usuario */}
        <div>
          <label
            htmlFor="usuario"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Usuario
          </label>
          <input
            id="usuario"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 
                       bg-white dark:bg-neutral-800 
                       text-neutral-900 dark:text-white 
                       rounded-lg shadow-sm border border-neutral-300 dark:border-neutral-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition-all duration-200"
          />
        </div>

{/* Contraseña 
        <div>
          <label
            htmlFor="contrasena"
            className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Contraseña
          </label>
          <input
            id="contrasena"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="mt-1 block w-full px-4 py-3 
                       bg-white dark:bg-neutral-800 
                       text-neutral-900 dark:text-white 
                       rounded-lg shadow-sm border border-neutral-300 dark:border-neutral-700 
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 
                       transition-all duration-200"
          />
        </div>
*/}
        {/* Mensaje de error */}
        {error && (
          <div className="text-red-500 dark:text-red-400 text-sm text-center font-medium pt-2">
            {error}
          </div>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 
                     dark:bg-indigo-400 dark:hover:bg-indigo-500 
                     text-white dark:text-neutral-900 
                     font-bold py-3 px-4 rounded-full transition-colors duration-300"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
