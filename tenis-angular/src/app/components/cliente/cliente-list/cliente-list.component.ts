import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-cliente-list',
  standalone: true,
  imports: [NgIf,
            CommonModule,
            FormsModule,
            MatInputModule,
            MatFormField,
            MatToolbarModule,
            MatIconModule,
            MatIcon,
            MatButtonModule,
            MatTableModule,
            RouterModule,
            MatCheckboxModule,
            MatSelectModule],
  templateUrl: './cliente-list.component.html',
  styleUrl: './cliente-list.component.css'
})
export class ClienteListComponent {

  displayedColumns: string[] = ['id','nome','cpf', 'dataNascimento', 'telefone', 'cep', 'username', 'acao'];
  clienteList: Cliente[]=[];

  totalRecords = 0;
  pageSize = 5;
  page = 0;
  showSearch = false;
  filterValue = '';
  filteredCliente: Cliente[] = [];

  constructor(private clienteService: ClienteService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.clienteService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.clienteList = data;
        this.filteredCliente = data;
        this.totalRecords = data.length;
      }
    );
    console.log(this.clienteList);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredCliente = this.clienteList.filter(cliente =>
      cliente.nome.toLowerCase().includes(filterValue) ||
      cliente.cpf.includes(filterValue)
    );
    this.totalRecords = this.filteredCliente.length;
  }

  excluir(cliente: Cliente): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clienteService.delete(cliente).subscribe({
          next: () => {
            this.clienteList = this.clienteList.filter(e => e.id !== cliente.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o cliente', err);
          }
        });
      }
    });
  }

}
