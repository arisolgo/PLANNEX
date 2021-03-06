import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {}

}
