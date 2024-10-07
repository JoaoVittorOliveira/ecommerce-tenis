import { Component, OnInit } from '@angular/core';
import { Endereco } from '../../../models/endereco.model';
import { EnderecoService } from '../../../services/endereco.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-endereco-list',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatTableModule, RouterModule],
  templateUrl: './endereco-list.component.html',
  styleUrl: './endereco-list.component.css'
})
export class EnderecoListComponent implements OnInit {
  displayedColumns: string[] = ['id','cep','rua','complemento'];
  enderecos: Endereco[]=[];

  constructor(private enderecoService: EnderecoService){

  }
  ngOnInit(): void {
    this.enderecoService.findAll().subscribe(
      data => { this.enderecos = data }
    );
  }

  excluir(endereco: Endereco): void {
    if (confirm("Confirma a exclusão PERMANENTE de endereco?")) {
      this.enderecoService.delete(endereco).subscribe({
        next: () => {
          this.enderecos = this.enderecos.filter(e => e.id !== endereco.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir o endereco', err);
        }
      });
    }
  }
}
