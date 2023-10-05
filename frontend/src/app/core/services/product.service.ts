import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';
import { Filters } from '../models';

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

  getProductsFilter(params: any): Observable<{product: Product[]}> {
    return this.apiService
      .get('/products', params)
  }

  getProductsName(search: string): Observable<{product: Product[]}> {
    return this.apiService
      .getProduct('/products/name/', search);
  }

  getProductsCategory(slug: string): Observable<{product: Product[]}> {
    return this.apiService
      .getProduct('/products/category/', slug);
  }

  getProduct(slug: string): Observable<{product: Product}> {
    return this.apiService
      .getProduct('/products/', slug)
  }
}