import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidato } from '../../models/candidato';
import { MatSnackBar } from '@angular/material/snack-bar';
import { API_URL } from '../../api.config';

@Injectable({
  providedIn: 'root'
})

export class CandidatoService {

  resource = '/candidato';

  constructor(
    private httpClient: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCandidatos(params: string): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>(`${API_URL}${this.resource}${params}`).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível carregar os candidatos');
        return throwError(() => error);
      }));
  }

  getCandidatoById(id: number): Observable<Candidato> {
    return this.httpClient.get<Candidato>(`${API_URL}${this.resource}/${id}`).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível carregar o candidato de ID: ' + id);
        return throwError(() => error);
      }));
  }

  createCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.post<Candidato>(`${API_URL}${this.resource}`, JSON.stringify(candidato), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível criar o candidato');
        return throwError(() => error);
      }));
  }

  updateCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.put<Candidato>(`${API_URL}${this.resource}/${candidato.id}`, JSON.stringify(candidato), this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível altualizar o candidato!');
        return throwError(() => error);
      })
    );
  }

  deleteCandidato(id: number) {
    return this.httpClient.delete(`${API_URL}${this.resource}/${id}`, this.httpOptions).pipe(
      catchError(error => {
        this.showErrorSnackBar('Não foi possível deletar o candidato');
        return throwError(() => error);
      })
    );
  }

  private showErrorSnackBar(mensagem: string) {
    this.snackBar.open(mensagem, 'Fechar', { duration: 3000 });
  }
}
