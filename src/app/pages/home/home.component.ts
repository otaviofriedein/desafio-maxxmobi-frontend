import { Component } from '@angular/core';
import { Candidato,  } from '../../models/candidato';
import { CandidatoService } from '../../service/candidato/candidato.service';
import { CandidatoFilters } from '../../models/candidatoFilters';
import { MatDialog } from '@angular/material/dialog';
import { CandidatoComponent } from '../../components/candidato/candidato.component';
import { UtilService } from '../../service/utils/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  tableColumns: string[] = ['id', 'nome', 'nascimento', 'sexo', 'nota', 'logradouro', 'bairro', 'cidade', 'uf', 'options'];
  
  candidato = {} as Candidato;
  candidatoFilters = {} as CandidatoFilters;
  candidatos: Candidato[] = [];

  constructor(
    private candidatoService: CandidatoService, 
    private util: UtilService,
    public dialog: MatDialog
  ) {} 

  ngOnInit = () => this.getAllCandidatos();
  
  getAllCandidatos() {
    let params = this.getFilterCandidato();

    this.candidatoService.getCandidatos(params).subscribe((candidatos: Candidato[]) => {
      this.candidatos = candidatos;
    });
  }  

  openDialogToCreateCandidato() {  
    let candidatoComponent = this.dialog.open(CandidatoComponent);
      
      candidatoComponent.componentInstance.save.subscribe((newCandidato) => {
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
      candidatoComponent.componentInstance.save.subscribe((editedCandidato) => {
        this.updateCandidato(editedCandidato);
      });  
    })        
  }  

  clearFilterCandidato = () => location.reload();

  createCandidato = (candidato: Candidato) => 
    this.candidatoService.createCandidato(candidato);
  
  updateCandidato = (candidato: Candidato) => 
    this.candidatoService.updateCandidato(candidato);
  
  deleteCandidato = (id:number) => 
    this.candidatoService.deleteCandidato(id);  

  private getFilterCandidato(){
    let params = '';

    if (this.candidatoFilters.nome != undefined) params += `nome=${this.candidatoFilters.nome}&`;
    if (this.candidatoFilters.sexo != undefined) params += `sexo=${this.candidatoFilters.sexo}&`;
    if (this.candidatoFilters.nota != undefined) params += `nota=${this.candidatoFilters.nota}&`;
    if (this.candidatoFilters.nascimento != undefined) {
      params += `nascimento=${this.util.convertToServerDateFormat(this.candidatoFilters.nascimento)}`;
    }

    return (params.length > 0) ? '?' + params : params;
  }
  
}
