import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { AuthAspService } from 'shared/services/auth-asp.service';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent implements OnInit {
  // appUser: any;
  appUser!: AppUser | null;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    private authASP: AuthAspService,
    private shoppingCartService: ShoppingCartService,
    private shoppingCartASPService: ShoppingCartAspService
  ) {}

  async ngOnInit() {
    // this.appUser = this.authASP.user;
    this.appUser = this.authASP.user;
    this.authASP.user$.subscribe((user) => (this.appUser = user));
    // this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ = this.shoppingCartASPService.cart$;
  }

  logout() {
    this.authASP.logout();
  }
}
