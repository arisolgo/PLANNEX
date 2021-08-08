import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppointmentConfirmationPageRoutingModule } from './appointment-confirmation-routing.module';

import { AppointmentConfirmationPage } from './appointment-confirmation.page';
import { OrderDetailComponent } from '../components/order-detail/order-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppointmentConfirmationPageRoutingModule
  ],
  declarations: [AppointmentConfirmationPage,OrderDetailComponent]
})
export class AppointmentConfirmationPageModule {}
