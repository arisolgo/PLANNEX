import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'
import { IonicModule } from '@ionic/angular';
import { SchedulerPageModule } from './pages/scheduler/containers/scheduler.module';
import { CategoryFilterComponent } from './components/category-filter/category-filter.component';


@NgModule({
  declarations: [CategoryFilterComponent],
  imports: [
    CommonModule,
    HttpClientModule, 
    IonicModule,
    SchedulerPageModule
  ],
  exports:[CategoryFilterComponent]
})
export class SharedModule { }
