import { Component, OnInit, signal } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { TenisService } from '../../../services/tenis.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
type Card = {
  titulo: string;
  nome: string
  precoVenda: number
  imageUrl: string
}
@Component({
  selector: 'app-tenis-card-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tenis-card-list.component.html',
  styleUrl: './tenis-card-list.component.css'
})
export class TenisCardListComponent implements OnInit {

  tenis: Tenis[] = [];
  
  cards = signal<Card[]>([]);
  
  filterValue = '';
  filteredTenis: Tenis[] = [];
  showSearch = false;

  constructor(private tenisService: TenisService) {
  }

  ngOnInit(): void {
    this.carregarTenis();
  }

  carregarTenis() {
    // buscando os tenis
    this.tenisService.findAll().subscribe({
      next: (data) => {
        this.tenis = data;
        this.filteredTenis = data;
        this.carregarCards();
      },
      error: (err) => {
        console.error("Erro ao carregar tênis:", err);
      }
    });
  }
  carregarCards() {
    const cards: Card[] = [];
    this.filteredTenis.forEach(tenis => {
      cards.push({
        titulo: tenis.nome,
        nome: tenis.nome,
        precoVenda: tenis.precoVenda,
        imageUrl: this.tenisService.getUrlImage(tenis.nomeImagem)
      })
    });
    this.cards.set(cards);
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filterValue = filterValue.trim().toLowerCase();

    this.filteredTenis = this.tenis.filter(tenis =>
      tenis.nome.toLowerCase().includes(this.filterValue) ||
      tenis.categoria.nome.toLowerCase().includes(this.filterValue) ||
      tenis.cor.nome.toLowerCase().includes(this.filterValue)  
    );

    this.carregarCards();
    //this.totalRecords = this.filteredTenis.length;  // Atualiza o número total de registros
  }
  
}