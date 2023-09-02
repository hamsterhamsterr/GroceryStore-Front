import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from 'shared/services/user.service';
import { AuthAspService } from 'shared/services/auth-asp.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private authASP: AuthAspService,
    private router: Router
  ) {}

  canActivate(): boolean {
    let user = this.authASP.user;
    if (user!.isAdmin) return true;
    this.router.navigate(['/']);
    return false;
  }
}
