import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  constructor(private http: HttpClient, private router: Router){}

  @Input() errorRegister!: string | null;

  formRegister: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    fullName: new FormControl(''),
  });

  onRegister(){
    this.http.post('http://localhost:8081/auth/signup', this.formRegister.value, { observe: 'response' })
    .pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {
          alert("Usuário registrado com sucesso!")    
          location.reload();
        } else {
          setTimeout(() => { this.errorRegister = null; }, 3000);
          this.errorRegister = "Não foi possível criar o usuário!";
        }
      }),
      catchError(() => {
        setTimeout(() => { this.errorRegister = null; }, 3000);
        return this.errorRegister = "Ocorreu um erro interno!";
      })
    )
    .subscribe();
  }
}
