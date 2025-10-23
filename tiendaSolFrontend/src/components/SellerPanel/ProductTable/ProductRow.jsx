import { Edit, Trash2 } from "lucide-react";

export default function ProductRow({ producto, onEdit, onDelete }) {
  return (
    <tr className="border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition">
      <td className="p-4 text-left font-medium text-neutral-800 dark:text-neutral-100">
        {producto.nombre}
      </td>
      <td className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        ${parseFloat(producto.precio).toFixed(2)}
      </td>
      <td className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        {producto.stock}
      </td>
      <td className="p-4 text-left text-neutral-600 dark:text-neutral-300 truncate max-w-xs">
        {producto.descripcion}
      </td>
      <td className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        {producto.unidadesVendidas}
      </td>
      <td className="p-4 flex justify-center gap-2">
        <button
          onClick={() => onEdit(producto)}
          className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-full"
        >
          <Edit size={20} />
        </button>
        <button
          onClick={() => onDelete(producto._id)}
          className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  );
}
