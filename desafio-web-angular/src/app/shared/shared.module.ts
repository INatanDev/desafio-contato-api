import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ContatosPipe } from './pipes/contatos.pipe';



@NgModule({
  declarations: [
    ErrorDialogComponent,
    ContatosPipe
  ],
  imports: [
    CommonModule,
    AppMaterialModule
  ],
  exports: [
    ErrorDialogComponent,
    ContatosPipe
  ]
})
export class SharedModule { }
