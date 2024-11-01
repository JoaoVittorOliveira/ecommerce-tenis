import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = 'http://localhost:8080/usuarios';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.baseUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<any>(`${this.baseUrl}/${usuario.id}`, usuario); 
  }

  delete(usuario: Usuario): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${usuario.id}`); 
  }
}
