import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly PRODUCT_URL = 'https://fakestoreapi.com/products';

  constructor(private httpClient: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.PRODUCT_URL).pipe(
      tap((i) => {
        debugger;
        console.log(i);
      })
    );
  }
}
