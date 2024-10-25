import { Component, OnInit } from '@angular/core';
import { Tamanho } from '../../../models/tamanho.model';
import { TamanhoService } from '../../../services/tamanho.service';

import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';

@Component({
  selector: 'app-tamanho-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [MatPaginator, NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './tamanho-list.component.html',
  styleUrl: './tamanho-list.component.css'
})
export class TamanhoListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'numeracao', 'tamanhoEmCm', 'pais', 'acao'];
  tamanhos: Tamanho[] = [];
  totalRecords = 0;
  pageSize = 4;
  page = 0;

  constructor(private tamanhoService: TamanhoService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.tamanhoService.findAll(this.page, this.pageSize).subscribe(data => {
      this.tamanhos = data;
    });
    this.tamanhoService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }
  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(tamanho: Tamanho): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.beforeClosed()

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tamanhoService.delete(tamanho).subscribe({
          next: () => {
            this.tamanhos = this.tamanhos.filter(e => e.id !== tamanho.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o tamanho', err);
          }
        });
      }
    });
  }
}