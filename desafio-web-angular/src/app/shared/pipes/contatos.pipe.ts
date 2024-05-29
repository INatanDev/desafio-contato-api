import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contatos'
})
export class ContatosPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    switch(value) {
      case 'true': return 'star';
    }
    return 'star';
  }

}
