import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private backgroundMode: BackgroundMode,
    private geolocation: Geolocation
  ) {
    this.backgroundMode.enable();
    this.geolocation.getCurrentPosition().then(() => {});
  }
}
