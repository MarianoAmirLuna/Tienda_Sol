import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  const { usuario, setUsuario } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuario(null);
    navigate("/login");
  };

  return (
    <div className="absolute right-0 mt-3 w-64 bg-neutral-800 dark:bg-neutral-900 border border-neutral-700/50 dark:border-neutral-800/50 rounded-2xl shadow-xl overflow-hidden">
      {usuario ? (
        <>
          <div className="px-4 py-3 border-b border-neutral-700 dark:border-neutral-800">
            <p className="text-xs text-neutral-400">Sesión iniciada como</p>
            <p className="font-medium text-white truncate">{usuario?.nombre}</p>
          </div>

          <button
            onClick={() => navigate("/notificaciones")}
            className="w-full text-left px-4 py-2 flex items-center justify-between text-sm hover:bg-neutral-700/50 transition text-neutral-100"
          >
            Notificaciones
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-700/50 transition text-red-400"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <div className="flex flex-col p-3 space-y-2">
          <button
            onClick={() => navigate("/login")}
            className="w-full text-left px-4 py-2 text-sm text-neutral-100 hover:bg-neutral-700/50 rounded-lg transition"
          >
            Iniciar sesión
          </button>
{/*
          <button
            onClick={() => navigate("/register")}
            className="w-full text-left px-4 py-2 text-sm text-neutral-100 hover:bg-neutral-700/50 rounded-lg transition"
          >
            Registrarse
          </button>
*/}

        </div>
      )}
    </div>
  );
}
