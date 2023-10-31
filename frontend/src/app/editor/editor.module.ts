import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class EditorModule { }