import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  user: User = {} as User;
  settingsForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private ToastrService: ToastrService
  ) {
    this.settingsForm = this.fb.group({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  }

  ngOnInit() {
    Object.assign(this.user, this.userService.getCurrentUser());
    this.settingsForm.patchValue(this.user);
  }

  
  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

  submitForm() {
    this.isSubmitting = true;
    this.updateUser(this.settingsForm.value);

    this.userService.update(this.user).subscribe({
      next: data => {
        this.ToastrService.success("Update " + this.user.username + " succesfully");
        this.router.navigateByUrl('/profile/' + this.user.username);
      },
      error: e => {
        this.ToastrService.error("Please try again, data incorrect");
        this.isSubmitting = false;
      }
    });
  }

  updateUser(values: Object) {
    Object.assign(this.user, values);
  }

}
