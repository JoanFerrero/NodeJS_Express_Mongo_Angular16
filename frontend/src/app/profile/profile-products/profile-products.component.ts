import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductService, Product, Profile } from '../../core'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.css']
})
export class ProfileProductsComponent implements OnInit {

  profile: Profile = {} as Profile;
  products: Product[] = [];

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.profile = data['profile'].profile as Profile;
        this.getProducts();
        this.cd.markForCheck();
      });
  }

  getProducts() {
    this.ProductService.all_products_user(this.profile.username).subscribe(
      data => {
        this.products = data.product;
      });
  } 
}
