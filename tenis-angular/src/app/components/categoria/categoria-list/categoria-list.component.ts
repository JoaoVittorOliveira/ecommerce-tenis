import { NgFor, NgIf } from '@angular/common';
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
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [NgIf,MatInputModule,MatFormField,MatPaginator,NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css'
})
export class CategoriaListComponent {

  displayedColumns: string[] = ['id', 'nome', 'descricao', 'genero', 'faixaEtaria', 'acao'];
  categorias: Categoria[] = [];
  filteredCategorias: Categoria[] = [];

  totalRecords = 0;
  pageSize = 4;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private categoriaService: CategoriaService, 
              private dialog: MatDialog) {
      
  }

  ngOnInit(): void {
    this.categoriaService.findAll(this.page, this.pageSize).subscribe(
      data => {
      this.categorias = data
      this.filteredCategorias = data;
      this.totalRecords = data.length;
    });
      
      
      this.categoriaService.count().subscribe(
        data => { this.totalRecords = data }
      );
    }

    applyFilter(event: Event): void {
      const filterValue = (event.target as HTMLInputElement).value;
      this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
      this.filteredCategorias = this.categorias.filter(categoria =>
        categoria.nome.toLowerCase().includes(this.filterValue) ||
        categoria.descricao.toLowerCase().includes(this.filterValue)||
        categoria.genero.toLowerCase().includes(this.filterValue) ||
        categoria.faixaEtaria.toLowerCase().includes(this.filterValue)||
        categoria.nome.toLowerCase().includes(this.filterValue)   
      );
      this.totalRecords = this.filteredCategorias.length;  // Atualiza o número total de registros
    }
  
    toggleSearch(): void {
      this.showSearch = !this.showSearch;
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
