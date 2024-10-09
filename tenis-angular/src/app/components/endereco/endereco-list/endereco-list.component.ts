import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './endereco-list.component.html',
  styleUrls: ['./endereco-list.component.css']
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['id','cep','rua','complemento','acao'];
  enderecos: Endereco[] = [];

  constructor(private enderecoService: EnderecoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.enderecoService.findAll().subscribe(data => {
      this.enderecos = data;
    });
  }

  excluir(endereco: Endereco): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enderecoService.delete(endereco).subscribe({
          next: () => {
            this.enderecos = this.enderecos.filter(e => e.id !== endereco.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o endereco', err);
          }
        });
      }
    });
  }
}
