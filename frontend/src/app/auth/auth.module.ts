import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: []
})
export class AuthModule {}
