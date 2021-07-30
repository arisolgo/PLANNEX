import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListingPageRoutingModule } from './listing-routing.module';

import { ListingPage } from './listing.page';

import { BusinessCardComponent } from '../components/business-card/business-card.component';
import { SearchbarComponent } from '../components/searchbar/searchbar.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListingPageRoutingModule
  ],
  declarations: [ListingPage,BusinessCardComponent,SearchbarComponent]
})
export class ListingPageModule {}
