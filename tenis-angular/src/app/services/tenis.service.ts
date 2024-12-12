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

  findAll(): Observable<Tenis[]>;
  findAll(page: number, pageSize: number): Observable<Tenis[]>;

  findAll(page?: number, pageSize?: number): Observable<Tenis[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    // console.log(params);
    return this.httpClient.get<Tenis[]>(this.baseUrl, {params}); 
  }

  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }


  uploadImage(id: number, nomeImagem: string, imagem: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('id', id.toString());
    formData.append('nomeImagem', imagem.name);
    formData.append('imagem', imagem, imagem.name);
    
    return this.httpClient.patch<Tenis>(`${this.baseUrl}/imagem/upload`, formData);
  }

  getUrlImage(nomeImagem: String){
    return `${this.baseUrl}/image/download/${nomeImagem}`; 
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
