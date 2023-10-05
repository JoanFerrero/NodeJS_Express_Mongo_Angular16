import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { Filters, Category, CategoryService } from '../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();

  max_price: number | undefined;
  min_price: number | undefined;
  listCategories: Category[] = [];
  cat_slug: string = "";
  routeFilters: string | null;

  filters: Filters = new Filters();

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute, 
    private Location: Location,
    private router: Router
  ) {
    this.routeFilters = this.activatedRoute.snapshot.paramMap.get('filters');
  }

  ngOnInit(): void {
    this.getCategory()
  }

  getCategory() {
    this.categoryService.getAllCategories()
      .subscribe(data => {
        this.listCategories = data.category
      })
  }

  remove_all() {
    this.cat_slug = '';
    this.min_price = undefined;
    this.max_price = undefined;
    this.filter_products();
    setTimeout(() => { this.router.navigate(['/shop']); }, 200);
  }

  filter_products() {
    this.routeFilters = this.activatedRoute.snapshot.paramMap.get('filters');
    if (this.routeFilters !== null) {
      this.filters = new Filters();
      this.filters = JSON.parse(atob(this.routeFilters));
    } else {
      this.filters = new Filters();
    }

    if(this.cat_slug) {
      this.filters.category = this.cat_slug;
    }

    this.filters.max_price = this.max_price ? this.max_price : undefined;
    this.filters.min_price = this.min_price == 0 || this.min_price == null ? undefined : this.min_price;
  
    this.checkTime(this.filters)
  }

  private checkTime(filter: Filters) {
    setTimeout(() => {
      if(filter === this.filters) {
        this.filterEvent.emit(this.filters);
        this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
      }
    },200);
  }
}
