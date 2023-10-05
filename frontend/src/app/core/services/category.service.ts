import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor (
    private apiService: ApiService
  ) {}

  getCategories(params: any): Observable<{category: Category[]}> {
    return this.apiService
      .get('/categories', params);
  }

  getAllCategories(): Observable<{category: Category[]}> {
    return this.apiService
      .get('/categories');
  }
}