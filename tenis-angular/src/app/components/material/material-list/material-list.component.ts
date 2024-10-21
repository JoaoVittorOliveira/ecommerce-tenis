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

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.css'
})
export class MaterialListComponent implements OnInit {
  displayedColumns: string[] = ['id','descricao','categoria','acao'];
  materiais: Material[]=[];

  constructor(private materialService: MaterialService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.materialService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.materiais = data }
    );
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
