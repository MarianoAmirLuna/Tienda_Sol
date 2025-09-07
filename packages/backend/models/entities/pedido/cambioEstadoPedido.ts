import { EstadoPedido } from "./estadoPedido";
import { Pedido } from "./pedido";
import { Usuario } from "../usuario/usuario";


export class CambioEstadoPedido{
    private fecha: Date;
    private estado: EstadoPedido;
    private pedido: Pedido;
    private usuario: Usuario;
    private motivo: string;

    constructor(fecha: Date, estado: EstadoPedido, pedido: Pedido, usuario: Usuario, motivo: string){
        this.fecha = fecha;
        this.estado = estado;
        this.pedido = pedido;
        this.usuario = usuario;
        this.motivo = motivo;
    }
}