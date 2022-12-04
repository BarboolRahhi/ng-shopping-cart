import { Component } from '@angular/core';
import { CartService } from './cart/service/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'shopping-cart';

  cartSize$ = this.cartService.cartSize$;

  constructor(private cartService: CartService) {}
}
