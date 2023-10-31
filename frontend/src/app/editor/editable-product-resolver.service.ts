import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product, ProductService, UserService } from '../core';
import { catchError ,  map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditableProductResolver implements Resolve<Product> {
  constructor(
    private productService: ProductService,
    private router: Router,
    private userService: UserService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
      return this.productService.getProduct(route.params['slug'])
      .pipe(
        map(
          product => {
            if (this.userService.getCurrentUser().username === product.product.author.username) {
              return product.product
            } else {
              this.router.navigateByUrl('/');
              return false;
            }
          }
        ),
        catchError((err) => this.router.navigateByUrl('/'))
      );
  }
}