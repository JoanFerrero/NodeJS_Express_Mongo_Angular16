import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileLikesComponent } from './profile-likes.component';

describe('ProfileLikesComponent', () => {
  let component: ProfileLikesComponent;
  let fixture: ComponentFixture<ProfileLikesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileLikesComponent]
    });
    fixture = TestBed.createComponent(ProfileLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
