import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private router: Router, private user:UserService) { }

  ngOnInit() {
  }

  loginUser(e) {
    //e.preventDefault();

    //input data
    var email = e.target.elements[0].value;
    var password = e.target.elements[1].value;

    //console.log("Email: ", email);
    //console.log("Password: ", password);

    //users from localStorage
    var users = JSON.parse(localStorage.getItem('users')) || [];
    console.log("Users from LS: ", users);
    
    //filtered users from localStorage
    var filteredUsers = users.filter(function(user) {
      return user.email === email && user.password === password;
    });
    console.log("Filtered users from LC: ", filteredUsers);

    if(filteredUsers.length) {
      //user already exists in local storage
      this.user.setUserLoggedIn();
      this.router.navigate(['dashboard']);
      localStorage.setItem('currentUser', JSON.stringify({email: email, password: password}));
      this.user.setCurrentUser({email:email, password:password});

      console.log("CurrentUser from localStorage: ", localStorage.getItem('currentUser'));
      console.log("CurrentUser from service: ", this.user.getCurrentUser());
    }else {
      //user is just logged in
      var newUser = {
        email: email,
        password: password
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      console.log("Users from local storage after addition: ", JSON.parse(localStorage.getItem('users')));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      this.user.setCurrentUser(newUser);

      console.log("CurrentUser from localStorage: ", localStorage.getItem('currentUser'));
      console.log("CurrentUser from service: ", this.user.getCurrentUser());
    }

    

    


    
  }
}
