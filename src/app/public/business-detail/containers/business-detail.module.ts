import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BusinessDetailPageRoutingModule } from './business-detail-routing.module';

import { BusinessDetailPage } from './business-detail.page';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { ProvidersPageModule } from '../../providers/containers/providers.module';
import { DominicanCurrencyPipe } from 'src/app/core/pipes/dominican-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BusinessDetailPageRoutingModule,
    SharedModule,
    ProvidersPageModule,
  ],
  providers: [DominicanCurrencyPipe],
  declarations: [BusinessDetailPage, DominicanCurrencyPipe],
})
export class BusinessDetailPageModule {}
