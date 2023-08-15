import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products$;
  categories$: Observable<any>;

  constructor(
    productService: ProductService,
    categoryService: CategoryService
  ) {
    this.products$ = productService.getAll();
    this.categories$ = categoryService.getAll();
  }
}
