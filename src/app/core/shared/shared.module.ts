import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/containers/scheduler.module';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [CategoryFilterComponent, ShoppingCartComponent],
  imports: [CommonModule, HttpClientModule, IonicModule, SchedulerPageModule],
  exports: [CategoryFilterComponent, ShoppingCartComponent],
})
export class SharedModule {}
