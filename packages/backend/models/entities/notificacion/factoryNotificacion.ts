import { EstadoPedido } from "../pedido/estadoPedido";

export class FactoryNotificacion{
    crearSegunEstadoPedido(estado: EstadoPedido): String{
        return "hola mundo";
    }

    /*
    crearSegunPedido(pedido: Pedido):Notification{
        
    }*/
}