import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    const token = localStorage.getItem('token');
    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    // Implementação do interceptor
    return next.handle(newCloneRequest);
  }
}