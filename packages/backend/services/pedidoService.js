import { EstadoPedido } from "../models/entities/pedido/estadoPedido.js"

export class PedidoService {
  constructor(pedidoRepo, productoRepo) {
    this.pedidoRepo = pedidoRepo;
    this.productoRepo = productoRepo;
  }

  crearPedido(pedido) {
    
    if(!this.hayStockTodosProductos(pedido)){ //TODO:revisar los errores cuando no hay stock
      return 
    }

    this.actualizarStockProductos(pedido);

    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.getPedidos();
  }

  hayStockTodosProductos(pedido){
    return pedido.getItems().every((item) =>
        this.productoRepo.hayStockProducto(item.producto, item.cantidad)
      );
  }

  actualizarStockProductos(pedido){
    pedido.getItems().forEach( item => this.productoRepo.actualizarStock(item.producto,item.cantidad));
  }

  obtenerPedido(idPedido){
    const pedido = this.pedidoRepo.findById(idPedido);
    return pedido;
  }

  cancelarPedido(req, res) {
    
    const pedido = obtenerPedidoRepo(req);

    if (!this.puedeCancelarPedido(pedido)) {
      return res.status(404).json({
        error: `Pedido con id: ${idResult.data} no puede ser cancelado. ya que fue enviado`,
      });
    }

    this.pedidoService.cancelarPedido(pedido);

    return res.status(200).json({ mensaje: "Pedido cancelado con éxito" });
  }

  cancelarPedido(pedido){

    if(!this.puedeCancelarPedido(pedido)) {
      return false
    }

    pedido.cambiarEstado(EstadoPedido.CANCELADO);
  }

  puedeEnviarPedido(pedido){
    const idPrimerVendedor = pedido.getItems()?.[0]?.getProducto()?.getVendedor(); //el ? sino lo encuentra tira null en vez de error

    return pedido.getItems().every(itemPedido => itemPedido.getProducto().getVendedor() == idPrimerVendedor);
  }

  enviarPedido(pedido){
    pedido.cambiarEstado(estadoPedido.ENVIADO);
  }

}