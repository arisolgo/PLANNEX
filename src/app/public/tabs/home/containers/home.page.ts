import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  serviceCategories:any = [];

  constructor() {}

  getCategories(){
    this.serviceCategories[0] = {
      category: 0,
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      name: 'Peluquerías'
    }
    this.serviceCategories[1] = {
      category: 1,
      img: 'https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y',
      name: 'Salones'
    }
  }

  ngOnInit() {
    this.getCategories();
  }


}
