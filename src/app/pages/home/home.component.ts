import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, of, tap } from 'rxjs';
import { CandidatoResponse } from '../../models/candidato/candidatoResponse';
import { FilterCandidatoParams } from '../../models/candidato/filterParamsCanditato';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  candidatoResponse: CandidatoResponse[] = []
  filterCandidatoParams: FilterCandidatoParams = new FilterCandidatoParams();
  tableColumns: string[] = ['colunm-id', 'colunm-nome', 'colunm-nascimento', 'colunm-sexo', 'colunm-nota', 'colunm-logradouro', 'colunm-bairro', 'colunm-cidade', 'colunm-uf'];
  
  constructor(private http: HttpClient) {
    this.loadCandidatos();
  } 

  loadCandidatos() {
    let params = this.getValuesFromFilterCandidato();   

    this.http.get<HttpResponse<any>>('http://localhost:8081/candidato' + params, { observe: 'response' })
    .pipe(
      tap((response: HttpResponse<any>) => {
        if (response.ok) {          
          this.candidatoResponse = response.body;
        } else {
          // TODO: Refactorar
        }
      }),
      catchError((error) => {
        // TODO: Refactorar
        return 'this.error = error.error.description';          
      })
    )
    .subscribe();     
  }

  getValuesFromFilterCandidato(){
    let params = '';

    if (this.filterCandidatoParams.nome != '')   params += `nome=${this.filterCandidatoParams.nome}&`;
    if (this.filterCandidatoParams.sexo != '')   params += `sexo=${this.filterCandidatoParams.sexo}&`;
    if (this.filterCandidatoParams.nota != null) params += `nota=${this.filterCandidatoParams.nota}&`;
    if (this.filterCandidatoParams.nascimento != null) {
      params += `nascimento=${this.getDateFormatted(this.filterCandidatoParams.nascimento)}`;
    }

    if (params.length > 0){
      params =  '?' + params;
    }

    return params;
  }

  getDateFormatted(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  clearFilterCandidato = () => {
    this.filterCandidatoParams = new FilterCandidatoParams();
  }
  
}
