import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TOKEN } from '../../api.config';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       
    if (request.url.includes('/auth/login') || request.url.includes('/auth/signup')) {
      return next.handle(request);     
    }
    
    const token = localStorage.getItem(TOKEN);

    const newCloneRequest = request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(newCloneRequest);
  }
}