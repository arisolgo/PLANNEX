import { Component } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { NavController } from '@ionic/angular';
import { Response } from 'src/app/core/models/models';
import {
  ProveedoresService,
  TiposService,
} from 'src/app/core/services/api/services';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceCategories: any = [];
  offers: any = [];

  providers: any[] = [];

  constructor(
    private tiposService: TiposService,
    private providerService: ProveedoresService,
    private backgroundMode: BackgroundMode
  ) {}

  ngOnInit() {
    this.getOffers();
    this.getAllTypes();
    this.getProviders();
  }

  getAllTypes() {
    this.tiposService.getApiTipos().subscribe((response: any) => {
      this.serviceCategories = response.result;
      this.serviceCategories.forEach((element) => {
        element['img'] = '../../../assets/test-images/barber.png';
      });
    });
  }

  getCategories() {
    this.serviceCategories[0] = {
      category: 1,
      img: 'https://via.placeholder.com/80x80',
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
      img: 'https://via.placeholder.com/254x120',
    };
    this.offers[1] = {
      img: 'https://via.placeholder.com/254x120',
    };
    this.offers[2] = {
      img: 'https://via.placeholder.com/254x120',
    };
  }

  getProviders() {
    this.providerService.getApiProveedores().subscribe((response: Response) => {
      this.providers = response.result;
      this.providers.forEach((element) => {
        element['image'] =
          'https://cursosdeinfotep.com/wp-content/uploads/Curso-de-Barberia-Barbero-en-Infotep-Gratis.jpg';
      });
    });
  }
}
