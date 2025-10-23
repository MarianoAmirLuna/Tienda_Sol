import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';

export default function ProductTable({ sellerId }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', precio: '', stock: '', descripcion: '', unidadesVendidas: 0 });

  useEffect(() => {
    fetchProductos();
  }, [sellerId]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos?vendedorID=${sellerId}`);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producto) => {
    setEditingId(producto._id);
    setFormData({ 
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      descripcion: producto.descripcion || '',
      unidadesVendidas: producto.unidadesVendidas || 0
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ nombre: '', precio: '', stock: '', descripcion: '', unidadesVendidas: 0 });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'precio') newValue = value === '' ? '' : parseFloat(value);
    else if (name === 'stock' || name === 'unidadesVendidas') newValue = value === '' ? '' : parseInt(value, 10);

    setFormData({ ...formData, [name]: newValue });
  };

  const handleSave = async (id) => {
    if (!formData.nombre || isNaN(formData.precio) || isNaN(formData.stock) || isNaN(formData.unidadesVendidas)) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      fetchProductos();
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ ¿Estás seguro de que quieres eliminar este producto? Esta acción es irreversible.')) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${id}`, { method: 'DELETE' });
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-12 text-lg font-medium text-indigo-500 dark:text-indigo-400">Cargando productos...</div>;

  if (productos.length === 0) return (
    <div className="p-8 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-200 dark:border-neutral-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100 text-center">Productos del Vendedor</h2>
      <div className="text-center py-10 text-gray-500 dark:text-gray-400">No se encontraron productos.</div>
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50 text-center border-b pb-2 border-indigo-100 dark:border-neutral-700">Gestión de Productos</h2>

      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-indigo-100 dark:bg-neutral-700 text-center">
        <tr>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-50">Nombre</th>
            <th className="px-4 py-2 text-center text-gray-900 dark:text-gray-50">Precio</th>
            <th className="px-4 py-2 text-center text-gray-900 dark:text-gray-50">Stock</th>
            <th className="px-4 py-2 text-left text-gray-900 dark:text-gray-50">Descripción</th>
            <th className="px-4 py-2 text-center text-gray-900 dark:text-gray-50">Unidades Vendidas</th>
            <th className="px-4 py-2 text-center text-gray-900 dark:text-gray-50">Acciones</th>
        </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 text-center">
        {productos.map((producto) => (
            <tr key={producto._id} className="bg-white dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700">
            {editingId === producto._id ? (
                <>
                <td className="px-4 py-2 text-left">
                    <input
                    className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-gray-50"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    />
                </td>
                <td className="px-4 py-2">
                    <input
                    className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-gray-50 text-center"
                    name="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.precio}
                    onChange={handleChange}
                    />
                </td>
                <td className="px-4 py-2">
                    <input
                    className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-gray-50 text-center"
                    name="stock"
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={handleChange}
                    />
                </td>
                <td className="px-4 py-2 text-left">
                    <input
                    className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-gray-50"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    />
                </td>
                <td className="px-4 py-2">
                    <input
                    className="w-full px-2 py-1 border border-gray-300 dark:border-neutral-600 rounded-md dark:bg-neutral-700 dark:text-gray-50 text-center"
                    name="unidadesVendidas"
                    type="number"
                    min="0"
                    value={formData.unidadesVendidas}
                    onChange={handleChange}
                    />
                </td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                    <button onClick={() => handleSave(producto._id)} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full"><Check size={18} /></button>
                    <button onClick={handleCancel} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full"><X size={18} /></button>
                </td>
                </>
            ) : (
                <>
                <td className="px-4 py-2 text-left">{producto.nombre}</td>
                <td className="px-4 py-2">{parseFloat(producto.precio).toFixed(2)}</td>
                <td className="px-4 py-2">{producto.stock}</td>
                <td className="px-4 py-2 text-left truncate max-w-xs">{producto.descripcion}</td>
                <td className="px-4 py-2">{producto.unidadesVendidas}</td>
                <td className="px-4 py-2 flex justify-center space-x-2">
                    <button onClick={() => handleEdit(producto)} className="p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 rounded-full"><Edit size={20} /></button>
                    <button onClick={() => handleDelete(producto._id)} className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-full"><Trash2 size={20} /></button>
                </td>
                </>
            )}
            </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
