import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product, Profile, ProfileService } from '../../core'

@Component({
  selector: 'app-profile-follow',
  templateUrl: './profile-follow.component.html',
  styleUrls: ['./profile-follow.component.css']
})
export class ProfileFollowComponent implements OnInit {

  profile: Profile = {} as Profile;
  follows: Profile[] = [];
  following: Profile[] = [];

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.profile = data['profile'].profile as Profile;
        this.getFollowing()
        this.getFollow();
      }
    );
  }

  getFollowing() {
    this.profileService.getFollowing(this.profile.username).subscribe(
      data => {
        this.following = data.users;
      }
    )
  }

  getFollow() {
    this.profileService.getFollow(this.profile.username).subscribe(
      data => {
        this.follows = data.users;
      }
    )
  }
}
