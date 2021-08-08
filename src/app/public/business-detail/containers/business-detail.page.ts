import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.page.html',
  styleUrls: ['./business-detail.page.scss'],
})
export class BusinessDetailPage implements OnInit {
  
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  @Input() services = [];
  @Input() serviceCategory = '';
  filteredServices = [];
  categories = ['Recorte', 'Uñas'];
  servicesByCategory = [];
  
  constructor() { }

  ngOnInit() {
    this.getServices();
    this.setServices(this.filteredServices);
  }
  getServices() {
    this.services[0] = {
      name: 'Corte sencillo',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte',
      price: 350,
      description:"Recorte de pelo + estilado",
    };
    this.services[1] = {
      name: 'Corte completo',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte',
      price: 500,
      description:"Recorte de pelo, estilado y lavado",
    };
    this.services[2] = {
      name: 'Manicure',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas',
      price: 800,
      description:"Corte y esmaltado de uñas de las manos.",
    };
    this.services[3] = {
      name: 'Pedicure',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas',
      price: 800,
      description:"Corte y esmaltado de uñas de los pies.",
    };
    this.services[4] = {
      name: 'Servicio completo',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas',
      price: 1500,
      description:"Corte y esmaltado de uñas de las manos y pies.",
    };
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
      console.log("ServicesByCategory:"+this.servicesByCategory[i])
      i++;
    });
  }

}
