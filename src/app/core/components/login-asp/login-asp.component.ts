import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAspService } from 'shared/services/auth-asp.service';

@Component({
  selector: 'login-asp',
  templateUrl: './login-asp.component.html',
  styleUrls: ['./login-asp.component.css'],
})
export class LoginASPComponent {
  invalidEmailOrAndPassword: boolean = false;

  constructor(private authAspService: AuthAspService, private router: Router) {}

  loginUser(form: { email: string; password: string }) {
    this.authAspService.login(
      form.email,
      form.password,
      () => this.router.navigate(['/']),
      () => (this.invalidEmailOrAndPassword = true)
    );
    // this.router.navigate(['/']);
  }

  closeInvalidEmailOrAndPasswordAlert() {
    this.invalidEmailOrAndPassword = false;
  }
}
