import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable ,  throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) {}

  private formatErrors(error: any) {
    return  throwError(() => error.error);
  }
  
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(catchError(this.formatErrors));
  }

  getNormal(path: string, slug: string): Observable<any> {
    return this.http.get(`${environment.api_url}${path}${slug}`)
      .pipe(catchError(this.formatErrors));
  }
}