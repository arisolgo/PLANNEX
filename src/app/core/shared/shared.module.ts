import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/containers/scheduler.module';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PaymentSelectionComponent } from './components/payment-selection/payment-selection.component';
import { DominicanCurrencyPipe } from '../pipes/dominican-currency.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MapsComponent } from './components/maps/maps.component';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  declarations: [
    CategoryFilterComponent,
    PaymentSelectionComponent,
    MapsComponent,
    DominicanCurrencyPipe,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    IonicModule,
    SchedulerPageModule,
    ReactiveFormsModule,
  ],
  exports: [
    CategoryFilterComponent,
    PaymentSelectionComponent,
    MapsComponent,
    DominicanCurrencyPipe,
    ReactiveFormsModule,
  ],
  providers: [Geolocation, NativeGeocoder],
})
export class SharedModule {}
