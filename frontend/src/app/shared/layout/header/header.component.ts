import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserService } from 'src/app/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  constructor(
    private userService: UserService,
    private cd: ChangeDetectorRef,
    private router: Router
  ){}

  currentUser!: User;

  ngOnInit() {
    this.userService.currentUser.subscribe(
      (userData) => {
        console.log(userData)
        this.currentUser = userData;
        this.cd.markForCheck();
      }
    );
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }
}
