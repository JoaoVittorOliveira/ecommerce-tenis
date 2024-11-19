import { Component, OnInit } from '@angular/core';
import { Tamanho } from '../../../models/tamanho.model';
import { TamanhoService } from '../../../services/tamanho.service';

import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tamanho-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [
    NgIf,
    MatInputModule,
    MatFormField,
    MatPaginator,
    NgFor,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './tamanho-list.component.html',
  styleUrl: './tamanho-list.component.css'
})
export class TamanhoListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'numeracao', 'tamanhoEmCm', 'pais', 'acao'];
  tamanhos: Tamanho[] = []; // Lista completa obtida do serviço
  filteredTamanhos: Tamanho[] = []; // Lista filtrada para exibição
  totalRecords = 0;
  pageSize = 4;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private tamanhoService: TamanhoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.tamanhoService.findAll(this.page, this.pageSize).subscribe((data) => {
      this.tamanhos = data;
      this.applyCurrentFilter();
    });

    this.tamanhoService.count().subscribe((count) => {
      this.totalRecords = count;
    });
  }

  applyCurrentFilter(): void {
    
    const normalizedFilter = this.filterValue.trim().toLowerCase();

    const filtered = this.tamanhos.filter(
      (tamanho) =>
        tamanho.numeracao.toString().toLowerCase().includes(normalizedFilter) ||
        tamanho.tamanhoEmCm.toString().toLowerCase().includes(normalizedFilter) ||
        tamanho.pais.toLowerCase().includes(normalizedFilter)
    );

    this.filteredTamanhos = filtered.slice(
      this.page * this.pageSize,
      (this.page + 1) * this.pageSize
    );

    this.totalRecords = filtered.length;
  }

  applyFilter(event: Event): void {
    
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();
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

  excluir(tamanho: Tamanho): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tamanhoService.delete(tamanho).subscribe({
          next: () => {
            this.applyCurrentFilter(); // Reaplica o filtro após excluir
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o tamanho', err);
          }
        });
      }
    });
  }
}
