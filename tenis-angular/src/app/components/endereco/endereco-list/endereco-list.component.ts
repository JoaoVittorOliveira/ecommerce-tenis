import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { DeleteDialog } from '../../delete-dialog/delete-dialog.component';
import { DeleteDialogError } from '../../delete-dialog-error/delete-dialog-error.component';


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

  constructor(private enderecoService: EnderecoService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.enderecoService.findAll().subscribe(data => {
      this.enderecos = data;
    });
  }

  excluir(endereco: Endereco): void {
    const dialogRef = this.dialog.open(DeleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.enderecoService.delete(endereco).subscribe({
          next: () => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/admin/enderecos']); // Navega de volta para a lista
            });          },
            error: (err) => {
              console.error('Erro ao tentar excluir o telefone', err);
              this.erroExcluir();
            }
          });
        }
      });
    }
  
    erroExcluir():void{
      const dialogError = this.dialog.open(DeleteDialogError, {
        data: { message: 'Erro ao tentar excluir o telefone. Por favor, tente novamente.' },
      });
      
      dialogError.afterClosed().subscribe(result => {
        // Aqui você pode lidar com o fechamento do diálogo, se necessário.
      });
    }}
