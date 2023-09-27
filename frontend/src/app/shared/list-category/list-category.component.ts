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

  ngOnInit(): void {
    this.runCategory();
  }


  runCategory() {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.categories = data.category;
      })
  }
}
