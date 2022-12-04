import { Product } from 'src/app/product/model/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}
