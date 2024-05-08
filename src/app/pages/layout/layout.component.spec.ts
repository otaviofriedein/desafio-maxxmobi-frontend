import { LayoutComponent } from './layout.component';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let autenticacaoServiceSpy: jasmine.SpyObj<AutenticacaoService>;

  beforeEach(async () => {
    autenticacaoServiceSpy = jasmine.createSpyObj('AutenticacaoService', ['logout']);

    await TestBed.configureTestingModule({
      declarations: [ LayoutComponent ],
      imports: [ MatToolbarModule, MatIconModule ],
      providers: [
        { provide: AutenticacaoService, useValue: autenticacaoServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AutenticacaoService logout() method on onLogout() call', () => {
    // Chamar o método a ser testado
    component.onLogout();

    // Verificar se o método logout do AutenticacaoService foi chamado
    expect(autenticacaoServiceSpy.logout).toHaveBeenCalled();
  });
});
