import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Product, ProductService, UserService } from 'src/app/core';
import { concatMap ,  tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ){}
  @Input() value: Product = {} as Product;
  like: Boolean = true;
  numLike: number = 0;
  isLoged: Boolean = false;

  ngOnInit(): void {
    this.numLike = this.value.favouritesCount;
    if(this.value.favorited) {
      this.like = true;
    } else {
      this.like = false;
    }
  }

  toggleFavorite() {
    this.userService.isAuthenticated.subscribe({
      next: data => this.isLoged = data,
      error: error => console.error(error)
    });
    if(this.isLoged) {
      if(this.value.favorited) {
        this.productService.unfavorite(this.value.slug)
        .subscribe(data => {
            this.numLike = this.numLike - 1;
            this.value.favorited = false
            this.like = false;
            //this.ToastrService.success("Dislike succesfully!");
          }
          );
      } else {
        this.productService.favorite(this.value.slug)
        .subscribe(data => {
            this.numLike = this.numLike + 1;
            this.value.favorited = true
            this.like = true;
            //this.ToastrService.success("Like succesfully!");
          }
        );
      }
    } else {
      this.ToastrService.error('You must be loged. You eill be redirect to the login page');
      setTimeout(() => { this.router.navigate(['/login']); }, 600);
    }
  };
}
