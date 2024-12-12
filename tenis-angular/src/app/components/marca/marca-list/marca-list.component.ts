import { Component, OnInit } from '@angular/core';
import { Marca } from '../../../models/marca.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { NgIf } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';

@Component({
  selector: 'app-marca-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [NgIf,MatInputModule,MatFormField,MatPaginator, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent implements OnInit {
  displayedColumns: string[] = ['id','nome','logo','acao'];
  marcas: Marca[]=[];
  filteredMarcas: Marca[] = [];


  totalRecords = 0;
  pageSize = 4;
  page = 0;
  showSearch = false;
  filterValue = '';


  constructor(private marcaService: MarcaService, private dialog: MatDialog, private router: Router){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.marcaService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.marcas = data
      this.applyCurrentFilter();      
    });

    this.marcaService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

  applyCurrentFilter(): void {
  
    const normalizedFilter = this.filterValue.trim().toLowerCase();

    const filtered = this.marcas.filter(
      (marca) =>
        marca.nome.toString().toLowerCase().includes(normalizedFilter)
    );

    this.filteredMarcas = filtered.slice(
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

  excluir(marca: Marca): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/marcas']); // Navega de volta para a lista
            });          },
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
