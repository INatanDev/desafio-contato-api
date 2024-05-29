import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

import { Contatos } from '../models/contatos';
import { ContatosService } from '../services/contatos.service';

@Injectable({
  providedIn: 'root'
})
export class ContatosResolver implements Resolve<Contatos> {

  constructor(private service: ContatosService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Contatos> {
    if (route.params && route.params['id']) {
      return this.service.loadById(route.params['id']);
    }
    return of({id: '',
              nome: '',
              email: '',
              celular: '',
              telefone: '',
              favorito: '',
              ativo: '',
              cadastro: new Date()});
  }
}
