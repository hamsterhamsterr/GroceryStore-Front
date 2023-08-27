import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryAspService } from 'shared/services/category-asp.service';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent {
  categories$: Observable<any>;
  @Input('category') category: any;

  // constructor(categoryService: CategoryService) {
  //   this.categories$ = categoryService.getAll();
  // }
  constructor(categoryService: CategoryAspService) {
    this.categories$ = categoryService.getAll();
  }
}
