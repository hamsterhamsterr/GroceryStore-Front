import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ShoppingCartService } from './shopping-cart.service';
import { user } from '@angular/fire/auth';
import { ShoppingCartAspService } from './shopping-cart-asp.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService,
    private shoppingCartASPService: ShoppingCartAspService
  ) {}

  async placeOrder(order: any) {
    let result = await this.db.list('/orders').push(order);
    // this.shoppingCartService.clearCart();
    this.shoppingCartASPService.clearCart();
    return result;
  }

  getOrders() {
    return this.db.list('/orders');
  }

  getOrdersByUser(userId: string): any {
    return this.db.list('/orders', (ref) =>
      ref.orderByChild('userId').equalTo(userId)
    );
  }
}
