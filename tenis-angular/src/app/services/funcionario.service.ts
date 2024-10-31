import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private baseUrl = 'http://localhost:8080/funcionarios';

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.baseUrl); 
  }

  findById(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(funcionario: Funcionario): Observable<Funcionario> {
    const data = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      codigoContrato: funcionario.codigoContrato,
      dataAdmissao: funcionario.dataAdmissao,
      dataNascimento: funcionario.dataNascimento,
      telefone: funcionario.telefone,
      enderecos: funcionario.enderecos,
      usuario: funcionario.usuario
    }
    return this.httpClient.post<Funcionario>(this.baseUrl, data);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    const data = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      codigoContrato: funcionario.codigoContrato,
      dataAdmissao: funcionario.dataAdmissao,
      dataNascimento: funcionario.dataNascimento,
      telefone: funcionario.telefone,
      enderecos: funcionario.enderecos,
      usuario: funcionario.usuario
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${funcionario.id}`, data); 
  }

  delete(funcionario: Funcionario): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${funcionario.id}`); 
  }
}
