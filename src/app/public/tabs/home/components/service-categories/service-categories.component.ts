import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-service-categories',
  templateUrl: './service-categories.component.html',
  styleUrls: ['./service-categories.component.scss'],
})
export class ServiceCategoriesComponent implements OnInit {

  @Input() categories = [];
  constructor(public navCtrl: NavController) { }

  ngOnInit() {}

  showBusiness(category){
    this.navCtrl.navigateForward('/listing', {state: category});
  }

}
