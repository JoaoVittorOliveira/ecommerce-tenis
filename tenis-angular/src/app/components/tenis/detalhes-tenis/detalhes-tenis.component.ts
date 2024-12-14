import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TenisService } from '../../../services/tenis.service';
import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, signal } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { CommonModule } from '@angular/common';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { CarrinhoService } from '../../../services/carrinho.service';
import { Usuario } from '../../../models/usuario.model';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from '@angular/material/card';
import { Comentario } from '../../../models/comentario.model';
import { ComentarioService } from '../../../services/comentario.service';
import { FormsModule, NgModel } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

type Card = {
  idTenis: number;
  titulo: string;
  nome: string;
  precoVenda: number;
  imageUrl: string;
};

@Component({
  selector: 'app-detalhes-tenis',
  templateUrl: './detalhes-tenis.component.html',
  styleUrls: ['./detalhes-tenis.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatToolbar, RouterLink, MatIcon, MatCard, MatCardTitle, MatCardContent, MatCardActions, MatSelect],
})
export class DetalhesTenisComponent implements OnInit, AfterViewInit {
  tenis: Tenis | null = null;
  imageUrl: string = '';
  usuarioLogado: Usuario | null = null;
  private subscription = new Subscription();
  comentarios: Comentario[] = []; // Lista de comentários
  novoComentario: string = ''; // Texto do novo comentário


  // Armazena os produtos relacionados
  relatedCards = signal<Card[]>([]);

  // Referência ao carrossel
  @ViewChild('carrossel') carrossel!: ElementRef;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private tenisService: TenisService,
    public carrinhoService: CarrinhoService,
    private router: Router,
    public comentarioService: ComentarioService
  ) {}

  ngOnInit(): void {
    this.carregarUsuarioLogado();

    // Pega o ID da URL
    const id = String(this.route.snapshot.paramMap.get('id'));

    // Carrega o tênis atual
    this.tenisService.findById(id).subscribe({
      next: (data) => {
        this.tenis = data;
        this.imageUrl = this.tenisService.getUrlImage(this.tenis.nomeImagem);
        this.carregarProdutosRelacionados(); // Chama após carregar `this.tenis`
        this.carregarComentarios(+id);
      },
      error: (err) => {
        console.error('Erro ao carregar os detalhes do tênis', err);
      },
    });
  }

  ngAfterViewInit(): void {
    // Certifique-se de que o carrossel está acessível após a inicialização da view
  }

  carregarComentarios(tenisId: number): void {
    this.comentarioService.getComentarios(tenisId).subscribe({
      next: (data) => (this.comentarios = data),
      error: (err) => console.error('Erro ao carregar comentários:', err),
    });
  }
  
  adicionarComentario(): void {
    if (this.novoComentario.trim() === '') return;
  
    const comentario: Partial<Comentario> = {
      idTenis: this.tenis?.id,
      usuario: this.usuarioLogado?.username || 'Anônimo',
      texto: this.novoComentario,
      data: new Date(),
    
    };
  console.log(comentario);
    this.comentarioService.addComentario(comentario).subscribe({
      next: (comentarioAdicionado) => {
        //this.comentarios.push(comentarioAdicionado);
        this.comentarios.unshift(comentarioAdicionado); // Adiciona ao início da lista
        this.novoComentario = ''; // Limpa o campo de texto
      },
      error: (err) => console.error('Erro ao adicionar comentário:', err),
    });
  }

  excluirComentario(comentarioId: number): void {
    const tenisId = this.tenis?.id || 0;
  
    this.comentarioService.deleteComentario(comentarioId).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter((c) => c.id !== comentarioId);
      },
      error: (err) => console.error('Erro ao excluir comentário:', err),
    });
  }
  
  

  Voltar(): void {
    window.history.back();
  }

  carregarUsuarioLogado(): void {
    this.subscription.add(
      this.authService.getUsuarioLogado().subscribe((usuario) => (this.usuarioLogado = usuario))
    );
  }

  deslogar(): void {
    this.authService.removeToken();
    this.authService.removeUsuarioLogado();
  }

  openDetalhes(card: Card) {
    this.router.navigate(['/detalhes', card.idTenis]).then(() => {
      window.location.reload(); // Força o refresh completo da página
    });
  }

  adicionarAoCarrinho(): void {
    if (this.tenis) {
      this.carrinhoService.adicionar({
        id: this.tenis.id,
        nome: this.tenis.nome,
        preco: this.tenis.precoVenda,
        quantidade: 1,
        imageUrl: this.imageUrl,
      });
    }
  }

  carregarProdutosRelacionados(): void {
    if (!this.tenis || !this.tenis.categoria) {
      return; // Garante que `this.tenis` está carregado antes
    }

    this.tenisService.findAll().subscribe({
      next: (produtos) => {
        const relacionados = produtos
          .filter(
            (tenis) =>
              tenis.categoria.id === this.tenis?.categoria.id && tenis.id !== this.tenis.id
          )
          .slice(0, 5); // Mostra até 5 produtos relacionados

        this.relatedCards.set(
          relacionados.map((tenis) => ({
            idTenis: tenis.id,
            titulo: tenis.nome,
            nome: tenis.nome,
            precoVenda: tenis.precoVenda,
            imageUrl: this.tenisService.getUrlImage(tenis.nomeImagem),
          }))
        );
      },
      error: (err) => {
        console.error('Erro ao carregar produtos relacionados:', err);
      },
    });
  }

  scrollLeft(): void {
    if (this.carrossel) {
      this.carrossel.nativeElement.scrollBy({ left: -250, behavior: 'smooth' });
    }
  }

  scrollRight(): void {
    if (this.carrossel) {
      this.carrossel.nativeElement.scrollBy({ left: 250, behavior: 'smooth' });
    }
  }
}
