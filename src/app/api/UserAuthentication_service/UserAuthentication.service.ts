import { Injectable } from '@angular/core';

import { User } from '../Classes/user';
import { Weather } from '../Classes/weather';
import { WeatherAPIService } from '../WeatherAPI_service/WeatherAPI.service';

@Injectable()
export class UserAuthenticationService {

  private isUserLoggedIn;

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(bool: boolean) {
    this.isUserLoggedIn = bool;
  }

  getUserLoggedIn(): boolean {
    return this.isUserLoggedIn;
  }

  getCurrentUser(): User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  userExists (email: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((u) => {
      return u.email === email && u.password === password;
    });

    return filteredUsers.length > 0 ? true : false ;
  }

  setCurrentUser(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users'));
    let user: User;
    for (let u of users) {
      if (u.email === email && u.password === password) {
         user = new User(u.email, u.password, u.history);
        break;
      }
    }

    this.setUserLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));

    /* Test: */
    console.log('* TEST - setCurrentUser() *');
    console.log('isUserLoggedIn: ', this.getUserLoggedIn());
    console.log('** users ** from LC: ', localStorage.getItem('users'));
    console.log('** currentUser ** from LC', localStorage.getItem('currentUser'));
  }

  addUserToLocalStorage(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = {
      email: email,
      password: password,
      history: []
    };
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    this.setUserLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify(user));

    /* Test: */
    console.log('* TEST - addUserToLocalStorage() *');
    console.log('isUserLoggedIn: ', this.getUserLoggedIn());
    console.log('** users ** from LC: ', localStorage.getItem('users'));
    console.log('** currentUser ** from LC', localStorage.getItem('currentUser'));
  }
}
