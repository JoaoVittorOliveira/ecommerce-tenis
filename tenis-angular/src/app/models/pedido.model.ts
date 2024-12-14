import { Cliente } from "./cliente.model";
import { ItemPedido } from "./itempedido.model";

export class Pedido {
    
    idCliente!: number;
    itens!: ItemPedido[]

}
