import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription, map, of } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AuthAspService } from './auth-asp.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private authASP: AuthAspService
  ) {}

  canActivate(route: any, state: RouterStateSnapshot): boolean {
    let user = this.authASP.user;

    if (user) return true;

    this.router.navigate(['/login-asp'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
