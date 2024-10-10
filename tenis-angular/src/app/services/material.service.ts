import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private baseUrl = 'http://localhost:8080/materials';

  constructor(private httpClient : HttpClient){

  }

  findAll(): Observable<Material[]> {
    return this.httpClient.get<Material[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Material> {
    return this.httpClient.get<Material>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(material: Material): Observable<Material> {
    return this.httpClient.post<Material>(this.baseUrl, material);
  }

  update(material: Material): Observable<Material> {
    const data = {
      descricao: material.descricao,
      categoria: material.categoria
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${material.id}`, data); 
  }

  delete(material: Material): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${material.id}`); 
  }
}
