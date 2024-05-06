import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../models/user';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ 
        ReactiveFormsModule, 
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule
      ],
      providers: [ 
        MatSnackBar,        
        provideAnimationsAsync(),
       ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit register event when onRegister is called with valid form', () => {
    spyOn(component.register, 'emit');
    const user: User = {
      email: 'test@example.com',
      password: 'password123',
      fullName: 'John Doe'
    };
    component.formRegister.setValue(user);
    component.onRegister();
    expect(component.register.emit).toHaveBeenCalledWith(user);
  });

  it('should display snackbar when onRegister is called with invalid form', () => {
    spyOn(component.snackBar, 'open');
    component.onRegister();
    expect(component.snackBar.open).toHaveBeenCalledWith('Formulário inválido', 'Fechar', { duration: 3000 });
  });
});
