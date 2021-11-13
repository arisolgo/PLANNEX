import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): Observable<boolean> {
    console.log('AutoLogin Guard');
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null),
      take(1),
      map((isAuthenticated) => {
        console.log('Found previous token, automatic login');
        if (isAuthenticated) {
          console.log('hola 2');
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          console.log(isAuthenticated);
          console.log('hola');
          // Simply allow access to the login
          return true;
        }
      })
    );
  }
}
