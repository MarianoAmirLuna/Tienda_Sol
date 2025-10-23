export function FormMessage({ mensaje }) {
  if (!mensaje) return null;
  return (
    <p
      className={`mb-6 p-3 rounded-xl font-medium ${
        mensaje.startsWith("✅")
          ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
          : "bg-red-100 text-red-700"
      }`}
    >
      {mensaje}
    </p>
  );
}