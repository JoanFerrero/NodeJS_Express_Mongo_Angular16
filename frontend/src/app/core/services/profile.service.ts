import { Injectable } from '@angular/core';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';

import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { map ,  distinctUntilChanged } from 'rxjs/operators';
import { Profile, User } from '../models';
import { Token } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor (
    private apiService: ApiService
  ) {}

  follow(username: string) {
    return this.apiService.post('/profile/' + username + '/follow');
  }

  unfollow(username: string) {
    return this.apiService.delete('/profile/' + username + '/follow');
  }

  getProfile(username: string) {
    return this.apiService.get('/profile/' + username);
  }

  getFollowing(username: string): Observable<{users: Profile[]}>  {
    return this.apiService.get('/profile/' + username + '/following');
  }

  getFollow(username: string): Observable<{users: Profile[]}>  {
    return this.apiService.get('/profile/' + username + '/follow');
  }
}