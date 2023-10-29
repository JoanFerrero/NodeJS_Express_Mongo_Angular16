import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductService, Product, Profile } from '../../core'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-likes',
  templateUrl: './profile-likes.component.html',
  styleUrls: ['./profile-likes.component.css']
})
export class ProfileLikesComponent implements OnInit {
    profile: Profile = {} as Profile;
    products: Product[] = [];
  
    constructor(
      private ProductService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private cd: ChangeDetectorRef
    ) { }
  
    ngOnInit(): void {
      this.getProducts();
    }
  
    getProducts() {
      this.ProductService.all_products_user_like().subscribe(
        data => {
          this.products = data.product;
        });
    } 
  }
