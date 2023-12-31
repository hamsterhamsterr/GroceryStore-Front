import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAspService } from 'shared/services/auth-asp.service';

@Component({
  selector: 'sign-up-asp',
  templateUrl: './sign-up-asp.component.html',
  styleUrls: ['./sign-up-asp.component.css'],
})
export class SignUpAspComponent {
  constructor(private authAspService: AuthAspService, private router: Router) {}

  registerUser(form: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    this.authAspService.register(
      form.firstName,
      form.lastName,
      form.email,
      form.password
    );
    this.router.navigate(['/']);
  }
}
