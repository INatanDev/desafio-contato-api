import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ContatosService } from '../../services/contatos.service';
import { Contatos } from '../../models/contatos';
import { ContatosListComponent } from '../../components/contatos-list/contatos-list.component';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {

  contatos$: Observable<Contatos[]>;
  @ViewChild(ContatosListComponent) contatosList!: ContatosListComponent;

  constructor(private contatosService: ContatosService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contatos$ = this.contatosService.list()
      .pipe(
        catchError(error => {
          this.onError('Erro ao carregar os contatos.');
          return of([]);
        })
      );

  }

  ngOnInit(): void {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  toggleFavorito(contato: Contatos): void {
    const updatedContato = { ...contato, favorito: contato.favorito === 's' ? 'n' : 's' };
  }

  toggleAtivo(contato: Contatos): void {
    contato.ativo = contato.ativo === 's' ? 'n' : 's';
  }

  onAdd() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onEdit(contato: Contatos){
    this.router.navigate(['edit', contato.id], {relativeTo: this.route});
  }

}
