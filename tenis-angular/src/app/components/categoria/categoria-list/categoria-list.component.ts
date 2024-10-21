import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'genero', 'faixaEtaria', 'acao'];
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    })
  }

  excluir(categoria: Categoria): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.delete(categoria).subscribe({
          next: () => {
            this.categorias = this.categorias.filter(e => e.id !== categoria.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o categoria', err);
          }
        });
      }
    });
  }
}
