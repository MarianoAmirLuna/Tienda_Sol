import { useState } from "react";
import { InputText } from "./Inputs/InputText";
import { TextArea } from "./Inputs/TextArea";
import { CheckBoxGroup } from "./Inputs/CheckBoxGroup";
import { FotosInput } from "./Inputs/FotosInput";
import { FormMessage } from "./Inputs/FormMessage";
import { DollarSign, Package, Tag } from "lucide-react";
import { toast } from 'react-toastify';
import LoadingIndicator from "../../LoadingIndicator";


const CATEGORIAS = ["PANTALON", "CAMPERA", "ZAPATOS", "REMERA"];

export default function CreateProduct({ sellerId }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categorias: [],
    precio: 0,
    stock: 0,
    fotos: [],
    activo: true,
    vendedor: sellerId,
  });
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "categorias") {
      setForm((prev) => ({
        ...prev,
        categorias: checked ? [...prev.categorias, value] : prev.categorias.filter((c) => c !== value),
      }));
    } else if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "precio" || name === "stock") {
      const numValue = value === "" ? 0 : parseInt(value);
      setForm((prev) => ({ ...prev, [name]: numValue >= 0 ? numValue : 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || form.precio <= 0) {
      setMensaje("El nombre y el precio deben ser válidos.");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      toast.success('¡Producto creado exitosamente!');
      setForm({ nombre: "", descripcion: "", categorias: [], precio: 0, stock: 0, fotos: [], activo: true, vendedor: sellerId });
    } catch (err) {
      console.error(err);
      toast.error('¡Error al crear el producto!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 p-6 sm:p-10 rounded-3xl border border-neutral-200 dark:border-neutral-700 shadow-sm">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-8 text-neutral-900 dark:text-white border-b border-neutral-200 dark:border-neutral-700 pb-4">Crear Nuevo Producto</h1>
      <FormMessage mensaje={mensaje} />

      <form onSubmit={handleSubmit} className="space-y-6">
        <InputText label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ej: Pantalón Jeans" required />
        <TextArea label="Descripción" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Detalles del producto..." />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText label={<><DollarSign className="inline w-4 h-4 mr-1 mb-1 text-green-500" /> Precio ($)</>} type="number" name="precio" value={form.precio} onChange={handleChange} placeholder="0" required />
          <InputText label={<><Package className="inline w-4 h-4 mr-1 mb-1 text-orange-500" /> Stock</>} type="number" name="stock" value={form.stock} onChange={handleChange} placeholder="0" required />
        </div>

        <CheckBoxGroup label={<><Tag className="inline w-4 h-4 mr-1 mb-1 text-indigo-500" /> Categorías</>} options={CATEGORIAS} selected={form.categorias} onChange={handleChange} />
        <FotosInput fotos={form.fotos} setFotos={(nuevasFotos) => setForm((prev) => ({ ...prev, fotos: nuevasFotos }))} />

        <button 
          type="submit" 
          disabled={loading} 
          className={`w-full py-3 text-white rounded-xl font-bold text-lg mt-6 transition ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-green-600 hover:bg-green-500" 
          }`}
        >
          {loading ? (
            <LoadingIndicator message="Creando..." color="#fff" size={10} />
          ) : (
            "Crear Producto"
          )}
        </button>
      </form>
    </div>
  );
}
