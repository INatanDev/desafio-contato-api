import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Contatos } from '../../models/contatos';
import { ContatosService } from '../../services/contatos.service';
import { ContatosComponent } from './contatos.component';

describe('ContatosComponent', () => {
  let component: ContatosComponent;
  let fixture: ComponentFixture<ContatosComponent>;
  let mockContatosService: jasmine.SpyObj<ContatosService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockContatosService = jasmine.createSpyObj('ContatosService', ['list']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ContatosComponent],
      imports: [RouterTestingModule, MatDialogModule],
      providers: [
        { provide: ContatosService, useValue: mockContatosService },
        { provide: MatDialog, useValue: mockDialog },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
              queryParams: {},
              fragment: null,
              data: {}
            }
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockContatosService.list.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should handle error when loading contatos', () => {
    const errorResponse = throwError(() => new Error('Erro'));
    mockContatosService.list.and.returnValue(errorResponse);

    fixture.detectChanges();

    expect(mockDialog.open).toHaveBeenCalledWith(ErrorDialogComponent, { data: 'Erro ao carregar os contatos.' });
  });

  it('should toggle favorito status', () => {
    const contato: Contatos = { id: '1', nome: 'Teste', email: 'teste@teste.com', celular: '123456789', telefone: '987654321', favorito: 'n', ativo: 's', cadastro: new Date() };
    component.toggleFavorito(contato);
    expect(contato.favorito).toBe('s');
    component.toggleFavorito(contato);
    expect(contato.favorito).toBe('n');
  });

  it('should toggle ativo status', () => {
    const contato: Contatos = { id: '1', nome: 'Teste', email: 'teste@teste.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() };
    component.toggleAtivo(contato);
    expect(contato.ativo).toBe('n');
    component.toggleAtivo(contato);
    expect(contato.ativo).toBe('s');
  });

  // it('should navigate to new contato on add', () => {
  //   component.onAdd();
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['new'], { relativeTo: mockActivatedRoute });
  // });

  // it('should navigate to edit contato on edit', () => {
  //   const contato: Contatos = { id: '1', nome: 'Teste', email: 'teste@teste.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() };
  //   component.onEdit(contato);
  //   expect(mockRouter.navigate).toHaveBeenCalledWith(['edit', contato.id], { relativeTo: mockActivatedRoute });
  // });
});
