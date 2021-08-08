import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailPageRoutingModule } from './business-detail-routing.module';

import { BusinessDetailPage } from './business-detail.page';
import { SharedModule } from 'src/app/core/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessDetailPageRoutingModule,
    SharedModule
  ],
  declarations: [BusinessDetailPage]
})
export class BusinessDetailPageModule {}
