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

count(): Observable<number> {
  return this.httpClient.get<number>(`${this.baseUrl}/count`); 
}

  findAll(): Observable<Funcionario[]>;
  findAll(page: number, pageSize: number): Observable<Funcionario[]>;

  findAll(page?: number, pageSize?: number): Observable<Funcionario[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    // console.log(params);
    return this.httpClient.get<Funcionario[]>(this.baseUrl, {params}); 
  }


  findById(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.baseUrl}/search/id/${id}`); 
  }

  insert(funcionario: Funcionario): Observable<Funcionario> {
    const data = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      codigoAdmissao: funcionario.codigoAdmissao,
      dataAdmissao: funcionario.dataAdmissao,
      dataNascimento: funcionario.dataNascimento,
      ddd: funcionario.telefone.ddd,
      numero: funcionario.telefone.numero,
      username: funcionario.usuario.username,
      senha: funcionario.usuario.senha
    }
    return this.httpClient.post<Funcionario>(this.baseUrl, data);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    const data = {
      nome: funcionario.nome,
      cpf: funcionario.cpf,
      codigoAdmissao: funcionario.codigoAdmissao,
      dataAdmissao: funcionario.dataAdmissao,
      dataNascimento: funcionario.dataNascimento,
      ddd: funcionario.telefone.ddd,
      numero: funcionario.telefone.numero,
      username: funcionario.usuario.username,
      senha: funcionario.usuario.senha
    }
    return this.httpClient.put<any>(`${this.baseUrl}/${funcionario.id}`, data); 
  }

  delete(funcionario: Funcionario): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${funcionario.id}`); 
  }
}
