import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  standalone: true,
  imports: [NgFor,CommonModule],
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  carrinhoItens: any[] = [];
  usuario: any = {};
  opcoesEntrega = [
    { descricao: 'Retirar no local', valor: 0, prazo: 31 },
    { descricao: 'Frete Grátis', valor: 0, prazo: 40 },
    { descricao: 'Jadlog', valor: 18.23, prazo: 36 },
    { descricao: 'PAC', valor: 27.50, prazo: 37 },
    { descricao: 'SEDEX', valor: 56.52, prazo: 32 }
  ];
  entregaSelecionada = this.opcoesEntrega[0];
  pagamentoSelecionado = '';

  constructor(
    private carrinhoService: CarrinhoService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    // Carregar itens do carrinho
    this.carrinhoItens = this.carrinhoService.obter();

    // Carregar dados do cliente
    this.clienteService.getMyAccount().subscribe(cliente => {
      this.usuario = cliente;
      console.log(this.usuario);

    });
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  finalizarCompra(): void {
    const pedido = {
      itens: this.carrinhoItens,
      cliente: this.usuario,
      entrega: this.entregaSelecionada,
      pagamento: this.pagamentoSelecionado
    };
    console.log('Pedido:', pedido);
    alert('Compra finalizada com sucesso!');
  }
}
