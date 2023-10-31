import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { CreatorComponent } from './creator.component';
import { CreatorRoutingModule } from './creator-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CreatorComponent
  ],
  imports: [
    CommonModule,
    CreatorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CreatorModule { }