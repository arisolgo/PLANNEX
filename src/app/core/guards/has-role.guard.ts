import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class HasRoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private navCtrl: NavController
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Estas tocandome');
    const getUser = this.authService.getCurrentUser().then((user) => {
      let currentUser = JSON.parse(user.value);
      if (!currentUser) {
        this.navCtrl.navigateForward('/login');
        return false;
      }
      const isAuthorized = currentUser.Role == route.data.role;
      console.log(isAuthorized);
      if (!isAuthorized) {
        this.navCtrl.navigateForward('/tabs/calendar');
      }

      return isAuthorized;
    });
    return getUser;
  }
}
