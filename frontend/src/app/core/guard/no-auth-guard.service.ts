import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '..';
import { map ,  take } from 'rxjs/operators';

export const NoAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  => {
  const userService = inject(UserService);
  const router = inject(Router);

  return userService.isAuthenticated.pipe(take(1), map(isAuth => !isAuth));
}
