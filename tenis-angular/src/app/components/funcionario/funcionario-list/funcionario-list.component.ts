import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Funcionario } from '../../../models/funcionario.model';
import { FuncionarioService } from '../../../services/funcionario.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog-component';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [NgIf,
            CommonModule,
            FormsModule,
            MatInputModule,
            MatFormField,
            MatToolbarModule,
            MatIconModule,
            MatButtonModule,
            MatTableModule,
            RouterModule,
            MatCheckboxModule,
            MatSelectModule],
  templateUrl: './funcionario-list.component.html',
  styleUrl: './funcionario-list.component.css'
})
export class FuncionarioListComponent {

  displayedColumns: string[] = ['id','nome','cpf','dataAdmissao', 'dataNascimento', 'codigoAdmissao', 'username', 'acao'];
  funcionarioList: Funcionario[]=[];

  totalRecords = 0;
  pageSize = 5;
  page = 0;
  showSearch = false;
  filterValue = '';
  filteredFuncionario: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService, private dialog: MatDialog){

  }

  ngOnInit(): void {
    this.funcionarioService.findAll().subscribe(
      data => { 
        console.log(data); 
        this.funcionarioList = data;
        this.filteredFuncionario = data;
        this.totalRecords = data.length;
      }
    );
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();  // Remove espaços e converte para lowercase
    this.filteredFuncionario = this.filteredFuncionario.filter(funcionario =>
      funcionario.nome.toLowerCase().includes(this.filterValue) ||
      funcionario.cpf.includes(this.filterValue) ||
      funcionario.codigoAdmissao.includes(this.filterValue)
    );
    this.totalRecords = this.filteredFuncionario.length;  // Atualiza o número total de registros
  }

  excluir(funcionario: Funcionario): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.funcionarioService.delete(funcionario).subscribe({
          next: () => {
            this.funcionarioList = this.funcionarioList.filter(e => e.id !== funcionario.id);
          },
          error: (err) => {
            console.error('Erro ao tentar excluir o funcionario', err);
          }
        });
      }
    });
  }

}
