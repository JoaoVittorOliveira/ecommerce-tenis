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

@Component({
  selector: 'app-tenis-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './tenis-list.component.html',
  styleUrl: './tenis-list.component.css'
})
export class TenisListComponent {

  displayedColumns: string[] = ['id','nome','quantidade','peso', 'precoCompra', 'precoVenda', 'marca', 'material', 'cor', 'categoria', 'tamanho','acao'];
  tenisList: Tenis[]=[];

  constructor(private tenisService: TenisService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.tenisService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.tenisList = data 
      }
    );
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
