import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './service/autenticacao/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
},
{
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
},
{
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
},
{
    path: '**',
    component: LoginComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
