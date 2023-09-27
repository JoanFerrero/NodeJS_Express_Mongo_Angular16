import { Component } from '@angular/core';
import { ProductService, Product } from 'src/app/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  slug_Category: string | any;
  constructor (
    private productService: ProductService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.slug_Category = this.ActivatedRoute.snapshot.paramMap.get('slug');
    if(this.slug_Category) {
      this.productService.getProductsCategory(this.slug_Category)
      .subscribe(data => {
        this.products = data.product;
      })
    } else {
      this.runProducts();
    }
  }

  runProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data.product;
      })
  }
}
