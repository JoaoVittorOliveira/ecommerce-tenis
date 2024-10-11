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

@Component({
  selector: 'app-marca-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './marca-list.component.html',
  styleUrl: './marca-list.component.css'
})
export class MarcaListComponent implements OnInit {
  displayedColumns: string[] = ['id','nome','logo','acao'];
  marcas: Marca[]=[];

  constructor(private marcaService: MarcaService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.marcaService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.marcas = data }
    );
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
