import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { UserClass } from '../Classes/user';
import { WeatherClass } from '../Classes/weather';
import { LoginService } from '../login_service/login.service';
import { HeaderService } from '../header_service/header.service';

@Injectable()
export class DashboardService {

  constructor(private login: LoginService, private header: HeaderService, private http: Http) {
  }

  addToHistory(location: string) {

    const current = this.login.getCurrentUser();
    if (current.history.indexOf(location) === -1) {
      current.history.push(location);
      localStorage.setItem('currentUser', JSON.stringify(current));
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let user of users) {
      if (user.email === current.email && user.password === current.password) {
        if (user.history.indexOf(location) === -1) {
          user.history.push(location);
        }
        break;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));

    /* Test: */
    console.log('* TEST - addToHistory() *');
    console.log('** users ** from LC: ', localStorage.getItem('users'));
    console.log('** currentUser ** from LC', localStorage.getItem('currentUser'));
  }

  convertTemperature(temperature: any) {
    if (this.header.getScale() === 'C') {
      temperature = (temperature - 32) * 5 / 9;
      temperature = temperature + 'C';
    }else {
      temperature = temperature * 9 / 5 + 32;
      temperature = temperature + 'F';
    }
    return temperature;
  }
}
