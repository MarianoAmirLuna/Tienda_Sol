export default function ProductTableHeader({ total }) {
  return (
    <header className="flex items-center justify-between p-8 border-b border-neutral-200 dark:border-neutral-700">
      <h1 className="text-3xl font-extrabold text-neutral-900 dark:text-neutral-100">
        Gestión de Productos
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm">
        {total} productos totales
      </p>
    </header>
  );
}
