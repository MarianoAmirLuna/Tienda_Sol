import jsPDF from "jspdf";


const formatearFecha = (fecha) =>
new Date(fecha).toLocaleString("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
});

export default function generarFactura(pedido) {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Factura de Pedido", 20, 20);

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`ID Pedido: ${pedido._id}`, 20, 35);
    doc.text(`Fecha: ${formatearFecha(pedido.fechaCreacion)}`, 20, 42);
    doc.text(`Comprador ID: ${pedido.compradorID}`, 20, 49);
    doc.text(`Estado: ${pedido.estado}`, 20, 56);

    doc.setFont("helvetica", "bold");
    doc.text("Dirección de Entrega:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(
      `${pedido.direccionEntrega.calle} ${pedido.direccionEntrega.altura}, ${pedido.direccionEntrega.ciudad}, ${pedido.direccionEntrega.provincia}, CP ${pedido.direccionEntrega.codigoPostal}`,
      20,
      77,
      { maxWidth: 170 }
    );
    doc.text(`${pedido.direccionEntrega.pais}`, 20, 84);

    doc.setFont("helvetica", "bold");
    doc.text("Productos:", 20, 100);
    doc.setFont("helvetica", "normal");

    let y = 108;
    pedido.itemsPedido.forEach((item, index) => {
      const subtotal = item.precioUnitario * item.cantidad;
      doc.text(
        `${index + 1}. ${item.productoID} - Cant: ${item.cantidad} - $${item.precioUnitario} c/u - Subtotal: $${subtotal}`,
        20,
        y
      );
      y += 7;
    });

    doc.setFont("helvetica", "bold");
    doc.text(`Total: $${pedido.total}`, 20, y + 10);

    doc.save(`Factura_${pedido._id}.pdf`);
  };