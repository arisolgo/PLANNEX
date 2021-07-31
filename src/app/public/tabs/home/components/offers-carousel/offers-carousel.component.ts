import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers-carousel',
  templateUrl: './offers-carousel.component.html',
  styleUrls: ['./offers-carousel.component.scss'],
})
export class OffersCarouselComponent implements OnInit {
  @Input() offers = [];
  slideOps = {
    initialSlide: 0,
    centeredSlides: true,
    slidesPerView: 1.5,
    spaceBetween: 0,
    speed: 400
  }
  constructor() { }

  ngOnInit() {}

}
