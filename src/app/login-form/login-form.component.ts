import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../api/UserAuthentication_service/UserAuthentication.service';
import { User } from '../api/Classes/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private login: UserAuthenticationService) { }

  currentUser: User;

  ngOnInit() {
    this.currentUser = this.login.getCurrentUser();

    /* NOT WORKING - CHECK WITH VEDRAN */
    if (this.currentUser == null) {
      console.log('(loginComp - onInit) currentUser is null - go to login');
      this.router.navigate(['login']);
    }else {
      console.log('(loginComp - onInit) currentUser is not null - go to dashboard');
      this.router.navigate(['dashboard']);
    }
  }

  loginUser(e, email, password) {

    if (this.login.userExists(email, password)) {
      this.login.setCurrentUser(email, password);
      this.router.navigate(['dashboard']);
    }else {
      this.login.addUserToLocalStorage(email, password);
      this.router.navigate(['dashboard']);
    }

  }
}
