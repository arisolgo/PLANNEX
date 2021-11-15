import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private authService: AuthService
  ) {}
  currentUser = JSON.parse(this.authService.loggedUser.value.value);
  async openModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditProfileComponent,
    });

    await modal.present();
  }
  ngOnInit() {
    console.log(this.currentUser);
  }
}
