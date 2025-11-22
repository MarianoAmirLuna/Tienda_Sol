import ProductTableHeader from "./ProductTableHeader";
import ProductRow from "./ProductRow";
import ProductEditRow from "./ProductEditRow";
import { useProductos } from "./useProductos";
import LoadingIndicator from "../../LoadingIndicator";

export default function ProductTable({ sellerId }) {
  const {
    productos,
    loading,
    editingId,
    formData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave,
    handleDelete,
  } = useProductos(sellerId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingIndicator 
          message="Cargando producto..." 
          size={15} 
          color="#4f46e5"
        />
      </div>
    );
  }

  if (productos.length === 0)
    return (
      <div className="text-center p-8 bg-white dark:bg-neutral-800 border-neutral-700 rounded-3xl -2xl border">
        <h2 className="text-3xl font-bold mb-2">Gestión de Productos</h2>
        <p className="text-neutral-500">No se encontraron productos.</p>
      </div>
    );

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-3xl -2xl border border-neutral-200 dark:border-neutral-700 overflow-hidden">
      <ProductTableHeader total={productos.length} />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm sm:text-base">
          <thead className="bg-neutral-200/50 dark:bg-neutral-700/60 text-neutral-700 dark:text-neutral-200 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-5 text-left">Nombre</th>
              <th className="p-5 text-center">Precio</th>
              <th className="p-5 text-center">Stock</th>
              <th className="p-5 text-left">Descripción</th>
              <th className="p-5 text-center">Unidades Vendidas</th>
              <th className="p-5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) =>
              editingId === producto._id ? (
                <ProductEditRow
                  key={producto._id}
                  producto={producto}
                  formData={formData}
                  onChange={handleChange}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              ) : (
                <ProductRow
                  key={producto._id}
                  producto={producto}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
