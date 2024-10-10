import { Component, OnInit } from '@angular/core';
import { Telefone } from '../../../models/telefone.model';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { TelefoneService } from '../../../services/telefone.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';

@Component({
  selector: 'app-telefone-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './telefone-list.component.html',
  styleUrl: './telefone-list.component.css'
})
export class TelefoneListComponent implements OnInit {
  displayedColumns: string[] = ['id','ddd','numero','acao'];
  telefones: Telefone[]=[];

  constructor(private telefoneService: TelefoneService, private dialog: MatDialog){

  }
  ngOnInit(): void {
    this.telefoneService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.telefones = data }
    );
  }

  excluir(telefone: Telefone): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.telefoneService.delete(telefone).subscribe({
          next: () => {
            this.telefones = this.telefones.filter(e => e.id !== telefone.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o telefone', err);
          }
        });
      }
    });
    }
  }