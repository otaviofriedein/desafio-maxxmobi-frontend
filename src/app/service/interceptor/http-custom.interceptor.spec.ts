import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomInterceptor } from './http-custom.interceptor';


describe('customHttpInterceptor', () => {
  let interceptor: CustomInterceptor;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ],
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

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
