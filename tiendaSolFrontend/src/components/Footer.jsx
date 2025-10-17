export default function Footer() {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-xl font-semibold">
          Tienda Sol
        </div>

        <div className="flex flex-wrap gap-6 text-sm">
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 ">Inicio</a>
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 ">Productos</a>
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 ">Contacto</a>
          <a href="/" className="hover:text-blue-600 dark:hover:text-blue-400 ">FAQ</a>
        </div>

        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          &copy; 2025 Tienda Sol. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
