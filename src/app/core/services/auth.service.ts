import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  Client,
  LoginResponse,
  Provider,
  Response,
  User,
} from '../models/models';
import { StorageService } from './storage.service';
import { Storage } from '@capacitor/storage';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { UiService } from './ui.service';
import { TabsService } from 'src/app/public/tabs/services/tabs.service';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'currentUser';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );
  token = '';
  loggedUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  user: LoginResponse;
  rootUrl = '';
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private uiService: UiService,
    private tabService: TabsService
  ) {
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      this.rootUrl = 'http://192.168.0.18:5000';
    } else {
      // Platform is not mobile
      this.rootUrl = environment.devRootUrl;
    }
    this.loadToken();
  }

  async loadToken() {
    const token = await Storage.get({ key: TOKEN_KEY });
    if (token && token.value) {
      this.token = token.value;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  // login(user: User): Observable<any> {
  //   return this.http.post(this.rootUrl + '/api/User/Login', user).pipe(
  //     map((response: Response) => response.result),
  //     switchMap((responseValue) => {
  //       console.log(responseValue);
  //       let userData = JSON.parse(responseValue);
  //       Storage.set({
  //         key: 'currentUser',
  //         value: JSON.stringify(userData.accountObj),
  //       });
  //       this.setCurrentUser();
  //       return from(Storage.set({ key: TOKEN_KEY, value: userData.token }));
  //     }),
  //     tap(() => {
  //       this.isAuthenticated.next(true);
  //       this.loadToken();
  //     })
  //   );
  // }
  login(user: User): Observable<any> {
    return this.http.post(this.rootUrl + '/api/User/Login', user).pipe(
      tap(async (response) => {
        if (response.result == 'emailnotconfirmed') {
          this.uiService.presentAlert(
            'Aún no se ha confirmado el correo',
            'Correo sin verficar'
          );
          return false;
        }

        Storage.set({
          key: TOKEN_KEY,
          value: JSON.parse(response.result).token,
        });
        Storage.set({
          key: USER_KEY,
          value: JSON.stringify(JSON.parse(response.result).accountObj),
        });
        await this.setCurrentUser();
        this.isAuthenticated.next(true);
        this.user = this.getUser(response.result);
        this.loadToken();
      })
    );
  }

  private getUser(loginResponse): LoginResponse {
    console.log(loginResponse);
    return JSON.parse(loginResponse) as LoginResponse;
  }

  getCurrentUser() {
    console.log(Storage.get({ key: USER_KEY }));
    return Storage.get({ key: USER_KEY });
  }

  getLoggedUser() {
    return this.user;
  }

  async logout() {
    this.isAuthenticated.next(false);
    //this.tabService.resetUserEvents();
    const deleteUserSession = await Storage.remove({ key: USER_KEY });
    const deleteTokenSession = await Storage.remove({ key: TOKEN_KEY });
    return Promise.all([deleteUserSession, deleteTokenSession]);
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
    this.loggedUser.next(currentUser);
  }
}
