import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { Candidato } from '../../models/candidato';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrl: './candidato.component.css'
})

export class CandidatoComponent {

  constructor(private _snackBar: MatSnackBar){}

  @Input() candidato!: Candidato;
  @Input() readonly: boolean = false;
  
  @Output() save = new EventEmitter<Candidato>();

  formCandidato: FormGroup = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl({value:'', disabled: this.readonly}, Validators.required),
    nascimento: new FormControl({value:'', disabled: this.readonly}, Validators.required),
    sexo: new FormControl({value:'', disabled: this.readonly}, Validators.required),
    nota: new FormControl({value:'', disabled: this.readonly}, Validators.required),
    logradouro: new FormControl({value:'', disabled: this.readonly}),
    bairro: new FormControl({value:'', disabled: this.readonly}),
    cidade: new FormControl({value:'', disabled: this.readonly}),
    uf: new FormControl({value:'', disabled: this.readonly}),    
  });;

  ngOnInit(): void {

    if (this.candidato != null) this.formCandidato.patchValue(this.candidato);
  }

  onSave(){
    if (this.formCandidato.valid){
      this.candidato = this.formCandidato.value as Candidato;
      this.save.emit(this.candidato);
    }
    else{
      this._snackBar.open('Formulário inválido!', 'Fechar', { duration: 3000 });   
    }    
  }   
}
