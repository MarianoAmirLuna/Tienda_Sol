import ProductList from "../components/ProductList";

function Home() {
  const exampleProducts = [
    {
      id: 1,
      name: "Zapatillas Urban Classic",
      price: 34999,
      image:
        "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    },
    {
      id: 2,
      name: "Reloj Minimal Pro",
      price: 12999,
      image:
        "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    },
    {
      id: 3,
      name: "Mochila Urbana",
      price: 8999,
      image:
        "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    },
    {
      id: 4,
      name: "Auriculares Wireless",
      price: 4999,
      image:
        "https://ferreira.vtexassets.com/arquivos/ids/424314-800-auto?v=638388548002630000&width=800&height=auto&aspect=true",
    },
  ];

  return (
    <>
      <div className="text-center text-2xl py-10">Bienvenido a Tienda Sol</div>
      <ProductList products={exampleProducts} />
    </>
  );
}

export default Home;
