import { Component, OnInit } from '@angular/core';
import { Tamanho } from '../../../models/tamanho.model';
import { TamanhoService } from '../../../services/tamanho.service';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tamanho-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './tamanho-list.component.html',
  styleUrl: './tamanho-list.component.css'
})
export class TamanhoListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'numeracao', 'tamanhoEmCm', 'pais', 'acao'];
  tamanhos: Tamanho[] = [];

  constructor(private tamanhoService: TamanhoService) {

  }

  ngOnInit(): void {
    this.tamanhoService.findAll().subscribe(data => {
      this.tamanhos = data;
    })
  }

  excluir(tamanho: Tamanho): void {
    if (confirm(`Confirma a EXCLUSÃO PERMANENTE da tamanho: ${tamanho.numeracao} - ${tamanho.tamanhoEmCm} - ${tamanho.pais} ?`)) {
      this.tamanhoService.delete(tamanho).subscribe({
        next: () => {
          this.tamanhos = this.tamanhos.filter(e => e.id !== tamanho.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir a tamanho', JSON.stringify(err));
        }
      });
    }
  }
}
