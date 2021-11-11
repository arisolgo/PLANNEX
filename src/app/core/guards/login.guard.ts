import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private storage: StorageService, private router: Router) {}
  async canActivate() {
    const isUserLoggedIn = await this.storage.get('isUserLoggedIn');
    console.log(isUserLoggedIn);
    if (isUserLoggedIn) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
    // let isUserLoggedIn = true;
    // // this.storage.get('isUserLoggedIn').then(() => {
    // //   isUserLoggedIn = true;
    // // });
    // console.log(this.storage.get('token'));
    // //this.storage.get('token').then((result) => console.log(result));
    // console.log(isUserLoggedIn);
    // if (isUserLoggedIn) {
    //   return true;
    // } else {
    //   this.router.navigateByUrl('/login');
    // }
  }
}
