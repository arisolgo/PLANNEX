import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth.service';
import { Geolocation } from '@capacitor/geolocation';
import { TabsService } from '../../../services/tabs.service';

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
    private tabService: TabsService
  ) {}

  userList: any[] = [
    {
      name: 'Ariel',
      last_name: 'Gonzalez Batista',
      profile_pic: '/assets/avatar.png',
      role: 'client',
      mail: 'ariel@xyz.com',
      phone: '8099900000',
      birthday: '10-06-1999',
      citas_realizadas: 34,
      citas_premiadas: 5,
    },
  ];

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/login');
    });
  }

  ngOnInit() {}
}
