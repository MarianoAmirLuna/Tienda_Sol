import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { Moneda } from "../moneda.js";
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { CambioEstadoPedido } from "./cambioEstadoPedido.js";


export class Pedido {
    constructor(comprador, items, total, moneda, direccionEntrega) {
        this.id = 1;
        this.comprador = comprador;
        this.items = items;
        this.total = total;
        this.moneda = moneda;
        this.direccionEntrega = direccionEntrega;
        this.estado = EstadoPedido.PENDIENTE;
        this.fechaCreacion = new Date();
        this.historialEstados = []
    }

    cambiarEstado(estado) {
        this.historialEstados.push(this.estado);
        this.setEstado(estado);
    }

    setEstado(unEstado) {
        this.estado = unEstado;
    }

    setId(id){
        this.id = id
    }

    getItems(){
        return this.items;
    }

    getId(){
        return this.id;
    }

    getEstado(){
        return this.estado;
    }

    getComprador(){
        return this.comprador;
    }
}
