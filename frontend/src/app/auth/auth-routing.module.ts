import { NgModule, inject } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from './no-auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    //canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(NoAuthGuard).canActivate()]
  },
  {
    path: 'register',
    component: AuthComponent,
    //canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
