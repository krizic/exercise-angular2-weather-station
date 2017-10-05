import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserAuthenticationService } from '../api/UserAuthentication_service/UserAuthentication.service';
import { ChangeScaleService } from '../api/ChangeScale_service/ChangeScale.service';
import { User } from '../api/Classes/user';
import { WeatherAPIService } from '../api/WeatherAPI_service/WeatherAPI.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  currentScale: string;

  constructor(private router: Router,
              private login: UserAuthenticationService,
              private dashboard: WeatherAPIService,
              private header: ChangeScaleService) {
    this.currentScale = 'Celsius';
  }

  ngOnInit() {
    this.currentUser = this.login.getCurrentUser();
  }

  showSettings(): boolean {
    return this.login.getUserLoggedIn();
  }

  changeScale() {
    if (this.header.getScale() === 'C') {
      this.header.setScale('F');
      this.currentScale = 'Fahrenheit';
    } else {
      this.header.setScale('C');
      this.currentScale = 'Celsius';
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.login.setUserLoggedIn(false);
    this.router.navigate(['login']);
  }
}
