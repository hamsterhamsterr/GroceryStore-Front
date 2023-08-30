import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private shoppingCartASPService: ShoppingCartAspService
  ) {}

  async ngOnInit() {
    // this.cart$ = await this.shoppingCartService.getCart();
    this.cart$ = this.shoppingCartASPService.cart$;
  }
}
