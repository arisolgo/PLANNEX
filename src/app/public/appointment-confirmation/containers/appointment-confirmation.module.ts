import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentConfirmationPageRoutingModule } from './appointment-confirmation-routing.module';

import { AppointmentConfirmationPage } from './appointment-confirmation.page';
import { DominicanCurrencyPipe } from 'src/app/core/pipes/dominican-currency.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentConfirmationPageRoutingModule,
  ],
  providers: [DominicanCurrencyPipe],
  declarations: [AppointmentConfirmationPage, DominicanCurrencyPipe],
})
export class AppointmentConfirmationPageModule {}
