import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'shared/models/order';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { OrderAspService } from 'shared/services/order-asp.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css'],
})
export class ViewOrderComponent {
  orderId!: number;
  customerName!: string;
  datePlaced!: number;
  addressLine1!: string;
  addressLine2!: string;
  city!: string;
  orderPrice!: number;
  orderItems: {
    title: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }[] = [];

  constructor(
    private orderService: OrderAspService,
    private route: ActivatedRoute
  ) {
    // orderService.getOrderByUser().subscribe()
    let orderId = this.route.snapshot.paramMap.get('id');
    orderService.getOrderByUser(orderId!).subscribe((order) => {
      this.orderId = order.id;
      this.customerName = order.customerName;
      this.datePlaced = order.datePlaced;
      this.addressLine1 = order.addressLine1;
      this.addressLine2 = order.addressLine2;
      this.city = order.city;
      this.orderPrice = 0;
      for (let item of order.orderItems) {
        this.orderPrice += item.quantity * item.product.price;

        this.orderItems.push({
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          imageUrl: item.product.imageUrl,
        });
      }
    });
  }
}
