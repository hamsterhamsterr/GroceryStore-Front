import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'shared/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ProductsAspService } from 'shared/services/products-asp.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements AfterViewInit, OnDestroy {
  products!: Product[];
  filteredProducts!: MatTableDataSource<Product>;
  displayedColumns: string[] = ['position', 'title', 'price', 'edit'];

  subscription: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productASPService: ProductsAspService) {
    this.filteredProducts! = new MatTableDataSource();
    this.subscription = this.productASPService
      .getAll()
      .subscribe(
        (products) => (this.filteredProducts.data = this.products = products)
      );
  }

  filter(query: string) {
    this.filteredProducts.data = query
      ? this.products.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
  }

  ngAfterViewInit() {
    this.filteredProducts.paginator = this.paginator;
    this.filteredProducts.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
