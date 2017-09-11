import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  email = "anonymous@gmail.com";
  password = "***";

  constructor(private user: UserService) {
    
   }

  ngOnInit() {
    this.email = this.user.getCurrentUser().email;
    this.password = this.user.getCurrentUser().password;
    //console.log(this.user.getUserLoggedIn());
  }
}
