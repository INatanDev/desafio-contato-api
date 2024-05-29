import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Contatos } from '../../models/contatos';


@Component({
  selector: 'app-contatos-list',
  templateUrl: './contatos-list.component.html',
  styleUrls: ['./contatos-list.component.scss']
})
export class ContatosListComponent implements OnInit {

  @Input() contatos: Contatos[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);

  filteredContatos: Contatos[] = [];

  readonly displayedColumns = [
    'nome',
    'email',
    'celular',
    'telefone',
    'favorito',
    'ativo',
    'cadastro',
    'acoes'
  ];

  constructor() { }

  ngOnInit(): void {
    this.filteredContatos = this.contatos;
  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(contatos: Contatos){
    this.edit.emit(contatos);
  }

  toggleAtivo(contato: Contatos): void {
    contato.ativo = contato.ativo === 's' ? 'n' : 's';
  }

  toggleFavorito(contato: Contatos): void {
    contato.favorito = contato.favorito === 's' ? 'n' : 's';
  }

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim().toLowerCase();
    const searchTerm = value.replace(/%/g, '.*');

    const regex = new RegExp(searchTerm, 'i');
    this.filteredContatos = this.contatos.filter(contato =>
      regex.test(contato.nome.toLowerCase()) ||
      regex.test(contato.email.toLowerCase()) ||
      (contato.celular && contato.celular.length <= 11 && regex.test(contato.celular.toLowerCase())) ||
      (contato.telefone && contato.telefone.length <= 10 && regex.test(contato.telefone.toLowerCase())) ||
      regex.test(new Date(contato.cadastro).toISOString().toLowerCase())
    );
  }
}
