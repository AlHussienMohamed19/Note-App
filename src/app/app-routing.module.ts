import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './Layout/blank-layout/blank-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuard } from './Core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: BlankLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', canActivate:[AuthGuard], component: HomeComponent, title: 'Home' }
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' }
    ]
  },
  {
    path: '**', component: NotFoundComponent, title: 'NotFound'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled' , useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
