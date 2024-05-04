import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Candidato } from '../../models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  url = 'http://localhost:8081/candidato'; 

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getCandidatos(params:string): Observable<Candidato[]> {
    return this.httpClient.get<Candidato[]>(this.url + params).pipe(catchError(this.handleError))
  }

  getCandidatoById(id: number): Observable<Candidato> {
    return this.httpClient.get<Candidato>(this.url + '/' + id).pipe(catchError(this.handleError))
  }

  saveCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.post<Candidato>(this.url, JSON.stringify(candidato), this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  updateCandidato(candidato: Candidato): Observable<Candidato> {
    return this.httpClient.put<Candidato>(this.url + '/' + candidato.id, JSON.stringify(candidato), this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  deleteCandidato(candidato: Candidato) {
    return this.httpClient.delete<Candidato>(this.url + '/' + candidato.id, this.httpOptions)
      .pipe(catchError(this.handleError))
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) { // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else { // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `mensagem: ${error.message}`;
    }
    
    console.log(errorMessage);
    return throwError(()=> errorMessage);
  };
}
