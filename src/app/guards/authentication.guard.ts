import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { LoginService } from '../api/login_service/login.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.login.getUserLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
}
