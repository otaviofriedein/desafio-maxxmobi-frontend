import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../components/register/register.component';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {  
  constructor(
    public dialog: MatDialog,
    private autenticacaoService: AutenticacaoService, 
    private snackBar: MatSnackBar){}

  user= {} as User;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onLogin() {
    if (this.formLogin.valid){
      this.user = this.formLogin.value as User;
      this.autenticacaoService.login(this.user)
    }
    else
    {
      this.snackBar.open('Login inválido!', 'Fechar', { duration: 3000 });      
    }   
  }

  openDialogToRegisterUser() {
    let registerComponent = this.dialog.open(RegisterComponent);

    registerComponent.componentInstance.register.subscribe((newUser) => {
      this.autenticacaoService.signUp(newUser);
    });  
  }   
}