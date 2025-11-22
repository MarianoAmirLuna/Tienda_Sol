import CarruselAutomatico from "../components/Home/Carrousel";
import Top10Productos from "../components/Home/Top10Productos";

function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-20 px-4">
        <img
          src="./logoTiendaSol.png"
          alt="Logo Tienda Sol"
          className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 object-contain rounded-full p-4 bg-black"
        />
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-neutral-900 dark:text-white text-center md:text-left">
          Bienvenidos a <span className="text-indigo-500">Tienda Sol</span>
        </h1>
      </div>

      <div>
        <CarruselAutomatico intervalo={5000} />
      </div>

      <div className="mt-24 px-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          Top productos mas vendidos
        </h2>
        <Top10Productos/>
      </div>
    </>
  );
}

export default Home;
