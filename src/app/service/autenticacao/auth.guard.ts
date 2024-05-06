import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AutenticacaoService } from "./autenticacao.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private authService: AutenticacaoService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigate(['/login']); // Redireciona para a página de login se não estiver autenticado
            return false;
        }
    }
}