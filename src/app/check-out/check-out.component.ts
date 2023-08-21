import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {
    name: 'name',
    addressLine1: 'line1',
    addressLine2: 'line2',
    city: 'city',
  };
  cart!: ShoppingCart;
  userId!: string;
  cartSubscription!: Subscription;
  userSubscription!: Subscription;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe((cart) => (this.cart = cart));
    this.authService.user$.subscribe((user) => (this.userId = user.uid));
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderService.storeOrder(order);
  }
}
