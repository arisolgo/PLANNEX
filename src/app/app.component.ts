import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private backgroundMode: BackgroundMode) {
    this.backgroundMode.enable();
  }
}
