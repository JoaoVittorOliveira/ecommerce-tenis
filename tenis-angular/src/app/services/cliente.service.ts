import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { ClientePasswordUpdateDTO } from '../models/cliente-password-update.dto';
import { ClienteUsernameUpdateDTO } from '../models/cliente-username-update.dto';

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

  findByUsername(username: string): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/search/username/${username}`);
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
      perfil: 'Cliente',
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

  getMyAccount(): Observable<Cliente> {
    return this.httpClient.get<Cliente>(`${this.baseUrl}/my-account`);
  }
  
  updateMyAccount(cliente: Cliente): Observable<void> {
    return this.httpClient.put<void>(`${this.baseUrl}/my-account`, cliente);
  }

  delete(cliente: Cliente): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${cliente.id}`); 
  }

  updatePassword(dto: ClientePasswordUpdateDTO): Observable<void> {
    return this.httpClient.patch<void>(`${this.baseUrl}/update-password`, dto);
  }

  // Atualizar username
  updateUsername(dto: ClienteUsernameUpdateDTO): Observable<void> {
    return this.httpClient.patch<void>(`${this.baseUrl}/update-username`, dto);
  }
}
