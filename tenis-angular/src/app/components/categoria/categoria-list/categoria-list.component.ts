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
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PaginationService } from '../../../services/paginator.service';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [MatPaginatorModule,NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'genero', 'faixaEtaria', 'acao'];
  categorias: Categoria[] = [];

  totalRecords = 0;
  pageSize = 4;
  page = 0;

  constructor(private categoriaService: CategoriaService, 
              private dialog: MatDialog,
              private paginationService: PaginationService) {
      
  }

  ngOnInit(): void {
    this.categoriaService.findAll(this.page, this.pageSize).subscribe(
      data => {
      this.categorias = data});
      
      this.categoriaService.count().subscribe(
        data => { this.totalRecords = data }
      );
    }

    paginar(event: PageEvent): void {
      this.page = event.pageIndex;
      this.pageSize = event.pageSize;
      this.ngOnInit();
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
