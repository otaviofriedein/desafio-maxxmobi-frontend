import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(public snackBar: MatSnackBar){}

  user= {} as User;
  @Output() register = new EventEmitter<User>();

  formRegister: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    fullName: new FormControl('')
  });

  onRegister(){    
    if (this.formRegister.valid){      
        this.user = this.formRegister.value as User;
        this.register.emit(this.user);
    }
    else{
      this.snackBar.open('Formulário inválido', 'Fechar', { duration: 3000 });
    }           
  }
}
