import { Component } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { OrderAspService } from 'shared/services/order-asp.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<any>;

  constructor(private orderASPService: OrderAspService) {
    this.orders$ = orderASPService.getOrdersByUser();
  }
}
