import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  // Armazena o estado de página e tamanho da página
  private page = new BehaviorSubject<number>(0);
  private pageSize = new BehaviorSubject<number>(4);
  private totalRecords = new BehaviorSubject<number>(0);

  // Expor como Observables
  page$ = this.page.asObservable();
  pageSize$ = this.pageSize.asObservable();
  totalRecords$ = this.totalRecords.asObservable();

  // Métodos para atualizar os valores
  setPage(page: number): void {
    this.page.next(page);
  }

  setPageSize(pageSize: number): void {
    this.pageSize.next(pageSize);
  }

  setTotalRecords(total: number): void {
    this.totalRecords.next(total);
  }

}
