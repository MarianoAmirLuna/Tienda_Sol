import { EstadoPedido } from "./estadoPedido.js";
import { Pedido } from "./pedido.js";
import { Usuario } from "../usuario/usuario.js";


export class CambioEstadoPedido {
    constructor(fecha, estado, pedido, usuario, motivo) {
        this.fecha = fecha;
        this.estado = estado;
        this.pedido = pedido;
        this.usuario = usuario;
        this.motivo = motivo;
    }
}