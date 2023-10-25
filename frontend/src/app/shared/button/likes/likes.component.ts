import { Component, Input } from '@angular/core';
import { Product, ProductService, UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent {
  @Input() value: Product = {} as Product;

  numLike: number = 0;
  isLoged: Boolean = false;

  constructor(
    private productService: ProductService,
    private userService: UserService,
    private router: Router,
    private ToastrService: ToastrService
  ){}

  ngOnInit(): void {
    this.numLike = this.value.favouritesCount;
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
            this.numLike--;
            this.value.favorited = false
            this.ToastrService.success("Dislike succesfully!");
          }
        );
      } else {
        this.productService.favorite(this.value.slug)
        .subscribe(data => {
            this.numLike++;
            this.value.favorited = true
            this.ToastrService.success("Like succesfully!");
          }
        );
      }
    } else {
      this.ToastrService.error('You must be loged. You eill be redirect to the login page');
      setTimeout(() => { this.router.navigate(['/login']); }, 600);
    }
  };
}
