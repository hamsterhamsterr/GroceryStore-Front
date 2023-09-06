import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { CategoryAspService } from 'shared/services/category-asp.service';
import { ProductsAspService } from 'shared/services/products-asp.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<any>;
  product: any = {};
  id: any;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryAspService,
    private productASPService: ProductsAspService,
    private router: Router
  ) {
    this.categories$ = categoryService.getAll();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      this.productASPService
        .get(this.id)
        .pipe(take(1))
        .subscribe((p) => (this.product = p));
  }

  save(product: any) {
    // if (this.id) this.productService.update(this.id, product);
    // else this.productService.create(product);
    if (this.id) this.productASPService.update(this.id, product);
    else this.productASPService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    // this.productService.delete(this.id);
    this.productASPService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
