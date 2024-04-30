import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

export interface CandidatoModel {
  id: number;
  nome: string;
  nascimento: string;
  sexo: string;
  nota: number;
  logradouro: string;
  bairro: string;
  cidade: string;
  uf: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  displayedColumns: string[] = ['demo-id', 'demo-nome', 'demo-nascimento', 'demo-sexo', 
  'demo-nota', 'demo-logradouro', 'demo-bairro', 'demo-cidade', 'demo-uf'
  ];
  data: CandidatoModel[] = []

  constructor(private http: HttpClient){
    this.loadCandidatos();
  }

  loadCandidatos() {
    
    this.http.get('http://localhost:8081/candidato')
      .pipe(
        catchError(error => {
          console.error('Ocorreu um erro:', error);
          return of(null); // Retornando um observable vazio ou um valor padrão, dependendo do caso.
        })
      )
      .subscribe((response:any) => {
        if (response) {
          debugger;
          this.data = response;
          console.log(response);
          // Faça algo com a resposta
        } else {
          // Lidar com a falta de resposta
        }
      });
  }
}
