import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<any>;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe((list) => {
      console.log(list);
    });
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
