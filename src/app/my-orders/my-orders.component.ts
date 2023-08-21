import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css'],
})
export class MyOrdersComponent {
  orders$: Observable<any>;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap((u: any) => {
        return orderService.getOrdersByUser(u.uid).valueChanges();
      })
    );
  }
}
