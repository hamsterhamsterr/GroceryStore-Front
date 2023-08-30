import { Component } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
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
    //TODO: Get user from authASPService
    this.orders$ = authService.user$.pipe(
      switchMap((u: any) => {
        return orderService.getOrdersByUser(u.uid).valueChanges();
      })
    );
  }
}
