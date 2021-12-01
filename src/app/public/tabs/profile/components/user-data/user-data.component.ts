import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonRouterOutlet,
  ModalController,
  NavController,
} from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { TabsService } from '../../../services/tabs.service';
import {
  ClientesService,
  ScheduledServiceService,
} from 'src/app/core/services/api/services';
import { Response } from 'src/app/core/models/models';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss'],
})
export class UserDataComponent implements OnInit {
  constructor(
    public modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private router: Router,
    private tabService: TabsService,
    private scheduledServices: ScheduledServiceService,
    private clientService: ClientesService,
    private routerOutlet: IonRouterOutlet
  ) {}

  @Input() currentClient: any = {};
  currentUser: any;
  getUser = this.authService.getCurrentUser();
  userList: any[] = [
    {
      name: '',
      last_name: '',
      profile_pic: '/assets/avatar.png',
      role: 'client',
      mail: '',
      phone: '',
      birthday: '',
      citas_realizadas: 0,
      citas_premiadas: 0,
    },
  ];

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  async setUser() {
    this.getUser = this.authService.getCurrentUser();
    await this.getUser.then((user) => {
      this.currentUser = JSON.parse(user.value);
      console.log(this.currentUser);
    });
  }

  async openModal() {
    const modal = await this.modalController.create({
      presentingElement: this.routerOutlet.nativeEl,
      component: EditProfileComponent,
      componentProps: {
        currentClient: this.currentUser,
      },
    });

    await modal.present();

    modal.onWillDismiss().then((result) => {
      if (result.data) {
        this.setUser();
        this.userList[0].name = result.data.name;
        this.userList[0].last_name = result.data.last_name;
        this.userList[0].phone = result.data.phone;
      }
    });
  }

  setClientInfo() {
    this.clientService
      .getApiClientesId(this.currentClient.Id)
      .subscribe((response: Response) => {
        this.userList[0].name = response.result.nombres;
        this.userList[0].last_name = response.result.apellidos;
        this.userList[0].phone = response.result.celular;
        this.userList[0].mail = response.result.email;
      });
    // this.userList[0].name = this.currentClient.Nombres;
    // this.userList[0].last_name = this.currentClient.Apellidos;
    // this.userList[0].phone = this.currentClient.Celular;
    // this.userList[0].mail = this.currentClient.Email;

    let completedAppointments = 0;
    this.scheduledServices
      .getApiScheduledServiceClientIdGetScheduledServicesByClientId(
        this.currentClient.Id
      )
      .subscribe((response: Response) => {
        if (response) {
          response.result.forEach((element) => {
            if (element.status == 2) {
              completedAppointments += 1;
            }
          });
        }
        this.userList[0].citas_realizadas = completedAppointments;
      });
  }

  ngOnInit() {
    this.setUser();
    console.log(this.currentClient);
    this.setClientInfo();
  }
}
