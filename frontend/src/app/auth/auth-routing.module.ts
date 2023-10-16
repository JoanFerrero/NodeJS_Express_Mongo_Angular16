import { NgModule } from '@angular/core';
import { Routes, RouterModule, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NoAuthGuard } from '../core/guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NoAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
