import { NgModule } from '@angular/core';

import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared';
import { SettingsRoutingModule } from './settings-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    SettingsRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule {}
