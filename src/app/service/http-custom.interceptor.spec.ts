import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { CustomInterceptor } from './http-custom.interceptor';


describe('customHttpInterceptor', () => {
  let interceptor: CustomInterceptor;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        CustomInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CustomInterceptor,
          multi: true
        }
      ]
    });

    interceptor = TestBed.inject(CustomInterceptor);
    http = TestBed.inject(HttpClient);
  });
});
