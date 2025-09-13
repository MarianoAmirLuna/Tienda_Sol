
export class PedidoService {
  constructor(pedidoRepo) {
    this.pedidoRepo = pedidoRepo;
  }

  crearPedido(pedido){
    return this.pedidoRepo.create(pedido);
  }

  listarPedidos() {
    return this.pedidoRepo.findAll();
  }

}