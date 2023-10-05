import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Filters, Product, ProductService } from '../../core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() searchEvent: EventEmitter<Filters> = new EventEmitter();

  search_value: string | undefined = '';
  routeFilters: string | null;
  filters: Filters = new Filters();
  listProducts: Product[] = [];
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
    //this.dropdown();
    //this.search_value = this.filters.name || undefined;
  }

  getListProduct() {
    this.productService.getProductsName(this.search)
      .subscribe(data => {
        //this.listProducts = data.product;
        console.log(data)
      })
  }

  private checkTime(writtingValue: any) {

    let isShop: string = this.Router.url.split('/')[1];

    setTimeout(() => {
      if (writtingValue === this.search) {
        if (isShop === 'shop') {
          //this.notNamefilters();
          this.searchEvent.emit(this.filters);
          //this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
        }
        //if (this.search.length != 0)  this.getListProduct();
      }
    }, 200);
  }

  public filters_route() {
    if (this.routeFilters !== null) {
      this.filters = JSON.parse(atob(this.routeFilters));
    }
  }

  public search_event(data: any): void {
    if (typeof data.search_value === 'string') {
      this.filters.name = data.search_value;
      this.filters.offset = 0;
      //this.Router.navigate(['/shop/' + btoa(JSON.stringify(this.filters))]);
    }
  }

  public type_event(writtingValue: any): void {
    this.routeFilters = this.ActivatedRoute.snapshot.paramMap.get('filters'); 
    this.search = writtingValue;
    this.checkTime(writtingValue)
  }
}
