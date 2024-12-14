import { Component, OnInit } from '@angular/core';
import { Cor } from '../../../models/cor.model';
import { CorService } from '../../../services/cor.service';
import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';

@Component({
  selector: 'app-cor-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [NgIf,MatInputModule,MatFormField, MatLabel,MatPaginator,NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './cor-list.component.html',
  styleUrl: './cor-list.component.css'
})
export class CorListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'nome', 'codigoHex', 'acao'];
  cores: Cor[] = [];
  filteredCores: Cor[] = [];

  totalRecords = 0;
  pageSize = 10;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private corService: CorService, private dialog: MatDialog, private router: Router) {

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.corService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.cores = data
      this.applyCurrentFilter();      
    });

    this.corService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

  applyCurrentFilter(): void {
  
    const normalizedFilter = this.filterValue.trim().toLowerCase();

    const filtered = this.cores.filter(
      (categoria) =>
        categoria.nome.toString().toLowerCase().includes(normalizedFilter) ||
        categoria.codigoHex.toString().toLowerCase().includes(normalizedFilter)
    );

    this.filteredCores = filtered.slice(
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

  excluir(cor: Cor): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.corService.delete(cor).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/cores']); // Navega de volta para a lista
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
