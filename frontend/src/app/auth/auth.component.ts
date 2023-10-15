import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Error, UserService } from '../core';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {

  authType: String = '';
  title: String = '';
  errors: Error = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = (this.authType === 'login') ? 'Sign in' : 'Sign up';
      // add form control for username if this is the register page
      if (this.authType === 'register') {
        this.authForm.addControl('username', new FormControl());
      }
      this.cd.markForCheck();
    });
  }

  submitForm() {
    //this.isSubmitting = true;
    this.errors = {errors: {}};

    const credentials = this.authForm.value;
    console.log(credentials)
    this.userService
      .attemptAuth(this.authType, credentials)
      .subscribe((date) => {
        console.log(date)
        this.router.navigateByUrl('/')
      }
      );
  }
}
