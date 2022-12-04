import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductService } from './service/product.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Product } from './model/product.model';
import { CartService } from '../cart/service/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products$ = this.productService.fetchProducts();

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
