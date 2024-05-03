import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router,public dialog: MatDialog){}

  @Input() error!: string | null;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onLogin() {
    this.http.post('http://localhost:8081/auth/login', this.form.value, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.ok) {
            localStorage.setItem('token', response.body.token);
            this.router.navigateByUrl('/home');
          } else {
            setTimeout(() => { this.error = null; }, 3000);
            this.error = "Não foi possível realizar o login!";
          }
        }),
        catchError((error) => {
          setTimeout(() => { this.error = null; }, 3000);

          return this.error = error.error.description;  
        })
      )
      .subscribe();
  }

  openRegister(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(RegisterComponent, {
      minWidth: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

 
}
