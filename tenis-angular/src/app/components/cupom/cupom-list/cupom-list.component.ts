import { DatePipe, NgIf, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cupom } from '../../../models/cupom.model';
import { CupomService } from '../../../services/cupom.service';
import { OnInit, Component } from '@angular/core';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from '../../../services/paginator.service';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cupom-list',
  standalone: true,
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    DatePipe
  ],
  imports: [NgIf,MatInputModule,MatFormField,MatPaginator,NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css'
})
export class CupomListComponent{

  displayedColumns: string[] = ['id', 'codigo', 'porcentagemDesconto', 'valorDesconto', 'dataVencimento', 'acao'];
  cupons: Cupom[] = [];
  filteredCupons: Cupom[] = [];


  totalRecords = 0;
  pageSize = 4;
  page = 0;
  showSearch = false;
  filterValue = '';

  constructor(private cupomService: CupomService,
     private dialog: MatDialog,
     private datePipe: DatePipe){

  }

  formatData(dataVencimento: string): string {
    const date = new Date(dataVencimento);
    date.setDate(date.getDate() + 1)
    return this.datePipe.transform(date, 'dd/MM/yyyy') || '';
  }

  ngOnInit(): void {
    this.cupomService.findAll(this.page, this.pageSize).subscribe(data => {
      this.cupons = data;
      this.filteredCupons = data;
      this.totalRecords = data.length;
    });

    this.cupomService.count().subscribe(
      data => { this.totalRecords = data }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    console.log("Valor do filtro:", this.filterValue);

    this.filteredCupons = this.cupons.filter(cupom =>
      cupom.codigo.toLowerCase().includes(this.filterValue)||
      cupom.porcentagemDesconto.toString().includes(filterValue) ||
      cupom.valorDesconto.toString().includes(filterValue)

    );
    console.log("Resultado do filtro:", this.filteredCupons);
    this.totalRecords = this.filteredCupons.length;  // Atualiza o número total de registros
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }

  excluir(cupom: Cupom): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cupomService.delete(cupom).subscribe({
          next: () => {
            this.cupons = this.cupons.filter(e => e.id !== cupom.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o cupom', err);
          }
        });
      }
    });
  }

}
