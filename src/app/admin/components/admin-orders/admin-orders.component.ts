import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderAspService } from 'shared/services/order-asp.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders$!: Observable<any>;

  constructor(private orderASPService: OrderAspService) {
    this.orders$ = orderASPService.getOrders();
    // this.orders$ = orderService.getOrders().valueChanges();
  }
}
