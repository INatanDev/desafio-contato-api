import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ContatosFormComponent } from './contatos-form.component';
import { ContatosService } from '../../services/contatos.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Contatos } from '../../models/contatos';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

describe('ContatosFormComponent', () => {
  let component: ContatosFormComponent;
  let fixture: ComponentFixture<ContatosFormComponent>;
  let mockContatosService: jasmine.SpyObj<ContatosService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockLocation: jasmine.SpyObj<Location>;
  let mockActivatedRoute: Partial<ActivatedRoute>;

  beforeEach(async () => {
    mockContatosService = jasmine.createSpyObj('ContatosService', ['save']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockLocation = jasmine.createSpyObj('Location', ['back']);
    mockActivatedRoute = {
      snapshot: {
        params: {},
        queryParams: {},
        fragment: null,
        data: {
          contato: {
            id: '1',
            nome: 'Test',
            email: 'test@test.com',
            celular: '123456789',
            telefone: '987654321',
            favorito: 's',
            ativo: 's'
          }
        },
        url: [],
        outlet: 'primary',
        component: null,
        routeConfig: null,
        root: {} as ActivatedRouteSnapshot,
        parent: null,
        firstChild: null,
        children: [],
        pathFromRoot: [],
        paramMap: {} as any,
        queryParamMap: {} as any
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ContatosFormComponent],
      imports: [ReactiveFormsModule, MatCheckboxModule, MatSelectModule,ReactiveFormsModule ],
      providers: [
        NonNullableFormBuilder,
        { provide: ContatosService, useValue: mockContatosService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with contato data from route', () => {
    const contato = mockActivatedRoute.snapshot?.data['contato'];
    expect(component.form.value).toEqual(contato);
  });

  it('should call save method on submit', () => {
    const contato = mockActivatedRoute.snapshot?.data['contato'];
    mockContatosService.save.and.returnValue(of(contato));

    component.onSubmit();

    expect(mockContatosService.save).toHaveBeenCalledWith(component.form.value as Partial<Contatos>);
  });

  it('should show success message on successful save', () => {
    const contato = mockActivatedRoute.snapshot?.data['contato'];
    mockContatosService.save.and.returnValue(of(contato));

    component.onSubmit();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Contato salvo com sucesso!', '', { duration: 5000 });
    expect(mockLocation.back).toHaveBeenCalled();
  });

  it('should show error message on failed save', () => {
    mockContatosService.save.and.returnValue(throwError(() => new Error('Erro')));

    component.onSubmit();

    expect(mockSnackBar.open).toHaveBeenCalledWith('Error ao salvar contato!', '', { duration: 5000 });
  });

  it('should navigate back on cancel', () => {
    component.onCancel();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});
