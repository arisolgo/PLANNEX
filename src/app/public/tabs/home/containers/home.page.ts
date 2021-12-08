import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Response } from 'src/app/core/models/models';
import {
  ProveedoresService,
  TiposService,
} from 'src/app/core/services/api/services';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceCategories: any = [];
  offers: any = [];

  providers: any[] = [];
  currentUser = this.authService.getCurrentUser();
  userName: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private tiposService: TiposService,
    private providerService: ProveedoresService,
    private backgroundMode: BackgroundMode,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.currentUser.then((result: any) => {
      this.userName.next(JSON.parse(result.value).Nombres);
    });

    this.getOffers();
    this.getAllTypes();
    this.getProviders();
  }

  getAllTypes() {
    this.tiposService.getApiTipos().subscribe((response: any) => {
      this.serviceCategories = response.result;
      this.serviceCategories.forEach((element) => {
        if (element.id == 2) {
          element['img'] = '../../../../../assets/icon/barberLogo.jpg';
        }
        if (element.id == 1) {
          element['img'] = '../../../../../assets/icon/beautyLogo.jpg';
        }
      });
    });
  }

  getCategories() {
    this.serviceCategories[0] = {
      category: 1,
      img: '../../../../../assets/icon/barberLogo.jpg',
      name: 'Peluquerías',
    };
    this.serviceCategories[1] = {
      category: 2,
      img: '../../../assets/test-images/saloneras.png',
      name: 'Salones',
    };
  }

  getOffers() {
    this.offers[0] = {
      img: '../../../../../assets/test-images/ProfilePictures/offer1.jpeg',
    };
    this.offers[1] = {
      img: '../../../../../assets/test-images/ProfilePictures/offer2.jpeg',
    };
    this.offers[2] = {
      img: '../../../../../assets/test-images/ProfilePictures/offer3.jpg',
    };
  }

  getProviders() {
    this.providerService.getApiProveedores().subscribe((response: Response) => {
      this.providers = response.result.slice(0, 5);

      this.providers.forEach((element) => {
        element['image'] =
          'https://cursosdeinfotep.com/wp-content/uploads/Curso-de-Barberia-Barbero-en-Infotep-Gratis.jpg';
      });
    });
  }
}
