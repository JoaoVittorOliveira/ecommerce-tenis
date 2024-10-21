import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = 'http://localhost:8080/categorias';

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.baseUrl); 
  }

  findById(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.baseUrl, categoria);
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.httpClient.put<any>(`${this.baseUrl}/${categoria.id}`, categoria); 
  }

  delete(categoria: Categoria): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${categoria.id}`); 
  }
}
