import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContatosResolver } from './contatos.resolver';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { ContatosService } from '../services/contatos.service';

describe('ContatosResolver', () => {
  let resolver: ContatosResolver;
  let contatosService: jasmine.SpyObj<ContatosService>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ContatosService', ['loadById']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ContatosResolver,
        { provide: ContatosService, useValue: spy }
      ]
    });

    resolver = TestBed.inject(ContatosResolver);
    contatosService = TestBed.inject(ContatosService) as jasmine.SpyObj<ContatosService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return a contato when the route has an id', () => {
    const contatoMock = { id: '1', nome: 'Teste', email: 'teste@teste.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() };
    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.params = { id: '1' };

    contatosService.loadById.and.returnValue(of(contatoMock));

    resolver.resolve(routeSnapshot, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toEqual(contatoMock);
    });

    expect(contatosService.loadById).toHaveBeenCalledWith('1');
  });

  it('should return a default contato when the route does not have an id', () => {
    const defaultContato = { id: '', nome: '', email: '', celular: '', telefone: '', favorito: '', ativo: '', cadastro: new Date() };
    const routeSnapshot = new ActivatedRouteSnapshot();
    routeSnapshot.params = {};

    resolver.resolve(routeSnapshot, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toEqual(defaultContato);
    });

    expect(contatosService.loadById).not.toHaveBeenCalled();
  });
});
