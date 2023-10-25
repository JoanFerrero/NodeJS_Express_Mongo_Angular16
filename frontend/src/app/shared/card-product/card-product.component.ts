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
  favorited: Boolean = false;

  ngOnInit(): void {
    this.numLike = this.value.favouritesCount;
    this.favorited = this.value.favorited;
    if(this.value.favorited) {
      this.like = true;
    } else {
      this.like = false;
    }
  }

  get_like(favorite: boolean) {
    this.value.favorited = favorite
    this.like = favorite;
  }
}
