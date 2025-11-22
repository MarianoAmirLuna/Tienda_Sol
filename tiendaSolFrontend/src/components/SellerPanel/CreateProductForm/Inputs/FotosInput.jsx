import { X, Plus, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

export function FotosInput({ fotos = [], setFotos }) {
  const [fotoInput, setFotoInput] = useState("");

  const handleAdd = () => {
    const nuevaFoto = fotoInput.trim();
    if (nuevaFoto !== "") {
      setFotos([...fotos, nuevaFoto]); 
      setFotoInput("");
    }
  };

  const handleRemove = (url) => {
    setFotos(fotos.filter((f) => f !== url));
  };

  const inputClass =
    "flex-1 p-3 border rounded-xl bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border-neutral-300 dark:border-neutral-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";
  const labelClass = "block mb-2 font-semibold text-neutral-800 dark:text-neutral-200";

  return (
    <div>
      <label className={labelClass}>
        <ImageIcon className="inline w-4 h-4 mr-1 mb-1 text-indigo-500" /> Fotos (URLs)
      </label>

      <div className="flex gap-3 mb-3 flex-wrap sm:flex-nowrap">
        <input
          type="url"
          value={fotoInput}
          onChange={(e) => setFotoInput(e.target.value)}
          placeholder="http://ejemplo.com/imagen.jpg"
          className={inputClass}
        />
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 active:scale-95 transition-transform"
        >
          <Plus className="w-5 h-5 mr-1" /> Agregar
        </button>
      </div>

      <div className="flex gap-3 flex-wrap">
        {(Array.isArray(fotos) ? fotos : []).map((f, idx) => (
          <div
            key={idx}
            className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 group"
          >
            <img
              src={f}
              alt={`Foto ${idx + 1}`}
              className="w-full h-full object-cover transition duration-300 group-hover:opacity-70"
            />
            <button
              type="button"
              onClick={() => handleRemove(f)}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 text-white transition-opacity"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
