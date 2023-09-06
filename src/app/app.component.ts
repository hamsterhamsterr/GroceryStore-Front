import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAspService } from 'shared/services/auth-asp.service';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
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
