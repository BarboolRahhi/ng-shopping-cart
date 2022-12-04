import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartItem } from './model/cart-item';
import { CartService } from './service/cart.service';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  cartItems$ = this.cartService.cartItems$;
  subTotal$ = this.cartService.subTotal$;
  deliveryFee$ = this.cartService.deliveryFee$;
  tax$ = this.cartService.tax$;
  total$ = this.cartService.total$;
  isCartEmpty$ = this.cartService.cartSize$.pipe(map((size) => size === 0));

  constructor(private cartService: CartService) {}

  onQuantitySelection(item: CartItem, quantity: number) {
    this.cartService.updateCart(item, quantity);
  }

  removeItem(item: CartItem) {
    console.log('DELETE');
    this.cartService.removeFromCart(item);
  }
}
