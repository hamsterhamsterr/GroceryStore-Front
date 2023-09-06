import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css'],
})
export class ProductQuantityComponent {
  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartASPService: ShoppingCartAspService) {}

  addToCart() {
    // this.cartService.addToCart(this.product);
    this.cartASPService.addToCart(this.product);
  }

  removeFromCart() {
    // this.cartService.removeFromCart(this.product);
    this.cartASPService.removeFromCart(this.product);
  }
}
