import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenJWT } from '../../models/tokenJwt';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  url = 'http://localhost:8081/auth'; 

  constructor(
    private httpClient: HttpClient, 
    private router: Router, 
    private _snackBar: MatSnackBar) { }

  private tokenKey = 'token';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  signUp(user: User) {
    return this.httpClient.post<User>(this.url + '/signup', JSON.stringify(user), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível criar o seu usuário.');
        return throwError(() => error);
      })
    );
  }

  login(login: User): Observable<TokenJWT> {
    return this.httpClient.post<TokenJWT>(this.url + '/login', JSON.stringify(login), this.httpOptions)
      .pipe(
        tap((response) => {
          localStorage.setItem(this.tokenKey, response.token);
          this.router.navigateByUrl('/home');
        }),   
        catchError(error => {
          this.showErrorSnackBar('Falha ao autenticar. Verifique suas credenciais.');
          return throwError(() => error);
        })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigateByUrl(this.url + '/login');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private showErrorSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
