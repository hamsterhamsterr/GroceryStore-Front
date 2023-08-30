import { Component, Input } from '@angular/core';
import { Product } from 'shared/models/product';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ShoppingCartAspService } from 'shared/services/shopping-cart-asp.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input('product') product!: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(
    private cartService: ShoppingCartService,
    private cartASPService: ShoppingCartAspService
  ) {}

  addToCart() {
    // this.cartService.addToCart(this.product);
    this.cartASPService.addToCart(this.product);
  }
}
