import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  appUser: any;

  constructor(private auth: AuthService) {
    auth.appUser$.subscribe((appUser) => (this.appUser = appUser));
  }

  logout() {
    this.auth.logout();
  }
}
