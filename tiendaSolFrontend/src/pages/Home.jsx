import CarruselAutomatico from "../components/Carrousel";
import ProductListPage from "./ProductListPage";


function Home() {


  return (
    <>

      <CarruselAutomatico intervalo={5000} />
      <ProductListPage />
    </>
  );
}

export default Home;