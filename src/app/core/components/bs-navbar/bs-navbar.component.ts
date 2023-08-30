import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthAspService } from 'shared/services/auth-asp.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  appUser: any;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private authASP: AuthAspService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.appUser = this.authASP.user;

    this.cart$ = await this.shoppingCartService.getCart();
  }

  logout() {
    this.authASP.logout();
  }
}
