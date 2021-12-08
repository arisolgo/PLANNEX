import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-providers-carousel',
  templateUrl: './providers-carousel.component.html',
  styleUrls: ['./providers-carousel.component.scss'],
})
export class ProvidersCarouselComponent implements OnInit {
  @Input() providers = [];
  slideOps = {
    initialSlide: 0,
    slidesPerView: 1.21,
    centeredSlides: true,
    speed: 400,
  };
  constructor(public navCtrl: NavController) {}

  ngOnInit() {}

  goToDetailPage(business) {
    this.navCtrl.navigateForward('/business-detail', { state: business });
  }

  goToListing() {
    this.navCtrl.navigateForward('tabs/listing/#');
  }
}
