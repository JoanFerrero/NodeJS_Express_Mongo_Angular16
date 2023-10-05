import { Component, OnInit, Input  } from '@angular/core';
import { ProductService, Product, Filters } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  slug_Category: string | any;
  routeFilters: string | any;

  filters = new Filters();

  constructor (
    private productService: ProductService,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    this.runProducts();
  }

  runProducts() {
    if(this.slug_Category !== null) {
      console.log(this.slug_Category)
      this.productService.getProductsCategory(this.slug_Category)
        .subscribe(data => {
          this.products = data.product;
        })
    } else if(this.routeFilters !== null) {
      this.refresRouteFilter();
      this.get_list_filtered(this.filters)
    } else {
      this.get_list_filtered(this.filters)
    }
  }

  get_list_filtered(filters: Filters) {
    this.filters = filters;
    this.productService.getProductsFilter(filters)
      .subscribe(data => {
        this.products = data.product;
      })
  }

  refresRouteFilter() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if(typeof(this.routeFilters) == "string" ){
      this.filters = JSON.parse(atob(this.routeFilters));
    }else{
      this.filters = new Filters();
    }
  }
  
}
