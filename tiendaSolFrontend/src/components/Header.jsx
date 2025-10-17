function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">Mi Tienda</h1>
        <nav className="space-x-4">
          <a href="/" className="hover:underline">Inicio</a>
          <a href="/productos" className="hover:underline">Productos</a>
          <a href="/carrito" className="hover:underline">Carrito</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
