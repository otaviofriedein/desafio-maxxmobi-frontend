import { Component } from '@angular/core';
import { Candidato,  } from '../../models/candidato';
import { CandidatoService } from '../../service/candidato/candidato.service';
import { CandidatoFilters } from '../../models/candidatoFilters';
import { MatDialog } from '@angular/material/dialog';
import { CandidatoComponent } from '../../components/candidato/candidato.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  tableColumns: string[] = ['colunm-id', 'colunm-nome', 'colunm-nascimento', 'colunm-sexo', 'colunm-nota', 'colunm-logradouro', 'colunm-bairro', 'colunm-cidade', 'colunm-uf', 'colunm-options'];
  
  candidato = {} as Candidato;
  candidatoFilters = {} as CandidatoFilters;
  candidatos: Candidato[] = [];

  constructor(private candidatoService: CandidatoService, public dialog: MatDialog, private _snackBar: MatSnackBar) {} 

  ngOnInit() {
    this.getAllCandidatos();
  }

  getAllCandidatos() {
    let params = this.getFilterCandidato();

    this.candidatoService.getCandidatos(params).subscribe((candidatos: Candidato[]) => {
      this.candidatos = candidatos;
    });
  } 

  updateCandidato() {  
    this.candidatoService.updateCandidato(this.candidato).subscribe(() => {
      this._snackBar.open('SUCESSO', '', { duration: 1500 });
      setTimeout(() => { location.reload(); }, 1500);      
    });
  }

  openDialogToCreateCandidato() {  
    let candidatoComponent = this.dialog.open(CandidatoComponent);
      
      candidatoComponent.componentInstance.create.subscribe((newCandidato) => {
        this.createCandidato(newCandidato);
      });  
  }

  openDialogToViewCandidato(id:number) {  
    this.candidatoService.getCandidatoById(id).subscribe((candidato: Candidato) => {
      let candidatoComponent = this.dialog.open(CandidatoComponent);
      this.candidato = candidato;
      
      candidatoComponent.componentInstance.candidato = this.candidato;
      candidatoComponent.componentInstance.readonly = true;       
    })   
  }

  openDialogToUpdateCandidato(id:number) {
    this.candidatoService.getCandidatoById(id).subscribe((candidato: Candidato) => {
      let candidatoComponent = this.dialog.open(CandidatoComponent);
      this.candidato = candidato;
      
      candidatoComponent.componentInstance.candidato = this.candidato;
      candidatoComponent.componentInstance.update.subscribe(() => {
        this.updateCandidato();
      });  
    })        
  }

  createCandidato(candidato: Candidato) {  
    this.candidatoService.saveCandidato(candidato).subscribe(() => {
      this._snackBar.open('SUCESSO', '', { duration: 1500 });
      setTimeout(() => { location.reload(); }, 1500);
    });
  }

  deleteCandidato(id:number) {  
    this.candidatoService.deleteCandidato(id).subscribe(() => {
      this._snackBar.open('SUCESSO', '', { duration: 1500 });
      setTimeout(() => { location.reload(); }, 1500);      
    });
  }

  getFilterCandidato(){
    let params = '';

    if (this.candidatoFilters.nome != undefined) params += `nome=${this.candidatoFilters.nome}&`;
    if (this.candidatoFilters.sexo != undefined) params += `sexo=${this.candidatoFilters.sexo}&`;
    if (this.candidatoFilters.nota != undefined) params += `nota=${this.candidatoFilters.nota}&`;
    if (this.candidatoFilters.nascimento != undefined) {
      params += `nascimento=${this.getDateFormatted(this.candidatoFilters.nascimento)}`;
    }

    return (params.length > 0) ? '?' + params : params;
  }

  getDateFormatted(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
  
    return `${year}-${month}-${day}`;
  }

  clearFilterCandidato = () => {
    location.reload();
  }  
}
