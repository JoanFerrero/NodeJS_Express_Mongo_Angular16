import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../core';
import { map ,  take } from 'rxjs/operators';

@Injectable()
class PermissionsService {

  constructor(    
    private router: Router,
    private userService: UserService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
  }
}
export const NoAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  return inject(PermissionsService).canActivate(route, state);
}
