import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginService } from './api/login_service/login.service';
import { DashboardService } from './api/dashboard_service/dashboard.service';
import { HeaderService } from './api/header_service/header.service';

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
    RouterModule.forRoot(appRoutes),
    HttpModule
  ],
  providers: [LoginService, DashboardService, HeaderService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
