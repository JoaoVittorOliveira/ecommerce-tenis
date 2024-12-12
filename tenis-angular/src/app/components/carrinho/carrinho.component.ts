import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ItemCarrinho } from '../../models/item-carrinho.model';
import { CarrinhoService } from '../../services/carrinho.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule, MatToolbar,MatFormField,MatLabel,MatIcon,RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit{
  carrinhoItens: ItemCarrinho[] = [];
  constructor(
    private carrinhoService: CarrinhoService,
    private router: Router
  ) { }
  ngOnInit(): void {
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

}