import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Contatos } from '../../models/contatos';
import { ContatosService } from '../../services/contatos.service';

@Component({
  selector: 'app-contatos-form',
  templateUrl: './contatos-form.component.html',
  styleUrls: ['./contatos-form.component.scss']
})
export class ContatosFormComponent implements OnInit {

  form = this.formBuider.group({
    id: [''],
    nome: [''],
    email: [''],
    celular: [''],
    telefone: [''],
    favorito: [''],
    ativo: [''],
  });

  constructor(private formBuider: NonNullableFormBuilder,
    private service: ContatosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {

  }

  onSubmit(){
    console.log(this.form.value)
    this.service.save(this.form.value)
    .subscribe(data => this.onSucess(), error =>
      this.onError()
    );
  }

  onCancel(){
    this.location.back();
  }

  private onError(){
    this.snackBar.open('Error ao salvar contato! Verificar o número do celular já existe.',  '', { duration: 5000 });
  }

  private onSucess() {
    this.snackBar.open('Contato salvo com sucesso!',  '', { duration: 5000 });
    this.onCancel();
  }

  ngOnInit(): void {
    const contato: Contatos = this.route.snapshot.data['contato'];
    console.log(contato);
    this.form.setValue({
      id: contato.id,
      nome: contato.nome,
      email: contato.email,
      celular: contato.celular,
      telefone: contato.telefone,
      favorito: contato.favorito,
      ativo: contato.ativo
    });
  }

}
