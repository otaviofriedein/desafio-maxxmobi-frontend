import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { Candidato } from '../../models/candidato';

@Component({
  selector: 'app-candidato',
  templateUrl: './candidato.component.html',
  styleUrl: './candidato.component.css'
})

export class CandidatoComponent {

  constructor(){}

  @Input() candidato!: Candidato;
  @Input() readonly: boolean = false;
  
  @Output() update = new EventEmitter<void>();
  @Output() create = new EventEmitter<Candidato>();

  ngOnInit(): void {
    if (this.candidato == null) this.candidato = {} as Candidato;
  }

  enableCreate(){
    return !this.candidato.id;
  }

  enableUpdate(){
    return this.candidato.id && !this.readonly;
  }

  onCreate(){
    this.create.emit(this.candidato);
  }

  onEdit(){
    this.update.emit();
  }

}
