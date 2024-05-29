import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContatosListComponent } from './contatos-list.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Contatos } from '../../models/contatos';

describe('ContatosListComponent', () => {
  let component: ContatosListComponent;
  let fixture: ComponentFixture<ContatosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContatosListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContatosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the input contatos', () => {
    const contatos: Contatos[] = [
      { id: '1', nome: 'Test 1', email: 'test1@test.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() },
      { id: '2', nome: 'Test 2', email: 'test2@test.com', celular: '123456789', telefone: '987654321', favorito: 'n', ativo: 'n', cadastro: new Date() }
    ];

    component.contatos = contatos;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr'));
    expect(rows.length).toBe(3); // 2 contatos + 1 header
  });

  it('should emit add event', () => {
    spyOn(component.add, 'emit');

    const button = fixture.debugElement.query(By.css('button.add-button'));
    button.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(component.add.emit).toHaveBeenCalledWith(true);
  });

  it('should emit edit event', () => {
    spyOn(component.edit, 'emit');

    const contato: Contatos = { id: '1', nome: 'Test 1', email: 'test1@test.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() };
    component.onEdit(contato);

    fixture.detectChanges();
    expect(component.edit.emit).toHaveBeenCalledWith(contato);
  });

  it('should filter contatos on search', () => {
    const contatos: Contatos[] = [
      { id: '1', nome: 'Test 1', email: 'test1@test.com', celular: '123456789', telefone: '987654321', favorito: 's', ativo: 's', cadastro: new Date() },
      { id: '2', nome: 'Test 2', email: 'test2@test.com', celular: '123456789', telefone: '987654321', favorito: 'n', ativo: 'n', cadastro: new Date() }
    ];

    component.contatos = contatos;
    fixture.detectChanges();

    const inputElement = fixture.debugElement.query(By.css('input.search-input')).nativeElement;
    inputElement.value = 'Test 1';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(component.filteredContatos.length).toBe(1);
    expect(component.filteredContatos[0].nome).toBe('Test 1');
  });
});
