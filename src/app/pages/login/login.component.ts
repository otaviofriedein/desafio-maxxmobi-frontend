import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient, private router: Router){}

  form: FormGroup = new FormGroup({
    email: new FormControl('teste45@gmail.com'),
    password: new FormControl('Teste123@123'),
  });

  onLogin() {
    this.http.post('http://localhost:8081/auth/login', this.form.value, { observe: 'response' })
      .pipe(
        tap((response: HttpResponse<any>) => {
          if (response.ok) {
            localStorage.setItem('token', response.body.token);
            this.router.navigateByUrl('/home');
          } else {
            // TODO: Lidar com casos em que a resposta não é bem-sucedida
          }
        }),
        catchError((error) => {
          return this.error = error.error.description;          
        })
      )
      .subscribe();
  }

  @Input() error!: string | null;
}
