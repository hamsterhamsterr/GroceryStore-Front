import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order } from 'shared/models/order';
import { OrderService } from 'shared/services/order.service';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCart } from 'shared/models/shopping-cart';
import jwt_decode from 'jwt-decode';
import { OrderAspService } from 'shared/services/order-asp.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css'],
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart!: ShoppingCart;

  shipping = {
    name: 'name',
    addressLine1: 'line1',
    addressLine2: 'line2',
    city: 'city',
  };
  userId!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService,
    private orderASPService: OrderAspService
  ) {}

  ngOnInit() {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (token) this.userId = (<any>jwt_decode(token)).userId;
  }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    this.orderASPService.placeOrder(order).subscribe((orderId: any) => {
      this.router.navigate(['/order-success', orderId]);
    });
  }
}
