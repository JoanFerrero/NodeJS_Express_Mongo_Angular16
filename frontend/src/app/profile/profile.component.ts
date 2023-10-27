import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile, User, UserService } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  profile: Profile = {} as Profile;
  currentUser: User = {} as User;
  isUser: boolean = false

  constructor(
    private route: ActivatedRoute,
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
      });//get profile
  }
}
