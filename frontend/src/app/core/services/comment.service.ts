import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Product } from '../models/product.model';
import { Comment, Filters } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor (
    private apiService: ApiService
  ) {}

  getAll(slug: string): Observable<{comments: Comment[]}> {
    return this.apiService.get('/product/' + slug + '/comment')
  }

  create(slug: String, data: any): Observable<any> {
    return this.apiService.post('/product/' + slug + '/comment', data);
  }
}