import CarruselAutomatico from "../components/Carrousel";
import ProductListPage from "./ProductListPage";


function Home() {


  return (
    <>
      <div className="text-center text-2xl py-10">Bienvenidos a Tienda Sol</div>
      <CarruselAutomatico intervalo={5000} />
      <ProductListPage sellerId={null} />
    </>
  );
}

export default Home;