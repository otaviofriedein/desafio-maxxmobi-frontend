import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private http: HttpClient){
    this.loadCandidatos();
  }

  loadCandidatos() {
    debugger;
    this.http.get('http://localhost:8081/candidato')
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          return of(null); // Retornando um observable vazio ou um valor padrão, dependendo do caso.
        })
      )
      .subscribe(response => {
        if (response) {
          console.log(response);
          // Faça algo com a resposta
        } else {
          // Lidar com a falta de resposta
        }
      });
  }
}
