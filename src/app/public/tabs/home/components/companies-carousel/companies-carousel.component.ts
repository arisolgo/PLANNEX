import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-companies-carousel',
  templateUrl: './companies-carousel.component.html',
  styleUrls: ['./companies-carousel.component.scss'],
})
export class CompaniesCarouselComponent implements OnInit {
  @Input() companies = [];
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1.21,
    centeredSlides:true,
    speed: 400
  }
  constructor(public navCtrl:NavController) { }

  ngOnInit() {}
  
  goToDetailPage(business) {
    this.navCtrl.navigateForward('/business-detail', {state: business});
  }

}
