import { TestBed } from '@angular/core/testing';
import { AutenticacaoService } from './autenticacao.service';
import { HttpClientModule } from '@angular/common/http';

describe('AutenticacaoService', () => {
  let service: AutenticacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({ 
      imports:[
      HttpClientModule
    ]});
    service = TestBed.inject(AutenticacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
