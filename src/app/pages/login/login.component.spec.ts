import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MatDialog } from '@angular/material/dialog';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { TokenJWT } from '../../models/tokenJwt';
import { Router } from '@angular/router';
import { RegisterComponent } from './register/register.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockAutenticacaoService: jasmine.SpyObj<AutenticacaoService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockAutenticacaoService = jasmine.createSpyObj('AutenticacaoService', ['login', 'register']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigateByUrl']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ 
        FormsModule, 
        ReactiveFormsModule,
        MatCardModule, 
        MatFormFieldModule,
        MatInputModule
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: AutenticacaoService, useValue: mockAutenticacaoService },
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar },
        provideAnimationsAsync(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AutenticacaoService login method when form is valid', () => {

    component.formLogin.setValue({ email: 'test@example.com', password: 'password' });

    const mockResponse = { token: 'token_de_teste' } as TokenJWT;
    mockAutenticacaoService.login.and.returnValue(of(mockResponse));

    component.onLogin();

    expect(mockAutenticacaoService.login).toHaveBeenCalledOnceWith(component.user);
  });

  it('should call MatSnackBar open method when form is invalid', () => {
    component.formLogin.setValue({ email: '', password: '' });
    component.onLogin();

    expect(mockSnackBar.open).toHaveBeenCalledOnceWith('Login inválido!', 'Fechar', { duration: 3000 });
  });
});
