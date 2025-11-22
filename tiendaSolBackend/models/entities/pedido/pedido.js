import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { tr } from "zod/locales";
import { StatusTransitionError } from "../../../middleware/appError.js";


export class Pedido {
    constructor(compradorID, itemsPedido, direccionEntrega) {
        this.compradorID = compradorID;
        this.vendedorID = null;
        this.itemsPedido = itemsPedido;
        this.total = this.calcularTotal();
        this.direccionEntrega = direccionEntrega; //DireccionEntrega
        this.estado = EstadoPedido.PENDIENTE;
        this.fechaCreacion = new Date();
        this.historialEstados = []
    }

    cambiarEstado(nuevoEstado) {

        const transicionesPermitidas = {
            [EstadoPedido.PENDIENTE]: [EstadoPedido.CONFIRMADO, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
            [EstadoPedido.CONFIRMADO]: [EstadoPedido.EN_PREPARACION, EstadoPedido.CANCELADO, EstadoPedido.ENVIADO],
            [EstadoPedido.EN_PREPARACION]: [EstadoPedido.ENVIADO, EstadoPedido.CANCELADO],
            [EstadoPedido.ENVIADO]: [EstadoPedido.ENTREGADO],
            [EstadoPedido.ENTREGADO]: [],
            [EstadoPedido.CANCELADO]: []
        };

        this.historialEstados.push(this.estado);

        const permitidos = transicionesPermitidas[this.estado] || [];

        if (!permitidos.includes(nuevoEstado)) {
            throw new StatusTransitionError(`${this.estado} a ${nuevoEstado}`);
        }

        this.estado = nuevoEstado;
    }

    getItemsPedido(){
        return this.itemsPedido;
    }

    getEstado(){
        return this.estado;
    }

    getCompradorID(){
        return this.compradorID;
    }

    calcularTotal() {
        return this.itemsPedido.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);
    }
}
