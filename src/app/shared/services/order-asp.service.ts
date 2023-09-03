import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartAspService } from './shopping-cart-asp.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderAspService {
  constructor(
    private http: HttpClient,
    private shoppingCartASPService: ShoppingCartAspService
  ) {}

  placeOrder(order: any) {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) throw Error('Jwt token doesnt exist in local storage');

    let shipping = order.shipping;

    let orderItems: any[] = [];
    for (let orderItem of order.items) {
      orderItems.push({
        productId: orderItem.product.id,
        quantity: orderItem.quantity,
      });
    }

    return this.http
      .post(
        'http://localhost:5075/api/Orders',
        {
          addressLine1: shipping.addressLine1,
          addressLine2: shipping.addressLine2,
          city: shipping.city,
          customerName: shipping.name,
          orderItems: orderItems,
        },
        {
          headers: { Authentication: token },
        }
      )
      .pipe(tap(() => this.shoppingCartASPService.clearCart()));
  }

  getOrders() {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) throw Error('Jwt token doesnt exist in local storage');

    return this.http.get('http://localhost:5075/api/Orders/GetAllOrders', {
      headers: { Authentication: token },
    });
  }

  getOrdersByUser(): any {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) throw Error('Jwt token doesnt exist in local storage');

    return this.http.get('http://localhost:5075/api/Orders/GetOrdersByUser', {
      headers: { Authentication: token },
    });
  }

  getOrderByUser(orderId: string): Observable<any> {
    let token = localStorage.getItem('grocery-store-jwt-token');
    if (!token) throw Error('Jwt token doesnt exist in local storage');

    return this.http.get('http://localhost:5075/api/Orders/' + orderId, {
      headers: { Authentication: token },
    });
  }
}
