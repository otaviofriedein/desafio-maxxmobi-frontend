import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidato } from '../../models/candidato';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  url = 'http://localhost:8081/candidato'; 

  constructor(
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCandidatos(params:string): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>(this.url + params).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível carregar os candidatos');
        return throwError(() => error);
      })
    );
  }

  getCandidatoById(id: number): Observable<Candidato> {
    return this.httpClient.get<Candidato>(this.url + '/' + id).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível carregar o candidato de ID: ' + id);
        return throwError(() => error);
      })
    );
  }

  saveCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.post<Candidato>(this.url, JSON.stringify(candidato), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível criar o candidato');
        return throwError(() => error);
      })
    );
  }

  updateCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.put<Candidato>(this.url + '/' + candidato.id, JSON.stringify(candidato), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível altualizar o candidato!');
        return throwError(() => error);
      })
    );
  }

  deleteCandidato(id: number) {
    return this.httpClient.delete<Candidato>(this.url + '/' + id, this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível deletar o candidato');
        return throwError(() => error);
      })
    );
  }
  
  private showErrorSnackBar(mensagem: string) {
    this._snackBar.open(mensagem, 'Fechar', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center'
    });
  }
}
