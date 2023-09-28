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

  constructor (
    private ActivatedRoute: ActivatedRoute,
    private ProductService: ProductService,
  ) { }

  ngOnInit(): void {
    const slug: any = this.ActivatedRoute.snapshot.paramMap.get('slug');
    this.getProduct(slug)
  }

  getProduct(slug: string) {
    this.ProductService.getProduct(slug)
      .subscribe(data => {
        this.product = data.product;
      })
  }
}
