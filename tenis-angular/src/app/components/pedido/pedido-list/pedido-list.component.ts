import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../../services/pedido.service';
import { Pedido } from '../../../models/pedido.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';  // Para o botão de excluir, se for usado
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedido-list',
  templateUrl: './pedido-list.component.html',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, CommonModule],
  styleUrls: ['./pedido-list.component.css']
})
export class PedidoListComponent implements OnInit {

  pedidos: Pedido[] = [];
  displayedColumns: string[] = ['idCliente', 'valorTotal', 'itens'];  // Removi 'data', pois não existe no modelo

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.loadPedidos();  // Carrega os pedidos quando o componente é inicializado
    console.log(this.pedidos);
  }

  // Método para carregar pedidos
  loadPedidos(): void {
    this.pedidoService.findAll().subscribe(pedidos => {
      this.pedidos = pedidos;
    });
    console.log(this.pedidos);
  }
}
