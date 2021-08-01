import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.page.html',
  styleUrls: ['./providers.page.scss'],
})
export class ProvidersPage implements OnInit {
  @Input() providers = [];
  filteredProviders = [];
  categories = ['Recorte', 'Uñas'];
  constructor() { }

  ngOnInit() {
    this.getProviders();
  }
  getProviders(){
    this.providers[0] = {
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte'
    }
    this.providers[1] = {
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Recorte'
    }
    this.providers[2] = {
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas'
    }
    this.providers[3] = {
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas'
    }
    this.providers[4] = {
      rating: 4.3,
      name: 'Julian Encarnación',
      img: 'https://via.placeholder.com/80x80',
      category: 'Uñas'
    }
    this.filteredProviders = this.providers;
  }

  setProviderByCategory(filteredProviders){
      this.filteredProviders = filteredProviders;
  }

 

}
