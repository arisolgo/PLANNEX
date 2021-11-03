import { Component } from '@angular/core';
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
  companies: any[] = [
    {
      display_name: 'La Barbería',
      name: 'La barberia',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      image: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 1,
      services: [
        {
          serviceName: 'Corte Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Corte Sencillo',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },
    {
      display_name: 'La Barbería 2',
      name: 'La barberia 2',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      image: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 1,
      services: [
        {
          serviceName: 'Corte Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Corte Sencillo',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },

    {
      display_name: 'El Salón 3',
      name: 'La barberia 3',
      address: 'Ave. 27 de Febrero #45, esq. Abraham Lincoln.',
      image: 'https://via.placeholder.com/320x180 ',
      rating: 4.8,
      phone: '8099900000',
      days: 'Lunes-Viernes',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      categoryId: 2,
      services: [
        {
          serviceName: 'Lavado Completo',
          price: 500,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Recorte Fenenino',
          price: 300,
          duration: 25,
          description: '',
          category: 'Recorte',
        },
        {
          serviceName: 'Manicure',
          price: 150,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
        {
          serviceName: 'Pedicure',
          price: 200,
          duration: 25,
          description: '',
          category: 'Uñas',
        },
      ],
    },
  ];
  providers: any[] = [];

  constructor(
    private tiposService: TiposService,
    private providerService: ProveedoresService
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
