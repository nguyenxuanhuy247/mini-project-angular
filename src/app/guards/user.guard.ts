import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserData } from '../shared/auth-user.model';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userDataInLocalStorage: UserData = JSON.parse(
      localStorage.getItem('userData') || '{}'
    );
    const isAdmin = this.authService.isAdmin;

    if (!isAdmin) {
      return true;
    } else {
      return this.router.navigate(['/forbidden-403']);
    }
  }
}
