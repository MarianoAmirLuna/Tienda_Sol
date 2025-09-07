import {Producto} from "../producto/producto"

export class ItemPedido{
    private producto: Producto;
    private cantidad: number;
    private precioUnitario: number

    constructor(producto: Producto, cantidad:number, precioUnitario: number){
        this.producto = producto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    subtotal(): number{
        return 0;
    }
}