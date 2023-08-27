import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryAspService } from './category-asp.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsAspService {
  constructor(
    private http: HttpClient,
    private categoryService: CategoryAspService
  ) {}

  create(product: any) {
    this.categoryService
      .getByNameIdentificator(product.category)
      .subscribe((category: any) => {
        // add category id to product
        product.categoryId = category.id;
        this.http
          .post('http://localhost:5075/api/Products', product)
          .subscribe();
      });
  }

  getAll(): Observable<any> {
    return this.http.get('http://localhost:5075/api/Products').pipe(
      map((products: any) => {
        for (let product of products) {
          // replace category object in product to a string
          let categoryName = product.category.nameIdentificator;
          product.category = categoryName;
        }
        return products;
      })
    );
  }

  get(productId: string): Observable<any> {
    return this.http
      .get('http://localhost:5075/api/Products/' + productId)
      .pipe(
        map((product: any) => {
          // replace category object in product to a string
          product.category = product.category.nameIdentificator;
          return product;
        })
      );
  }

  update(productId: string, product: any) {
    this.categoryService
      .getByNameIdentificator(product.category)
      .subscribe((category: any) => {
        // add category id to product
        product.categoryId = category.id;
        product.id = productId;
        this.http
          .put('http://localhost:5075/api/Products', product)
          .subscribe();
      });
  }

  delete(productId: string) {
    console.log(productId);
    this.http
      .delete('http://localhost:5075/api/Products/' + productId)
      .subscribe((r) => console.log(r));
  }
}
