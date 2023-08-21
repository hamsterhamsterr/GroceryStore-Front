import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderService } from 'shared/services/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css'],
})
export class AdminOrdersComponent {
  orders$: Observable<any>;

  constructor(private orderService: OrderService) {
    this.orders$ = orderService.getOrders().valueChanges();
  }
}
