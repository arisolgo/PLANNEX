import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Client, Provider, Response, User } from '../models/models';
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
  loggedUser = {};
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
      switchMap((responseValue) => {
        let userData = JSON.parse(responseValue);
        Storage.set({
          key: 'currentUser',
          value: JSON.stringify(userData.accountObj),
        });
        return from(Storage.set({ key: TOKEN_KEY, value: userData.token }));
      }),
      tap(() => {
        this.isAuthenticated.next(true);
        this.setCurrentUser();
        this.loadToken();
      })
    );
  }

  logout(): Promise<void> {
    this.isAuthenticated.next(false);
    return Storage.remove({ key: TOKEN_KEY });
  }

  register(user: User): Observable<any> {
    return this.http.post(this.rootUrl + '/api/User/Register', user);
  }

  createClient(client: Client) {
    return this.http.post(this.rootUrl + '/api/Clientes', client);
  }

  createProvider(provider: Provider) {
    return this.http.post(this.rootUrl + '/api/Proveedores', provider);
  }

  async setCurrentUser() {
    const currentUser = await Storage.get({ key: 'currentUser' });
    this.loggedUser = currentUser;
  }
}
