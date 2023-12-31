import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';

import { ListCategoryComponent } from './list-category/list-category.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { CardProductComponent } from './card-product/card-product.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ShowAuthedDirective } from './show-authed.directive';
import { LikesComponent } from './button/likes/likes.component';
import { FollowsComponent } from './button/follows/follows.component';
import { CommentsComponent } from './comments/comments.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    InfiniteScrollModule,
    MdbCarouselModule,
  ],
  declarations: [
    ListCategoryComponent,
    ListProductsComponent,
    CardProductComponent,
    CarouselComponent,
    SearchComponent,
    FiltersComponent,
    PaginationComponent,
    ShowAuthedDirective,
    LikesComponent,
    FollowsComponent,
    CommentsComponent
  ],
  exports: [
    ListCategoryComponent,
    ListProductsComponent,
    CardProductComponent,
    CarouselComponent,
    LikesComponent,
    FollowsComponent,
    CommentsComponent,
    ShowAuthedDirective
  ]
})
export class SharedModule {}