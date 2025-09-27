import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { Moneda } from "../moneda.js";
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { CambioEstadoPedido } from "./cambioEstadoPedido.js";


export class Pedido {
    constructor(compradorID, itemsPedido, moneda, direccionEntrega) {
        this.id = 1;
        this.compradorID = compradorID;
        this.itemsPedido = itemsPedido;
        this.total = this.calcularTotal();
        this.moneda = moneda;
        this.direccionEntrega = direccionEntrega; //DireccionEntrega
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

    getItemsPedido(){
        return this.itemsPedido;
    }

    getId(){
        return this.id;
    }

    getEstado(){
        return this.estado;
    }

    getCompradorID(){
        return this.compradorID;
    }

    calcularTotal() {
        return this.itemsPedido.reduce((acc, item) => acc + item.getPrecioUnitario() * item.getCantidad(), 0);
    }
}
