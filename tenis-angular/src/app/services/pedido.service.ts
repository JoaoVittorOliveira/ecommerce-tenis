import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private baseUrl = 'http://localhost:8080/pedidos';

  constructor(private httpClient : HttpClient) { }
  findAll(): Observable<Pedido[]>;
  findAll(page: number, pageSize: number): Observable<Pedido[]>;

  findAll(page?: number, pageSize?: number): Observable<Pedido[]> {
    let params = {};
    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    // console.log(params);
    return this.httpClient.get<Pedido[]>(this.baseUrl, {params}); 
  }
  count(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/count`); 
  }


  findPedidoByClienteId(id: number): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${this.baseUrl}/search/cliente/id/${id}`); 
  }

  insert(pedido: Pedido): Observable<Pedido> {
    return this.httpClient.post<Pedido>(this.baseUrl, pedido);
  }
  
}
