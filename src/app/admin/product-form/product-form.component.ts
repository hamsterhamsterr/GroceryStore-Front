import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  categories$: Observable<any>;

  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getCategories();
    this.categories$.subscribe((list) => {
      console.log(list);
    });
  }
}
