import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserService } from './api/services';
import { AuthService } from './auth.service';

@Injectable()
export class ApiInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `bearer ` + this.authService.getToken(),
        'Content-Type': 'application/json',
      },
    });

    // Also handle errors globally
    return next.handle(req);
  }
}
