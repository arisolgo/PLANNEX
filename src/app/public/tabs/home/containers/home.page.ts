import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceCategories:any = [];
  companies:any = [];
  offers:any = [];

  constructor() {}

  getCategories(){
    this.serviceCategories[0] = {
      category: 0,
      img:'https://via.placeholder.com/80x80',
      name: 'Peluquerías'
    }
    this.serviceCategories[1] = {
      category: 1,
      img:'https://via.placeholder.com/80x80',
      name: 'Salones'
    }
  }

  getCompanies(){
    this.companies[0] = {
      companyType:0,
      img:'https://via.placeholder.com/320x180',
      name: 'barber1'
    }
    this.companies[1] = {
      companyType:0,
      img:'https://via.placeholder.com/320x180',
      name: 'barber2'
    }
    this.companies[2] = {
      companyType:0,
      img:'https://via.placeholder.com/320x180',
      name: 'barber2'
    }
    this.companies[3] = {
      companyType:0,
      img:'https://via.placeholder.com/320x180',
      name: 'barber2'
    }
    this.companies[4] = {
      companyType:0,
      img:'https://via.placeholder.com/320x180',
      name: 'barber2'
    }
  }

  getOffers(){
    this.offers[0] = {
      img:'https://via.placeholder.com/254x120',

    }
    this.offers[1] = {
      img:'https://via.placeholder.com/254x120',
    }
    this.offers[2] = {
      img:'https://via.placeholder.com/254x120',
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getCompanies();
    this.getOffers();
  }


}
