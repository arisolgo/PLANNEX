import {
  ErrorHandler,
  forwardRef,
  LOCALE_ID,
  NgModule,
  Provider,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { ApiModule } from './core/services/api/api.module';
import { environment } from 'src/environments/environment';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptorService } from './core/services/api-interceptor.service';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
registerLocaleData(es);

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptorService),
  multi: true,
};
let rootUrl = '';
if (Capacitor.isNativePlatform()) {
  // Platform is mobile
  rootUrl = 'http://plannex-001-site1.itempurl.com';
} else {
  // Platform is not mobile
  rootUrl = environment.devRootUrl;
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,
    CoreModule,
    ApiModule.forRoot({ rootUrl: rootUrl }),
  ],
  providers: [
    API_INTERCEPTOR_PROVIDER,
    ApiInterceptorService,
    IonicStorageModule,
    BackgroundMode,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'es-ES' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
