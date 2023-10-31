import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProfileService, ProductService, User, UserService } from 'src/app/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent {
  @Input() value: Product = {} as Product;
  @Input() page: string = '';
  @Output() deleteEvent: EventEmitter<string> = new EventEmitter();

  isLoged: Boolean = false;
  myProduct: Boolean = false;
  userLog: User = {} as User;
  products: Product[] = [];

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private productService: ProductService,
    private router: Router,
    private ToastrService: ToastrService
  ){}

  ngOnInit(): void {
    if(this.page === 'profile') {
      this.userService.isAuthenticated.subscribe({
        next: data => this.isLoged = data,
        error: error => console.error(error)
      });
      if(this.isLoged) {
        this.userService.currentUser.subscribe(
          data => {
            this.userLog = data;
        });
        if(this.value.author.username === this.userLog.username) {
          this.myProduct = true;
        }
      }
    }
  }

  onDelete(slug: string) {
    this.productService.destroy(slug).subscribe(
      data => {
        this.ToastrService.success("Delete succesfully!");
        this.deleteEvent.emit(slug);
      }
    )
  }
}
