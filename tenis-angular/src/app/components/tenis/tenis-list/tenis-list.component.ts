import { Component } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { TenisService } from '../../../services/tenis.service';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tenis-list',
  standalone: true,
  imports: [NgIf,MatInputModule,MatFormField,MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './tenis-list.component.html',
  styleUrl: './tenis-list.component.css'
})
export class TenisListComponent {

  displayedColumns: string[] = ['id','nome','quantidade','peso', 'precoCompra', 'precoVenda', 'marca', 'material', 'cor', 'categoria', 'tamanho','acao'];
  tenisList: Tenis[]=[];
  filteredTenis: Tenis[] = [];

  totalRecords = 0;
  pageSize = 5;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private tenisService: TenisService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.tenisService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.tenisList = data;
        this.filteredTenis = data;
        this.totalRecords = data.length;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.filteredTenis = this.tenisList.filter(cor =>
      cor.nome.toLowerCase().includes(this.filterValue) ||
      cor.quantidade.toString().includes(this.filterValue) ||
      cor.peso.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoCompra.toString().toLowerCase().includes(this.filterValue) ||
      cor.precoVenda.toString().toLowerCase().includes(this.filterValue)

    );
    this.totalRecords = this.filteredTenis.length;  // Atualiza o número total de registros
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  excluir(tenis: Tenis): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tenisService.delete(tenis).subscribe({
          next: () => {
            this.tenisList = this.tenisList.filter(e => e.id !== tenis.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o tenis', err);
          }
        });
      }
    });
  }
}
