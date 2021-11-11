import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Response, User } from '../models/models';
import { StorageService } from './storage.service';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

const TOKEN_KEY = 'authToken';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.loadToken();
  }
  rootUrl = environment.devRootUrl;

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  login(user: User): Observable<any> {
    return this.http.post(this.rootUrl + '/api/User/Login', user).pipe(
      map((response: Response) => response.result),
      switchMap((token) => {
        return from(Storage.set({ key: TOKEN_KEY, value: token }));
      }),
      tap(() => {
        this.isAuthenticated.next(true);
        this.loadToken();
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }
}
