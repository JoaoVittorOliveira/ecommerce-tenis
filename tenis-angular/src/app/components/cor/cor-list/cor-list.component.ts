import { Component, OnInit } from '@angular/core';
import { Cor } from '../../../models/cor.model';
import { CorService } from '../../../services/cor.service';
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
  selector: 'app-cor-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl }
  ],
  imports: [MatPaginator,NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './cor-list.component.html',
  styleUrl: './cor-list.component.css'
})
export class CorListComponent implements OnInit{
  
  displayedColumns: string[] = ['id', 'nome', 'codigoHex', 'acao'];
  cores: Cor[] = [];

  totalRecords = 0;
  pageSize = 4;
  page = 0;
  constructor(private corService: CorService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.corService.findAll(this.page, this.pageSize).subscribe(data => {
      this.cores = data;
    });

    this.corService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(cor: Cor): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.corService.delete(cor).subscribe({
          next: () => {
            this.cores = this.cores.filter(e => e.id !== cor.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o cor', err);
          }
        });
      }
    });
  }
}
