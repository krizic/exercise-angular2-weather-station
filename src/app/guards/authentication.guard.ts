import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../api/user_service/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private user: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.user.getUserLoggedIn()) {
        return true;
      } else {
        this.router.navigate(['login']);
        return false;
      }
  }
}
