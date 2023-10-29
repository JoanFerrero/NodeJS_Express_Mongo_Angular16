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

  getProductsFilter(params: any): Observable<{product: Product[], product_count: number}> {
    return this.apiService
      .get('/products', params)
  }

  getProductsName(search: string): Observable<{product: Product[]}> {
    return this.apiService
      .getNormal('/products/name/', search);
  }

  getProduct(slug: string): Observable<{product: Product}> {
    return this.apiService
      .getNormal('/products/', slug)
  }

  favorite(slug: string): Observable<{product: Product[], product_count: number}> {
    return this.apiService.post('/products/' + slug + '/favorite');
  }

  unfavorite(slug: string): Observable<{product: Product[], product_count: number}> {
    return this.apiService.delete('/products/' + slug + '/favorite');
  }

  all_products_user(username: string): Observable<{product: Product[]}>  {
    return this.apiService.get('/products/' + username + '/products');
  }

  all_products_user_like(): Observable<{product: Product[]}>  {
    return this.apiService.get('/user/likes');
  }
}