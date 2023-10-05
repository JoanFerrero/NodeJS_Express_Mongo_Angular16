import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

import { Carousel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {
  constructor (
    private apiService: ApiService
  ) {}

  getCarouselCategory(): Observable<{category: Carousel[]}> {
    return this.apiService
      .get('/carousel/category');
  }

  getCarouselProduct(slug: string): Observable<{product: Carousel}> {
    return this.apiService
      .getNormal('/carousel/product/', slug);
  }
}