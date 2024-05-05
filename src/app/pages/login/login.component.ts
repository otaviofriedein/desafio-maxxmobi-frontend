import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../components/register/register.component';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { TokenJWT } from '../../models/tokenJwt';
import { Router } from '@angular/router';
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
    private router: Router, 
    private _snackBar: MatSnackBar){}

  user= {} as User;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onLogin() {
    if (this.formLogin.valid){
      this.user = this.formLogin.value as User;
      this.autenticacaoService.login(this.user).subscribe((response: TokenJWT) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/home');
      });
    }
    else
    {
      this._snackBar.open('Login inválido!', 'Fechar', { duration: 3000 });      
    }   
  }

  openDialogToRegisterUser() {
    let userComponent = this.dialog.open(RegisterComponent);

    userComponent.componentInstance.register.subscribe((newUser) => {
      this.onRegister(newUser);
    });  
  } 

  onRegister(user: User) {      
    this.autenticacaoService.signUp(user).subscribe(() => {
      this._snackBar.open('Usuário criado!', 'Fechar', { duration: 3000 });
      setTimeout(() => { location.reload(); }, 3000);
    });      
  }
}