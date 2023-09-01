import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';
import { AuthAspService } from 'shared/services/auth-asp.service';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserService,
    private auth: AuthService,
    router: Router,
    private authASP: AuthAspService,
    private shoppingCartAsp: ShoppingCartAspService
  ) {
    let returnUrl = localStorage.getItem('returnUrl');
    if (returnUrl) {
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    }
  }
}
