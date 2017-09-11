import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import { AuthenticationGuard } from './authentication.guard';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthenticationGuard],
    component: DashboardComponent
  }, 
  {
    path: 'login', 
    component: LoginFormComponent
  }, 
  { path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}
];


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
