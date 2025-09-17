import { EstadoPedido } from "../pedido/estadoPedido.js";

export class FactoryNotificacion {
    crearSegunEstadoPedido(estado) {
        return "hola mundo";
    }

    /*
    crearSegunPedido(pedido) {
        // ...
    }*/
}