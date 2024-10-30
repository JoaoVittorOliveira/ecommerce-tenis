import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.model';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-material-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [NgIf,MatInputModule,MatFormField,MatPaginator, MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent implements OnInit {
  displayedColumns: string[] = ['id','descricao','categoria','acao'];
  materiais: Material[]=[];
  filteredMateriais: Material[] = [];


  totalRecords = 0;
  pageSize = 4;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private materialService: MaterialService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.materialService.findAll(this.page, this.pageSize).subscribe(
      data => { 
        console.log(data); 
        this.materiais = data;
        this.filteredMateriais = data;
        this.totalRecords = data.length;
       }
    );

    this.materialService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.filteredMateriais = this.materiais.filter(material =>
      material.descricao.toLowerCase().includes(this.filterValue) ||
      material.categoria.toLowerCase().includes(this.filterValue)
    );
    this.totalRecords = this.filteredMateriais.length;  // Atualiza o número total de registros
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }


  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(material: Material): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.delete(material).subscribe({
          next: () => {
            this.materiais = this.materiais.filter(e => e.id !== material.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o material', err);
          }
        });
      }
    });
    }
}
