import { Check, X } from "lucide-react";

export default function ProductEditRow({
  formData,
  onChange,
  onSave,
  onCancel,
  producto,
}) {
  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
      <td className="p-4">
        <input
          className="w-full px-2 py-1 border rounded-md dark:bg-neutral-700 dark:text-neutral-100"
          name="nombre"
          value={formData.nombre}
          onChange={onChange}
        />
      </td>
      <td className="p-4 text-center">
        <input
          className="w-full px-2 py-1 border rounded-md dark:bg-neutral-700 dark:text-neutral-100 text-center"
          name="precio"
          type="number"
          min="0"
          step="0.01"
          value={formData.precio}
          onChange={onChange}
        />
      </td>
      <td className="p-4 text-center">
        <input
          className="w-full px-2 py-1 border rounded-md dark:bg-neutral-700 dark:text-neutral-100 text-center"
          name="stock"
          type="number"
          min="0"
          value={formData.stock}
          onChange={onChange}
        />
      </td>
      <td className="p-4">
        <input
          className="w-full px-2 py-1 border rounded-md dark:bg-neutral-700 dark:text-neutral-100"
          name="descripcion"
          value={formData.descripcion}
          onChange={onChange}
        />
      </td>
      <td className="p-4 text-center text-neutral-400 dark:text-neutral-500">
        {producto.unidadesVendidas}
      </td>
      <td className="p-4 flex justify-center gap-2">
        <button
          onClick={() => onSave(producto._id)}
          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"
        >
          <Check size={18} />
        </button>
        <button
          onClick={onCancel}
          className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
        >
          <X size={18} />
        </button>
      </td>
    </tr>
  );
}
