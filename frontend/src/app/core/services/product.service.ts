import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor (
    private apiService: ApiService
  ) {}

  getProducts(): Observable<{product: Product[]}> {
    return this.apiService
      .get('/products');
  }

  getProductsCategory(slug: string): Observable<{product: Product[]}> {
    return this.apiService
      .getProducts('/products/category/', slug);
  }
}