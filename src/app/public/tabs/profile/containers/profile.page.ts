import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ProveedoresService } from 'src/app/core/services/api/services';
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
    public authService: AuthService,
    private providerService: ProveedoresService
  ) {}
  getUser = this.authService.getCurrentUser();
  currentUser: any;
  async openModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditProfileComponent,
    });

    await modal.present();
  }

  async ngOnInit() {
    await this.getUser.then((user) => {
      this.currentUser = JSON.parse(user.value);
      console.log('THIS USER', this.currentUser);
    });
  }
  ionWillEnter() {}
}
