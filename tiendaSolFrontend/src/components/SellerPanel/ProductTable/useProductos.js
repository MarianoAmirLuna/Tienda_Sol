import { useState, useEffect } from "react";

export function useProductos(sellerId) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    stock: "",
    descripcion: "",
  });

  useEffect(() => {
    if (sellerId) fetchProductos();
  }, [sellerId]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL_INICIAL}/productos?sellerId=${sellerId}`
      );
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
      descripcion: producto.descripcion || "",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ nombre: "", precio: "", stock: "", descripcion: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === "precio") newValue = value === "" ? "" : parseFloat(value);
    else if (name === "stock") newValue = value === "" ? "" : parseInt(value, 10);
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSave = async (id) => {
    if (!formData.nombre || isNaN(formData.precio) || isNaN(formData.stock)) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      fetchProductos();
      handleCancel();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await fetch(`${import.meta.env.VITE_API_URL_INICIAL}/productos/${id}`, {
        method: "DELETE",
      });
      fetchProductos();
    } catch (err) {
      console.error(err);
    }
  };

  return {
    productos,
    loading,
    editingId,
    formData,
    handleEdit,
    handleCancel,
    handleChange,
    handleSave,
    handleDelete,
  };
}
