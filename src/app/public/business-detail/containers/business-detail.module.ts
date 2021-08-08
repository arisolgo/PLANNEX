import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailPageRoutingModule } from './business-detail-routing.module';

import { BusinessDetailPage } from './business-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessDetailPageRoutingModule
  ],
  declarations: [BusinessDetailPage]
})
export class BusinessDetailPageModule {}
