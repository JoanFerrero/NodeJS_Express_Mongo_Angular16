import { Component } from '@angular/core';
import { ProductService, Product } from 'src/app/core';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  constructor (
    private productService: ProductService
  ) {}

  products: Product[] = [];

  ngOnInit(): void {
    this.runProducts();
  }

  runProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        console.log(data)
        this.products = data.product;
      })
  }

}
