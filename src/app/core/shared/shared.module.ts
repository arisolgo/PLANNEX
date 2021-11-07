import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/containers/scheduler.module';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { PaymentSelectionComponent } from './components/payment-selection/payment-selection.component';
import { DominicanCurrencyPipe } from '../pipes/dominican-currency.pipe';

@NgModule({
  declarations: [
    CategoryFilterComponent,
    PaymentSelectionComponent,
    DominicanCurrencyPipe,
  ],
  imports: [CommonModule, HttpClientModule, IonicModule, SchedulerPageModule],
  exports: [
    CategoryFilterComponent,
    PaymentSelectionComponent,
    DominicanCurrencyPipe,
  ],
})
export class SharedModule {}
