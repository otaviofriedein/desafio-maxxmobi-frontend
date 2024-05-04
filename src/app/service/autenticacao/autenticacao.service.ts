import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  url = 'http://localhost:8081/auth'; 

  constructor(private httpClient: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  signUp() {
   
  }

  login() {
   
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(this.url + '/login');
  }
}
