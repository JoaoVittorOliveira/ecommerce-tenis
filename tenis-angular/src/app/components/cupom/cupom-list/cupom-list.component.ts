import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { Cupom } from '../../../models/cupom.model';
import { CupomService } from '../../../services/cupom.service';
import { OnInit, Component } from '@angular/core';

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

  constructor(private cupomService: CupomService){

  }

  ngOnInit(): void {
    this.cupomService.findAll().subscribe(data => {
      this.cupons = data;
    })
  }

  excluir(cupom: Cupom): void {
    if (confirm(`Confirma a EXCLUSÃO PERMANENTE da cupom: ${cupom.codigo} ?`)) {
      this.cupomService.delete(cupom).subscribe({
        next: () => {
          this.cupons = this.cupons.filter(e => e.id !== cupom.id);
        },
        error: (err) => {
          console.error('Erro ao tentar excluir a cupom', JSON.stringify(err));
        }
      });
    }
  }

}
