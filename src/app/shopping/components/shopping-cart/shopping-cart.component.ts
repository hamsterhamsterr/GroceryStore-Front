import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;

  constructor(private shoppingCartASPService: ShoppingCartAspService) {}

  async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ = this.shoppingCartASPService.cart$;
  }

  clearCart() {
    // this.shoppingCartService.clearCart();
    this.shoppingCartASPService.clearCart();
  }
}
