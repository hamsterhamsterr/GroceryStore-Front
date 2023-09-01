import { AfterViewChecked, DoCheck, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Injectable({
  providedIn: 'root',
})
export class AuthAspService {
  private userSource = new Subject<AppUser | null>();
  user$ = this.userSource.asObservable();

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    this.http
      .post('http://localhost:5075/api/Account/register', {
        email: email,
        password: password,
      })
      .subscribe((response: any) => {
        localStorage.setItem('grocery-store-jwt-token', response.token);
        this.userSource.next(this.getUser());
      });
  }

  login(email: string, password: string) {
    this.http
      .post('http://localhost:5075/api/Account/login', {
        email: email,
        password: password,
      })
      .subscribe((response: any) => {
        localStorage.setItem('grocery-store-jwt-token', response.token);
        this.userSource.next(this.getUser());
      });
  }

  logout() {
    localStorage.removeItem('grocery-store-jwt-token');
    this.userSource.next(this.getUser());
  }

  get user(): AppUser | null {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) return null;

    let decodedToken: any = jwt_decode(token);

    return {
      name: decodedToken.name,
      email: decodedToken.name,
      isAdmin: decodedToken.role == 'Admin' ? true : false,
    };
  }

  private getUser(): AppUser | null {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) return null;

    let decodedToken: any = jwt_decode(token);

    return {
      name: decodedToken.name,
      email: decodedToken.name,
      isAdmin: decodedToken.role == 'Admin' ? true : false,
    };
  }
}
