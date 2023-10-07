import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService, Product } from 'src/app/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{
  product?: any;
  slug: string | any;

  constructor (
    private ActivatedRoute: ActivatedRoute,
    private ProductService: ProductService,
  ) { }

  ngOnInit(): void {
    this.slug = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.getProduct(this.slug);
  }

  getProduct(slug: string) {
    this.ProductService.getProduct(slug)
      .subscribe(data => {
        this.product = data.product;
      })
  }
}
