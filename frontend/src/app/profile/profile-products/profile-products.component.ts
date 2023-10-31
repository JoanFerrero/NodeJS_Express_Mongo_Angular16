import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductService, Product, Profile, UserService } from '../../core'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-products',
  templateUrl: './profile-products.component.html',
  styleUrls: ['./profile-products.component.css']
})
export class ProfileProductsComponent implements OnInit {

  profile: Profile = {} as Profile;
  products: Product[] = [];
  isUser: boolean = false;

  constructor(
    private ProductService: ProductService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.profile = data['profile'].profile as Profile;
        this.userService.currentUser.subscribe(
          data => {
            this.isUser = (data.username === this.profile.username)
          }
        )
        this.getProducts();
        this.cd.markForCheck();
      }
    );
  }

  getProducts() {
    this.ProductService.all_products_user(this.profile.username).subscribe(
      data => {
        this.products = data.product;
      }
    );
  } 

  get_slug_delete(slug: string) {
    this.products = this.products.filter(c => c.slug !== slug);
  }
}
