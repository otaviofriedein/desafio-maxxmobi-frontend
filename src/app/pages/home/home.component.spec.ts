import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { CandidatoService } from '../../service/candidato/candidato.service';
import { UtilService } from '../../service/utils/util.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LayoutComponent } from '../layout/layout.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { Candidato } from '../../models/candidato';
import { delay, of } from 'rxjs';
import { CandidatoFilters } from '../../models/candidatoFilters';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { CandidatoComponent } from './candidato/candidato.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockCandidatoService: CandidatoService;
  let mockUtilService: UtilService;
  let dialogSpy: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {    
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
        FormsModule,
        HttpClientModule
      ],
      providers: [
        { provide: CandidatoService },
        { provide: MatSnackBar },
        { provide: UtilService },
        { provide: MatDialog, useValue: dialogSpy },
        provideAnimationsAsync(),
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    
    mockCandidatoService = TestBed.get(CandidatoService);
    mockUtilService = TestBed.get(UtilService);

    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = () => 'Stop location.reload';
  });

  it('deve chamar getAllCandidatos no ngOnInit', fakeAsync(() => {

    spyOn(mockCandidatoService, 'getCandidatos').and.returnValue(of([]));

    component.ngOnInit();

    expect(mockCandidatoService.getCandidatos).toHaveBeenCalled();
  }));  

  it('should call openDialogToCreateCandidato and send request createCandidato to Api', () => {

    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };
    spyOn(mockCandidatoService, 'createCandidato').and.returnValue(of(candidato));

    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    dialogRefSpyObj.componentInstance = { save: of(candidato) };
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    component.openDialogToCreateCandidato();

    expect(mockCandidatoService.createCandidato).toHaveBeenCalledOnceWith(candidato);
  });

  it('should call openDialogToViewCandidato and open CandidatoComponent in readonly mode', () => {

    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    spyOn(mockCandidatoService, 'getCandidatoById').and.returnValue(of(candidato));
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    // Adiciona manualmente as propriedades necessárias
    dialogRefSpyObj.componentInstance = {
      candidato: null,
      readonly: null
    };

    // Act
    component.openDialogToViewCandidato(1);

    // // Assert
    expect(mockCandidatoService.getCandidatoById).toHaveBeenCalled();
    expect(dialogSpy.open).toHaveBeenCalledOnceWith(CandidatoComponent);
    expect(component.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.readonly).toEqual(true);
  });

  it('should call openDialogToUpdateCandidato, open CandidatoComponent and subscribe updateCandidato', () => {
    const candidato: Candidato = { id: 0, nome: '', nascimento: '', sexo: '', nota: 0, bairro: '', cidade: '', logradouro: '', uf: '', data_criacao: '' };
    const dialogRefSpyObj = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
    
    spyOn(mockCandidatoService, 'getCandidatoById').and.returnValue(of(candidato));
    spyOn(mockCandidatoService, 'updateCandidato').and.returnValue(of(candidato));

    // Adiciona manualmente as propriedades necessárias
    dialogRefSpyObj.componentInstance = {
      candidato: null,
      save: of(candidato)
    };
  
    dialogSpy.open.and.returnValue(dialogRefSpyObj);

    // Act
    component.openDialogToUpdateCandidato(1);

    // Assert
    expect(mockCandidatoService.getCandidatoById).toHaveBeenCalled();
    expect(dialogSpy.open).toHaveBeenCalledOnceWith(CandidatoComponent);
    expect(component.candidato).toEqual(candidato);
    expect(dialogRefSpyObj.componentInstance.candidato).toEqual(candidato);
    expect(mockCandidatoService.updateCandidato).toHaveBeenCalledOnceWith(candidato);
  });

  it('should call deleteCandidato and send request to Api', () => {
    // Arrange
    const id = 1;
    spyOn(mockCandidatoService, 'deleteCandidato').and.returnValue(of());

    // Act
    component.deleteCandidato(id);

    // Assert
    expect(mockCandidatoService.deleteCandidato).toHaveBeenCalledWith(id);
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
    expect(params).toEqual(`?nome=${component.candidatoFilters.nome}&sexo=${component.candidatoFilters.sexo}&nota=${component.candidatoFilters.nota}&nascimento=${mockUtilService.convertToServerDateFormat(component.candidatoFilters.nascimento)}&sortBy=${component.candidatoFilters.sortBy.value}&order=${component.candidatoFilters.sortBy.direction}`);
  });

});
