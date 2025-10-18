// NotificationPage.jsx
import { useState, useEffect } from "react";
//import { useAuth } from "../context/AuthContext";

export default function NotificationPage() {
  //const { usuario } = useAuth();

  const usuario = {
    nombre: "Gianlucca Bolocco",
    id: 1
  };

  const [notificaciones, setNotificaciones] = useState([
    { id: 1, mensaje: "Tu pedido #123 ha sido enviado", leida: false },
    { id: 2, mensaje: "Nuevo descuento disponible", leida: false },
    { id: 3, mensaje: "Recordatorio: renová tu suscripción", leida: true },
  ]);

  const marcarComoLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      )
    );
  };

  const noLeidas = notificaciones.filter((n) => !n.leida);
  const leidas = notificaciones.filter((n) => n.leida);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">
          Notificaciones de {usuario?.nombre || "Usuario"}
        </h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">No leídas</h2>
          {noLeidas.length === 0 && <p className="text-neutral-500">No hay notificaciones nuevas.</p>}
          <ul className="space-y-3">
            {noLeidas.map((n) => (
              <li
                key={n.id}
                className="p-4 bg-blue-50 dark:bg-blue-700 rounded-xl flex justify-between items-center transition-colors duration-300"
              >
                <span>{n.mensaje}</span>
                <button
                  onClick={() => marcarComoLeida(n.id)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm transition"
                >
                  Marcar como leída
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Leídas</h2>
          {leidas.length === 0 && <p className="text-neutral-500">No hay notificaciones leídas.</p>}
          <ul className="space-y-3">
            {leidas.map((n) => (
              <li
                key={n.id}
                className="p-4 bg-neutral-200 dark:bg-neutral-700 rounded-xl flex justify-between items-center opacity-70 transition-opacity duration-300"
              >
                <span>{n.mensaje}</span>
                <span className="text-sm text-neutral-500">Leída</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
