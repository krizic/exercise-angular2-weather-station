import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { User } from '../Classes/user';
import { Weather } from '../Classes/weather';
import { UserAuthenticationService } from '../UserAuthentication_service/UserAuthentication.service';
import { ChangeScaleService } from '../ChangeScale_service/ChangeScale.service';

@Injectable()
export class WeatherAPIService {

  constructor(private login: UserAuthenticationService, private header: ChangeScaleService, private http: Http) {
  }

  saveLocation(location: string) {

    const current = this.login.getCurrentUser();
    if (current.history.indexOf(location) === -1) {
      current.history.push(location);
      localStorage.setItem('currentUser', JSON.stringify(current));
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    // users.forEach((user) => {
    //   if (user.email === current.email && user.password === current.password) {
    //     if (user.history.some(historyLocation => historyLocation === location)) {
    //       users.history.push(location);
    //     }
    //     break;
    //   }
    // });
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

  removeLocation(location: string) {
    const current = this.login.getCurrentUser();
    const locationIndex = current.history.indexOf(location);
    current.history.splice(locationIndex, 1);

    localStorage.setItem('currentUser', JSON.stringify(current));

    /* redefine */
    const users = JSON.parse(localStorage.getItem('users')) || [];
    for (let user of users) {
      if (user.email === current.email && user.password === current.password) {
        user.history.splice(locationIndex, 1);
        break;
      }
    }
    localStorage.setItem('users', JSON.stringify(users));
   }

  convertTemperature(temperature: any) {
    if (this.header.getScale() === 'C') {
      temperature = (temperature - 32) * 5 / 9;
      temperature = temperature + ' C';
    }else {
      temperature = temperature * 9 / 5 + 32;
      temperature = temperature + ' F';
    }
    return temperature;
  }
}
