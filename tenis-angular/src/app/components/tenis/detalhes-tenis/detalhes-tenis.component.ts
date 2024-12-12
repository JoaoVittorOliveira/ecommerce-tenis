import { ActivatedRoute } from '@angular/router';
import { TenisService } from '../../../services/tenis.service';
import { Component, OnInit } from '@angular/core';
import { Tenis } from '../../../models/tenis.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalhes-tenis',
  templateUrl: './detalhes-tenis.component.html',
  styleUrls: ['./detalhes-tenis.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DetalhesTenisComponent implements OnInit {

  tenis: Tenis | null = null;

  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute, 
    private tenisService: TenisService
  ) {}

  ngOnInit(): void {
    
    // pega id da url
    const id = String(this.route.snapshot.paramMap.get('id'));

    this.tenisService.findById(id).subscribe({
      next: (data) => {
        this.tenis = data;
        this.imageUrl = this.tenisService.getUrlImage(this.tenis.nomeImagem);
        console.log(this.imageUrl);
        console.log('ID:', id);
      },
      error: (err) => {
        console.error('Erro ao carregar os detalhes do tênis', err)
      } 
    });

  }

  Voltar(): void {
    window.history.back();
  }
}
