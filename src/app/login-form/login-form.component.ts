import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../api/user_service/user.service';
import { LoginService } from '../api/login_service/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private user: UserService, private login: LoginService) { }

  ngOnInit() {
  }

  loginUser(e, email, password) {

    if (this.login.userExists(email, password)) {

      this.router.navigate(['dashboard']);
      this.login.setCurrentUser(email, password);

    }else {

      this.login.addUserToLocalStorage(email, password);
      this.login.setCurrentUser(email, password);
      this.router.navigate(['dashboard']);

    }

  }
}
