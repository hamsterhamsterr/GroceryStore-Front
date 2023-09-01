import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  map,
  of,
  publishReplay,
  shareReplay,
  tap,
} from 'rxjs';
import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartItem } from 'shared/models/shopping-cart-item';
import * as uuid from 'uuid';
import { ShippingFormComponent } from 'shopping/components/shipping-form/shipping-form.component';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartAspService {
  private cartSource = new Subject<ShoppingCart>();
  cart$ = this.cartSource.asObservable();

  constructor(private http: HttpClient) {
    this.cart$ = this.cart$.pipe(shareReplay(1));
    this.shareUpdatedCart();
  }

  addToCart(product: Product) {
    let token = localStorage.getItem('grocery-store-jwt-token');

    if (!token) {
      this.addToLocalCart(product);
      return;
    }

    this.http
      .post('http://localhost:5075/api/ShoppingCart/AddProduct', product.id, {
        headers: {
          Authentication: token,
        },
      })
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }

  removeFromCart(product: Product) {
    let token = localStorage.getItem('grocery-store-jwt-token');

    if (!token) {
      this.removeFromLocalCart(product);
      return;
    }

    this.http
      .delete('http://localhost:5075/api/ShoppingCart/' + product.id, {
        headers: {
          Authentication: token,
        },
      })
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }

  clearCart() {
    let token = localStorage.getItem('grocery-store-jwt-token');

    if (!token) {
      this.clearLocalCart();
      return;
    }

    this.http
      .delete('http://localhost:5075/api/ShoppingCart/ClearCart', {
        headers: {
          Authentication: token,
        },
      })
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }

  private shareUpdatedCart() {
    this.getCart().subscribe((cart) => {
      this.cartSource.next(cart);
    });
  }

  private getCart(): Observable<ShoppingCart> {
    let token = localStorage.getItem('grocery-store-jwt-token');

    if (!token) return this.getLocalCart();

    return this.http
      .get('http://localhost:5075/api/ShoppingCart', {
        headers: {
          Authentication: token,
        },
      })
      .pipe(
        map((cart: any) => {
          let itemsMap: any = {};
          for (let item of cart.shoppingCartItems) {
            itemsMap[item.productId] = new ShoppingCartItem({
              id: item.productId,
              title: item.product.title,
              imageUrl: item.product.imageUrl,
              price: item.product.price,
              category: item.product.category.nameIdentificator,
              quantity: item.quantity,
            });
          }

          return new ShoppingCart(itemsMap);
        })
      );
  }

  private getLocalCart(): any {
    let cartId = this.getLocalCartId();
    return this.http
      .get('http://localhost:5075/api/AnonShoppingCart/GetCart', {
        headers: { localStorageCartId: cartId },
      })
      .pipe(
        map((cart: any) => {
          let itemsMap: any = {};
          for (let item of cart.anonShoppingCartItems) {
            itemsMap[item.productId] = new ShoppingCartItem({
              id: item.productId,
              title: item.product.title,
              imageUrl: item.product.imageUrl,
              price: item.product.price,
              category: item.product.category.nameIdentificator,
              quantity: item.quantity,
            });
          }

          return new ShoppingCart(itemsMap);
        })
      );
  }

  private getLocalCartId(): string {
    let cartId = localStorage.getItem('local-cart-id');
    if (cartId) return cartId;
    localStorage.setItem('local-cart-id', uuid.v4());
    return localStorage.getItem('local-cart-id')!;
  }

  private addToLocalCart(product: Product) {
    let cartId = this.getLocalCartId();
    this.http
      .post(
        'http://localhost:5075/api/AnonShoppingCart/AddProductToCart',
        product.id,
        {
          headers: { localStorageCartId: cartId },
        }
      )
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }

  private removeFromLocalCart(product: Product) {
    let cartId = this.getLocalCartId();

    this.http
      .delete('http://localhost:5075/api/AnonShoppingCart/' + product.id, {
        headers: { localStorageCartId: cartId },
      })
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }

  private clearLocalCart() {
    let cartId = this.getLocalCartId();

    this.http
      .delete('http://localhost:5075/api/AnonShoppingCart/ClearCart', {
        headers: { localStorageCartId: cartId },
      })
      .pipe(
        tap(() => {
          this.shareUpdatedCart();
        })
      )
      .subscribe();
  }
}
