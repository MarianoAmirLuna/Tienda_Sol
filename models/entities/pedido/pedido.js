import { Usuario } from "../usuario/usuario.js"; 
import { EstadoPedido } from "./estadoPedido.js";
import { Moneda } from "../moneda.js";
import { ItemPedido } from "./itemPedido.js";
import { DireccionEntrega } from "./direccionEntrega.js";
import { tr } from "zod/locales";
import { StatusTransitionError } from "../../../middleware/appError.js";


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
