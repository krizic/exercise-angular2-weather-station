import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user_service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private user: UserService) { }

  ngOnInit() {
  }

  showSettings() {
    return this.user.getUserLoggedIn();
  }

}
