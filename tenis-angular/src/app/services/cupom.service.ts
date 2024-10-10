import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cupom } from '../models/cupom.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CupomService {

  private baseUrl = 'http://localhost:8080/cupons';

  constructor(private httpClient : HttpClient) { }

  findAll(): Observable<Cupom[]> {
    return this.httpClient.get<Cupom[]>(this.baseUrl); 
  }

  findById(id: number): Observable<Cupom> {
    return this.httpClient.get<Cupom>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(cupom: Cupom): Observable<Cupom> {
    return this.httpClient.post<Cupom>(this.baseUrl, cupom);
  }

  update(cupom: Cupom): Observable<Cupom> {
    return this.httpClient.put<any>(`${this.baseUrl}/${cupom.id}`, cupom); 
  }

  delete(cupom: Cupom): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${cupom.id}`); 
  }
}
