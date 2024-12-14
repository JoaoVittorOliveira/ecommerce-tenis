import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from '../../models/item-carrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, MatToolbar,MatFormField,MatLabel,MatIcon,RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{
    usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();

  carrinhoItens: ItemCarrinho[] = [];
  constructor(
        private authService: AuthService,
    private carrinhoService: CarrinhoService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.carregarUsuarioLogado();
    this.carrinhoService.carrinho$.subscribe(itens => {
      this.carrinhoItens = itens;
    });
  }
  removerItem(item: ItemCarrinho){
    this.carrinhoService.removerItem(item);
  }
  calcularTotal(): number{
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade * item.preco, 0)
  }
  finalizarCompra(){
    //verificar se esta logado
  }
  alterarQuantidade(item: ItemCarrinho, delta: number) {
    const index = this.carrinhoItens.indexOf(item);
    if (index >= 0) {
      this.carrinhoItens[index].quantidade += delta;
      if (this.carrinhoItens[index].quantidade <= 0) {
        this.removerItem(item);
      }
    }
  }
  quantidadeTotalItens(): number {
    return this.carrinhoItens.reduce((total, item) => total + item.quantidade, 0);
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



}