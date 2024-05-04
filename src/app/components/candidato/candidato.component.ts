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
  @Input() editable!: boolean;
  
  @Output() update = new EventEmitter<void>();

  error!: string;

  onEdit(){
    this.update.emit();
  }
}
