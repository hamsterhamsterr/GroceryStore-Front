import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart!: ShoppingCart;

  shipping = {
    name: 'name',
    addressLine1: 'line1',
    addressLine2: 'line2',
    city: 'city',
  };
  userSubscription!: Subscription;
  userId!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    //TODO: Get user from AuthASPService
    this.userSubscription = this.authService.user$.subscribe(
      (user) => (this.userId = user.uid)
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
