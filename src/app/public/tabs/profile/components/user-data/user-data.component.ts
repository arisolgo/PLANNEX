import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { TabsService } from '../../../services/tabs.service';
import {
  ClientesService,
  ScheduledServiceService,
} from 'src/app/core/services/api/services';
import { Response } from 'src/app/core/models/models';

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
    private clientService: ClientesService
  ) {}

  @Input() currentClient: any = {};
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
    this.setClientInfo();
    console.log('CURRENT CLIENT:', this.currentClient);
  }
  ionWillEnter() {
    this.setClientInfo();
  }
}
