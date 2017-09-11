import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

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
    // console.log("showSettings ", this.user.getUserLoggedIn());
    return this.user.getUserLoggedIn();
  }

}
