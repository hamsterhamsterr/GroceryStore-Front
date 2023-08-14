import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  create(product: any) {
    let refToCreatedProduct = this.db.list('/products').push(product);
    let idOfCreatedProduct = refToCreatedProduct.key;
    this.db
      .object('/products/' + idOfCreatedProduct)
      .update({ id: idOfCreatedProduct });

    return refToCreatedProduct;
  }

  getAll(): Observable<any> {
    return this.db.list('/products').valueChanges();
  }
}
