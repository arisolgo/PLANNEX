import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}
  canActivate() {
    let isUserLoggedIn = true;
    // this.storage.get('isUserLoggedIn').then(() => {
    //   isUserLoggedIn = true;
    // });
    console.log(this.storage.get('token'));
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
