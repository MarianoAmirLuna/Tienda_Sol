import { useState } from "react";

export default function CreateProductPage() {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categorias: [],
    precio: 0,
    stock: 0,
    fotos: [],
    activo: true,
  });

  const [fotoInput, setFotoInput] = useState(""); // input temporal para agregar fotos
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "precio" || name === "stock") {
      setForm((prev) => ({ ...prev, [name]: parseInt(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddFoto = () => {
    if (fotoInput.trim() !== "") {
      setForm((prev) => ({ ...prev, fotos: [...prev.fotos, fotoInput] }));
      setFotoInput("");
    }
  };

  const handleAddCategoria = (categoria) => {
    if (!form.categorias.includes(categoria)) {
      setForm((prev) => ({ ...prev, categorias: [...prev.categorias, categoria] }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoProducto = {
      ...form,
      unidadesVendidas: 0,
    };
    console.log("Producto creado:", nuevoProducto);
    setMensaje("Producto creado exitosamente!");
    // aquí luego podrías hacer fetch a tu backend
    setForm({
      nombre: "",
      descripcion: "",
      categorias: [],
      precio: 0,
      stock: 0,
      fotos: [],
      activo: true,
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-white px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Crear nuevo producto</h1>

        {mensaje && <p className="mb-4 text-green-500">{mensaje}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Nombre del producto"
            className="w-full p-3 border rounded-lg"
          />

          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full p-3 border rounded-lg"
            rows={4}
          />

          {/* Categorías */}
          <div>
            <label className="block mb-1 font-semibold">Categorías</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {form.categorias.map((c, idx) => (
                <span key={idx} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                  {c}
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Agregar categoría"
                id="categoriaInput"
                className="flex-1 p-2 border rounded-lg"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddCategoria(e.target.value);
                    e.target.value = "";
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              placeholder="Precio"
              className="p-3 border rounded-lg"
            />
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="p-3 border rounded-lg"
            />
          </div>

          {/* Fotos */}
          <div>
            <label className="block mb-1 font-semibold">Fotos (URLs)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={fotoInput}
                onChange={(e) => setFotoInput(e.target.value)}
                placeholder="URL de la foto"
                className="flex-1 p-2 border rounded-lg"
              />
              <button type="button" onClick={handleAddFoto} className="px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                Agregar
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {form.fotos.map((f, idx) => (
                <img key={idx} src={f} alt={`Foto ${idx}`} className="w-20 h-20 object-cover rounded-lg" />
              ))}
            </div>
          </div>

          {/* Activo */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="activo"
              checked={form.activo}
              onChange={handleChange}
            />
            <label>Activo</label>
          </div>

          <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-500 transition">
            Crear Producto
          </button>
        </form>
      </div>
    </div>
  );
}
