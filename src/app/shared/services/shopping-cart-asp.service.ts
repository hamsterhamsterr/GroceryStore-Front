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

    if (!token) throw Error('Jwt token doesnt exist in local storage');
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

    if (!token) throw Error('Jwt token doesnt exist in local storage');
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

    if (!token) throw Error('Jwt token doesnt exist in local storage');

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

    if (!token) throw Error('Jwt token doesnt exist in local storage');

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
}
