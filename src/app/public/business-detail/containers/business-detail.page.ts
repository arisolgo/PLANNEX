import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  business:any = {}
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  services = [];
  serviceCategory = '';
  filteredServices = [];
  categories = ['Recorte', 'Uñas'];
  servicesByCategory:any = [];
  
  constructor(private router:Router) {
    if (router.getCurrentNavigation().extras.state) {
      this.business = this.router.getCurrentNavigation().extras.state;
      console.log(this.business);
    }
   }
  ngOnInit() {
    this.getServices();
    this.setServices(this.filteredServices);
  }
  getServices() {
    this.services = this.business.services
    // this.services[0] = {
    //   name: 'Corte sencillo',
    //   img: 'https://via.placeholder.com/80x80',
    //   category: 'Recorte',
    //   price: 350.00,
    //   description:"Recorte de pelo + estilado",
    // };
    // this.services[1] = {
    //   name: 'Corte completo',
    //   img: 'https://via.placeholder.com/80x80',
    //   category: 'Recorte',
    //   price: 500.00,
    //   description:"Recorte de pelo, estilado y lavado",
    // };
    // this.services[2] = {
    //   name: 'Manicure',
    //   img: 'https://via.placeholder.com/80x80',
    //   category: 'Uñas',
    //   price: 800.00,
    //   description:"Corte y esmaltado de uñas de las manos.",
    // };
    // this.services[3] = {
    //   name: 'Pedicure',
    //   img: 'https://via.placeholder.com/80x80',
    //   category: 'Uñas',
    //   price: 800.00,
    //   description:"Corte y esmaltado de uñas de los pies.",
    // };
    // this.services[4] = {
    //   name: 'Servicio completo',
    //   img: 'https://via.placeholder.com/80x80',
    //   category: 'Uñas',
    //   price: 1500.00,
    //   description:"Corte y esmaltado de uñas de las manos y pies.",
    // };
    this.filteredServices = this.services;
  }

  setServicesByCategory(filteredServices) {
    this.filteredServices = filteredServices;
    this.setServices(filteredServices);
  }

  setServices(servicesArray) {
    let i = 0;
    this.categories.forEach((category) => {
      this.servicesByCategory[i] = servicesArray.filter(
        (e) => e.category == category
      );
      i++;
    });
  }

}
