import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<any>;
  product: any = {};

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if (id)
      this.productService
        .get(id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
  }

  save(product: any) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
}
