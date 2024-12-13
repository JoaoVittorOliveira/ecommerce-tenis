import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MaterialService } from '../../../services/material.service';
import { Material } from '../../../models/material.model';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';

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
  pageSize = 10;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private materialService: MaterialService, private dialog: MatDialog,  private router: Router){

  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void{
    this.materialService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.materiais = data
      this.applyCurrentFilter();      
    });

    this.materialService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

  applyCurrentFilter(): void {
  
    const normalizedFilter = this.filterValue.trim().toLowerCase();

    const filtered = this.materiais.filter(
      (material) =>
        material.descricao.toString().toLowerCase().includes(normalizedFilter) ||
        material.categoria.toString().toLowerCase().includes(normalizedFilter)
    );

    this.filteredMateriais = filtered.slice(
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

  excluir(material: Material): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.materialService.delete(material).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/materiais']); // Navega de volta para a lista
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
