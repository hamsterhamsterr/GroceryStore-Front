import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { AppUser } from 'shared/models/app-user';

@Injectable({
  providedIn: 'root',
})
export class AuthAspService {
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    this.http
      .post('http://localhost:5075/api/Account/register', {
        email: email,
        password: password,
      })
      .subscribe((response: any) => {
        localStorage.setItem(
          'grocery-store-jwt-token',
          JSON.stringify(response.token)
        );
      });
  }

  login(email: string, password: string) {
    this.http
      .post('http://localhost:5075/api/Account/login', {
        email: email,
        password: password,
      })
      .subscribe((response: any) => {
        localStorage.setItem(
          'grocery-store-jwt-token',
          JSON.stringify(response.token)
        );
      });
  }

  logout() {
    localStorage.removeItem('grocery-store-jwt-token');
  }

  get user(): AppUser | null {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) return null;

    let decodedToken: any = jwt_decode(token);
    console.log('role', decodedToken.role);

    return {
      name: decodedToken.name,
      email: decodedToken.name,
      isAdmin: decodedToken.role == 'Admin' ? true : false,
    };
  }
}
