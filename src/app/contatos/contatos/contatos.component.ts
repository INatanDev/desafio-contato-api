import { HasElementRef } from './../../../../node_modules/@angular/material/core/common-behaviors/color.d';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

import { Contatos } from '../models/contatos';
import { ContatosService } from './../services/contatos.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  contatos$: Observable<Contatos[]>;

  constructor(private contatosService: ContatosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contatos$ = this.contatosService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar os contatos.')
        return of([])
      })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  toggleFavorito(contato: Contatos): void {
    contato.favorito = contato.favorito === 's' ? 'n' : 's';
  }

  toggleAtivo(contato: Contatos): void {
    contato.ativo = contato.ativo === 's' ? 'n' : 's';
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit(): void {

  }

}
