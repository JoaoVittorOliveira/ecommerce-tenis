import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ItemCarrinho } from '../models/item-carrinho.model';
import { LocalStorageService } from './local-storage.service';
import { HttpClient } from '@angular/common/http';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private baseUrl = 'http://localhost:8080/comentarios';

  constructor(private httpClient: HttpClient) {
  }

  // Buscar comentários de um tênis
  getComentarios(tenisId: number): Observable<Comentario[]> {
    return this.httpClient.get<Comentario[]>(`${this.baseUrl}/${tenisId}`);
  }

  // Adicionar um novo comentário
  addComentario(comentario: Partial<Comentario>): Observable<Comentario> {
    return this.httpClient.post<Comentario>(this.baseUrl, comentario).pipe(
      tap(response => {
        console.log('Resposta do servidor:', response); // Verifique a resposta do servidor
      })
    );
  }

  // Excluir um comentário
  deleteComentario(comentId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${comentId}`);
  }
}
