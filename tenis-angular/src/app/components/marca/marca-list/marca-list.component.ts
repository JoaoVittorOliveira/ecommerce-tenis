import { Component, OnInit } from '@angular/core';
import { Marca } from '../../../models/marca.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MarcaService } from '../../../services/marca.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { NgIf } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';

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


  constructor(private marcaService: MarcaService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.marcaService.findAll(this.page, this.pageSize).subscribe(
      data => { 
        console.log(data); 
        this.marcas = data;
        this.filteredMarcas = data;
        this.totalRecords = data.length; 
      });

    this.marcaService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.filteredMarcas = this.marcas.filter(marca =>
      marca.nome.toLowerCase().includes(this.filterValue) 
    );
    this.totalRecords = this.filteredMarcas.length;  // Atualiza o número total de registros
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(marca: Marca): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.marcaService.delete(marca).subscribe({
          next: () => {
            this.marcas = this.marcas.filter(e => e.id !== marca.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o marca', err);
          }
        });
      }
    });
  }
}
