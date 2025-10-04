export class Notificacion {
    usuarioDestino;
    mensaje
    fechaAlta;
    leida
    fechaLeida
    constructor(usuarioDestino, mensaje) {
        this.usuarioDestino = usuarioDestino;
        this.mensaje = mensaje;
        this.fechaAlta = new Date();
        this.leida = false;
        this.fechaLeida = null;
    }

    setId(id) {
        this.id = id;
    }

    marcarComoLeida() {
        this.leida = true;
        this.fechaLeida = new Date();
    }
}

export class NotificacionPedido extends Notificacion {

    idPedido;
    idComprador;

    constructor(usuarioDestino, idPedido, idComprador) {

        const mensaje = `[-] Tiene un nuevo pedido con ID: ${idPedido} / [-] Comprador: ${idComprador}`;

        super(usuarioDestino, mensaje);
        this.idPedido = idPedido;
        this.idComprador = idComprador;
    }

}

export class NotificacionCancelacionPedido extends Notificacion {

    idPedido;
    idComprador;

    constructor(usuarioDestino, idPedido, idComprador) {

        const mensaje = `[-] Su pedido con ID: ${idPedido} ha sido cancelado por el comprador con ID: ${idComprador}`;

        super(usuarioDestino, mensaje);
        this.idPedido = idPedido;
        this.idComprador = idComprador;
    }
}

export class NotificacionEstadoPedido extends Notificacion {

    idPedido;
    nuevoEstado;
    estadoAnterior;

    constructor(usuarioDestino, idPedido, nuevoEstado, estadoAnterior) {

        const mensaje = `[-] El estado de su pedido con ID: ${idPedido} ha cambiado de ${estadoAnterior} a ${nuevoEstado}`;

        super(usuarioDestino, mensaje);
        this.idPedido = idPedido;
        this.nuevoEstado = nuevoEstado;
        this.estadoAnterior = estadoAnterior;
    }

}


// export class NotificacionEstadoPedido extends Notificacion {
    
// }