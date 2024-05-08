import { TestBed } from '@angular/core/testing';

import { CandidatoService } from './candidato.service';
import { HttpClientModule } from '@angular/common/http';

describe('CandidatoService', () => {
  let service: CandidatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
    });
    service = TestBed.inject(CandidatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
