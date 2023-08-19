import { Product } from './product';

export class ShoppingCartItem {
  id!: string;
  title!: string;
  imageUrl!: string;
  price!: number;
  category!: string;
  quantity!: number;

  get totalPrice() {
    return this.price * this.quantity;
  }
}
