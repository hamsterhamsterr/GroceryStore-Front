import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthAspService {
  // user$: Observable<any>;

  constructor(private http: HttpClient) {
    let token = localStorage.getItem('grocery-store-jwt-token');
  }

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
}
