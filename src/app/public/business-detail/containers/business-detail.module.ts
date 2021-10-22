import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailPageRoutingModule } from './business-detail-routing.module';

import { BusinessDetailPage } from './business-detail.page';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProvidersPageModule } from '../../providers/containers/providers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessDetailPageRoutingModule,
    SharedModule,
    ProvidersPageModule
  ],
  declarations: [BusinessDetailPage]
})
export class BusinessDetailPageModule {}
