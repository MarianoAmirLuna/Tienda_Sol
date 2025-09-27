import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { Moneda } from "../moneda.js";
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { CambioEstadoPedido } from "./cambioEstadoPedido.js";
import { tr } from "zod/locales";


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

    cambiarEstado(nuevoEstado) {
        this.historialEstados.push(this.estado);
        if (nuevoEstado === EstadoPedido.ENVIADO && ![EstadoPedido.PENDIENTE, EstadoPedido.CONFIRMADO, EstadoPedido.EN_PREPARACION].includes(this.estado)) {
            throw new Error(`No se puede cambiar al estado ${nuevoEstado} desde el estado ${this.estado}`); // TODO hacer una clase de error personalizada
        }

        if(nuevoEstado === EstadoPedido.CANCELADO && ![EstadoPedido.PENDIENTE, EstadoPedido.CONFIRMADO, EstadoPedido.EN_PREPARACION].includes(this.estado)){
            throw new Error(`No se puede cambiar al estado ${nuevoEstado} desde el estado ${this.estado}`); // TODO hacer una clase de error personalizada
        }
        this.estado = nuevoEstado;
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
