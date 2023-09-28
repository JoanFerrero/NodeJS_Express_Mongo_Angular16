import { Component, Input } from '@angular/core';
import { Category, CategoryService } from 'src/app/core';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent {

  constructor (
    private categoryService: CategoryService
  ) {}

  categories: Category[] = [];
  offset = 0;

  ngOnInit(): void {
    this.getCategory();
  }

  getRequestParams(offset: number, limit: number): any {
    let params: any = {};

    params[`offset`] = offset;
    params[`limit`] = limit;

    return params;
  }


  getCategory() {
    const params = this.getRequestParams(this.offset, 6);
    this.categoryService.getCategories(params)
      .subscribe(data => {
        this.categories = this.categories.concat(data.category);
        this.offset = this.offset + 6;
      })
  }

  onScroll() {
    this.getCategory();
  }
}
