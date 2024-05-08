import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { CandidatoService } from '../../service/candidato/candidato.service';
import { UtilService } from '../../service/utils/util.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from '../layout/layout.component';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Candidato } from '../../models/candidato';
import { of } from 'rxjs';
import { CandidatoComponent } from '../../components/candidato/candidato.component';
import { CandidatoFilters } from '../../models/candidatoFilters';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let candidatoServiceSpy: jasmine.SpyObj<CandidatoService>;
  let autenticacaoServiceSpy: jasmine.SpyObj<AutenticacaoService>;
  let utilServiceSpy: jasmine.SpyObj<UtilService>;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    candidatoServiceSpy = jasmine.createSpyObj('CandidatoService', ['getCandidatos', 'getCandidatoById', 'createCandidato', 'updateCandidato', 'deleteCandidato']);
    autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['']);
    utilServiceSpy = jasmine.createSpyObj('UtilService', ['convertToServerDateFormat']);
    dialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, LayoutComponent],
      imports: [
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatIconModule,
        MatFormField,
        MatToolbarModule,
        MatInputModule,
        MatSelectModule,
        FormsModule
      ],
      providers: [
        { provide: CandidatoService, useValue: candidatoServiceSpy },
        { provide: AutenticacaoService, useValue: autenticacaoServiceSpy },
        { provide: UtilService, useValue: utilServiceSpy },
        { provide: MatDialog, useValue: dialogSpy },
        provideAnimationsAsync(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call CandidatoService getCandidatos method on ngOnInit', () => {
    // Arrange
    const candidatos: Candidato[] = []; // Define candidatos de exemplo
    candidatoServiceSpy.getCandidatos.and.returnValue(of(candidatos));

    // Act
    component.ngOnInit();

    // Assert
    expect(candidatoServiceSpy.getCandidatos).toHaveBeenCalled();
    expect(component.candidatos).toEqual(candidatos);
  });

  it('should call openDialogToCreateCandidato and send request createCandidato to Api', () => {

    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };

    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.componentInstance = { save: of(candidato) };
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDialogToCreateCandidato();

    expect(candidatoServiceSpy.createCandidato).toHaveBeenCalledOnceWith(candidato);
  });

  it('should call openDialogToViewCandidato and open CandidatoComponent in readonly mode', () => {
    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    
    // Adiciona manualmente as propriedades necessárias
    dialogRefSpyObj.componentInstance = {
      candidato: null,
      readonly: null
    };

    candidatoServiceSpy.getCandidatoById.and.returnValue(of(candidato));   
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    // Act
    component.openDialogToViewCandidato(1);

    // Assert
    expect(candidatoServiceSpy.getCandidatoById).toHaveBeenCalled();
    expect(dialogSpy.open).toHaveBeenCalledOnceWith(CandidatoComponent);
    expect(component.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.readonly).toEqual(true);
  });

  it('should call openDialogToUpdateCandidato, open CandidatoComponent and subscribe updateCandidato', () => {
    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    
    // Adiciona manualmente as propriedades necessárias
    dialogRefSpyObj.componentInstance = {
      candidato: null,
      save: of(candidato)
    };

    candidatoServiceSpy.getCandidatoById.and.returnValue(of(candidato));   
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    // Act
    component.openDialogToUpdateCandidato(1);

    // Assert
    expect(candidatoServiceSpy.getCandidatoById).toHaveBeenCalled();
    expect(dialogSpy.open).toHaveBeenCalledOnceWith(CandidatoComponent);
    expect(component.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.candidato).toEqual(candidato);
    expect(candidatoServiceSpy.updateCandidato).toHaveBeenCalledOnceWith(candidato);
  });

  it('should call deleteCandidato and send request to Api', () => {
    // Arrange
    const id = 1;

    // Act
    component.deleteCandidato(id);

    // Assert
    expect(candidatoServiceSpy.deleteCandidato).toHaveBeenCalledWith(id);
  });

  it('should call getFilterCandidato with empty params and mount empty params', () => {
    // Arrange
    component.candidatoFilters = {} as CandidatoFilters;

    // Act
    let params = component.getFilterCandidato();

    // Assert
    expect(params).toEqual('');
  });

  it('should call getFilterCandidato with full params and mount params', () => {
    // Arrange    
    component.candidatoFilters = {
      nome: 'campo 1',
      nascimento: new Date(),
      nota:3,
      sexo:'M',
      sortBy: { value: 'id', direction: 'asc' }
    } as CandidatoFilters;

    // Act
    let params = component.getFilterCandidato();

    // Assert
    expect(params).toEqual(`?nome=${component.candidatoFilters.nome}&sexo=${component.candidatoFilters.sexo}&nota=${component.candidatoFilters.nota}&nascimento=${utilServiceSpy.convertToServerDateFormat(component.candidatoFilters.nascimento)}&sortBy=${component.candidatoFilters.sortBy.value}&order=${component.candidatoFilters.sortBy.direction}`);
  });

});
