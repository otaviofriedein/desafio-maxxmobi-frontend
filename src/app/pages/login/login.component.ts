import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from './register/register.component';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TOKEN } from '../../api.config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {  
  constructor(
    public dialog: MatDialog,
    private autenticacaoService: AutenticacaoService, 
    private snackBar: MatSnackBar,
    private router: Router){}

  user= {} as User;

  formLogin: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  onLogin() {
    if (this.formLogin.valid){
      this.user = this.formLogin.value as User;
      this.autenticacaoService.login(this.user).subscribe((response)=>{
        localStorage.setItem(TOKEN, response.token);
          this.router.navigateByUrl('/home');
      });
    }
    else
    {
      this.snackBar.open('Login inválido!', 'Fechar', { duration: 3000 });      
    }   
  }

  openDialogToRegisterUser() {
    let registerComponent = this.dialog.open(RegisterComponent);

    registerComponent.componentInstance.register.subscribe((newUser) => {
      this.autenticacaoService.register(newUser).subscribe((response)=>{
        this.snackBar.open('Usuário criado!', 'Fechar', { duration: 3000 });
        setTimeout(() => { location.reload(); }, 3000);
      });
    });  
  }   
}