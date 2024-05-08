import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CandidatoComponent } from './candidato.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { Candidato } from '../../../models/candidato';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('CandidatoComponent', () => {
  let component: CandidatoComponent;
  let fixture: ComponentFixture<CandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidatoComponent ],
      imports: [ 
        ReactiveFormsModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
        MatInputModule
      ],
      providers: [ 
        MatSnackBar,
        MatDatepickerModule,
        {
          provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
        },
        provideAnimationsAsync(),
       ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.formCandidato).toBeDefined();
  });

  it('should emit save event when onSave is called with valid form', () => {
    spyOn(component.save, 'emit');
    const candidato = { id: 1, nome: 'Teste', nascimento: '2000-01-01', sexo: 'M', nota: 9, logradouro: '', bairro: '', cidade: '', uf: '' } as Candidato;
    component.formCandidato.patchValue(candidato);
    component.onSave();
    expect(component.save.emit).toHaveBeenCalledWith(candidato);
  });

  it('should fill form when pass candidato from input', () => {   
    const candidato: Candidato = {
      id: 1,
      nome: 'John Doe',
      nascimento: '1990-01-01',
      sexo: 'M',
      nota: 8,
      logradouro: '123 Main St',
      bairro: 'Downtown',
      cidade: 'Big City',
      uf: 'BC',
      data_criacao:''
    };
  
    fixture = TestBed.createComponent(CandidatoComponent);
    component = fixture.componentInstance;
    component.candidato = candidato;
    component.ngOnInit(); 
    fixture.detectChanges();  
    
    expect(component.formCandidato.get('id')?.value).toEqual(component.candidato.id);
    expect(component.formCandidato.get('nome')?.value).toEqual(component.candidato.nome);
    expect(component.formCandidato.get('nascimento')?.value).toEqual(component.candidato.nascimento);
    expect(component.formCandidato.get('sexo')?.value).toEqual(component.candidato.sexo);
    expect(component.formCandidato.get('nota')?.value).toEqual(component.candidato.nota);
    expect(component.formCandidato.get('logradouro')?.value).toEqual(component.candidato.logradouro);
    expect(component.formCandidato.get('cidade')?.value).toEqual(component.candidato.cidade);
    expect(component.formCandidato.get('bairro')?.value).toEqual(component.candidato.bairro);
    expect(component.formCandidato.get('uf')?.value).toEqual(component.candidato.uf);
  });

  it('should display snackbar when onSave is called with invalid form', () => {
    spyOn(component.snackBar, 'open');
    component.onSave();
    expect(component.snackBar.open).toHaveBeenCalledWith('Formulário inválido!', 'Fechar', { duration: 3000 });
  });
});
