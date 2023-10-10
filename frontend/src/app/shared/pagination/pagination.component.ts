import { Component, Output, OnInit, Input, EventEmitter  } from '@angular/core';
import { ProductService, Product, Filters, Category, CategoryService } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Output() filterEvent: EventEmitter<Filters> = new EventEmitter();
  @Input() totalPages: Array<number> = [];
  @Input() products: Product[] = [];

  slug_Category: string | any;
  routeFilters: string | any;

  filters = new Filters();
  currentPage: number = 1;
  limit: number = 3;

  constructor (
    private Location: Location
  ) {}

  setPage(pageNumber: number) {
    this.currentPage = pageNumber;

    if (this.limit) {
      this.filters.limit = this.limit;
      this.filters.offset = this.limit * (this.currentPage - 1);
    }

    this.Location.replaceState('/shop/' + btoa(JSON.stringify(this.filters)));
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
