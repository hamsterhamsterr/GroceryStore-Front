import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category!: any;
  cart: any;
  subscription!: Subscription;

  constructor(
    productService: ProductService,
    route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    productService
      .getAll()
      .pipe(
        switchMap((products) => {
          this.products = products;
          return route.queryParamMap;
        })
      )
      .subscribe((params) => {
        this.category = params.get('category');

        this.filteredProducts = this.category
          ? this.products.filter((p) => p.category === this.category)
          : this.products;
      });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).subscribe(
      (cart) => {
        this.cart = cart;
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
