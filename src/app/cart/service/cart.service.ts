import { Injectable } from '@angular/core';
import {
  combineLatest,
  map,
  scan,
  shareReplay,
  Subject,
  startWith,
} from 'rxjs';
import { Action } from '../model/action';
import { CartItem } from '../model/cart-item';
import { Product } from '../../product/model/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private itemSubject = new Subject<Action<CartItem>>();
  itemAction$ = this.itemSubject.asObservable();

  cartItems$ = this.itemAction$.pipe(
    scan(
      (items, itemAction) => this.modifyCart(items, itemAction),
      [] as CartItem[]
    ),
    shareReplay(1)
  );

  subTotal$ = this.cartItems$.pipe(
    map((item) =>
      item.reduce(
        (subTotal, val) => subTotal + val.quantity * val.product.price,
        0
      )
    )
  );

  deliveryFee$ = this.subTotal$.pipe(
    map((subTotal) => {
      if (subTotal === 0) return 0;
      return subTotal < 1000 ? 30 : 120;
    })
  );

  tax$ = this.subTotal$.pipe(
    map((subTotal) => Math.round((subTotal / 100) * 18))
  );

  total$ = combineLatest([this.subTotal$, this.deliveryFee$, this.tax$]).pipe(
    map(([subTotal, deliveryFee, tax]) => subTotal + deliveryFee + tax)
  );

  cartSize$ = this.cartItems$.pipe(
    map((item) => item.length),
    startWith(0)
  );

  private modifyCart(
    items: CartItem[],
    { item, actionType }: Action<CartItem>
  ): CartItem[] {
    console.log('modify cart');

    if (actionType === 'ADD') {
      const existItem = this.getExistItem(items, item.product.id);

      if (existItem) {
        existItem.quantity = existItem.quantity + 1;
        existItem.price = existItem.product.price * existItem.quantity;
        return [...items];
      }

      item.price = item.product.price;
      return [...items, item];
    } else if (actionType === 'UPDATE') {
      const existItem = this.getExistItem(items, item.product.id);
      if (existItem) {
        existItem.quantity = item.quantity;
        existItem.price = existItem.product.price * item.quantity;
      }
      return [...items];
    } else if (actionType == 'DELETE') {
      console.log('DELETE');
      return items.filter(
        (existItem) => existItem.product.id !== item.product.id
      );
    }

    return [...items];
  }

  private getExistItem(items: CartItem[], productId: number) {
    return items.find((existItem) => existItem.product.id === productId);
  }

  addToCart(product: Product) {
    this.itemSubject.next({
      item: { product: product, quantity: 1 },
      actionType: 'ADD',
    } as Action<CartItem>);
    console.log('Item added to card');
  }

  removeFromCart(item: CartItem) {
    this.itemSubject.next({
      item: { product: item.product, quantity: 0 },
      actionType: 'DELETE',
    } as Action<CartItem>);
  }

  updateCart(item: CartItem, quantity: number) {
    this.itemSubject.next({
      item: { product: item.product, quantity: quantity },
      actionType: 'UPDATE',
    } as Action<CartItem>);
  }
}
