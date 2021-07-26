import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceCategories:any = [];
  companies:any = [];

  constructor() {}

  getCategories(){
    this.serviceCategories[0] = {
      category: 0,
      img: '../../../assets/test-images/gravatar.png',
      name: 'Peluquerías'
    }
    this.serviceCategories[1] = {
      category: 1,
      img: '../../../assets/test-images/gravatar.png',
      name: 'Salones'
    }
  }

  getCompanies(){
    this.companies[0] = {
      companyType:0,
      img:'../../../assets/test-images/tiger.jpg',
      name: 'barber1'
    }
    this.companies[1] = {
      companyType:0,
      img:'../../../assets/test-images/tiger.jpg',
      name: 'barber2'
    }
    this.companies[2] = {
      companyType:0,
      img:'../../../assets/test-images/tiger.jpg',
      name: 'barber2'
    }
    this.companies[3] = {
      companyType:0,
      img:'../../../assets/test-images/tiger.jpg',
      name: 'barber2'
    }
    this.companies[4] = {
      companyType:0,
      img:'../../../assets/test-images/tiger.jpg',
      name: 'barber2'
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getCompanies();
  }


}
