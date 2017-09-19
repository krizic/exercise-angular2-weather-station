import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../api/login_service/login.service';
import { HeaderService } from '../api/header_service/header.service';
import { UserClass } from '../api/Classes/user';
import { DashboardService } from '../api/dashboard_service/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: UserClass;
  currentScale: string;

  constructor(private router: Router,
              private login: LoginService,
              private dashboard: DashboardService,
              private header: HeaderService) {
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
