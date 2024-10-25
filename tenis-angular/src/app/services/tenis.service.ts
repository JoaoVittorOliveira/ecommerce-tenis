import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tenis } from '../models/tenis.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TenisService {

  private baseUrl = 'http://localhost:8080/tenis';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Tenis[]> {
    return this.httpClient.get<Tenis[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Tenis> {
    return this.httpClient.get<Tenis>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(tenis: Tenis): Observable<Tenis> {
    const data = {
      nome: tenis.nome,
      quantidade: tenis.quantidade,
      peso: tenis.peso,
      precoCompra: tenis.precoCompra,
      precoVenda: tenis.precoVenda,
      idMarca: tenis.marca.id,
      idMaterial: tenis.material.id,
      idCor: tenis.cor.id,
      idCategoria: tenis.categoria.id,
      idTamanho: tenis.tamanho.id
    }
    return this.httpClient.post<Tenis>(this.baseUrl, data);
  }

  update(tenis: Tenis): Observable<Tenis> {
    const data = {
      nome: tenis.nome,
      quantidade: tenis.quantidade,
      peso: tenis.peso,
      precoCompra: tenis.precoCompra,
      precoVenda: tenis.precoVenda,
      idMarca: tenis.marca.id,
      idMaterial: tenis.material.id,
      idCor: tenis.cor.id,
      idCategoria: tenis.categoria.id,
      idTamanho: tenis.tamanho.id
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${tenis.id}`, data); 
  }

  delete(tenis: Tenis): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${tenis.id}`); 
  }
}
