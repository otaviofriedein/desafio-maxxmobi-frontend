import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { TokenJWT } from '../../models/tokenJwt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_URL, TOKEN } from '../../api.config';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  resource = '/auth';

  constructor(
    private httpClient: HttpClient, 
    private router: Router, 
    private snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  login(login: User): Observable<TokenJWT> {
    return this.httpClient.post<TokenJWT>(`${API_URL}${this.resource}/login`, JSON.stringify(login), this.httpOptions)
      .pipe( 
        catchError(error => {
          this.showErrorSnackBar('Falha ao autenticar. Verifique suas credenciais.');
          return throwError(() => error);
        })
    );
  }

  register(user: User) {
    return this.httpClient.post<User>(`${API_URL}${this.resource}/signup`, JSON.stringify(user), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível criar o seu usuário.');
        return throwError(() => error);
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN);
    this.router.navigateByUrl(`${API_URL}${this.resource}/login`);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN);
  }

  private showErrorSnackBar(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
