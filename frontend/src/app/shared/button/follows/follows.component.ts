import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Profile, ProfileService, User, UserService } from 'src/app/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent {
  @Input() value: Profile = {} as Profile;

  isLoged: Boolean = false;
  isfollow: Boolean = false;
  myProduct: Boolean = false;
  userLog: User = {} as User;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private router: Router,
    private ToastrService: ToastrService
  ){}


  ngOnInit(): void {
    this.isfollow = this.value.following;
    this.userService.isAuthenticated.subscribe({
      next: data => this.isLoged = data,
      error: error => console.error(error)
    });
    if(this.isLoged) {
      this.userService.currentUser.subscribe(
        data => {
          this.userLog = data;
      });
      if(this.value.username === this.userLog.username) {
        this.myProduct = true;
      }
    }
  }

  toggleFavorite() {
    if(this.isLoged) {
      if(this.isfollow) {
        this.profileService.unfollow(this.value.username)
          .subscribe(data => {
            this.isfollow = false;
            this.ToastrService.success("UnFollow succesfully!");
          }
        );
      } else {
        this.profileService.follow(this.value.username)
          .subscribe(data => {
            this.isfollow = true;
            this.ToastrService.success("Follow succesfully!");
          }
        );

      }
      
    } else {
      this.ToastrService.error('You must be loged. You will be redirect to the login page');
      setTimeout(() => { this.router.navigate(['/login']); }, 600);
    }
  }
}
