import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, switchMap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap((user) =>
        this.userService.get(user.uid).pipe(map((appUser) => appUser.isAdmin))
      )
    );
  }
}
