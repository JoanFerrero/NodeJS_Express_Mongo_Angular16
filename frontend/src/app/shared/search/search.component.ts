import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Filters, Product, ProductService } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  search_value: string | undefined = '';
  routeFilters: string | null;
  filters: Filters = new Filters();
  listProducts: any;
  search: string = '';


  constructor(
    private productService: ProductService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private Location: Location
  ) {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
  }

  ngOnInit(): void {
    this.filters_route();
    this.search_value = this.filters.name || undefined;
  }

  public filters_route() {
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
  }

  private checkTime(writtingValue: any) {

    let isShop: string = this.Router.url.split('/')[1];

    setTimeout(() => {
      if (writtingValue === this.search) {
        if (isShop === 'shop') {
          this.notNamefilters();
          this.searchEvent.emit(this.filters);
          this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        }
        if (this.search.length != 0)  this.getListProduct();
      }
    }, 200);
  }

  getListProduct() {
    this.productService.getProductsName(this.search)
      .subscribe(data => {
        this.listProducts = data;
      })
  }

  public notNamefilters() {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
    this.filters.name = this.search;
  }

  public search_event(data: any): void {
    if (typeof data.search_value === 'string') {
      this.filters.name = data.search_value;
      this.Router.navigate(['/shop/' + btoa(JSON.stringify(this.filters))]);
    }
  }

  public type_event(writtingValue: any): void {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters'); 
    this.search = writtingValue;
    this.checkTime(writtingValue)
  }
}
