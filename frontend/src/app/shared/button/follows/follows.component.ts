import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, ProfileService, UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent {
  @Input() value: Product = {} as Product;

  isLoged: Boolean = false;
  isfollow: Boolean = false;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private ToastrService: ToastrService
  ){}


  ngOnInit(): void {
    this.isfollow = this.value.author.following;
  }

  toggleFavorite() {
    this.userService.isAuthenticated.subscribe({
      next: data => this.isLoged = data,
      error: error => console.error(error)
    });
    if(this.isLoged) {
      if(this.isfollow) {
        this.profileService.unfollow(this.value.author.username)
          .subscribe(data => {
            this.isfollow = false;
            this.ToastrService.success("UnFollow succesfully!");
          }
        );
      } else {
        this.profileService.follow(this.value.author.username)
          .subscribe(data => {
            this.isfollow = true;
            this.ToastrService.success("Follow succesfully!");
          }
        );

      }
      
    } else {
      this.ToastrService.error('You must be loged. You eill be redirect to the login page');
      setTimeout(() => { this.router.navigate(['/login']); }, 600);
    }
  }
}
