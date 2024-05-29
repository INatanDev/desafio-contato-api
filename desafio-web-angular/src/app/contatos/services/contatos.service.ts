import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, first, tap } from 'rxjs';

import { Contatos } from '../models/contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  private readonly API = 'api/contato';

  constructor(private httpClient: HttpClient) { }

  list(searchTerm?: string): Observable<Contatos[]> {
    const url = searchTerm ? `${this.API}?search=${searchTerm}` : this.API;
    return this.httpClient.get<Contatos[]>(url).pipe(
      first(),
      tap(contatos => console.log(contatos))
    );
  }

  save(record: Partial<Contatos>){
    console.log(record);
    if (record.id) {
      console.log('update realizado');
      return this.update(record);
    }
    console.log('create realizado');
    return this.create(record);
  }

  loadById(id: string){
    return this.httpClient.get<Contatos>(`${this.API}/${id}`);
  }

  private create(record: Partial<Contatos>) {
    return this.httpClient.post<Contatos[]>(this.API, record).pipe(first());
  }

  private update(record: Partial<Contatos>) {
    return this.httpClient.put<Contatos[]>(`${this.API}/${record.id}`, record).pipe(first());
  }

  search(term: string): Observable<Contatos[]> {
    return this.httpClient.get<Contatos[]>(`${this.API}?search=${term}`).pipe(first());
  }
}
