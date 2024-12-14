import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';
import { ClienteService } from '../../services/cliente.service';
import { CommonModule, NgFor } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { ItemPedido } from '../../models/itempedido.model';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Usuario } from '../../models/usuario.model';

@Component({
  standalone: true,
  imports: [NgFor,CommonModule,MatToolbar,MatIcon,RouterLink],
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
      usuarioLogado: Usuario | null = null;
    private subscription = new Subscription();
  
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
            private authService: AuthService,
    
    private formBuilder: FormBuilder,
    public carrinhoService: CarrinhoService,
    private clienteService: ClienteService,
    private pedidoService: PedidoService,
    private router: Router // Importa o Router

  ) {
    this.formGroup = this.formBuilder.group({
      idCliente: [null, Validators.required],
      itens: this.formBuilder.array([]) // FormArray para itens
    });
  }

  ngOnInit(): void {
    // Carregar itens do carrinho
    this.carrinhoItens = this.carrinhoService.obter();
    this.carregarUsuarioLogado();

    

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
  carregarUsuarioLogado(): void {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  deslogar(): void {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
  }
  calcularTotal(): number {
    return this.carrinhoItens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  }

  finalizarCompra(): void {
    this.formGroup.patchValue({ idCliente: this.usuario.id });
  
    if (this.formGroup.valid) {
      const pedido = this.formGroup.value;
  
      this.pedidoService.insert(pedido).subscribe({
        next: () => {
          console.log('Pedido enviado:', pedido);
          alert('Compra finalizada com sucesso!');
          this.router.navigate(['/meus-pedidos']); // Redireciona para a página de "Meus Pedidos"
        },
        error: (err) => {
          console.error('Erro ao finalizar compra:', err);
          alert('Erro ao finalizar compra.');
        },
      });
    } else {
      this.formGroup.markAllAsTouched();
      alert('Preencha todos os campos corretamente antes de finalizar a compra.');
    }
  
  }
}
