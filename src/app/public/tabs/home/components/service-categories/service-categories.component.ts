import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss'],
})
export class ServiceCategoriesComponent implements OnInit {

  @Input() tipos = [];
  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  showProvider(tipo){
    this.navCtrl.navigateForward('/listing', {state: tipo});
  }

}
