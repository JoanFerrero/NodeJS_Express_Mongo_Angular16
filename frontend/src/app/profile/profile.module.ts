import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileLikesComponent } from './profile-likes/profile-likes.component';
import { ProfileProductsComponent } from './profile-products/profile-products.component';
import { ProfileFollowComponent } from './profile-follow/profile-follow.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ProfileLikesComponent,
    ProfileProductsComponent,
    ProfileFollowComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }