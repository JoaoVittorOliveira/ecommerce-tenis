import { Component, OnInit } from '@angular/core';
import { Cor } from '../../../models/cor.model';
import { CorService } from '../../../services/cor.service';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cor-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './cor-list.component.html',
  styleUrl: './cor-list.component.css'
})
export class CorListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'nome', 'codigoHex', 'acao'];
  cores: Cor[] = [];

  constructor(private corService: CorService) {

  }

  ngOnInit(): void {
    this.corService.findAll().subscribe(data => {
      this.cores = data;
    })
  }

  excluir(cor: Cor): void {
    if (confirm(`Confirma a EXCLUSÃO PERMANENTE da cor: ${cor.nome} - ${cor.codigoHex} ?`)) {
      this.corService.delete(cor).subscribe({
        next: () => {
          this.cores = this.cores.filter(e => e.id !== cor.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir a cor', JSON.stringify(err));
        }
      });
    }
  }
}
