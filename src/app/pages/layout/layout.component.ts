import { Component } from '@angular/core';
import { AutenticacaoService } from '../../service/autenticacao/autenticacao.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  
  constructor(private autenticacaoService: AutenticacaoService){};

  onLogout(){
    this.autenticacaoService.logout();
  }
}
