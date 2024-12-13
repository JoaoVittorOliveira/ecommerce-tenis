import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';

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
  pageSize = 10;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private categoriaService: CategoriaService, 
              private dialog: MatDialog, private router: Router) {
      
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.categoriaService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.categorias = data
      this.applyCurrentFilter();      
    });

    this.categoriaService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

  applyCurrentFilter(): void {
  
    const normalizedFilter = this.filterValue.trim().toLowerCase();

    const filtered = this.categorias.filter(
      (categoria) =>
        categoria.nome.toString().toLowerCase().includes(normalizedFilter) ||
        categoria.genero.toString().toLowerCase().includes(normalizedFilter) ||
        categoria.faixaEtaria.toLowerCase().includes(normalizedFilter)
    );

    this.filteredCategorias = filtered.slice(
      this.page * this.pageSize,
      (this.page + 1) * this.pageSize
    );

    this.totalRecords = filtered.length;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.page = 0; 
    this.applyCurrentFilter();
  }
  
  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }
  

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;

    if (this.filterValue) {
      this.applyCurrentFilter(); // Reaplica o filtro para a nova página
    } else {
      this.loadData(); // Recarrega os dados sem filtro
    }
  }

   excluir(categoria: Categoria): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.delete(categoria).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/categorias']); // Navega de volta para a lista
            });
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o telefone', err);
            this.erroExcluir();
          }
        });
      }
    });
  }

  erroExcluir():void{
    const dialogError = this.dialog.open(DeleteDialogError, {
      data: { message: 'Erro ao tentar excluir o telefone. Por favor, tente novamente.' },
    });
    
    dialogError.afterClosed().subscribe(result => {
      // Aqui você pode lidar com o fechamento do diálogo, se necessário.
    });
  }
}
