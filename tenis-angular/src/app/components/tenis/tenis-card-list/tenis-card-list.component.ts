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
import { MatDialog } from '@angular/material/dialog';
import { DetalhesTenisComponent } from '../detalhes-tenis/detalhes-tenis.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Categoria } from '../../../models/categoria.model';
import { CategoriaService } from '../../../services/categoria.service';
import { CarrinhoService } from '../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
type Card = {
  idTenis: number;
  titulo: string;
  nome: string
  precoVenda: number
  imageUrl: string
}
@Component({
  selector: 'app-tenis-card-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, NgFor, 
    MatCardActions, MatCardContent, MatCardTitle, MatCardFooter, 
    MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, 
    MatPaginator, RouterModule],
  templateUrl: './tenis-card-list.component.html',
  styleUrl: './tenis-card-list.component.css'
})
export class TenisCardListComponent implements OnInit {

  tenis: Tenis[] = [];

  categorias: Categoria[] = [];
  
  cards = signal<Card[]>([]);
  
  filterValue = '';
  filteredTenis: Tenis[] = [];
  showSearch = false;

  // terminar
  totalRecords = 0;
  pageSize = 4;
  page = 0;

  constructor(
    private dialog: MatDialog, 
    private tenisService: TenisService, 
    private categoriaService: CategoriaService, 
    private carrinhoService: CarrinhoService,
  private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.carregarTenis();
    this.carregarCategorias();
  }

  carregarCategorias(){
    this.categoriaService.findAll().subscribe((data)=>{
      console.log(this.categorias = data);
    })
  }

  categoriaSelecionada: number | null = null; // Armazena a categoria selecionada

  filtrarPorCategoria(categoria: Categoria): void {
    this.categoriaSelecionada = categoria.id;
    this.filteredTenis = this.tenis.filter(tenis => tenis.categoria.id === categoria.id);
    this.carregarCards();
  }
  
  limparCategorias(): void {
    this.categoriaSelecionada = null;
    this.filteredTenis = [...this.tenis];
    this.carregarCards();
  }
  carregarTenis() {
    // buscando os tenis
    this.tenisService.findAll().subscribe({
      next: (data) => {
        console.log(this.tenis = data);
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
        idTenis: tenis.id,
        titulo: tenis.nome,
        nome: tenis.nome,
        precoVenda: tenis.precoVenda,
        imageUrl: this.tenisService.getUrlImage(tenis.nomeImagem),
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
  }
  
  // VER MAIS
  openDetalhes(card: Card) {
    const tenis = this.tenis.find(t => t.nome === card.nome);
    this.dialog.open(DetalhesTenisComponent, {
      width: '90%',
      height: '90%',
      data: tenis ,
      minWidth: '800px',
    });
  }

  adicionarAoCarrinho(card: Card) {
    this.showSnackbarTopPosition('Produto adicionado ao carrinho');
    this.carrinhoService.adicionar({
      id: card.idTenis,
      nome: card.titulo,
      preco: card.precoVenda,
      quantidade: 1,
      imageUrl: card.imageUrl
    })
  }

  showSnackbarTopPosition(content: any) {
    this.snackBar.open(content, 'fechar', {
      duration: 3000,
      verticalPosition: "top",
      horizontalPosition: "center"
    });
  }

}