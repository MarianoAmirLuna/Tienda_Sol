import { Producto } from "../producto/producto.js";

export class ItemPedido {
    constructor(producto, cantidad, precioUnitario) {
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    getProducto(){
        return this.producto;
    }

    subtotal() {
        return 0;
    }
}