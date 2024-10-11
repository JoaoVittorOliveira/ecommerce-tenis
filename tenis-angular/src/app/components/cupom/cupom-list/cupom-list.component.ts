import { NgFor } from '@angular/common';
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

@Component({
  selector: 'app-cupom-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css'
})
export class CupomListComponent implements OnInit{

  displayedColumns: string[] = ['id', 'codigo', 'porcentagemDesconto', 'valorDesconto', 'acao'];
  cupons: Cupom[] = [];

  constructor(private cupomService: CupomService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.cupomService.findAll().subscribe(data => {
      this.cupons = data;
    })
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
