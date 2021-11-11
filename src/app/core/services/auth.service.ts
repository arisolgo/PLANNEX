import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  rootUrl = environment.devRootUrl;
  token = '';

  login(user: User) {
    return this.http.post(this.rootUrl + '/api/User/Login', user);
  }

  setToken(token: string) {
    this.storageService.set('token', token);
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}
