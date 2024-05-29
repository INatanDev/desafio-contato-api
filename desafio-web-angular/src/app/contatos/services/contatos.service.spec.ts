import { TestBed } from '@angular/core/testing';

import { ContatosService } from './contatos.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ContatosService', () => {
  let service: ContatosService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ContatosService);
    http = TestBed.inject(HttpClient);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
