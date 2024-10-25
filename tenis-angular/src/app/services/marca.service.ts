import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Marca } from '../models/marca.model';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private baseUrl = 'http://localhost:8080/marcas';

  constructor(private httpClient : HttpClient){

  }

  findAll(page?: number, pageSize?: number): Observable<Marca[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Marca[]>(this.baseUrl, {params}); 
  }
  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }

  findById(id: string): Observable<Marca> {
    return this.httpClient.get<Marca>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(marca: Marca): Observable<Marca> {
    return this.httpClient.post<Marca>(this.baseUrl, marca);
  }

  update(marca: Marca): Observable<Marca> {
    const data = {
      nome: marca.nome,
      logo: marca.logo,
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${marca.id}`, data); 
  }

  delete(marca: Marca): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${marca.id}`); 
  }
}
