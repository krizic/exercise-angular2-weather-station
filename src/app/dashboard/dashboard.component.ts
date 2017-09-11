import { Component, OnInit } from '@angular/core';

import { UserService } from '../api/user_service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  email = 'anonymous@gmail.com';

  constructor(private user: UserService) {
   }

  ngOnInit() {
    this.email = this.user.getCurrentUser().email;
  }
}
