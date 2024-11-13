import { Component, OnInit, signal } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { TenisService } from '../../../services/tenis.service';
import { MatCardActions, MatCardContent, MatCardFooter, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { NgFor } from '@angular/common';
type Card = {
  titulo: string;
  nome: string
  precoVenda: number
  imageUrl: string
}
@Component({
  selector: 'app-tenis-card-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter],
  templateUrl: './tenis-card-list.component.html',
  styleUrl: './tenis-card-list.component.css'
})
export class TenisCardListComponent implements OnInit {
  tenis: Tenis[] = [];
  cards = signal<Card[]>([]);
  constructor(private tenisService: TenisService) {
  }
  ngOnInit(): void {
    this.carregarTenis();
  }
  carregarTenis() {
    // buscando as teniss
    this.tenisService.findAll().subscribe (data => {
      this.tenis = data;
      this.carregarCards();
    })
  }
  carregarCards() {
    const cards: Card[] = [];
    this.tenis.forEach(tenis => {
      cards.push({
        titulo: tenis.nome,
        nome: tenis.nome,
        precoVenda: tenis.precoVenda,
        imageUrl: this.tenisService.getUrlImage(tenis.nomeImagem)
      })
    });
    this.cards.set(cards);
  }
  
}