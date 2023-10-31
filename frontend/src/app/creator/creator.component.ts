import { Component, OnInit } from '@angular/core';
import { Category, CategoryService, Product, ProductService } from '../core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css']
})
export class CreatorComponent implements OnInit{
  product: Product = {} as Product;
  productForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;
  listCategories: Category[] = [];
  category: string = '';
  cat_slug: string = "";

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      product_name: '',
      product_price: 0,
      category_name: ''
    });
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

  submitForm() {
    this.isSubmitting = true;
    this.productService.create(this.productForm.value).subscribe(
      data => {
        this.router.navigateByUrl('/shop')
      }
    )
  }
}
