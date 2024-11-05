import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/clientes';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(cliente: Cliente): Observable<Cliente> {
    const data = {
      nome: cliente.nome,
      cpf: cliente.cpf,
      dataNascimento: cliente.dataNascimento,
      ddd: cliente.telefone.ddd,
      numero: cliente.telefone.numero,
      username: cliente.usuario.username,
      senha: cliente.usuario.senha,
      listaEndereco: [
        {
          cep: cliente.endereco.cep,
          rua: cliente.endereco.rua,
          complemento: cliente.endereco.complemento
        }
      ]
    };
    return this.httpClient.post<Cliente>(this.baseUrl, data);
  }

  update(cliente: Cliente): Observable<Cliente> {
    const data = {
      nome: cliente.nome,
      cpf: cliente.cpf,
      dataNascimento: cliente.dataNascimento,
      ddd: cliente.telefone.ddd,
      numero: cliente.telefone.numero,
      username: cliente.usuario.username,
      senha: cliente.usuario.senha,
      cep: cliente.endereco.cep,
      rua: cliente.endereco.rua,
      complemento: cliente.endereco.complemento
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${cliente.id}`, data); 
  }

  delete(cliente: Cliente): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${cliente.id}`); 
  }
}
