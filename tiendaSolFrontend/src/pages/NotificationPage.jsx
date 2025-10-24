import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function NotificationPage() {
  const { usuario } = useUser();
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    if (!usuario?._id) return;

    const obtenerNotificaciones = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL_INICIAL}/usuarios/${usuario._id}/notificaciones`
        );
        const data = await response.json();
        setNotificaciones(data);
      } catch (error) {
        console.error("Error al obtener notificaciones:", error);
      }
    };

    obtenerNotificaciones();
  }, [usuario?._id]);

  const marcarComoLeida = async (idNotificacion) => {
    if (!usuario?._id) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL_INICIAL}/usuarios/${usuario._id}/notificaciones/${idNotificacion}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ leida: true })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al marcar notificación como leída");
      }

      setNotificaciones((prev) =>
        prev.map((n) =>
          n._id === idNotificacion ? { ...n, leida: true, fechaLeida: new Date() } : n
        )
      );
    } catch (error) {
      console.error("Error al marcar como leída:", error);
    }
  };

  const noLeidas = notificaciones.filter((n) => !n.leida);
  const leidas = notificaciones.filter((n) => n.leida);

  const formatearFecha = (fecha) =>
    fecha
      ? new Date(fecha).toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "";


  if (!usuario) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white">
        <p className="mb-2">Logeate para ingresar a esta sección</p>
        <Link to="/login" className="text-indigo-500 hover:underline">
          Iniciar Sesión
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold mb-2 text-neutral-900 dark:text-white">
            Notificaciones de <span className="text-indigo-600 dark:text-indigo-400">{usuario.nombre}</span>
          </h1>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200">
            No leídas
          </h2>
          {noLeidas.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No hay notificaciones nuevas.
            </p>
          )}
          <ul className="space-y-4">
            {noLeidas.map((n) => (
              <li
                key={n._id}
                className="p-4 bg-indigo-50 dark:bg-indigo-800 rounded-xl flex justify-between items-start shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  <p className="text-gray-800 dark:text-gray-50">{n.mensaje}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-300 mt-1 block">
                    {formatearFecha(n.fechaAlta)}
                  </span>
                </div>
                <button
                  onClick={() => marcarComoLeida(n._id)}
                  className="ml-4 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm transition-colors duration-200"
                >
                  Marcar como leída
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-5 text-gray-800 dark:text-gray-200">
            Leídas
          </h2>
          {leidas.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">
              No hay notificaciones leídas.
            </p>
          )}
          <ul className="space-y-4">
            {leidas.map((n) => (
              <li
                key={n._id}
                className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-xl flex justify-between items-start shadow-sm opacity-80 transition-opacity duration-300"
              >
                <div>
                  <p className="text-gray-700 dark:text-gray-200">{n.mensaje}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                    {formatearFecha(n.fechaAlta)}
                  </span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">Leída</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
