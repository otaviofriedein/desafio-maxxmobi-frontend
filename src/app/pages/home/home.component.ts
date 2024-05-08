import { Component, OnInit } from '@angular/core';
import { Candidato, } from '../../models/candidato';
import { CandidatoService } from '../../service/candidato/candidato.service';
import { CandidatoFilters } from '../../models/candidatoFilters';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../service/utils/util.service';
import { CandidatoComponent } from './candidato/candidato.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {

  tableColumns: string[] = ['id', 'nome', 'nascimento', 'sexo', 'nota', 'logradouro', 'bairro', 'cidade', 'uf', 'options'];

  candidato = {} as Candidato;
  candidatoFilters = {} as CandidatoFilters;
  candidatos: Candidato[] = [];

  constructor(
    private candidatoService: CandidatoService,
    private util: UtilService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAllCandidatos();
  }

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

  openDialogToViewCandidato(id: number) {
    this.candidatoService.getCandidatoById(id).subscribe((candidato: Candidato) => {
      let candidatoComponent = this.dialog.open(CandidatoComponent);
      this.candidato = candidato;

      candidatoComponent.componentInstance.candidato = this.candidato;
      candidatoComponent.componentInstance.readonly = true;
    })
  }

  openDialogToUpdateCandidato(id: number) {
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
    this.candidatoService.createCandidato(candidato).subscribe((response => {
      this.showSuccessSnackBarAndReload('Candidato criado com sucesso');
      return response;
    }));

  updateCandidato = (candidato: Candidato) =>
    this.candidatoService.updateCandidato(candidato).subscribe((response => {
      this.showSuccessSnackBarAndReload('Candidato atualizado com sucesso');
      return response;
    }));

  deleteCandidato = (id: number) =>
    this.candidatoService.deleteCandidato(id).subscribe((response => {
      this.showSuccessSnackBarAndReload('Candidato excluído com sucesso');
      return response;
    }));

  getFilterCandidato() {
    let params = '';

    if (this.candidatoFilters.nome != undefined && this.candidatoFilters.nome != '') params += `nome=${this.candidatoFilters.nome}&`;
    if (this.candidatoFilters.sexo != undefined) params += `sexo=${this.candidatoFilters.sexo}&`;
    if (this.candidatoFilters.nota != undefined) params += `nota=${this.candidatoFilters.nota}&`;
    if (this.candidatoFilters.nascimento != undefined) {
      params += `nascimento=${this.util.convertToServerDateFormat(this.candidatoFilters.nascimento)}&`;
    }
    if (this.candidatoFilters.sortBy != undefined) params += `sortBy=${this.candidatoFilters.sortBy.value}&order=${this.candidatoFilters.sortBy.direction}`;

    return (params.length > 0) ? '?' + params : params;
  }

  showSuccessSnackBarAndReload(mensagem: string) {
    this.snackBar.open(mensagem, '', { duration: 3000 });
    setTimeout(() => { location.reload(); }, 3000);
  }
}
