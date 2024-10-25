import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tamanho } from '../models/tamanho.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService {
  private baseUrl = 'http://localhost:8080/tamanhos';

  constructor(private httpClient : HttpClient){

  }

  findAll(page?: number, pageSize?: number): Observable<Tamanho[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    console.log(params);
    return this.httpClient.get<Tamanho[]>(this.baseUrl, {params}); 
  }
  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: number): Observable<Tamanho> {
    return this.httpClient.get<Tamanho>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(tamanho: Tamanho): Observable<Tamanho> {
    return this.httpClient.post<Tamanho>(this.baseUrl, tamanho);
  }

  update(tamanho: Tamanho): Observable<Tamanho> {
    return this.httpClient.put<any>(`${this.baseUrl}/${tamanho.id}`, tamanho); 
  }

  delete(tamanho: Tamanho): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${tamanho.id}`); 
  }
}
