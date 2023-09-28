import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

import { ListCategoryComponent } from './list-category/list-category.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductComponent } from './card-product/card-product.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule
  ],
  declarations: [
    ListCategoryComponent,
    ListProductsComponent,
    CardProductComponent
  ],
  exports: [
    ListCategoryComponent,
    ListProductsComponent,
    CardProductComponent
  ]
})
export class SharedModule {}