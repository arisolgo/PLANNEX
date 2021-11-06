import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ServiceCategoriesComponent } from '../components/service-categories/service-categories.component';
import { ProvidersCarouselComponent } from '../components/companies-carousel/providers-carousel.component';
import { OffersCarouselComponent } from '../components/offers-carousel/offers-carousel.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule],
  declarations: [
    HomePage,
    ServiceCategoriesComponent,
    ProvidersCarouselComponent,
    OffersCarouselComponent,
  ],
})
export class HomePageModule {}
