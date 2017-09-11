import { Injectable } from '@angular/core';

import { UserService } from '../user_service/user.service';

@Injectable()
export class LoginService {

  constructor(private user: UserService) { }

  getUserExistance(filteredUsers) {

  }

  setCurrentUser(email, password) {
    this.user.setUserLoggedIn();
    localStorage.setItem('currentUser', JSON.stringify({email: email, password: password}));
    this.user.setCurrentUser({email: email, password: password});
  }

  addUserToLocalStorage(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = {
      email: email,
      password: password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log(users);
  }

  userExists (email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((user) => {
      return user.email === email && user.password === password;
    });
    console.log(users);

    return filteredUsers.length > 0 ? true : false ;
  }

}
