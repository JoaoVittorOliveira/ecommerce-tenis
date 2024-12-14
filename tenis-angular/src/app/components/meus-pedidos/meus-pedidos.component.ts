import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';
import { CommonModule, NgIf } from '@angular/common';
import { ClienteService } from '../../services/cliente.service';
import { FormsModule } from '@angular/forms';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  standalone: true,
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.css'],
  imports:[NgIf,FormsModule,CommonModule,MatToolbar,MatIcon,RouterLink]
})
export class MeusPedidosComponent implements OnInit {
  pedidos: any[] = [];
  usuario: any = {};
      usuarioLogado: Usuario | null = null;
    private subscription = new Subscription();
  


  constructor(private pedidoService: PedidoService,
    private clienteService: ClienteService,
            private authService: AuthService,
            public carrinhoService: CarrinhoService
    
  ) {}

  ngOnInit(): void {
    this.carregarUsuarioLogado();

    this.clienteService.getMyAccount().subscribe({
      next: (cliente) => {
        this.usuario = cliente;
        this.findPedido(); // Chamar findPedido apenas após obter os dados do cliente
      },
      error: (err) => {
        console.error('Erro ao carregar dados do cliente:', err);
        alert('Erro ao carregar dados do cliente.');
      }
    });
  }
  carregarUsuarioLogado(): void {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  deslogar(): void {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
    window.location.reload();
  }



  findPedido(): void {
    this.pedidoService.findPedidoByClienteId(this.usuario.id).subscribe({
      next: (pedidos) => {
        if (Array.isArray(pedidos)) {
          this.pedidos = pedidos; // Atribui a lista de pedidos diretamente
        } else {
          this.pedidos = []; // Garante que pedidos fique vazio se o retorno não for um array
        }
        console.log('Pedidos carregados:', this.pedidos);
      },
      error: (err) => {
        console.error('Erro ao buscar pedidos:', err);
        alert('Erro ao carregar seus pedidos.');
      },
    });
  }
  

  

}
