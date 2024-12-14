import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule, NgFor } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { ItemPedido } from '../../models/itempedido.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    { descricao: 'Frete GrÃ¡tis', valor: 0, prazo: 40 },
    { descricao: 'Jadlog', valor: 18.23, prazo: 36 },
    { descricao: 'PAC', valor: 27.50, prazo: 37 },
    { descricao: 'SEDEX', valor: 56.52, prazo: 32 }
  ];
  entregaSelecionada = this.opcoesEntrega[0];
  pagamentoSelecionado = '';
  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carrinhoService: CarrinhoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService
  ) {
    this.formGroup = this.formBuilder.group({
      idCliente: [null, Validators.required],
      itens: this.formBuilder.array([]) // FormArray para itens
    });
  }

  ngOnInit(): void {
    // Carregar itens do carrinho
    this.carrinhoItens = this.carrinhoService.obter();

    

    // Carregar dados do cliente
    this.clienteService.getMyAccount().subscribe(cliente => {
      this.usuario = cliente;
    });

    // Atualizar idCliente no formGroup
    this.formGroup.patchValue({ idCliente: this.usuario.id });

    // Popular o FormArray com os itens do carrinho
    this.carrinhoItens.forEach(item => {
      this.itensFormArray.push(
        this.formBuilder.group({
          idTenis: [item.id, Validators.required],
          quantidade: [item.quantidade, [Validators.required]]
        })
      );
    });

  }

  get itensFormArray(): FormArray {
    return this.formGroup.get('itens') as FormArray;
  }

  calcularTotal(): number {
    return this.carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  finalizarCompra(): void {

    this.formGroup.patchValue({ idCliente: this.usuario.id });

    if (this.formGroup.valid) {
      const pedido = this.formGroup.value; // Objeto gerado a partir do FormGroup

      this.pedidoService.insert(pedido).subscribe({
        next: () => {
          console.log('Pedido enviado:', pedido);
          alert('Compra finalizada com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao finalizar compra:', err);
        }
      });
    } else {
      this.formGroup.markAllAsTouched();
      alert('Preencha todos os campos corretamente antes de finalizar a compra.');
    }
  }
}