import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { ProveedoresService } from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    public authService: AuthService,
    private providerService: ProveedoresService,
    private router: Router
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

  async ionViewWillEnter() {
    this.getUser = this.authService.getCurrentUser();
    await this.getUser.then((user) => {
      this.currentUser = JSON.parse(user.value);
      console.log('THIS USER', this.currentUser);
    });
  }
  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }
  ionWillEnter() {}
}
