import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';


import { ContatosRoutingModule } from './contatos-routing.module';
import { ContatosComponent } from './containers/contatos/contatos.component';
import { ContatosListComponent } from './components/contatos-list/contatos-list.component';
import { ContatosFormComponent } from './containers/contatos-form/contatos-form.component';




@NgModule({
  declarations: [
    ContatosComponent,
    ContatosFormComponent,
    ContatosListComponent
  ],
  imports: [
    CommonModule,
    ContatosRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ContatosModule { }
