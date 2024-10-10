import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Telefone } from '../models/telefone.model';

@Injectable({
  providedIn: 'root'
})
export class TelefoneService {
  private baseUrl = 'http://localhost:8080/telefones';

  constructor(private httpClient : HttpClient){

  }

  findAll(): Observable<Telefone[]> {
    return this.httpClient.get<Telefone[]>(this.baseUrl); 
  }

  findById(id: number): Observable<Telefone> {
    return this.httpClient.get<Telefone>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(telefone: Telefone): Observable<Telefone> {
    return this.httpClient.post<Telefone>(this.baseUrl, telefone);
  }

  update(telefone: Telefone): Observable<Telefone> {
    const data = {
      ddd: telefone.ddd,
      numero: telefone.numero,
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${telefone.id}`, data); 
  }

  delete(telefone: Telefone): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${telefone.id}`); 
  }
}
