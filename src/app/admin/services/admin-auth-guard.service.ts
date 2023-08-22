import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from 'shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(map((appUser: any) => appUser.isAdmin));
  }
}
