import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { UserAuthenticationService } from './api/UserAuthentication_service/UserAuthentication.service';
import { WeatherAPIService } from './api/WeatherAPI_service/WeatherAPI.service';
import { ChangeScaleService } from './api/ChangeScale_service/ChangeScale.service';

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
  providers: [UserAuthenticationService, WeatherAPIService, ChangeScaleService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
