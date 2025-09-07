import { Usuario } from "../usuario/usuario"; 
import { EstadoPedido } from "./estadoPedido";
import { Moneda } from "../moneda";
import { ItemPedido } from  "./itemPedido";
import { DireccionEntrega } from "./direccionEntrega";
import { CambioEstadoPedido } from "./cambioEstadoPedido";


export class Pedido {
    private id: string;
    private comprador: Usuario;
    private items: ItemPedido[];
    private total: number;
    private moneda: Moneda;
    private direccionEntrega: DireccionEntrega;
    private estado: EstadoPedido;
    private fechaCreacion: Date;
    private historialEstados: CambioEstadoPedido[];

    constructor(id: string, comprador: Usuario, items: ItemPedido[], 
                total: number, moneda: Moneda, direccionEntrega: DireccionEntrega,
                estado: EstadoPedido, fechaCreacion: Date, historialEstados: CambioEstadoPedido) {
        this.id = id;
        this.comprador = comprador;
        this.items = items;
        this.total = total;
        this.moneda = moneda;
        this.direccionEntrega = direccionEntrega;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.historialEstados = [];
    }
}
