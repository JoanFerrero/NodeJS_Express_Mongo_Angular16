import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

import { Category, CategoryListConfig } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor (
    private apiService: ApiService
  ) {}

  getCategories(): Observable<{category: Category[]}> {
    return this.apiService
      .get('/categories');
  }
}