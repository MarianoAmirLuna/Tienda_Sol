import { Producto } from "../producto/producto.js";

export class ItemPedido {
    constructor(productoID, cantidad, precioUnitario) {
        this.productoID = productoID;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    getProductoID(){
        return this.productoID;
    }

    getCantidad(){
        return this.cantidad;
    }

}