import { Component, OnInit } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { EditProfileComponent } from '../components/edit-profile/edit-profile.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(    
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet) { }

    async openModal() {
      const modal = await this.modalController.create({
        presentingElement: this.routerOutlet.nativeEl,
        component: EditProfileComponent,

      });
    
  
      await modal.present();
    }
  ngOnInit() {
  }

}
